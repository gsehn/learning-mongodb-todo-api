const mongoose = require('mongoose');
const argv = require('yargs')
	.option('user', {
		alias: 'u',
		required: true
	})
	.option('password', {
		alias: 'p',
		required: true
	})
	.option('database', {
		alias: 'd',
		default: 'TodoApp'
	})
	.argv;

console.log(argv);

mongoose.Promise = global.Promise;

const {user, password, database} = argv;

const mongodbOriginalURL = `mongodb://<USER>:<PASSWORD>@cluster0-shard-00-00-ukobs.mongodb.net:27017,cluster0-shard-00-01-ukobs.mongodb.net:27017,cluster0-shard-00-02-ukobs.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;
const mongodbURL = mongodbOriginalURL.replace(/<USER>/g, user).replace(/<PASSWORD>/g, password).replace(/<DATABASE>/g, database);
//const mongodbURL = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(mongodbURL, { useMongoClient: true })
.then((db) => {
	console.log(`Mongoose connected\n`, db);
})
.catch((err) => console.log(`Mongoose Error`, err));

const Todo = mongoose.model('Todo', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

const newTodo = new Todo({
	text: 'Cook dinner'
});

newTodo.save()
.then((doc) => {
	console.log(`Doc saved`, doc);
})
.catch((err) => {
	console.log(`Error`, err);
});
