function SystemModeChanger(mode_type="light") {
    if(!(localStorage.getItem("theme-mode"))) {
        localStorage.setItem("theme-mode",mode_type)    
    }
    if(localStorage.getItem("theme-mode")=="light") {
        document.querySelector("html").setAttribute("data-theme","light");
        /*  */
        document.querySelector(`.js-theme-btns-light`).classList.add("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-dark`).classList.remove("bg-[#1f8fff]","text-white");
        /*  */
    } else if(localStorage.getItem("theme-mode")=="dark") {
        document.querySelector("html").setAttribute("data-theme","dark");
        /*  */
        document.querySelector(`.js-theme-btns-dark`).classList.add("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-light`).classList.remove("bg-[#1f8fff]","text-white");
        /*  */
    }
}
SystemModeChanger();

document.querySelectorAll(".js-theme-btns").forEach(el=>{
    el.addEventListener("click",(evt)=>{
        console.log(evt.target.getAttribute("data-theme-value"));
        document.querySelector("html").setAttribute("data-theme",evt.target.getAttribute("data-theme-value"));
        localStorage.setItem("theme-mode",evt.target.getAttribute("data-theme-value"))
        SystemModeChanger()
    })
})