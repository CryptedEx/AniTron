import React from 'react'
import {useRouter} from 'next/router'

const Trailer = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div className={"w-[95%] h-[95%] flex justify-center align-center aspect-video"}>
            <iframe title='trailer'
                    className={"w-[inherit] h-[inherit]"}
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
            />
        </div>
    )
}

export default Trailer;
