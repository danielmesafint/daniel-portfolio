import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, GraduationCap, AlertCircle } from 'lucide-react';

const StudentLogin = ({ onLogin, switchToInstructor, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call - replace with actual authentication service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check approved students list for authentication
      const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents') || '[]');
      const approvedStudent = approvedStudents.find(student => student.email === formData.email);
      
      if (approvedStudent) {
        // In a real application, you would verify the password hash
        // For now, we'll use a simple check or allow any password for approved students
        const userData = {
          id: approvedStudent.id,
          studentId: approvedStudent.studentId,
          firstName: approvedStudent.firstName,
          lastName: approvedStudent.lastName,
          email: approvedStudent.email,
          program: approvedStudent.program,
          year: approvedStudent.year,
          role: 'student'
        };
        const token = `student-token-${approvedStudent.id}`;
        onLogin(userData, token);
      } else if (formData.email === 'student@example.com' && formData.password === 'password') {
        // Keep the demo login for testing
        const userData = {
          id: '1',
          studentId: 'STU001',
          firstName: 'John',
          lastName: 'Doe',
          email: formData.email,
          program: 'Computer Science',
          year: 3,
          role: 'student'
        };
        const token = 'mock-jwt-token';
        onLogin(userData, token);
      } else {
        // Check if the email exists in pending registrations
        const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
        const pendingStudent = pendingRegistrations.find(reg => reg.email === formData.email);
        
        if (pendingStudent) {
          if (pendingStudent.status === 'pending') {
            setError('Your registration is still pending approval. Please wait for instructor approval.');
          } else if (pendingStudent.status === 'rejected') {
            setError('Your registration was not approved. Please contact the instructor for more information.');
          } else {
            setError('Invalid password. Please check your credentials.');
          }
        } else {
          setError('Account not found. Please register first or use demo credentials: student@example.com / password');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-900 pt-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl p-4 max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-3">
            <div className="flex justify-center mb-1">
              <div className="bg-gray-800 rounded-lg p-2 shadow-lg">
                <img 
                  src="/academic_portal.png" 
                  alt="Academic Portal" 
                  className="w-10 h-10"
                />
              </div>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Academic Portal</h1>
            <p className="text-gray-400 text-xs">A central hub for courses, assessments, grades, and academic collaboration.</p>
          </div>

          {/* Form Area with Border */}
          <div className="border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-0.5">
            <div className="bg-gray-800 rounded-xl p-3">
            {/* User Type Selection */}
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="instructor"
                    onChange={() => switchToInstructor()}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm">I'm an Instructor</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm">I'm a Student</span>
                </label>
              </div>
            </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Field */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Email Address"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Agreement Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                />
                <span className="text-gray-300 text-xs">
                  I agree to the website's{' '}
                  <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </button>
                  {' '}&{' '}
                  <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                    Terms and Conditions
                  </button>
                </span>
              </label>
              
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                />
                <span className="text-gray-300 text-xs">
                  I certify that I am a registered student.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </motion.button>
          </form>

          {/* Already have account link */}
          <div className="text-center mt-3">
            <p className="text-gray-400 text-xs">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={switchToRegister}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>

          {/* Divider Line */}
          <div className="flex items-center my-1">
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* OR Text */}
          <div className="text-center">
            <span className="text-gray-400 text-xs">OR</span>
          </div>
          
          {/* Continue With Text */}
          <div className="text-center">
            <span className="text-gray-400 text-xs">Continue With</span>
          </div>

          {/* Social Login Options */}
          <div className="flex justify-center space-x-4">
            {/* Google */}
            <button
              type="button"
              className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
            >
              <img 
                src="/google.png" 
                alt="Google" 
                className="w-5 h-5"
              />
            </button>
            
            {/* Outlook */}
            <button
              type="button"
              className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
            >
              <img 
                src="/outlook.png" 
                alt="Outlook" 
                className="w-5 h-5"
              />
            </button>
          </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;