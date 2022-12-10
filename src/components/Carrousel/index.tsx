import React, {useEffect, useRef, useState} from 'react'
import {CarrouselContainer, CarrouselButton} from '@assets/styles/MainStyles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Card from '../Card'
import {useRouter} from 'next/router';
import {useWindowSize} from '@services/Functions';

const Carrousel = ({title, animes}) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [leftButton, setLeftButton] = useState<boolean>()
    const [rightButton, setRightButton] = useState<boolean>()
    const size = useWindowSize()
    const router = useRouter();

    function scrollRow(toRight = true) {
        const width = size.width
        const scrollWidth = rowRef.current?.scrollWidth
        const count = scrollWidth / width
        const offset = width * 0.04 * 2
        const scroll = scrollWidth / count - offset

        rowRef.current?.scrollBy(toRight ? scroll : -scroll, 0)

        if (toRight) {
            if (!leftButton) {
                setLeftButton(true)
            }

            if ((rowRef.current?.scrollLeft + scroll + rowRef.current?.clientWidth)
                >= scrollWidth) {
                setRightButton(false)
            }
        } else {
            if (!rightButton) {
                setRightButton(true)
            }

            if (rowRef.current?.scrollLeft - scroll <= 0) {
                setLeftButton(false)
            }
        }
    }

    useEffect(() => {
        if (rowRef.current?.scrollWidth > size.width) {
            setRightButton(true)
        }
    }, [size])

    return (
        <>
            <h3 className={"ml-[3.5vw]"}>{title}</h3>
            <CarrouselContainer>
                {leftButton && <CarrouselButton
                    type='button'
                    //@ts-ignore
                    position='left'
                    onClick={() => scrollRow(false)}
                >
                    <ChevronLeftIcon style={{fontSize: '3vw'}}/>
                </CarrouselButton>}
                {rightButton && <CarrouselButton
                    type='button'
                    //@ts-ignore
                    position='right'
                    onClick={() => scrollRow()}
                >
                    <ChevronRightIcon style={{fontSize: '3vw'}}/>
                </CarrouselButton>}
                <div className={"scrollbar-hide"} style={{overflow: 'scroll hidden', scrollBehavior: 'smooth'}} ref={rowRef}>
                    <div className={"w-fit flex"} style={{padding: '1.25vw 3.5vw'}}>
                        {animes?.map((anime, key) => (
                            <Card
                                key={key}
                                anime={anime}
                                onClick={() => router.push(`/anime/info/${anime.id}`)}
                            />
                        ))}
                    </div>
                </div>
            </CarrouselContainer>
        </>
    )
}

export default Carrousel
