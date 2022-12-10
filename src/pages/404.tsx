import React from 'react';
import Link from 'next/link';
import {NextSeo} from 'next-seo';
import Image from 'next/image';
import {useWindowSize} from '@services/Functions'

const PageNotFound = () => {
    const size = useWindowSize();
    return (
        <>
            <NextSeo
                title={`404 | AniTron`}
                description={'Page Not Found'}
            />
            <div className={"flex flex-row items-center font-sans"}>
                <div className={"flex justify-center flex-col w-[50vw] h-[100vh] text-left font-bold pl-[10vw]"}>
                    <div className={"text-[#A020F0] text-[6rem] sm:text-[10rem] md:text-[12rem] lg:text-[13rem]"}>404</div>
                    <div className={"text-white mt-[1rem] text-[2rem] sm:text-[2.5rem] md:text-[2.7rem] lg:text-[3.2rem]"}>Page Not Found</div>
                    <div className={"text-white mt-[1rem] text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[2.3rem]"}>Dont know where you are? I dont know either.</div>
                    <Link className={"mt-[2rem]"} href={'/anime/home'}>
                        <button
                            className={"rounded-[0.4rem] cursor-pointer text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[2rem] p-[1rem] px-[2rem] text-white bg-[#A020f0] hover:bg-[#c073f1] transition-colors"}>
                            Go back
                        </button>
                    </Link>
                </div>
                <div className={"overflow-hidden items-center ml-[10rem]"}>
                    <Image src={'/404.svg'} alt={'404'} width={250} height={500} unoptimized={true} style={{
                        width: size.width / 2.5,
                        height: size.height / 2.5,
                    }}/>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;