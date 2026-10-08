import React from 'react'
import NavLink from './NavLink.tsx'

function MainNavigation() {
    return (
        <nav className="hidden items-center gap-1 lg:flex">
            <NavLink label="Home" />
            <NavLink label="Cake" />
            <NavLink label="Wishes" />
            <NavLink label="Letters" />
            <NavLink label="Notes" />
        </nav>
    )
}

export default MainNavigation
