const mongoose = require('mongoose');
const {Schema} = mongoose;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		unique: true,
		validate: {
			validator: value => validator.isEmail(value),
			message: '{VALUE} is not valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
	const user = this;
	const access = 'auth';
	const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});
	return user.save().then(() => token);
};

UserSchema.statics.findByToken = function (token) {
	const User = this;
	let decoded = undefined;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

const User = mongoose.model('User', UserSchema);

module.exports = {
	User
};
