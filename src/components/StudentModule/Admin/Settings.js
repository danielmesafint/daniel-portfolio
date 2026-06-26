import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Camera,
  Edit
} from 'lucide-react';

const Settings = ({ instructor }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      firstName: instructor?.firstName || 'Daniel',
      lastName: instructor?.lastName || 'Mesafint',
      email: instructor?.email || 'daniel.mesafint@university.edu',
      phone: '+1 (555) 123-4567',
      department: 'Computer Science',
      title: 'Associate Professor',
      bio: 'Experienced educator and researcher in machine learning and artificial intelligence.',
      officeLocation: 'Room 301, CS Building',
      officeHours: 'Mon, Wed, Fri 2:00-4:00 PM',
      website: 'https://danielmesafint.com',
      profileImage: null
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      newRegistrations: true,
      assignmentSubmissions: true,
      forumPosts: false,
      gradeReminders: true,
      officeHourBookings: true,
      systemUpdates: true,
      weeklyReports: true
    },
    privacy: {
      profileVisibility: 'students',
      emailVisibility: 'private',
      phoneVisibility: 'private',
      officeHoursVisibility: 'public',
      allowStudentMessages: true,
      showOnlineStatus: true,
      dataSharing: false
    },
    appearance: {
      theme: 'dark',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAlerts: true,
      passwordExpiry: '90',
      allowedIPs: ''
    },
    system: {
      autoSave: true,
      backupFrequency: 'weekly',
      dataRetention: '2years',
      exportFormat: 'json',
      debugMode: false
    }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const sections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'system', name: 'System', icon: Database }
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwords.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // Simulate password change
    alert('Password changed successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSettingChange('profile', 'profileImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfileSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
      
      {/* Profile Image */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
            {settings.profile.profileImage ? (
              <img 
                src={settings.profile.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer transition-colors duration-200">
            <Camera className="w-4 h-4 text-white" />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="hidden" 
            />
          </label>
        </div>
        <div>
          <h4 className="text-white font-medium">{settings.profile.firstName} {settings.profile.lastName}</h4>
          <p className="text-gray-400 text-sm">{settings.profile.title}</p>
          <p className="text-gray-400 text-sm">{settings.profile.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={settings.profile.firstName}
            onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={settings.profile.lastName}
            onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Department</label>
          <input
            type="text"
            value={settings.profile.department}
            onChange={(e) => handleSettingChange('profile', 'department', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={settings.profile.title}
            onChange={(e) => handleSettingChange('profile', 'title', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Office Location</label>
          <input
            type="text"
            value={settings.profile.officeLocation}
            onChange={(e) => handleSettingChange('profile', 'officeLocation', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Website</label>
          <input
            type="url"
            value={settings.profile.website}
            onChange={(e) => handleSettingChange('profile', 'website', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
        <textarea
          value={settings.profile.bio}
          onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Change Password Section */}
      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-medium text-white mb-4">Change Password</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handlePasswordChange}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors duration-200"
        >
          Change Password
        </button>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Email Notifications</h4>
            <p className="text-gray-400 text-sm">Receive notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">New Student Registrations</h4>
            <p className="text-gray-400 text-sm">Get notified when students register</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.newRegistrations}
              onChange={(e) => handleSettingChange('notifications', 'newRegistrations', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Assignment Submissions</h4>
            <p className="text-gray-400 text-sm">Get notified when students submit assignments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.assignmentSubmissions}
              onChange={(e) => handleSettingChange('notifications', 'assignmentSubmissions', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Office Hour Bookings</h4>
            <p className="text-gray-400 text-sm">Get notified when students book office hours</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.officeHourBookings}
              onChange={(e) => handleSettingChange('notifications', 'officeHourBookings', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Weekly Reports</h4>
            <p className="text-gray-400 text-sm">Receive weekly activity summaries</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.weeklyReports}
              onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const PrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">Profile Visibility</h4>
          <p className="text-gray-400 text-sm mb-3">Who can see your profile information</p>
          <select
            value={settings.privacy.profileVisibility}
            onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="public">Public</option>
            <option value="students">Students Only</option>
            <option value="faculty">Faculty Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">Email Visibility</h4>
          <p className="text-gray-400 text-sm mb-3">Who can see your email address</p>
          <select
            value={settings.privacy.emailVisibility}
            onChange={(e) => handleSettingChange('privacy', 'emailVisibility', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="public">Public</option>
            <option value="students">Students Only</option>
            <option value="faculty">Faculty Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Allow Student Messages</h4>
            <p className="text-gray-400 text-sm">Students can send you direct messages</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.privacy.allowStudentMessages}
              onChange={(e) => handleSettingChange('privacy', 'allowStudentMessages', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Show Online Status</h4>
            <p className="text-gray-400 text-sm">Others can see when you're online</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.privacy.showOnlineStatus}
              onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const AppearanceSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Appearance & Language</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Theme</label>
          <select
            value={settings.appearance.theme}
            onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Language</label>
          <select
            value={settings.appearance.language}
            onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Timezone</label>
          <select
            value={settings.appearance.timezone}
            onChange={(e) => handleSettingChange('appearance', 'timezone', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Date Format</label>
          <select
            value={settings.appearance.dateFormat}
            onChange={(e) => handleSettingChange('appearance', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">Session Timeout</h4>
          <p className="text-gray-400 text-sm mb-3">Automatically log out after inactivity (minutes)</p>
          <select
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="0">Never</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Login Alerts</h4>
            <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.loginAlerts}
              onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const SystemSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">System Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Auto-Save</h4>
            <p className="text-gray-400 text-sm">Automatically save your work</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.system.autoSave}
              onChange={(e) => handleSettingChange('system', 'autoSave', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">Backup Frequency</h4>
          <p className="text-gray-400 text-sm mb-3">How often to backup your data</p>
          <select
            value={settings.system.backupFrequency}
            onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="never">Never</option>
          </select>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">Data Export</h4>
          <p className="text-gray-400 text-sm mb-3">Export your data for backup or migration</p>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-white transition-colors duration-200 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import Data</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h4 className="text-red-400 font-medium mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Danger Zone
          </h4>
          <p className="text-gray-400 text-sm mb-3">Irreversible actions that affect your account</p>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white transition-colors duration-200 flex items-center space-x-2">
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'notifications': return <NotificationsSection />;
      case 'privacy': return <PrivacySection />;
      case 'appearance': return <AppearanceSection />;
      case 'security': return <SecuritySection />;
      case 'system': return <SystemSection />;
      default: return <ProfileSection />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SettingsIcon className="w-8 h-8 text-gray-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Manage your account preferences and system settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {saveStatus && (
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
              saveStatus === 'saving' ? 'bg-blue-500/10 text-blue-400' :
              saveStatus === 'success' ? 'bg-green-500/10 text-green-400' :
              'bg-red-500/10 text-red-400'
            }`}>
              {saveStatus === 'saving' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : saveStatus === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span className="text-sm">
                {saveStatus === 'saving' ? 'Saving...' :
                 saveStatus === 'success' ? 'Saved!' : 'Error'}
              </span>
            </div>
          )}
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 sticky top-6">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            {renderSection()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;