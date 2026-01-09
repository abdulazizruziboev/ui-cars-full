import {
    el_skeleton_template,
    el_items_template,
    el_skeleton_box,
    el_items_box,
    el_dom_header
} from "./dom_elements.mjs";

function mainReuqests() {
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars?limit=10")
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
    })
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

window.addEventListener("scroll",()=>{
    if(window.scrollY>750) {
        el_dom_header.classList.add("sticky");
    } else {
        el_dom_header.classList.remove("sticky");
    }
});