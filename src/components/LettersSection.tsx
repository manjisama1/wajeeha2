import React from 'react'
import LetterCard from './LetterCard.tsx'
import lettersData from '../data/letters.json'

function LettersSection() {
    return (
        <section id="letters" className="journal-section real-feelings-section scroll-mt-24">
            <div className="journal-heading">
                <span className="journal-number">03</span>
                <div>
                    <span className="handwritten-kicker">real feelings</span>
                    <h2>Open a letter only if you mean it.</h2>
                </div>
            </div>
            <div className="letters-board">
                <p className="letters-intro">
                    Here are some letters for you. (i will be adding more) <br />
                    Open one only when you need these, Save these for later no peeking :D.
                </p>
                <div className="letters-grid">
                    {lettersData.map((letter) => (
                        <LetterCard key={letter.id} dataId={letter.id} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LettersSection
