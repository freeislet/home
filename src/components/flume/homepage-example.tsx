import { useState } from 'react'
import { useRootEngine, NodeMap } from 'flume'

import engine from './engine-example'
import { Button } from '../ui/button'

const fakeUser = {
  firstName: 'Bustopher',
  lastName: 'Jones',
  isLoggedIn: true,
  isAdmin: false,
}

const nullUser = {
  firstName: '',
  lastName: '',
  isLoggedIn: false,
  isAdmin: false,
}

function Homepage({ nodes }: { nodes: NodeMap }) {
  const [user, setUser] = useState(fakeUser)
  const { title, description, showSignup, copyrightYear } = useRootEngine(nodes, engine, { user })

  const login = () => setUser(fakeUser)
  const logout = () => setUser(nullUser)

  return (
    <div className="relative p-4 text-center bg-emerald-300">
      <h6 className="m-4">{title}</h6>
      <p className="text-light m-4">{description}</p>
      {user.isLoggedIn ? <Button onClick={logout}>Logout</Button> : <Button onClick={login}>Login</Button>}
      {showSignup && (
        <form className="m-4">
          <input type="email" />
          <Button>Signup!</Button>
        </form>
      )}
      <footer className="absolute bottom-0">© flume {copyrightYear}</footer>
    </div>
  )
}

export default Homepage
