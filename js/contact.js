const contactForm = document.querySelector("#contact-form");
const contactError = document.querySelector("#contact-error");

function validateEmail(email) {
  return email.includes("@") && email.includes(".");

}


contactForm.addEventListener("submit", function(event){
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
 
 
  if(email === "" || message === ""){
    contactError.textContent = "Please fill in all required fields.";
    contactError.style.display = "block";
  } else if(!validateEmail(email)){
    contactError.textContent = "Please enter a valid email address.";
    contactError.style.display = "block";
  } else {
    contactError.style.display = "none";
    alert("Thank you for your message! We will get back to you shortly.");
    contactForm.reset();
  } 
});