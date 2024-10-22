"use client"

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { GlobeMethods } from 'react-globe.gl' // Import the correct type from your globe library
import * as THREE from 'three'
import { XIcon, ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { useMediaQuery } from 'react-responsive';
import { NamJunePaikPlayer } from '@/components/ui/nam-june-paik-player';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

interface Track {
  title: string
  artist: string
  album: string
  duration: string
  bpm: number
  key: string
  date: string
  country: [number, number]
  deezerId: string
  soundcloudUrl: string  // Changed from tidalId to soundcloudUrl
}

interface Session {
  title: string;
  tracks: Track[];
  soundcloudUrl: string;
}

interface DjArchiveProps {
  sessions: Session[];
}

interface AudioPlayerProps {
  audioSrc: string | undefined;
}

const getRandomColor = (): string => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

const Time: React.FC = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const locations = [
        { name: 'NYC', offset: -4 },
        { name: 'PARIS', offset: 2 },
        { name: 'LONDON', offset: 1 },
        { name: 'PRAGUE', offset: 2 },
        { name: 'BEIJING', offset: 8 },
        { name: 'SEOUL', offset: 9 },
        { name: 'TOKYO', offset: 9 },
        { name: 'ARCTIC', offset: 2 },
      ]

      const newTimes: { [key: string]: string } = {}
      locations.forEach(loc => {
        const locTime = new Date(now.getTime() + loc.offset * 3600000)
        newTimes[loc.name] = locTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC'
        })
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  if (isMobile) {
    return (
      <div className="bg-black bg-opacity-80 rounded-lg text-white text-xs font-bold p-2">
        <div className="flex justify-between items-center">
          <span>NYC: {times['NYC'] || 'Loading...'}</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 focus:outline-none"
          >
            {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-2 space-y-1">
            {Object.entries(times).filter(([key]) => key !== 'NYC').map(([location, time]) => (
              <div key={location} className="flex justify-between">
                <span>{location}:</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-black bg-opacity-80 p-6 rounded-lg text-white text-xl font-bold">
      {Object.entries(times).map(([location, time]) => (
        <div key={location} className="flex justify-between mb-3">
          <span className="mr-4">{location}</span>
          <span>{time}</span>
        </div>
      ))}
    </div>
  )
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioSrc) {
      console.log("Audio source:", audioSrc);
      audioRef.current = new Audio(audioSrc);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (!audioSrc) {
    return null;
  }

  return (
    <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 z-10 scale-75">
      <NamJunePaikPlayer onPlay={handlePlay} onStop={handleStop} />
    </div>
  );
};

const AbstractView: React.FC<{ onTrackSelect: (track: Track) => void, tracks: Track[], audioSrc: string | undefined }> =
  ({ onTrackSelect, tracks, audioSrc }) => {
    const mountRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

    useEffect(() => {
      if (!mountRef.current) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      const labelRenderer = new CSS2DRenderer()

      renderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
      mountRef.current.appendChild(renderer.domElement)
      mountRef.current.appendChild(labelRenderer.domElement)

      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = '0'
      labelRenderer.domElement.style.pointerEvents = 'none'

      const geometry = new THREE.SphereGeometry(5, 64, 64)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec3 color = vec3(0.0, 0.5, 1.0);
          float intensity = sin(time * 0.5 + vUv.y * 5.0) * 0.5 + 0.5;
          gl_FragColor = vec4(color, intensity * 0.3);
        }
      `,
        transparent: true,
        wireframe: true,
      })
      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)

      const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64)
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = vec3(0.0, 0.5, 1.0);
          float pulse = sin(time * 0.5) * 0.5 + 0.5;
          gl_FragColor = vec4(color * intensity * (1.0 + pulse * 0.3), intensity * 0.5);
        }
      `,
        uniforms: {
          time: { value: 0 },
        },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      })
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      scene.add(atmosphere)

      camera.position.z = 15

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.rotateSpeed = 0.5
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5

      const dots: THREE.Mesh[] = []
      const positions: THREE.Vector3[] = []

      tracks.forEach((track, index) => {
        const phi = Math.acos(-1 + (2 * index) / tracks.length)
        const theta = Math.sqrt(tracks.length * Math.PI) * phi

        const x = 5 * Math.cos(theta) * Math.sin(phi)
        const y = 5 * Math.sin(theta) * Math.sin(phi)
        const z = 5 * Math.cos(phi)

        const dotGeometry = new THREE.SphereGeometry(0.1, 32, 32)
        const color = getRandomColor()
        const dotMaterial = new THREE.MeshPhongMaterial({
          color: new THREE.Color(color),
          specular: new THREE.Color(0xffffff),
          shininess: 100,
          emissive: new THREE.Color(color),
          emissiveIntensity: 0.7
        })
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        dot.position.set(x, y, z)

        sphere.add(dot)
        dots.push(dot)
        positions.push(new THREE.Vector3(x, y, z))

        const songDiv = document.createElement('div')
        songDiv.className = 'song-label'
        songDiv.textContent = track.title
        songDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        songDiv.style.color = 'white'
        songDiv.style.padding = '2px 5px'
        songDiv.style.borderRadius = '3px'
        songDiv.style.fontSize = '8px'
        songDiv.style.opacity = '0'
        songDiv.style.transition = 'opacity 0.3s'
        songDiv.style.fontFamily = "'Orbitron', sans-serif"

        const songLabel = new CSS2DObject(songDiv)
        songLabel.position.set(x, y, z)
        sphere.add(songLabel)

        dot.userData = { track, label: songLabel }
      })

      const stringGeometry = new THREE.BufferGeometry().setFromPoints(positions)
      const stringMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, opacity: 0.8, transparent: true, linewidth: 2 })
      const stringLine = new THREE.Line(stringGeometry, stringMaterial)
      sphere.add(stringLine)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(10, 10, 10)
      scene.add(pointLight)

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(sphere.children)

        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object
          if (intersectedObject.userData && intersectedObject.userData.track) {
            ; (intersectedObject.userData.label.element as HTMLElement).style.opacity = '1'
          }
        } else {
          sphere.children.forEach((child) => {
            if (child.userData && child.userData.label) {
              (child.userData.label.element as HTMLElement).style.opacity = '0'
            }
          })
        }
      }

      const onClick = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(sphere.children)

        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object
          if (intersectedObject.userData && intersectedObject.userData.track) {
            const track = intersectedObject.userData.track as Track
            onTrackSelect(track)
            playTrackPreview(track.deezerId)
          }
        }
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('click', onClick)

      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        const time = performance.now() * 0.001
          ; (material.uniforms.time as { value: number }).value = time
          ; (atmosphereMaterial.uniforms.time as { value: number }).value = time
        renderer.render(scene, camera)
        labelRenderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        labelRenderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement)
          mountRef.current.removeChild(labelRenderer.domElement)
        }
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('click', onClick)
        window.removeEventListener('resize', handleResize)
      }
    }, [onTrackSelect, tracks])

    const playTrackPreview = useCallback((deezerId: string) => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (currentlyPlaying === deezerId) {
        setCurrentlyPlaying(null)
        return
      }
      const audio = new Audio(`https://cdns-preview-8.dzcdn.net/stream/c-${deezerId}`)
      audio.play()
      audioRef.current = audio
      setCurrentlyPlaying(deezerId)
    }, [currentlyPlaying])

    return (
      <div ref={mountRef} className="w-full h-full">
        <AudioPlayer audioSrc={audioSrc} />
      </div>
    )
  }

const MapView: React.FC<{ onTrackSelect: (track: Track) => void, tracks: Track[], audioSrc: string | undefined }> =
  ({ onTrackSelect, tracks, audioSrc }) => {
    const globeEl = useRef<GlobeMethods | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

    const globePoints = useMemo(() => {
      return tracks.map((track, index) => ({
        lat: track.country[0] + (Math.random() - 0.5) * 5,
        lng: track.country[1] + (Math.random() - 0.5) * 5,
        track: track,
        color: getRandomColor(),
        radius: 0.5,
        height: (index % 3 + 1) * 0.3,
      }))
    }, [tracks])

    useEffect(() => {
      if (globeEl.current) {
        // @ts-expect-error: Pass The Build
        globeEl.current.controls().autoRotate = true
        // @ts-expect-error: Pass The Build
        globeEl.current.controls().autoRotateSpeed = 0.5
      }
    }, [])

    const arcsData = useMemo(() => {
      const sessionArcs: { [key: string]: any[] } = {}
      tracks.forEach(track => {
        if (!sessionArcs[track.date]) {
          sessionArcs[track.date] = []
        }
        sessionArcs[track.date].push({
          startLat: track.country[0],
          startLng: track.country[1],
          color: '#FFFFFF'
        })
      })

      return Object.values(sessionArcs).map(sessionTracks => {
        return sessionTracks.map((track, idx) => ({
          ...track,
          endLat: sessionTracks[(idx + 1) % sessionTracks.length].startLat,
          endLng: sessionTracks[(idx + 1) % sessionTracks.length].startLng
        }))
      }).flat()
    }, [tracks])

    const playTrackPreview = useCallback((deezerId: string) => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (currentlyPlaying === deezerId) {
        setCurrentlyPlaying(null)
        return
      }
      const audio = new Audio(`https://cdns-preview-8.dzcdn.net/stream/c-${deezerId}`)
      audio.play()
      audioRef.current = audio
      setCurrentlyPlaying(deezerId)
    }, [currentlyPlaying])

    return (
      <div className="relative w-full h-full">
        <Globe
          globeRef={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={globePoints}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude="height"
          pointRadius="radius"
          pointLabel={(d: any) => {
            if (!d || !d.track) return '';
            const { title, artist } = d.track;
            return `
            <div style="
              background-color: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 5px;
              border-radius: 5px;
              font-size: 12px;
              white-space: nowrap;
            ">
              <div>${title || 'Unknown Title'}</div>
              <div>${artist || 'Unknown Artist'}</div>
            </div>
          `;
          }}
          onPointClick={(point) => {
            if (point && point.track) {
              onTrackSelect(point.track);
              playTrackPreview(point.track.deezerId);
            }
          }}
          arcsData={arcsData}
          arcColor={() => '#FFFFFF'}
          arcDashLength={() => Math.random()}
          arcDashGap={() => Math.random()}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
          arcStroke={0.5}
          globeImageOpacity={0.9}
          atmosphereColor="rgba(100,150,255,0.3)"
          atmosphereAltitude={0.15}
          enablePointerInteraction={true}
          animateIn={true}
        />
        <AudioPlayer audioSrc={audioSrc} />
      </div>
    );
  }

const TrackInfo: React.FC<{ track: Track, onClose: () => void, onPlay: (track: Track) => void }> = ({ track, onClose, onPlay }) => {
  const [albumCover, setAlbumCover] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlbumCover = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/albumCover?artist=${encodeURIComponent(track.artist)}&album=${encodeURIComponent(track.album)}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        console.log('Album cover API response:', data) // Keep this for debugging

        if (data.album && data.album.image) {
          const extraLargeImage = data.album.image.find((img: { size: string, '#text': string }) => img.size === 'extralarge')
          if (extraLargeImage && extraLargeImage['#text']) {
            setAlbumCover(extraLargeImage['#text'])
          } else {
            setError("No large album cover found")
          }
        } else {
          setError("No album information found")
        }
      } catch (err) {
        console.error('Error fetching album cover:', err)
        setError(`Failed to fetch album cover: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlbumCover()
  }, [track])

  const isValidSoundCloudUrl = (url: string) => {
    return url.startsWith('https://soundcloud.com/')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg shadow-lg z-50 max-w-md w-full overflow-y-auto max-h-[80vh]"
      style={{ fontFamily: "'Orbitron', sans-serif", border: '2px solid #00ff00' }}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-300">
        <XIcon size={20} />
      </button>
      <h3 className="text-xl font-bold mb-2 text-pink-300">{track.title}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div><span className="text-orange-400">artist:</span> {track.artist}</div>
        <div><span className="text-orange-400">album:</span> {track.album}</div>
        <div><span className="text-orange-400">duration:</span> {track.duration}</div>
        <div><span className="text-orange-400">bpm:</span> {track.bpm}</div>
        <div><span className="text-orange-400">key:</span> {track.key}</div>
        <div><span className="text-orange-400">date:</span> {track.date}</div>
      </div>
      <div className="mb-4 relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {error}
          </div>
        ) : albumCover ? (
          <img src={albumCover} alt={`${track.album} cover`} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No album cover available
          </div>
        )}
      </div>
      <div className="flex justify-center">
        {isValidSoundCloudUrl(track.soundcloudUrl) ? (
          <a
            href={track.soundcloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF5500] hover:bg-[#FF7700] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center"
            onClick={(e) => {
              e.preventDefault();
              onPlay(track);
            }}
          >
            Listen on SoundCloud
            <ExternalLinkIcon size={16} className="ml-2" />
          </a>
        ) : (
          <span className="text-gray-400">SoundCloud link not available</span>
        )}
      </div>
    </motion.div>
  )
}

const AnimatedWave: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <a
        href="https://radio.cooper.edu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-[#39FF14] transition-colors duration-300"
      >
        radio.cooper.edu
      </a>
      <svg width="50" height="20" viewBox="0 0 50 20">
        <path
          d="M0 10 Q12.5 0, 25 10 T50 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <animate
            attributeName="d"
            values="M0 10 Q12.5 0, 25 10 T50 10;M0 10 Q12.5 20, 25 10 T50 10;M0 10 Q12.5 0, 25 10 T50 10"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

const SessionSelector: React.FC<{ sessions: Session[], currentSession: number, onSessionChange: (index: number) => void }> = ({ sessions, currentSession, onSessionChange }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 p-2 rounded-lg flex items-center space-x-4">
      <button
        onClick={() => onSessionChange(Math.max(0, currentSession - 1))}
        className="text-white hover:text-gray-300 disabled:opacity-50"
        disabled={currentSession === 0}
      >
        <ChevronLeftIcon size={24} />
      </button>
      <div className="text-white font-bold uppercase">{sessions[currentSession].title}</div>
      <button
        onClick={() => onSessionChange(Math.min(sessions.length - 1, currentSession + 1))}
        className="text-white hover:text-gray-300 disabled:opacity-50"
        disabled={currentSession === sessions.length - 1}
      >
        <ChevronRightIcon size={24} />
      </button>
    </div>
  )
}

interface Session {
  title: string;
  tracks: Track[];
}

export function DjArchive({ sessions }: DjArchiveProps) {
  const [view, setView] = useState<'abstract' | 'map'>('abstract')
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [currentSession, setCurrentSession] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const handleTrackSelect = useCallback((track: Track) => {
    setSelectedTrack(track);
  }, []);

  const handleSessionChange = useCallback((index: number) => {
    setCurrentSession(index);
  }, []);

  const handleTrackClick = useCallback((track: Track) => {
    setCurrentTrack(track);
  }, []);

  const closePlayer = () => {
    setCurrentTrack(null);
  };

  const currentAudioSrc = sessions[currentSession].audioSrc;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white lowercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      <div className="absolute top-0 right-0 p-4 z-10 normal-case">
        <Time />
      </div>
      <div className="flex-1 relative">
        {view === 'abstract' ? (
          <AbstractView
            onTrackSelect={handleTrackSelect}
            tracks={sessions[currentSession].tracks}
            audioSrc={currentAudioSrc}
          />
        ) : (
          <MapView
            onTrackSelect={handleTrackSelect}
            tracks={sessions[currentSession].tracks}
            audioSrc={currentAudioSrc}
          />
        )}
      </div>
      <div className="absolute bottom-4 left-4 text-4xl z-10 font-bold uppercase" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
        DIGITAL LETTERS by{' '}
        <span className="inline-block">
          <span className="text-green-400">W</span>
          <span className="text-blue-400">A</span>
          <span className="text-yellow-400">V</span>
          <span className="text-red-400">E</span>
          <span className="text-purple-400">L</span>
          <span className="text-pink-400">E</span>
          <span className="text-indigo-400">N</span>
          <span className="text-orange-400">G</span>
          <span className="text-teal-400">T</span>
          <span className="text-cyan-400">H</span>
        </span>
        {' '}radio
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <AnimatedWave />
      </div>
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <button
          className={`px-3 py-1 text-xs font-medium transition-colors duration-200 ${view === 'abstract' ? 'text-white' : 'text-gray-400'
            }`}
          onClick={() => setView('abstract')}
        >
          abstract
        </button>
        <button
          className={`px-3 py-1 text-xs font-medium transition-colors duration-200 ${view === 'map' ? 'text-white' : 'text-gray-400'
            }`}
          onClick={() => setView('map')}
        >
          map
        </button>
      </div>
      <SessionSelector
        sessions={sessions}
        currentSession={currentSession}
        onSessionChange={handleSessionChange}
      />
      <AnimatePresence>
        {selectedTrack && (
          <TrackInfo
            track={selectedTrack}
            onClose={() => setSelectedTrack(null)}
            onPlay={handleTrackClick}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentTrack && currentTrack.soundcloudUrl && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{currentTrack.title} - {currentTrack.artist}</h2>
              <button onClick={closePlayer} className="text-gray-400 hover:text-white">
                <XIcon size={24} />
              </button>
            </div>
            <button
              onClick={() => {
                // const encodedUrl = encodeURIComponent(`https://soundcloud.com/${currentTrack.soundcloudUrl}`);
                window.open(`https://w.soundcloud.com/player/?url=${currentTrack.soundcloudUrl}`, '_blank');
              }}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
            >
              Listen on SoundCloud
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}