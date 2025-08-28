import { useState } from 'react';
import { Home, GraduationCap, Search, Users, Award, User } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'courses', icon: GraduationCap, label: 'Learn' },
    { id: 'luxpedia', icon: Search, label: 'LuxPedia' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
                min-h-[44px] min-w-[44px] flex-1 max-w-[80px]
                ${isActive 
                  ? 'text-accent bg-accent/10' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2}
                className="mb-1"
              />
              <span className="text-xs leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}