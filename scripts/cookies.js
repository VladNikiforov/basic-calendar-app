export function setCookie(name, value, daysToLive) {
  const date = new Date()
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + date.toUTCString()
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

export function deleteCookie(name) {
  setCookie(name, null, null)
}

export function getCookie(name) {
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
