import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Search,
  Filter,
  MapPin,
  Building,
  UserPlus,
  MessageCircle,
  Star,
  Users,
  Briefcase,
  Globe,
  Award,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NetworkDiscoveryProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function NetworkDiscovery({ onBack, onNavigate }: NetworkDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock professional network data
  const professionals = [
    {
      id: 1,
      name: 'Catherine Laurent',
      role: 'Master Sommelier',
      company: 'Four Seasons Hotels',
      location: 'Paris, France',
      industry: 'Hospitality',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connections: 1247,
      mutualConnections: 23,
      verified: true,
      premium: true,
      specialties: ['Wine Service', 'Fine Dining', 'Hospitality Management'],
      connectionStatus: 'not_connected',
      distance: '2.5 km away',
      rating: 4.9,
      endorsements: 156
    },
    {
      id: 2,
      name: 'James Rodriguez',
      role: 'Private Butler',
      company: 'Elite Service Group',
      location: 'London, UK',
      industry: 'Private Service',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connections: 834,
      mutualConnections: 15,
      verified: true,
      premium: false,
      specialties: ['Private Service', 'Estate Management', 'Protocol'],
      connectionStatus: 'pending',
      distance: 'London',
      rating: 4.8,
      endorsements: 89
    },
    {
      id: 3,
      name: 'Marina Stevens',
      role: 'Yacht Captain',
      company: 'Superyacht Management',
      location: 'Monaco',
      industry: 'Maritime',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connections: 567,
      mutualConnections: 8,
      verified: true,
      premium: true,
      specialties: ['Yacht Management', 'Crew Training', 'Maritime Operations'],
      connectionStatus: 'connected',
      distance: 'Monaco',
      rating: 4.9,
      endorsements: 234
    },
    {
      id: 4,
      name: 'Sophie Chen',
      role: 'Wine Consultant',
      company: 'Independent',
      location: 'Hong Kong',
      industry: 'Wine & Spirits',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connections: 456,
      mutualConnections: 12,
      verified: false,
      premium: false,
      specialties: ['Wine Selection', 'Cellar Management', 'Tasting Events'],
      connectionStatus: 'not_connected',
      distance: 'Hong Kong',
      rating: 4.7,
      endorsements: 67
    },
    {
      id: 5,
      name: 'Alessandro Rossi',
      role: 'Concierge Director',
      company: 'Luxury Hotels International',
      location: 'Milan, Italy',
      industry: 'Hospitality',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connections: 923,
      mutualConnections: 31,
      verified: true,
      premium: true,
      specialties: ['Concierge Services', 'Guest Relations', 'VIP Management'],
      connectionStatus: 'not_connected',
      distance: 'Milan',
      rating: 4.8,
      endorsements: 145
    },
    {
      id: 6,
      name: 'Victoria Blackwood',
      role: 'Private Jet Flight Attendant',
      company: 'Premier Aviation',
      location: 'Dubai, UAE',
      industry: 'Aviation',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      connections: 678,
      mutualConnections: 19,
      verified: true,
      premium: false,
      specialties: ['Aviation Service', 'In-flight Service', 'Safety Protocols'],
      connectionStatus: 'not_connected',
      distance: 'Dubai',
      rating: 4.6,
      endorsements: 78
    }
  ];

  const industries = [
    { name: 'All Industries', value: 'all', count: professionals.length },
    { name: 'Hospitality', value: 'hospitality', count: 2 },
    { name: 'Private Service', value: 'private', count: 1 },
    { name: 'Maritime', value: 'maritime', count: 1 },
    { name: 'Aviation', value: 'aviation', count: 1 },
    { name: 'Wine & Spirits', value: 'wine', count: 1 }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'hospitality') return matchesSearch && prof.industry === 'Hospitality';
    if (activeFilter === 'private') return matchesSearch && prof.industry === 'Private Service';
    if (activeFilter === 'maritime') return matchesSearch && prof.industry === 'Maritime';
    if (activeFilter === 'aviation') return matchesSearch && prof.industry === 'Aviation';
    if (activeFilter === 'wine') return matchesSearch && prof.industry === 'Wine & Spirits';
    return matchesSearch;
  });

  const handleConnect = (professionalId: number) => {
    console.log('Connect with professional:', professionalId);
  };

  const handleMessage = (professional: any) => {
    onNavigate?.('chat', { user: professional });
  };

  const handleViewProfile = (professional: any) => {
    onNavigate?.('user-profile', { user: professional });
  };

  const getConnectionButton = (status: string, professionalId: number) => {
    switch (status) {
      case 'connected':
        return (
          <Button variant="outline" size="sm" disabled>
            <CheckCircle size={12} className="mr-1 text-green-500" />
            Connected
          </Button>
        );
      case 'pending':
        return (
          <Button variant="outline" size="sm" disabled>
            Pending
          </Button>
        );
      default:
        return (
          <Button 
            size="sm" 
            onClick={() => handleConnect(professionalId)}
            className="bg-navy hover:bg-navy/90 text-pearl"
          >
            <UserPlus size={12} className="mr-1" />
            Connect
          </Button>
        );
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
            <h1 className="font-medium text-sm">Discover Professionals</h1>
            <p className="text-xs text-muted-foreground">
              {filteredProfessionals.length} luxury service experts
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
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Industry Filters */}
        {showFilters && (
          <Card className="p-4 mb-4 border-none shadow-sm">
            <h3 className="font-medium text-sm mb-3">Filter by Industry</h3>
            <div className="grid grid-cols-2 gap-2">
              {industries.map((industry) => (
                <button
                  key={industry.value}
                  onClick={() => setActiveFilter(industry.value)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    activeFilter === industry.value
                      ? 'bg-navy text-pearl'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="text-sm font-medium">{industry.name}</div>
                  <div className="text-xs opacity-80">{industry.count} professionals</div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Suggested Connections */}
        <Card className="p-4 mb-6 border-none shadow-sm bg-gold/5">
          <h3 className="font-medium text-sm mb-2">Recommended for You</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Based on your interests and professional background
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Star size={12} className="mr-1" />
              View All
            </Button>
          </div>
        </Card>

        {/* Professionals List */}
        <div className="space-y-4">
          {filteredProfessionals.map((professional) => (
            <Card 
              key={professional.id} 
              className="p-4 border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewProfile(professional)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <ImageWithFallback
                      src={professional.avatar}
                      alt={professional.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  {professional.premium && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                      <Star size={10} className="text-navy" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm truncate">{professional.name}</h3>
                    {professional.verified && (
                      <CheckCircle size={14} className="text-blue-500 flex-shrink-0" />
                    )}
                    {professional.premium && (
                      <Badge className="bg-gold text-navy text-xs">Premium</Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-1">{professional.role}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Building size={10} />
                      {professional.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} />
                      {professional.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Users size={10} />
                      {professional.connections} connections
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe size={10} />
                      {professional.mutualConnections} mutual
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="fill-current text-gold" />
                      {professional.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {professional.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {professional.specialties.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{professional.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <Award size={10} className="inline mr-1" />
                      {professional.endorsements} endorsements
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMessage(professional);
                        }}
                      >
                        <MessageCircle size={12} />
                      </Button>
                      <div onClick={(e) => e.stopPropagation()}>
                        {getConnectionButton(professional.connectionStatus, professional.id)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No professionals found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters to find more professionals.
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredProfessionals.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline">
              Load More Professionals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}