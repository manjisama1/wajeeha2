import React from 'react'

import Align_justify from './icons/Align_justify.tsx'
import Arrow_down_outline from './icons/Arrow_down_outline.tsx'

type ActionButtonData = {
    type: 'button' | 'submit'
    className: string
    content: React.ReactNode
}

function ActionButton({ dataId }: { dataId: string }) {
    const data = getActionButtonData(dataId)

    return (
        <button
            type={data.type}
            tabIndex={0}
            data-slot="button"
            className={data.className}
        >
            {data.content}
        </button>
    )
}

function getActionButtonData(id: string): ActionButtonData {
    if (id === '0') {
        return {
            type: 'button',
            className: 'group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground size-8 rounded-full text-[#5b2144] lg:hidden sf-hidden',
            content: <Align_justify />,
        }
    }

    // default: "look around" scroll CTA
    return {
        type: 'button',
        className: 'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-primary/80 h-8 gap-1.5 px-2.5 bg-primary text-primary-foreground hand-button',
        content: (
            <>
                {'look around '}
                <Arrow_down_outline />
            </>
        ),
    }
}

export default ActionButton
