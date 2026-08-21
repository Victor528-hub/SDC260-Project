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
const CAPACITY_KEY = "GGLServiceCapacity";

let quoteRequest =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let availableCapacity =
    JSON.parse(localStorage.getItem(CAPACITY_KEY)) || {};

function saveQuoteRequest(){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(quoteRequest)
    );
}

function saveCapacity(){
    localStorage.setItem(
        CAPACITY_KEY,
        JSON.stringify(availableCapacity)
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
            Price: Pending carrier quote
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
    if (availableCapacity[serviceID] <=0) {
        return;
}
    service.quantity++;
    availableCapacity[serviceID]--;

    saveQuoteRequest();
    saveCapacity();
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
        availableCapacity[serviceID]++;
    } else {
        removeService(serviceID);
        return;
    }

    saveQuoteRequest();
    saveCapacity();
    displayQuoteRequest();
}

function removeService(serviceID) {
    const service = quoteRequest.find(function (item){
        return item.id === serviceID;
    });

    if (!service){
        return;
    }

    availableCapacity[serviceID] += service.quantity;

    quoteRequest= quoteRequest.filter(function (item) {
        return item.id !== serviceID;
    });

    saveQuoteRequest();
    saveCapacity();
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
    for (const service of quoteRequest){
        availableCapacity[service.id] += service.quantity;
    }
    quoteRequest = [];
    

    saveQuoteRequest();
    saveCapacity();
    displayQuoteRequest();

});

continueBookingButton.addEventListener("click", function () {
    if (quoteRequest.length > 0) {
        window.location.href = "booking.html";
    }
});
displayQuoteRequest();

