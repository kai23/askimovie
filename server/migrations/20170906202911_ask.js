
exports.up = function (knex, Promise) {
  return knex.schema.createTable('request', (table) => {
    table.increments();
    table.string('user_id');
    table.integer('media_id');
    table.string('status');
    table.string('seasons');
    table.timestamps();
  }).then(() => knex.schema.createTable('request_workflow', (table) => {
    table.increments();
    table.integer('media_id');
    table.string('status');
    table.timestamps();
  }));
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('request');
};
