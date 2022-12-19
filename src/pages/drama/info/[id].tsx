import React from 'react';
import ViewAsian from '@services/Drama/ViewAsian';
import {NextSeo} from 'next-seo';
import Utility from '@services/Utility';
import Episodes from '@components/Drama/Episodes'
import About from '@components/Drama/About'
import WatchButton from '@components/Drama/Watch'
import {GetServerSideProps} from 'next';
import {IMovieResult} from '@consumet/extensions';

const drama = ({drama}: {
    drama: any
}) => {
    return (
        <>
            <NextSeo
                title={`${drama.title || drama.altTitles[1] || drama.altTitles[0] || '<no name>'} | AniTron Drama`}
                description={Utility.stripHtml(drama.description)}
            />
            <>
                <header className={"flex relative items-end bg-cover bg-center transition px-[3vw] py-[1.5vw]"} style={{
                    backgroundImage: `linear-gradient(0deg, #141414 1%, transparent 99%), url(${drama.cover || drama.image})`,
                    height: 'clamp(20rem, 34vw, 50rem)'
                }}>
                    <div>
                        <h2>{drama.title || drama.altTitles[1] || drama.altTitles[0] || '<no name>'}
                        </h2>
                        {drama.otherNames[0] &&
                            <h3 style={{
                                marginBottom: 'max(1vw, 1rem)',
                                fontWeight: 'normal'
                            }}>({drama.otherNames[0]})</h3>}
                        <div className={"flex items-center mr-[5vw]"}>
                            {drama.episodes.length > 0 &&
                                <WatchButton id={drama.id} epId={drama.episodes.find((ep) => +ep.episode === 1).id}/>
                            }
                        </div>
                    </div>
                </header>
                <main className={"px-[3vw] py-[1.5vw] [&+.separator]:mt-[1.5vw] [&+.separator]:leading-loose"}>
                    <div>
                        <div className={"text-[80%] mb-[1.5vw]"}>
                            {drama.country &&
                                <label className={"text-[#46D369]"}>{drama.country}</label>}
                            {drama.director &&
                                <label className={"ml-4"}>By {drama.director}</label>}
                            {drama.episodes.length &&
                                <label className={"ml-4"}>{drama.episodes.length} episode{drama.episodes.length > 1 ? 's' : ''}</label>}
                        </div>
                        <div className={"flex mb-[1vw]"}>
                            <p>{Utility.stripHtml(Utility.trimInfoParagraph(drama.description))}</p>
                            <section className={"hidden md:flex w-[45vw] ml-[1.5vw]"}><About limitElements={3}
                                                                                             data={drama}/></section>
                        </div>
                    </div>
                    {drama.episodes.length && <Episodes
                        episodes={drama?.episodes}
                        id={drama.id}
                    />}
                    <h3 id='separator'
                        className={"mb-[.5rem]"}>About {drama.title || drama.altTitles[1] || drama.altTitles[0] || drama.altTitles[1] || drama.altTitles[0] || '<no name>'}</h3>
                    <About data={drama} limitElements={null}/>
                </main>
            </>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=59');
    const [drama]: IMovieResult[] = await Promise.all([
        ViewAsian.getMovieInfo((query.id as string).replace('$', '/')),
    ]);

    return {
        props: {
            drama: JSON.parse(JSON.stringify(drama)) || null,
        },
    };
}

export default drama;