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

export default timer
export {addZero}