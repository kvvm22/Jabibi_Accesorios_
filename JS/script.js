const btn_menu = document.querySelector(".btn_menu");
const right_menu = document.querySelector(".right_menu");


btn_menu.addEventListener("click",e=>{
	right_menu.classList.toggle("spread")
})

window.addEventListener('click',e=>{
	if (right_menu.classList.contains("spread") && e.target != right_menu && e.target != btn_menu) {
		right_menu.classList.toggle("spread")
	}
});



