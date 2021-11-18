const nav_catalogo = document.querySelector(".nav_catalogo");
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


window.addEventListener("scroll",e=>{
	nav_catalogo.classList.toggle("active", window.scrollY >0)
})

window.addEventListener("scroll",e=>{
	nav_catalogo.classList.toggle("active", window.scrollY >0)
})
 
class Galeria{
	constructor(config){
		this.container = document.querySelector(config.container);
		this.items = this.container.querySelectorAll(config.item);
		this.lightbox = this.container.querySelector(config.lightbox);
		this.modal = this.lightbox.querySelector(config.modal);
		this.config = config;
		this.addCustomAttribute();
		this.initEventListener();
	}

	addCustomAttribute(){
		let next = 0;
		let back = 0;

		for(let i = 0; i < this.items.length; i++){
			next = i + 1;
			back = i - 1;

			//Caso especial del ultimo item
			if (i === this.items.length - 1) {
				next = 0;
			}

			//Caso especial del primer item
			if (i === 0) {
				back = this.items.length - 1;
			}

			this.items[i].setAttribute('data-next_item', next);
			this.items[i].setAttribute('data-back_item', back);			
		}
	}

	initEventListener(){
		this.items.forEach(item =>{
			item.addEventListener('click',e=>{
				let img = this.getImg(item);
				this.showLightbox(img.getAttribute('src'), item.dataset.next_item, item.dataset.back_item);
			})
		});

		this.modal.addEventListener('click',e=>{
			let element = e.target;

			if (element.classList.contains(this.config.controls.back)) {
				this.changeImg(false);
			}else if (element.classList.contains(this.config.controls.next)) {
				this.changeImg(true);
			}else if (element.classList.contains(this.config.controls.close)){
				this.lightbox.classList.remove(this.config.showLightbox)
			}
		});		
	}

	getImg(item){
		return item.querySelector(this.config.galleryImgClass);
	}

	showLightbox(imgSrc, nextItem, backItem){
		this.lightbox.classList.add(this.config.showLightbox);
		this.addImgModal(imgSrc, nextItem, backItem);
	}

	addImgModal(imgSrc, nextItem, backItem){
		this.modal.setAttribute('data-next_item', nextItem);
		this.modal.setAttribute('data-back_item', backItem);	
		let imgModal = this.modal.querySelector(this.config.modalImgClass);
		imgModal.setAttribute('src', imgSrc);
	}

	changeImg(isNext){
		let indexItem = this.modal.dataset.back_item;
		if (isNext){
			indexItem = this.modal.dataset.next_item;
		}
		let item = this.items[indexItem];
		let img = this.getImg(item);
		this.addImgModal(img.getAttribute('src'), item.dataset.next_item, item.dataset.back_item);
				
	}
}	


new Galeria({
	container: '.contenedorCatalogo',
	item: '.contenedorCatalogo_item',
	galleryImgClass: '.item_img',
	lightbox: '.contenedor_lightbox',
	showLightbox: 'show',
	modal: '.lightbox_modal',
	modalImgClass: '.lightbox_control_img',
	controls: {close: 'icon_close', next: 'icon_next', back: 'icon_back'}
});


