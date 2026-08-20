const quoteRequestContainer =
    document.querySelector("#quote-request-container");
const totalUnitsElement =
    document.querySelector("#total-units");
const emptyMessage =
    document.querySelector("#empty-message");
const clearRequestButton =
    document.querySelector("#clear-request");
const continueBookingButton =
    document.querySelector("#continue-booking");

const STORAGE_KEY = "GGLQuoteRequest";

let quoteRequest =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveQuoteRequest(){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(quoteRequest)
    );
}

function calculateTotalUnits(){
    let totalUnits = 0;

    for (const service of quoteRequest){
        totalUnits += service.quantity;
    }

    totalUnitsElement.textContent = totalUnits;
}

function displayQuoteRequest() {
    quoteRequestContainer.innerHTML = "";

    const requestIsEmpty = quoteRequest.length === 0;

    clearRequestButton.disabled = requestIsEmpty;
    continueBookingButton.disabled = requestIsEmpty;

    if (requestIsEmpty) {
        emptyMessage.textContent =
            "Your shipment request is currently empty.";
    } else {
        emptyMessage.textContent = "";
    }
    for (const service of quoteRequest){
        const requestItem = document.createElement("article");

        requestItem.classList.add("quote-request-item");

        requestItem.innerHTML = `
        <h3>${service.name}</h3>
        
        <p>
            Unit: ${service.unit}
        </p>
        
        <p>
            Pricing: ${service.pricing}
        </p>
        
        <p>
            Quantity:
            <button
                type="button"
                class="decrease-button"
                data-service-id="${service.id}">
                -
            </button>
            <span>${service.quantity}</span>
            
            <button
                type="button"
                class="increase-button"
                data-service-id="${service.id}">
                +
            </button>
        </p>
        <button
            type="button"
            class="remove-button"
            data-service-id="${service.id}">
           Remove
        </button>
    `;

    quoteRequestContainer.appendChild(requestItem);
    }

    calculateTotalUnits();
}
function increaseQuantity(serviceID) {
    const service = quoteRequest.find(function (item) {
        return item.id === serviceID;
    });

    if (!service) {
        return;
    }
    
    service.quantity++;

    saveQuoteRequest();
    displayQuoteRequest();
}

function decreaseQuantity(serviceID){
    const service = quoteRequest.find(function (item){
        return item.id === serviceID;
    });

    if (!service) {
        return;
    }

    if (service.quantity > 1) {
        service.quantity--;
    } else {
        removeService(serviceID);
        return;
    }

    saveQuoteRequest();
    displayQuoteRequest();
}

function removeService(serviceID) {
    quoteRequest = quoteRequest.filter(function (service){
        return service.id !== serviceID;
    });

    saveQuoteRequest();
    displayQuoteRequest();
}

quoteRequestContainer.addEventListener("click", function (event){
    const serviceID = Number(event.target.dataset.serviceId);

    if (event.target.classList.contains ("increase-button")) {
        increaseQuantity(serviceID);
    }

    if (event.target.classList.contains ("decrease-button")){
        decreaseQuantity(serviceID);
    }

    if (event.target.classList.contains("remove-button")){
        removeService(serviceID);
    }
});
clearRequestButton.addEventListener("click", function () {
    quoteRequest = [];

    saveQuoteRequest();
    displayQuoteRequest();

});

continueBookingButton.addEventListener("click", function () {
    if (quoteRequest.length > 0) {
        window.location.href = "booking.html";
    }
});
