import React, { useState } from 'react'

import cake_light   from '/assets/cake/cake_light.png'
import cake_unlight from '/assets/cake/cake_unlight.png'
import cake_slice   from '/assets/cake/cake_slice.png'
import cake_cutaway from '/assets/cake/cake_cutaway.png'
import manji_eat    from '/assets/manji/manji_eat.png'
import manji_ask    from '/assets/manji/manji_ask.png'

type Step = {
    img: string
    alt: string
    caption: string
    narration?: string   // overlaid top-right on image
    tapable: boolean
}

const STEPS: Step[] = [
    { img: cake_light,   alt: 'Birthday cake with lit candle', caption: 'tap the candle ♡',  tapable: true },
    { img: cake_unlight, alt: 'Candle blown out',              caption: 'one more tap...',    tapable: true },
    { img: cake_slice,   alt: 'Cutting the cake',             caption: 'keep going ♡',        tapable: true },
    { img: cake_cutaway, alt: 'Cake cut open',                caption: 'and...!',             tapable: true },
    { img: manji_eat,    alt: 'Manji eating cake',            caption: '', narration: 'Nom nom nom...', tapable: true  },
    { img: manji_ask,    alt: 'Manji asking if you want some',caption: '', narration: 'Want some? ♡',   tapable: false },
]

function CakeSequence() {
    const [step, setStep] = useState(0)
    const current = STEPS[step]
    const isLast = step >= STEPS.length - 1

    const advance = () => { if (!isLast) setStep(s => s + 1) }

    return (
        <div className="cake-sequence">
            {/* clickable image frame with overlaid narration */}
            <div
                className={'cake-seq-frame' + (current.tapable ? ' cake-seq-tapable' : '')}
                onClick={advance}
                role={current.tapable ? 'button' : undefined}
                tabIndex={current.tapable ? 0 : undefined}
                onKeyDown={current.tapable ? (e) => { if (e.key === 'Enter' || e.key === ' ') advance() } : undefined}
                aria-label={current.tapable ? 'tap to continue' : undefined}
            >
                <img src={current.img} alt={current.alt} className="cake-seq-img" />

                {/* narration box overlaid top-right on the image */}
                {current.narration && (
                    <div className="cake-narration-overlay">
                        <span className="cake-narration-text">{current.narration}</span>
                    </div>
                )}

                {/* tap hint bottom-right */}
                {current.tapable && !isLast && (
                    <span className="cake-tap-hint">tap ♡</span>
                )}
            </div>

            {/* big caption below — cake steps only */}
            {current.caption && (
                <p className="cake-seq-caption">{current.caption}</p>
            )}

            {/* dot progress */}
            <div className="cake-seq-dots" aria-hidden="true">
                {STEPS.map((_, i) => (
                    <span key={i} className={'cake-dot' + (i === step ? ' cake-dot-active' : i < step ? ' cake-dot-past' : '')} />
                ))}
            </div>

            {step > 0 && (
                <button className="cake-restart" onClick={(e) => { e.stopPropagation(); setStep(0) }}>
                    ↻ restart
                </button>
            )}
        </div>
    )
}

export default CakeSequence
