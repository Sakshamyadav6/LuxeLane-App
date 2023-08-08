import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((state) => state.auth);
  return (
    <div>Navbar</div>
  )
}

export default Navbar
