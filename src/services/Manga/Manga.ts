import {IMangaChapter, IMangaChapterPage, IMangaInfo, IMangaResult, ISearch, META} from '@consumet/extensions';
import axios, {AxiosInstance} from 'axios';
import {MangaParser} from '@consumet/extensions/dist/models';

class Manga {
    private api: AxiosInstance;
    private api2: AxiosInstance;
    private AniList: { provider: MangaParser; search: (query: string, page?: number, perPage?: number) => Promise<ISearch<IMangaResult>>; fetchChapterPages: (chapterId: string, ...args: any) => Promise<IMangaChapterPage[]>; fetchMangaInfo: (id: string, ...args: any) => Promise<IMangaInfo> };
    constructor() {
        this.AniList = new META.Anilist.Manga();
        this.api = axios.create({baseURL: 'https://api.consumet.org'});
        this.api2 = axios.create({baseURL: 'https://anitronapi.onrender.com'});
    }

    async getSearch(query): Promise<ISearch<IMangaResult>> {
        return await this.AniList.search(query).then(async(res) => {
            return res as ISearch<IMangaResult>;
        });
    }

    async getMangaInfo(id): Promise<IMangaInfo> {
        return await this.AniList.fetchMangaInfo(id).then(async(res) => {
            return res as IMangaInfo;
        });
    }

    async getChapters(id): Promise<IMangaChapterPage[]> {
        return await this.AniList.fetchChapterPages(id).then(async(res) => {
            return res as IMangaChapterPage[];
        });
    }
}

export default new Manga;