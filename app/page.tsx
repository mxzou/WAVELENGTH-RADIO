import { DjArchive } from "@/components/dj-archive"

interface Track {
  title: string;
  artist: string;
  album: string;
  duration: string;
  bpm: number;
  key: string;
  date: string;
  country: [number, number];
  deezerId: string;
  soundcloudUrl: string;
}

const dummyTracks: Track[] = [
  {
    title: "Example Track",
    artist: "Example Artist",
    album: "Example Album",
    duration: "3:30",
    bpm: 120,
    key: "C",
    date: "2024-03-14",
    country: [0, 0],
    deezerId: "123456",
    soundcloudUrl: "https://soundcloud.com/example"
  },
  // Add more dummy tracks as needed
];

export default function Page() {
  return <DjArchive tracks={dummyTracks} />
}