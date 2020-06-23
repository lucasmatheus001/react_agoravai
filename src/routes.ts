import express  from 'express';

 import PointsControlle from './controllers/PointsControlle';
 import ItemsController from './controllers/ItemsController';
//index(listar), show, create,update, delete


const routes = express.Router();
const pointsControlle = new PointsControlle();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points',pointsControlle.create);
routes.get('/points', pointsControlle.index);
routes.get('/points/:id', pointsControlle.show);


     
export default routes; //exportar rotas