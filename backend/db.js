const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    const mongoURI = 'mongodb+srv://Rajesh123:Rajesh123@cluster0.afclszb.mongodb.net/myNotebook?retryWrites=true&w=majority&appName=Cluster0/';
  await mongoose.connect(mongoURI);
  mongoose.connection.on('connected', () => console.log('connected'));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main;
