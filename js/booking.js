const bookingForm = document.querySelector("#booking-form");
const bookingError = document.querySelector("#booking-error");

function validateEmail(email) {
    return email.includes("@") && email.includes(".");
}

function validatePhone(phone) {
    return phone.length >= 10;
}

function validateZip(zip) {
    return zip.length === 5 && !isNaN(zip);
}

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const quoteNumber = document.querySelector("#quote-number").value.trim();
    const companyName = document.querySelector("#company-name").value.trim();
    const contactName = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const referenceNumber = document.querySelector("#reference-number").value.trim();
    const bookingNotes = document.querySelector("#booking-notes").value.trim();

    const serviceType = document.querySelector("#service-type").value.trim();
    const origin = document.querySelector("#origin").value.trim();
    const destination = document.querySelector("#destination").value.trim();

    const billingName = document.querySelector("#billing-name").value.trim();
    const billingEmail = document.querySelector("#billing-email").value.trim();
    const billingAddress = document.querySelector("#billing-address").value.trim();
    const billingCity = document.querySelector("#billing-city").value.trim();
    const billingState = document.querySelector("#billing-state").value.trim();
    const billingZip = document.querySelector("#billing-zip").value.trim();
    const billingPhone = document.querySelector("#billing-phone").value.trim();

    if (
        quoteNumber === "" ||
        companyName === "" ||
        contactName === "" ||
        email === "" ||
        phone === "" ||
        serviceType === "" ||
        origin === "" ||
        destination === "" ||
        billingName === "" ||
        billingEmail === "" ||
        billingAddress === "" ||
        billingCity === "" ||
        billingState === "" ||
        billingZip === ""   ||
        billingPhone === ""  
    )   
    {
        bookingError.textContent = "Please fill in all required fields.";
        bookingError.style.display = "block";
        return;
    }

    if (!validateEmail(email)) {
        bookingError.textContent = "Please enter a valid email address.";
        bookingError.style.display = "block";
        return;
    }

    if(!validateEmail(billingEmail)) {
        bookingError.textContent = "Please enter a valid billing email address.";
        bookingError.style.display = "block";
        return;
    }

    if (!validatePhone(phone)) {
        bookingError.textContent = "Please enter a valid phone number.";
        bookingError.style.display = "block";
        return;
    }

    if (!validateZip(billingZip)) {
        bookingError.textContent = "Please enter a valid billing zip code.";
        bookingError.style.display = "block";
        return;
    }
    {
        if (!validatePhone(billingPhone)) {
            bookingError.textContent ="Please enter a valid billing phone number.";
            bookingError.style.display = "block";
            return;
        }
    }
    
    // If all validations pass, you can submit the form or perform further actions here.
   bookingError.style.display = "none";

   const quoteRequest = 
    JSON.parse(localStorage.getItem("GGLQuoteRequest")) || [];

    const requestNumber =
        `GGL-${new Date().getFullYear()}-${Date.now()}`;

    const bookingRequest = {
        requestNumber: requestNumber,
        submittedAt: new Date().toISOString(),
        quoteNumber: quoteNumber,
        companyName: companyName,
        contactName: contactName,
        email: email,
        phone: phone,
        serviceType: serviceType,
        origin: origin,
        destination: destination,
        billingName: billingName,
        billingEmail: billingEmail,
        billingAddress: billingAddress,
        billingCity: billingCity,
        billingState: billingState,
        billingZip: billingZip,
        quoteRequest: quoteRequest,
        referenceNumber: referenceNumber,
        bookingNotes: bookingNotes,
        billingPhone: billingPhone,
    };

    localStorage.setItem(
        "GGLBookingRequest",
        JSON.stringify(bookingRequest)
    );
    localStorage.removeItem("GGLQuoteRequest");

    window.location.href = "confirmation.html";


bookingForm.reset();
});