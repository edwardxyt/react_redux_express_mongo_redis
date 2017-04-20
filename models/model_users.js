const mongoose = require("mongoose");
const path = require('path')
const db = require(path.relative(__dirname, MONGO));

//一个用户模型
var UserSchema = new mongoose.Schema({
	username    : { type: String, /*index: { unique: true }*/ },
	password    : { type: String },
	avatar      : { type: String },
	age         : { type: Number, default: 0, /*index: true*/ },
	description : { type: String, default: '' },
	email       : { type: String },
	github      : { type: String },
	time        : { type: Date, default: Date.now },
	Update      : { type: Date }
});

UserSchema.index({ username: 1, time: -1 }, {unique: true});

//创建Model
var UserModel = db.model("user", UserSchema );
module.exports = UserModel
