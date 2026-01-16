function SystemModeChanger(mode_type="system") {
    if(localStorage.getItem("theme-mode")==null) {
        localStorage.setItem("theme-mode",mode_type)
    } else {
        localStorage.setItem("theme-mode",mode_type)
    }
    if(localStorage.getItem("theme-mode")=="system") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.remove("light");
    } else if(localStorage.getItem("theme-mode")=="light") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
    } else if(localStorage.getItem("theme-mode")=="dark") {
        document.querySelector("html").classList.remove("light");
        document.querySelector("html").classList.add("dark");
    }
}
SystemModeChanger();

document.querySelectorAll(".js-theme-btns").forEach(el=>{
    el.addEventListener("click",(evt)=>{
        SystemModeChanger(evt.target.getAttribute("data-theme-value"));
    })
})