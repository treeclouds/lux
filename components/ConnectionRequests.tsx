import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { 
  ArrowLeft, 
  UserPlus,
  UserMinus,
  MessageCircle,
  CheckCircle,
  X,
  Clock,
  Users,
  Send
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ConnectionRequestsProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function ConnectionRequests({ onBack, onNavigate }: ConnectionRequestsProps) {
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'sent'

  // Mock connection requests data
  const receivedRequests = [
    {
      id: 1,
      user: {
        name: 'Elena Rodriguez',
        role: 'Luxury Travel Advisor',
        company: 'Platinum Journeys',
        location: 'Barcelona, Spain',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: true,
        connections: 456
      },
      message: 'Hi! I noticed we both work in luxury service and would love to connect and share experiences.',
      timestamp: '2 hours ago',
      mutualConnections: 8
    },
    {
      id: 2,
      user: {
        name: 'Marcus Thompson',
        role: 'Estate Manager',
        company: 'Heritage Properties',
        location: 'Cotswolds, UK',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: false,
        connections: 234
      },
      message: 'Your insights on champagne service were excellent. I manage several estates with extensive wine cellars and would value your expertise.',
      timestamp: '1 day ago',
      mutualConnections: 3
    },
    {
      id: 3,
      user: {
        name: 'Anastasia Volkov',
        role: 'Private Chef',
        company: 'Culinary Excellence',
        location: 'Geneva, Switzerland',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: true,
        connections: 789
      },
      message: 'I cook for high-net-worth clients and often need wine pairing advice. Your sommelier expertise would be invaluable.',
      timestamp: '2 days ago',
      mutualConnections: 12
    },
    {
      id: 4,
      user: {
        name: 'Ahmed Al-Rashid',
        role: 'Concierge Manager',
        company: 'Seven Stars Hotel',
        location: 'Dubai, UAE',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: true,
        connections: 567
      },
      message: 'We work with many yacht charter clients. Would love to discuss best practices in luxury hospitality.',
      timestamp: '3 days ago',
      mutualConnections: 15
    }
  ];

  const sentRequests = [
    {
      id: 1,
      user: {
        name: 'Isabella Romano',
        role: 'Watch Specialist',
        company: 'Luxury Timepieces',
        location: 'Milan, Italy',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: true,
        connections: 345
      },
      sentDate: '1 day ago',
      status: 'pending'
    },
    {
      id: 2,
      user: {
        name: 'Sebastian Clarke',
        role: 'Art Advisor',
        company: 'Fine Arts Consulting',
        location: 'New York, USA',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: false,
        connections: 678
      },
      sentDate: '3 days ago',
      status: 'pending'
    },
    {
      id: 3,
      user: {
        name: 'Francine Dubois',
        role: 'Personal Shopper',
        company: 'Luxury Lifestyle',
        location: 'Monaco',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        verified: true,
        connections: 234
      },
      sentDate: '1 week ago',
      status: 'viewed'
    }
  ];

  const handleAcceptRequest = (requestId: number) => {
    console.log('Accept request:', requestId);
    // Handle accept logic
  };

  const handleDeclineRequest = (requestId: number) => {
    console.log('Decline request:', requestId);
    // Handle decline logic
  };

  const handleWithdrawRequest = (requestId: number) => {
    console.log('Withdraw request:', requestId);
    // Handle withdraw logic
  };

  const handleMessage = (user: any) => {
    onNavigate?.('chat', { user });
  };

  const handleViewProfile = (user: any) => {
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
            <h1 className="font-medium text-sm">Connection Requests</h1>
            <p className="text-xs text-muted-foreground">
              Manage your professional connections
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('received')}
            className={`pb-2 text-sm transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'received'
                ? 'border-navy text-foreground'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <UserPlus size={14} />
            Received ({receivedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`pb-2 text-sm transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'sent'
                ? 'border-navy text-foreground'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <Send size={14} />
            Sent ({sentRequests.length})
          </button>
        </div>

        {/* Received Requests */}
        {activeTab === 'received' && (
          <div className="space-y-4">
            {receivedRequests.length > 0 ? (
              receivedRequests.map((request) => (
                <Card 
                  key={request.id} 
                  className="p-4 border-none shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Avatar 
                      className="w-14 h-14 cursor-pointer"
                      onClick={() => handleViewProfile(request.user)}
                    >
                      <ImageWithFallback
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 
                          className="font-medium text-sm cursor-pointer hover:text-navy transition-colors"
                          onClick={() => handleViewProfile(request.user)}
                        >
                          {request.user.name}
                        </h3>
                        {request.user.verified && (
                          <CheckCircle size={14} className="text-blue-500" />
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1">
                        {request.user.role} at {request.user.company}
                      </p>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {request.user.location} • {request.user.connections} connections
                      </p>

                      {request.mutualConnections > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <Users size={10} />
                          {request.mutualConnections} mutual connections
                        </div>
                      )}

                      {request.message && (
                        <div className="bg-muted/30 p-3 rounded-lg mb-3">
                          <p className="text-sm">{request.message}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} />
                          {request.timestamp}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMessage(request.user)}
                          >
                            <MessageCircle size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            <X size={12} className="mr-1" />
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-navy hover:bg-navy/90 text-pearl"
                          >
                            <CheckCircle size={12} className="mr-1" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <UserPlus size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No pending requests</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have any pending connection requests at the moment.
                </p>
                <Button onClick={() => onNavigate?.('network-discovery')}>
                  Discover Professionals
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Sent Requests */}
        {activeTab === 'sent' && (
          <div className="space-y-4">
            {sentRequests.length > 0 ? (
              sentRequests.map((request) => (
                <Card 
                  key={request.id} 
                  className="p-4 border-none shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Avatar 
                      className="w-14 h-14 cursor-pointer"
                      onClick={() => handleViewProfile(request.user)}
                    >
                      <ImageWithFallback
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 
                          className="font-medium text-sm cursor-pointer hover:text-navy transition-colors"
                          onClick={() => handleViewProfile(request.user)}
                        >
                          {request.user.name}
                        </h3>
                        {request.user.verified && (
                          <CheckCircle size={14} className="text-blue-500" />
                        )}
                        <Badge 
                          variant={request.status === 'viewed' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {request.status === 'viewed' ? 'Viewed' : 'Pending'}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1">
                        {request.user.role} at {request.user.company}
                      </p>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {request.user.location} • {request.user.connections} connections
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} />
                          Sent {request.sentDate}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMessage(request.user)}
                          >
                            <MessageCircle size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWithdrawRequest(request.id)}
                          >
                            <UserMinus size={12} className="mr-1" />
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Send size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No sent requests</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You haven't sent any connection requests yet.
                </p>
                <Button onClick={() => onNavigate?.('network-discovery')}>
                  Find Professionals
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mt-6 p-4 border-none shadow-sm bg-muted/30">
          <h3 className="font-medium text-sm mb-3">Networking Tips</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>• Personalize your connection requests with a brief message</p>
            <p>• Connect with professionals in complementary luxury service fields</p>
            <p>• Engage with posts and discussions before sending requests</p>
            <p>• Follow up with a message after connecting to build relationships</p>
          </div>
        </Card>
      </div>
    </div>
  );
}