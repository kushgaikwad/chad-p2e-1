import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='flex flex-col justify-center items-center h-screen gap-8'>


            <Player
                src='https://assets8.lottiefiles.com/packages/lf20_lZZX75saS2.json'
                className="player h-60"
                autoplay
                loop
            />
            <h2 className='text-2xl '>Please wait...</h2>

        </div>


    )
}

export default Loading