import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';

const Watch = ({id}: {
    id: number
}) => {
    return (
        <Link href={`/anime/watch/${id}?ep=1`}>
            <button className={"h-fit inline-block bg-[#efefef] text-black rounded-[0.3rem] hover:opacity-70 hover:no-underline"} style={{textShadow: 'none', padding: 'min(1.5vw, 1.5rem) min(3vw, 4rem)', transition: 'opacity ease 200ms'}} title='Watch'>
                <div className={"flex items-center justify-center"}>
                    <PlayArrowIcon className={"mr-[0.5vw]"} style={{fontSize: 'clamp(1.5rem, 3vw, 3rem)',}}/>
                    <strong>Watch</strong>
                </div>
            </button>
        </Link>
    )
}

export default Watch;