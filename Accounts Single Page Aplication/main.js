window.addEventListener("beforeunload",save)




let accountsTableBody=document.querySelector("#accounts-table-body")
 let allLinks=document.querySelectorAll(".nav-link")
let accountsView=document.querySelector("#accounts-view")
let addAccountsView=document.querySelector("#add-accounts-view")
let views=document.querySelectorAll(".view")
let idInput=document.querySelector("[placeholder='id']")
let nameInput=document.querySelector("[placeholder='name']")
let lastastNameInput=document.querySelector("[placeholder='lastname']")
let emailInput=document.querySelector("[placeholder='email']")
let phoneInput=document.querySelector("[placeholder='phone']")
let saveBtn=document.querySelector("#saveBtn")

let edId=document.querySelector('.edId')
let edName=document.querySelector('.edName')
let edLastName=document.querySelector('.edLastname')
let edEmail=document.querySelector('.edEmail')
let edPhone=document.querySelector('.edPhone')
let editBtn=document.querySelector("#edit")
let id ;
editBtn.addEventListener("click",saveEditedAccount)
function saveEditedAccount(){
    const editedAccount={
        id:edId.value,
        name : edName.value,
        lastname : edLastName.value,
        email : edEmail.value,
        phone : edPhone.value
    }
    db[id]=editedAccount;
    createAccountsTable()
    showView("#accounts-view")
}


saveBtn.addEventListener("click",saveAccount)
function saveAccount(){
    const newAccount={
        id:idInput.value,
        name:nameInput.value,
        lastname:lastastNameInput.value,
        email:emailInput.value,
        phone:phoneInput.value
    }
   db.push(newAccount)
   idInput.value=""
   nameInput.value=""
   lastastNameInput.value=""
   emailInput.value=""
   phoneInput.value=""

   createAccountsTable()
   showView("#accounts-view")
}


for (let i = 0; i < allLinks.length; i++) {
    
    allLinks[i].addEventListener("click",showView)
    
}
function showView(e){
    for (let i = 0; i < views.length; i++) {
        views[i].style.display="none" }
    if(e instanceof Event){
      e.preventDefault() 
       let id=`#${this.getAttribute("href")}`
       document.querySelector(id).style.display="block"
    }else{
document.querySelector(e).style.display="block"
    }
    
   
        
   
    
    
}


createAccountsTable()

function createAccountsTable(){
    let htmlAccounts=``;
   for (let i = 0; i < db.length; i++) {
       const acount = db[i];
       htmlAccounts +=`
       <tr>
       <td>${acount.id}</td>
       <td>${acount.name}</td>
       <td>${acount.lastname}</td>
       <td>${acount.email}</td>
       <td>${acount.phone}</td>
       <td><button data-id=${i} class="edit-btn btn-sm btn-warning form-control">Edit</button></td>
       <td><button data-id=${i} class=" delete-btn btn-sm btn-danger form-control">Delete</button></td>
     </tr>
       `
       
   }
  accountsTableBody.innerHTML=htmlAccounts;
  let allDeleteBtn=document.querySelectorAll(".delete-btn")
let allEditBtn=document.querySelectorAll(".edit-btn")
for (let i = 0; i < allDeleteBtn.length; i++) {
    allDeleteBtn[i].addEventListener("click",deleteAccount);
   allEditBtn[i].addEventListener("click",editAccount)
    
}
}
function deleteAccount(){
    id=this.getAttribute("data-id")
    db.splice(id,1)
    createAccountsTable()
    showView("#accounts-view")
}

function editAccount(){
let id=this.getAttribute("data-id")
let selectedAccount=db[id]
edId.value=selectedAccount.id
edName.value=selectedAccount.name
edLastName.value=selectedAccount.lastname
edEmail.value=selectedAccount.email
edPhone.value=selectedAccount.phone
showView("#edit-account-view")
}
function save(){
    localStorage.db=JSON.stringify(db)
}