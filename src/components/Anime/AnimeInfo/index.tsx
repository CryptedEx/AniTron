import React from 'react';
import Image from 'next/image';
import Utility from '@services/Utility';

const AnimeInfo = ({anime}: {
    anime: any
}) => {
    return (
        <div className={"flex flex-row pb-[5rem] mt-[3rem] ml-[2rem] mr-[2rem] md:ml-[5rem] md:mr-[5rem] lg:ml-[7rem] lg:mr-[7rem]"}>
            <Image src={anime.image} alt={anime.title.english || anime.title.userPreferred}
                   className={"w-[9rem] h-[13rem] lg:w-[16rem] lg:h-[26rem] md:w-[15rem] md:h-[20rem] sm:w-[11rem] sm:h-[16rem] aspect-[2/3] rounded-lg object-cover object-center aspect-[2/3]"}
                   width={300} height={400}/>
            <div className={"flex flex-col ml-4"}>
                <p className={"pb-[.5rem]"}>{anime.title.english || anime.title.userPreferred}</p>
                <p className={"pb-[.5rem]"}>{anime.title.native}</p>
                <p className={"pb-[.5rem] text-[#46D369]"}>{anime.rating}% liked</p>
                <p className={"pb-[.5rem] text-[1.rem]"}>{anime.season} {anime.seasonYear || anime.releaseDate}</p>
                <p className={"pb-[.5rem] text-[1.rem]"}>{anime.type} {anime.status}</p>
                <p className={"pb-[.5rem] text-[1.rem]"}>{anime.totalEpisodes} Episodes, {anime.duration} minutes each</p>
                <p className={"pb-[.5rem]"}>{anime.genres.join(', ')}</p>
                {anime.description &&
                    <p className={"text-white overflow-hidden mt-2 overflow-ellipsis leading-[1.1] line-clamp-1 xl: line-clamp-4 lg: line-clamp-3 md: line-clamp-2"}>{Utility.stripHtml(anime.description)}</p>
                }
            </div>
        </div>
    )
}

export default AnimeInfo;
