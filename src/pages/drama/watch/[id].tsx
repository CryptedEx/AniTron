import React from 'react';
import ViewAsian from '@services/Drama/ViewAsian';
import {useRouter} from 'next/router';
import Utility from '@services/Utility';
import {NextSeo} from 'next-seo';
import Plyr from '@components/Anime/VideoPlayer/Plyr';
import {Stack} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {GetServerSideProps} from 'next';
import {IMovieResult, ISource} from "@consumet/extensions";

const Watch = ({drama, src}: {
    drama: any,
    src: any
}) => {
    const router = useRouter();

    const changeEpisode = (direction) => {
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
                title={`${drama.title || drama.altTitles[1] || drama.altTitles[0] || '<no name>'} - ${drama.episodes.find((ep) => +ep.episode === +router.query.ep).title} | AniTron Drama`}
                description={drama.description ? Utility.stripHtml(drama.description) : null}
            />
            <div>
                <div className={"flex flex-col flex-wrap pb-[5rem]"}>
                    {src && <Plyr
                        watchData={{url: src.sources[0].url, subtitles: src.subtitles[0]}} skipTime={null}
                        banner={null}/>}
                    {!src &&
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
                        {(router.query.ep as unknown as number) <= drama.episodes.length &&
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
                    </Stack>
                    <div
                        className={"text-white inline mt-[2rem] ml-[2rem] mr-[2rem] md:ml-[5rem] md:mr-[5rem] lg:ml-[7rem] lg:mr-[7rem]"}>{drama.title || drama.altTitles[1] || drama.altTitles[0] || '<no name>'} |
                        Episode {router.query.ep}</div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');
    if (!query.id || !query.ep || +query.ep < 1) return {notFound: true}

    const [drama]: IMovieResult[] = await Promise.all([
        ViewAsian.getMovieInfo((query.id as string).replace('$', '/')),
    ])

    const [src]: ISource[] = await Promise.all([
        ViewAsian.getStreamingUrls(query.epId as string)
    ])

    return {
        props: {
            drama: JSON.parse(JSON.stringify(drama)) || null,
            src: JSON.parse(JSON.stringify(src)) || null
        }
    }
}

export default Watch;