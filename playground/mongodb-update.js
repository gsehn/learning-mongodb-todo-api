const {MongoClient, ObjectID} = require('mongodb');

let id = new ObjectID();
console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log(`MongoClient: unable to connect - ${err}`);
	}
	console.log('Connected to MongoDB server');

	db.collection('Users').findOneAndUpdate(
		{ name: 'Guenther Sehn' },
		{ $inc: { age: 1 } },
		{ returnOriginal: false })
		.then((result) => {
			console.log(JSON.stringify(result, undefined, 2));
		})
		.catch((err) => {
			console.log("Erro", err);
		});

	//db.close();
});
