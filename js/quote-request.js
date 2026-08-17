const quoteRequestContainer = document.querySelector("#quote-request-container");

const totalUnitsElement = document.querySelector("#total-units");

const emptyMessage = document.querySelector("#empty-message");

const clearRequestButton = document.querySelector("#clear-request");

const continueBookingButton = document.querySelector("#continu-booking");

let quoteRequest = JSON.parse(localStorage.getItem("GGLQuoteRequest")) || [];

function saveQuoteRequest(){
    localStorage.setItem(
        "GGLQuoteRequest",
        JSON.stringify(quoteRequest)
    );
}

function calculateTotalUnits(){
    let totalUnites = 0;
    for (const service of quoteRequest){
        totalUnites += service.quantity;
    }
    totalUnitsElement.textContent = totalUnites;
}
function displayQuoteRequest(){
    quoteRequestContainer.innerHTML = "";

    if (quoteRequest.length === 0){
        emptyMessage.textContent = "Your quote request is currently empty.";
    
        clearRequestButton.disable = true;
        continueBookingButton.disable = true;
    } else {
        emptyMessage.textContent = "";

        clearRequestButton.disable = false;
        continueBookingButton.disable = false;
    }

    for (const service of quoteRequest){
        const requestItem = document.createElement("article");

        requestItem.classList.add("quote-request-item");

        requestItem.innerHTML = `
        <h3>${service.name}</h3>
        
        <p>
            Quanity:
            <button 
                type="button"
                class="decrease-button"
                data-service-id="${service.id}">
                -
                </button>
                
                <span>${service.quanity}</span>
                
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
    const service = quoteRequest.find(function (item){
        return item.iid === serviceID;
    });
    
    if (service) {
        service.quantity++;
    }
    saveQuoteRequest();
    displayQuoteRequest();
}

function decreaseQuantity(serviceId){
    const service = quoteRequest.find(function (item) {
        return item.id === serviceId;
    });
    
    if (!service){
        return;
    }

    if (service.quantity > 1) {
        service.quantity--;
    } else {
        removeService(serviceId);
        return;
    }

    saveQuoteRequest();
    displayQuoteRequest();
}

function removeService(serviceID) {
    quoteRequest = quoteRequest.filter(function (service){
        return service.id !== serviceId;
    });

    saveQuoteRequest();
    displayQuoteRequest();
}

quoteRequestContainrequestContainer.addEventListener("click", function (event) {
    const serviceID = Number(event.target.dataset.serviceId);

    if (event.target.classList.contains("increase-button")) {
        increaseQuantity(serviceId);
    }

    if (event.target.classList.contains ("decrease-button")){
        decreaseQuantity(serviceId);
    }

    if (event.target.classList.contains("remove-button")) {
        removeService(serviceId);
        }
    });
clearRequestButton.addEventListener("click", function (){
    quoteRequest = [];

    saveQuoteRequest();
    displayQuoteRequest();
});

continueBookingButton.addEventListener("click", function () {
    if (quoteRequest.length > 0){
        window.location.href = "booking.html";
    }
});

displayQuoteRequest();
