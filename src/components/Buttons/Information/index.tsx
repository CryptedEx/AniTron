import React from 'react'
import InfoIcon from '@mui/icons-material/Info';

const Information = ({onClick = () => {}}: {
    onClick?: () => void
}) => {
    return (
        <button className={"flex items-center justify-center ml-[1vw] cursor-pointer rounded-[0.3rem] text-white bg-[#4D4D4D] bg-opacity-80 hover:bg-opacity-40 transition"} style={{padding: 'min(1.5vw, 1.5rem) min(3vw, 4rem)', transition: 'background ease 200ms'}} onClick={onClick}>
            <InfoIcon className={"mr-[0.5vw]"} style={{fontSize: 'clamp(1.2rem, 3vw, 2.5rem)'}}/>
            <strong>More Info</strong>
        </button>
    )
}

export default Information;