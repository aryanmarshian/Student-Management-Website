import React, { useState } from 'react'

// pexels.com for free stock videos
import Video from '../../videos/squares.mp4'
import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    NavLinks,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
} from './HeroElements'

import { Button } from '../ButtonElement'

const HeroSection = () => {

    const [ hover, setHover ] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
            </HeroBg>
            <HeroContent>
                <HeroH1> MIASA </HeroH1>
                <HeroP> 
                    Empowering Minds, Shaping Futures: Your Journey Starts Here!
                </HeroP>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection