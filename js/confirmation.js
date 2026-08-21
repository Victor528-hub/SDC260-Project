const confirmationDetails =
    document.querySelector("#confirmation-details");

const bookingRequest =
    JSON.parse(localStorage.getItem("GGLBookingRequest"));

if (!bookingRequest){
    confirmationDetails.innerHTML = `
    <p>No booking request was found.</p>
    <a href = "../quote.html">Start a Shipment Request</a>
     `;
}else {
    confirmationDetails.innerHTML = `
    <h3>Request Number</h3>
    <p>${bookingRequest.requestNumber}</p>
    
    <h3>Company</h3>
    <p>${bookingRequest.companyName}</p>
    
    <h3>Shipment Route</h3>
    <p>
        ${bookingRequest.origin}
        to
        ${bookingRequest.destination}
    </p>
    
    <h3>Request Services</h3>
    <ul>
        ${bookingRequest.quoteRequest.map(function (service) {
            return`
                <li>
                ${service.name}
                - Quantity: ${service.quantity}
                </li>
         `;   
        }).join("")}
    </ul>
    <p>
        Pricing and final availability will be confirmed by Gulfstream Global Logistics
    </p>
`;
}