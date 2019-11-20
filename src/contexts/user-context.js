import React from "react"
import { api } from "../utils"

const UserContext = React.createContext()

const UserProvider = props => {
  const [user, setUser] = React.useState(null)
  const [verifying, setVerifying] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    let isMounted = true
    if (isMounted && verifying) {
      api("/api/user/verify")
        .then(res => res.json())
        .then(user => {
          setUser(user)
          setVerifying(false)
        })
        .catch(err => {
          setUser(null)
          setVerifying(false)
          setError(err.message)
          console.error(err)
        })
    }

    return () => {
      isMounted = false
    }
  }, [verifying])

  const logout = () =>
    api("/api/user/logout", { credentials: "include", method: "post" })
      .then(res => res.json())
      .then(json => {
        if (json.logged_out) {
          setUser(null)
        }
      })
      .catch(err => {
        console.error(err)
      })

  return (
    <UserContext.Provider value={{ user, verifying, logout, error }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const user = React.useContext(UserContext)

  if (user === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return user
}

export { useUser, UserProvider }
