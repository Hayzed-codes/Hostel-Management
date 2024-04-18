import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const items = [
    {title: "Dashboard", url: '/dashboard'},
    {title: "Student", url: '/studentDash'},
    {title: "Rooms", url: '/room'}
]

const Header = () => {
  return (
    <header>
        <nav className="navigation --flex-between">
            
        </nav>
      
    </header>
  )
}

export default Header
