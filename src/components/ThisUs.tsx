import React from 'react'
import manji_wajeeha  from '/assets/manji/manji_wajeeha.png'
import manji_wajeeha1 from '/assets/manji/manji_wajeeha1.png'
import manji_wajeeha2 from '/assets/manji/manji_wajeeha2.png'
import manji_wajeeha3 from '/assets/manji/manji_wajeeha3.png'

const PHOTOS = [
    { src: manji_wajeeha,  alt: 'Manji and Wajeeha',   tilt: '-2deg',  caption: '♡' },
    { src: manji_wajeeha1, alt: 'Manji and Wajeeha 1',  tilt: '1.5deg', caption: '♡' },
    { src: manji_wajeeha2, alt: 'Manji and Wajeeha 2',  tilt: '-1deg',  caption: '♡' },
    { src: manji_wajeeha3, alt: 'Manji and Wajeeha 3',  tilt: '2deg',   caption: '♡' },
]

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

            <div className="this-us-gallery">
                {PHOTOS.map((photo, i) => (
                    <div
                        key={i}
                        className="this-us-polaroid"
                        style={{ transform: `rotate(${photo.tilt})` }}
                    >
                        {/* tape strip */}
                        <div className="this-us-tape" aria-hidden="true" />
                        <img src={photo.src} alt={photo.alt} className="this-us-img" />
                        <p className="this-us-caption">{photo.caption}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ThisUs
