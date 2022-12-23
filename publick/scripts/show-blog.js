const showBlog = document.querySelector('.show-blog');



showBlog.addEventListener('click', (ev) => {

  try {
    axios.get('http://localhost:4000/show-blog');

    document.location.reload();
  } catch {
    console.error(5555)
  }
})