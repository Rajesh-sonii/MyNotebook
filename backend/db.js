const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    const mongoURI = 'mongodb://127.0.0.1:27017/myNotebook';
  await mongoose.connect(mongoURI);
  mongoose.connection.on('connected', () => console.log('connected'));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main;