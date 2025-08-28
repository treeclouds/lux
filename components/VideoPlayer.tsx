import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Settings,
  Download,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoPlayerProps {
  video: any;
  onBack: () => void;
}

export function VideoPlayer({ video, onBack }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoProgress, setVideoProgress] = useState(video?.progress || 0); // Percentage watched
  
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!video) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Video not found</p>
      </div>
    );
  }

  const courseData = {
    id: 1,
    title: video?.course || 'Luxury Yacht Service Excellence',
    currentModule: {
      id: 3,
      title: 'Advanced Service Protocols',
      currentLesson: {
        id: 4,
        title: video?.title || 'Wine Service Protocols',
        duration: video?.duration || '12:00',
        description: 'Master the sophisticated art of wine service on luxury yachts, including proper presentation, pairing recommendations, and handling unique maritime challenges.',
        videoUrl: 'https://example.com/video.mp4', // Placeholder URL
        thumbnailUrl: 'https://images.unsplash.com/photo-1709747820764-ce13895aff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5lJTIwY2VsbGFyfGVufDF8fHx8MTc1NjM2NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        watchTime: '0:00',
        totalWatchTime: video?.duration || '12:00',
        completed: false
      },
      lessons: [
        {
          id: 1,
          title: 'Introduction to Yacht Service Standards',
          duration: '8:30',
          completed: true,
          locked: false
        },
        {
          id: 2,
          title: 'Understanding Luxury Guest Expectations',
          duration: '10:15',
          completed: true,
          locked: false
        },
        {
          id: 3,
          title: 'Table Setting and Fine Dining Protocols',
          duration: '11:20',
          completed: true,
          locked: false
        },
        {
          id: 4,
          title: 'Wine Service Protocols',
          duration: '12:00',
          completed: false,
          locked: false,
          current: true
        },
        {
          id: 5,
          title: 'Champagne and Spirits Service',
          duration: '9:45',
          completed: false,
          locked: false
        },
        {
          id: 6,
          title: 'Advanced Pairing Techniques',
          duration: '13:30',
          completed: false,
          locked: true
        }
      ]
    },
    instructor: {
      name: 'Sommelier Isabella Clarke',
      title: 'Master Sommelier & Yacht Service Expert',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    resources: [
      {
        id: 1,
        title: 'Wine Service Protocol Checklist',
        type: 'PDF',
        size: '1.4 MB'
      },
      {
        id: 2,
        title: 'Wine Pairing Guide for Yacht Dining',
        type: 'PDF',
        size: '2.1 MB'
      },
      {
        id: 3,
        title: 'Maritime Wine Storage Guidelines',
        type: 'DOC',
        size: '750 KB'
      }
    ],
    notes: [
      {
        timestamp: '1:45',
        content: 'Key Point: Temperature control is crucial - whites 45-50°F, reds 60-65°F'
      },
      {
        timestamp: '4:20',
        content: 'Remember: Account for yacht movement when pouring - use modified stance'
      },
      {
        timestamp: '7:35',
        content: 'Pro Tip: Present wine facing the guest, label visible, with confidence'
      },
      {
        timestamp: '10:15',
        content: 'Important: Maritime conditions affect wine taste - adjust pairings accordingly'
      }
    ]
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Mock duration for demo
  useEffect(() => {
    setDuration(720); // 12:00 in seconds
    setCurrentTime(video?.progress || 0); // Start from progress passed or 0
  }, [video]);

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-medium text-sm truncate">{courseData.currentModule.currentLesson.title}</h1>
            <p className="text-xs text-muted-foreground">{courseData.title}</p>
          </div>
          <Button variant="ghost" size="sm">
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-full">
        {/* Video Player */}
        <div className="relative bg-black">
          {/* Video Element */}
          <div className="aspect-video relative">
            <ImageWithFallback
              src={courseData.currentModule.currentLesson.thumbnailUrl}
              alt={courseData.currentModule.currentLesson.title}
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              {/* Progress Bar */}
              <div 
                className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                  <span className="text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-transparent text-xs border-none text-white"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Video Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-sage/10 text-sage">Module {courseData.currentModule.id}</Badge>
                <Badge variant="outline">Lesson {courseData.currentModule.currentLesson.id}</Badge>
              </div>
              <h2 className="text-lg font-medium mb-2">{courseData.currentModule.currentLesson.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {courseData.currentModule.currentLesson.description}
              </p>
              
              {/* Progress */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm text-muted-foreground">{videoProgress}% complete</span>
                </div>
                <Progress value={videoProgress} className="h-2" />
              </div>
            </div>

            {/* Instructor */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={courseData.instructor.avatar}
                    alt={courseData.instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{courseData.instructor.name}</div>
                  <div className="text-xs text-muted-foreground">{courseData.instructor.title}</div>
                </div>
              </div>
            </Card>

            {/* Toggle Sections */}
            <div className="space-y-4">
              {/* Playlist Toggle */}
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="w-full justify-between p-0 h-auto"
                >
                  <span className="font-medium">Module Content</span>
                  {showPlaylist ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
                
                {showPlaylist && (
                  <div className="mt-4 space-y-2">
                    {courseData.currentModule.lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          lesson.current 
                            ? 'bg-sage/10 border-sage/30' 
                            : lesson.completed 
                            ? 'bg-muted/50 border-border'
                            : 'border-border hover:bg-muted/30'
                        } ${lesson.locked ? 'opacity-50' : 'cursor-pointer'}`}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          {lesson.locked ? (
                            <Lock size={14} className="text-muted-foreground" />
                          ) : lesson.completed ? (
                            <CheckCircle size={14} className="text-sage" />
                          ) : lesson.current ? (
                            <Play size={14} className="text-sage" />
                          ) : (
                            <Play size={14} className="text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{lesson.title}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock size={12} />
                            {lesson.duration}
                          </div>
                        </div>
                        {lesson.current && (
                          <Badge className="bg-sage text-white text-xs">Current</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Notes Toggle */}
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setShowNotes(!showNotes)}
                  className="w-full justify-between p-0 h-auto"
                >
                  <span className="font-medium">Study Notes</span>
                  {showNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
                
                {showNotes && (
                  <div className="mt-4 space-y-3">
                    {courseData.notes.map((note, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {note.timestamp}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Resources */}
              <div>
                <h3 className="font-medium mb-4">Download Resources</h3>
                <div className="space-y-2">
                  {courseData.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-navy/10 rounded-lg flex items-center justify-center">
                          <FileText size={14} className="text-navy" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {resource.type} • {resource.size}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                Previous Lesson
              </Button>
              <Button className="flex-1 bg-navy hover:bg-navy/90 text-pearl">
                Next Lesson
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}