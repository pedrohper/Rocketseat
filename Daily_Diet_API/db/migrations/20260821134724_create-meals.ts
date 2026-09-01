import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary()
        table.text('name').notNullable()
        table.text('description').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('date').notNullable()
        table.boolean('is_on_diet').notNullable()
        table.uuid('user_id').references('id').inTable('users').notNullable().index()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('meals')
}

