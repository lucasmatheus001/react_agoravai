import knex from 'knex';
import path from 'path'; //une caminhos

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection; //exportar rota novamente