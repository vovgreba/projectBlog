const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const commentSchema = new Schema({

  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
})


module.exports = model('Comment', commentSchema)