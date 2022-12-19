import {ANIME, IAnimeEpisode, IAnimeInfo, IAnimeResult, ISearch, ISource, META} from '@consumet/extensions';
import Anilist from '@consumet/extensions/dist/providers/meta/anilist';
import axios, {AxiosInstance} from 'axios';

class AniList {
    private api: AxiosInstance;
    private AniList: Anilist;
    private AniListCrunchyroll: Anilist;
    private AniListZoro: Anilist;

    constructor() {
        this.api = axios.create({baseURL: 'https://api.consumet.org'});
        this.AniList = new META.Anilist();
        this.AniListCrunchyroll = new META.Anilist(new ANIME.Crunchyroll());
        this.AniListZoro = new META.Anilist(new ANIME.Zoro());
    }

    async getSearch(query) {
        return await this.AniList.search(query).then(async (res) => {
            return res as ISearch<IAnimeResult>;
        });
    }

    //todo implement getAiringSchedule

    async getAiringSchedule(): Promise<ISearch<IAnimeResult>> {
        return await this.AniList.fetchAiringSchedule().then(async (res) => {
            return res as ISearch<IAnimeResult>
        })
    }

    async getRandomAnime(): Promise<IAnimeInfo> {
        return await this.AniList.fetchRandomAnime().then(async (res) => {
            return res as IAnimeInfo;
        })
    }

    async getTrendingAnime(): Promise<ISearch<IAnimeResult>> {
        return await this.AniList.fetchTrendingAnime(undefined, 25).then(async (res) => {
            return res as ISearch<IAnimeResult>;
        })
    }


    async getPopularAnime(): Promise<ISearch<IAnimeResult>> {
        return await this.AniList.fetchPopularAnime(undefined, 25).then(async (res) => {
            return res as ISearch<IAnimeResult>;
        })
    }

    async getAnimeInfo(id: string): Promise<IAnimeInfo> {
        return await this.AniList.fetchAnilistInfoById(id).then(async (res) => {
            return res as IAnimeInfo;
        })
    }

    //todo fix advanced search
    async getAdvancedSearch(query: string, type: string, page: number, season: string, format: string, sort: string[], genres: string[], id: number, year: number, status: string): Promise<ISearch<IAnimeResult>> {
        return await this.AniList.advancedSearch(query, 'ANIME', page, 20, format, sort, genres, id, year, status, season).then(async (res) => {
            return res as ISearch<IAnimeResult>;
        })
    }

    async getAnimeEpisodes(id: string, provider: string): Promise<IAnimeEpisode[]> {
        switch (provider) {
            case 'gogoanime':
                return await this.AniList.fetchEpisodesListById(id).then(async (res) => {
                    return res as IAnimeEpisode[];
                });
            case 'crunchyroll':
                return await this.AniListCrunchyroll.fetchEpisodesListById(id).then(async (res) => {
                    return res as IAnimeEpisode[];
                });
            case 'zoro':
                return await this.AniListZoro.fetchEpisodesListById(id).then(async (res) => {
                    return res as IAnimeEpisode[];
                });
        }
    }

    async getAnimeInfoAndEpisodes(id: string, provider: string): Promise<IAnimeInfo> {
        switch (provider) {
            case 'gogoanime':
                return await this.AniList.fetchAnimeInfo(id).then(async (res) => {
                    return res as IAnimeInfo;
                });
            case 'crunchyroll':
                return await this.AniListCrunchyroll.fetchAnimeInfo(id).then(async (res) => {
                    return res as IAnimeInfo;
                });
            case 'zoro':
                return await this.AniListZoro.fetchAnimeInfo(id).then(async (res) => {
                    return res as IAnimeInfo;
                });
        }
    }

    //todo change getStreamingUrls to consumet.ts
    async getStreamingUrls(id, provider): Promise<ISource> {
        switch (provider) {
            case 'gogoanime':
                return await this.api(`/meta/anilist/watch/${id}`).then(async (res) => {
                    return res.data as ISource;
                });
            case 'crunchyroll':
                return await this.api(`/meta/anilist/watch/${id}?provider=crunchyroll`).then(async (res) => {
                    return res.data as ISource;
                });
            case 'zoro':
                return await this.api(`/meta/anilist/watch/${id}?provider=zoro`).then(async (res) => {
                    return res.data as ISource;
                });
        }
    }
}

export default new AniList;