import React from 'react'

// Cake assets
import cake_light    from '/assets/cake/cake_light.png'
import cake_unlight  from '/assets/cake/cake_unlight.png'
import cake_slice    from '/assets/cake/cake_slice.png'
import cake_cutaway  from '/assets/cake/cake_cutaway.png'

// Cat asset
import cat_thron     from '/assets/cat/wajeeha_sword.png'

// Manji assets
import manji_eat     from '/assets/manji/manji_eat.png'
import manji_ask     from '/assets/manji/manji_ask.png'
import manji_wajeeha from '/assets/manji/manji_wajeeha.png'

// Wenshin manga panels
import wenshin_panel1 from '/assets/wenshin/wenshin_panel1.png'
import wenshin_panel2 from '/assets/wenshin/wenshin_panel2.png'
import wenshin_panel3 from '/assets/wenshin/wenshin_panel3.png'

// Doodles
import kurumi1   from '/assets/doodles/kurumi1.png'
import kurumi2   from '/assets/doodles/kurumi2.png'
import kurumi3   from '/assets/doodles/kurumi3.png'
import kurumi4   from '/assets/doodles/kurumi4.png'
import batzmaru1 from '/assets/doodles/batzmaru1.png'
import batzmaru2 from '/assets/doodles/badtzmaru2.png'
import batzmaru3 from '/assets/doodles/batzmaru3.png'

export const Img = ({ id }: { id: string }) => {
    switch (String(id)) {
        // wall doodles 0-6
        case '0': return <img alt="" className="wall-doodle" src={kurumi1} />
        case '1': return <img alt="" className="wall-doodle" src={kurumi2} />
        case '2': return <img alt="" className="wall-doodle" src={kurumi3} />
        case '3': return <img alt="" className="wall-doodle" src={kurumi4} />
        case '4': return <img alt="" className="wall-doodle" src={batzmaru1} />
        case '5': return <img alt="" className="wall-doodle" src={batzmaru2} />
        case '6': return <img alt="" className="wall-doodle" src={batzmaru3} />

        // hero
        case '7': return <img alt="Wajeeha preparing to cut the cake" src={cat_thron} />

        // cake sequence
        case 'cake_light':   return <img alt="Birthday cake with lit candle" src={cake_light} />
        case 'cake_unlight': return <img alt="Candle blown out" src={cake_unlight} />
        case 'cake_slice':   return <img alt="Cutting the cake" src={cake_slice} />
        case 'cake_cutaway': return <img alt="Cake cut open" src={cake_cutaway} />

        // manji
        case 'manji_eat':     return <img alt="Manji eating cake" src={manji_eat} />
        case 'manji_ask':     return <img alt="Manji asking if you want some" src={manji_ask} />
        case 'manji_wajeeha': return <img alt="Manji and Wajeeha" src={manji_wajeeha} />

        // wenshin manga panels
        case 'wenshin_panel1': return <img alt="Wenshin birthday manga panel 1" className="manga-panel manga-panel-1" src={wenshin_panel1} />
        case 'wenshin_panel2': return <img alt="Wenshin birthday manga panel 2" className="manga-panel manga-panel-2" src={wenshin_panel2} />
        case 'wenshin_panel3': return <img alt="Wenshin birthday manga panel 3" className="manga-panel manga-panel-3" src={wenshin_panel3} />

        default: return null
    }
}

export default Img
