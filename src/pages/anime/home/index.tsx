import React from 'react';
import AniList from '@services/AniList';
import dynamic from 'next/dynamic';
import {GetServerSideProps} from 'next';

const Carrousel = dynamic(() => import('@components/Carrousel'), {
    ssr: false,
});

const Featured = dynamic(() => import('@components/Featured'), {
    ssr: false,
});

const Home = ({featured, rows}: {
    featured: any,
    rows: any
}) => {
    return (
        <>
            {featured && rows && (
                <>
                    <Featured animes={featured}/>
                    <div className={"sm: min-h-640: m-[-12rem 0]"}>
                        {rows?.map((row, index) => (
                            <div className={"[&+&]: mt-[1rem]"} key={index}>
                                <Carrousel title={row.title} animes={row.animes}/>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className={"flex p-[1rem] text-center flex-col items-center color-[#d0d0d0] bg-[#212121] mt-[5rem]"}>
                <br></br>
                <p>AniTron does not store any data on it&apos;s servers. We are not affiliated in any way towards the
                    producers of any series. We consume data from 3rd parties</p>
                <p className={"text-[#A020F0] mt-[1rem]"}>&#169; The AniTron Developers 2022-{new Date().getFullYear() + 1}</p>
                <br></br>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=59');
    const [trending, popular]: any = await Promise.all([
        AniList.getTrendingAnime(),
        AniList.getPopularAnime()
    ])
    const featured: any = Object.values(trending).slice(0, 15);
    const rows: Array<object> = [
        // {
        //     title: 'Continue Watching',
        //     animes: '[todo]'
        // },
        {
            title: 'Trending',
            animes: trending
        },
        {
            title: 'Popular',
            animes: popular
        }
    ]
    return {
        props: {
            featured: featured || null,
            rows: rows || null
        }
    }
}

export default Home
