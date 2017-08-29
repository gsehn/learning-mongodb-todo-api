// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');
const bc = require('bcryptjs');

const password = '123abc!';

// bc.genSalt(10, (err, salt) => {
// 	bc.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

const hashedPassword = '$2a$10$czfV5k41Qid3H1jjQqTxju0JJffMa7U7NdZAgOSmPmXsrlu9s0OH2';

bc.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});

//
// const data = {
// 	id: 10
// };
//
// const token = jwt.sign(data, '123abc');
//
// console.log(token);
//
// const decoded = jwt.verify(token, '123abc');
//
// console.log(JSON.stringify(decoded));
//


// const message = 'I am user number 3';
//
// const hash = SHA256(message).toString();
//
// console.log(`message=[${message}]`);
// console.log(`SHA256=[${hash}]`);
//
// const data = {
// 	id: 4
// };
//
// const token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'salt').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data).toString());
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'salt').toString();
//
// if (resultHash === token.hash) {
// 	console.log('Trust!');
// } else {
// 	console.log('Dont trust');
// }
