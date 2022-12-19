import React from 'react'
import Image from 'next/image';

const Card = ({anime, onClick = () => {}}: {
    anime: any,
    onClick?: () => void
}) => {
    return (
        <div className={"w-[45vw] ml-[0.5rem] sm:w-[22vw] md:w-[18.1vw] lg:w-[12.9vw]"}>
            <button className={"h-full cursor-pointer hover:scale-110"} style={{transition: 'transform ease 200ms'}}
                    onClick={onClick}>
                <Image width={200} height={200} className={"w-full h-full object-cover object-contain"} unoptimized={true}
                       src={anime.image} alt={anime.title.english || anime.title.userPreferred}/>
            </button>
        </div>
    )
}

export default Card;