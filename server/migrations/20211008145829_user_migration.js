const Knex = require('knex');

exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('refresh_token', 255);

        table.unique('username');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
