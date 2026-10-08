import React from 'react'

import Home from './Home.tsx'
import JournalSection from './JournalSection.tsx'
import WenshinJournal from './WenshinJournal.tsx'
import LettersSection from './LettersSection.tsx'
import NotesSpread from './NotesSpread.tsx'
import ThisUs from './ThisUs.tsx'
import ScrapFooter from './ScrapFooter.tsx'

// Final page order:
// Opening → 01 Cake → ♡ Wishes → 02 Wenshin Manga → 03 Real Feelings → Notes → This Is Us → 04 Surprise → Footer

function HandmadePage() {
    return (
        <main className="handmade-page">
            <Home />
            <JournalSection dataId="0" />  {/* 01 — Cake sequence */}
            <JournalSection dataId="1" />  {/* ♡  — Wishes */}
            <WenshinJournal />             {/* 02 — Wenshin manga */}
            <LettersSection />             {/* 03 — Real feelings */}
            <NotesSpread />                {/* tiny notes spread */}
            <ThisUs />                     {/* This is us — after notes */}
            <ScrapFooter />
        </main>
    )
}

export default HandmadePage
