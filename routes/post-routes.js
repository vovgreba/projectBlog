const express = require('express');
const router = express.Router();
const Blog = require('../schema/blog');
const Comment = require('../schema/comment');
const User = require('../schema/user');

router.post('/test', (req,res) => {
  const { name, createBlogAuthor, title, descriptionBlog } = req.body;

  const article = async () => {
    const result =  await Blog.create({
      name, 
      createBlogAuthor,
      title,
      descriptionBlog,
    })
    
  }
  article()
  
})

router.post('/comment', async (req,res) => {
  const { name, description, date, title, nameAuthor} = req.body;
  
  const { id } = await Comment.create({
    comment: description,
    date,
  })
  const userId = await User.create({
    name,
    comment_id: id,
  })
  Blog.updateOne({name: nameAuthor.trim(), title: title}, { $push: { comment_id: id, user_id: userId.id }}, (error,result) => {

    if(error) return console.log(error);
    
  })
})






module.exports = router;