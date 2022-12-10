import axios, {AxiosInstance} from 'axios';
import {
    getSearch,
    getAnimeInfo,
    getAdvancedSearch,
    getStreamingUrls,
} from '../types/AniListTypes';

class AniList {
    private api: AxiosInstance;
    private api2: AxiosInstance;

    constructor() {
        this.api = axios.create({baseURL: 'https://api.consumet.org'});
        this.api2 = axios.create({baseURL: 'https://anitronapi.cyclic.app'});
    }

    async getSearch(query: string): Promise<getSearch> {
        return await this.api(`/meta/anilist/${query}`).then(async (res) => {
            return res.data.results as getSearch;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/${query}`).then(async (res) => {
                    return res.data.results as getSearch;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getAnimeInfo(id: number, provider: string): Promise<getAnimeInfo> {
        return await this.api(`/meta/anilist/info/${id}?provider=${provider}`).then(async (res) => {
            return res.data as getAnimeInfo;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/info/${id}?provider=${provider}`).then(async (res) => {
                    return res.data as getAnimeInfo;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getAdvancedSearch(query: string, type: string, page: number, season: string, format: string, sort: string[], genres: string[], id: number, year: number, status: string): Promise<getAdvancedSearch> {
        // `/meta/anilist/advanced-search${query ? `?query=${query}` : ''}${type && query ? `&type=${type}` : type ? `?type=${type}` : ''}${page && (type || query) ? `&page=${page}` : page ? `?page=${page}` : ''}${season && (page || type || query) ? `&season=${season}` : season ? `?season=${season}` : ''}${format && (season || page || type || query) ? `&format=${format}` : format ? `?format=${format}` : ''}${sort && (format || season || page || type || query) ? `&sort=[${sort}]` : sort ? `?sort=[${sort}]` : ''}${genres && (sort || format || season || page || type || query) ? `&genres=[${genres}]` : genres ? `?genres=[${genres}]` : ''}${id && (genres || sort || format || season || page || type || query) ? `&id=${id}` : id ? `?id=${id}` : ''}${year && (id || genres || sort || format || season || page || type || query) ? `&year=${year}` : year ? `?year=${year}` : ''}${status && (year || id || genres || sort || format || season || page || type || query) ? `&status=${status}` : status ? `?status=${status}` : ''}`
        return await this.api(`/meta/anilist/advanced-search?type=ANIME${query ? `&query=${query}` : ''}${page ? `&page=${page}` : ''}${season ? `&season=${season}` : ''}${format ? `&format=${format}` : ''}${sort ? `&sort=[${sort}]` : ''}${genres ? `&genres=[${genres}]` : ''}${id ? `&id=${id}` : ''}${year ? `&year=${year}` : ''}${status ? `&status=${status}` : ''}`).then(async (res) => {
            return res.data.results as getAdvancedSearch;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/advanced-search?type=ANIME${query ? `&query=${query}` : ''}${page ? `&page=${page}` : ''}${season ? `&season=${season}` : ''}${format ? `&format=${format}` : ''}${sort ? `&sort=[${sort}]` : ''}${genres ? `&genres=[${genres}]` : ''}${id ? `&id=${id}` : ''}${year ? `&year=${year}` : ''}${status ? `&status=${status}` : ''}`).then(async (res) => {
                    return res.data.results as getAdvancedSearch;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getAiringSchedule() {
        return await this.api(`/meta/anilist/airing-schedule`).then(async (res) => {
            return res.data.results;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/airing-schedule`).then(async (res) => {
                    return res.data.results;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getRandomAnime() {
        return await this.api(`/meta/anilist/random-anime`).then(async (res) => {
            return res.data.id;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/random-anime`).then(async (res) => {
                    return res.data.id;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getTrendingAnime() {
        return await this.api(`/meta/anilist/trending?perPage=30`).then(async (res) => {
            return res.data.results;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/trending?perPage=30`).then(async (res) => {
                    return res.data.results;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getPopularAnime() {
        return await this.api(`/meta/anilist/popular?perPage=30`).then(async (res) => {
            return res.data.results;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/popular?perPage=30`).then(async (res) => {
                    return res.data.results;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }

    async getStreamingUrls(id, provider): Promise<getStreamingUrls> {
        return await this.api(`/meta/anilist/watch/${id}?provider=${provider}`).then(async (res) => {
            return res.data as getStreamingUrls;
        }).catch(async (err) => {
            if (+err.response.status === 404) {
                return await this.api2(`/meta/anilist/watch/${id}?provider=${provider}`).then(async (res) => {
                    return res.data as getStreamingUrls;
                }).catch((err) => {
                    if (+err.response.status === 404) {
                        return null;
                    }
                });
            }
        });
    }
}

export default new AniList;