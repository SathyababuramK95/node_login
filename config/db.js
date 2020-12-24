const Sequelize = require('sequelize'); 

const sequelize = new Sequelize("d7i0j896rg9ebd", "fhkuqhyaejeilt", "d75cff22852e7c65effc98c01d88a4822c8862efdb5de7c227f0ba6043a1a433", {
	host: "ec2-75-101-212-64.compute-1.amazonaws.com",
	dialect: "postgres",
	ssl: true
});

sequelize.authenticate().then(function(err) {
	if (!err) console.log("database connected");
	else console.log("DB Connection err");
});

module.exports = sequelize;