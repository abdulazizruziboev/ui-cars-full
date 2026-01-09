import {
    el_skeleton_template,
    el_items_template,
    el_details_template,
    el_skeleton_box,
    el_items_box,
    el_details_box,
    el_dom_header,
    el_details_skeleton,
    el_details_skeleton_box,
    el_details_modal,
    el_details_modal_close
} from "./dom_elements.mjs";

function mainReuqests() {
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
    .then((res)=>res.json())
    .then(
        (res)=>{
            itemsUI(res.data);
        }
    );
}

mainReuqests();

function itemsUI(data) {
    skeletonUI(false);
    data.forEach((el)=>{
        let clone = el_items_template.cloneNode(true).content;
        clone.querySelector(".js-item-id").textContent=el.id?el.id:"No data";
        clone.querySelector(".js-item-name").textContent=el.name?el.name:"No data";
        clone.querySelector(".js-item-year").textContent=el.year?el.name:"No data";
        clone.querySelector(".js-details-button").setAttribute("data-detail-id",el.id?el.id:"no-data")
        clone.querySelector(".js-delete-button").setAttribute("data-delete-id",el.id?el.id:"no-data")
        el_items_box.append(clone);
    });

    document.querySelectorAll(".js-details-button").forEach(el=>{
    el.addEventListener("click",(evt)=>{
    let id = evt.target.getAttribute("data-detail-id");
    detailsUI(id);
    });
    });

    document.querySelectorAll(".js-delete-button").forEach(el=>{
    el.addEventListener("click",(evt)=>{
    let id = evt.target.getAttribute("data-delete-id");
    evt.target.style.cssText = 
    `opacity:0.75;pointer-events:none;`;
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars/"+id,{
        method:"DELETE"
    })
    .then(res=>res.text())
    .then(res=>{
        if(res=="deleted successfully") {
            evt.target.closest(".js-item-card").remove();
        } else if(res!="deleted successfully") {
            setTimeout(()=>{
            evt.target.style.pointerEvents="all";
            evt.target.style.cssText = 
            `opacity:1;pointer-events:all;`;
            },1000)
        }
    })
    });
    });
};

skeletonUI(true,20);
function skeletonUI(bool,len) {
    if(bool==true){
         Array.from({length:len}).forEach((el)=>{
            let clone=el_skeleton_template.cloneNode(true).content;
            el_skeleton_box.append(clone);
         });
    } else if(bool==false) {
        el_skeleton_box.innerHTML="";
    }
}

function detailsUI(id){
    el_details_box.innerHTML="";
    el_details_modal.classList.remove("hidden");
    el_details_modal.classList.add("flex");
    detailsSkeletonUI(true)
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars/"+id)
    .then(res=>res.json())
    .then(res=>{
        detailsWrite(res);
    })
    function detailsSkeletonUI(bool) {
        if(bool==true) {
            let clone = el_details_skeleton.cloneNode(true).content;
            el_details_skeleton_box.append(clone);
        } else if(bool==false) {
            el_details_skeleton_box.innerHTML=null;
        }
    }
    function detailsWrite(data) {
    detailsSkeletonUI(false);
    if(data!='') {
        let el_clone_card = el_details_template.cloneNode(true).content;
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
};

window.addEventListener("scroll",()=>{
    if(window.scrollY>750) {
        el_dom_header.classList.add("sticky");
    } else {
        el_dom_header.classList.remove("sticky");
    }
});

el_details_modal_close.addEventListener("click",()=>{
    el_details_modal.classList.remove("flex");
    el_details_modal.classList.add("hidden");
});
