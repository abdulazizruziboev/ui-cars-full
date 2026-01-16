function SystemModeChanger(mode_type="system") {
    if(localStorage.getItem("theme-mode")==null) {
        localStorage.setItem("theme-mode",mode_type)    
    } else {
        localStorage.setItem("theme-mode",mode_type)
    }
    if(localStorage.getItem("theme-mode")=="system") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.remove("light");
        /*  */
        document.querySelector(`.js-theme-btns-system`).classList.add("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-light`).classList.remove("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-dark`).classList.remove("bg-[#1f8fff]","text-white");
        /*  */
    } else if(localStorage.getItem("theme-mode")=="light") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
        /*  */
        document.querySelector(`.js-theme-btns-light`).classList.add("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-system`).classList.remove("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-dark`).classList.remove("bg-[#1f8fff]","text-white");
        /*  */
    } else if(localStorage.getItem("theme-mode")=="dark") {
        document.querySelector("html").classList.remove("light");
        document.querySelector("html").classList.add("dark");
        /*  */
        document.querySelector(`.js-theme-btns-dark`).classList.add("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-light`).classList.remove("bg-[#1f8fff]","text-white");
        document.querySelector(`.js-theme-btns-system`).classList.remove("bg-[#1f8fff]","text-white");
        /*  */
    }
}
SystemModeChanger();

document.querySelectorAll(".js-theme-btns").forEach(el=>{
    el.addEventListener("click",(evt)=>{
        SystemModeChanger(evt.target.getAttribute("data-theme-value"));
    })
})