import React from 'react'

import Img from './components/Img.tsx'
import NotificationSection from './components/NotificationSection.tsx'
import Header from './components/Header.tsx'
import HandmadePage from './components/HandmadePage.tsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Spread tiny doodles over the whole wallpaper: one per grid cell, with jitter, so they never touch.
const DOODLES = (() => {
    let seed = 7
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    const rows = 22, cols = 6
    const out: { top: number; left: number; rot: number; img: number }[] = []
    let n = 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (rand() < 0.35) continue
            out.push({
                top: (r + 0.15 + rand() * 0.6) * (100 / rows),
                left: (c + 0.1 + rand() * 0.6) * (100 / cols),
                rot: Math.round(rand() * 40 - 20),
                img: n++ % 7,
            })
        }
    }
    return out
})()

function AppContent() {
    return (
        <div className={"scrapbook-app"}>
            <NotificationSection />
            <div className={"gingham-doodle gingham-heart"}>♡</div>
            <div className={"gingham-doodle gingham-star"}>✦</div>
            <div className={"gingham-doodle gingham-note"}>
                made<br />with love
            </div>
            <Header />
            <div className={"wall-doodles"} aria-hidden="true">
                {DOODLES.map((d, i) => (
                    <span
                        key={i}
                        className={"wall-doodle-spot"}
                        style={{ top: d.top + "%", left: d.left + "%", transform: `rotate(${d.rot}deg)` }}
                    >
                        <Img id={String(d.img)} />
                    </span>
                ))}
            </div>
            <HandmadePage />
        </div>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<AppContent />} />
            </Routes>
        </Router>
    )
}

export default App
