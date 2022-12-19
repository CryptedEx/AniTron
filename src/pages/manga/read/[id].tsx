import React, {useEffect, useRef, useState} from 'react'
import {GetServerSideProps} from 'next';
import Manga from '@services/Manga/Manga';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {IMangaChapterPage, IMangaInfo} from '@consumet/extensions';
import Image from 'next/image';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Read = ({manga}: {
    manga: any
}) => {
    const [data, setData] = useState<IMangaChapterPage[]>([]);
    const [page, setPage] = useState<number>(1);
    const router = useRouter();
    const imageRef = useRef<HTMLImageElement>();

    const handlePage = (pg) => {
        if (pg > data.length) return;
        if (pg < 1) return;
        setPage(pg);
    }

    //todo fix this

    // useEffect(() => {
    //     const handleClick = (e) => {
    //         e.preventDefault();
    //         if (e.target === imageRef.current) return;
    //         if (e.clientX > window.innerWidth / 2) {
    //             handlePage(page + 1);
    //         }
    //         if (e.clientX < window.innerWidth / 2) {
    //             handlePage(page - 1);
    //         }
    //     }
    //     window.addEventListener('click', handleClick);
    //     //eslint-disable-next-line
    // }, [page])


    useEffect(() => {
        (async () => {
            const data = await Manga.getChapters(manga.chapters.find((chap) => parseInt(chap.id.split('-')[chap.id.split('-').length - 1]) === +router.query.chap).id);
            setData(data);
        })()
    }, [manga.chapters, router.query.chap])

    useEffect(() => {
        const handleArrow = (e) => {
            if (e.key === 'ArrowRight') {
                handlePage(page + 1);
            } else if (e.key === 'ArrowLeft') {
                handlePage(page - 1);
            }
        }
        window.addEventListener('keydown', handleArrow);
        return () => {
            window.removeEventListener('keydown', handleArrow);
        }
    });

    return (
        <>
            <NextSeo
                title={`${manga.title.english || manga.title.userPreferred || manga.title.romaji} | AniTron Manga`}
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
            <div
                className={"flex flex-col items-center justify-center w-[100%] h-[100%] items-center align-center"} style={{marginTop: 'max(3rem, 3vw)'}}>
                <div className={"w-full h-[2vh] bg-[#484747] flex justify-center"}>
                    <div className={"text-white flex mt-1] inline"}>Chapter&nbsp;<div className={"text-[#A020F0]"}>{router.query.chap}</div>&nbsp;&nbsp;&nbsp;&nbsp;Page&nbsp;<div className={"text-[#A020F0]"}>{page}</div></div>
                </div>
                {data.length &&
                    <img src={data.find((src) => +src.page === page).img} alt={'manga-image'}
                           ref={imageRef} width={500} height={500}
                           className={"w-[61.5vh] object-cover"}/>}
                <div className={"w-full h-[2vh] bg-[#484747] flex justify-center"}>
                    <KeyboardDoubleArrowLeftIcon className={"text-[2rem] cursor-pointer mr-[5rem]"} onClick={() => handlePage(page-1)}/>
                    <KeyboardDoubleArrowRightIcon className={"text-[2rem] cursor-pointer ml-[5rem]"} onClick={() => handlePage(page+1)}/>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=45, stale-while-revalidate=59');
    if (!query.id || !query.chap || +query.chap < 1) return {notFound: true};

    const [manga]: IMangaInfo[] = await Promise.all([
        Manga.getMangaInfo(query.id as string)
    ])

    if (manga.chapters.length < +query.chap) return {notFound: true};

    return {
        props: {
            manga: JSON.parse(JSON.stringify(manga)) || null
        }
    }
}

export default Read