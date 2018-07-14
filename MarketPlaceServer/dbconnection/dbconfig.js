var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PWD + '@ds235461.mlab.com:35461/laungfirstdatabase')

var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: Number,
    email: String,
    location: {
        s_type: String,
        coordinates: [Number]
    },
    verify: Number,
    contact_number: String,
    create_date: Date,
    last_updated: Date
});
var User = mongoose.model('User', userSchema);

var postSchema = new Schema({
    title: String,
    description: String,
    post_date: Date,
    last_updated: Date,
    price: Number,
    status: Number,
    condition: Number,
    category: Number,
    is_New: Boolean,
    isDeleted: Boolean,
    image_urls: [String],
    user_id: Number,
    user_name: String,
    contact_number: String,
    location: {
        s_type: String,
        coordinates: [Number]
    }
})
var Post = mongoose.model('Post', postSchema);

module.exports = {Post: Post, User:User};