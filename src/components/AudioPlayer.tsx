import React, { useEffect, useRef, useState, useCallback } from 'react'

// Section ID → audio file mapping
// Sections are checked in order; the first one visible past the threshold wins.
export type SectionTrack = {
    sectionId: string
    src: string
    label: string
}

type Props = {
    tracks: SectionTrack[]
}

const FADE_DURATION = 800 // ms for cross-fade

function AudioPlayer({ tracks }: Props) {
    const [activeIdx, setActiveIdx]   = useState(0)
    const [playing,   setPlaying]     = useState(false)
    const [started,   setStarted]     = useState(false) // user has interacted once
    const [label,     setLabel]       = useState(tracks[0]?.label ?? '')

    const audioRef  = useRef<HTMLAudioElement | null>(null)
    const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null)

    // --- helpers ----------------------------------------------------------------

    const clearFade = () => {
        if (fadeTimer.current) { clearInterval(fadeTimer.current); fadeTimer.current = null }
    }

    const fadeTo = useCallback((vol: number, duration: number, onDone?: () => void) => {
        clearFade()
        const audio = audioRef.current
        if (!audio) { onDone?.(); return }
        const start   = audio.volume
        const diff    = vol - start
        const steps   = 20
        const stepMs  = duration / steps
        let   step    = 0
        fadeTimer.current = setInterval(() => {
            step++
            const next = Math.min(1, Math.max(0, start + diff * (step / steps)))
            audio.volume = next
            if (step >= steps) {
                clearFade()
                audio.volume = vol
                onDone?.()
            }
        }, stepMs)
    }, [])

    const switchTrack = useCallback((idx: number) => {
        const audio = audioRef.current
        if (!audio || idx === activeIdx) return
        fadeTo(0, FADE_DURATION, () => {
            audio.src    = tracks[idx].src
            audio.volume = 0
            audio.loop   = true
            setActiveIdx(idx)
            setLabel(tracks[idx].label)
            if (playing) {
                audio.play().catch(() => {})
                fadeTo(1, FADE_DURATION)
            }
        })
    }, [activeIdx, playing, tracks, fadeTo])

    // --- IntersectionObserver --------------------------------------------------

    useEffect(() => {
        const sectionEls = tracks
            .map(t => document.getElementById(t.sectionId))
            .filter(Boolean) as HTMLElement[]

        if (!sectionEls.length) return

        // Track how much of each section is visible
        const visibility = new Map<string, number>()

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                visibility.set(e.target.id, e.intersectionRatio)
            })
            // Find the section with the most visibility
            let bestId    = ''
            let bestRatio = 0
            visibility.forEach((ratio, id) => {
                if (ratio > bestRatio) { bestRatio = ratio; bestId = id }
            })
            if (!bestId) return
            const newIdx = tracks.findIndex(t => t.sectionId === bestId)
            if (newIdx !== -1 && newIdx !== activeIdx) switchTrack(newIdx)
        }, {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        })

        sectionEls.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [tracks, activeIdx, switchTrack])

    // --- audio element bootstrap ----------------------------------------------

    useEffect(() => {
        const audio       = new Audio()
        audio.src         = tracks[0]?.src ?? ''
        audio.loop        = true
        audio.volume      = 0
        audioRef.current  = audio
        return () => { audio.pause(); audio.src = ''; clearFade() }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // --- play / pause ---------------------------------------------------------

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return
        if (!started) {
            // First interaction — start playing
            audio.src    = tracks[activeIdx].src
            audio.loop   = true
            audio.volume = 0
            audio.play().then(() => {
                fadeTo(1, FADE_DURATION)
                setPlaying(true)
                setStarted(true)
            }).catch(() => {})
            return
        }
        if (playing) {
            fadeTo(0, FADE_DURATION, () => audio.pause())
            setPlaying(false)
        } else {
            audio.play().then(() => {
                fadeTo(1, FADE_DURATION)
                setPlaying(true)
            }).catch(() => {})
        }
    }

    return (
        <div className="bgm-player" aria-label="background music player">
            <button
                className="bgm-btn"
                onClick={toggle}
                aria-label={playing ? 'pause music' : 'play music'}
                title={playing ? 'pause' : 'play'}
            >
                {!started ? '♪' : playing ? '⏸' : '▶'}
            </button>
            <span className="bgm-label" aria-live="polite">
                {!started ? 'play music' : label}
            </span>
        </div>
    )
}

export default AudioPlayer
