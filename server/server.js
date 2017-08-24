const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});

	todo.save()
	.then((doc) => {
		res.send(doc);
	})
	.catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find()
	.then((todos) => {
		res.send({
			todos
		});
	})
	.catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {
	const {id} = req.params;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id)
	.then((todo) => {
		if (todo) {
			res.send(todo);
		} else {
			res.status(404).send();
		}
	})
	.catch((err) => {
		console.log(err);
		res.status(400).send();
	});

});

app.listen(port, () => {
	console.log(`Started server on port ${port}`);
});

module.exports = {
	app
};
