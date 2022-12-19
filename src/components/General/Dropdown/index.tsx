import React, {useRef, useEffect, useState} from 'react'

const Dropdown = ({elements, onChange = () => {}}: {
    elements: string[],
    onChange: (value: string) => void
}) => {
    const buttonRef = useRef(null)
    const menuRef = useRef(null)
    const [selected, setSelected] = useState(0)
    const [fold, setFold] = useState(true)

    useEffect(() => {
        function handleClick(event) {
            if (!fold && !buttonRef.current.contains(event.target) &&
                !menuRef.current.contains(event.target)) {
                setFold(true)
            }
        }

        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    })

    function toggleFold(): void {
        setFold(!fold)
    }

    function selectElement(id): void {
        setFold(true)
        setSelected(id)
        onChange(id)
    }

    return (
        <div className={"w-fit relative"}>
            <div className={"text-white cursor-pointer rounded-[0.3rem] bg-[#242424]"} style={{padding: 'min(1vw, 1rem) min(4vw, 6rem)', border: '1px solid #4d4d4d'}}
                ref={buttonRef}
                onClick={toggleFold}
            >
                {elements[selected]}
            </div>
            <div className={"w-[99%] absolute flex-col rounded-[0.3rem] bg-[#242424]"} style={{border: '1px solid #4d4d4d', display: fold ? 'none' : 'flex'}} ref={menuRef}>
                {elements.map((element, key) => (
                    <button className={"text-white bg-none cursor-pointer hover:bg-[#424242]"} style={{padding: 'min(1vw, 1.5rem) 0'}}
                        key={key}
                        type='button'
                        onClick={() => selectElement(key)}
                    >
                        {element}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Dropdown
