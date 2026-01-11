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
    el_details_modal_close,
    el_edit_modal,
    el_edit_modal_close,
    el_edit_select,
    el_edit_input,
    el_edit_button,
    el_fuel_select,
    el_fuel_input
} from "./dom_elements.mjs";

let editID=null;

function mainReuqests() {
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars?limit=3")
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
        clone.querySelector(".js-details-button").setAttribute("data-detail-id",el.id?el.id:"no-data")
        clone.querySelector(".js-edit-button").setAttribute("data-edit-id",el.id?el.id:"no-data")
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
    let card = evt.target.closest(".js-item-card");
    card.style.cssText = 
    `
    transition: box-shadow 1s ease-in-out;
    box-shadow: inset 0px 0px 40px #ffee00ae;
    `
    let id = evt.target.getAttribute("data-delete-id");
    evt.target.style.cssText = 
    `opacity:0.75;pointer-events:none;`;
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars/"+id,{
        method:"DELETE"
    })
    .then(res=>res.text())
    .then(res=>{
        if(res=="deleted successfully"||res.ok) {
            card.style.cssText = 
            `
            transition: box-shadow 1s ease-in-out;
            box-shadow: inset 0px 0px 40px #00ff11ae;
            `;
            setTimeout(()=>{
            card.style.cssText = 
            `
            transition: opacity 1s ease-in-out;
            opacity:0;
            `;
            },1000)
            setTimeout(()=>evt.target.closest(".js-item-card").remove(),2000);
        } else if(res!="deleted successfully"||!(res.ok)) {
            card.style.cssText = 
            `
            transition: box-shadow 1s ease-in-out;
            box-shadow: inset 0px 0px 40px #ff0000ae;
            `;
            setTimeout(()=>{
            card.style.cssText = 
            `
            transition: box-shadow 1s ease-in-out;
            box-shadow: inset 0px 0px 0px transparent;
            `;
            evt.target.style.pointerEvents="all";
            evt.target.style.cssText = 
            `opacity:1;pointer-events:all;`;
            },1000)
        }
    })
    });
    });

    document.querySelectorAll(".js-edit-button").forEach(el=>{
        el.addEventListener("click",(evt)=>{
            editID=Number(evt.target.getAttribute("data-edit-id"));
            el_edit_modal.classList.remove("hidden");
            el_edit_modal.classList.add("flex");
            if(el_edit_select.value=="no_selected") {
            el_edit_input.disabled=true;
            }
        });
    })

    document.querySelectorAll(".js-details-button").forEach(el=>{
       el.closest(".js-item-card").setAttribute("data-card-id",el.getAttribute("data-detail-id"))
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

el_edit_modal_close.addEventListener("click",()=>{
    el_edit_modal.classList.remove("flex");
    el_edit_modal.classList.add("hidden");
});

if(el_edit_select.value=="no_selected") {
el_edit_input.disabled=true;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

el_edit_select.addEventListener("change",(evt)=>{
    if(evt.target.value!="no_selected") {
    el_edit_input.disabled=false;
    el_edit_input.placeholder=`Please enter value`;
    }
    /* *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */ 
    if(evt.target.value=="fuelConsumption") {
        el_fuel_select.hidden=false;
        el_fuel_select.disabled=false;
        el_fuel_input.hidden=false;
        el_edit_input.hidden=true;
        el_edit_button.setAttribute("data-type-nested","true");
    } else {
        el_edit_button.setAttribute("data-type-nested","false");
        el_fuel_select.hidden=true;
        el_fuel_select.disabled=true;
        el_fuel_input.hidden=true;
        el_edit_input.disabled=false;
        el_edit_input.hidden=false;
    }

    if(el_fuel_select.value=="no_selected") {
        el_fuel_input.disabled=true;
    }
})

el_fuel_select.addEventListener("change",(evt)=>{
    if(evt.target.value=="no_selected") {
            el_fuel_input.disabled=true;
    } else {
            el_fuel_input.disabled=false;
            el_fuel_input.placeholder=`Please enter ${evt.target.value} consumption`
    }
});

function editToast(text,color,field_bool) {
    document.querySelector(".js-edit-toast-text").textContent=text;
    document.querySelector(".js-edit-toast").style.cssText=`
    box-shadow: inset 0px 0px 10px ${color};
    border-color: ${color};
    `;
    document.querySelector(".js-edit-toast").classList.remove("opacity-[0]");
    document.querySelector(".js-edit-toast").classList.add("opacity-[1]");
    if(field_bool==true) {
    setTimeout(()=>{
        el_fuel_input.classList.add("bg-red-200","dark:bg-[#555]")
        el_edit_input.classList.add("bg-red-200","dark:bg-[#555]")
    }
        ,250)
    setTimeout(()=>{
        el_fuel_input.classList.remove("bg-red-200","dark:bg-[#555]")
        el_edit_input.classList.remove("bg-red-200","dark:bg-[#555]")
    }
        ,500)
    setTimeout(()=>{
        el_fuel_input.classList.add("bg-red-200","dark:bg-[#555]")
        el_edit_input.classList.add("bg-red-200","dark:bg-[#555]")
    }
        ,750)
    setTimeout(()=>{
        el_fuel_input.classList.remove("bg-red-200","dark:bg-[#555]")
        el_edit_input.classList.remove("bg-red-200","dark:bg-[#555]")
    }
        ,1000)
    setTimeout(()=>{
        el_fuel_input.classList.add("bg-red-200","dark:bg-[#555]")
        el_edit_input.classList.add("bg-red-200","dark:bg-[#555]")
    }
        ,1250)
    setTimeout(()=>{
        el_fuel_input.classList.remove("bg-red-200","dark:bg-[#555]")
        el_edit_input.classList.remove("bg-red-200","dark:bg-[#555]")
    }
        ,1500)
    }
    setTimeout(()=>{
    document.querySelector(".js-edit-toast").classList.remove("opacity-[1]");
    document.querySelector(".js-edit-toast").classList.add("opacity-[0]");
    },2000)
}

el_edit_button.addEventListener("click",()=>{
if(el_edit_button.getAttribute("data-type-nested")=="false") {
    if(el_edit_input.value.trim()=='') {
    editToast("Please fill in all fields.","#fcb900",true)
    } else {    
        editToast("Request Sending... Please wait","#00cafcff")
        fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${editID}`
            ,{
                method:"PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({[el_edit_select.value.trim()]:el_edit_input.value.trim()})
            }
        )
        .then((res)=>{
            if(res.ok) {
                editToast("Detail successfully changed.","#00d390",false)
                el_edit_select.value='no_selected';
                el_edit_input.value='';
                el_edit_input.disabled=true;
            }
        }).catch(()=>{
                editToast("Error... Try again.","#ff637d",false)
        })
    }
} else if (el_edit_button.getAttribute("data-type-nested")=="true") {
if(el_fuel_input.value.trim()=='') {
    editToast("Please fill in all fields.","#fcb900",true)
} else {
    editToast("Request Sending... Please wait","#00cafcff",false)
    let responseObj=null;
    fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${editID}`)
    .then(res=>res.json())
    .then(res=>{
        responseObj={...res.fuelConsumption}
        nextRes()
    });
    function nextRes() {
        responseObj[el_fuel_select.value.trim()]=`${el_fuel_input.value.trim()} L/100km`;
        console.log({"fuelConsumption":{...responseObj}});
        fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${editID}`
            ,{
                method:"PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({"fuelConsumption":{...responseObj}})
            }
        )
    .then((res)=>{
        if(res.ok) {
            editToast("Detail successfully changed.","#00d390",false)
            el_edit_select.value='no_selected';
            el_edit_input.value='';
            el_edit_input.disabled=true;
            el_edit_input.hidden=false;
            el_fuel_select.value='no_selected';
            el_fuel_select.disabled=true;
            el_fuel_select.hidden=true;
            el_fuel_input.value='';
            el_fuel_input.disabled=true;
            el_fuel_input.hidden=true;
        }
    }).catch(()=>{
            editToast("Error... Try again.","#ff637d",false)
    })    
    }
}
}
})


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */

document.querySelectorAll(".js-data-add-input").forEach(el=>{
   el.placeholder=`* Please enter ${el.ariaLabel}`;
});

document.querySelector(".js-data-add-input").addEventListener("click",()=>{
document.querySelectorAll(".js-data-add-input").forEach(el=>{
   el.placeholder=`* Please enter ${el.ariaLabel}`;
});     
})