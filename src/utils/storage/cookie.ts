export function setCookie(key, value, t = 0) {
  if (t > 0) {
    const oDate = new Date()
    oDate.setDate(oDate.getDate() + t)
    document.cookie =
      key + '=' + value + '; expires=' + oDate.toDateString() + '; SameSite=None; Secure'
  } else {
    document.cookie = `${key}=${value}; SameSite=None; Secure`
  }
}

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export function getCookie(key) {
  //由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
  const params = document.cookie.split('; ')
  let result: string | null = null

  for (let i = 0; i < params.length; i++) {
    // 通过=截断，把name=Jack截断成[name,Jack]数组；
    const list = params[i].split('=')
    if (list[0] == key) {
      result = decodeURI(list[1])
    }
  }

  // TODO：hack Safari
  if (isSafari && key === 'token' && !result) {
    return localStorage.getItem('dongdongToken')
  }

  return result
}

export function removeCookie(key) {
  //把cookie设置为过期
  setCookie(key, '', -1)
}
