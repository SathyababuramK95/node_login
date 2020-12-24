const Sequelize = require('sequelize'); 

const sequelize = new Sequelize("node_login", "root", "", {
	host: "localhost",
	dialect: "mysql"
});

sequelize.authenticate().then(function(err) {
	if (!err) console.log("database connected");
	else console.log("DB Connection err");
});

module.exports = sequelize;