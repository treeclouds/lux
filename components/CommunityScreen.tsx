import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
// Removed Tabs import - using custom solution
import { MessageCircle, Heart, Share2, Plus, Search, TrendingUp, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommunityScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export function CommunityScreen({ onNavigate }: CommunityScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: 'Best practices for serving Dom Pérignon vintage champagne',
      author: {
        name: 'Marcus Chen',
        role: 'Yacht Sommelier',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true
      },
      content: 'I\'ve been working on perfecting my champagne service, particularly with Dom Pérignon vintage bottles. What temperature and glassware do you recommend for optimal presentation?',
      category: 'Wine Service',
      timestamp: '2 hours ago',
      replies: 12,
      likes: 28,
      trending: true,
      tags: ['champagne', 'service', 'temperature']
    },
    {
      id: 2,
      title: 'Client privacy protocols in private aviation',
      author: {
        name: 'Sarah Mitchell',
        role: 'Flight Attendant',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true
      },
      content: 'How do you maintain discretion when serving high-profile clients? Looking for best practices on confidentiality and professional boundaries.',
      category: 'Professional Ethics',
      timestamp: '4 hours ago',
      replies: 18,
      likes: 45,
      trending: false,
      tags: ['privacy', 'aviation', 'ethics']
    },
    {
      id: 3,
      title: 'Authenticating vintage Rolex Submariner watches',
      author: {
        name: 'Isabella Romano',
        role: 'Watch Specialist',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true
      },
      content: 'What are the key indicators to look for when authenticating a 1960s Rolex Submariner? I\'ve compiled a checklist but would love expert input.',
      category: 'Authentication',
      timestamp: '1 day ago',
      replies: 23,
      likes: 67,
      trending: true,
      tags: ['rolex', 'authentication', 'vintage']
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Luxury Service Excellence Summit 2024',
      date: 'March 15-17, 2024',
      location: 'Monaco',
      type: 'Conference',
      attendees: 245,
      status: 'upcoming',
      featured: true,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NjM2NDYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      title: 'Virtual Wine Tasting Masterclass',
      date: 'February 28, 2024',
      location: 'Online',
      type: 'Workshop',
      attendees: 89,
      status: 'upcoming',
      featured: false,
      image: 'https://images.unsplash.com/photo-1709747820764-ce13895aff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NTYzNjQ1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      title: 'Private Jet Service Training',
      date: 'March 8, 2024',
      location: 'London, UK',
      type: 'Training',
      attendees: 32,
      status: 'upcoming',
      featured: false,
      image: 'https://images.unsplash.com/photo-1660829542102-1b6c3b6b4b0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwamV0fGVufDF8fHx8MTc1NjM2NDYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      title: 'Yacht Service Networking Evening',
      date: 'February 22, 2024',
      location: 'Cannes, France',
      type: 'Networking',
      attendees: 156,
      status: 'upcoming',
      featured: false,
      image: 'https://images.unsplash.com/photo-1710862681764-24b7a8c2d5c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNlcnZpY2V8ZW58MXx8fHwxNzU2MzY0NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const connections = [
    {
      id: 1,
      name: 'Jean-Claude Dubois',
      role: 'Master Sommelier',
      location: 'Paris, France',
      mutual: 12,
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Captain Marina Stevens',
      role: 'Yacht Captain',
      location: 'Monte Carlo, Monaco',
      mutual: 8,
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="flex-1 bg-background pb-20">
      {/* Header */}
      <div className="bg-navy text-pearl px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-light">Community</h1>
          <Button size="sm" className="bg-gold text-navy hover:bg-gold/90">
            <Plus size={16} className="mr-2" />
            New Post
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pearl/60" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-pearl/10 border-pearl/20 text-pearl placeholder:text-pearl/60"
          />
        </div>
      </div>

      <div className="px-4">
        {/* Custom Mobile-Optimized Tabs */}
        <div className="bg-muted rounded-xl p-1 mb-6">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'discussions'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="sm:hidden">Posts</span>
              <span className="hidden sm:inline">Discussions</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'events'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                activeTab === 'network'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Network
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card 
                key={discussion.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate?.('post-detail', discussion)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <ImageWithFallback
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{discussion.author.name}</h3>
                        {discussion.author.certified && (
                          <Badge variant="secondary" className="text-xs">
                            Certified
                          </Badge>
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-muted-foreground text-xs">{discussion.timestamp}</span>
                      {discussion.trending && (
                        <>
                          <span className="text-muted-foreground text-xs">·</span>
                          <Badge className="bg-gold text-navy text-xs">
                            <TrendingUp size={10} className="mr-1" />
                            Trending
                          </Badge>
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs mb-2">{discussion.author.role}</p>
                    <h2 className="font-medium text-sm mb-2">{discussion.title}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                    
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {discussion.category}
                      </Badge>
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <button 
                          className="flex items-center gap-1 text-xs hover:text-foreground transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.('post-detail', discussion);
                          }}
                        >
                          <MessageCircle size={14} />
                          {discussion.replies} replies
                        </button>
                        <button 
                          className="flex items-center gap-1 text-xs hover:text-foreground transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.('post-likes', { 
                              postId: discussion.id, 
                              likes: discussion.likes,
                              title: discussion.title 
                            });
                          }}
                        >
                          <Heart size={14} />
                          {discussion.likes} likes
                        </button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle share logic
                        }}
                      >
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {/* Featured Event */}
            {events.filter(event => event.featured).map((event) => (
              <Card 
                key={event.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border-gold/30 bg-gradient-to-r from-gold/5 to-transparent"
                onClick={() => onNavigate?.('event-detail', { 
                  ...event, 
                  price: event.type === 'Conference' ? '€2,850' : event.type === 'Training' ? '€450' : 'Free' 
                })}
              >
                <div className="relative h-40">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gold text-navy">
                      Featured
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <button 
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate?.('event-attendees', { 
                          eventId: event.id, 
                          title: event.title,
                          attendees: event.attendees 
                        });
                      }}
                    >
                      <Users size={12} />
                      {event.attendees} attending
                    </button>
                  </div>
                  <h3 className="font-medium mb-2">{event.title}</h3>
                  <div className="text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock size={12} />
                      {event.date}
                    </div>
                    <div>{event.location}</div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-navy hover:bg-navy/90 text-pearl"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate?.('event-detail', { 
                        ...event, 
                        price: event.type === 'Conference' ? '€2,850' : event.type === 'Training' ? '€450' : 'Free' 
                      });
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}

            {/* Regular Events */}
            {events.filter(event => !event.featured).map((event) => (
              <Card 
                key={event.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate?.('event-detail', { 
                  ...event, 
                  price: event.type === 'Conference' ? '€2,850' : event.type === 'Training' ? '€450' : 'Free' 
                })}
              >
                <div className="h-32">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <button 
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate?.('event-attendees', { 
                          eventId: event.id, 
                          title: event.title,
                          attendees: event.attendees 
                        });
                      }}
                    >
                      <Users size={12} />
                      {event.attendees} attending
                    </button>
                  </div>
                  <h3 className="font-medium mb-2">{event.title}</h3>
                  <div className="text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock size={12} />
                      {event.date}
                    </div>
                    <div>{event.location}</div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate?.('event-detail', { 
                        ...event, 
                        price: event.type === 'Conference' ? '€2,850' : event.type === 'Training' ? '€450' : 'Free' 
                      });
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}

            {/* Event Discovery */}
            <Card className="p-6 text-center border-dashed border-muted-foreground/20">
              <h3 className="font-medium mb-2">Discover More Events</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Stay updated with the latest luxury service events and workshops
              </p>
              <Button variant="outline">Browse All Events</Button>
            </Card>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-4">
            {/* Network Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-none shadow-sm"
                onClick={() => onNavigate?.('network-discovery')}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-navy/10 rounded-full flex items-center justify-center">
                    <Search size={20} className="text-navy" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">Discover</h3>
                  <p className="text-xs text-muted-foreground">Find professionals</p>
                </div>
              </Card>
              
              <Card 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-none shadow-sm"
                onClick={() => onNavigate?.('connection-requests')}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gold/10 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-gold" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">Requests</h3>
                  <p className="text-xs text-muted-foreground">Pending connections</p>
                </div>
              </Card>
            </div>

            {/* Network Stats */}
            <Card className="p-4 border-none shadow-sm">
              <h3 className="font-medium text-sm mb-3">Your Network</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-medium">324</div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">47</div>
                  <div className="text-xs text-muted-foreground">Industries</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">12</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
              </div>
            </Card>

            {/* Recent Connections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">Recent Connections</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => onNavigate?.('network-discovery')}
                >
                  View All
                </Button>
              </div>
              
              {connections.map((connection) => (
                <Card key={connection.id} className="p-4 mb-3 border-none shadow-sm">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      className="w-12 h-12 cursor-pointer"
                      onClick={() => onNavigate?.('user-profile', { user: connection })}
                    >
                      <ImageWithFallback
                        src={connection.avatar}
                        alt={connection.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <h3 
                        className="font-medium cursor-pointer hover:text-navy transition-colors"
                        onClick={() => onNavigate?.('user-profile', { user: connection })}
                      >
                        {connection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{connection.role}</p>
                      <p className="text-xs text-muted-foreground">{connection.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {connection.mutual} mutual connections
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <MessageCircle size={14} />
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        Connected
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Network Growth */}
            <Card className="p-4 border-none shadow-sm bg-gradient-to-r from-navy/5 to-gold/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} className="text-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-1">Grow Your Network</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Connect with 5 more professionals this week to unlock network insights and recommendations.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate?.('network-discovery')}
                      className="bg-navy hover:bg-navy/90 text-pearl"
                    >
                      Find People
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onNavigate?.('my-network')}
                    >
                      My Network
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Industry Insights */}
            <Card className="p-4 border-none shadow-sm">
              <h3 className="font-medium text-sm mb-3">Network Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-navy rounded-full"></div>
                    <span className="text-sm">Hospitality</span>
                  </div>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span className="text-sm">Private Service</span>
                  </div>
                  <span className="text-sm text-muted-foreground">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-sage rounded-full"></div>
                    <span className="text-sm">Maritime</span>
                  </div>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky rounded-full"></div>
                    <span className="text-sm">Aviation</span>
                  </div>
                  <span className="text-sm text-muted-foreground">12%</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}