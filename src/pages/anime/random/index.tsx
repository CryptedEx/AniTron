import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import AniList from '@services/AniList';
import {GetServerSideProps} from 'next';

const Random = ({id}: {
    id: number
}) => {
    const router = useRouter();
    useEffect(() => {
        if (!id) router.push('/404');
        else router.push(`/anime/info/${id}`);
        //eslint-disable-next-line
    }, [id]);
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    const [id]: any = await Promise.all([
        AniList.getRandomAnime()
    ]);

    return {
        props: {
            id: id || null
        }
    }
}

export default Random;