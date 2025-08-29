import { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, ChevronRight, Play, Star, Trophy, Clock, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  const currentCourse = {
    title: 'Luxury Yacht Service Excellence',
    progress: 68,
    nextLesson: 'Wine Service Protocols',
    duration: '12 min',
    image: 'https://images.unsplash.com/photo-1697207340462-c9eac5047014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldHxlbnwxfHx8fDE3NTYzMjkzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  const achievements = [
    { title: 'First Course Complete', icon: Trophy, earned: true },
    { title: '7-Day Streak', icon: Star, earned: true },
    { title: 'Community Contributor', icon: TrendingUp, earned: false },
  ];

  const trending = [
    {
      title: 'Patek Philippe Nautilus Authentication',
      category: 'Timepieces',
      views: '1.2k',
      image: 'https://images.unsplash.com/photo-1680810897186-372717262131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGRldGFpbHN8ZW58MXx8fHwxNzU2MzY0NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Private Jet Service Standards',
      category: 'Aviation',
      views: '847',
      image: 'https://images.unsplash.com/photo-1711655371218-7888ff2c6b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzU2MzY0NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="flex-1 bg-background pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-charcoal text-pearl px-4 lg:px-8 pt-12 lg:pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-light mb-1">{greeting}, Sarah</h1>
              <p className="text-pearl/80">Ready to elevate your expertise?</p>
            </div>
            <Button variant="ghost" size="sm" className="text-pearl hover:bg-pearl/10">
              <Bell size={20} />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">12</div>
              <div className="text-xs lg:text-sm text-pearl/70">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">847</div>
              <div className="text-xs lg:text-sm text-pearl/70">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">96%</div>
              <div className="text-xs lg:text-sm text-pearl/70">Average</div>
            </div>
            <div className="hidden lg:block text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">5</div>
              <div className="text-xs lg:text-sm text-pearl/70">Certificates</div>
            </div>
            <div className="hidden lg:block text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">142</div>
              <div className="text-xs lg:text-sm text-pearl/70">Connections</div>
            </div>
            <div className="hidden lg:block text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">28</div>
              <div className="text-xs lg:text-sm text-pearl/70">Days Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-6 space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: Two-column layout */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <div>
                <h2 className="text-lg font-medium mb-4">Continue Learning</h2>
                <Card className="overflow-hidden">
                  <div 
                    className="relative h-40 lg:h-48 cursor-pointer"
                    onClick={() => onNavigate?.('courses')}
                  >
                    <ImageWithFallback
                      src={currentCourse.image}
                      alt={currentCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-medium mb-2">{currentCourse.title}</h3>
                      <Progress value={currentCourse.progress} className="h-2 mb-2" />
                      <p className="text-white/80 text-sm">{currentCourse.progress}% complete</p>
                    </div>
                  </div>
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Next: {currentCourse.nextLesson}</p>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <Clock size={14} className="mr-1" />
                          {currentCourse.duration}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => onNavigate?.('video', {
                          id: 'yacht-wine-service',
                          title: currentCourse.nextLesson,
                          course: currentCourse.title,
                          duration: currentCourse.duration,
                          progress: 0
                        })}
                      >
                        <Play size={16} className="mr-2" />
                        Continue
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Trending in LuxPedia */}
              <div className="lg:hidden">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Trending in LuxPedia</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate?.('luxpedia')}
                  >
                    View All
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {trending.map((item, index) => (
                    <Card 
                      key={index} 
                      className="p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onNavigate?.('article', {
                        id: `trending-${index + 1}`,
                        title: item.title,
                        category: item.category,
                        image: item.image
                      })}
                    >
                      <div className="flex">
                        <div className="w-20 h-20 flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.category}
                          </Badge>
                          <h3 className="font-medium text-sm leading-tight mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-xs">{item.views} views</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Achievements */}
              <div>
                <h2 className="text-lg font-medium mb-4">Achievements</h2>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <Card key={index} className={`p-3 text-center lg:text-left ${achievement.earned ? 'bg-sage/10 border-sage/20' : 'opacity-50'}`}>
                        <div className="lg:flex lg:items-center lg:space-x-3">
                          <Icon 
                            size={24} 
                            className={`mx-auto lg:mx-0 mb-2 lg:mb-0 ${achievement.earned ? 'text-sage' : 'text-muted-foreground'}`} 
                          />
                          <p className="text-sm font-medium">{achievement.title}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Trending in LuxPedia */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Trending in LuxPedia</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate?.('luxpedia')}
                  >
                    View All
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {trending.map((item, index) => (
                    <Card 
                      key={index} 
                      className="p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onNavigate?.('article', {
                        id: `trending-${index + 1}`,
                        title: item.title,
                        category: item.category,
                        image: item.image
                      })}
                    >
                      <div className="flex">
                        <div className="w-16 h-16 flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.category}
                          </Badge>
                          <h3 className="font-medium text-sm leading-tight mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-xs">{item.views} views</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}