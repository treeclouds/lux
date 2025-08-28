import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Shield,
  CheckCircle,
  Info,
  Clock,
  Euro
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventRegistrationProps {
  event: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export function EventRegistration({ event, onBack, onNavigate }: EventRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    
    // Event Preferences
    dietaryRequirements: '',
    accessibilityNeeds: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    
    // Additional
    hearAbout: '',
    expectations: '',
    networking: true,
    marketing: false
  });

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

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle registration submission
    console.log('Registration submitted:', formData);
    onNavigate?.('registration-success', { event, registrationId: 'REG-2024-001' });
  };

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic details' },
    { number: 2, title: 'Event Details', description: 'Preferences & needs' },
    { number: 3, title: 'Payment', description: 'Billing information' },
    { number: 4, title: 'Review', description: 'Confirm registration' }
  ];

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-medium text-sm">Event Registration</h1>
            <p className="text-xs text-muted-foreground truncate">{event.title}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Progress Steps */}
        <div className="p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep >= step.number 
                    ? 'bg-navy text-pearl' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-2 ${
                    currentStep > step.number ? 'bg-navy' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="text-sm font-medium">{steps[currentStep - 1].title}</div>
            <div className="text-xs text-muted-foreground">{steps[currentStep - 1].description}</div>
          </div>
        </div>

        {/* Event Summary */}
        <Card className="m-4 p-4 border-none shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm mb-1">{event.title}</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={10} />
                  {event.date}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={10} />
                  {event.location}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-sm">{event.price}</div>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
          </div>
        </Card>

        {/* Form Content */}
        <div className="p-4">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name *</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name *</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Company/Organization</label>
                <Input
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Job Title</label>
                <Input
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData('jobTitle', e.target.value)}
                  placeholder="Enter job title"
                />
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Dietary Requirements</label>
                <Textarea
                  value={formData.dietaryRequirements}
                  onChange={(e) => updateFormData('dietaryRequirements', e.target.value)}
                  placeholder="Please specify any dietary requirements or allergies"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Accessibility Needs</label>
                <Textarea
                  value={formData.accessibilityNeeds}
                  onChange={(e) => updateFormData('accessibilityNeeds', e.target.value)}
                  placeholder="Please specify any accessibility requirements"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Emergency Contact</label>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Emergency Phone</label>
                  <Input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">How did you hear about this event?</label>
                <select 
                  className="w-full p-2 border border-border rounded-lg bg-background text-sm"
                  value={formData.hearAbout}
                  onChange={(e) => updateFormData('hearAbout', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="website">Affluent Institute Website</option>
                  <option value="email">Email Newsletter</option>
                  <option value="social">Social Media</option>
                  <option value="colleague">Colleague/Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">What are your expectations for this event?</label>
                <Textarea
                  value={formData.expectations}
                  onChange={(e) => updateFormData('expectations', e.target.value)}
                  placeholder="Tell us what you hope to gain from attending this event"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <Card className="p-4 border-dashed border-muted-foreground/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-green-500" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-muted-foreground">Your payment information is encrypted and secure</p>
              </Card>

              <div>
                <label className="text-sm font-medium mb-2 block">Card Number *</label>
                <Input
                  value={formData.cardNumber}
                  onChange={(e) => updateFormData('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Expiry Date *</label>
                  <Input
                    value={formData.expiryDate}
                    onChange={(e) => updateFormData('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">CVV *</label>
                  <Input
                    value={formData.cvv}
                    onChange={(e) => updateFormData('cvv', e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Billing Address *</label>
                <Textarea
                  value={formData.billingAddress}
                  onChange={(e) => updateFormData('billingAddress', e.target.value)}
                  placeholder="Enter complete billing address"
                  rows={3}
                />
              </div>

              {/* Order Summary */}
              <Card className="p-4 bg-muted/30 border-none">
                <h4 className="font-medium mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Event Registration</span>
                    <span>{event.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee</span>
                    <span>€45</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>€2,895</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <Card className="p-4 border-none shadow-sm">
                <h4 className="font-medium mb-3">Registration Summary</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Attendee</div>
                    <div className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{formData.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Company</div>
                    <div className="text-sm text-muted-foreground">
                      {formData.company || 'Not specified'} • {formData.jobTitle || 'Not specified'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Special Requirements</div>
                    <div className="text-sm text-muted-foreground">
                      {formData.dietaryRequirements || formData.accessibilityNeeds ? 
                        (formData.dietaryRequirements + ' ' + formData.accessibilityNeeds) : 
                        'None specified'}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-none shadow-sm">
                <h4 className="font-medium mb-3">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Amount</span>
                    <span className="font-medium">€2,895</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span>•••• •••• •••• {formData.cardNumber.slice(-4)}</span>
                  </div>
                </div>
              </Card>

              <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground">
                    I agree to the Terms and Conditions and Privacy Policy. I understand the cancellation policy and payment terms.
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    id="marketing"
                    checked={formData.marketing}
                    onChange={(e) => updateFormData('marketing', e.target.checked)}
                  />
                  <label htmlFor="marketing" className="text-xs text-muted-foreground">
                    I would like to receive updates about future events and professional development opportunities.
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                Previous
              </Button>
            )}
            {currentStep < 4 ? (
              <Button 
                onClick={handleNext} 
                className="flex-1 bg-navy hover:bg-navy/90 text-pearl"
                disabled={currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-navy hover:bg-navy/90 text-pearl"
              >
                <CreditCard size={16} className="mr-2" />
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}