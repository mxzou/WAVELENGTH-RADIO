import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artist, album } = req.query

  if (!artist || !album || Array.isArray(artist) || Array.isArray(album)) {
    return res.status(400).json({ error: 'Artist and album are required and must be strings' })
  }

  const apiKey = process.env.LASTFM_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Last.fm API key is not configured' })
  }

  const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&format=json`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      console.error('Last.fm API error:', data)
      return res.status(response.status).json({ error: 'Last.fm API error', details: data })
    }

    if (data.error) {
      console.error('Last.fm API error:', data)
      return res.status(400).json({ error: 'Last.fm API error', details: data })
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching album info:', error)
    res.status(500).json({ error: 'Failed to fetch album info', details: error instanceof Error ? error.message : String(error) })
  }
}