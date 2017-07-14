
exports.up = function (knex, Promise) {
  return knex.schema.createTable('session', (table) => {
    table.increments();
    table.string('sid');
    table.timestamp('expired_at');
    table.boolean('expired');
    table.text('session');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('session');
};
