import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsControlle {
    async index(request:Request, response: Response) {
        //cidade,uf,itens(Query Parms) filtros paginação
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points') //na tabela point items1
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first(); //procura pelo id e lista o primeiro encontrado

        if (!point) { //nome da tabela
            return response.status(400).json({ message: 'Point not found.'});
            //status com começo 4 errp 4040 , 400
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')//relacionar tabela point items com pontos de coleta tabela
            .where('point_items.point_id',id)
            .select('items.title');


        return response.json({ point, items });
    }
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsap,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-aa7f4d92262b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsap,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx ('points').insert(point);
        
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();// confirma que deu certo
    
        return response.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsControlle;