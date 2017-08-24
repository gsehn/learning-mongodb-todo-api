const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

Todo.remove({})
.then((result) => {
	console.log(result);
})
.catch((err) => {
	console.log(err);
});

//TodofindOneAndRemove({})

Todo.findByIdAndRemove('599f34b4a1587d59878252b2')
.then((result) => {
	console.log(result);
});
