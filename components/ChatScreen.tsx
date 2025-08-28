import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatScreenProps {
  data: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function ChatScreen({ data, onBack, onNavigate }: ChatScreenProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!data?.user) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Chat not found</p>
      </div>
    );
  }

  const user = data.user;

  // Mock chat messages
  const initialMessages = [
    {
      id: 1,
      sender: 'them',
      content: 'Hi! Thanks for connecting. I saw your expertise in champagne service and would love to learn more about your approach to vintage presentations.',
      timestamp: '2:34 PM',
      status: 'read',
      type: 'text'
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hello! Thank you for reaching out. I\'d be happy to share insights about vintage champagne service. What specific aspects are you most interested in?',
      timestamp: '2:45 PM',
      status: 'read',
      type: 'text'
    },
    {
      id: 3,
      sender: 'them',
      content: 'I\'m particularly interested in temperature control and the timing of service for Dom Pérignon vintages. Do you have any specific protocols you follow?',
      timestamp: '3:12 PM',
      status: 'read',
      type: 'text'
    },
    {
      id: 4,
      sender: 'me',
      content: 'Absolutely! For Dom Pérignon vintages, I maintain 8-10°C throughout service. The key is gradual temperature rise as guests enjoy it. Never serve directly from refrigeration.',
      timestamp: '3:15 PM',
      status: 'delivered',
      type: 'text'
    },
    {
      id: 5,
      sender: 'me',
      content: 'I\'d be happy to share a detailed service protocol document if you\'re interested. We could also schedule a brief call to discuss techniques.',
      timestamp: '3:16 PM',
      status: 'sent',
      type: 'text'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock size={12} className="text-muted-foreground" />;
      case 'delivered':
        return <CheckCircle size={12} className="text-muted-foreground" />;
      case 'read':
        return <CheckCircle size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          
          <Avatar 
            className="w-10 h-10 cursor-pointer"
            onClick={() => onNavigate?.('user-profile', { user })}
          >
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h1 
              className="font-medium text-sm cursor-pointer hover:text-navy transition-colors"
              onClick={() => onNavigate?.('user-profile', { user })}
            >
              {user.name}
            </h1>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Professional Context */}
      <Card className="m-4 p-3 border-none shadow-sm bg-gold/5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info size={12} />
          <span>
            Professional conversation with {user.name} • {user.company}
          </span>
        </div>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                {msg.sender === 'them' && (
                  <Avatar className="w-8 h-8 mb-2">
                    <ImageWithFallback
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                )}
                
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-navy text-pearl ml-8'
                      : 'bg-muted mr-8'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                
                <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                  msg.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'me' && getMessageStatus(msg.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        {/* Quick Actions */}
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm" className="text-xs">
            Share Experience
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Exchange Contact
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Schedule Call
          </Button>
        </div>

        {/* Input Area */}
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
              <Button variant="ghost" size="sm" className="p-1">
                <Paperclip size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <ImageIcon size={16} />
              </Button>
              
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a professional message..."
                className="border-none bg-transparent focus:ring-0 text-sm"
              />
              
              <Button variant="ghost" size="sm" className="p-1">
                <Smile size={16} />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-12 h-12 rounded-full bg-navy hover:bg-navy/90 text-pearl"
          >
            <Send size={16} />
          </Button>
        </div>

        {/* Professional Guidelines */}
        <div className="mt-3 text-xs text-muted-foreground text-center">
          <p>Keep conversations professional and focused on luxury service excellence</p>
        </div>
      </div>
    </div>
  );
}