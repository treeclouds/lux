import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Filter, Heart, Share2, Bookmark, Eye, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LuxPediaScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export function LuxPediaScreen({ onNavigate }: LuxPediaScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Timepieces', 'Jewelry', 'Handbags', 'Automobiles', 'Yachts', 'Art'];

  const luxuryItems = [
    {
      id: 1,
      name: 'Patek Philippe Nautilus 5711/1A',
      brand: 'Patek Philippe',
      category: 'Timepieces',
      marketValue: '$150,000 - $200,000',
      yearIntroduced: 1976,
      description: 'Iconic luxury sports watch with distinctive porthole design',
      authenticity: 'High Risk',
      views: 12500,
      saves: 245,
      trending: true,
      image: 'https://images.unsplash.com/photo-1680810897186-372717262131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGRldGFpbHN8ZW58MXx8fHwxNzU2MzY0NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Swiss Made', 'Steel', 'Automatic', 'Investment Grade']
    },
    {
      id: 2,
      name: 'Hermès Birkin 30 Togo',
      brand: 'Hermès',
      category: 'Handbags',
      marketValue: '$12,000 - $25,000',
      yearIntroduced: 1984,
      description: 'The most coveted handbag in luxury fashion',
      authenticity: 'Medium Risk',
      views: 8900,
      saves: 189,
      trending: false,
      image: 'https://images.unsplash.com/photo-1727414782567-0ec8a4eb6096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwZGV0YWlsc3xlbnwxfHx8fDE3NTYzNjQ1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Handcrafted', 'Togo Leather', 'Limited Availability']
    },
    {
      id: 3,
      name: 'Tiffany & Co. 2ct Diamond Ring',
      brand: 'Tiffany & Co.',
      category: 'Jewelry',
      marketValue: '$25,000 - $45,000',
      yearIntroduced: 1886,
      description: 'Classic six-prong setting engagement ring',
      authenticity: 'Low Risk',
      views: 15600,
      saves: 312,
      trending: true,
      image: 'https://images.unsplash.com/photo-1600003014608-c2ccc1570a65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwZGlhbW9uZHN8ZW58MXx8fHwxNzU2MzY0NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Diamond', 'Platinum', 'Certified', 'Classic Design']
    },
    {
      id: 4,
      name: 'Rolls-Royce Phantom Interior',
      brand: 'Rolls-Royce',
      category: 'Automobiles',
      marketValue: '$450,000 - $600,000',
      yearIntroduced: 2003,
      description: 'Pinnacle of automotive luxury and craftsmanship',
      authenticity: 'Low Risk',
      views: 7800,
      saves: 156,
      trending: false,
      image: 'https://images.unsplash.com/photo-1599912027667-755b68b4dd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYzMjIxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Bespoke', 'Handcrafted', 'British', 'Ultra-Luxury']
    }
  ];

  const filteredItems = luxuryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAuthenticityColor = (risk: string) => {
    switch (risk) {
      case 'High Risk':
        return 'text-burgundy bg-burgundy/10';
      case 'Medium Risk':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-sage bg-sage/10';
    }
  };

  return (
    <div className="flex-1 bg-background pb-20">
      {/* Header */}
      <div className="bg-navy text-pearl px-4 pt-12 pb-6">
        <h1 className="text-2xl font-light mb-4">LuxPedia</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pearl/60" />
          <Input
            placeholder="Search luxury items..."
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
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredItems.length} items found
          </p>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>

        {/* Items Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate?.('article', { id: item.id, title: item.name, image: item.image })}
            >
              {viewMode === 'grid' ? (
                <div>
                  <div className="relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                    {item.trending && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-gold text-navy text-xs">
                          <TrendingUp size={10} className="mr-1" />
                          Trending
                        </Badge>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-white hover:bg-white/20"
                    >
                      <Bookmark size={16} />
                    </Button>
                  </div>
                  <div className="p-3">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs mb-1">
                        {item.category}
                      </Badge>
                      <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
                      <p className="text-muted-foreground text-xs">{item.brand}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium">{item.marketValue}</p>
                      <Badge className={`text-xs ${getAuthenticityColor(item.authenticity)}`}>
                        {item.authenticity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        {item.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark size={12} />
                        {item.saves}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex p-4">
                  <div className="w-20 h-20 flex-shrink-0 mr-4">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          {item.trending && (
                            <Badge className="bg-gold text-navy text-xs">
                              <TrendingUp size={10} className="mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-muted-foreground text-xs">{item.brand}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Bookmark size={16} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium">{item.marketValue}</p>
                        <Badge className={`text-xs ${getAuthenticityColor(item.authenticity)}`}>
                          {item.authenticity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          {item.views.toLocaleString()}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}