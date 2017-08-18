const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true })
.then(() => console.log(`Mongoose connected`))
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
