const services = [
    {
        id: 1,
        name: "FCL 20-Foot Container"
    },
    {
        id: 2,
        name: "FCL 40-Foot Container"
    },
    {
        id: 3,
        name: "LCL (Less than Container Load)"
    },
    {
        id: 4,
        name: "Port Drayage"
    },
    {
        id: 5,
        name: "Transloading"
    },
    {
        id: 6,
        name: "Warehousing"
    }

];

const serviceContainer = document.querySelector("#service-container");
const addMessage = document.querySelector("#add-message");

// Retrieve the saved request or begin with an empty array
let quoteRequest =
    JSON.parse(localStorage.getItem("quoteReqest"))|| [];

function displayServices() {
    serviceContainer.innerHTML = "";

    for (const service of services){

        serviceCard.classlist.add("service-card");

        serviceCard.innerHTML = `
        <h3>${service.name}</h3>
        <button
            type="button"
            class="add-services-button"
            data-service-id=${service.id}">
            Add to Quote Request
        </button>
        `;
    serviceContainer.appendChild(serviceCard);
}
}

function addService(serviceId) {
    const selectService = services.find(function (service){
        return service.id === serviceId;
    });
    
    const existingService = quoteRequest.find(function (service){
        return service.id === serviceId;
});

if (existingSerivce) {
    existingService.quantity++;
} else {
    quoteRequest.push({
        id: selectedService.id,
        name: selectedService.name,
        quantity: 1
    });
}

localStorage,setItem(
    "GGLQuoteRequest",
    JSON.stringify(quoteRequest)
);

addMessage.textContent =
`${selectedService.name} was added to your quote request.`;

setTimeout(function (){
    addMessage.textContent = "";
}, 3000);
}

serviceContainer.addEventListener("click", function (event){
    if (event.target.classList.contains("add-service-button")){
        const serviceId = Number(event.target.dataset.serviceId);

        addService(serviceId);
    }
});

displayServices();