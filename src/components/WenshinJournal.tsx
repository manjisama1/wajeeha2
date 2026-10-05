import React from 'react'

import wenshin_panel1 from '/assets/wenshin/wenshin_panel1.png'
import wenshin_panel2 from '/assets/wenshin/wenshin_panel2.png'
import wenshin_panel3 from '/assets/wenshin/wenshin_panel3.png'


function WenshinJournal() {
    return (
        <section id={"wenshin"} className={"journal-section scroll-mt-24"}>
            <div className={"journal-heading"}>
                <span className={"journal-number"}>02</span>
                <div>
                    <span className={"handwritten-kicker"}>from Wenshin</span>
                    <h2>wish from your boy</h2>
                </div>
            </div>
            <div className={"manga-strip"}>
                <img alt="Wenshin birthday manga panel 1" className={"manga-panel manga-panel-1"} src={wenshin_panel1} />
                <img alt="Wenshin birthday manga panel 2" className={"manga-panel manga-panel-2"} src={wenshin_panel2} />
                <img alt="Wenshin birthday manga panel 3" className={"manga-panel manga-panel-3"} src={wenshin_panel3} />
            </div>
        </section>
    )
}

export default WenshinJournal
