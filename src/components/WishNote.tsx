import React from 'react'

// Color pairs: [background, accent border, text]
const COLORS = [
    { bg: '#fff0f7', border: '#f0a8cc', text: '#7a2e52' },
    { bg: '#fff8e7', border: '#f5c87a', text: '#7a5200' },
    { bg: '#f0f7ff', border: '#a8cff0', text: '#1e4d7a' },
    { bg: '#f3fff0', border: '#a8e0a0', text: '#2a6022' },
]

const TILTS = ['rotate(-1.2deg)', 'rotate(0.8deg)', 'rotate(-0.5deg)', 'rotate(1.5deg)']

function WishNote({ index, message }: { index: number; message: string }) {
    const c = COLORS[index % COLORS.length]
    const tilt = TILTS[index % TILTS.length]

    return (
        <article
            className="wish-note-card"
            style={{
                background: c.bg,
                borderColor: c.border,
                transform: tilt,
                '--wish-accent': c.text,
            } as React.CSSProperties}
        >
            <span className="wish-note-star" aria-hidden="true">✦</span>
            <p className="wish-note-text">{message}</p>
            <span className="wish-note-heart" aria-hidden="true" style={{ color: c.text }}>♡</span>
        </article>
    )
}

export default WishNote
