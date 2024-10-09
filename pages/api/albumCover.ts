import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artist, album } = req.query

  if (!artist || !album) {
    return res.status(400).json({ error: 'Artist and album are required' })
  }

  const apiKey = process.env.LASTFM_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Last.fm API key is not configured' })
  }

  const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodeURIComponent(artist as string)}&album=${encodeURIComponent(album as string)}&format=json`

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch album info' })
  }
}