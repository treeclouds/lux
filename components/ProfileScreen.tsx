import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
// Removed Tabs import - using custom solution
import { 
  Settings, 
  Edit, 
  Award, 
  BookOpen, 
  Clock, 
  Star, 
  Download,
  Share2,
  Trophy,
  Users,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('certifications');
  
  const user = {
    name: 'Sarah Mitchell',
    role: 'Senior Yacht Stewardess',
    location: 'Monaco',
    joinDate: 'January 2023',
    avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Passionate about delivering exceptional luxury yacht experiences. Specialized in wine service and guest relations with over 8 years in the industry.',
    stats: {
      coursesCompleted: 12,
      totalHours: 847,
      averageScore: 96,
      streak: 23,
      connections: 189,
      contributions: 45
    }
  };

  const certifications = [
    {
      id: 1,
      name: 'Luxury Yacht Service Excellence',
      issuer: 'Affluent Institute',
      date: 'December 2023',
      score: 98,
      credentialId: 'AI-YSE-2023-1247',
      verified: true
    },
    {
      id: 2,
      name: 'Wine Service Professional',
      issuer: 'Affluent Institute',
      date: 'November 2023',
      score: 95,
      credentialId: 'AI-WSP-2023-0892',
      verified: true
    },
    {
      id: 3,
      name: 'Guest Relations Mastery',
      issuer: 'Affluent Institute',
      date: 'October 2023',
      score: 94,
      credentialId: 'AI-GRM-2023-0654',
      verified: true
    }
  ];

  const completedCourses = [
    {
      id: 1,
      title: 'Luxury Yacht Service Excellence',
      completedDate: 'December 15, 2023',
      score: 98,
      duration: '4h 30m',
      image: 'https://images.unsplash.com/photo-1697207340462-c9eac5047014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldHxlbnwxfHx8fDE3NTYzMjkzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      title: 'Wine Service & Sommelier Fundamentals',
      completedDate: 'November 28, 2023',
      score: 95,
      duration: '3h 15m',
      image: 'https://images.unsplash.com/photo-1709747820764-ce13895aff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5lJTIwY2VsbGFyfGVufDF8fHx8MTc1NjM2NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      title: 'Guest Relations Mastery',
      completedDate: 'October 12, 2023',
      score: 94,
      duration: '2h 45m',
      image: 'https://images.unsplash.com/photo-1657763889378-9df569adac11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3NwaXRhbGl0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU2MzY0NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const achievements = [
    {
      id: 1,
      name: 'Course Completionist',
      description: 'Completed 10+ courses',
      icon: BookOpen,
      earned: true,
      earnedDate: 'December 2023'
    },
    {
      id: 2,
      name: 'Perfect Score',
      description: 'Achieved 100% on a course',
      icon: Star,
      earned: true,
      earnedDate: 'November 2023'
    },
    {
      id: 3,
      name: 'Community Contributor',
      description: 'Made 50+ community contributions',
      icon: Users,
      earned: true,
      earnedDate: 'January 2024'
    },
    {
      id: 4,
      name: 'Learning Streak Master',
      description: 'Maintained 30-day learning streak',
      icon: TrendingUp,
      earned: false,
      progress: 77
    }
  ];

  return (
    <div className="flex-1 bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-charcoal text-pearl px-4 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div>
              <h1 className="text-xl font-light mb-1">{user.name}</h1>
              <p className="text-pearl/80 text-sm">{user.role}</p>
              <p className="text-pearl/60 text-xs">{user.location} • Joined {user.joinDate}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-pearl hover:bg-pearl/10">
            <Settings size={20} />
          </Button>
        </div>

        <p className="text-pearl/90 text-sm mb-6">{user.bio}</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-light mb-1">{user.stats.coursesCompleted}</div>
            <div className="text-xs text-pearl/70">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-light mb-1">{user.stats.totalHours}</div>
            <div className="text-xs text-pearl/70">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-light mb-1">{user.stats.averageScore}%</div>
            <div className="text-xs text-pearl/70">Avg Score</div>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Custom Mobile-Optimized Tabs */}
        <div className="bg-muted rounded-xl p-1 mb-6">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'certifications'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="sm:hidden">Certs</span>
              <span className="hidden sm:inline">Certificates</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'courses'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'achievements'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="sm:hidden">Awards</span>
              <span className="hidden sm:inline">Achievements</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{cert.name}</h3>
                      {cert.verified && (
                        <Badge className="bg-sage text-white text-xs">
                          <Award size={10} className="mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Issued by {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cert.date} • Score: {cert.score}%
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download size={14} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 size={14} />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Credential ID: {cert.credentialId}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {completedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-sm mb-1">{course.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {course.duration}
                          </div>
                          <span>Completed {course.completedDate}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`text-xs ${
                          course.score >= 95 ? 'bg-sage text-white' : 
                          course.score >= 85 ? 'bg-gold text-navy' : 
                          'bg-muted text-muted-foreground'
                        }`}
                      >
                        {course.score}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className={`p-4 ${!achievement.earned ? 'opacity-60' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-full ${achievement.earned ? 'bg-gold/10' : 'bg-muted'}`}>
                      <Icon 
                        size={20} 
                        className={achievement.earned ? 'text-gold' : 'text-muted-foreground'} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{achievement.name}</h3>
                        {achievement.earned && (
                          <Badge className="bg-sage text-white text-xs">
                            <Trophy size={10} className="mr-1" />
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {achievement.earned ? (
                        <p className="text-xs text-muted-foreground">
                          Earned in {achievement.earnedDate}
                        </p>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">
                              Progress: {achievement.progress}%
                            </span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}