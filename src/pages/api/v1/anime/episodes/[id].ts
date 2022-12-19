// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AniList from "@services/Anime/AniList";

const Status = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', 's-maxage=20');
    return new Promise((resolve, reject) => {
        AniList.getAnimeEpisodes(req.query.id as string, req.query.prov as string).then((data) => {
            res.status(200).json(data);
            resolve(data);
        }).catch((err) => {
            res.status(500).json({message: err});
            resolve(err);
        });
    });
}

export default Status;
