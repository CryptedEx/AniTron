import React, {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router';
import SearchIcon from '@mui/icons-material/Search'
import {SearchBarContainer} from '@assets/styles/MainStyles';

const SearchBar = () => {
    const containerRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        function handleClick(event) {
            if (!inputRef.current.value && !containerRef.current.contains(event.target)) disableSearch()
        }

        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    })

    function enableSearch(): void {
        setShow(true)
        setTimeout(() => {
            inputRef.current.focus()
        }, 100)
    }

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') disableSearch();
        }

        document.addEventListener('keydown', handleKeyDown, {capture: true})
        return () => {
            document.removeEventListener('keydown', handleKeyDown, {capture: true})
        }
    })

    useEffect(() => {
        if (show) {
            const timeout = setTimeout(() => {
                disableSearch();
            }, 10000);
            return () => clearTimeout(timeout);
        }
        //eslint-disable-next-line
    }, [show, query]);

    useEffect(() => {
        const handleRoute = (url) => {
            if (url !== router.pathname && router.pathname.match(/\/search\/.*/g)) {
                disableSearch()
            }
        }
        router.events.on('routeChangeComplete', handleRoute)
        return () => router.events.off('routeChangeComplete', handleRoute)
        //eslint-disable-next-line
    }, [router])

    function disableSearch() {
        if (show && inputRef.current) {
            setShow(false)
            inputRef.current.value = ''
        }
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (query) {
                if (router.pathname.match(/\/manga.*/g)) router.push(`/manga/search?q=${query}`)
                else if (router.pathname.match(/\/drama.*/g)) router.push(`/drama/search?q=${query}`)
                else router.push(`/anime/search?q=${query}`)
            }
        }, 1000)

        return () => clearTimeout(delaySearch)
        //eslint-disable-next-line
    }, [query])

    return (
        <SearchBarContainer
            ref={containerRef}
            show={show}
        >
            <button className={"h-full absolute z-[1] bg-none text-white cursor-pointer scale-90 cursor-pointer disabled:cursor-default"} style={{width: 'clamp(1rem, 2vw, 4rem)'}} onClick={enableSearch}>
                <SearchIcon style={{fontSize: 'clamp(2rem, 1.5vw, 3rem)'}}/>
            </button>
            <input className={"box-border w-full h-full text-[85%] bg-black text-white rounded-[0.4rem]"} style={{padding: '0 clamp(1.5rem, 2vw, 4rem)', border: '1px solid #e5e5e5', opacity: show ? 1 : 0, transition: 'opacity 300ms', outline: 'none'}}
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for media'
            />
        </SearchBarContainer>
    )
}

export default SearchBar
