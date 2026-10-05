import React from 'react'

import BrandButton from './BrandButton.tsx'
import ActionButton from './ActionButton.tsx'
import MainNavigation from './MainNavigation.tsx'


function Header() {
    return (
        <header className="sticky top-2 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-5xl">
            <div className="header-paper flex items-center justify-between gap-3 px-3 py-2 sm:px-5">
                <BrandButton />
                <MainNavigation />
                <div className="flex items-center gap-2">
                    <ActionButton dataId="0" />
                </div>
            </div>
        </header>
    )
}

export default Header
