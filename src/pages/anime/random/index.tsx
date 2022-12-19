import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import AniList from '@services/Anime/AniList';
import {GetServerSideProps} from 'next';
import {IAnimeInfo} from '@consumet/extensions';

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
    const [anime]: IAnimeInfo[] = await Promise.all([
        AniList.getRandomAnime()
    ]);
    return {
        props: {
            id: anime.id || null
        }
    }
}

export default Random;