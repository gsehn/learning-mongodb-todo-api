const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

const idTodo = '599ca1bc62002825f181b955';
const idUser = '599b51ad2b20df1d34cf385d';


if (!ObjectID.isValid(idTodo)) {
	console.log(`Todo ID not valid [${idTodo}]`);
}

if (!ObjectID.isValid(idUser)) {
	console.log(`User ID not valid [${idUser}]`);
}

Todo.find({
	_id: idTodo
})
.then((todos) => {
	console.log(`find - Todos ${JSON.stringify(todos, undefined, 2)}`);
});

Todo.findOne({
	_id: idTodo
})
.then((todo) => {
	if (!todo) {
		return console.log('findOne - Id not found');
	}
	console.log(`findOne - Todo ${JSON.stringify(todo, undefined, 2)}`);
});

Todo.findById(idTodo)
.then((todo) => {
	if (!todo) {
		return console.log('findById - Id not found');
	}
	console.log(`findById - TodoById ${JSON.stringify(todo, undefined, 2)}`);
})
.catch((err) => console.log(err));

//


User.find({
	_id: idUser
})
.then((users) => {
	console.log(`find - Users ${JSON.stringify(users, undefined, 2)}`);
});

User.findOne({
	_id: idUser
})
.then((user) => {
	if (!user) {
		return console.log('findOne - Id not found');
	}
	console.log(`findOne - User ${JSON.stringify(user, undefined, 2)}`);
});

User.findById(idUser)
.then((user) => {
	if (!user) {
		return console.log('findById - Id not found');
	}
	console.log(`findById - UserById ${JSON.stringify(user, undefined, 2)}`);
})
.catch((err) => console.log(err));
