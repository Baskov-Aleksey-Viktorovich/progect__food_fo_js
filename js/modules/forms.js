function forms (){
//forms
const forms = document.querySelectorAll('form');
const messege = {
    loading:'icons/spinner.svg',
    success: 'Thank you we wiil call you',
    falure: 'We are not to blame, this is Google.'
};
forms.forEach(item => {
   bindpostData(item);
});

const  postData = async (url, data)=>{ 
   const res = await fetch (url, {
       method:"POST",
       headers:{
           'Content-type': 'application/json'
       },
       body: data

   });
   return await res.json();
};

function bindpostData(form){
    form.addEventListener('submit', (e) =>{
       e.preventDefault();

       const statusMessege = document.createElement('img');
       statusMessege.src = messege.loading;
       statusMessege.style.cssText = `display: block;
       margin: 0 auto; `;
       form.insertAdjacentElement('afterend', statusMessege);
     
       
       const formData = new FormData (form);
       const json = JSON.stringify(Object.fromEntries(formData.entries()));
      

       postData('http://localhost:3000/requests', json)
       .then( data =>{
           console.log(data);
               showThanksModal(messege.success);
               form.reset();
              statusMessege.remove();
       }).catch(()=>{
           showThanksModal(messege.falure);
       }).finally(() =>{
           form.reset();
       });

    });
}

function showThanksModal (messege){
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
       thanksModal.innerHTML = `
       <div class = "modal__content">
           <div class="modal__close" data-close>×</div>
           <div class="modal__title">${messege}</div>
       </div>

       `;
       document.querySelector('.modal').append(thanksModal);
       setTimeout(() =>{
           thanksModal.remove();
           prevModalDialog.classList.add('show');
           prevModalDialog.classList.remove('hide');
           closeModal();
       }, 4000);
}
fetch('http://localhost:3000/menu')
.then(data => data.json())
.then(res => console.log(res));
}
module.exports = forms;