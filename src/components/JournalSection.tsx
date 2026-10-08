import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Closed_padlock1 from './icons/Closed_padlock1.tsx'
import Sparkle_with_plus1 from './icons/Sparkle_with_plus1.tsx'
import Heart_on_document from './icons/Heart_on_document.tsx'
import CakeSequence from './CakeSequence.tsx'
import WishNote from './WishNote.tsx'
import wishesData from '../data/wishes.json'


        type JournalSectionData = {
            sectionId: string;
            sectionClassName: string;
            number: string;
            kicker: string;
            title: string;
            content: JSX.Element;
        };
    
// Component

        function JournalSection({ dataId }: { dataId: string }) {
            const data: JournalSectionData = getJournalSectionData(dataId);

            return (
                <section id={data.sectionId} className={data.sectionClassName}>
                    <JournalHeading
                        number={data.number}
                        kicker={data.kicker}
                        title={data.title}
                    />
                    {data.content}
                </section>
            );
        }
    

// Subcomponents

        function JournalHeading({
            number,
            kicker,
            title,
        }: {
            number: string;
            kicker: string;
            title: string;
        }) {
            return (
                <div className={"journal-heading"}>
                    <span className={"journal-number"}>
                        {number}
                    </span>
                    <div>
                        <span className={"handwritten-kicker"}>
                            {kicker}
                        </span>
                        <h2>
                            {title}
                        </h2>
                    </div>
                </div>
            );
        }
    


        function getJournalSectionData(id: string): JournalSectionData {
            const stringId = String(id);

            if (stringId === "0") {
                return {
                    sectionId: "cake",
                    sectionClassName: "journal-section scroll-mt-24",
                    number: "01",
                    kicker: "first, a tiny cake",
                    title: "Make a wish on your Birthday.",
                    content: (
                        <CakeSequence />
                    ),
                };
            }

            if (stringId === "1") {
                return {
                    sectionId: "wishes",
                    sectionClassName: "journal-section scroll-mt-24",
                    number: "♡",
                    kicker: "a few little wishes",
                    title: "For your new year.",
                    content: (
                        <div className={"wishes-board"}>
                            {wishesData.map((wish, i) => (
                                <WishNote key={wish.id} index={i} message={wish.message} />
                            ))}
                        </div>
                    ),
                };
            }

            return {
                sectionId: "scrapbook",
                sectionClassName: "journal-section scroll-mt-24",
                number: "04",
                kicker: "and finally...",
                title: "One last little gift.",
                content: (
                    <div className={"surprise-paper relative overflow-hidden p-5 sm:p-8"}>
                        <div className={"absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#ddd6fe]/70 blur-3xl"}>

                        </div>
                        <div className={"relative z-10 grid items-center gap-8 md:grid-cols-[1fr_0.8fr]"}>
                            <div>
                                <span className={"eyebrow"}>
                                    the last little page
                                </span>
                                <h3 className={"section-card-title mt-2"}>
                                    Open this when you’re ready.
                                </h3>
                                <p className={"mt-3 max-w-xl text-base leading-7 text-[#76546b]"}>
                                    Download this PDF in the end i wrote somthing in it.
                                </p>
                                <div className={"mt-6 flex flex-wrap items-center gap-3"}>
                                    <span className={"inline-flex items-center gap-2 rounded-none bg-[#fff0f6] px-4 py-2.5 text-sm font-bold text-[#9d3568]"}>
                                        <Closed_padlock1 />
                                        {` find this at the end`}
                                    </span>
                                    <button
                                        className="pdf-download-btn"
                                        onClick={() => {
                                            const link = document.createElement('a')
                                            link.href = '/scrapbook/scrapbook.pdf'
                                            link.download = 'wajeeha-scrapbook.pdf'
                                            document.body.appendChild(link)
                                            link.click()
                                            document.body.removeChild(link)
                                        }}
                                    >
                                        ↓ download scrapbook
                                    </button>
                                </div>
                            </div>
                            <div className={"pdf-pocket"}>
                                <div className={"pdf-ribbon"}>
                                    <Sparkle_with_plus1 />
                                </div>
                                <Heart_on_document />
                                <span className={"mt-3 font-[family-name:var(--font-display)] text-2xl text-[#3e1029]"}>
                                    still tucked away
                                </span>
                                <span className={"mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9d3568]"}>
                                    a final surprise
                                </span>
                            </div>
                        </div>
                    </div>
                ),
            };
        }
    

export default JournalSection
