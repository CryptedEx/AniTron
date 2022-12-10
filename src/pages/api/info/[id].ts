import AniList from '@services/AniList'
import type { NextApiRequest, NextApiResponse } from 'next'
const Info = async(req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', 's-maxage=30');
    try {
        const [result] = await Promise.all([
            AniList.getAnimeInfo(req.query.id as unknown as number, 'gogoanime')
        ])
        res.status(200).json({ result })
    } catch (err) {
        res.status(500).json({ error: '500, Internal Server Error' })
    }
}

export default Info;