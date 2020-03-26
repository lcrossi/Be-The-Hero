
exports.up = function(knex) {
    return knex.schema.createTable('incident', function (table){
        table.increments();  /** cria um numero (ID) incrementando conforme forem criados(1,2,3,...) */
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();  /*uma ong tem q ter criado o incidente*/

        table.foreign('ong_id').references('id').inTable('ongs'); //referencia onde esta o ong id que deve ser comparado
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
