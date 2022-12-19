import React from 'react'
import Link from 'next/link';

const About = ({limitElements, data}: {
    limitElements: number,
    data: any
}) => {
    function drawGenres() {
        if (data.genres.length > 0) {
            return (
                <li className={"text-[#777777] list-none"}>
                    {'Genres: '}
                    {(() => {
                        const elements: any[] = []
                        const limit: number = limitElements ?
                            Math.min(limitElements, data.genres.length) :
                            data.genres.length

                        for (let i = 0; i < limit; i++) {
                            elements.push(
                                <Link
                                    key={i}
                                    href={`/tag/${data.genres[i].toLowerCase()}`}
                                >
                                    {`${data.genres[i]}${i < limit - 1 ? ', ' : ''}`}
                                </Link>
                            )
                        }
                        return elements
                    })()}
                </li>
            )
        }
    }

    return (
        <ul className={"text-[75%] leading-loose"}>
            {drawGenres()}
        </ul>
    )
}

export default About;