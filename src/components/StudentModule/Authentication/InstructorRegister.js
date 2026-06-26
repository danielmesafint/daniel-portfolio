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
  ArrowLeft,
  Building,
  Award,
  Users
} from 'lucide-react';

const InstructorRegister = ({ onRegister, switchToLogin }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',

    // Professional Information
    employeeId: '',
    title: '',
    department: '',
    institution: '',
    yearsExperience: '',
    specialization: '',

    // Account Information
    password: '',
    confirmPassword: '',

    // Documents
    cv: null,
    credentials: null,

    // Agreement
    termsAccepted: false,
    dataProcessingConsent: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titles = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Senior Lecturer',
    'Adjunct Professor',
    'Visiting Professor',
    'Research Professor'
  ];

  const departments = [
    'Computer Science',
    'Data Science',
    'Software Engineering',
    'Information Technology',
    'Artificial Intelligence',
    'Cybersecurity',
    'Computer Engineering',
    'Mathematics',
    'Physics',
    'Engineering'
  ];

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
      if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
      if (!formData.title) newErrors.title = 'Academic title is required';
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
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
        approvalStatus: 'waiting_for_admin',
        role: 'instructor'
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
      className="space-y-3"
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
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter institutional email"
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
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      <h3 className="text-md font-semibold text-white mb-3">Professional Information</h3>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Employee ID *</label>
        <div className="relative">
          <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your employee ID"
          />
        </div>
        {errors.employeeId && <p className="text-red-400 text-xs mt-1">{errors.employeeId}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Academic Title *</label>
          <div className="relative">
            <Award className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select title</option>
              {titles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
          </div>
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Department *</label>
          <div className="relative">
            <BookOpen className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">Institution *</label>
        <div className="relative">
          <Building className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="University or institution name"
          />
        </div>
        {errors.institution && <p className="text-red-400 text-xs mt-1">{errors.institution}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Years of Experience *</label>
          <select
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select experience</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="16-20">16-20 years</option>
            <option value="20+">20+ years</option>
          </select>
          {errors.yearsExperience && <p className="text-red-400 text-xs mt-1">{errors.yearsExperience}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Research area or specialization"
          />
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
            className="w-full pl-8 pr-10 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full pl-8 pr-10 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <label className="block text-xs font-medium text-gray-300 mb-1">Curriculum Vitae (CV)</label>
          <div className="relative">
            <FileText className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="file"
              name="cv"
              onChange={handleInputChange}
              accept=".pdf,.doc,.docx"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-2 file:py-0.5 file:px-1 file:rounded file:border-0 file:text-xs file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">PDF, DOC, or DOCX files only</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Academic Credentials</label>
          <div className="relative">
            <Upload className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="file"
              name="credentials"
              onChange={handleInputChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-2 file:py-0.5 file:px-1 file:rounded file:border-0 file:text-xs file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">Degrees, certifications, or other credentials</p>
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
            <p className="text-gray-400">Employee ID:</p>
            <p className="text-white">{formData.employeeId}</p>
          </div>
          <div>
            <p className="text-gray-400">Position:</p>
            <p className="text-white">{formData.title} - {formData.department}</p>
          </div>
          <div>
            <p className="text-gray-400">Institution:</p>
            <p className="text-white">{formData.institution}</p>
          </div>
          <div>
            <p className="text-gray-400">Experience:</p>
            <p className="text-white">{formData.yearsExperience} years</p>
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
            className="w-3 h-3 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 mt-1"
          />
          <div>
            <label className="text-xs text-gray-300">
              I agree to the <button type="button" className="text-purple-400 hover:text-purple-300">Terms and Conditions</button> and <button type="button" className="text-purple-400 hover:text-purple-300">Privacy Policy</button> *
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
            className="w-3 h-3 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 mt-1"
          />
          <div>
            <label className="text-xs text-gray-300">
              I consent to the processing of my personal data for educational and administrative purposes *
            </label>
            {errors.dataProcessingConsent && <p className="text-red-400 text-xs mt-1">{errors.dataProcessingConsent}</p>}
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-purple-400 font-medium mb-1 text-sm">Registration Review Process</h4>
            <p className="text-gray-300 text-xs">
              Your instructor registration will be reviewed by the system administrator. You will receive an email notification once your account is approved.
              This process typically takes 2-3 business days for verification of credentials.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Professional Info', icon: Award },
    { number: 3, title: 'Account Setup', icon: Lock },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-4">
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
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white mb-1">Instructor Registration</h1>
            <p className="text-gray-400 text-sm">Join the Academic Portal as an instructor</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200 ${currentStep >= step.number
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-gray-600 text-gray-400'
                  }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="ml-1 hidden sm:block">
                  <p className={`text-xs font-medium ${currentStep >= step.number ? 'text-white' : 'text-gray-400'
                    }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-6 h-0.5 mx-2 ${currentStep > step.number ? 'bg-purple-600' : 'bg-gray-600'
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
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
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
                      className="px-4 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
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

export default InstructorRegister;