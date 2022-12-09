export const isValidEmail = (email: string) => {
  const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
  return emailRegex.test(email)
}

export const isValidPassword = (password: string) => {
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  )
  return strongRegex.test(password)
}
