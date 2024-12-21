let dateRender = new Date()

let currentYear = dateRender.getFullYear()
let currentMonth = dateRender.getMonth()
let currentDate = dateRender.getDate()

let lastClick
let newEvent

//HTML Elements
const _clickedOnDay = document.getElementById('clickedOnDay')
const _submitDate = document.getElementById('submitDate')
const _cancelBtn = document.getElementById('cancelBtn')
const _nextYear = document.getElementById('nextYear')
const _prevYear = document.getElementById('prevYear')
const _clickedDate = document.getElementById('clickedDate')
const _backgroundColor = document.getElementById('backgroundColor')
const _eventName = document.getElementById('eventName')
const _eventNameContainer = document.getElementById('eventNameContainer')
const _settingsIcon = document.getElementById('settingsIcon')
const _settingsBox = document.getElementById('settingsBox')
const _settingsColor = document.getElementById('settingsColor')
const dayDifferenceBox = document.getElementById('dayDifferenceBox')
const _settingsCloseBtn = document.getElementById('settingsCloseBtn')
const _createEvent = document.getElementById('createEvent')
const _createEventText = document.querySelectorAll('.eventText')
const displayYear = document.getElementById('displayYear')
const loopDayDates = document.getElementsByClassName('dayDates')
const dayDifferenceBtn = document.getElementById('dayDifferenceBtn')
const _title = document.getElementById('title')

const colorDark = '#272727'
const colorLight = '#e9dada'

//Settings
_settingsBox.style.display = 'none'

_settingsIcon.addEventListener('click', () => {
  _settingsBox.style.display = 'block'
})

_settingsCloseBtn.addEventListener('click', () => {
  _settingsBox.style.display = 'none'
})

_settingsColor.addEventListener('click', () => {
  _settingsColor.style.backgroundColor = _settingsColor.value

  if (_settingsColor.value == 'white') {
    _settingsColor.style.color = '#000'
    _settingsColor.style.borderColor = '#000'
    document.body.style.color = colorDark
    document.body.style.backgroundColor = colorLight
    _settingsBox.style.borderColor = colorDark
    dayDifferenceBox.style.borderColor = colorDark
    _clickedOnDay.style.borderColor = colorDark
    _settingsIcon.src = 'assets/settingsDark.png'

    for (let i = 0; i < loopDayDates.length; i++) {
      let element = loopDayDates[i]
      element.style.color = colorDark
    }
  } else {
    _settingsColor.style.color = '#fff'
    _settingsColor.style.borderColor = '#fff'
    document.body.style.color = colorLight
    document.body.style.backgroundColor = colorDark
    _settingsBox.style.borderColor = colorLight
    dayDifferenceBox.style.borderColor = colorLight
    _clickedOnDay.style.borderColor = colorLight
    _settingsIcon.src = 'assets/settingsLight.png'

    for (let i = 0; i < loopDayDates.length; i++) {
      let element = loopDayDates[i]
      element.style.color = colorLight
    }
  }
})

//Day Diffrence
dayDifferenceBtn.addEventListener('click', () => {
  const _date1 = document.getElementById('date1')
  const _date2 = document.getElementById('date2')

  let date1 = new Date(_date1.value)
  let date2 = new Date(_date2.value)

  let subtractDays = date1 - date2
  let dayCalculation = Math.abs(Math.floor(subtractDays / (1000 * 60 * 60 * 24)))
  let dayDifference = document.getElementById('dayDifference')
  dayDifference.innerText = `Day Difference: ${dayCalculation} days`
})

//Selection Coloring
_backgroundColor.addEventListener('click', () => {
  _backgroundColor.style.backgroundColor = _backgroundColor.value
})

//Clock
function updateClock() {
  const now = new Date()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const timeString = `${hours}:${minutes}:${seconds}`
  document.getElementById('clock').textContent = timeString
}

setInterval(updateClock, 1000)
updateClock()

//monthDayCount & firstWeekDayOfMonth
let monthDayCount
let firstWeekDayOfMonth

function calcMonthDays() {
  monthDayCount = new Date(currentYear, currentMonth + 1, 0)
  monthDayCount = monthDayCount.getDate()
  firstWeekDayOfMonth = new Date(currentYear, currentMonth, 1)
  firstWeekDayOfMonth = firstWeekDayOfMonth.getDay() - 1
}
calcMonthDays()

if (currentMonth > 11) {
  currentMonth = 0
  currentYear++
}

//Date Names
weekdayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//Event Storage
let storeEvents = []
class eventOject {
  constructor(eventid, backgroundColor, title, date, month, year) {
    this.eventid = eventid
    this.backgroundColor = backgroundColor
    this.title = title
    this.date = date
    this.month = month
    this.year = year
  }
}

const _prevMonth = document.getElementById('prevMonth')

//Event Buttons
_createEvent.addEventListener('click', () => {
  _createEventText.forEach((label) => {
    label.style.display = 'inline'
  })
  _backgroundColor.style.display = 'inline'
  _eventName.style.display = 'inline'
  _submitDate.style.display = 'inline'
})

_submitDate.addEventListener('click', () => {
  let backgroundColorValue = _backgroundColor.value
  let eventNameValue = _eventName.value

  let dateElement = document.getElementById(lastClick)

  if (dateElement) {
    dateElement.style.backgroundColor = backgroundColorValue
    _eventNameContainer.innerText = eventNameValue
  }

  _clickedOnDay.style.display = 'none'
  _eventName.value = ''

  let splitDate = lastClick.split('-')

  newEvent = new eventOject(lastClick, backgroundColorValue, eventNameValue, splitDate[1], splitDate[0], splitDate[2])
  storeEvents.push(newEvent)
})

_cancelBtn.addEventListener('click', () => {
  _clickedOnDay.style.display = 'none'

  _createEventText.forEach((label) => {
    label.style.display = 'none'
  })
  _backgroundColor.style.display = 'none'
  _eventName.style.display = 'none'
  _submitDate.style.display = 'none'
})

let allCalendars = document.getElementById('allCalendars')

function renderGaps() {
  for (let gaps = 0; gaps < (firstWeekDayOfMonth != -1 ? firstWeekDayOfMonth : firstWeekDayOfMonth + 7); gaps++) {
    const gap = document.createElement('div')
    gap.textContent = ''
    gap.id = `gap${gaps}`
    gap.classList.add(`dayDates`)

    const gapContainer = document.querySelector(`.monthDays${monthName[currentMonth]}`)
    gapContainer.appendChild(gap)
  }
}

function renderDays() {
  for (let i = 1; i <= monthDayCount; i++) {
    let dayGenerator = document.createElement('div')
    let dateID = `${monthName[currentMonth]}-${i}-${currentYear}`
    dayGenerator.id = dateID
    dayGenerator.textContent = i

    dayGenerator.addEventListener('click', () => {
      const clickedOnDay = document.getElementById('clickedOnDay')
      clickedOnDay.style.display = 'block'
      _clickedDate.innerText = dayGenerator.id

      console.log(dayGenerator.id)

      lastClick = dayGenerator.id

      storeEvents.forEach((event) => {
        if (event.eventid == lastClick) {
          _eventNameContainer.innerText = newEvent.title
        } else {
          _eventNameContainer.innerText = ''
        }
      })
    })

    dateID = new Date(currentYear, currentMonth, i)
    let dateIDname = dateID.getDay()
    let dateWeekdayID = `${weekdayName[dateIDname]}`

    dayGenerator.classList.add(`dayDates`)
    dayGenerator.classList.add(`${dateWeekdayID}`)

    dateWeekdayID == 'Saturday' || dateWeekdayID == 'Sunday' ? dayGenerator.classList.add('weekends') : dayGenerator.classList.add('workdays')

    let monthDaysContainer = document.querySelector(`.monthDays${monthName[currentMonth]}`)
    monthDaysContainer.appendChild(dayGenerator)
  }
}

function renderFullMonth() {
  calcMonthDays()

  let calendars = document.createElement('div')
  calendars.id = `Calendar${monthName[currentMonth]}`
  calendars.classList.add('Calendars')
  allCalendars.appendChild(calendars)

  let separater = document.createElement('div')
  separater.id = `separater${monthName[currentMonth]}`
  separater.classList.add('separater')
  calendars.appendChild(separater)

  let months = document.createElement('div')
  months.id = `Month${currentMonth}`
  months.classList.add('Months')
  months.textContent = monthName[currentMonth]
  separater.appendChild(months)

  let clickedMonth = document.getElementById(`Calendar${months.textContent}`)
  clickedMonth.classList.add('zoom-in')
  let splirMonth = months.id.split('Month')
  currentMonth = splirMonth[1]

  months.addEventListener('click', () => {
    monthName.forEach((deleteMonth) => {
      if (months.textContent != deleteMonth) {
        document.getElementById(`Calendar${deleteMonth}`).remove()
      }
    })
  })

  let weekDays = document.createElement('div')
  weekDays.classList.add('weekDays')
  weekDays.classList.add(`weekDays${monthName[currentMonth]}`)
  calendars.appendChild(weekDays)

  let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  days.forEach((element) => {
    let day = document.createElement('div')
    day.classList.add('day')
    day.textContent = element
    weekDays.appendChild(day)
  })

  weekdayName.forEach((element) => {
    let weekday = document.createElement('div')
    weekday.classList.add(`${element}${monthName[currentMonth]}`)
    calendars.appendChild(weekday)
  })

  let monthDays = document.createElement('div')
  monthDays.classList.add(`monthDays`)
  monthDays.classList.add(`monthDays${monthName[currentMonth]}`)
  calendars.appendChild(monthDays)

  renderGaps()

  renderDays()
}

function renderFullYear() {
  for (currentMonth = 0; currentMonth < 12; currentMonth++) {
    calcMonthDays()

    let calendars = document.createElement('div')
    calendars.id = `Calendar${monthName[currentMonth]}`
    calendars.classList.add('Calendars')
    allCalendars.appendChild(calendars)

    let separater = document.createElement('div')
    separater.id = `separater${monthName[currentMonth]}`
    separater.classList.add('separater')
    calendars.appendChild(separater)

    let months = document.createElement('div')
    months.id = `Month${currentMonth}`
    months.classList.add('Months')
    months.textContent = monthName[currentMonth]
    separater.appendChild(months)

    months.addEventListener('click', () => {
      let clickedMonth = document.getElementById(`Calendar${months.textContent}`)
      clickedMonth.classList.add('zoom-in')
      let splirMonth = months.id.split('Month')
      currentMonth = splirMonth[1]

      monthName.forEach((deleteMonth) => {
        if (months.textContent != deleteMonth) {
          document.getElementById(`Calendar${deleteMonth}`).remove()
        }
      })
    })

    let weekDays = document.createElement('div')
    weekDays.classList.add('weekDays')
    weekDays.classList.add(`weekDays${monthName[currentMonth]}`)
    calendars.appendChild(weekDays)

    let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

    days.forEach((element) => {
      let day = document.createElement('div')
      day.classList.add('day')
      day.textContent = element
      weekDays.appendChild(day)
    })

    weekdayName.forEach((element) => {
      let weekday = document.createElement('div')
      weekday.classList.add(`${element}${monthName[currentMonth]}`)
      calendars.appendChild(weekday)
    })

    let monthDays = document.createElement('div')
    monthDays.classList.add(`monthDays`)
    monthDays.classList.add(`monthDays${monthName[currentMonth]}`)
    calendars.appendChild(monthDays)

    renderGaps()

    renderDays()
  }
}
renderFullYear()

//Prev & Next Buttons
function eventsInfo() {
  storeEvents.forEach((event) => {
    const eventId = document.getElementById(event.eventid)
    if (eventId) {
      eventId.style.backgroundColor = event.backgroundColor
    }
  })
}

_prevYear.addEventListener('click', () => {
  currentYear--

  calcMonthDays()
  clearDays()
  renderFullYear()
  displayYear.innerText = currentYear
  today()

  eventsInfo()
})

_nextYear.addEventListener('click', () => {
  currentYear++

  calcMonthDays()
  clearDays()
  renderFullYear()
  displayYear.innerText = currentYear
  today()

  eventsInfo()
})

_prevMonth.addEventListener('click', () => {
  currentMonth--

  clearDays()

  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }

  renderFullMonth()
  displayYear.innerText = currentYear
  today()

  eventsInfo()
})

const _nextMonth = document.getElementById('nextMonth')
_nextMonth.addEventListener('click', () => {
  currentMonth++

  clearDays()

  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }

  renderFullMonth()
  displayYear.innerText = currentYear
  today()

  eventsInfo()
})

//Other Functions
let todayMonth = dateRender.getMonth()
let todayYear = dateRender.getFullYear()

function today() {
  let currentDateStyle = document.getElementById(`${monthName[todayMonth]}-${currentDate}-${todayYear}`)
  if (currentDateStyle) {
    currentDateStyle.style.backgroundColor = '#00a2ff'
    currentDateStyle.style.color = 'white'
  }
}
today()

function clearDays() {
  const monthDaysContainer = document.getElementById('allCalendars')
  monthDaysContainer.innerHTML = ''
}

const _back = document.getElementById('back')
_back.addEventListener('click', () => {
  clearDays()

  currentMonth--

  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }

  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }

  renderFullMonth()

  //renderFullYear()
  displayYear.innerText = currentYear
  today()
})

//Cookies
function setCookie(name, value, daysToLive) {
  const date = new Date()
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + date.toUTCString()
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

function deleteCookie(name) {
  setCookie(name, null, null)
}

function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie)
  const cArray = cDecoded.split('; ')

  let result = null

  cArray.forEach((element) => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1)
    }
  })
  result = result.split(', 365').toString()
  return result.slice(0, -1).toString()
}

displayYear.innerText = currentYear

//Secret
let colors = 0
function changeColor() {
  document.body.style.color = `hsl(${colors}, 80%, 55%)`
  let elements = document.getElementsByClassName('dayDates')
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i]
    element.style.color = `hsl(${colors}, 80%, 55%)`
  }
  colors++
}

let type = ''
const secretType = 'colorful'
document.addEventListener('keydown', (event) => {
  type += event.key
  if (type === secretType) return setInterval(changeColor, 25)
})

//Secret - Title
let titleColor = 0
function changeTitleColor() {
  _title.style.color = `hsl(${titleColor}, 80%, 55%)`
  titleColor++
}

intervalId = setInterval(changeTitleColor, 20)
_title.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    titleColor = 0
    _title.style.color = colorLight
  } else {
    intervalId = setInterval(changeTitleColor, 25)
  }
})
