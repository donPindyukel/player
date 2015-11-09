var link = document.querySelector(".btn");

var link3 = document.querySelector(".btn3");

var popup = document.querySelector('.modal-menu');
var close = document.querySelector('.close');
var login = popup.querySelector('[name=nick]');
var form = popup.querySelector('form');
var phone = popup.querySelector('[name=phone');
var storage = localStorage.getItem('login');


// отображение меню
link.addEventListener("click", function(event) {
	event.preventDefault();
	window.scrollTo(0,0);
	popup.classList.add('modal-menu-show');
	login.focus();
//считывание из хранилища и автофокус
	if (storage) {
		login.value = storage;
		phone.focus();
	} else {
		login.focus();
	}

});



link3.addEventListener("click", function(event) {
	event.preventDefault();
	window.scrollTo(0,0);
	popup.classList.add('modal-menu-show');
	login.focus();
//считывание из хранилища и автофокус
	if (storage) {
		login.value = storage;
		phone.focus();
	} else {
		login.focus();
	}

});


//нажатие на кнопку закрыть
close.addEventListener("click", function(event) {
   event.preventDefault();
   popup.classList.remove('modal-menu-show');
   popup.classList.remove('modal-error');
});


//нажатие субмит
form.addEventListener('submit', function(event) {
	
	event.preventDefault();
	console.log(login.value);
	console.log(phone.value);


	if (!(login.value && phone.value)) {
	   event.preventDefault();
	   console.log('Нужно ввести имя и телефон');
       
       
            popup.classList.remove("modal-error");
         
       popup.classList.add("modal-error");    
          
     //сохраняем в хранилище логин 
	} else {
		localStorage.setItem('login', login.value);
	}
});

//закрываем по EsC
window.addEventListener('keydown', function(event) {
   if (event.keyCode == 27){
   	if (popup.classList.contains('modal-menu-show')) {
   	  popup.classList.remove('modal-menu-show');
   	}
   }
});

