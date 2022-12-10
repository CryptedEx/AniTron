import React, {useEffect, useState} from 'react'
import AniList from '@services/AniList'
import {useRouter} from 'next/router'
import {SelectStyles} from '@assets/styles/MainStyles'
import {sortOptions, genreOptions, seasonOptions, statusOptions, formatOptions} from '@options/advancedOptions';
import Select from 'react-select'
import Image from 'next/image';
import {GetServerSideProps} from 'next'

const AdvancedSearch = ({anime}: {
    anime: any
}) => {
    const [query, setQuery] = useState('');
    const [id, setId] = useState(null);
    const [year, setYear] = useState(null);
    const router = useRouter();

    function handleSeason(data): void {
        if (data.value) {
            router.query.season = data.value
            router.push(router)
        } else {
            delete router.query.season
            router.push(router)
        }
    }

    function handleFormat(data): void {
        if (data.value) {
            router.query.format = data.value
            router.push(router)
        } else {
            delete router.query.format
            router.push(router)
        }
    }

    function handleStatus(data): void {
        if (data.value) {
            router.query.status = data.value
            router.push(router)
        } else {
            delete router.query.status
            router.push(router)
        }
    }

    function handleSort(sort): void {
        if (sort.length) {
            let values = [];
            sort.map((value) => {
                values.push(value.value)
            });
            router.query.sortBy = values.join('$')
            router.push(router)
        } else {
            delete router.query.sortBy
            router.push(router)
        }
    }

    function handleGenres(genres): void {
        if (genres.length) {
            let values = [];
            genres.map((value) => {
                values.push(value.value)
            });
            router.query.genres = values.join('$')
            router.push(router)
        } else {
            delete router.query.genres
            router.push(router)
        }
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (query) {
                router.query.q = query
                router.push(router)
            } else {
                delete router.query.q
                router.push(router)
            }
        }, 1000)

        return () => clearTimeout(delaySearch)
        //eslint-disable-next-line
    }, [query])

    useEffect(() => {
        const delayId = setTimeout(() => {
            if (parseInt(id)) {
                router.query.id = id
                router.push(router)
            } else {
                delete router.query.id
                router.push(router)
            }
        }, 1000)

        return () => clearTimeout(delayId)
        //eslint-disable-next-line
    }, [id])

    useEffect(() => {
        const delayYear = setTimeout(() => {
            if (parseInt(year)) {
                router.query.year = year
                router.push(router)
            } else {
                delete router.query.year
                router.push(router)
            }
        }, 1000)

        return () => clearTimeout(delayYear)
        //eslint-disable-next-line
    }, [year])

    return (<div className={"inline-block mt-[clamp(3rem,2vw,5rem)] p-[3.5vw]"}>
        <div className={"flex flex-col flex-wrap 768px:flex-row 768px:flex-nowrap"}>
            <div className={"flex flex-row gap-[1rem] flex-wrap 768px:flex-col 768px:flex-nowrap"}>
                <input
                    className={"w-[20rem] h-full text-[85%] p-.5rem-clamp(1.5rem,2vw,4rem) ml-[1vw] text-center box-border bg-black color-white rounded-[0.4rem] border-solid border-[1px] border-color[#e5e5e5]"}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={router.query.q as string ? router.query.q as string : 'Search'}
                />
                <input
                    className={"w-[11rem] h-full text-[85%] p-.5rem-clamp(1.5rem,2vw,4rem) ml-[1vw] text-center box-border bg-black color-white rounded-[0.4rem] border-solid border-[1px] border-color[#e5e5e5]"}
                    onChange={(e) => setId(e.target.value)}
                    placeholder={router.query.id as string ? router.query.id as string : 'Id'}
                />
                <input
                    className={"w-[11rem] h-full text-[85%] p-.5rem-clamp(1.5rem,2vw,4rem) ml-[1vw] text-center box-border bg-black color-white rounded-[0.4rem] border-solid border-[1px] border-color[#e5e5e5]"}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder={router.query.year as string ? router.query.year as string : 'Year'}
                />
                <Select
                    styles={SelectStyles}
                    placeholder={'Season'}
                    defaultValue={router.query.season ? seasonOptions.find((option) => option.value === router.query.season) : null}
                    onChange={handleSeason}
                    options={seasonOptions}/>
                <Select
                    styles={SelectStyles}
                    placeholder={'Status'}
                    defaultValue={router.query.status ? statusOptions.find((option) => option.value === router.query.status) : null}
                    onChange={handleStatus}
                    options={statusOptions}/>
                <Select
                    styles={SelectStyles}
                    placeholder={'Format'}
                    defaultValue={router.query.format ? formatOptions.find((option) => option.value === router.query.format) : null}
                    onChange={handleFormat}
                    options={formatOptions}/>
                <Select
                    styles={SelectStyles}
                    placeholder={'Genres'}
                    defaultValue={router.query.genres ? (router.query.genres as string).split('$').map((value) => {
                        return genreOptions.find((option) => option.value === value)
                    }) : null}
                    onChange={handleGenres}
                    isMulti={true}
                    options={genreOptions}/>
                <Select
                    styles={SelectStyles}
                    placeholder={'Sort By'}
                    defaultValue={router.query.sortBy ? (router.query.sortBy as string).split('$').map((value) => {
                        return sortOptions.find((option) => option.value === value)
                    }) : null}
                    onChange={handleSort}
                    isMulti={true}
                    options={sortOptions}/>
            </div>
        </div>
        {anime?.map((recommendation, key) => (
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
    </div>)
}

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');
    const [anime]: any = await Promise.all([AniList.getAdvancedSearch(query.q ? query.q as string : null, query.type ? query.type as string : null, query.page ? query.page as unknown as number : null, query.season ? query.season as string : null, query.format ? query.format as string : null, query.sortBy ? (query.sortBy as string).split('$') : null, query.genres ? (query.genres as string).split('$') : null, query.id ? query.id as unknown as number : null, query.year ? query.year as unknown as number : null, query.status ? query.status as string : null)]);

    return {
        props: {
            anime: anime || null,
        }
    }
}

export default AdvancedSearch
