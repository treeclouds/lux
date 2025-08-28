import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Users,
  MessageCircle,
  UserPlus,
  Share2,
  Trophy,
  Star,
  Heart,
  MoreHorizontal,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  data: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function UserProfile({ data, onBack, onNavigate }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(data?.user?.following || false);
  const [activeTab, setActiveTab] = useState('posts');

  if (!data) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>User not found</p>
      </div>
    );
  }

  const user = data.user;

  // Mock user data
  const userStats = {
    posts: 24,
    followers: 186,
    following: 98,
    likes: 452
  };

  const userPosts = [
    {
      id: 1,
      content: 'Just completed a masterclass on vintage champagne service. The key to proper Dom Pérignon presentation is understanding the terroir and vintage characteristics...',
      timestamp: '2 days ago',
      likes: 23,
      replies: 8,
      category: 'Wine Service'
    },
    {
      id: 2,
      content: 'Working on a yacht in rough seas taught me the importance of adapting service techniques. Here are my top 5 tips for maintaining elegance during challenging conditions...',
      timestamp: '1 week ago',
      likes: 67,
      replies: 15,
      category: 'Yacht Service'
    },
    {
      id: 3,
      content: 'The art of silent service - how to anticipate guest needs without being intrusive. This is perhaps the most difficult skill to master in luxury hospitality...',
      timestamp: '2 weeks ago',
      likes: 89,
      replies: 23,
      category: 'Service Excellence'
    }
  ];

  const achievements = [
    {
      title: 'Master Sommelier',
      description: 'Court of Master Sommeliers',
      date: '2019',
      verified: true
    },
    {
      title: 'Luxury Service Excellence',
      description: 'Affluent Institute Certification',
      date: '2020',
      verified: true
    },
    {
      title: 'Wine & Spirit Education Trust',
      description: 'Level 4 Diploma',
      date: '2018',
      verified: true
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    onNavigate?.('chat', { user });
  };

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-medium text-sm">{user.name}</h1>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="px-4 py-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-medium text-lg">{user.name}</h2>
                {user.certified && (
                  <div className="flex items-center gap-1">
                    <Shield size={16} className="text-gold" />
                    <Badge variant="secondary" className="text-xs">
                      Certified
                    </Badge>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-2">{user.role}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {user.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined March 2020
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleFollow}
                  size="sm"
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? '' : 'bg-navy hover:bg-navy/90 text-pearl'}
                >
                  {isFollowing ? (
                    'Following'
                  ) : (
                    <>
                      <UserPlus size={12} className="mr-1" />
                      Follow
                    </>
                  )}
                </Button>
                <Button onClick={handleMessage} variant="outline" size="sm">
                  <MessageCircle size={12} className="mr-1" />
                  Message
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 size={12} />
                </Button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm mb-4">
            Passionate about delivering exceptional luxury service experiences. 15+ years in yacht hospitality and fine wine service. Always learning, always sharing knowledge with the community.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="font-medium">{userStats.posts}</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
            <div className="text-center cursor-pointer hover:bg-muted/30 rounded p-1 -m-1 transition-colors">
              <div className="font-medium">{userStats.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="text-center cursor-pointer hover:bg-muted/30 rounded p-1 -m-1 transition-colors">
              <div className="font-medium">{userStats.following}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{userStats.likes}</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tabs */}
        <div className="px-4 pt-4">
          <div className="flex gap-6 mb-4">
            <button
              onClick={() => setActiveTab('posts')}
              className={`pb-2 text-sm transition-colors border-b-2 ${
                activeTab === 'posts'
                  ? 'border-navy text-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`pb-2 text-sm transition-colors border-b-2 ${
                activeTab === 'achievements'
                  ? 'border-navy text-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-2 text-sm transition-colors border-b-2 ${
                activeTab === 'activity'
                  ? 'border-navy text-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pb-6">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <Card key={post.id} className="p-4 border-none shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <p className="text-sm mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {post.replies}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4 border-none shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy size={16} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{achievement.title}</h3>
                        {achievement.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Star size={10} className="mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <Card className="p-4 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-red-500" />
                  <span className="text-sm">Liked a post about vintage watch authentication</span>
                </div>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </Card>
              <Card className="p-4 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle size={14} className="text-blue-500" />
                  <span className="text-sm">Replied to a discussion about champagne service</span>
                </div>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </Card>
              <Card className="p-4 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={14} className="text-green-500" />
                  <span className="text-sm">Started following Marina Stevens</span>
                </div>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}