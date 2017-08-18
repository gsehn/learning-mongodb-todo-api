const {MongoClient, ObjectID} = require('mongodb');

let id = new ObjectID();
console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log(`MongoClient: unable to connect - ${err}`);
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos').find({
		_id: new ObjectID('599752d9b9fc090ac775e4f8')
	}).toArray()
		.then((docs) => {
			console.log('Todos');
			console.log(JSON.stringify(docs, undefined, 2));
		})
		.catch((err) => {
			console.log(err);
		});

	db.collection('Todos').count()
		.then((count) => {
			console.log(`count=${count}`);
		})
		.catch((err) => {
			console.log(err);
		});

	db.close();
});
