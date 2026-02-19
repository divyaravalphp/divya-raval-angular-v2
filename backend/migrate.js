const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root', // your database user
    password: '',     // your database password
    database: 'angular_portfolio' 
  }
});

async function up() {
  const exists = await knex.schema.hasTable('admins');
  if (!exists) {
    await knex.schema.createTable('admins', (table) => {
      table.increments('id');
      table.string('name');
      table.string('phone');
      table.string('email').unique();
      table.string('password');
      table.timestamps(true, true);
    });
    console.log("Table 'admins' created!");
    
    // Create a default admin (password: admin123)
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await knex('admins').insert({
      name: 'Divya Raval',
      email: 'admin@divya.com',
      password: hashedPassword
    });
    console.log("Default admin created!");
  }
  process.exit();
}

up();