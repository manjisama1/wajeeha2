import React from 'react'

import Img from './components/Img.tsx'
import NotificationSection from './components/NotificationSection.tsx'
import Header from './components/Header.tsx'
import HandmadePage from './components/HandmadePage.tsx'
import AudioPlayer from './components/AudioPlayer.tsx'
import type { SectionTrack } from './components/AudioPlayer.tsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Section → song mapping
// Multiple section IDs can share a song — first one visible wins each time.
// Songs live in /public/audio/
const TRACKS: SectionTrack[] = [
    { sectionId: 'home',         src: '/audio/hbdsong.mp3',   label: '♪ hbd song'   },
    { sectionId: 'cake',         src: '/audio/hbdsong.mp3',   label: '♪ hbd song'   },
    { sectionId: 'wishes',       src: '/audio/recordson.mp3', label: '♪ recordson'  },
    { sectionId: 'wenshin',      src: '/audio/den.mp3',       label: '♪ den'        },
    { sectionId: 'letters',      src: '/audio/glue.mp3',      label: '♪ glue'       },
    { sectionId: 'notes-spread', src: '/audio/glue.mp3',      label: '♪ glue'       },
    { sectionId: 'this-us',      src: '/audio/shade.mp3',     label: '♪ shade'      },
]

// Spread tiny doodles over the whole wallpaper
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
            {/* BGM player — floats bottom-right, persists across all sections */}
            <AudioPlayer tracks={TRACKS} />
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
