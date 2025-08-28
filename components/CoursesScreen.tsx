import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Search, Filter, Clock, Users, Star, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CoursesScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export function CoursesScreen({ onNavigate }: CoursesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Yachting', 'Aviation', 'Hospitality', 'Timepieces', 'Automobiles'];

  const courses = [
    {
      id: 1,
      title: 'Luxury Yacht Service Excellence',
      description: 'Master the art of exceptional yacht service',
      instructor: 'Captain Marina Stevens',
      duration: '4h 30m',
      lessons: 12,
      rating: 4.9,
      enrolled: 234,
      progress: 68,
      category: 'Yachting',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1697207340462-c9eac5047014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldHxlbnwxfHx8fDE3NTYzMjkzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isEnrolled: true
    },
    {
      id: 2,
      title: 'Wine Service & Sommelier Fundamentals',
      description: 'Professional wine service for luxury settings',
      instructor: 'Sommelier Jean-Claude Dubois',
      duration: '3h 15m',
      lessons: 8,
      rating: 4.8,
      enrolled: 189,
      progress: 0,
      category: 'Hospitality',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1709747820764-ce13895aff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5lJTIwY2VsbGFyfGVufDF8fHx8MTc1NjM2NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isEnrolled: false
    },
    {
      id: 3,
      title: 'Private Aviation Client Relations',
      description: 'Excellence in private jet service delivery',
      instructor: 'Captain Sarah Mitchell',
      duration: '5h 45m',
      lessons: 15,
      rating: 4.9,
      enrolled: 156,
      progress: 0,
      category: 'Aviation',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1711655371218-7888ff2c6b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzU2MzY0NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isEnrolled: false
    },
    {
      id: 4,
      title: 'Luxury Hotel Concierge Mastery',
      description: 'Anticipate and exceed guest expectations',
      instructor: 'Isabella Romano',
      duration: '6h 20m',
      lessons: 18,
      rating: 4.7,
      enrolled: 298,
      progress: 0,
      category: 'Hospitality',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1657763889378-9df569adac11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3NwaXRhbGl0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU2MzY0NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isEnrolled: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 bg-background pb-20">
      {/* Header */}
      <div className="bg-navy text-pearl px-4 pt-12 pb-6">
        <h1 className="text-2xl font-light mb-4">Courses</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pearl/60" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-pearl/10 border-pearl/20 text-pearl placeholder:text-pearl/60"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-gold text-navy' 
                  : 'text-pearl border-pearl/20 hover:bg-pearl/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="flex">
                {/* Course Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-sm leading-tight mb-1">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-xs mb-2">
                        by {course.instructor}
                      </p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      {course.enrolled}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-current text-gold" />
                      {course.rating}
                    </div>
                  </div>

                  {/* Progress or Enroll */}
                  {course.isEnrolled ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {course.progress}% complete
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigate?.('video', { courseId: course.id, title: course.title })}
                        >
                          <Play size={12} className="mr-1" />
                          Continue
                        </Button>
                      </div>
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => onNavigate?.('enrollment', course)}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}