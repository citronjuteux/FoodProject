/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector('.calculating__result span')
    let age, gender, height, weight, ratio

    if (localStorage.getItem('gender')){
        gender = localStorage.getItem('gender')
    } else {
        gender = 'female'
        localStorage.setItem('gender', 'female')
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSettings(selector, activeClass) {
         const elements = document.querySelectorAll(selector)

         elements.forEach(element => {
            element.classList.remove(activeClass)
            if(element.getAttribute('id') === localStorage.getItem('gender')) {
                element.classList.add(activeClass)
            }
            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass)
            }
         })
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() {
        if(!age || !gender || !height || !weight || !ratio) {
            result.textContent = 'NaN'
            return 
        }
       if (gender === female) {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
       } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
       }
    }
    calcTotal()

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'))
                } else {
                    gender = event.target.getAttribute('id')
                    localStorage.setItem('gender', event.target.getAttribute('id'))
                }

                elements.forEach(item => {
                    item.classList.remove(activeClass)
                })
                event.target.classList.add(activeClass)
    
                calcTotal()
            })
        })
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')
    
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break
                case 'weight':
                    weight = +input.value
                    break
                case 'age':
                    age = +input.value
                    break
            }
            calcTotal()
        })

    }
    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, subtitle, descr, price, parentElem, ...classes) {
            this.src = src
            this.alt = alt
            this.subtitle = subtitle
            this.descr = descr
            this.price = price
            this.classes = classes
            this.convertion = 10
            this.parentElem = document.querySelector(parentElem)
            this.convertCurr()
        }
        convertCurr = () => this.price = this.price * this.convertion

        render() {
            const element = document.createElement('div')
            if (this.classes.length === 0) {
                this.classes = 'menu__item'
                element.classList.add(this.classes)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                <img src=${this.src}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            `
            this.parentElem.append(element)
        }
    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(modalTimer) {
    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thanks, we will contact you asap',
        failure: 'Something wend wrong...'
    }

    forms.forEach(item => {
        bindPostData(item)
    })



    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage) 
            const formData = new FormData(form)
        
            const object = JSON.stringify(Object.fromEntries(formData.entries()))
            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', object)
            .then(data => {
                console.log(data)
                showThanksModal(message.success)
                statusMessage.remove()

            })
            .catch(() => {
                showThanksModal(message.failure)
            })
            .finally(() => {
                form.reset()
            })
         })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
        
        prevModalDialog.classList.add('hide')
        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showWindow)('.modal', modalTimer)
        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal_dialog')
        thanksModal.innerHTML = `
            <div class='modal__content'>
            <div data-close class="modal__close">×</div>
                <div class='modal__title'>${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeWindow)('.modal')
        }, 5000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeWindow": () => (/* binding */ closeWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showWindow": () => (/* binding */ showWindow)
/* harmony export */ });
function closeWindow (modalSelector) {
    const modalWindow = document.querySelector(modalSelector)

    modalWindow.classList.remove('show')
    modalWindow.classList.add('hide')
    document.body.style.overflow = ''

}
function showWindow (modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector)

    modalWindow.classList.remove('hide')
    modalWindow.classList.add('show')
    document.body.style.overflow = 'hidden'
    if (modalTimer) {
        clearInterval(modalTimer)
    }
}

function modal(triggerSelector, modalSelector, modalTimer) {
        const modalTrigger = document.querySelectorAll(triggerSelector),
              modalWindow = document.querySelector(modalSelector)

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => showWindow(modalSelector, modalTimer))
    })

    modalWindow.addEventListener('click', (event) =>{
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            closeWindow(modalSelector)
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' || event.code === 'ArrowDown' && modalWindow.classList.contains('show')) {
            closeWindow(modalSelector)
        }
    })

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showWindow(modalSelector, modalTimer)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({container, slide, nextArrow, previousArrow, totalCounter, currentCounter, wrapper, field}) {   
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          arrowNext = document.querySelector(nextArrow),
          arrowPrev = document.querySelector(previousArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width

    let slideIndex = 1,
        offset = 0
    
    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'
    slidesWrapper.style.overflow = 'hidden'
    current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex)
    total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slides.length)

    slides.forEach(slide => {
        slide.style.width = width   
    })

    slider.style.position = 'relative'
    const indicators = document.createElement('ol'),
          dots = []
    indicators.classList.add('carousel-indicators')
    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot')
        dots.push(dot)
        indicators.append(dot)
    }

    function dotsPaint(arr) {
        arr.forEach(elem => elem.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    }
    dotsPaint(dots)

    function stringToNumber(string) {
       return +string.replace(/\D/g, '')
    }

    arrowNext.addEventListener('click', () => {
        if (offset == stringToNumber(width) * (slides.length - 1)){
            offset = 0
            slideIndex = 0
        } else {
            offset += stringToNumber(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        slideIndex += 1
        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex)
        dotsPaint(dots)
    })
    arrowPrev.addEventListener('click', () => {
        if(offset == 0){
            offset = stringToNumber(width) * (slides.length - 1)
            slideIndex = slides.length + 1
        } else {
            offset -= stringToNumber(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        slideIndex -= 1
        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex)
        dotsPaint(dots)
    })

    dots.forEach(item => {
        item.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to')
            slideIndex = slideTo
            offset = stringToNumber(width) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`
            current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex)
            
            dotsPaint(dots)
        })
    })

// Old Slider

    // function showSlides(index) {
    //     if (index > slides.length) {
    //         slideIndex = 1
    //     }
    //     if (index < 1) {
    //         slideIndex = slides.length
    //     }

    //     slides.forEach(slide => {
    //         slide.classList.add('hide')
    //         slide.classList.remove('show')
    //         slides[slideIndex - 1].classList.add('show')
    //         slides[slideIndex - 1].classList.remove('hide')
    //     })
    //     total.textContent = addZero(slides.length)
    //     current.textContent = addZero(slideIndex)
    // }
    // showSlides(slideIndex)

    // function changeSlide(n) {
    //     showSlides(slideIndex += n)
    // }
    // arrowNext.addEventListener('click', () => {
    //     changeSlide(1)
    // })
    // arrowPrev.addEventListener('click', () => {
    //     changeSlide(-1)
    // })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector)

    function hideTabContent() {
        tabsContent.forEach(element => {
            element.classList.add('hide')
            element.classList.remove('show','fade')
        })
        tabs.forEach(element => {
            element.classList.remove(activeClass)
        })
    }

    function showTabContent(element = 0) {
        tabsContent[element].classList.add('show', 'fade')
        tabsContent[element].classList.remove('hide')
        tabs[element].classList.add('tabheader__item_active')
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZero": () => (/* binding */ addZero),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function addZero(time) {
    if (time >= 0 && time <= 9) {
        return `0${time}`
    } else {
        return time
    }
}

function timer(id, deadline) {
    setClock(id, deadline)

    function getTimeRemaining(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(time/(1000*60*60*24)),
              hours = Math.floor((time/(1000*60*60))%24),
              minutes = Math.floor((time/(1000*60))%60),
              seconds = Math.floor((time/1000)%60)

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    } 

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000)
        updateClock()
        
        function updateClock(){
            const time = getTimeRemaining(deadline)

            days.innerHTML = addZero(time.days)
            hours.innerHTML = addZero(time.hours)
            minutes.innerHTML = addZero(time.minutes)
            seconds.innerHTML = addZero(time.seconds)

            if (time.total <= 0) {
                clearInterval(timeInterval)
            }
        }

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })
    return await res.json()
}
const getResources = async (url) => {
    const result = await fetch(url)
    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status} `)
    }

    return await result.json()
}

 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










document.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showWindow)('.modal', modalTimer), 15000)

    ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
    ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer)
    ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer','2022-07-25')
    ;(0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])()
    ;(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])()
    ;(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(modalTimer)
    ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        previousArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        field: '.offer__slider-inner',
        wrapper: '.offer__slider-wrapper'
    })
})


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map