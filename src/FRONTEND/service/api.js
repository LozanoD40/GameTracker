export const getUserProfile = async (userId) => {
  const response = await fetch(`http://localhost:4000/api/users/${userId}`)
  const data = await response.json()
  return data
}
