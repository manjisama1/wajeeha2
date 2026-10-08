import React from 'react'

const TARGETS: Record<string, string> = {
    'Home':    'home',
    'Cake':    'cake',
    'Wishes':  'wishes',
    'Letters': 'letters',
    'Notes':   'notes-spread',
}

function NavLink({ label }: { label: string }) {
    const go = () => {
        const id = TARGETS[label]
        const el = id ? document.getElementById(id) : null
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return (
        <button className="nav-link" onClick={go}>
            {label}
        </button>
    )
}

export default NavLink
