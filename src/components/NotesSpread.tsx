import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import StickyNote from './StickyNote.tsx'
import notesData from '../data/notes.json'


// Component
function NotesSpread() {
    return <section id="notes-spread" className={"notes-spread"}>
        <div className={"scrap-card p-5 sm:p-8"}>
            <div className={"flex flex-col justify-between gap-4 md:flex-row md:items-end"}>
                <div>
                    <span className={"eyebrow"}>
                        What is in my mind?
                    </span>
                    <h3 className={"section-card-title mt-2"}>
                        Little notes, left around for you
                    </h3>
                    <p className={"mt-2 max-w-xl text-sm leading-6 text-[#76546b]"}>
                        A few thoughts that felt too sweet to leave in my head.
                    </p>
                </div>
                <span className={"font-[family-name:var(--font-hand)] text-xl text-[#9d3568]"}>
                    <span style={{display:"contents"}}>
                        {notesData.length}
                    </span>
                    {` tiny thoughts`}
                </span>
            </div>
            <div className={"notes-grid mt-5"}>
                {notesData.map((note) => (
                    <StickyNote key={note.id} dataId={note.id} />
                ))}
            </div>
        </div>
    </section>
}


export default NotesSpread
