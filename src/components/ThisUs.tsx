import React from 'react'
import manji_wajeeha from '/assets/manji/manji_wajeeha.png'

function ThisUs() {
    return (
        <section id="this-us" className="journal-section this-us-section scroll-mt-24">
            <div className="journal-heading">
                <span className="journal-number">✦</span>
                <div>
                    <span className="handwritten-kicker">just us</span>
                    <h2>This is us.</h2>
                </div>
            </div>
            <div className="this-us-layout">
                {/* big polaroid */}
                <div className="this-us-polaroid">
                    <div className="this-us-tape this-us-tape-left" aria-hidden="true" />
                    <div className="this-us-tape this-us-tape-right" aria-hidden="true" />
                    <img
                        src={manji_wajeeha}
                        alt="Manji and Wajeeha"
                        className="this-us-img"
                    />
                    <p className="this-us-caption">This is us.</p>
                </div>

                {/* decorative sticky notes around the photo */}
                <div className="this-us-note this-us-note-a">
                    <span className="paper-tape" aria-hidden="true" />
                    you and me ♡
                </div>
                <div className="this-us-note this-us-note-b">
                    <span className="paper-tape" aria-hidden="true" />
                    us, always ✦
                </div>
            </div>
        </section>
    )
}

export default ThisUs
