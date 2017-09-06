
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
  })).then(() => knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('uuid');
    table.string('title');
    table.string('email');
    table.timestamps();
  }));
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('request');
};
