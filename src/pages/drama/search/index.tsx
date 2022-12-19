import React from 'react'
import ViewAsian from '@services/Drama/ViewAsian'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {GetServerSideProps} from 'next';
import {IMovieResult, ISearch} from "@consumet/extensions";

const Search = ({dramas}: {
    dramas: any
}) => {
    const router = useRouter();

    return (
        <div className={"inline-block p-[3vw]"} style={{marginTop: 'clamp(3rem, 2vw, 5rem)'}}>
            {dramas?.map((drama, key) => (
                <div
                    className={"inline-block w-[30vw] h-[44vw] bg-none xl: w-[calc(30*.6vw)] xl: h-[calc(44*.6vw)]"}
                    key={key}>
                    <button
                        className={"w-[inherit] h-[inherit] cursor-pointer transition scale-90 hover:scale-100"}
                        onClick={() => router.push(`/drama/info/${drama.id.replace('/', '$')}`)}>
                        <Image
                            className={"w-full h-full object-cover"}
                            quality={100}
                            fill={true}
                            unoptimized={true}
                            src={drama.image}
                            alt='drama-poster'
                        />
                        <div
                            className={"transition opacity-[0] hover:opacity-[1] text-center justify-end p-[0.5rem] md:p-[1rem] color-white flex flex-col absolute top-[0] left-[0] w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.9)]"}>
                            <div className={"text-center mb-[1rem]"}>
                                <p className={"text-white no-underline font-bold text-[1rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.5rem] xl:text-[1.7rem] 2xl:text-[2rem] mb-[0.5rem] block"}>{drama.title || '<no name>'}</p>
                            </div>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');
    if (!query?.q) return {notFound: true}
    const [dramas]: ISearch<IMovieResult>[] = await Promise.all([
        ViewAsian.getSearch(query.q as string)
    ]);

    return {
        props: {
            dramas: JSON.parse(JSON.stringify(dramas.results)) || null
        }
    }
}

export default Search
