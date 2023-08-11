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

export default modal
export {showWindow, closeWindow}