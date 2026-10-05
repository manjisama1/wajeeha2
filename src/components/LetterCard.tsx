import React, { useState, useEffect } from 'react'
import lettersData from '../data/letters.json'

type LetterCardData = {
    id: string
    number: string
    title: string
    description: string
    content: string        // full letter text — can be long
    showBadge: boolean
}

const TILTS = ['-1.5deg', '1deg', '-0.7deg', '1.3deg']

function LetterCard({ dataId }: { dataId: string }) {
    const [open, setOpen] = useState(false)

    // lock body scroll when popup is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [open])

    const letter = (lettersData as LetterCardData[]).find(l => l.id === String(dataId))
        ?? { id: '', number: '', title: '', description: '', content: '', showBadge: false }

    const idx = parseInt(dataId, 10) || 0
    const tilt = TILTS[idx % TILTS.length]

    return (
        <>
            {/* ── envelope card ── */}
            <article
                className="letter-envelope"
                style={{ transform: `rotate(${tilt})` }}
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true) }}
                aria-label={`open letter: ${letter.title}`}
            >
                {/* envelope flap */}
                <div className="letter-flap" aria-hidden="true">
                    <span className="letter-flap-heart">♡</span>
                    {letter.showBadge && (
                        <span className="letter-seal">open gently</span>
                    )}
                </div>
                {/* envelope body preview */}
                <div className="letter-body">
                    <span className="letter-number">{letter.number}</span>
                    <h4 className="letter-title">{letter.title}</h4>
                    <span className="letter-tap-hint">tap to open ↓</span>
                </div>
            </article>

            {/* ── full-screen popup ── */}
            {open && (
                <div
                    className="letter-overlay"
                    onClick={() => setOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={letter.title}
                >
                    <div
                        className="letter-popup"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* top decorative strip */}
                        <div className="letter-popup-top" aria-hidden="true">
                            <span>♡</span><span>✦</span><span>♡</span>
                        </div>

                        {/* close button */}
                        <button
                            className="letter-popup-close"
                            onClick={() => setOpen(false)}
                            aria-label="close letter"
                        >
                            ✕
                        </button>

                        {/* letter content */}
                        <div className="letter-popup-body">
                            <p className="letter-popup-number">{letter.number}</p>
                            <h3 className="letter-popup-title">{letter.title}</h3>
                            <div className="letter-popup-divider" aria-hidden="true">— ♡ —</div>
                            <div className="letter-popup-content">
                                {letter.content.split('\n').map((para, i) => (
                                    para.trim() ? <p key={i}>{para}</p> : <br key={i} />
                                ))}
                            </div>
                        </div>

                        {/* bottom */}
                        <div className="letter-popup-footer" aria-hidden="true">♡</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LetterCard
