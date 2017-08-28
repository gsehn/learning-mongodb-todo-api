const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');
const {User} = require('./../models/User');

describe('/todos', () => {
	const todos = [
		{ _id: new ObjectID(), text: 'First test todo' },
		{ _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 123123123 },
	];

	beforeEach((done) => {
		Todo.remove({})
		.then(() => {
			return Todo.insertMany(todos);
		})
		.then(() => done())
		.catch((err) => console.log(err));
	});

	describe('POST /todos', () => {
		it('should create a new Todo', (done) => {
			const text = 'Test Todo text';

			request(app)
				.post('/todos')
				.send({text})
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(text);
				})
				.end((err) => { // could have err, res
					if (err) {
						return done(err);
					}

					Todo.find({ text })
					.then((todos) => {
						expect(todos.length).toBe(1);
						expect(todos[0].text).toBe(text);
						done();
					})
					.catch((err) => done(err));
				});
		});

		it('should not create Todo with invalid body data', (done) => {
			request(app)
				.post('/todos')
				.send({})
				.expect(400)
				.end((err) => {
					if (err) {
						return done(err);
					}
					Todo.find()
					.then((todos) => {
						expect(todos.length).toBe(2);
						done();
					})
					.catch((err) => {
						done(err);
					});
				});
		});
	});

	describe("GET /todos", () => {
		it('should get all todos', (done) => {
			request(app)
				.get('/todos')
				.expect(200)
				.expect((res) => {
					expect(res.body.todos.length).toBe(2);
				})
				.end(done);
		});
	});

	describe('GET /todos/:id', () => {
		it('should return a todo', (done) => {
			request(app)
				.get(`/todos/${todos[0]._id.toHexString()}`)
				.expect(200)
				.expect((res) => {
					// console.log(res.body);
					// console.log(res.body.text);
					expect(res.body.todo.text).toBe(todos[0].text);
				})
				.end(done);
		});

		it('should return 404 if todo is not found', (done) => {
			request(app)
				.get(`/todos/${new ObjectID().toHexString()}`)
				.expect(404)
				.end(done);
		});

		it('should return 404 for non object ids', (done) => {
			request(app)
				.get(`/todos/123`)
				.expect(404)
				.end(done);
		});
	});

	describe('DELETE /todos/:id', () => {
		it('should remove a todo', (done) => {
			request(app)
				.delete(`/todos/${todos[1]._id.toHexString()}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.todo._id).toBe(todos[1]._id.toHexString());
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					Todo.findById(todos[1]._id.toHexString())
					.then((todo) => {
						expect(todo).toNotExist();
						done();
					})
					.catch((err) => {
						done(err);
					});
				});
		});

		it('should return 404 if todo not found', (done) => {
			request(app)
				.delete(`/todos/z${todos[1]._id.toHexString().substring(1)}`)
				.expect(404)
				.end(done);
		});

		it('should return 404 if object id is invalid', (done) => {
			request(app)
				.delete(`/todos/zasdasd`)
				.expect(404)
				.end(done);
		});
	});

	describe('PATCH /todos/:id', () => {
		it('should update the todo', (done) => {
			const text = 'new text[0]';

			request(app)
				.patch(`/todos/${todos[0]._id.toHexString()}`)
				.send({ text, completed: true })
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(text);
					expect(res.body.todo.completed).toBe(true);
					expect(res.body.todo.completedAt).toBeA('number');
				})
				.end(done);
		});

		it('should clear completedAt when todo is not completed', (done) => {
			const text = 'new text[1]';

			request(app)
				.patch(`/todos/${todos[1]._id.toHexString()}`)
				.send({ text, completed: false })
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(text);
					expect(res.body.todo.completed).toBe(false);
					expect(res.body.todo.completedAt).toNotExist();
				})
				.end(done);
		});

		it('should return 404 for invalid id', (done) => {
			request(app)
				.patch(`/todos/123123`, {})
				.expect(404)
				.end(done);
		});
	});
});

describe('/users', () => {
	const users = [
		{ _id: new ObjectID(), email: 'gtsehn0@gmail.com', password: '123456' },
		{ _id: new ObjectID(), email: 'gtsehn1@gmail.com', password: '123456' },
		{ _id: new ObjectID(), email: 'a@a.c', password: '123456' },
		{ _id: new ObjectID(), email: 'gtsehn2@gmail.com', password: '12345' }
	];

	beforeEach((done) => {
		User.remove({})
		.then(() => {
			return User.insertMany([users[0]]);
		})
		.then(() => done())
		.catch((err) => console.log(err));
	});

	describe('POST /users', () => {
		it('should create a user properly', (done) => {
			request(app)
				.post('/users')
				.send(users[1])
				.expect(200)
				.expect((res) => {
					expect(res.body.user.email).toBeA('string');
					expect(res.body.user.email).toBe(users[1].email);
					expect(res.body.user.password).toBe(users[1].password);
				})
				.end((err) => {
					if (err) {
						return done(err);
					}

					const {email} = users[1];

					User.find({ email })
					.then((users) => {
						expect(users.length).toBe(1);
						expect(users[0].email).toBe(email);
						done();
					})
					.catch((err) => done(err));
				});


		});

		it('should reject duplicate email', (done) => {
			request(app)
				.post('/users')
				.send(users[0])
				.expect(400)
				.end(done);
		});

		it('should validate and reject an invalid email', (done) => {
			request(app)
				.post('/users')
				.send(users[2])
				.expect(400)
				.end(done);
		});

		it('should validate and reject an invalid password', (done) => {
			request(app)
				.post('/users')
				.send(users[3])
				.expect(400)
				.end(done);
		});
	});
});
