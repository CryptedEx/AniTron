import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {useWindowSize} from '@services/Functions';
import {useRouter} from 'next/router';
const Search = dynamic(() => import('../SearchBar'), {
    ssr: false,
});
const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'), {
    ssr: false,
});

import UserButton from '../Buttons/User';
import logo from '@assets/logo.svg';
import Image from 'next/image';

const Navbar = () => {
    const menuRef = useRef(null)
    const [showMenu, setShowMenu] = useState(false)
    const size = useWindowSize();
    const router = useRouter();

    useEffect(() => {
        window.addEventListener('mousedown', handleClick)

        return () => {
            window.removeEventListener('mousedown', handleClick)
        }
    })

    function handleClick(event) {
        if (showMenu && !menuRef.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    function drawMenuOptions() {
        return (
            <>
                <Link className={"no-underline"} href={`/${router.pathname.split('/')[1]}`} onClick={() => setShowMenu(false)}>Home</Link>
                {router.pathname.match(/\/anime.*/g) && <>
                    <Link className={"no-underline mt-[1rem] sm:ml-[1rem] sm:mt-[0]"} href='/anime/random'
                          onClick={() => setShowMenu(false)}>Random</Link>
                    <Link className={"no-underline mt-[1rem] sm:ml-[1rem] sm:mt-[0]"} href='/anime/advanced' onClick={() => setShowMenu(false)}>Advanced
                        Search</Link>
                </>}
            </>
        )
    }

    // @ts-ignore
    return (
        <>
            <header className={"w-[100vw] z-[5] fixed flex items-center justify-between box-border"} style={{
                height: 'max(3rem, 3.5vw)',
                padding: '0 3.5vw',
                background: size.width < 640 ? '#000' : 'linear-gradient(180deg, #141414, transparent), rgba(14, 14, 14, 0)',
                transition: 'background ease 200ms'
            }}>
                <main className={"flex items-center"}>
                    <div ref={menuRef}>
                        <button className={"text-white cursor-pointer mr-[2vw] bg-none sm:hidden"}
                                onClick={() => setShowMenu(!showMenu)}>
                            <MenuIcon style={{fontSize: 'max(2rem, 2vw)'}}/>
                        </button>
                        <div className={"w-[15rem] height-fit absolute bg-black"} style={{
                            left: '0',
                            borderTop: '5px solid #A020F0',
                            transform: !showMenu ? 'translateX(-100%)' : 'translateX(0)',
                            transition: 'transform ease 300ms',
                        }}>
                            <section id={'sel'} className={"flex flex-col"} style={{padding: '1rem 1rem'}}>
                                <Link className={"no-underline"} href='/'
                                      onClick={() => setShowMenu(false)}>Account</Link>
                                <Link className={"no-underline mt-[1rem] sm:ml-[1rem] sm:mt-[0]"} href='/' onClick={() => setShowMenu(false)}>Sign
                                    out</Link>
                            </section>
                            <section style={{borderTop: '1px solid #464646', padding: '1rem 1rem'}} id={'sel'}
                                     className={"flex flex-col"}>
                                {drawMenuOptions()}
                            </section>
                        </div>
                    </div>
                    <Link style={{height: 'max(2rem, 2vw)'}} href={'/'}>
                        <Image
                            width={size.width < 640 ? 100 : 200}
                            height={size.width < 640 ? 100 : 200}
                            className={"max-h-full"}
                            alt='logo'
                            //@ts-ignore
                            src={logo}
                            style={{width: 'max(2rem, 2vw)', height: 'max(2rem, 2vw)'}}
                        />
                    </Link>
                    <div className={"text-white ml-[2vw] text-[75%] hidden sm:flex"}>
                        {drawMenuOptions()}
                    </div>
                </main>
                <div className={"flex justify-end items-center"}>
                    <Search/>
                    <div className={"ml-[0.5vw] flex items-center justify-between hidden sm:flex"}
                         style={{width: 'max(10rem, 7.5vw)'}}>
                        <UserButton/>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar;
