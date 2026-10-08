import React, { useState } from 'react'

import Img from './components/Img.tsx'
import NotificationSection from './components/NotificationSection.tsx'
import Header from './components/Header.tsx'
import HandmadePage from './components/HandmadePage.tsx'
import AudioPlayer from './components/AudioPlayer.tsx'
import LoadingScreen from './components/LoadingScreen.tsx'
import type { SectionTrack } from './components/AudioPlayer.tsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Section → song mapping (songs in /public/audio/)
const TRACKS: SectionTrack[] = [
    { sectionId: 'home',         src: '/audio/hbdsong.mp3'   },
    { sectionId: 'cake',         src: '/audio/hbdsong.mp3'   },
    { sectionId: 'wishes',       src: '/audio/recordson.mp3' },
    { sectionId: 'wenshin',      src: '/audio/den.mp3'       },
    { sectionId: 'letters',      src: '/audio/glue.mp3'      },
    { sectionId: 'notes-spread', src: '/audio/glue.mp3'      },
    { sectionId: 'this-us',      src: '/audio/shade.mp3'     },
]

// Deterministic wall doodle positions
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
                top:  (r + 0.15 + rand() * 0.6) * (100 / rows),
                left: (c + 0.1  + rand() * 0.6) * (100 / cols),
                rot:  Math.round(rand() * 40 - 20),
                img:  n++ % 7,
            })
        }
    }
    return out
})()

function AppContent() {
    // loading=true  → show LoadingScreen
    // loading=false → show site + start audio
    const [loading, setLoading] = useState(true)

    return (
        <>
            {/* Loading screen — unmounts after dismiss */}
            {loading && <LoadingScreen onDone={() => setLoading(false)} />}

            <div className="scrapbook-app">
                <NotificationSection />
                <div className="gingham-doodle gingham-heart">♡</div>
                <div className="gingham-doodle gingham-star">✦</div>
                <div className="gingham-doodle gingham-note">
                    made<br />with love
                </div>
                <Header />
                <div className="wall-doodles" aria-hidden="true">
                    {DOODLES.map((d, i) => (
                        <span
                            key={i}
                            className="wall-doodle-spot"
                            style={{ top: d.top + '%', left: d.left + '%', transform: `rotate(${d.rot}deg)` }}
                        >
                            <Img id={String(d.img)} />
                        </span>
                    ))}
                </div>
                <HandmadePage />

                {/* BGM — startSignal fires when loading screen is dismissed */}
                <AudioPlayer tracks={TRACKS} startSignal={!loading} />
            </div>
        </>
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
