import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  FileText,
  ArrowLeft
} from 'lucide-react';

const StudentRegister = ({ onRegister, switchToLogin }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    
    // Academic Information
    studentId: '',
    program: '',
    year: '',
    
    // Account Information
    password: '',
    confirmPassword: '',
    
    // Documents
    transcripts: null,
    idDocument: null,
    
    // Agreement
    termsAccepted: false,
    dataProcessingConsent: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = [
    'Computer Science',
    'Data Science',
    'Software Engineering',
    'Information Technology',
    'Artificial Intelligence',
    'Cybersecurity',
    'Computer Engineering'
  ];

  const years = [1, 2, 3, 4, 5];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }
    
    if (step === 2) {
      if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
      if (!formData.program) newErrors.program = 'Program is required';
      if (!formData.year) newErrors.year = 'Academic year is required';
    }
    
    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (step === 4) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
      if (!formData.dataProcessingConsent) newErrors.dataProcessingConsent = 'Data processing consent is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create registration data
      const registrationData = {
        ...formData,
        registrationDate: new Date().toISOString(),
        status: 'pending_approval',
        approvalStatus: 'waiting_for_instructor'
      };
      
      // Call the registration handler
      onRegister(registrationData);
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <h3 className="text-md font-semibold text-white mb-3">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">First Name *</label>
          <div className="relative">
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Last Name *</label>
          <div className="relative">
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1-555-0123"
            />
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Gender *</label>
          <div className="relative">
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
    >
      <h3 className="text-md font-semibold text-white mb-3">Academic Information</h3>
      
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Student ID *</label>
        <div className="relative">
          <GraduationCap className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your student ID"
          />
        </div>
        {errors.studentId && <p className="text-red-400 text-xs mt-1">{errors.studentId}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Program *</label>
          <div className="relative">
            <BookOpen className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <select
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select program</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>
          {errors.program && <p className="text-red-400 text-xs mt-1">{errors.program}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Academic Year *</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select year</option>
            {years.map(year => (
              <option key={year} value={year}>Year {year}</option>
            ))}
          </select>
          {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
        </div>
      </div>
      

    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
    >
      <h3 className="text-md font-semibold text-white mb-3">Account Security</h3>
      
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Password *</label>
        <div className="relative">
          <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-8 pr-10 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        <p className="text-gray-400 text-xs mt-1">Password must be at least 8 characters long</p>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password *</label>
        <div className="relative">
          <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full pl-8 pr-10 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      
      {/* Document Upload */}
      <div className="space-y-3 pt-3 border-t border-gray-600">
        <h4 className="text-sm font-medium text-white">Supporting Documents (Optional)</h4>
        
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Academic Transcripts</label>
          <div className="relative">
            <FileText className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="file"
              name="transcripts"
              onChange={handleInputChange}
              accept=".pdf,.doc,.docx"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-2 file:py-0.5 file:px-1 file:rounded file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">PDF, DOC, or DOCX files only</p>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">ID Document</label>
          <div className="relative">
            <Upload className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="file"
              name="idDocument"
              onChange={handleInputChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-2 file:py-0.5 file:px-1 file:rounded file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">PDF or image files only</p>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
    >
      <h3 className="text-md font-semibold text-white mb-3">Review & Agreement</h3>
      
      {/* Registration Summary */}
      <div className="bg-gray-700/50 rounded-lg p-3 space-y-2">
        <h4 className="text-white font-medium text-sm">Registration Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-400">Name:</p>
            <p className="text-white">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email:</p>
            <p className="text-white">{formData.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Student ID:</p>
            <p className="text-white">{formData.studentId}</p>
          </div>
          <div>
            <p className="text-gray-400">Program:</p>
            <p className="text-white">{formData.program} - Year {formData.year}</p>
          </div>
        </div>
      </div>
      
      {/* Terms and Conditions */}
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="w-3 h-3 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 mt-1"
          />
          <div>
            <label className="text-xs text-gray-300">
              I agree to the <button type="button" className="text-blue-400 hover:text-blue-300">Terms and Conditions</button> and <button type="button" className="text-blue-400 hover:text-blue-300">Privacy Policy</button> *
            </label>
            {errors.termsAccepted && <p className="text-red-400 text-xs mt-1">{errors.termsAccepted}</p>}
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="dataProcessingConsent"
            checked={formData.dataProcessingConsent}
            onChange={handleInputChange}
            className="w-3 h-3 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 mt-1"
          />
          <div>
            <label className="text-xs text-gray-300">
              I consent to the processing of my personal data for educational purposes and communication *
            </label>
            {errors.dataProcessingConsent && <p className="text-red-400 text-xs mt-1">{errors.dataProcessingConsent}</p>}
          </div>
        </div>
      </div>
      
      {/* Important Notice */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-blue-400 font-medium mb-1 text-sm">Registration Review Process</h4>
            <p className="text-gray-300 text-xs">
              Your registration will be reviewed by the instructor. You will receive an email notification once your account is approved. 
              This process typically takes 1-2 business days.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Academic Info', icon: BookOpen },
    { number: 3, title: 'Account Setup', icon: Lock },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl mx-4"
      >
        <div className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl p-4 border border-gray-700">

          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-2">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white mb-1">Student Registration</h1>
            <p className="text-gray-400 text-sm">Join Dr. Daniel's courses and access the learning portal</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200 ${
                  currentStep >= step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="ml-1 hidden sm:block">
                  <p className={`text-xs font-medium ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-6 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Error Message */}
            {errors.submit && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Single Row Navigation - All elements aligned on red line */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                {/* Left: Back to Login (only on first page) or Previous button */}
                <div>
                  {currentStep === 1 ? (
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 text-xs"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to Login</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-1.5 text-sm border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Previous
                    </button>
                  )}
                </div>
                
                {/* Center: Sign in here */}
                <div className="text-center">
                  <p className="text-gray-400 text-xs">
                    Already have an account?{' '}
                    <button 
                      onClick={switchToLogin}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
                
                {/* Right: Next/Submit button */}
                <div>
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Submit Registration</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentRegister;