import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Share2,
  Download,
  MessageCircle,
  Heart,
  CheckCircle,
  Info,
  Globe,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailProps {
  event: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function EventDetail({ event, onBack, onNavigate }: EventDetailProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!event) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Event not found</p>
      </div>
    );
  }

  // Enhanced event data with more details
  const eventDetails = {
    ...event,
    description: 'Join us for an exclusive gathering of luxury service professionals from around the world. This summit features keynote speakers, hands-on workshops, and networking opportunities designed to elevate your expertise in serving affluent clientele.',
    price: event.type === 'Conference' ? '€2,850' : 'Free',
    capacity: 300,
    rating: 4.9,
    reviews: 127,
    organizer: {
      name: 'Affluent Institute',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      verified: true
    },
    schedule: [
      {
        day: 'Day 1 - March 15',
        sessions: [
          { time: '09:00', title: 'Registration & Welcome Reception', duration: '1h' },
          { time: '10:00', title: 'Keynote: The Future of Luxury Service', speaker: 'Catherine Laurent', duration: '1h' },
          { time: '11:30', title: 'Workshop: Advanced Wine Service Techniques', duration: '2h' },
          { time: '14:00', title: 'Panel: Technology in High-End Hospitality', duration: '1.5h' },
          { time: '16:00', title: 'Networking Cocktail Hour', duration: '2h' }
        ]
      },
      {
        day: 'Day 2 - March 16',
        sessions: [
          { time: '09:00', title: 'Breakfast Networking', duration: '1h' },
          { time: '10:00', title: 'Masterclass: Private Jet Service Excellence', duration: '2h' },
          { time: '13:00', title: 'Workshop: Client Relationship Management', duration: '2h' },
          { time: '15:30', title: 'Case Study: Yacht Service Innovations', duration: '1.5h' },
          { time: '17:30', title: 'Gala Dinner & Awards Ceremony', duration: '3h' }
        ]
      }
    ],
    speakers: [
      {
        name: 'Catherine Laurent',
        role: 'Master Sommelier',
        company: 'Four Seasons Hotels',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        name: 'James Rodriguez',
        role: 'Private Butler',
        company: 'Elite Service Group',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        name: 'Marina Stevens',
        role: 'Yacht Captain',
        company: 'Superyacht Management',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    amenities: [
      'Premium networking opportunities',
      'Gourmet catering by Michelin-starred chefs',
      'Luxury transportation provided',
      'Premium welcome gift package',
      'Digital conference materials',
      'Certificate of completion'
    ],
    venue: {
      name: 'Hotel Hermitage Monte-Carlo',
      address: 'Square Beaumarchais, 98000 Monaco',
      description: 'An elegant Belle Époque palace overlooking the Mediterranean'
    }
  };

  const handleRegister = () => {
    onNavigate?.('event-registration', eventDetails);
  };

  const handleViewAttendees = () => {
    onNavigate?.('event-attendees', { 
      eventId: event.id, 
      title: event.title,
      attendees: event.attendees 
    });
  };

  const handleToggleInterest = () => {
    setIsInterested(!isInterested);
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
            <h1 className="font-medium text-sm truncate">{event.title}</h1>
          </div>
          <Button variant="ghost" size="sm">
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="relative h-48">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                {event.type}
              </Badge>
              <div className="flex items-center gap-1 text-white text-xs">
                <Star size={12} className="fill-current text-gold" />
                {eventDetails.rating} ({eventDetails.reviews} reviews)
              </div>
            </div>
            <h1 className="text-white text-lg font-medium">{event.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Quick Info */}
          <Card className="p-4 mb-6 border-none shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{event.date}</div>
                  <div className="text-xs text-muted-foreground">3 days</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{event.location}</div>
                  <div className="text-xs text-muted-foreground">In-person</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{event.attendees} attending</div>
                  <div className="text-xs text-muted-foreground">of {eventDetails.capacity} capacity</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-xs text-navy">€</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{eventDetails.price}</div>
                  <div className="text-xs text-muted-foreground">Per person</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isRegistered ? (
                <Button 
                  onClick={handleRegister}
                  className="flex-1 bg-navy hover:bg-navy/90 text-pearl"
                >
                  <UserCheck size={16} className="mr-2" />
                  Register Now
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  className="flex-1"
                  disabled
                >
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                  Registered
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleToggleInterest}
                className={isInterested ? 'bg-gold/10 border-gold text-gold' : ''}
              >
                <Heart size={16} className={isInterested ? 'fill-current' : ''} />
              </Button>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 text-sm transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-navy text-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-2 text-sm transition-colors border-b-2 ${
                activeTab === 'schedule'
                  ? 'border-navy text-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('speakers')}
              className={`pb-2 text-sm transition-colors border-b-2 ${
                activeTab === 'speakers'
                  ? 'border-navy text-foreground'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              Speakers
            </button>
            <button
              onClick={handleViewAttendees}
              className="pb-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Attendees
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">About This Event</h3>
                <p className="text-sm text-muted-foreground mb-4">{eventDetails.description}</p>
              </div>

              {/* Organizer */}
              <Card className="p-4 border-none shadow-sm">
                <h4 className="font-medium mb-3">Organized by</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <ImageWithFallback
                      src={eventDetails.organizer.avatar}
                      alt={eventDetails.organizer.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-sm">{eventDetails.organizer.name}</h5>
                      {eventDetails.organizer.verified && (
                        <CheckCircle size={14} className="text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Professional education platform</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </Card>

              {/* Venue */}
              <div>
                <h4 className="font-medium mb-3">Venue</h4>
                <Card className="p-4 border-none shadow-sm">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-sm">{eventDetails.venue.name}</h5>
                      <p className="text-xs text-muted-foreground mb-2">{eventDetails.venue.address}</p>
                      <p className="text-sm text-muted-foreground">{eventDetails.venue.description}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* What's Included */}
              <div>
                <h4 className="font-medium mb-3">What's Included</h4>
                <div className="grid grid-cols-1 gap-2">
                  {eventDetails.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {eventDetails.schedule.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h3 className="font-medium mb-4">{day.day}</h3>
                  <div className="space-y-3">
                    {day.sessions.map((session, sessionIndex) => (
                      <Card key={sessionIndex} className="p-3 border-none shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-12 text-center">
                            <div className="text-sm font-medium">{session.time}</div>
                            <div className="text-xs text-muted-foreground">{session.duration}</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{session.title}</h4>
                            {session.speaker && (
                              <p className="text-xs text-muted-foreground">with {session.speaker}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'speakers' && (
            <div className="space-y-4">
              {eventDetails.speakers.map((speaker, index) => (
                <Card key={index} className="p-4 border-none shadow-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16">
                      <ImageWithFallback
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{speaker.name}</h3>
                      <p className="text-sm text-muted-foreground">{speaker.role}</p>
                      <p className="text-xs text-muted-foreground">{speaker.company}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <UserPlus size={12} className="mr-1" />
                      Connect
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}