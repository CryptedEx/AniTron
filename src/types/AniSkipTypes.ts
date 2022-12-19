export type getSkip = {
    found?: boolean,
    results?: [
        {
            interval?: {
                startTime?: number,
                endTime?: number
            },
            skipType?: string,
            skipId?: string,
            episodeLength?: number,
        }
    ],
    message?: string
    statusCode?: number
}