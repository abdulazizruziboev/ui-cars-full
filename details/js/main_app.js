import {
    el_card_template,
    el_skeleton_template,
    el_skeleton_box,
    el_details_box,
    el_error
} from "./dom_elements.mjs";

fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${location.search.slice(4)}`)
.then(res=>res.json())
.then(
    res=>{
        skeletonUI(false);
        detailsUI(res);
    }
)
.catch(()=>{
    el_error.style.display="flex";
})

function skeletonUI(bool)
{
    if(bool==true){
    let el_skeleton_card = el_skeleton_template.cloneNode(true).content;
    el_skeleton_box.append(el_skeleton_card);
    } else {
        el_skeleton_box.innerHTML="";
    }
}
skeletonUI(true);

function detailsUI(data) {
    if(data!='') {
        let el_clone_card = el_card_template.cloneNode(true).content;
        el_clone_card.querySelector(".js-car-name").textContent = data.name ?data.name: "No data";
        el_clone_card.querySelector(".js-car-trim").textContent = data.trim ?data.trim: "No data";
        el_clone_card.querySelector(".js-car-generation").textContent = data.generation ?data.generation: "No data";
        el_clone_card.querySelector(".js-car-year").textContent = data.year ?data.year: "No data";
        el_clone_card.querySelector(".js-car-country").textContent = data.country ?data.country: "No data";
        el_clone_card.querySelector(".js-car-category").textContent = data.category ?data.category: "No data";
        el_clone_card.querySelector(".js-car-seats").textContent = data.seatCount ?data.seatCount: "No data";
        el_clone_card.querySelector(".js-car-doors").textContent = data.doorCount ?data.doorCount: "No data";
        el_clone_card.querySelector(".js-car-engine").textContent = data.engine ?data.engine : "No data";
        el_clone_card.querySelector(".js-car-hp").textContent = data.horsepower ?data.horsepower: "No data";
        el_clone_card.querySelector(".js-car-fuel").textContent = data.fuelType ?data.fuelType: "No data";
        el_clone_card.querySelector(".js-car-speed").textContent = data.maxSpeed ?data.maxSpeed: "No data";
        el_clone_card.querySelector(".js-car-color-hex").style.backgroundColor = data.color ?data.color: "#fff";
        el_clone_card.querySelector(".js-car-city").textContent = data.fuelConsumption.city ?data.fuelConsumption.city: "No data";
        el_clone_card.querySelector(".js-car-highway").textContent = data.fuelConsumption.highway ?data.fuelConsumption.highway: "No data";
        el_clone_card.querySelector(".js-car-combined").textContent = data.fuelConsumption.combined ?data.fuelConsumption.combined: "No data";
        el_details_box.append(el_clone_card);
    }
}

