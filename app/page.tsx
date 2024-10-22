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

interface Session {
  title: string;
  tracks: Track[];
}

const sessions: Session[] = [
  {
    title: "#1 MIC CHECK 1.. 2..",
    tracks: [
      { title: "Only Time", artist: "Enya", album: "A Day Without Rain", duration: "03:38", bpm: 83, key: "5B", date: "2024-10-06", country: [53.1424, -7.6921], deezerId: "3135556", soundcloudUrl: "https://soundcloud.com/enya/only-time" },
      { title: "Fever Tree Emoji", artist: "People Taking Pictures", album: "For Meta Or For Worse", duration: "01:53", bpm: 80, key: "4A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234567", soundcloudUrl: "" },
      { title: "Gat Damn", artist: "Freddie Gibbs & Madlib", album: "Bandana", duration: "02:50", bpm: 85, key: "2A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "728877452", soundcloudUrl: "https://soundcloud.com/gangstagibbs/gat-damn" },
      { title: "Intro", artist: "Bahamadia", album: "Kollage", duration: "00:50", bpm: 141, key: "1B", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234568", soundcloudUrl: "https://soundcloud.com/bahamadia/intro" },
      { title: "Aquamarie Luvs Ecstasy", artist: "Amaarae", album: "roses are red, tears...", duration: "04:38", bpm: 95, key: "1B", date: "2024-10-06", country: [7.9465, -1.0232], deezerId: "1234569", soundcloudUrl: "https://soundcloud.com/amaarae/aquamarie-luvs-ecstasy" },
      { title: "New Level (feat. Future)", artist: "A$AP Ferg", album: "ALWAYS STRIVE AND PROSPER", duration: "04:24", bpm: 121, key: "2A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "121603222", soundcloudUrl: "https://soundcloud.com/asapferg/new-level-feat-future-1" },
      { title: "Chateau d'Yquem", artist: "YUNGMORPHEUS", album: "States of Precarity", duration: "02:13", bpm: 73, key: "1A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234570", soundcloudUrl: "" },
      { title: "Warsaw", artist: "Joy Division", album: "Substance 1977-1980", duration: "02:26", bpm: 83, key: "9A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "14749417", soundcloudUrl: "https://soundcloud.com/joy-division-3/warsaw-2010-remastered-version" },
      { title: "Bob 'n' I", artist: "RZA", album: "Birth of a Prince", duration: "02:50", bpm: 108, key: "6A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234571", soundcloudUrl: "https://soundcloud.com/rza-official/bob-n-i" },
      { title: "Pressure", artist: "KAYTRANADA", album: "TIMELESS", duration: "01:58", bpm: 109, key: "11A", date: "2024-10-06", country: [56.1304, -106.3468], deezerId: "1234572", soundcloudUrl: "https://soundcloud.com/kaytranada/pressure" },
      { title: "One of Them Ones (feat. Quavo & Rob49)", artist: "Mustard", album: "Faith Of A Mustard Seed", duration: "03:48", bpm: 101, key: "4A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234573", soundcloudUrl: "https://soundcloud.com/mustardofficial/mustard-one-of-them-ones-1" },
      { title: "Retaliation (Instrumental)", artist: "Jedi Mind Tricks", album: "Retaliation", duration: "03:43", bpm: 89, key: "2A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "1234574", soundcloudUrl: "https://soundcloud.com/jedimindtricks-music/retaliation" },
      { title: "Ronald Reagan Era", artist: "Kendrick Lamar", album: "Section.80", duration: "03:36", bpm: 84, key: "1A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "72665241", soundcloudUrl: "https://soundcloud.com/kendrick-lamar-music/ronald-reagan-era" },
      { title: "Charades", artist: "Headie One & Fred again..", album: "Charades - Single", duration: "03:39", bpm: 140, key: "10A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "1234575", soundcloudUrl: "https://soundcloud.com/headieone/charades" },
      { title: "Space Oddity", artist: "David Bowie", album: "Best of Bowie", duration: "05:16", bpm: 138, key: "8A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "3155498", soundcloudUrl: "https://soundcloud.com/davidbowieofficial/space-oddity-1999-remastered" },
      { title: "Enter Galactic (Love Connection, Pt. I)", artist: "Kid Cudi", album: "Man On the Moon: The End of Day", duration: "04:20", bpm: 120, key: "3A", date: "2024-10-06", country: [37.0902, -95.7129], deezerId: "5706981", soundcloudUrl: "https://soundcloud.com/cudderland/enter-galactic-love-connection" },
      { title: "BLACK (feat. JENNIE)", artist: "G-DRAGON", album: "COUP D'ETAT (Korea Edition)", duration: "03:23", bpm: 90, key: "8A", date: "2024-10-06", country: [35.9078, 127.7669], deezerId: "1234576", soundcloudUrl: "https://soundcloud.com/ayeareeya/black-feat-jennie-kim-of-yg" },
      { title: "Everything is romantic", artist: "Charli xcx", album: "BRAT", duration: "03:23", bpm: 150, key: "7A", date: "2024-10-06", country: [53.3781, -1.4360], deezerId: "1234577", soundcloudUrl: "https://soundcloud.com/charlixcx/everything-is-romantic" },
    ]
  },
  {
    title: "#2 MUSIC MAKES ME LOOSE CONTROL",
    tracks: [
      { title: "Home (Knee Deep Club Mix)", artist: "Julie McKnight", album: "Hercules & Love Affair", duration: "9:14", bpm: 125.4, key: "5A", date: "2024-10-14", country: [37.0902, -95.7129], deezerId: "", soundcloudUrl: "https://soundcloud.com/julie-mcknight-official/home-knee-deep-club-mix" },
      { title: "Blind (Frankie Knuckles Remix)", artist: "Hercules & Love Affair", album: "", duration: "7:52", bpm: 124, key: "7A", date: "2024-10-14", country: [40.7128, -74.0060], deezerId: "", soundcloudUrl: "https://soundcloud.com/hercules-and-love-affair/blind-frankie-knuckles-remix" },
      { title: "PREMIERE: Monolink - Father Ocean (Ben Böhmer Remix) [Embassy One]", artist: "Progressive Astronaut", album: "", duration: "7:56", bpm: 122, key: "10B", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/progressiveastronaut/premiere-monolink-father-ocean-ben-bohmer-remix-embassy-one" },
      { title: "It's You (Mousse T.'s Discotronic Mix)", artist: "FCL", album: "", duration: "6:40", bpm: 123, key: "7A", date: "2024-10-14", country: [50.8503, 4.3517], deezerId: "", soundcloudUrl: "https://soundcloud.com/fcl-official/its-you-mousse-t-s-discotronic" },
      { title: "BEYONCÉ – BREAK MY SOUL (KLM Funk Mix)", artist: "K. Le Maestro", album: "", duration: "4:17", bpm: 110, key: "3A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/klemaestro/breakmysoul" },
      { title: "Lovellious - Saturday Night Bruk [LOV003]", artist: "Lovellious", album: "", duration: "5:10", bpm: 130, key: "9A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/user-472395296/lovellious-saturday-night-3" },
      { title: "FUGEES - FU_GEE_LA (DJ CRISPS MIX)", artist: "DJ CRUSH", album: "", duration: "4:34", bpm: 135, key: "5A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "soundcloud/tracks/1600105534" },
      { title: "These Things Will Come To Be", artist: "DJENNEFELD", album: "", duration: "4:56", bpm: 126, key: "11A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/djcrisps/fugees-fu-gee-la-dj-crisps-mix" },
      { title: "Action Bronson - Shiraz", artist: "Penumbra-1", album: "", duration: "2:26", bpm: 95, key: "1A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/penumbra-1/08-shiraz" },
      { title: "Little Things (Reimagined)", artist: "Jorja Smith", album: "", duration: "3:15", bpm: 134, key: "1A", date: "2024-10-14", country: [52.4862, -1.8904], deezerId: "", soundcloudUrl: "https://soundcloud.com/jorjasmith/jorja-smith-little-things-1" },
      { title: "Souls of Mischief - Cab Fare", artist: "Alaskan Thunderfuck420", album: "", duration: "3:59", bpm: 83.9, key: "4A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/rapactivities/souls-of-mischief-cab-fare" },
      { title: "SADEVILIAN - Silver Spoon", artist: "Seanh2k11", album: "", duration: "4:32", bpm: 99, key: "7A", date: "2024-10-14", country: [90, 0], deezerId: "", soundcloudUrl: "https://soundcloud.com/seanh2k11/mf-doom-ft-sade-jezebel-seanh-remix" },
      { title: "The Beat ft. MF DOOM", artist: "Tom Misch", album: "", duration: "3:29", bpm: 94, key: "4A", date: "2024-10-14", country: [51.5074, -0.1278], deezerId: "", soundcloudUrl: "https://soundcloud.com/tommisch/the-beat-ft-mf-doom" },
      { title: "Everlong", artist: "Foo Fighters", album: "Greatest Hits", duration: "4:09", bpm: 79, key: "10A", date: "2024-10-14", country: [37.0902, -95.7129], deezerId: "", soundcloudUrl: "https://soundcloud.com/foofighters/everlong" },
      { title: "Seoul in the Summer", artist: "BTS", album: "Seoul in the Summer - Single", duration: "2:24", bpm: 98, key: "7A", date: "2024-10-14", country: [37.5665, 126.9780], deezerId: "", soundcloudUrl: "https://soundcloud.com/justminmusic/seoul-in-the-summer" },
      { title: "Lady (Hear Me Tonight)", artist: "Modjo", album: "Modjo (Remastered)", duration: "5:07", bpm: 126, key: "3B", date: "2024-10-14", country: [46.2276, 2.2137], deezerId: "", soundcloudUrl: "https://soundcloud.com/modjo-official/lady-hear-me-tonight-1" },
      { title: "New Low", artist: "Mk.gee", album: "Two Star & The Dream Police", duration: "2:06", bpm: 128, key: "5B", date: "2024-10-14", country: [37.0902, -95.7129], deezerId: "", soundcloudUrl: "https://soundcloud.com/mkgee/new-low" },
      { title: "C.D.C (Panorama City Remix)", artist: "Yitai Wang", album: "Feel & Sight", duration: "4:20", bpm: 77.5, key: "6A", date: "2024-10-14", country: [35.8617, 104.1954], deezerId: "", soundcloudUrl: "https://soundcloud.com/wangyitai/c-d-c-panorama-city-remix" },
    ]
  }
];

export default function Page() {
  return <DjArchive sessions={sessions} />
}