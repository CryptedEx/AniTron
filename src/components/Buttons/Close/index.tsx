import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Close = ({onClick = () => {}}: {
    onClick?: () => void
}) => {
    return (
        <button className={"absolute top-[1vw] right-[1vw] cursor-pointer flex content-center items-center rounded-[50%] text-white bg-[#181818]"} style={{padding: '0.5rem'}} onClick={onClick}>
            <CloseIcon style={{fontSize: 'clamp(1.5rem, 2vw, 2.5rem)'}}/>
        </button>
    )
}

export default Close
