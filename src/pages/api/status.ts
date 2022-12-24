// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

const Status = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', 's-maxage=86400');
    let uptime: number = process.uptime();

    res.status(200).json({message: 'Status: OK', uptime: `${Math.floor(uptime / (3600 * 24))}d ${Math.floor(uptime % (3600 * 24) / 3600)}h ${Math.floor(uptime % 3600 / 60)}m ${Math.floor(uptime % 60)}s` ,status: 200})
}

export default Status;
