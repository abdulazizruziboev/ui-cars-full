import {
  el_skeleton_templates,
  el_cards_templates,
  el_skeleton_box,
  el_cards_box,
  el_pagination_box,
  el_pagination_previous,
  el_pagination_next,
  el_reload_btn,
  el_error_box
} from "./dom_elements.mjs";
let api_skip = 0,
api_limit = 16;
mainRequests();
function mainRequests() {
    let api_url=`https://json-api.uz/api/project/fn44-amaliyot/cars?skip=${api_skip}&limit=${api_limit}`;
    skeletonUI(true,api_limit);
    fetch(api_url)
    .then((res)=>{
       return res.json()
    })
    .then((res)=>{
        skeletonUI(false);
        if(res.data==null) {
            document.querySelector(".js-elements-nf").classList.remove("opacity-[0]");
            document.querySelector(".js-elements-nf").classList.add("opacity-[1]");
        } else {
            document.querySelector(".js-elements-nf").classList.remove("opacity-[1]");
            document.querySelector(".js-elements-nf").classList.add("opacity-[0]");    
        };
        cardsUI(res.data, res.total);
    }).catch(()=>el_error_box.style.display="flex");
}
function skeletonUI(bool,el_limit) {
el_skeleton_box.innerHTM="";
el_cards_box.innerHTML="";
if(bool==true) {
Array.from({length: el_limit}).forEach(()=>{
    let el_clone_skeleton=el_skeleton_templates.cloneNode(true).content;
    el_skeleton_box.append(el_clone_skeleton);
});} else if(bool==false) {
    el_skeleton_box.innerHTML="";
};};

function cardsUI(data,total) {
    /**/
    if(api_skip===0) el_pagination_previous.style.display='none';
    else if(api_skip!==0) el_pagination_previous.style.display='flex';
    /**/
    paginationDisabler(false);
    el_pagination_box.style.display="flex";
    el_cards_box.innerHTML="";
    data.forEach((el,inx)=>{
        let el_clone_card = el_cards_templates.cloneNode(true).content;
        el_clone_card.querySelector(".js-car-title").textContent=el.name?el.name:"No data";
        el_clone_card.querySelector(".js-car-trim").textContent=el.trim?el.trim:"No data";
        el_clone_card.querySelector(".js-car-generation").textContent=el.generation?el.generation:"No data";
        el_clone_card.querySelector(".js-car-year").textContent=el.year?el.year:"No data";
        el_clone_card.querySelector(".js-car-category").textContent=el.category?el.category:"No data";
        el_clone_card.querySelector(".js-car-link").href=`/details?id=${el.id}`?`/details/index.html?id=${el.id}`:`/details?id=${inx}`;
        el_cards_box.append(el_clone_card);
    });
    /**/
    if(el_cards_box.innerHTML=="") el_pagination_box.style.display="none";
    else el_pagination_box.style.display="flex";
    if(document.querySelectorAll(".js-car-card").length<api_limit) el_pagination_next.style.display="none";
}

el_pagination_previous.addEventListener("click",()=>{
    api_skip=api_skip-api_limit;
    paginationDisabler(true);
    mainRequests();
});
el_pagination_next.addEventListener("click",()=>{
    api_skip=api_skip+api_limit;
    paginationDisabler(true);
    mainRequests();
});

function paginationDisabler(bool) {
    if(bool==true) {
    el_pagination_next.style.pointerEvents="none";
    el_pagination_next.style.pointerEvents="none";
    } else {
    el_pagination_next.style.pointerEvents="all";
    el_pagination_next.style.pointerEvents="all";    
    }
};

el_reload_btn.addEventListener("click",()=>{
    location.reload()
});