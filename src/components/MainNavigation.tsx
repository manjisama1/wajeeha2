import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import NavLink from './NavLink.tsx'
import Home from './Home.tsx'


// Component
function MainNavigation() {
    return <nav className={"hidden items-center gap-1 lg:flex"}>
    	
                <NavLink label="Home" />
            
    	
                <NavLink label="Cake" />
            
    	
                <NavLink label="A cat" />
            
    	
                <NavLink label="Letters" />
            
    	
                <NavLink label="Drawing" />
            
    	
                <NavLink label="PDF" />
            
    </nav>
}


export default MainNavigation
