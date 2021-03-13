const mongoose = require("mongoose");

const dbUri = process.env.DB_URI;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

const connect = () => {
	mongoose.connect(dbUri, options, () => {
		console.log(`Database connected...`);
	});
};

module.exports = connect;
