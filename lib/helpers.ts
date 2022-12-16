export const isValidEmail = (email: string) => {
  const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
  return emailRegex.test(email)
}

export const isValidName = (name: string) => {
  const originalLength = name.length
  let clearedName = name.replace(/\[\d+\]/g, '')
  clearedName = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')

  return originalLength === clearedName.length
}

export const isValidPassword = (password: string) => {
  const validations = {
    strong: new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.$%^&*])(?=.{8,})'
    ),
    medium: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'),
  }
  return validations['medium'].test(password)
}
