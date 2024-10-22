import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL parameter' })
  }

  try {
    // Fetch SoundCloud oEmbed data
    const oEmbedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const oEmbedResponse = await axios.get(oEmbedUrl)
    const { title, author_name, thumbnail_url } = oEmbedResponse.data

    // If we have all the info, return it
    if (title && author_name && thumbnail_url) {
      return res.json({ title, artist: author_name, artwork: thumbnail_url })
    }

    // If oEmbed doesn't provide all info, try scraping the page
    const pageResponse = await axios.get(url)
    const pageHtml = pageResponse.data

    // Extract title and artist from meta tags (adjust selectors as needed)
    const scrapedTitle = pageHtml.match(/<meta property="og:title" content="([^"]+)">/)?.[1] || title
    const scrapedArtist = pageHtml.match(/<meta property="music:musician" content="([^"]+)">/)?.[1] || author_name

    // Use scraped data or fallback to original data
    return res.json({
      title: scrapedTitle || 'Unknown Title',
      artist: scrapedArtist || 'Unknown Artist',
      artwork: thumbnail_url || '/default-artwork.jpg' // Provide a default artwork path
    })
  } catch (error) {
    console.error('Error fetching SoundCloud info:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
