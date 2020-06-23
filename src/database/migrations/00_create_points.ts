import Knex from 'knex'; //tipos TS letra maiuscula

export async function up(knex: Knex) {
    return knex.schema.createTable('points',table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsap').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    });
    //criar a tabela
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point');
    //voltar atras (deletar a tabela)
}