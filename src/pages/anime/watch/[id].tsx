import React from 'react';
import AniList from '@services/AniList';
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

const Watch = ({anime, episodeData, watchData, skipTime}: {
    anime: any,
    episodeData: any,
    watchData: any,
    skipTime: any,
}) => {
    const router = useRouter();

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
                    {watchData &&
                        <Plyr
                            watchData={watchData} skipTime={skipTime || null}
                            banner={episodeData.image} id={anime.id} ep={+router.query.ep}/>
                    }
                    {!watchData &&
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
    if (!query.id || !query.ep || +query.ep < 1) return {notFound: true}

    let prov: string
    if (!query.prov || (query.prov && !providerOptions.find((option) => option.value === query.prov))) prov = 'gogoanime';
    else prov = providerOptions.find((option) => option.value === query.prov).value;

    const [anime, animeSrc]: any = await Promise.all([
        AniList.getAnimeInfo(query.id as unknown as number, 'zoro'),
        query.prov !== 'zoro' ? AniList.getAnimeInfo(+query.id, prov) : null
    ]);

    if (+query.ep > animeSrc?.episodes?.length || +query.ep > anime?.episodes?.length || +query.ep < 1) {
        res.statusCode = 404;
        return {notFound: true};
    }

    const zoroId: any = anime?.episodes?.find((e) => e.number === +query.ep);

    const [watchData, zoroWatchData]: any = await Promise.all([
        query.prov !== 'zoro' ? AniList.getStreamingUrls(animeSrc?.episodes?.find((e) => e.number === +query.ep).id, prov) : null,
        AniList.getStreamingUrls(zoroId?.id, 'zoro')
    ]);
    
    return {
        props: {
            anime: {
                id: anime.id || animeSrc.id || null,
                title: anime.title || animeSrc.title || null,
                image: anime.image || animeSrc.image || null,
                rating: anime.rating || animeSrc.rating || null,
                season: anime.season || animeSrc.season || null,
                type: anime.type || animeSrc.type || null,
                status: anime.status || animeSrc.status || null,
                duration: anime.duration || animeSrc.duration || null,
                genres: anime.genres || animeSrc.genres || null,
                description: anime.description || animeSrc.description || null,
                totalEpisodes: anime.totalEpisodes || animeSrc.totalEpisodes || null,
                nextAiringEpisode: anime.nextAiringEpisode || animeSrc.nextAiringEpisode || null,
                recommendations: anime.recommendations || animeSrc.recommendations || null,
            },
            episodeData: zoroId || animeSrc?.episodes?.find((e) => e.number === +query.ep) || null,
            watchData: {
                src: query.prov !== 'zoro' ? watchData?.sources.find((src) => src.quality === 'default')?.url || watchData?.sources.find((src) => src.quality === '1080p')?.url || watchData?.sources[0]?.url || null : zoroWatchData?.sources.find((src) => src.quality === 'auto')?.url || zoroWatchData?.sources.find((src) => src.quality === '1080p')?.url || zoroWatchData?.sources[0]?.url || null,
                subtitles: (query.prov !== 'zoro' ? watchData?.subtitles?.length > 0 : zoroWatchData?.subtitles?.length > 0) ? watchData?.subtitles.find((sub) => sub.lang === '[en-US] English') || zoroWatchData?.subtitles.find((sub) => sub.lang === 'English') : null,
            },
            skipTime: zoroWatchData?.intro || null,
        },
    }
}

export default Watch;
