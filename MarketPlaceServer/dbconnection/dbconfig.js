var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.DB_CONNECTION)

var userSchema = new Schema({
    userName: String,
    passWord: String,
    //Role: 0 (User), 1 (Admin)
    role: Number,
    location : {
        coordinates : [], 
        s_type : String
    },
    email: String,
    isVerified: Number,
    verificationCode: Number,
    contactNumber: String,
    location : [],
    createdAt: Date,
    updatedAt: Date
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