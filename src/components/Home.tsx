import React from 'react'

import Img from './Img.tsx'
import Sparkle_with_plus from './icons/Sparkle_with_plus.tsx'
import Filled_heart_shape1 from './icons/Filled_heart_shape1.tsx'
import ActionButton from './ActionButton.tsx'


function Home() {
    return (
        <section id="home" className="home-page scroll-mt-24">
            <div className="home-copy">
                <span className="handwritten-kicker">
                    <Sparkle_with_plus />
                    {' for my dearest'}
                </span>
                <h1>
                    Happy Birthday<br />
                    <em>Wajeeha</em>
                </h1>
                <p className="home-message">
                    I made you a tiny place on the internet. Look around, okay?
                </p>
                <div className="home-actions">
                    <ActionButton dataId="1" />
                </div>
                <div className="home-signoff">
                    <Filled_heart_shape1 />
                    <span>I hope you like it.</span>
                </div>
            </div>
            <div className="home-collage">
                <div className="scrap-photo hero-doodle-photo">
                    <Img id="7" />
                    <span>this is you preparing to cut the cake.</span>
                </div>
                <div className="home-sticky home-sticky-one">
                    <span className="paper-tape"></span>
                    my adorable<br />
                    <strong>wajeeha.</strong>
                </div>
                <div className="home-sticky home-sticky-two">
                    P.S. I hope<br />
                    you smile today ♡
                </div>
            </div>
        </section>
    )
}

export default Home
