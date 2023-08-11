import {getResources} from '../services/services'

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


    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

}

export default cards