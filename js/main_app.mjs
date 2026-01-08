import {
  el_theme_changer,
  el_moon,
  el_sun,
  el_skeleton_templates,
  el_cards_templates,
  el_skeleton_box,
  el_cards_box,
  el_pagination_box,
  el_pagination_previous,
  el_pagination_next
} from "./dom_elements.mjs";
let api_skip = 0,
api_limit = 2;
mainRequests();
function mainRequests() {
    skeletonUI(true,api_limit);
    fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars?skip=${api_skip}&limit=${api_limit}`)
    .then((res)=>res.json())
    .then((res)=>{
        skeletonUI(false);
        cardsUI(res.data)
    })
}
function skeletonUI(bool,el_limit) {
el_skeleton_box.innerHTM=null;
el_cards_box.innerHTML=null;
if(bool==true) {
Array.from({length: el_limit}).forEach(()=>{
    let el_clone_skeleton=el_skeleton_templates.cloneNode(true).content;
    el_skeleton_box.append(el_clone_skeleton);
});} else if(bool==false) {
    el_skeleton_box.innerHTML=null;
};};

function cardsUI(data) {
    el_pagination_box.style.display="flex"
    data.forEach((el,inx)=>{
        let el_clone_card = el_cards_templates.cloneNode(true).content;
        el_clone_card.querySelector(".js-car-title").textContent=el.name?el.name:"No data";
        el_clone_card.querySelector(".js-car-trim").textContent=el.trim?el.trim:"No data";
        el_clone_card.querySelector(".js-car-generation").textContent=el.generation?el.generation:"No data";
        el_clone_card.querySelector(".js-car-year").textContent=el.year?el.year:"No data";
        el_clone_card.querySelector(".js-car-category").textContent=el.category?el.category:"No data";
        el_clone_card.querySelector(".js-car-link").href=`/details?id=${el.id}`?`/details?id=${el.id}`:`/details?id=${inx}`;
        el_cards_box.append(el_clone_card);
    });
}
el_pagination_previous.addEventListener("click",()=>{
    api_skip=api_skip-api_limit;
    alert(api_skip);
    mainRequests();
});
el_pagination_next.addEventListener("click",()=>{
    api_skip=api_skip+api_limit;
    alert(api_skip);
    mainRequests();
});