import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Award, 
  Play,
  CheckCircle,
  Star,
  Calendar,
  CreditCard,
  Shield,
  Download
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EnrollmentScreenProps {
  course: any;
  onBack: () => void;
}

export function EnrollmentScreen({ course, onBack }: EnrollmentScreenProps) {
  const [enrollmentStep, setEnrollmentStep] = useState('details'); // details, payment, confirmation

  if (!course) {
    return (
      <div className="flex-1 bg-background p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft size={20} />
        </Button>
        <p>Course not found</p>
      </div>
    );
  }

  const courseDetails = {
    id: course.id,
    title: course.title || 'Luxury Yacht Service Excellence',
    instructor: 'Captain Marina Blackwell',
    duration: '6 hours 30 minutes',
    modules: 8,
    students: 1247,
    rating: 4.9,
    reviews: 324,
    price: 299,
    originalPrice: 399,
    image: course.image || 'https://images.unsplash.com/photo-1697207340462-c9eac5047014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldHxlbnwxfHx8fDE3NTYzMjkzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Master the art of luxury yacht service with this comprehensive course designed for hospitality professionals seeking to excel in the high-end maritime industry.',
    whatYouLearn: [
      'Advanced service protocols for luxury yacht environments',
      'Wine service and sommelier fundamentals',
      'Guest relations and conflict resolution',
      'Safety and emergency procedures',
      'Cultural sensitivity and international etiquette',
      'Advanced housekeeping and maintenance standards'
    ],
    modules: [
      {
        id: 1,
        title: 'Welcome & Yacht Service Fundamentals',
        duration: '45 minutes',
        lessons: 6,
        completed: false
      },
      {
        id: 2,
        title: 'Guest Relations Excellence',
        duration: '55 minutes',
        lessons: 8,
        completed: false
      },
      {
        id: 3,
        title: 'Wine Service & Beverage Management',
        duration: '1 hour 20 minutes',
        lessons: 10,
        completed: false
      },
      {
        id: 4,
        title: 'Housekeeping Standards',
        duration: '1 hour 10 minutes',
        lessons: 9,
        completed: false
      },
      {
        id: 5,
        title: 'Safety & Emergency Protocols',
        duration: '50 minutes',
        lessons: 7,
        completed: false
      },
      {
        id: 6,
        title: 'Cultural Awareness & Etiquette',
        duration: '40 minutes',
        lessons: 5,
        completed: false
      },
      {
        id: 7,
        title: 'Advanced Service Techniques',
        duration: '1 hour 5 minutes',
        lessons: 8,
        completed: false
      },
      {
        id: 8,
        title: 'Final Assessment & Certification',
        duration: '35 minutes',
        lessons: 3,
        completed: false
      }
    ],
    benefits: [
      'Lifetime access to course materials',
      'Downloadable resources and checklists',
      'Direct instructor support',
      'Industry-recognized certification',
      'Access to exclusive yacht service job board',
      '30-day money-back guarantee'
    ]
  };

  const renderDetailsStep = () => (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="relative h-48 rounded-xl overflow-hidden">
        <ImageWithFallback
          src={courseDetails.image}
          alt={courseDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-sage text-white">Best Seller</Badge>
            <Badge className="bg-gold text-navy">Certificate Included</Badge>
          </div>
          <h1 className="text-pearl text-xl font-light mb-1">{courseDetails.title}</h1>
          <p className="text-pearl/80 text-sm">by {courseDetails.instructor}</p>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-sage/10 rounded-full mb-2 mx-auto">
            <Clock size={16} className="text-sage" />
          </div>
          <div className="text-xs text-muted-foreground">Duration</div>
          <div className="text-sm font-medium">{courseDetails.duration}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gold/10 rounded-full mb-2 mx-auto">
            <Play size={16} className="text-gold" />
          </div>
          <div className="text-xs text-muted-foreground">Modules</div>
          <div className="text-sm font-medium">{courseDetails.modules.length}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-navy/10 rounded-full mb-2 mx-auto">
            <Users size={16} className="text-navy" />
          </div>
          <div className="text-xs text-muted-foreground">Students</div>
          <div className="text-sm font-medium">{courseDetails.students}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-burgundy/10 rounded-full mb-2 mx-auto">
            <Star size={16} className="text-burgundy" />
          </div>
          <div className="text-xs text-muted-foreground">Rating</div>
          <div className="text-sm font-medium">{courseDetails.rating}</div>
        </div>
      </div>

      {/* Pricing */}
      <Card className="p-4 border-gold/20 bg-gradient-to-r from-gold/5 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-light text-navy">${courseDetails.price}</span>
              <span className="text-sm text-muted-foreground line-through">${courseDetails.originalPrice}</span>
              <Badge className="bg-burgundy text-white text-xs">25% OFF</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Limited time offer</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">You save</div>
            <div className="text-lg font-medium text-sage">${courseDetails.originalPrice - courseDetails.price}</div>
          </div>
        </div>
        <Button 
          className="w-full bg-navy hover:bg-navy/90 text-pearl"
          onClick={() => setEnrollmentStep('payment')}
        >
          Enroll Now
        </Button>
      </Card>

      {/* What You'll Learn */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">What You'll Learn</h3>
        <div className="space-y-3">
          {courseDetails.whatYouLearn.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle size={16} className="text-sage mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Course Modules */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">Course Content</h3>
        <div className="space-y-3">
          {courseDetails.modules.map((module, index) => (
            <div key={module.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-navy">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-sm">{module.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {module.lessons} lessons • {module.duration}
                  </div>
                </div>
              </div>
              <Play size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>

      {/* Benefits */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">What's Included</h3>
        <div className="space-y-3">
          {courseDetails.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle size={16} className="text-sage" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">Order Summary</h3>
        <div className="flex gap-3 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={courseDetails.image}
              alt={courseDetails.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-1">{courseDetails.title}</h4>
            <p className="text-xs text-muted-foreground mb-2">by {courseDetails.instructor}</p>
            <div className="flex items-center gap-2">
              <span className="font-medium">${courseDetails.price}</span>
              <span className="text-xs text-muted-foreground line-through">${courseDetails.originalPrice}</span>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Course Price</span>
            <span>${courseDetails.originalPrice}</span>
          </div>
          <div className="flex justify-between text-sage">
            <span>Discount (25%)</span>
            <span>-${courseDetails.originalPrice - courseDetails.price}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${courseDetails.price}</span>
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">Payment Method</h3>
        <div className="space-y-3">
          <div className="border rounded-lg p-3 bg-muted/50">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-navy" />
              <div>
                <div className="font-medium text-sm">Credit/Debit Card</div>
                <div className="text-xs text-muted-foreground">Visa, MasterCard, American Express</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Note */}
      <div className="flex items-center gap-2 p-3 bg-sage/10 rounded-lg">
        <Shield size={16} className="text-sage" />
        <span className="text-xs text-sage">
          Your payment information is encrypted and secure
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full bg-navy hover:bg-navy/90 text-pearl"
          onClick={() => setEnrollmentStep('confirmation')}
        >
          Complete Enrollment - ${courseDetails.price}
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setEnrollmentStep('details')}
        >
          Back to Course Details
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle size={40} className="text-sage" />
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-xl font-light mb-2">Enrollment Successful!</h2>
        <p className="text-muted-foreground text-sm">
          Welcome to {courseDetails.title}
        </p>
      </div>

      {/* Course Access Info */}
      <Card className="p-4 text-left">
        <h3 className="font-medium mb-3">Your Course Access</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Course Access</span>
            <Badge className="bg-sage text-white">Activated</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Certificate Eligible</span>
            <CheckCircle size={16} className="text-sage" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Progress Tracking</span>
            <CheckCircle size={16} className="text-sage" />
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-4 text-left">
        <h3 className="font-medium mb-3">Next Steps</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-navy">1</span>
            </div>
            <span>Start with Module 1: Welcome & Yacht Service Fundamentals</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-navy">2</span>
            </div>
            <span>Download course materials from your profile</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-navy">3</span>
            </div>
            <span>Join the exclusive course community</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-navy hover:bg-navy/90 text-pearl">
          Start Learning Now
        </Button>
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back to Courses
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="font-medium">
              {enrollmentStep === 'details' && 'Course Details'}
              {enrollmentStep === 'payment' && 'Payment'}
              {enrollmentStep === 'confirmation' && 'Enrollment Complete'}
            </h1>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {enrollmentStep !== 'confirmation' && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">
              Step {enrollmentStep === 'details' ? '1' : '2'} of 2
            </span>
          </div>
          <Progress 
            value={enrollmentStep === 'details' ? 50 : 100} 
            className="h-2"
          />
        </div>
      )}

      {/* Content */}
      <div className="px-4">
        {enrollmentStep === 'details' && renderDetailsStep()}
        {enrollmentStep === 'payment' && renderPaymentStep()}
        {enrollmentStep === 'confirmation' && renderConfirmationStep()}
      </div>
    </div>
  );
}