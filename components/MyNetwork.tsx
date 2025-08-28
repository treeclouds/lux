import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Search,
  Users,
  MessageCircle,
  UserPlus,
  Filter,
  MapPin,
  Building,
  Star,
  TrendingUp,
  Globe,
  Calendar,
  Award,
  MoreHorizontal
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyNetworkProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function MyNetwork({ onBack, onNavigate }: MyNetworkProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'recent', 'frequent', 'industry'
  const [showFilters, setShowFilters] = useState(false);

  // Mock connections data
  const connections = [
    {
      id: 1,
      name: 'Catherine Laurent',
      role: 'Master Sommelier',
      company: 'Four Seasons Hotels',
      location: 'Paris, France',
      industry: 'Hospitality',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connectedDate: '2023-01-15',
      lastInteraction: '2 days ago',
      mutualConnections: 23,
      verified: true,
      premium: true,
      connectionStrength: 'strong',
      specialties: ['Wine Service', 'Fine Dining'],
      status: 'active'
    },
    {
      id: 2,
      name: 'James Rodriguez',
      role: 'Private Butler',
      company: 'Elite Service Group',
      location: 'London, UK',
      industry: 'Private Service',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connectedDate: '2023-03-22',
      lastInteraction: '1 week ago',
      mutualConnections: 15,
      verified: true,
      premium: false,
      connectionStrength: 'medium',
      specialties: ['Estate Management', 'Protocol'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Marina Stevens',
      role: 'Yacht Captain',
      company: 'Superyacht Management',
      location: 'Monaco',
      industry: 'Maritime',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connectedDate: '2023-02-10',
      lastInteraction: '3 days ago',
      mutualConnections: 8,
      verified: true,
      premium: true,
      connectionStrength: 'strong',
      specialties: ['Yacht Management', 'Crew Training'],
      status: 'active'
    },
    {
      id: 4,
      name: 'Sophie Chen',
      role: 'Wine Consultant',
      company: 'Independent',
      location: 'Hong Kong',
      industry: 'Wine & Spirits',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connectedDate: '2023-04-05',
      lastInteraction: '2 weeks ago',
      mutualConnections: 12,
      verified: false,
      premium: false,
      connectionStrength: 'weak',
      specialties: ['Wine Selection', 'Cellar Management'],
      status: 'dormant'
    },
    {
      id: 5,
      name: 'Alessandro Rossi',
      role: 'Concierge Director',
      company: 'Luxury Hotels International',
      location: 'Milan, Italy',
      industry: 'Hospitality',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connectedDate: '2023-05-18',
      lastInteraction: '1 day ago',
      mutualConnections: 31,
      verified: true,
      premium: true,
      connectionStrength: 'strong',
      specialties: ['Concierge Services', 'VIP Management'],
      status: 'active'
    }
  ];

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'recent') return matchesSearch && connection.lastInteraction.includes('day');
    if (filter === 'frequent') return matchesSearch && connection.connectionStrength === 'strong';
    if (filter === 'industry') return matchesSearch && connection.industry === 'Hospitality';
    return matchesSearch;
  });

  const networkStats = {
    totalConnections: connections.length,
    newThisMonth: 12,
    industries: 8,
    countries: 15,
    strongConnections: connections.filter(c => c.connectionStrength === 'strong').length,
    recentActivity: connections.filter(c => c.lastInteraction.includes('day')).length
  };

  const handleMessage = (connection: any) => {
    onNavigate?.('chat', { user: connection });
  };

  const handleViewProfile = (connection: any) => {
    onNavigate?.('user-profile', { user: connection });
  };

  const getConnectionStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'weak': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'strong': return <Badge className="bg-green-100 text-green-700 text-xs">Strong</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-700 text-xs">Medium</Badge>;
      case 'weak': return <Badge className="bg-red-100 text-red-700 text-xs">Weak</Badge>;
      default: return null;
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
            <h1 className="font-medium text-sm">My Network</h1>
            <p className="text-xs text-muted-foreground">
              {networkStats.totalConnections} connections
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Network Overview Stats */}
        <Card className="p-4 mb-6 border-none shadow-sm">
          <h3 className="font-medium text-sm mb-4">Network Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-medium">{networkStats.totalConnections}</div>
              <div className="text-xs text-muted-foreground">Total Connections</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium text-green-600">+{networkStats.newThisMonth}</div>
              <div className="text-xs text-muted-foreground">New This Month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">{networkStats.strongConnections}</div>
              <div className="text-xs text-muted-foreground">Strong Connections</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">{networkStats.recentActivity}</div>
              <div className="text-xs text-muted-foreground">Active This Week</div>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="p-4 mb-4 border-none shadow-sm">
            <h3 className="font-medium text-sm mb-3">Filter Connections</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filter === 'all'
                    ? 'bg-navy text-pearl'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                All ({connections.length})
              </button>
              <button
                onClick={() => setFilter('recent')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filter === 'recent'
                    ? 'bg-navy text-pearl'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Recent Activity ({networkStats.recentActivity})
              </button>
              <button
                onClick={() => setFilter('frequent')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filter === 'frequent'
                    ? 'bg-navy text-pearl'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Strong Connections ({networkStats.strongConnections})
              </button>
              <button
                onClick={() => setFilter('industry')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filter === 'industry'
                    ? 'bg-navy text-pearl'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Hospitality
              </button>
            </div>
          </Card>
        )}

        {/* Connections List */}
        <div className="space-y-4">
          {filteredConnections.map((connection) => (
            <Card 
              key={connection.id} 
              className="p-4 border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewProfile(connection)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-14 h-14">
                    <ImageWithFallback
                      src={connection.avatar}
                      alt={connection.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  {connection.premium && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                      <Star size={10} className="text-navy" />
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                    connection.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm truncate">{connection.name}</h3>
                    {connection.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                    {getConnectionStrengthBadge(connection.connectionStrength)}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-1">{connection.role}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Building size={10} />
                      {connection.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} />
                      {connection.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Users size={10} />
                      {connection.mutualConnections} mutual
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      Connected {new Date(connection.connectedDate).getFullYear()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe size={10} />
                      Last: {connection.lastInteraction}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {connection.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Industry: {connection.industry}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMessage(connection);
                        }}
                      >
                        <MessageCircle size={12} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No connections found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button onClick={() => onNavigate?.('network-discovery')}>
              <UserPlus size={16} className="mr-2" />
              Find New Connections
            </Button>
          </div>
        )}

        {/* Network Growth Suggestions */}
        <Card className="mt-6 p-4 border-none shadow-sm bg-gradient-to-r from-navy/5 to-gold/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp size={16} className="text-navy" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm mb-1">Strengthen Your Network</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Reach out to dormant connections or discover new professionals in your field.
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => onNavigate?.('network-discovery')}
                  className="bg-navy hover:bg-navy/90 text-pearl"
                >
                  Discover More
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate?.('connection-requests')}
                >
                  View Requests
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}