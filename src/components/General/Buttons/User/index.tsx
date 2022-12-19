import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Image from 'next/image';

const User = () => {
    return (
        <div className={"flex cursor-pointer"}>
            <button className={"text-white cursor-pointer bg-none"} style={{width: 'max(2rem, 1.25vw)'}}>
                <Image width={200} height={200} className={"max-w-full object-cover rounded-[0.3rem]"}
                       src={'/userIcon.png'} alt='userIcon' unoptimized={true}/>
            </button>
            <ArrowDropDownIcon className={"ml-[0.25vw]"} style={{fontSize: 'max(2rem, 1.3vw)'}}/>
        </div>
    )
}

export default User
