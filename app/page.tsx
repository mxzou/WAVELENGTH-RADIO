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

const tracks: Track[] = [
  { title: "Only Time", artist: "Enya", album: "A Day Without Rain", duration: "03:38", bpm: 83, key: "5B", date: "2024-10-06", country: [53.1424, -7.6921], deezerId: "3135556", soundcloudUrl: "https://soundcloud.com/enyaofficial/only-time" },
  { title: "Fever Tree Emoji", artist: "People Taking Pictures", album: "For Meta Or For Worse", duration: "01:53", bpm: 80, key: "4A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234567", soundcloudUrl: "" },
  { title: "Gat Damn", artist: "Freddie Gibbs & Madlib", album: "Bandana", duration: "02:50", bpm: 85, key: "2A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "728877452", soundcloudUrl: "3PXz2i6cF0k" },
  { title: "Intro", artist: "Bahamadia", album: "Kollage", duration: "00:50", bpm: 141, key: "1B", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234568", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Aquamarie Luvs Ecstasy", artist: "Amaarae", album: "roses are red, tears...", duration: "04:38", bpm: 95, key: "1B", date: "2024-10-06", country: [7.9465, -1.0232], deezerId: "1234569", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "New Level (feat. Future)", artist: "A$AP Ferg", album: "ALWAYS STRIVE AND PROSPER", duration: "04:24", bpm: 121, key: "2A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "121603222", soundcloudUrl: "Srns7NiO278" },
  { title: "Chateau d'Yquem", artist: "YUNGMORPHEUS", album: "States of Precarity", duration: "02:13", bpm: 73, key: "1A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234570", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Warsaw", artist: "Joy Division", album: "Substance 1977-1980", duration: "02:26", bpm: 83, key: "9A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "14749417", soundcloudUrl: "qrWPKu37H1E" },
  { title: "Bob 'n' I", artist: "RZA", album: "Birth of a Prince", duration: "02:50", bpm: 108, key: "6A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234571", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Pressure", artist: "KAYTRANADA", album: "TIMELESS", duration: "01:58", bpm: 109, key: "11A", date: "2024-10-06", country: [56.1304, -106.3468], deezerId: "1234572", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "One of Them Ones (feat. Quavo & Rob49)", artist: "Mustard", album: "Faith Of A Mustard Seed", duration: "03:48", bpm: 101, key: "4A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234573", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Retaliation (Instrumental)", artist: "Jedi Mind Tricks", album: "Retaliation", duration: "03:43", bpm: 89, key: "2A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234574", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Ronald Reagan Era", artist: "Kendrick Lamar", album: "Section.80", duration: "03:36", bpm: 84, key: "1A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "72665241", soundcloudUrl: "Z5yb2H7Fqi8" },
  { title: "Charades", artist: "Headie One & Fred again..", album: "Charades - Single", duration: "03:39", bpm: 140, key: "10A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "1234575", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Space Oddity", artist: "David Bowie", album: "Best of Bowie", duration: "05:16", bpm: 138, key: "8A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "3155498", soundcloudUrl: "iYYRH4apXDo" },
  { title: "Enter Galactic (Love Connection, Pt. I)", artist: "Kid Cudi", album: "Man On the Moon: The End of Day", duration: "04:20", bpm: 120, key: "3A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "5706981", soundcloudUrl: "Xn9r1UOqp2Q" },
  { title: "BLACK (feat. JENNIE)", artist: "G-DRAGON", album: "COUP D'ETAT (Korea Edition)", duration: "03:23", bpm: 90, key: "8A", date: "2024-10-06", country: [35.9078, 127.7669], deezerId: "1234576", soundcloudUrl: "dQw4w9WgXcQ" },
  { title: "Everything is romantic", artist: "Charli xcx", album: "BRAT", duration: "03:23", bpm: 150, key: "7A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "1234577", soundcloudUrl: "dQw4w9WgXcQ" },
];

export default function Page() {
  return <DjArchive tracks={tracks} />
}