import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
    return (
        <>
            <div
                className={"bg-fixed bg-no-repeat bg-cover flex flex-col-reverse h-screen top-0 left-0 w-screen bg-[url('/bg.gif')] -z-1 shadow-fill-black"}>
                <div
                    className={"flex flex-col justify-center h-screen w-screen text-left font-bold absolute pr-[10vw] pl-[10vw]"}>
                    <div className={"flex flex-row justify-start items-center w-full flex-wrap pb-4"}>
                        <Image src={require('../assets/logo.svg')} width={100} height={100} unoptimized={true}
                               className={"h-[100] w-[100] mt-[-6.5rem]"} alt={'AniTron'}/>
                        <div className={"text-[5rem]"}>
                            nitron
                        </div>
                    </div>
                    <div>
                        <div className={"text-[2rem] pb-8"}>
                            The <strong className={"text-[#A020f0]"}>best</strong> site to watch anime online
                            for <strong
                            className={"text-[#A020f0]"}>free</strong>
                        </div>
                    </div>
                    <Link href={'/anime'}>
                        <button
                            className={"rounded-[0.4rem] cursor-pointer text-[1.5rem] p-[1rem] text-white bg-[#A020f0] hover:bg-[#c073f1] transition-colors"}>
                            Start Watching
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LandingPage;