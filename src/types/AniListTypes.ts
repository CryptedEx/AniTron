//return types

export type getSearch = {
    currentPage?: number,
    hasNextPage?: boolean,
    results?: [
        {
            id?: number,
            malId?: number,
            title?: {
                romaji?: string,
                english?: string,
                native?: string,
                userPreferred?: string
            }
            status?: string,
            image?: string,
            cover?: string,
            popularity?: number,
            description?: string,
            rating?: number,
            genres?: string[],
            color?: string,
            totalEpisodes?: number,
            type?: string,
            releaseDate?: number,
        }
    ]
}

export type getAnimeInfo = {
    id?: number,
    malId?: number,
    title?: {
        romaji?: string,
        english?: string,
        native?: string,
    }
    synonyms?: string[],
    isLicensed?: boolean,
    isAdult?: boolean,
    countryOfOrigin?: string,
    trailer?: {
        id?: string,
        site?: string,
        thumbnail?: string,
    }
    image?: string,
    popularity?: number,
    color?: string,
    description?: string,
    status?: string,
    releaseDate?: number,
    startDate?: {
        year?: number,
        month?: number,
        day?: number,
    }
    endDate?: {
        year?: number,
        month?: number,
        day?: number,
    }
    totalEpisodes?: number,
    rating?: number,
    duration?: number,
    genres?: string[],
    season?: string,
    studios?: string[],
    subOrDub?: string,
    hasSub?: boolean,
    hasDub?: boolean,
    type?: string,
    recommendations?: [
        {
            id?: number,
            malId?: number,
            title?: {
                romaji?: string,
                english?: string,
                native?: string,
                userPreferred?: string
            }
            status?: string,
            episodes?: number,
            image?: string,
            cover?: string,
            rating?: number,
            type?: string,
        }
    ]
    characters?: [
        {
            id?: number,
            role?: string,
            name?: {
                first?: string,
                last?: string,
                full?: string,
                native?: string,
                userPreferred?: string,
            }
            image?: string,
            voiceActors?: [
                {
                    id?: number,
                    language?: string,
                    name?: {
                        first?: string,
                        last?: string,
                        full?: string,
                        native?: string,
                        userPreferred?: string,
                    }
                    image?: string,
                }
            ]
        }
    ]
    relations?: [
        {
            id?: number,
            malId?: number,
            relationType?: string,
            title?: {
                romaji?: string,
                english?: string,
                native?: string,
                userPreferred?: string
            }
            status?: string,
            episodes?: number,
            image?: string,
            cover?: string,
            type?: string,
            color?: string,
            rating?: number,
        }
    ]
    episodes?: [
        {
            id?: string,
            title?: string,
            description?: string,
            number?: number,
            image?: string,
        }
    ]
}

export type getAdvancedSearch = {
    currentPage?: number,
    hasNextPage?: boolean,
    totalPage?: number,
    totalResults?: number,
    results?: [
        {
            id?: number,
            malId?: number,
            title?: {
                romaji?: string,
                english?: string,
                native?: string,
                userPreferred?: string
            }
            status?: string,
            image?: string,
            cover?: string,
            popularity?: number,
            totalEpisodes?: number,
            description?: string,
            genres?: string[],
            rating?: number,
            color?: string,
            type?: string,
            releaseDate?: number,
        }
    ]
}

export type getStreamingUrls = {
    headers?: {
        Referer?: string,
    }
    sources?: [
        {
            url?: string,
            isM3U8?: boolean,
            quality?: string,
        }
    ]
    subtitles?: [
        {
            url?: string,
            lang?: string,
        }
    ]
    intro?: {
        start?: number,
        end?: number,
    }
}