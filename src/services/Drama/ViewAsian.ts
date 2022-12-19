import {IMovieResult, ISearch, ISource, MOVIES} from '@consumet/extensions'
import viewAsian from '@consumet/extensions/dist/providers/movies/viewAsian'

class ViewAsian {
    private ViewAsian: viewAsian;
    constructor() {
        this.ViewAsian = new MOVIES.ViewAsian();
    }

    async getSearch(query: string): Promise<ISearch<IMovieResult>> {
        return await this.ViewAsian.search(query).then(async (res) => {
            return res as ISearch<IMovieResult>;
        });
    }

    async getMovieInfo(id: string): Promise<IMovieResult> {
        return await this.ViewAsian.fetchMediaInfo(id).then(async (res) => {
            return res as IMovieResult;
        });
    }

    async getStreamingUrls(id: string): Promise<ISource> {
        return await this.ViewAsian.fetchEpisodeSources(id).then(async (res) => {
            return res as ISource;
        });
    }
}

export default new ViewAsian;