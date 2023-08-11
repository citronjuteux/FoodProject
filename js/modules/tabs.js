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

export default tabs