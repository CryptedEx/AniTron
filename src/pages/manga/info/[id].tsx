import React from 'react'
import {GetServerSideProps} from 'next';
import Manga from '@services/Manga/Manga';
import Utility from '@services/Utility';
import ReadButton from '@components/General/Buttons/Read';
import TrailerButton from '@components/General/Buttons/Trailer';
import About from '@components/General/About';
import Chapters from '@components/Manga/Chapters'
import {NextSeo} from 'next-seo';
import {IMangaInfo} from '@consumet/extensions';

const Info = ({manga}: {
    manga: any
}) => {
    return (
        <>
            <NextSeo
                title={`${manga.title.english || manga.title.userPreferred || manga.title.romaji} | AniTron Manga`}
                description={Utility.stripHtml(manga.description)}
                openGraph={{
                    images: [
                        {
                            url: manga.image,
                            type: 'small',
                            alt: `${
                                manga.title.english || manga.title.userPreferred || manga.title.romaji
                            }`,
                        },
                        {
                            url: manga.cover || manga.image,
                            type: 'small',
                            alt: `Cover of ${
                                manga.title.english || manga.title.userPreferred || manga.title.romaji
                            }`,
                        },
                    ],
                }}
            />
            <>
                <header className={"flex relative items-end bg-cover bg-center transition px-[3vw] py-[1.5vw]"} style={{
                    backgroundImage: `linear-gradient(0deg, #141414 1%, transparent 99%), url(${manga.cover || manga.image})`,
                    height: 'clamp(20rem, 34vw, 50rem)'
                }}>
                    <div>
                        <h2>{manga.title.english || manga.title.userPreferred || manga.title.romaji}
                        </h2>
                        {manga.title.native &&
                            <h3 style={{
                                marginBottom: 'max(1vw, 1rem)',
                                fontWeight: 'normal'
                            }}>({manga.title.native})</h3>}
                        <div className={"flex items-center mr-[5vw]"}>
                            {manga.chapters?.length > 0 &&
                                <ReadButton id={manga.id}/>
                            }
                            {manga.trailer && manga.trailer.site === 'youtube' &&
                                <div className={`${manga.chapters?.length ? 'ml-[1rem]' : null}`}>
                                    <TrailerButton id={manga.trailer.id}/>
                                </div>
                            }
                        </div>
                    </div>
                </header>
                <main className={"px-[3vw] py-[1.5vw] [&+.separator]:mt-[1.5vw] [&+.separator]:leading-loose"}>
                    <div>
                        <div className={"text-[80%] mb-[1.5vw]"}>
                            {manga.rating &&
                                <strong className={"text-[#46D369]"}>{manga.rating}% Rating</strong>}
                            {manga.season &&
                                <label className={"ml-4"}>{manga.season}</label>}
                            {manga.releaseDate &&
                                <label className={"ml-4"}>{manga.releaseDate}</label>}
                        </div>
                        <div className={"flex mb-[1vw]"}>
                            <p>{Utility.stripHtml(Utility.trimInfoParagraph(manga.description))}</p>
                            <section className={"hidden md:flex w-[45vw] ml-[1.5vw]"}><About limitElements={3}
                                                                                             data={manga}/></section>
                        </div>
                    </div>
                    {(() => {
                        if (manga.chapters?.length) {
                            return (
                                <Chapters
                                    book={manga}
                                    thumbnail={manga?.cover || manga?.image}
                                />
                            )
                        }
                    })()}
                    <h3 id='separator'
                        className={"mb-[.5rem]"}>About {manga.title.english || manga.title.userPreferred}</h3>
                    <About data={manga} limitElements={null}/>
                </main>
            </>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');
    if (!query.id) return {notFound: true};

    const [manga]: IMangaInfo[] = await Promise.all([Manga.getMangaInfo(query.id as string) || null]);

    return {
        props: {
            manga: JSON.parse(JSON.stringify(manga)) || null
        }
    }
}

export default Info