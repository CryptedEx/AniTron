import React, {useState, useRef} from 'react'
import Utility from '@services/Utility'
import {Episode} from '@assets/styles/MainStyles'
import Dropdown from '../Dropdown'
import FoldButton from '../Buttons/Fold';
import {useRouter} from 'next/router';
import Image from 'next/image';

const Episodes = ({anime, thumbnail}: {
    anime: any,
    thumbnail: any
}) => {
    const [folded, setFolded] = useState(true)
    const [page, setPage] = useState(0)
    const listRef = useRef<HTMLDivElement>();
    const router = useRouter();

    function handleFolding(): void {
        setFolded(!folded)
    }

    function drawDropdown() {
        const elements: Array<any> = []
        const pages: number = Math.ceil(anime.totalEpisodes / 24)

        if (pages > 1) {
            for (let i = 0; i < pages; i++) {
                elements.push(`Page ${i + 1}`)
            }

            return (
                <Dropdown
                    elements={elements}
                    onChange={(e: any) => {
                        setPage(e)
                        listRef.current.scrollTo(0, 0)
                    }}
                />
            )
        }
    }

    return (
        <>
            <div className={"cursor-pointer"}>
                <div className={"flex items-center justify-between"}>
                    <h3 className={"mt-[1.5vw] leading-loose"} style={{marginBottom: 'max(1vw, 1rem)'}}>Episodes</h3>
                    {drawDropdown()}
                </div>
                <div ref={listRef}/>
                {(() => {
                    const elements = []
                    const limit = folded ? Math.min(6, anime.episodes.length - page * 24) : Math.min(24, anime.episodes.length - page * 24)
                    const maxPageEp = Math.min((page + 1) * 24, anime.totalEpisodes)
                    let extraNum = 0;
                    if (anime.episodes[0].number === 0) extraNum = 1;

                    for (let i = 0; i < limit; i++) {
                        const episode = anime.episodes.slice(page * 24, maxPageEp)[i]
                        elements.push(
                            <Episode className={"sm:flex sm:px-[2rem] sm:py-[3rem]"} key={i}
                                     onClick={() => router.push(`/anime/watch/${anime.id}?ep=${episode.number}`)}>
                                <div className={"flex justify-center bg-[#141414] mt-[1rem] sm:mt-[1.3rem] md:mt-[0] "}>
                                    <Image
                                        alt='thumbnail'
                                        src={episode.image || thumbnail}
                                        width={100}
                                        height={100}
                                        sizes={'100vw'}
                                        className={"w-[14.5rem] h-[8.1rem] rounded-[0.5rem] object-cover"}
                                    />
                                </div>
                                <div className={"sm:ml-[2rem] lg:text-[80%] pb-[1rem] sm:pb-[1.3rem] md:pb-[0]"}>
                                    <h4 className={"font-bold font-sans"}>
                                        {(episode.number + extraNum) + '. '}
                                        {episode.title}
                                    </h4>
                                    <p className={"text-[#D2D2D2] mt-[1rem]"}>{Utility.trimParagraph(episode.description, 130, '...')}</p>
                                </div>
                            </Episode>
                        )
                    }
                    return elements
                })()}
                {(anime.episodes.length > 6) &&
                    <FoldButton
                        initialValue={!folded}
                        onClick={handleFolding}
                    />
                }
            </div>
        </>
    )
}

export default Episodes
