import {addZero} from './timer'

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
    current.textContent = addZero(slideIndex)
    total.textContent = addZero(slides.length)

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
        current.textContent = addZero(slideIndex)
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
        current.textContent = addZero(slideIndex)
        dotsPaint(dots)
    })

    dots.forEach(item => {
        item.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to')
            slideIndex = slideTo
            offset = stringToNumber(width) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`
            current.textContent = addZero(slideIndex)
            
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

export default slider