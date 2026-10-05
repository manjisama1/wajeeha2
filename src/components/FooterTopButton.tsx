import React from 'react'
import Upward_arrow from './icons/Upward_arrow.tsx'

function FooterTopButton() {
    return (
        <button
            className="footer-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to the top"
        >
            {`back to the beginning `}
            <Upward_arrow />
        </button>
    )
}

export default FooterTopButton
