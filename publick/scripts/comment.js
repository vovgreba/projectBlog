const descriptionBlog = document.querySelector('.blog-desc');
const sendCommentBtn = document.querySelector('.send-btn');
const sendComment = document.querySelector('.send-comment');
const inputComment = document.getElementById('name');
const comment = sendComment.querySelector('.description');
const title = document.querySelector('.blog-title');
const nameAuthor = document.querySelector('.full-name');
const answerBtn = document.querySelectorAll('.answer-btn');
const commentWrapper = document.querySelector('.comments');
const likeImg = document.querySelector('.like_img');
const like = document.querySelector('.like');

const getCreateComment = (name = 'inserted-comment', data = {}) => {
  const { nameAuthor, desc, todayDate } = data
  const elemComment = document.createElement('div');
  elemComment.classList.add('comments');
  elemComment.classList.add(name);
  const elemHeader = document.createElement('div');
  elemHeader.classList.add('header');
  elemComment.appendChild(elemHeader);
  const elemHeaderLogo = document.createElement('div');
  elemHeaderLogo.classList.add('logo');
  elemHeader.appendChild(elemHeaderLogo);
  const elemImg = document.createElement('img');
  elemImg.setAttribute('alt', 'avatar')
  elemImg.setAttribute('src', './img/logo-name.svg')
  elemHeaderLogo.appendChild(elemImg);
  const elemLink = document.createElement('h4');
  elemLink.classList.add('name');
  elemLink.innerText = nameAuthor
  const elemData = document.createElement('span');
  elemData.classList.add('data');
  elemHeader.appendChild(elemLink);
  elemHeader.appendChild(elemData);
  elemData.innerText = todayDate;
  const elemDesc = document.createElement('p');
  elemDesc.classList.add('description-comment');
  elemComment.appendChild(elemDesc);
  elemDesc.innerText = desc;

  const elemControlDiv = document.createElement('div');
  elemControlDiv.classList.add('control_comments');
  
  const elemlink = document.createElement('div');
  elemlink.classList.add('like');
  elemControlDiv.appendChild(elemlink);
  
  const createLinkImg = document.createElement('img');
  createLinkImg.classList.add('like_img');
  createLinkImg.setAttribute('src', './img/like.png');
  createLinkImg.setAttribute('alt', 'like');
  const createLinkSpan = document.createElement('span');
  createLinkSpan.classList.add('counter_like');
  elemlink.append(createLinkImg, createLinkSpan)

  const elemBtn = document.createElement('button');
  elemBtn.classList.add('button-comment');
  elemBtn.classList.add('answer-btn');
  elemBtn.innerText = 'answer';
  elemControlDiv.appendChild(elemBtn);
  elemComment.appendChild(elemControlDiv);
  return elemComment
}
const getCreateAnswer = (el) => {
  const elemWrapper = document.createElement('div');
  elemWrapper.classList.add('send-comment');
  elemWrapper.classList.add('inserted-forms');
  const elemLabel = document.createElement('label');
  elemLabel.innerText = 'Your nickname';
  const elemInput = document.createElement('input');
  const elemTextarea = document.createElement('textarea');
  elemTextarea.classList.add('description');
  elemTextarea.setAttribute('name', 'comment');
  elemTextarea.setAttribute('placeholder', 'you can leave your answer here');
  const elemBtn = document.createElement('button');
  elemBtn.classList.add('send-btn');
  elemBtn.classList.add('button-comment');
  elemBtn.innerText = 'answer';
  elemWrapper.appendChild(elemLabel)
  elemWrapper.appendChild(elemInput)
  elemWrapper.appendChild(elemTextarea)
  elemWrapper.appendChild(elemBtn)
  el.insertAdjacentElement('afterend', elemWrapper);
}
const sendingCommentDB = async (name, description, date, title,nameAuthor) => {
  const sendingComments = await axios.post('/comment', {
    name,
    description,
    date,
    title,
    nameAuthor
  })

}



const insertComment = (ev ) => {
  const valueName = inputComment.value
  const valueDesc = comment.value
  const date = new Date();
  const minute = +date.getMinutes() >= 0 && +date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const todayDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} в ${date.getHours()}:${minute}`
  commentWrapper.insertAdjacentElement('afterbegin', getCreateComment())
  const nextEl = descriptionBlog.nextElementSibling
  nextEl.querySelector('.name').innerHTML = valueName 
  nextEl.querySelector('.description-comment').innerHTML = valueDesc 
  nextEl.querySelector('.data').innerHTML = todayDate
  

  sendingCommentDB(valueName, valueDesc, todayDate, title.innerHTML, nameAuthor.innerHTML)
  
}
const insertCommentAnswer = (name, desc, ev ) => {
  const elTarget = ev.target
  const parentElement = elTarget.parentElement
  const insertedClass = 'inserted-comment';
  const buttonSerch = parentElement.previousElementSibling
  
  const date = new Date();
  const minute = +date.getMinutes() >= 0 && +date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const todayDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} в ${date.getHours()}:${minute}`
  const data = {
    nameAuthor: name,
    desc,
    todayDate,
  }
  parentElement.insertAdjacentElement('beforebegin', getCreateComment(insertedClass, data))
  console.log(parentElement)
  parentElement.style.display = 'none'
  buttonSerch.style.display = 'block';


  sendingCommentDB(name, desc, todayDate, title.innerHTML, nameAuthor.innerHTML)
  
}


sendCommentBtn.addEventListener('click', ev => {

  insertComment(ev)

})

commentWrapper.addEventListener('click', (ev) => {
  const elTargetName = ev.target.className
  const elTarget = ev.target
  // const nameUserForAnswer = 
  if(elTargetName === 'button-comment answer-btn') {
    elTarget.style.display = 'none';
    console.log(elTarget.parentElement)
    getCreateAnswer(elTarget.parentElement);
  }
  if(elTargetName === 'send-btn button-comment') {
    const parentElement = elTarget.parentElement
    const inputName = parentElement.querySelector('input').value
    const textDescription = parentElement.querySelector('.description').value
    console.log(inputName)
    console.log(textDescription)
    insertCommentAnswer(inputName, textDescription, ev)
    
  }

  if(elTargetName === 'like_img') {
    const parentElement = elTarget.parentElement
    const counter = parentElement.querySelector('.counter_like');

    +counter.innerText++;
    console.log(parentElement)
  }
})


