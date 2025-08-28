import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Heart, 
  Search,
  UserPlus,
  MessageCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostLikesProps {
  data: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function PostLikes({ data, onBack, onNavigate }: PostLikesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'following', 'certified'

  if (!data) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Data not found</p>
      </div>
    );
  }

  // Mock data for likes - in real app this would come from the API
  const likes = [
    {
      id: 1,
      user: {
        name: 'Sommelier Catherine Laurent',
        role: 'Master Sommelier',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true,
        following: false,
        location: 'Paris, France'
      },
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Alexandre Dubois',
        role: 'Yacht Steward',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: false,
        following: true,
        location: 'Monaco'
      },
      timestamp: '3 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'Marina Blackwell',
        role: 'Chief Stewardess',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true,
        following: false,
        location: 'Nice, France'
      },
      timestamp: '4 hours ago'
    },
    {
      id: 4,
      user: {
        name: 'James Rodriguez',
        role: 'Butler',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: false,
        following: false,
        location: 'London, UK'
      },
      timestamp: '5 hours ago'
    },
    {
      id: 5,
      user: {
        name: 'Sophie Chen',
        role: 'Wine Consultant',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true,
        following: true,
        location: 'Hong Kong'
      },
      timestamp: '6 hours ago'
    }
  ];

  const filteredLikes = likes.filter(like => {
    const matchesSearch = like.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         like.user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'following') return matchesSearch && like.user.following;
    if (filter === 'certified') return matchesSearch && like.user.certified;
    return matchesSearch;
  });

  const handleToggleFollow = (userId: number) => {
    // Handle follow/unfollow logic
    console.log('Toggle follow for user:', userId);
  };

  const handleUserProfile = (user: any) => {
    onNavigate?.('user-profile', { user });
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
            <h1 className="font-medium text-sm">Liked by {data.likes}</h1>
            <p className="text-xs text-muted-foreground truncate">{data.title}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              filter === 'all'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            All ({likes.length})
          </button>
          <button
            onClick={() => setFilter('following')}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              filter === 'following'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Following ({likes.filter(l => l.user.following).length})
          </button>
          <button
            onClick={() => setFilter('certified')}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              filter === 'certified'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Certified ({likes.filter(l => l.user.certified).length})
          </button>
        </div>

        {/* Likes List */}
        <div className="space-y-3">
          {filteredLikes.map((like) => (
            <Card 
              key={like.id} 
              className="p-4 border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleUserProfile(like.user)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <ImageWithFallback
                        src={like.user.avatar}
                        alt={like.user.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-50 border-2 border-background rounded-full flex items-center justify-center">
                      <Heart size={10} className="text-red-500 fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{like.user.name}</h3>
                      {like.user.certified && (
                        <Badge variant="secondary" className="text-xs">
                          Certified
                        </Badge>
                      )}
                      {like.user.following && (
                        <Badge variant="outline" className="text-xs">
                          Following
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">{like.user.role}</p>
                    <p className="text-muted-foreground text-xs">{like.user.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {like.timestamp}
                  </span>
                  <Button
                    variant={like.user.following ? "outline" : "default"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFollow(like.id);
                    }}
                    className={like.user.following ? '' : 'bg-navy hover:bg-navy/90 text-pearl'}
                  >
                    {like.user.following ? (
                      'Following'
                    ) : (
                      <>
                        <UserPlus size={12} className="mr-1" />
                        Follow
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLikes.length === 0 && (
          <div className="text-center py-8">
            <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No likes found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms.' : 'No one has liked this post yet.'}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-medium text-sm mb-4">Discover Similar Discussions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start">
              <MessageCircle size={14} className="mr-2" />
              View Comments
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Heart size={14} className="mr-2" />
              Like Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}