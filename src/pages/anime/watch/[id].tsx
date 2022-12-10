import React, {useEffect} from 'react';
import AniList from '@services/AniList';
import AniSkip from '@services/AniSkip';
import {useRouter} from 'next/router';
import Utility from '@services/Utility';
import {NextSeo} from 'next-seo';
import Plyr from '@components/VideoPlayer/Plyr';
import {Stack} from '@mui/material';
import Select from 'react-select'
import {SelectStyles} from '@assets/styles/MainStyles';
import {providerOptions} from '@options/watchOptions';
import {formatDistance} from 'date-fns';
import AnimeInfo from '@components/AnimeInfo';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Image from 'next/image';
import {GetServerSideProps} from 'next';

const Watch = ({anime, episodeData, animeData, skipTime, err}: {
    anime: any,
    episodeData: any,
    animeData: any,
    skipTime: any,
    err: boolean
}) => {
    const router = useRouter();

    useEffect(() => {
        if (err) {
            router.push('/404');
        }
        //eslint-disable-next-line
    }, [err]);

    function handleProvider(data): void {
        router.query.prov = data.value;
        router.push(router);
    }

    function changeEpisode(direction) {
        if (direction === 'next') {
            (router.query.ep as unknown as number) = parseInt(router.query.ep as string) + 1;
        } else {
            (router.query.ep as unknown as number) = parseInt(router.query.ep as string) - 1;
        }
        router.push(router);
    }

    return (
        <>
            <NextSeo
                title={`${episodeData.title} - ${anime.title.english || anime.title.userPreferred} | AniTron`}
                description={episodeData.description ? Utility.stripHtml(episodeData.description) : null}
                openGraph={{
                    images: [
                        {
                            type: 'large',
                            url: episodeData.image,
                            alt: ` ${
                                episodeData.title || anime.title.english || anime.title.userPreferred
                            }`,
                        },
                        {
                            type: 'small',
                            url: '/logo.png',
                            alt: 'AniTron',
                        },
                    ],
                }}
            />
            <div>
                <div className={"flex flex-col flex-wrap pb-[5rem]"}>
                    {animeData?.sources &&
                        <Plyr
                            src={animeData.sources.find((src) => src.quality === 'default')?.url || animeData.sources.find((src) => src.quality === 'auto')?.url || animeData.sources[0]?.url}
                            subtitles={animeData.subtitles || null} skipTime={skipTime || null}
                            banner={episodeData.image} id={anime.id} ep={+router.query.ep}/>
                    }
                    {!animeData?.sources &&
                        <div>
                            <p className={"flex justify-center mt-[5rem] text-white"}>Hmm, our servers died. Try
                                changing providers</p>
                        </div>
                    }
                    <Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}
                           fontSize={'1rem'}
                           className={"mt-[0.5rem] md:mt-[1.5rem] lg:mt-[2rem]"} style={{
                        fontSize: 'clamp(1rem, 1.5vw, 2rem)',
                        marginBottom: '0.3rem',
                        marginLeft: '1rem',
                    }}>
                        {(router.query.ep as unknown as number) > 1 &&
                            <>
                                <div onClick={() => changeEpisode('back')} className={"cursor-pointer"}>
                                    <KeyboardDoubleArrowLeftIcon style={{
                                        fontSize: 'clamp(2rem, 2.5vw, 3rem)',
                                        marginBottom: '0.3rem',
                                        marginLeft: '1rem',
                                    }}/>
                                    <p className={"text-white inline"}>Previous</p>
                                </div>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            </>
                        }
                        {(router.query.ep as unknown as number) <= anime.totalEpisodes &&
                            <>
                                <div onClick={() => changeEpisode('next')} className={"cursor-pointer"}>
                                    <p className={"text-white inline"}>Next</p>
                                    <KeyboardDoubleArrowRightIcon style={{
                                        fontSize: 'clamp(2rem, 2.5vw, 3rem)',
                                        marginBottom: '0.3rem',
                                        marginLeft: '1rem',
                                    }}/>
                                </div>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            </>
                        }
                        <SettingsIcon style={{
                            fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
                            marginBottom: '0.3rem',
                            marginRight: '0.3rem',
                        }}/>
                        <Select
                            placeholder={'Select Provider'}
                            defaultValue={router.query.prov ? providerOptions.find((option) => option.value === router.query.prov) : {
                                label: 'GogoStream',
                                value: 'gogoanime'
                            }}
                            onChange={handleProvider}
                            options={providerOptions}
                            isSearchable={false}
                            styles={SelectStyles}
                        />
                    </Stack>
                    <div
                        className={"text-white inline mt-[2rem] ml-[2rem] mr-[2rem] md:ml-[5rem] md:mr-[5rem] lg:ml-[7rem] lg:mr-[7rem]"}>{anime.title.english || anime.title.userPreferred} |
                        Episode {router.query.ep}</div>
                    {anime.nextAiringEpisode &&
                        <div
                            className={"text-white inline mt-[3rem] ml-[2rem] mr-[2rem] md:ml-[6rem] md:mr-[5rem] lg:ml-[7rem] lg:mr-[7rem]"}>Episode {anime.nextAiringEpisode.episode} will
                            air {
                                <div className={"inline text-[#c271fb]"}>{formatDistance(new Date(anime.nextAiringEpisode.airingTime * 1000), new Date(), {addSuffix: true})}</div>
                            }
                        </div>
                    }
                    <AnimeInfo anime={anime}/>
                    <div className={"inline-block px-[3.5vw]"}>
                        <p className={"ml-[0.5rem] mr-[0.5rem] md:ml-[1rem] md:mr-[1rem]"}>Similar Anime</p>
                        {anime.recommendations?.slice(0, anime.recommendations.length > 10 ? 10 : anime.recommendations.length).map((recommendation, key) => (
                            <div
                                className={"inline-block w-[30vw] h-[44vw] bg-none xl: w-[calc(30*.6vw)] xl: h-[calc(44*.6vw)]"}
                                key={key}>
                                <button
                                    className={"w-[inherit] h-[inherit] cursor-pointer transition scale-90 hover:scale-100"}
                                    onClick={() => router.push(`/anime/info/${recommendation.id}`)}>
                                    <Image
                                        className={"w-full h-full object-cover"}
                                        quality={100}
                                        fill={true}
                                        unoptimized={true}
                                        src={recommendation.image}
                                        alt='recommendation-poster'
                                    />
                                    <div
                                        className={"transition opacity-[0] hover:opacity-[1] text-center justify-end p-[0.5rem] md:p-[1rem] color-white flex flex-col absolute top-[0] left-[0] w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.9)]"}>
                                        <div className={"text-center mb-[1rem]"}>
                                            <p className={"text-white no-underline font-bold text-[1rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.5rem] xl:text-[1.7rem] 2xl:text-[2rem] mb-[0.5rem] block"}>{recommendation.title?.english || recommendation.title?.userPreferred || recommendation.title?.native}</p>
                                            <p className={"inline-block mt-[0.5rem] md:mt-[1rem] text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[1.5rem] text-[#46D369]"}>{recommendation.rating || 'NaN'}%
                                                liked</p>
                                            {" | "}
                                            <p className={"inline-block mt-[0.5rem] md:mt-[1rem] text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[1.5rem]"}>{recommendation.type || 'Unknown'}</p>
                                            {" | "}
                                            <p className={"inline-block mt-[0.5rem] md:mt-[1rem] text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[1.5rem]"}>{recommendation.episodes?.length || recommendation.episodes || recommendation.totalEpisodes} ep</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');
    if (!query.id || !query.ep) return {
        props: {
            err: true,
        },
    };

    let prov: string
    if (!query.prov || (query.prov && !providerOptions.find((option) => option.value === query.prov))) prov = 'gogoanime';
    else prov = providerOptions.find((option) => option.value === query.prov).value;

    const [anime, animeSrc]: any = await Promise.all([
        AniList.getAnimeInfo(query.id as unknown as number, 'zoro'),
        query.prov !== 'zoro' ? AniList.getAnimeInfo(+query.id, prov) : null
    ]);

    if (Number(query.ep) > animeSrc?.episodes?.length || Number(query.ep) > anime?.episodes?.length || Number(query.ep) < 1) {
        res.statusCode = 404;
        return {props: {err: true}};
    }

    const zoroId: any = anime?.episodes?.find((e) => e.number === Number(query.ep));

    const [animeWatchData, zoroWatchData]: any = await Promise.all([
        query.prov !== 'zoro' ? AniList.getStreamingUrls(animeSrc?.episodes?.find((e) => e.number === Number(query.ep)).id, prov) : null,
        AniList.getStreamingUrls(zoroId?.id, 'zoro')
    ]);

    let skipTime = zoroWatchData?.intro
    //todo
    // let [skipTime] = await Promise.all([
    //     AniSkip.getSkip(anime.malId, +query.ep, anime.type === 'TV' ? 24 : anime.duration)
    // ]);
    //
    // if (skipTime.statusCode === 404) skipTime = zoroWatchData?.intro

    return {
        props: {
            anime: anime || animeSrc || null,
            episodeData: zoroId || animeSrc?.episodes?.find((e) => e.number === +query.ep) || null,
            animeData: query.prov !== 'zoro' ? animeWatchData : zoroWatchData || null,
            skipTime: skipTime || null,
        },
    }
}

export default Watch;