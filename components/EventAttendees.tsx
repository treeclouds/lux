import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Search,
  Users,
  UserPlus,
  MessageCircle,
  MapPin,
  Building,
  Filter,
  Crown,
  Star
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventAttendeesProps {
  data: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function EventAttendees({ data, onBack, onNavigate }: EventAttendeesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'speakers', 'vip', 'following'

  if (!data) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Event not found</p>
      </div>
    );
  }

  // Mock attendees data
  const attendees = [
    {
      id: 1,
      name: 'Catherine Laurent',
      role: 'Master Sommelier',
      company: 'Four Seasons Hotels',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'speaker',
      following: false,
      connected: false,
      verified: true,
      attendeesSince: '2019'
    },
    {
      id: 2,
      name: 'James Rodriguez',
      role: 'Private Butler',
      company: 'Elite Service Group',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'vip',
      following: true,
      connected: false,
      verified: false,
      attendeesSince: '2020'
    },
    {
      id: 3,
      name: 'Marina Stevens',
      role: 'Yacht Captain',
      company: 'Superyacht Management',
      location: 'Monaco',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'speaker',
      following: false,
      connected: true,
      verified: true,
      attendeesSince: '2018'
    },
    {
      id: 4,
      name: 'Sophie Chen',
      role: 'Wine Consultant',
      company: 'Independent',
      location: 'Hong Kong',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'regular',
      following: true,
      connected: false,
      verified: true,
      attendeesSince: '2021'
    },
    {
      id: 5,
      name: 'Alexandre Dubois',
      role: 'Yacht Steward',
      company: 'Mediterranean Yachts',
      location: 'Nice, France',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'regular',
      following: false,
      connected: false,
      verified: false,
      attendeesSince: '2023'
    },
    {
      id: 6,
      name: 'Isabella Romano',
      role: 'Watch Specialist',
      company: 'Luxury Timepieces',
      location: 'Milan, Italy',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'vip',
      following: false,
      connected: false,
      verified: true,
      attendeesSince: '2019'
    }
  ];

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'speakers') return matchesSearch && attendee.type === 'speaker';
    if (filter === 'vip') return matchesSearch && attendee.type === 'vip';
    if (filter === 'following') return matchesSearch && attendee.following;
    return matchesSearch;
  });

  const handleConnect = (attendeeId: number) => {
    console.log('Connect with attendee:', attendeeId);
  };

  const handleMessage = (attendee: any) => {
    onNavigate?.('chat', { user: attendee });
  };

  const handleViewProfile = (attendee: any) => {
    onNavigate?.('user-profile', { user: attendee });
  };

  const getAttendeeTypeIcon = (type: string) => {
    switch (type) {
      case 'speaker':
        return <Star size={12} className="text-gold" />;
      case 'vip':
        return <Crown size={12} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const getAttendeeTypeBadge = (type: string) => {
    switch (type) {
      case 'speaker':
        return <Badge className="bg-gold text-navy text-xs">Speaker</Badge>;
      case 'vip':
        return <Badge className="bg-purple-100 text-purple-700 text-xs">VIP</Badge>;
      default:
        return null;
    }
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
            <h1 className="font-medium text-sm">Event Attendees</h1>
            <p className="text-xs text-muted-foreground">{data.attendees} people attending</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search attendees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            All ({attendees.length})
          </button>
          <button
            onClick={() => setFilter('speakers')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              filter === 'speakers'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Star size={10} className="mr-1 inline" />
            Speakers ({attendees.filter(a => a.type === 'speaker').length})
          </button>
          <button
            onClick={() => setFilter('vip')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              filter === 'vip'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Crown size={10} className="mr-1 inline" />
            VIP ({attendees.filter(a => a.type === 'vip').length})
          </button>
          <button
            onClick={() => setFilter('following')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              filter === 'following'
                ? 'bg-navy text-pearl'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Following ({attendees.filter(a => a.following).length})
          </button>
        </div>

        {/* Attendees List */}
        <div className="space-y-3">
          {filteredAttendees.map((attendee) => (
            <Card 
              key={attendee.id} 
              className="p-4 border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewProfile(attendee)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <ImageWithFallback
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    {attendee.type !== 'regular' && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border-2 border-background rounded-full flex items-center justify-center">
                        {getAttendeeTypeIcon(attendee.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{attendee.name}</h3>
                      {attendee.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      {getAttendeeTypeBadge(attendee.type)}
                      {attendee.following && (
                        <Badge variant="outline" className="text-xs">
                          Following
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{attendee.role}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Building size={10} />
                        {attendee.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={10} />
                        {attendee.location}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Attending since {attendee.attendeesSince}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessage(attendee);
                    }}
                  >
                    <MessageCircle size={12} />
                  </Button>
                  <Button
                    variant={attendee.connected ? "outline" : "default"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConnect(attendee.id);
                    }}
                    className={attendee.connected ? '' : 'bg-navy hover:bg-navy/90 text-pearl'}
                  >
                    {attendee.connected ? (
                      'Connected'
                    ) : (
                      <>
                        <UserPlus size={12} className="mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No attendees found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms.' : 'No attendees match your current filter.'}
            </p>
          </div>
        )}

        {/* Networking Suggestions */}
        {filter === 'all' && !searchQuery && (
          <Card className="mt-6 p-4 border-none shadow-sm bg-gold/5">
            <h3 className="font-medium mb-2">Networking Opportunities</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect with professionals in your field and expand your network at this event.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setFilter('speakers')}>
                Meet Speakers
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter('vip')}>
                VIP Attendees
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}