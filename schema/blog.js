const mongoose = require('mongoose');

const { Schema, model} = mongoose;


const blogSchema = new Schema({
  name: {
    type: String,
    maxLength: 30,
    minLength: 5,
    required: true
  },
  createBlogAuthor: {
    type: String,
    required: true
  },
  title: {
    type: String,
    minLength: 10,
    required: true
  },
  descriptionBlog: {
    type: String,
    minLength: 50,
    reqiured: true
  },
  createBlog: {
    type: Date,
    default: () => Date.now(),
  },
  comment_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
})



const Blog = model('Article', blogSchema);

module.exports = Blog;