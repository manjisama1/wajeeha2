import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Push_pin_location_marker from './icons/Push_pin_location_marker.tsx'
import notesData from '../data/notes.json'


type StickyNoteData = {
    id: string;
    text: string;
    color: string;
    tilt: string;
};

// Component
function StickyNote({ dataId }: { dataId: string }) {
    const note = (notesData as StickyNoteData[]).find(n => n.id === String(dataId))
        ?? (notesData as StickyNoteData[])[0];

    return (
        <article className={`sticky-note ${note.color} ${note.tilt}`}>
            <Push_pin_location_marker />
            <p className={"pr-3 font-[family-name:var(--font-hand)] text-xl leading-snug text-[#51303f]"}>
                {note.text}
            </p>
        </article>
    );
}

export default StickyNote
