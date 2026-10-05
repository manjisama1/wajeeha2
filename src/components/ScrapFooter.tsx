import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Filled_heart_shape from './icons/Filled_heart_shape.tsx'
import Filled_heart_shape3 from './icons/Filled_heart_shape3.tsx'
import FooterTopButton from './FooterTopButton.tsx'


// Component
function ScrapFooter() {
    return <footer className={"scrap-footer"}>
    	<div>
    		<span className={"brand-mark"}>
    			<Filled_heart_shape3 />
    		</span>
    		<span>
    			for my Wajeeha ♡
    		</span>
    	</div>
    	<span className={"footer-found"}>
    		1 / 7 pages found
    	</span>
    	<FooterTopButton />
    </footer>
}


export default ScrapFooter
