import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Heart,
  MessageCircle,
  Clock,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleReaderProps {
  article: any;
  onBack: () => void;
}

export function ArticleReader({ article, onBack }: ArticleReaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(127);

  if (!article) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Article not found</p>
      </div>
    );
  }

  const articleData = {
    id: article.id || 1,
    title: article.title || 'The Art of Exceptional Wine Service on Luxury Yachts',
    subtitle: 'Mastering the sophisticated protocols that distinguish elite yacht hospitality',
    author: {
      name: 'Sommelier Isabella Clarke',
      title: 'Master Sommelier & Yacht Service Expert',
      avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: '15+ years in luxury hospitality with certifications from Court of Master Sommeliers'
    },
    publishedDate: 'January 15, 2024',
    readTime: '8 min read',
    category: 'Wine Service',
    tags: ['Wine Service', 'Luxury Hospitality', 'Yacht Service', 'Professional Development'],
    featuredImage: article.image || 'https://images.unsplash.com/photo-1709747820764-ce13895aff05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5lJTIwY2VsbGFyfGVufDF8fHx8MTc1NjM2NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content: `
      <p>The world of luxury yacht service demands an unparalleled level of sophistication, and nowhere is this more evident than in wine service. As guests board these floating palaces, their expectations soar beyond the horizon, requiring service professionals to master not just the technical aspects of sommelier craft, but the nuanced art of maritime hospitality.</p>

      <h2>Understanding the Unique Environment</h2>
      <p>Serving wine on a yacht presents unique challenges that land-based establishments rarely encounter. The gentle motion of the sea requires modified techniques for pouring and serving, while the confined space demands exceptional organization and preparation. Every movement must be deliberate, every gesture refined.</p>

      <p>The key to success lies in understanding that yacht guests aren't simply seeking a meal – they're investing in an experience that transcends ordinary luxury. Your wine service becomes a performance, a carefully choreographed ballet that enhances the magic of being at sea.</p>

      <h2>Essential Preparation Techniques</h2>
      <p>Before guests even step aboard, the foundation of exceptional wine service has already been laid in meticulous preparation. Temperature control becomes paramount in the marine environment, where traditional wine storage methods must be adapted to maintain optimal conditions despite the yacht's movement and varying weather conditions.</p>

      <p>Consider the logistics: unlike a traditional restaurant where you can quickly retrieve a bottle from the cellar, yacht service requires anticipating needs and having selections properly decanted and at perfect serving temperature. This foresight separates competent service from truly memorable experiences.</p>

      <h2>The Art of Presentation</h2>
      <p>Wine presentation on a yacht elevates traditional service protocols to an art form. The ritual of wine service – from the initial presentation of the bottle to the final pour – must be adapted to the yacht's intimate setting while maintaining the elegance that guests expect.</p>

      <p>Stability becomes crucial when performing the traditional wine service steps. Develop techniques for maintaining balance while presenting the bottle, opening, and pouring. Practice the modified stance that allows you to brace against the yacht's movement while maintaining the grace and poise that luxury service demands.</p>

      <h2>Pairing with Maritime Cuisine</h2>
      <p>The art of wine pairing takes on new dimensions when combined with the fresh, ocean-inspired cuisine typical of yacht dining. Understanding how sea air affects the palate, how the maritime setting influences guests' preferences, and how to complement the unique flavors of fresh seafood and ocean-to-table ingredients becomes essential knowledge.</p>

      <p>Consider recommending lighter, more refreshing selections during day sailing, transitioning to more complex, full-bodied wines as evening approaches and the yacht settles into calmer waters. The rhythm of the sea should guide your wine program just as it guides the yacht's journey.</p>

      <h2>Advanced Service Techniques</h2>
      <p>Master the art of the "yacht pour" – a modified technique that accounts for the vessel's movement while ensuring guests' glasses are never overfilled. Learn to read the sea conditions and adjust your service timing accordingly. Rough waters call for different strategies than calm anchorage service.</p>

      <p>Develop your ability to tell the story behind each wine, connecting the terroir to the current journey. When serving a Sancerre while anchored off the Loire Valley, or a Barolo while cruising the Italian Riviera, create connections between the wine's origin and the guests' current experience.</p>

      <h2>Professional Excellence</h2>
      <p>True mastery in yacht wine service comes from understanding that you're not just serving wine – you're curating moments of perfection that will be remembered long after the voyage ends. Every interaction is an opportunity to exceed expectations and create lasting memories.</p>

      <p>Invest in continuous education, stay current with wine trends, and always approach each service with the reverence it deserves. The guests aboard that yacht have chosen to invest in an extraordinary experience, and your expertise in wine service is a crucial component of delivering that dream.</p>

      <p>Remember: in the world of luxury yacht service, competence is expected, but excellence is what creates magic. Master these techniques, understand the unique environment, and deliver wine service that matches the grandeur of the maritime setting you're privileged to work within.</p>
    `,
    stats: {
      views: 2847,
      likes: 127,
      comments: 23,
      shares: 45
    },
    relatedArticles: [
      {
        id: 2,
        title: 'Guest Relations Excellence in High-End Hospitality',
        category: 'Guest Relations',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1657763889378-9df569adac11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3NwaXRhbGl0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNTYzNjQ1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: 3,
        title: 'Mastering Table Service Etiquette for Luxury Dining',
        category: 'Service Standards',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1697207340462-c9eac5047014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldHxlbnwxfHx8fDE3NTYzMjkzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const parseContent = (htmlContent: string) => {
    // Split content by double newlines and trim each part
    const parts = htmlContent
      .split('\n\n')
      .map(part => part.trim())
      .filter(part => part.length > 0);
    
    return parts.map(part => {
      if (part.startsWith('<h2>') && part.endsWith('</h2>')) {
        return {
          type: 'heading',
          content: part.replace('<h2>', '').replace('</h2>', '')
        };
      } else if (part.startsWith('<p>') && part.endsWith('</p>')) {
        return {
          type: 'paragraph',
          content: part.replace('<p>', '').replace('</p>', '')
        };
      } else {
        // Fallback for any content without proper tags
        return {
          type: 'paragraph',
          content: part.replace(/<\/?[^>]+(>|$)/g, '') // Strip any remaining HTML tags
        };
      }
    });
  };

  const contentElements = parseContent(articleData.content);

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? 'text-gold' : ''}
            >
              <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Article Header */}
        <div className="py-6">
          <Badge className="bg-sage/10 text-sage mb-4">{articleData.category}</Badge>
          
          <h1 className="text-2xl font-light mb-3 text-navy leading-tight">
            {articleData.title}
          </h1>
          
          {articleData.subtitle && (
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {articleData.subtitle}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {articleData.publishedDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {articleData.readTime}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              {articleData.stats.views} views
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-12 h-12">
              <ImageWithFallback
                src={articleData.author.avatar}
                alt={articleData.author.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div>
              <div className="font-medium text-sm">{articleData.author.name}</div>
              <div className="text-xs text-muted-foreground">{articleData.author.title}</div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <ImageWithFallback
              src={articleData.featuredImage}
              alt={articleData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-sm max-w-none mb-8">
          {contentElements.map((element, index) => {
            if (element.type === 'heading') {
              return (
                <h2 key={index} className="text-lg font-medium text-navy mt-8 mb-4 first:mt-0">
                  {element.content}
                </h2>
              );
            } else if (element.type === 'paragraph') {
              return (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {element.content}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="font-medium mb-3">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {articleData.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Engagement Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`gap-2 ${isLiked ? 'text-burgundy' : ''}`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle size={16} />
              {articleData.stats.comments}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 size={16} />
              Share
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            {articleData.stats.shares} shares
          </div>
        </div>

        {/* Author Bio */}
        <Card className="p-4 mb-8">
          <div className="flex gap-3">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <ImageWithFallback
                src={articleData.author.avatar}
                alt={articleData.author.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-sm mb-1">{articleData.author.name}</div>
              <div className="text-xs text-muted-foreground mb-2">{articleData.author.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {articleData.author.bio}
              </p>
            </div>
          </div>
        </Card>

        {/* Related Articles */}
        <div>
          <h3 className="font-medium mb-4">Related Articles</h3>
          <div className="space-y-4">
            {articleData.relatedArticles.map((related) => (
              <Card key={related.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-sage/10 text-sage text-xs mb-2">{related.category}</Badge>
                    <h4 className="font-medium text-sm mb-2 leading-tight">{related.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {related.readTime}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground mt-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}