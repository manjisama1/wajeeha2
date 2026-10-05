import React from 'react'

const TARGETS: Record<string, string> = {
    "Home": "home",
    "Cake": "cake",
    "A cat": "wenshin",
    "Letters": "letters",
    "Drawing": "this-us",
    "PDF": "scrapbook",
}

// Component
function NavLink({ label }: { label: string }) {
    const go = () => {
        const id = TARGETS[label]
        const el = id ? document.getElementById(id) : null
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    return (
        <button className={"nav-link"} onClick={go}>
            {label}
        </button>
    )
}

export default NavLink
