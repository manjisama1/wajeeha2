import React from 'react'
import Filled_heart_shape from './icons/Filled_heart_shape.tsx'

function BrandButton() {
    return (
        <button className="flex min-w-0 items-center gap-2 text-left">
            <span className="brand-mark">
                <Filled_heart_shape />
            </span>
            <span className="brand-copy">
                <span className="text-sm font-bold tracking-tight text-[#3e1029]">
                    from manji
                </span>
            </span>
            <span className="header-doodle">♡</span>
        </button>
    )
}

export default BrandButton
