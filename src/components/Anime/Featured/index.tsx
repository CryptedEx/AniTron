import React from 'react';
import Utility from '@services/Utility';
import {FeaturedContainer} from '@assets/styles/MainStyles'
import WatchButton from '../../General/Buttons/Watch';
import InfoButton from '../../General/Buttons/Information';
import Carousel from 'react-bootstrap/Carousel/';
import {useRouter} from 'next/router';

const Featured = ({animes}: {
    animes: any
}) => {
    const router = useRouter();

    return (
        <Carousel keyboard={false} nextLabel={null} prevLabel={null} pause={false} controls={false} interval={4000}>
            {
                animes.map((anime, i) => {
                    return (
                        <Carousel.Item key={anime.id} style={{transition: '-webkit-transform 0.5s ease'}}>
                            <FeaturedContainer className={"w-full h-[45vh] flex leading-[1.3] items-center"} background={anime.cover}>
                                <main style={{margin: '0 3.5vw', textShadow: '2px 2px 3px #141414'}}>
                                    <div>
                                        <h1 className={"text-[1.5rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.3rem] xl:text-[2.5rem] 2xl:text-[2.8rem] font-bold text-[#A020F0]"}>#{i + 1} in trending</h1>
                                        <h1 className={"mt-[0.5rem]"}>{anime.title.english || anime.title.userPreferred || anime.title.romaji}</h1>
                                        <h3 className={"font-normal"}>({anime.title.native})</h3>
                                    </div>
                                    <div className={"leading-[3]"}>
                                        <strong className={"text-[#46D369]"}>{anime.rating || 0}%
                                            Rating</strong>
                                        <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>{anime.releaseDate}</label>
                                        {(() => {
                                            if (anime.type === 'TV' && anime.totalEpisodes) {
                                                return <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>{anime.totalEpisodes} episodes</label>
                                            }
                                        })()}
                                        {(() => {
                                            if (anime.type === 'MOVIE') {
                                                return <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>Movie</label>
                                            }
                                        })()}
                                        {(() => {
                                            if (anime.type === 'SPECIAL') {
                                                return <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>Special</label>
                                            }
                                        })()}
                                        {(() => {
                                            if (anime.type === 'OVA') {
                                                return <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>OVA</label>
                                            }
                                        })()}
                                        {(() => {
                                            if (anime.type === 'ONA') {
                                                return <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>ONA</label>
                                            }
                                        })()}
                                        {(() => {
                                            if (anime.type === 'MUSIC') {
                                                return <label style={{marginLeft: 'min(2vw, 2.5rem)'}}>Music</label>
                                            }
                                        })()}
                                    </div>
                                    <div className={"sm:w-[60vw] lg:w-[35vw]"}>{Utility.stripHtml(Utility.trimParagraph(anime.description))}</div>
                                    <div className={"flex"} style={{marginTop: 'min(3vw, 3rem)'}}>
                                        <WatchButton id={anime.id} />
                                        <InfoButton onClick={() => router.push(`/anime/info/${anime.id}`)} />
                                    </div>
                                </main>
                            </FeaturedContainer>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default Featured;