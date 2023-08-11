import {showWindow, closeWindow} from './modal'
import {postData} from '../services/services'

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
            postData('http://localhost:3000/requests', object)
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
        showWindow('.modal', modalTimer)
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
            closeWindow('.modal')
        }, 5000)
    }
}

export default forms