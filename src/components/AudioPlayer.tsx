import React, { useEffect, useRef, useState, useCallback } from 'react'

export type SectionTrack = {
    sectionId: string
    src: string
}

type Props = {
    tracks: SectionTrack[]
    // Called by parent (LoadingScreen) once user has gestured — start audio now
    startSignal: boolean
}

const FADE_MS    = 700
const HIDE_AFTER = 3000

function AudioPlayer({ tracks, startSignal }: Props) {
    const audioRef    = useRef<HTMLAudioElement | null>(null)
    const fadeTimer   = useRef<ReturnType<typeof setInterval> | null>(null)
    const hideTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
    const currentSrc  = useRef('')
    const isMuted     = useRef(false)
    const started     = useRef(false)

    const [muted,   setMuted]   = useState(false)
    const [visible, setVisible] = useState(false)

    // ── fade helper ────────────────────────────────────────────────────────────
    const fadeTo = useCallback((
        audio: HTMLAudioElement,
        target: number,
        ms: number,
        onDone?: () => void
    ) => {
        if (fadeTimer.current) { clearInterval(fadeTimer.current); fadeTimer.current = null }
        const start = audio.volume
        const diff  = target - start
        if (Math.abs(diff) < 0.01) { audio.volume = target; onDone?.(); return }
        const steps = 20, stepMs = ms / steps
        let step = 0
        fadeTimer.current = setInterval(() => {
            step++
            audio.volume = Math.min(1, Math.max(0, start + diff * (step / steps)))
            if (step >= steps) {
                clearInterval(fadeTimer.current!); fadeTimer.current = null
                audio.volume = target; onDone?.()
            }
        }, stepMs)
    }, [])

    // ── create audio element once ──────────────────────────────────────────────
    useEffect(() => {
        const audio  = new Audio()
        audio.loop   = true
        audio.volume = 0
        audioRef.current = audio
        return () => {
            if (fadeTimer.current) clearInterval(fadeTimer.current)
            if (hideTimer.current) clearTimeout(hideTimer.current)
            audio.pause(); audio.src = ''
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // ── start playing when loading screen signals user has gestured ────────────
    useEffect(() => {
        if (!startSignal || started.current) return
        started.current = true
        const audio = audioRef.current
        if (!audio) return
        const firstSrc = tracks[0]?.src ?? ''
        audio.src    = firstSrc
        audio.loop   = true
        audio.volume = 0
        currentSrc.current = firstSrc
        audio.play()
            .then(() => fadeTo(audio, 1, FADE_MS))
            .catch(() => {
                // Still blocked — muted fallback
                audio.muted = true
                isMuted.current = true
                setMuted(true)
                audio.play().catch(() => {})
            })
    }, [startSignal, tracks, fadeTo])

    // ── section switching ──────────────────────────────────────────────────────
    const switchTo = useCallback((src: string) => {
        const audio = audioRef.current
        if (!audio || !started.current || src === currentSrc.current) return
        currentSrc.current = src
        const target = isMuted.current ? 0 : 1
        fadeTo(audio, 0, FADE_MS, () => {
            audio.src    = src
            audio.loop   = true
            audio.volume = 0
            audio.play()
                .then(() => fadeTo(audio, target, FADE_MS))
                .catch(() => {})
        })
    }, [fadeTo])

    useEffect(() => {
        const els = tracks
            .map(t => ({ src: t.src, el: document.getElementById(t.sectionId) }))
            .filter(t => t.el != null) as { src: string; el: HTMLElement }[]
        if (!els.length) return

        const ratios = new Map<string, number>()
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => ratios.set(e.target.id, e.intersectionRatio))
            let bestSrc = '', bestRatio = 0
            els.forEach(({ src, el }) => {
                const r = ratios.get(el.id) ?? 0
                if (r > bestRatio) { bestRatio = r; bestSrc = src }
            })
            if (bestSrc) switchTo(bestSrc)
        }, { threshold: [0, 0.1, 0.25, 0.5] })

        els.forEach(({ el }) => obs.observe(el))
        return () => obs.disconnect()
    }, [tracks, switchTo])

    // ── scroll show/hide ───────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => {
            setVisible(true)
            if (hideTimer.current) clearTimeout(hideTimer.current)
            hideTimer.current = setTimeout(() => setVisible(false), HIDE_AFTER)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // ── mute/unmute ────────────────────────────────────────────────────────────
    const toggleMute = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isMuted.current) {
            audio.muted = false
            isMuted.current = false
            setMuted(false)
            fadeTo(audio, 1, FADE_MS)
            if (audio.paused) audio.play().catch(() => {})
        } else {
            fadeTo(audio, 0, FADE_MS, () => { audio.muted = true })
            isMuted.current = true
            setMuted(true)
        }
    }

    return (
        <button
            className={'bgm-player' + (visible ? ' bgm-player-visible' : '')}
            onClick={toggleMute}
            aria-label={muted ? 'unmute music' : 'mute music'}
        >
            {muted ? '🔇' : '🎵'}
        </button>
    )
}

export default AudioPlayer
