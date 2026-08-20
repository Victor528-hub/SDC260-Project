const services = [
    {
        id: 1,
        name: "20-Foot FCL Container",
        unit: "container",
        pricing: "Pricing will be requested from the steamship line after you submit your shipment details."
    },
    {
        id: 2,
        name: "40-Foot FCL Container",
        unit: "container",
        pricing: "Pricing will be requested from the steamship line after you submit your shipment details."
    },
    {
        id: 3,
        name: "LCL Ocean Freight",
        unit: "shipment",
        pricing: "Pricing will be requested from the carrier after you submit your shipment details."
    },
    {
        id: 4,
        name: "Port Drayage",
        unit: "move",
        pricing: "Pricing will be requested from a trucking partner after you submit your shipment details."
    },
    {
        id: 5,
        name: "Transloading",
        unit: "move",
        pricing: "Pricing will be confirmed by our operations team after you submit your shipment details."
    },
    {
        id: 6,
        name: "Warehousing",
        unit: "pallet",
        pricing: "Pricing will be requested from a warehouse partner after you submit your shipment details."
    }
];

const serviceContainer = document.querySelector("#service-container");
const addMessage = document.querySelector("#add-message");

const STORAGE_KEY = "GGLQuoteRequest";

let quoteRequest =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveQuoteRequest() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(quoteRequest)
    );
}

function displayServices() {
    serviceContainer.innerHTML = "";

    for (const service of services) {
        const serviceCard = document.createElement("article");

        serviceCard.classList.add("service-card");

        serviceCard.innerHTML = `
            <h3>${service.name}</h3>
            <p>Unit: ${service.unit}</p>
            <p>Pricing: ${service.pricing}</p>
            <button
                type="button"
                class="add-service-button"
                data-service-id="${service.id}">
                Add to Shipment Request
            </button>
        `;

        serviceContainer.appendChild(serviceCard);
    }
}

function addService(serviceId) {
    const selectedService = services.find(function (service) {
        return service.id === serviceId;
    });

    if (!selectedService) {
        return;
    }

    const existingService = quoteRequest.find(function (service) {
        return service.id === serviceId;
    });

    if (existingService) {
        existingService.quantity++;
    } else {
        quoteRequest.push({
            id: selectedService.id,
            name: selectedService.name,
            unit: selectedService.unit,
            pricing: selectedService.pricing,
            quantity: 1
        });
    }

    saveQuoteRequest();

    addMessage.textContent =
        `${selectedService.name} was added to your shipment request.`;
}

serviceContainer.addEventListener("click", function (event){
    if (!event.target.classList.contains("add-service-button")){
        return;
    }

    const serviceId = Number(event.target.dataset.serviceId);

    addService(serviceId);

});

displayServices();
