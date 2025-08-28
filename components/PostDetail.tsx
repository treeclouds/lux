import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  TrendingUp,
  ThumbsUp,
  Reply,
  Send
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostDetailProps {
  post: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function PostDetail({ post, onBack, onNavigate }: PostDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [showReplies, setShowReplies] = useState(true);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'popular'

  if (!post) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Post not found</p>
      </div>
    );
  }

  const replies = [
    {
      id: 1,
      author: {
        name: 'Sommelier Catherine Laurent',
        role: 'Master Sommelier',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true
      },
      content: 'For Dom Pérignon vintages, I recommend 8-10°C (46-50°F) and always use proper champagne flutes. The key is the gradual temperature rise as guests enjoy it. Never serve directly from the refrigerator.',
      timestamp: '1 hour ago',
      likes: 15,
      isLiked: false,
      replies: 3
    },
    {
      id: 2,
      author: {
        name: 'Alexandre Dubois',
        role: 'Yacht Steward',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: false
      },
      content: 'I agree with Catherine! Also, consider the yacht\'s movement when pouring. I use a slightly modified technique to account for the gentle rocking motion.',
      timestamp: '45 minutes ago',
      likes: 8,
      isLiked: true,
      replies: 1
    },
    {
      id: 3,
      author: {
        name: 'Marina Blackwell',
        role: 'Chief Stewardess',
        avatar: 'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaXwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        certified: true
      },
      content: 'Great question! I\'ve found that presentation is equally important. Always present the bottle label-forward, and ensure the napkin is pristine. The ceremony of champagne service is part of the luxury experience.',
      timestamp: '30 minutes ago',
      likes: 12,
      isLiked: false,
      replies: 2
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReply = () => {
    if (newReply.trim()) {
      // Handle reply submission
      setNewReply('');
    }
  };

  const handleViewLikes = () => {
    onNavigate?.('post-likes', { 
      postId: post.id, 
      likes: post.likes,
      title: post.title 
    });
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
            <h1 className="font-medium text-sm">Discussion</h1>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Main Post */}
        <Card className="m-4 p-4 border-none shadow-sm">
          <div className="flex items-start space-x-3 mb-4">
            <Avatar className="w-12 h-12">
              <ImageWithFallback
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-sm">{post.author.name}</h3>
                {post.author.certified && (
                  <Badge variant="secondary" className="text-xs">
                    Certified
                  </Badge>
                )}
                {post.trending && (
                  <Badge className="bg-gold text-navy text-xs">
                    <TrendingUp size={10} className="mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-xs mb-1">{post.author.role}</p>
              <p className="text-muted-foreground text-xs">{post.timestamp}</p>
            </div>
          </div>

          <h2 className="font-medium text-base mb-3">{post.title}</h2>
          <p className="text-sm mb-4">{post.content}</p>
          
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Heart size={14} className={isLiked ? 'fill-current' : ''} />
                {post.likes + (isLiked ? 1 : 0)}
              </button>
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle size={14} />
                {post.replies}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleViewLikes}
                className="text-xs"
              >
                View Likes
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 size={14} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Reply Input */}
        <Card className="m-4 p-4 border-none shadow-sm">
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTYzNjQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your expertise..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="mb-3 resize-none"
                rows={3}
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleReply}
                  disabled={!newReply.trim()}
                  className="bg-navy hover:bg-navy/90 text-pearl"
                >
                  <Send size={14} className="mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Replies Section */}
        {showReplies && (
          <div className="mx-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">
                {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-background border border-border rounded-md px-2 py-1"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="space-y-4">
              {replies.map((reply) => (
                <Card key={reply.id} className="p-4 border-none shadow-sm">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <ImageWithFallback
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{reply.author.name}</h4>
                        {reply.author.certified && (
                          <Badge variant="secondary" className="text-xs">
                            Certified
                          </Badge>
                        )}
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-muted-foreground text-xs">{reply.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2">{reply.author.role}</p>
                      <p className="text-sm mb-3">{reply.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              reply.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <ThumbsUp size={12} className={reply.isLiked ? 'fill-current' : ''} />
                            {reply.likes}
                          </button>
                          {reply.replies > 0 && (
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <Reply size={12} />
                              {reply.replies}
                            </button>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}