const {MongoClient, ObjectID} = require('mongodb');

let id = new ObjectID();
console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log(`MongoClient: unable to connect - ${err}`);
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos').deleteMany({text: 'bah'})
		.then((result) => {
			console.log(JSON.stringify(result, undefined, 2));
		})
		.catch((err) => {
			console.log("Erro", err);
		});

	//db.close();
});
