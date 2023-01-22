export function formatPhone(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, '')
    .replace(/^(\d{2})\B/, '($1) ')
    .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3')
}

export function unFormatPhone(phoneNumber) {
  return phoneNumber.replace(/\D/g, '')
}

export function isEmailValid(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function toast({ type, text }) {
  const event = new CustomEvent('addtoast', {
    detail: { type, text }
  })

  document.dispatchEvent(event)
}
