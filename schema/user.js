const mongoose = require('mongoose');
const { Schema, model } = mongoose;



const userSchema = new Schema({
  name: {
    type: String,
    maxLength: 30,
    required: true,
    unique: true
  },
  comment_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]

})



module.exports = model('User', userSchema)