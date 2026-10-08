import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import CakeSequence from './CakeSequence.tsx'
import WishNote from './WishNote.tsx'
import wishesData from '../data/wishes.json'

type JournalSectionData = {
    sectionId: string
    sectionClassName: string
    number: string
    kicker: string
    title: string
    content: JSX.Element
}

function JournalSection({ dataId }: { dataId: string }) {
    const data = getJournalSectionData(dataId)
    return (
        <section id={data.sectionId} className={data.sectionClassName}>
            <div className="journal-heading">
                <span className="journal-number">{data.number}</span>
                <div>
                    <span className="handwritten-kicker">{data.kicker}</span>
                    <h2>{data.title}</h2>
                </div>
            </div>
            {data.content}
        </section>
    )
}

function getJournalSectionData(id: string): JournalSectionData {
    if (id === '0') {
        return {
            sectionId: 'cake',
            sectionClassName: 'journal-section scroll-mt-24',
            number: '01',
            kicker: 'first, a tiny cake',
            title: 'Make a wish on your Birthday.',
            content: <CakeSequence />,
        }
    }

    // wishes
    return {
        sectionId: 'wishes',
        sectionClassName: 'journal-section scroll-mt-24',
        number: '♡',
        kicker: 'a few little wishes',
        title: 'For your new year.',
        content: (
            <div className="wishes-board">
                {wishesData.map((wish, i) => (
                    <WishNote key={wish.id} index={i} message={wish.message} />
                ))}
            </div>
        ),
    }
}

export default JournalSection
