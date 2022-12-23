const createBlogBtn = document.querySelector('.create-blog');
const wrapperModal = document.querySelector('.wrapper-modal');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const create = document.querySelector('.create');
const name = document.getElementById('name');
const date = document.getElementById('date');
const valueTitle = document.querySelector('.value-title');
const valueDesc = document.querySelector('.value-desc');
const wrapperBlog = document.querySelector('.wrapper');
const blogLink = document.querySelectorAll('.blog_links');
const blogLinks = document.querySelectorAll('.blog_links');




// open and close pop-up

createBlogBtn.addEventListener('click', (ev) => {
  wrapperModal.classList.add('open-modal');
})

const removeModal = (el, ev) => {
  el.classList.remove('open-modal');
  ev.preventDefault();
}


close.addEventListener('click', (ev) => {
  removeModal(wrapperModal, ev)
})
modal.addEventListener('click', (ev) => {
  const { className } = ev.target
  if(className === 'modal') {
    wrapperModal.classList.remove('open-modal');
    
  }
})


create.addEventListener('click', (ev) => {
  const createBlogObj = {}
  createBlogObj.name = name.value
  createBlogObj.createBlogAuthor = date.value
  createBlogObj.title = valueTitle.value
  createBlogObj.descriptionBlog = valueDesc.value
  
  try {
    axios.post('http://localhost:4000/test', createBlogObj);
    removeModal(wrapperModal, ev);
  } catch {
    console.error(5555)
  }
})



for(let elem of blogLink) {
  
elem.addEventListener('click', (ev) => {
  
  const { target } = ev;
  const el = target.parentNode.parentNode;
  const fullName = el.querySelector('.full-name').innerHTML

  axios.get(`/redirect-link/${fullName}`);
})

}









