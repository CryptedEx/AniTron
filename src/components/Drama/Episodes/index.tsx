import React, {useState, useRef} from 'react'
import Utility from '@services/Utility'
import {Episode} from '@assets/styles/MainStyles'
import Dropdown from '../../General/Dropdown'
import FoldButton from '../../General/Buttons/Fold';
import {useRouter} from 'next/router';

const Episodes = ({episodes, id}: {
    episodes: any,
    id: string
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
        const pages: number = Math.ceil(episodes.length / 12)

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
                    const limit = folded ? Math.min(4, episodes.length - page * 12) : Math.min(12, episodes.length - page * 12)
                    const maxPageEp = Math.min((page + 1) * 12, episodes.length)
                    let extraNum = 0;
                    if (+episodes[0].episode === 0) extraNum = 1;

                    for (let i = 0; i < limit; i++) {
                        const episode = episodes.slice(page * 12, maxPageEp)[i]
                        elements.push(
                            <Episode className={"sm:flex sm:px-[2rem] sm:py-[3rem]"} key={i}
                                     onClick={() => router.push(`/drama/watch/${id.replace('/', '$')}?epId=${episode.id}&ep=${+episode.episode + extraNum}`)}>
                                <div className={"sm:ml-[2rem] lg:text-[80%] pb-[1rem] sm:pb-[1.3rem] md:pb-[0]"}>
                                    <h4 className={"font-bold font-sans"}>
                                        {(+episode.episode + extraNum) + '. '}
                                        {episode.title}
                                    </h4>
                                    <p className={"text-[#D2D2D2] mt-[1rem]"}>{Utility.trimParagraph(episode.description, 130, '...')}</p>
                                </div>
                            </Episode>
                        )
                    }
                    return elements
                })()}
                {(episodes.length > 4) &&
                    <FoldButton
                        initialValue={!folded}
                        onClick={handleFolding}
                    />
                }
            </div>
        </>
    )
}

export default Episodes;