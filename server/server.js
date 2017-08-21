const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const password = `h0st1ng!`;
const database = `TodoApp`;
const mongodbOriginalURL = `mongodb://admin:<PASSWORD>@cluster0-shard-00-00-ukobs.mongodb.net:27017,cluster0-shard-00-01-ukobs.mongodb.net:27017,cluster0-shard-00-02-ukobs.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;
const mongodbURL = mongodbOriginalURL.replace(/<PASSWORD>/g, password).replace(/<DATABASE>/g, database);
//const mongodbURL = 'mongodb://localhost:27017/TodoApp';

console.log(mongodbURL);

mongoose.connect(mongodbURL, { useMongoClient: true })
.then((db) => {
	console.log(`Mongoose connected\n`, db);
	db.close();
	console.log(`DB closed`);
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
