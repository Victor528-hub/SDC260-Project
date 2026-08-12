const services = [
  {
    name: "FCL 20ft Container",
    description: "Full Container Load (FCL) shipping for 20ft containers.",
    image: "images/fcl-20ft.jpg",
  },
  {
    name: "FCL 40ft Container",
    description: "Full Container Load (FCL) shipping for 40ft containers.",
    image: "images/fcl-40ft.jpg",
  },
  {
    name: "LCL Ocean Freight",
    description: "Less-than-container-load service for shipments that do not require a full container.",
    image: "images/lcl-ocean-freight.jpg",  
  },
  {
    name: "Port Drayage",
    description: "Container transportation between ports, warehouses, and customer facilities.",
    image: "images/port-drayage.jpg",
  },
  {
    name: "Transloading",
    description: "Transfer of cargo from ocean containers to domestic trucks or trailers.",
    image: "images/transloading.jpg",
  },
  {
    name: "Warehouse Storage",
    description: "Short-term and long-term storage and warehouse coordination.",
    image: "images/warehouse-storage.jpg",
  },
  {
    name: "Customs Clearance Coordination",
    description: "Coordination with customs brokers to assist with import clearance and required documentations.",
    image: "images/customs-clearance.jpg",
  },
  {
    name: "Reefer Transportation",
    description: "Temperature-controlled transportation for refrigerated cargo.",
    image: "images/reefer-transportation.jpg",
  },
  {
    name: "Oversized Cargo",
    description: "Transportation coordination for oversized and heavy freight.",
    image: "images/oversized-cargo.jpg",
  },
  {
    name: "Hazardous Cargo",
    description: "Transportation coordination for properly documented hazardous materials.",
    image: "images/hazardous-cargo.jpg",
  },
  {
    name: "Shipment Coordination",
    description: "End-to-end coordination pf transportation, delivery scheduling, and shipment updates.",
    image: "images/shipment-coordination.jpg",
  },
];

for(const service of services){
    serviceContainer.innerHTML += `
    <article class="service-card">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <button>Request a Quote</button>
    </article>
    `;
}
