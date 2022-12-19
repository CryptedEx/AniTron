import React from 'react'

const About = ({limitElements, data}: {
    limitElements: number,
    data: any
}) => {
    function drawGenres() {
        if (data.genre.length > 0) {
            return (
                <li className={"text-[#777777] list-none"}>
                    {'Genres: '}
                    {(() => {
                        const elements: any[] = []
                        const limit: number = limitElements ?
                            Math.min(limitElements, data.genre.length) :
                            data.genre.length

                        for (let i = 0; i < limit; i++) {
                            elements.push(
                                <p key={i} className={"text-white inline"}>
                                    {`${data.genre[i]}${i < limit - 1 ? ', ' : ''}`}
                                </p>
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