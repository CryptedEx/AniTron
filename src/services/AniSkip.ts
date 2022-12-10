import axios, {AxiosInstance} from 'axios';
import {getSkip} from '../types/AniSkipTypes';

class AniSkip {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({baseURL: 'https://api.aniskip.com'});
    }

    async getSkip(id: number, ep: number, episodeLength: number): Promise<getSkip> {
        return await this.api(`/v2/skip-times/${id}/${ep}?types=ed&types=mixed-ed&types=mixed-op&types=op&types=recap&episodeLength=${Math.round(episodeLength*60)}`).then(async (res) => {
            return res.data.results;
        });
    }
}

export default new AniSkip;