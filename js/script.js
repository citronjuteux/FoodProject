import calculator from './modules/calculator'
import cards from './modules/cards'
import forms from './modules/forms'
import modal from './modules/modal'
import slider from './modules/slider'
import tabs from './modules/tabs'
import timer from './modules/timer'
import {showWindow} from './modules/modal'


document.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => showWindow('.modal', modalTimer), 15000)

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
    modal('[data-modal]', '.modal', modalTimer)
    timer('.timer','2022-07-25')
    cards()
    calculator()
    forms(modalTimer)
    slider({
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

