const mongoose = require('mongoose');

const mongodbURL = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

mongoose.connect(mongodbURL, { useMongoClient: true })
.then(() => {
	//console.log(`Mongoose connected\n`);
})
.catch((err) => console.log(`Mongoose Error`, err));

module.exports = {
	mongoose
};

// let mongodbURL = "";
//
// const argv = require('yargs')
// 	.command('local', 'Connect to a local MongoDB on port 27017', () => {}, (argv) => {
// 		mongodbURL = 'mongodb://localhost:27017/<DATABASE>'.replace(/<DATABASE>/g, argv.database);
// 	})
// 	.command('remote', 'Connect to a remote Atlas MongoDB on Cluster 0', (yargs) => {
// 		yargs.option('user', {
// 			alias: 'u',
// 			required: true
// 		})
// 		.option('password', {
// 			alias: 'p',
// 			required: true
// 		});
// 	}, (argv) => {
// 		const {user, password, database} = argv;
// 		mongodbURL = 'mongodb://<USER>:<PASSWORD>@cluster0-shard-00-00-ukobs.mongodb.net:27017,cluster0-shard-00-01-ukobs.mongodb.net:27017,cluster0-shard-00-02-ukobs.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
// 			.replace(/<USER>/g, user).replace(/<PASSWORD>/g, password).replace(/<DATABASE>/g, database);
// 	})
// 	.demandCommand()
// 	.option('database', {
// 		alias: 'd',
// 		default: 'TodoApp'
// 	})
// 	.help()
// 	.argv;
//
// console.log(`mongoURL=[${mongodbURL}]`);
//
