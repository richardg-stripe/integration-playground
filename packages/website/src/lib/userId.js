import uuid from 'uuid/v4'

export const getOrSetUserId = () => {
  let userId = localStorage.getItem('USER_UID')
  if (!userId) {
    const newId = uuid()
    localStorage.setItem('USER_UID', newId)
    return newId
  }
  return userId
}
