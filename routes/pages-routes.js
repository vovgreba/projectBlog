const express = require('express');
const router = express.Router()
const Blog = require('../schema/blog')


router.get('/', (req,res) => {

  res.render('index', {
    blog: true,
    stories: true,
    serchBlogDB: false,
  })
})

let numbers = 2;

router.get('/show-blog', (req,res) => {
  numbers += 2
  res.redirect('/create-blog' );
})

router.get('/create-blog', (req,res) => {

    Blog.find({}, (error, docs) => {
      
      try {
        res.render('blogs', {
          numbers,
          docs,
        }).send()
      } catch {
        console.log(error)
      }

    })

})

router.get('/blog', (req,res) => {


    Blog.find({}, (error, docs) => {
      
      try {
        res.render('blogs', {
          numbers,
          docs,          
        })
      } catch {
        console.log(error)
      }

    })
})


let nameLinkBlog = null;
router.get('/redirect-link/:id', (req,res) => {
  nameLinkBlog = req.params
  res.redirect('/link-blog')
})

router.get('/link-blog', (req,res) => {
  const { id } = nameLinkBlog
  
  Blog.findOne({ name: id.trim() })
  .populate("comment_id")
  .populate("user_id")
  .exec((err, docs) => {
    try {
      res.render('post', {
        docs,
       
      })
    } catch {
      console.log(err);
    }

  })

})


module.exports = router;