import React, { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web'
import loadingAnimation from '../assets/loading.json'

// All assets that need to be preloaded before the site is shown
const IMAGE_SRCS = [
    '/assets/cake/cake_light.png',
    '/assets/cake/cake_unlight.png',
    '/assets/cake/cake_slice.png',
    '/assets/cake/cake_cutaway.png',
    '/assets/manji/manji_eat.png',
    '/assets/manji/manji_ask.png',
    '/assets/manji/manji_wajeeha.png',
    '/assets/manji/manji_wajeeha1.png',
    '/assets/manji/manji_wajeeha2.png',
    '/assets/manji/manji_wajeeha3.png',
    '/assets/cat/wajeeha_sword.png',
    '/assets/wenshin/wenshin_panel1.png',
    '/assets/wenshin/wenshin_panel2.png',
    '/assets/wenshin/wenshin_panel3.png',
]

const AUDIO_SRCS = [
    '/audio/hbdsong.mp3',
    '/audio/recordson.mp3',
    '/audio/den.mp3',
    '/audio/glue.mp3',
    '/audio/shade.mp3',
]

type Props = {
    onDone: () => void   // called when user taps to enter
}

function LoadingScreen({ onDone }: Props) {
    const lottieRef   = useRef<HTMLDivElement>(null)
    const [pct, setPct]       = useState(0)      // 0-100 progress
    const [ready, setReady]   = useState(false)  // all assets loaded
    const [exiting, setExiting] = useState(false)

    // ── Lottie ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!lottieRef.current) return
        const anim = lottie.loadAnimation({
            container:     lottieRef.current,
            renderer:      'svg',
            loop:          true,
            autoplay:      true,
            animationData: loadingAnimation,   // bundled — no network fetch
        })
        return () => anim.destroy()
    }, [])

    // ── Preload ────────────────────────────────────────────────────────────────
    useEffect(() => {
        const total = IMAGE_SRCS.length + AUDIO_SRCS.length
        let loaded = 0

        const tick = () => {
            loaded++
            setPct(Math.round((loaded / total) * 100))
            if (loaded >= total) setReady(true)
        }

        // Images
        IMAGE_SRCS.forEach(src => {
            const img = new Image()
            img.onload  = tick
            img.onerror = tick   // count failures too so we don't hang
            img.src = src
        })

        // Audio (load enough to play — we use fetch so no autoplay policy issue)
        AUDIO_SRCS.forEach(src => {
            fetch(src, { method: 'HEAD' })
                .then(tick)
                .catch(tick)
        })
    }, [])

    // ── Dismiss ────────────────────────────────────────────────────────────────
    const dismiss = () => {
        if (!ready) return
        setExiting(true)
        setTimeout(onDone, 600)  // wait for fade-out animation
    }

    return (
        <div
            className={'loading-screen' + (exiting ? ' loading-screen-exit' : '')}
            onClick={dismiss}
            role="status"
            aria-label="Loading, please wait"
        >
            {/* Lottie animation */}
            <div ref={lottieRef} className="loading-lottie" aria-hidden="true" />

            {/* Title */}
            <p className="loading-title">for my dearest ♡</p>

            {/* Progress bar */}
            <div className="loading-bar-wrap" aria-hidden="true">
                <div className="loading-bar-track">
                    <div className="loading-bar-fill" style={{ width: pct + '%' }} />
                </div>
                <span className="loading-pct">{pct}%</span>
            </div>

            {/* Tap to enter — only shown when ready */}
            <p className={'loading-enter' + (ready ? ' loading-enter-visible' : '')}>
                tap anywhere to enter ♡
            </p>
        </div>
    )
}

export default LoadingScreen
