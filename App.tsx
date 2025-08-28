import { useState, useEffect } from 'react';
import { MobileNavigation } from './components/MobileNavigation';
import { Dashboard } from './components/Dashboard';
import { CoursesScreen } from './components/CoursesScreen';
import { LuxPediaScreen } from './components/LuxPediaScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { EnrollmentScreen } from './components/EnrollmentScreen';
import { ArticleReader } from './components/ArticleReader';
import { VideoPlayer } from './components/VideoPlayer';
import { PostDetail } from './components/PostDetail';
import { PostLikes } from './components/PostLikes';
import { UserProfile } from './components/UserProfile';
import { EventDetail } from './components/EventDetail';
import { EventRegistration } from './components/EventRegistration';
import { EventAttendees } from './components/EventAttendees';
import { NetworkDiscovery } from './components/NetworkDiscovery';
import { ConnectionRequests } from './components/ConnectionRequests';
import { ChatScreen } from './components/ChatScreen';
import { MyNetwork } from './components/MyNetwork';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentScreen, setCurrentScreen] = useState('main');
  const [screenData, setScreenData] = useState(null);

  // Prevent scrolling on the body when the app is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  const navigateToScreen = (screen, data = null) => {
    // Handle navigation to main tabs
    if (['dashboard', 'courses', 'luxpedia', 'community', 'profile'].includes(screen)) {
      setActiveTab(screen);
      setCurrentScreen('main');
      setScreenData(null);
    } else {
      // Handle navigation to deeper screens
      setCurrentScreen(screen);
      setScreenData(data);
    }
  };

  const navigateBack = () => {
    setCurrentScreen('main');
    setScreenData(null);
  };

  const renderActiveScreen = () => {
    // Handle deeper interaction screens
    if (currentScreen === 'enrollment') {
      return <EnrollmentScreen course={screenData} onBack={navigateBack} />;
    }
    if (currentScreen === 'article') {
      return <ArticleReader article={screenData} onBack={navigateBack} />;
    }
    if (currentScreen === 'video') {
      return <VideoPlayer video={screenData} onBack={navigateBack} />;
    }
    if (currentScreen === 'post-detail') {
      return <PostDetail post={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'post-likes') {
      return <PostLikes data={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'user-profile') {
      return <UserProfile data={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'event-detail') {
      return <EventDetail event={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'event-registration') {
      return <EventRegistration event={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'event-attendees') {
      return <EventAttendees data={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'network-discovery') {
      return <NetworkDiscovery onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'connection-requests') {
      return <ConnectionRequests onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'chat') {
      return <ChatScreen data={screenData} onBack={navigateBack} onNavigate={navigateToScreen} />;
    }
    if (currentScreen === 'my-network') {
      return <MyNetwork onBack={navigateBack} onNavigate={navigateToScreen} />;
    }

    // Handle main navigation screens
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateToScreen} />;
      case 'courses':
        return <CoursesScreen onNavigate={navigateToScreen} />;
      case 'luxpedia':
        return <LuxPediaScreen onNavigate={navigateToScreen} />;
      case 'community':
        return <CommunityScreen onNavigate={navigateToScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateToScreen} />;
      default:
        return <Dashboard onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderActiveScreen()}
      </div>

      {/* Bottom Navigation - Hide for deeper screens */}
      {currentScreen === 'main' && (
        <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}