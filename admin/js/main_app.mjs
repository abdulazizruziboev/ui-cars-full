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
    el_edit_modal_close
} from "./dom_elements.mjs";

function elemetsNotFound(bool) {
    if(bool==true) {
        document.querySelector(".js-elements-nf").classList.remove("opacity-[0]");
        document.querySelector(".js-elements-nf").classList.add("opacity-[1]");
    } else if(bool==false) {
        document.querySelector(".js-elements-nf").classList.remove("opacity-[1]");
        document.querySelector(".js-elements-nf").classList.add("opacity-[0]");
    }
}

el_edit_modal_close.addEventListener("click",()=>{
    mainRequest();
    setTimeout(() => {
    el_edit_modal.classList.remove("flex");
    el_edit_modal.classList.add("hidden");
    }, 1200);
})

function mainRequest() {
    fetch("https://json-api.uz/api/project/fn44-amaliyot/cars")
    .then((res)=>res.json())
    .then(
        (res)=>{
            if(res.data==null||res.data=='') {
                elemetsNotFound(true);
            }
            itemsUI(res.data);
        }
    );
}

mainRequest();

function itemsUI(data) {
    el_items_box.innerHTML=null;
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

    function deleteToast(text,color) {
        document.querySelector(".js-delete-toast-text").textContent=text;
        document.querySelector(".js-delete-toast").style.cssText=`
        box-shadow: inset 0px 0px 10px ${color};
        border-color: ${color};
        `;
        document.querySelector(".js-delete-toast").classList.remove("opacity-[0]");
        document.querySelector(".js-delete-toast").classList.add("opacity-[1]");
        setTimeout(()=>{
        document.querySelector(".js-delete-toast").classList.remove("opacity-[1]");
        document.querySelector(".js-delete-toast").classList.add("opacity-[0]");
        },2000)
    }

    document.querySelectorAll(".js-delete-button").forEach(el=>{
    el.addEventListener("click",(evt)=>{
    deleteToast("Request sending","#00bafe");
    let card = evt.target.closest(".js-item-card");
    card.style.cssText = 
    `
    transition: box-shadow 1s ease-in-out;
    box-shadow: inset 0px 0px 40px #ffee00ae;
    `
    let id = evt.target.getAttribute("data-delete-id");
    evt.target.style.cssText = 
    `opacity:0.75;pointer-events:none;`;
    setTimeout(()=>{
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
            setTimeout(() => {
                deleteToast("Deleted successfully","#00ff11ae");
            }, 500);
            setTimeout(()=>{
            card.style.cssText = 
            `
            transition: opacity 1s ease-in-out;
            opacity:0;
            `;
            evt.target.closest(".js-item-card").remove()
            },1000)
            setTimeout(()=>{
                if(document.querySelectorAll(".js-item-card").length==0) {
                    elemetsNotFound(true)
                }
            },2000);
        } else if(res!="deleted successfully"||!(res.ok)) {
            card.style.cssText = 
            `
            transition: box-shadow 1s ease-in-out;
            box-shadow: inset 0px 0px 40px #ff0000ae;
            `;
            setTimeout(() => {
            deleteToast("Error... try again","#ff0000ae");
            }, 500);
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
    },1200)
    });
    });

    document.querySelectorAll(".js-details-button").forEach(el=>{
       el.closest(".js-item-card").setAttribute("data-card-id",el.getAttribute("data-detail-id"))
    });


    document.querySelectorAll(".js-edit-button").forEach(el=>{
        el.addEventListener("click",(evt)=>{
            document.getElementById("editCarDetailsForm")
            .querySelectorAll("input, textarea")
            .forEach(el=>el.value='');            
            el_edit_modal.classList.remove("hidden");
            el_edit_modal.classList.add("flex");
            document.getElementById("editCarDetailsForm")
            .setAttribute("data-car-id",evt.target.getAttribute("data-edit-id"));
            editCarInputFiller(evt.target.getAttribute("data-edit-id"));
        });
    })
};

document.getElementById("editCarDetailsForm").addEventListener("submit",(evt)=>evt.preventDefault())

document.getElementById("editCarDetailsFormSubmit")
.addEventListener("click",()=>{
function editToast(textz="Request sending...",color) {
let toast=document.querySelector(".js-edit-toast");
let toastText=document.querySelector(".js-edit-toast-text");
toastText.textContent=textz;
toast.style.cssText=`
box-shadow: inset 0px 0px 20px ${color};
border-color: ${color};
`;
toast.classList.remove("opacity-[0]");
toast.classList.add("opacity-[1]");
setTimeout(()=>{
toast.classList.remove("opacity-[1]");
toast.classList.add("opacity-[0]");
},4000)
}
let emptyInputs=[];
document.querySelector("#editCarDetailsForm").querySelectorAll("input, textarea")
.forEach(el=>{
    if(el.value.trim()=='') {
        emptyInputs.push(el.ariaLabel)
    }
})

if(emptyInputs.length!=0) {
    document.querySelector("#editCarDetailsForm").querySelector(`[name="${emptyInputs[0]}"]`).focus()
    editToast(`Please fill ${emptyInputs[0]} input`,"#ff637d")
} else {
    editToast("Request sending...","#00bafe")
    document.querySelector("#editCarDetailsForm")
    .addEventListener("submit",(evt)=>{
        let id = evt.target.getAttribute("data-car-id");
        let formDatas = new FormData(document.querySelector("#editCarDetailsForm")) ;
        const reqObj = {
            name: formDatas.get("name"),
            trim: formDatas.get("trim"),
            year: formDatas.get("year"),
            generation: formDatas.get("generation"),
            country: formDatas.get("country"),
            category: formDatas.get("category"),
            color: formDatas.get("color"),
            colorName: formDatas.get("colorName"),
            doorCount: formDatas.get("doorCount"),
            seatCount: formDatas.get("seatCount"),
            maxSpeed: formDatas.get("maxSpeed"),
            acceleration: formDatas.get("acceleration"),
            engine: formDatas.get("engine"),
            horsepower: formDatas.get("horsepower"),
            fuelType: formDatas.get("fuelType"),
            description: formDatas.get("description"),
            fuelConsumption: {
                city: formDatas.get("cityConsumption"),
                highway: formDatas.get("highwayConsumption"),
                combined: formDatas.get("combinedConsumption"),
            }
        }
        fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(reqObj)
        })
        .then((res)=>{
                if(res.ok){
                    editToast(`Car successfuly edited!`,"#00d390")
                    editCarInputFiller(id)
                } else {
                    editToast(`Error... try again!`,"#ff637d");
                    editCarInputFiller(id)
                }
        }).catch((err)=>{
        console.log(err);
        editToast(`Opps server error... try again later!`,"#ff3636ff");
         })
    })
}
});

skeletonUI(true,20);
function skeletonUI(bool,len) {
    if(bool==true){
        el_skeleton_box.innerHTML="";
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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
let toast = document.querySelector(".js-add-toast");
toast.cssText=`transition: opacity 5s ease-in-out ;`;
let toastText = document.querySelector(".js-add-toast-text");
function addToast(textz,color) {
toastText.textContent=textz;
toast.style.cssText=`
box-shadow: inset 0px 0px 20px ${color};
border-color: ${color};
`;
toast.classList.remove("opacity-[0]");
toast.classList.add("opacity-[1]");
setTimeout(()=>{
toast.classList.remove("opacity-[1]");
toast.classList.add("opacity-[0]");
},4000)
}
document.querySelectorAll(".js-data-add-input").forEach(el=>{
   el.placeholder=`* Please enter ${el.ariaLabel}`;
});
document.querySelector(".js-data-add-button").addEventListener("click",()=>{
let text="";
let arr=[];
let arr2=[];
document.querySelectorAll(".js-data-add-input").forEach(el=>{
    if(el.value.trim()=='') {
        arr.push(el.ariaLabel);
        arr2.push(0);   
        setTimeout(()=>{
        el.classList.add("border-orange-600");
        el.classList.add("bg-red-200","dark:bg-[#82000d]");
        },250)
        setTimeout(()=>{
        el.classList.remove("border-orange-600");
        el.classList.remove("bg-red-200","dark:bg-[#82000d]");
        },500)
        setTimeout(()=>{
        el.classList.add("border-orange-600");
        el.classList.add("bg-red-200","dark:bg-[#82000d]");
        },750)
        setTimeout(()=>{
        el.classList.remove("border-orange-600");
        el.classList.remove("bg-red-200","dark:bg-[#82000d]");
        },1000)
        text=`Please field ${arr[0]} input!`;addToast(text,"#ff0000d6")
    }
});
if(arr2=='') {
    addToast("Request sending...","#00bafe")
    newCarAdd();
}
});

function newCarAdd() {
const newCarObj = {
"name": document.querySelector(`[data-input="name"]`).value,
"trim": document.querySelector(`[data-input="trim"]`).value,
"generation": document.querySelector(`[data-input="generation"]`).value,
"year": document.querySelector(`[data-input="year"]`).value,
"color": document.querySelector(`[data-input="color"]`).value,
"colorName": document.querySelector(`[data-input="colorName"]`).value,
"category": document.querySelector(`[data-input="category"]`).value,
"doorCount": document.querySelector(`[data-input="doorCount"]`).value,
"seatCount": document.querySelector(`[data-input="seatCount"]`).value,
"maxSpeed": document.querySelector(`[data-input="maxSpeed"]`).value+" km/h",
"acceleration": `0-100 km/h: ${document.querySelector(`[data-input="acceleration"]`).value}s`,
"engine": document.querySelector(`[data-input="engine"]`).value,
"horsepower": document.querySelector(`[data-input="horsepower"]`).value,
"fuelType": document.querySelector(`[data-input="fuelType"]`).value,
"fuelConsumption": {
"city": document.querySelector(`[data-input="cityConsumption"]`).value + " L/100km",
"highway": document.querySelector(`[data-input="highwayConsumption"]`).value+" L/100km",
"combined": document.querySelector(`[data-input="combinedConsumption"]`).value+" L/100km"
},
"country": document.querySelector(`[data-input="country"]`).value,
"description": document.querySelector(`[data-input="description"]`).value,
}
fetch("https://json-api.uz/api/project/fn44-amaliyot/cars",{
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(newCarObj)
    })
    .then(res=>{
        if(res.ok) {
            addToast("Car successfuly added","#00d390")
            document.querySelectorAll(".js-data-add-input").forEach(el=>el.value='');
            document.querySelector('[data-input="color"]').value='#000000';
        }
    }).catch((err)=>{
        addToast("Error... try again","#d30000ff");
        console.log(err);
    })
}

document.querySelector(".js-add-modal-close")
.addEventListener("click",()=>{
    document.querySelector(".js-add-modal").classList.remove("flex");
    document.querySelector(".js-add-modal").classList.add("hidden");
    document.querySelectorAll(".js-data-add-input").forEach(el=>el.value='',document.querySelector('[data-input="color"]').value='#000000');
})


document.querySelector(".js-add-modal-open")
.addEventListener("click",()=>{
    document.querySelector(".js-add-modal").classList.remove("hidden");
    document.querySelector(".js-add-modal").classList.add("flex");
    document.querySelectorAll(".js-data-add-input").forEach(el=>el.value='');
})


function editCarInputFiller(id) {
    editFormSkeleton(true)
    function editFormSkeleton(bool) {
        if(bool==true) {
        document.querySelector(".js-edit-template-box").innerHTML=null;
        document.querySelector(".js-edit-form").classList.remove("inline-block");
        document.querySelector(".js-edit-form").classList.add("hidden");
        let clone=document.querySelector(".js-edit-skeleton-template").cloneNode(true).content;
        document.querySelector(".js-edit-template-box").append(clone);
        } else if(bool==false) {
        document.querySelector(".js-edit-template-box").innerHTML=null;
        }
    }
    fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${id}`)
    .then(res=>res.json())
    .then(res=>{
        setTimeout(()=>editFormSkeleton(false),1000);
        setTimeout(()=>x(res),2000)
    });
    function x(data) {
        document.querySelector(".js-edit-template-box").innerHTML=null;
        document.querySelector(".js-edit-form").classList.remove("hidden");
        document.querySelector(".js-edit-form").classList.add("inline-block");
        let elEditCarForm=document.getElementById("editCarDetailsForm");
        elEditCarForm.querySelector(`[name="name"]`).value=data.name?data.name:"No data";
        elEditCarForm.querySelector(`[name="trim"]`).value=data.trim?data.trim:"No data";
        elEditCarForm.querySelector(`[name="year"]`).value=data.year?data.year:"No data";
        elEditCarForm.querySelector(`[name="year"]`).value=data.year?data.year:"No data";
        elEditCarForm.querySelector(`[name="generation"]`).value=data.generation?data.generation:"No data";
        elEditCarForm.querySelector(`[name="country"]`).value=data.country?data.country:"No data";
        elEditCarForm.querySelector(`[name="category"]`).value=data.category?data.category:"No data";
        elEditCarForm.querySelector(`[name="colorName"]`).value=data.colorName?data.colorName:"No data";
        elEditCarForm.querySelector(`[name="doorCount"]`).value=data.doorCount?data.doorCount:"No data";
        elEditCarForm.querySelector(`[name="seatCount"]`).value=data.seatCount?data.seatCount:"No data";
        elEditCarForm.querySelector(`[name="horsepower"]`).value=data.horsepower?data.horsepower:"No data";
        elEditCarForm.querySelector(`[name="fuelType"]`).value=data.fuelType?data.fuelType:"No data";
        elEditCarForm.querySelector(`[name="engine"]`).value=data.engine?data.engine:"No data";
        elEditCarForm.querySelector(`[name="description"]`).value=data.description?data.description:"No data";
        /* Splits */
        elEditCarForm.querySelector(`[name="color"]`).value=data.color?data.color:"#000000";
        elEditCarForm.querySelector(`[name="maxSpeed"]`).value=data.maxSpeed.replaceAll(/[ a-z \s+ / ]/g,"")?data.maxSpeed.replaceAll(/[ a-z \s+ / ]/g,""):"No data";
        elEditCarForm.querySelector(`[name="acceleration"]`).value=data.acceleration.replace("0-100 km/h: ","").replace("s","")
        ?data.acceleration.replace("0-100 km/h: ","").replace("s",""):"No data";
        elEditCarForm.querySelector(`[name="cityConsumption"]`).value=data.fuelConsumption.city.replaceAll(/[ a-z \s+ / ]/g,"")?data.fuelConsumption.city.replace(" L/100km",""):"No data";
        elEditCarForm.querySelector(`[name="highwayConsumption"]`).value=data.fuelConsumption.highway.replaceAll(/[ a-z \s+ / ]/g,"")?data.fuelConsumption.highway.replace(" L/100km",""):"No data";
        elEditCarForm.querySelector(`[name="combinedConsumption"]`).value=data.fuelConsumption.combined.replaceAll(/[ a-z \s+ / ]/g,"")?data.fuelConsumption.combined.replace(" L/100km",""):"No data";
    }
}
