import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const generateUrls = (originalUrl: string) => [
  originalUrl,
  originalUrl.replace('-large', '-t500x500'),
  originalUrl.replace('-large', '-crop'),
  originalUrl.replace('-large', '-t300x300'),
  originalUrl.replace('-large', '-large')
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL parameter' })
  }

  const urls = generateUrls(url)

  for (const testUrl of urls) {
    try {
      const response = await axios.head(testUrl)
      if (response.status === 200) {
        return res.redirect(testUrl)
      }
    } catch (error) {
      // Continue to the next URL if this one fails
    }
  }

  res.status(404).json({ error: 'No valid artwork URL found' })
}
