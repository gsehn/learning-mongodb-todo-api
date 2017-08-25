const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
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
	.then((todo) => {
		res.send({todo});
	})
	.catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find()
	.then((todos) => {
		res.send({todos});
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
			res.send({todo});
		} else {
			res.status(404).send();
		}
	})
	.catch((err) => {
		console.log(err);
		res.status(400).send();
	});

});

app.delete('/todos/:id', (req, res) => {
	const {id} = req.params;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id)
	.then((todo) => {
		if (todo) {
			res.send({todo});
		} else {
			res.status(404).send();
		}
	})
	.catch((err) => {
		res.status(400).send();
		console.log(err);
	});

});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, { $set: body	}, {new: true})
	.then((todo) => !todo ? res.status(404).send() : res.send({todo}))
	.catch((err) => {
		res.status(400).send();
		console.log(err);
	});

});

app.listen(port, () => {
	console.log(`Started server on port ${port}`);
});

module.exports = {
	app
};
