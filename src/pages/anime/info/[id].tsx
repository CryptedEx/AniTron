import React from 'react';
import AniList from '@services/Anime/AniList';
import {NextSeo} from 'next-seo';
import Utility from '@services/Utility';
import Episodes from '@components/Anime/Episodes'
import About from '@components/General/About'
import WatchButton from '@components/General/Buttons/Watch'
import TrailerButton from '@components/General/Buttons/Trailer'
import {formatDistance} from 'date-fns';
import {GetServerSideProps} from 'next';
import {IAnimeInfo} from '@consumet/extensions';

const Anime = ({anime}: {
    anime: any
}) => {

    return (
        <>
            <NextSeo
                title={`${anime.title.english || anime.title.userPreferred || anime.title.romaji} | AniTron Anime`}
                description={Utility.stripHtml(anime.description)}
                openGraph={{
                    images: [
                        {
                            type: 'small',
                            url: anime.image,
                            alt: ` ${
                                anime.title.english || anime.title.userPreferred || anime.title.romaji
                            }`,
                        },
                        {
                            type: 'large',
                            url: anime.cover || anime.image,
                            alt: `Cover of ${
                                anime.title.english || anime.title.userPreferred || anime.title.romaji
                            }`,
                        },
                    ],
                }}
            />
            <>
                <header className={"flex relative items-end bg-cover bg-center transition px-[3vw] py-[1.5vw]"} style={{
                    backgroundImage: `linear-gradient(0deg, #141414 1%, transparent 99%), url(${anime.cover || anime.image})`,
                    height: 'clamp(20rem, 34vw, 50rem)'
                }}>
                    <div>
                        <h2>{anime.title.english || anime.title.userPreferred || anime.title.romaji}
                        </h2>
                        {anime.title.native &&
                            <h3 style={{
                                marginBottom: 'max(1vw, 1rem)',
                                fontWeight: 'normal'
                            }}>({anime.title.native})</h3>}
                        <div className={"flex items-center mr-[5vw]"}>
                            {anime.totalEpisodes > 0 &&
                                <WatchButton id={anime.id}/>
                            }
                            {anime.trailer && anime.trailer.site === 'youtube' &&
                                <div className={`${anime.totalEpisodes ? 'ml-[1rem]' : null}`}>
                                    <TrailerButton id={anime.trailer.id}/>
                                </div>
                            }
                        </div>
                    </div>
                </header>
                <main className={"px-[3vw] py-[1.5vw] [&+.separator]:mt-[1.5vw] [&+.separator]:leading-loose"}>
                    <div>
                        <div className={"text-[80%] mb-[1.5vw]"}>
                            {anime.rating &&
                                <strong className={"text-[#46D369]"}>{anime.rating}% Rating</strong>}
                            {anime.season &&
                                <label className={"ml-4"}>{anime.season}</label>}
                            {anime.releaseDate &&
                                <label className={"ml-4"}>{anime.releaseDate}</label>}
                            {(() => {
                                if (anime.type === 'TV' && anime.totalEpisodes) {
                                    return <label className={"ml-4"}>{anime.totalEpisodes} episodes</label>
                                }
                            })()}
                            {(() => {
                                if (anime.type === 'MOVIE') {
                                    return <label className={"ml-4"}>{anime.duration} minutes</label>
                                }
                            })()}
                            {(() => {
                                if (anime.type === 'TV' && anime.nextAiringEpisode) {
                                    return <label className={"ml-4"}>Ep {anime.nextAiringEpisode.episode} airing {
                                        formatDistance(new Date(anime.nextAiringEpisode.airingTime * 1000), new Date(), {addSuffix: true})
                                    }</label>
                                }
                            })()}
                        </div>
                        <div className={"flex mb-[1vw]"}>
                            <p>{Utility.stripHtml(Utility.trimInfoParagraph(anime.description))}</p>
                            <section className={"hidden md:flex w-[45vw] ml-[1.5vw]"}><About limitElements={3}
                                                                                             data={anime}/></section>
                        </div>
                    </div>
                    {(() => {
                        if (anime.type === 'TV' && anime.episodes.length) {
                            return (
                                <Episodes
                                    episodes={anime.episodes}
                                    id={anime.id}
                                    thumbnail={anime?.cover || anime?.image}
                                />
                            )
                        }
                    })()}
                    <h3 id='separator'
                        className={"mb-[.5rem]"}>About {anime.title.english || anime.title.userPreferred}</h3>
                    <About data={anime} limitElements={null}/>
                </main>
            </>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=59');
    if (!query.id) return {notFound: true};
    const [anime]: IAnimeInfo[] = await Promise.all([AniList.getAnimeInfoAndEpisodes(query.id as string, 'gogoanime')]);

    return {
        props: {
            anime: JSON.parse(JSON.stringify(anime)) || null,
        },
    };
}

export default Anime;