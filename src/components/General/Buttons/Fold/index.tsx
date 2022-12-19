import React, {useState} from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Fold = ({initialValue, onClick = () => {}}) => {
    const [toggled, setToggled] = useState<boolean>(initialValue)

    function handleClick(): void {
        onClick()
        setToggled(!toggled)
    }

    return (
        <div className={"w-full flex items-center justify-center relative"}>
            <div className={"h-[8%] w-[inherit] bg-[#404040] absolute"}/>
            <button className={"text-white rounded-[50%] bg-[#2a2a2a] cursor-pointer relative hover: bg-[#545454]"} style={{width: 'max(2.5rem, 2.5vw)', height: 'max(2.5rem, 2.5vw)', border: '1px solid #fff', transition: 'background ease 200ms'}} onClick={handleClick}>
                <div className={"flex items-center justify-center"} style={{transition: 'transform ease 200ms', transform: toggled ? 'rotate(180deg)' : 'none'}}>
                    <KeyboardArrowDownIcon style={{fontSize: 'max(2rem, 1.8vw)'}}
                    />
                </div>
            </button>
        </div>
    )
}

export default Fold
