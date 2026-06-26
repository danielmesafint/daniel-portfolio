import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  MapPin,
  Video,
  Phone
} from 'lucide-react';

const OfficeHoursManagement = ({ instructor }) => {
  const [officeHours, setOfficeHours] = useState([
    {
      id: 1,
      day: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Room 301',
      type: 'in-person',
      maxStudents: 5,
      isActive: true
    },
    {
      id: 2,
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Zoom Meeting',
      type: 'virtual',
      maxStudents: 10,
      isActive: true
    },
    {
      id: 3,
      day: 'Friday',
      startTime: '15:00',
      endTime: '17:00',
      location: 'Room 301',
      type: 'in-person',
      maxStudents: 5,
      isActive: true
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'ST001',
      studentEmail: 'john.doe@university.edu',
      officeHourId: 1,
      date: '2024-01-22',
      timeSlot: '14:00-14:30',
      topic: 'Help with Neural Networks assignment',
      status: 'confirmed',
      notes: 'Student needs help understanding backpropagation'
    },
    {
      id: 2,
      studentName: 'Sarah Smith',
      studentId: 'ST002',
      studentEmail: 'sarah.smith@university.edu',
      officeHourId: 2,
      date: '2024-01-24',
      timeSlot: '10:30-11:00',
      topic: 'Discuss research opportunities',
      status: 'pending',
      notes: 'Interested in machine learning research'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'ST003',
      studentEmail: 'mike.johnson@university.edu',
      officeHourId: 1,
      date: '2024-01-22',
      timeSlot: '15:00-15:30',
      topic: 'Career advice',
      status: 'confirmed',
      notes: 'Wants to discuss graduate school options'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOfficeHour, setEditingOfficeHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddOfficeHour = () => {
    setEditingOfficeHour(null);
    setShowAddModal(true);
  };

  const handleEditOfficeHour = (officeHour) => {
    setEditingOfficeHour(officeHour);
    setShowAddModal(true);
  };

  const handleDeleteOfficeHour = (officeHourId) => {
    if (window.confirm('Are you sure you want to delete this office hour?')) {
      setOfficeHours(officeHours.filter(oh => oh.id !== officeHourId));
    }
  };

  const handleBookingAction = (bookingId, action) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action }
        : booking
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-400';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400';
      case 'cancelled': return 'bg-red-500/10 text-red-400';
      case 'completed': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'in-person': return <MapPin className="w-4 h-4" />;
      case 'virtual': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesDate = booking.date === selectedDate;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const OfficeHourModal = () => {
    const [formData, setFormData] = useState(editingOfficeHour || {
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      type: 'in-person',
      maxStudents: 5,
      isActive: true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingOfficeHour) {
        setOfficeHours(officeHours.map(oh => 
          oh.id === editingOfficeHour.id ? { ...formData, id: editingOfficeHour.id } : oh
        ));
      } else {
        setOfficeHours([...officeHours, { ...formData, id: Date.now() }]);
      }
      setShowAddModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            {editingOfficeHour ? 'Edit Office Hour' : 'Add Office Hour'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Day</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({...formData, day: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="in-person">In-Person</option>
                <option value="virtual">Virtual</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Room number or meeting link"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Max Students</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value)})}
                min="1"
                max="20"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-gray-300 text-sm">Active</label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                {editingOfficeHour ? 'Update' : 'Add'} Office Hour
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Office Hours Management</h2>
          <p className="text-gray-400">Manage your office hours schedule and student bookings</p>
        </div>
        <button
          onClick={handleAddOfficeHour}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Office Hour</span>
        </button>
      </div>

      {/* Office Hours Schedule */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {officeHours.map((officeHour) => (
            <motion.div
              key={officeHour.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg border ${
                officeHour.isActive 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-700/20 border-gray-700 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{officeHour.day}</h4>
                  <p className="text-gray-400 text-sm">
                    {officeHour.startTime} - {officeHour.endTime}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEditOfficeHour(officeHour)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                  >
                    <Edit className="w-3 h-3 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteOfficeHour(officeHour.id)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                {getTypeIcon(officeHour.type)}
                <span>{officeHour.location}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Max: {officeHour.maxStudents} students</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  officeHour.isActive 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-gray-500/10 text-gray-400'
                }`}>
                  {officeHour.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bookings Management */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Student Bookings</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-medium">{booking.studentName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{booking.studentId} • {booking.studentEmail}</p>
                  <p className="text-gray-300 text-sm mb-2">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {booking.timeSlot}
                  </p>
                  <p className="text-white text-sm font-medium mb-1">Topic: {booking.topic}</p>
                  {booking.notes && (
                    <p className="text-gray-400 text-sm">Notes: {booking.notes}</p>
                  )}
                </div>
                
                {booking.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBookingAction(booking.id, 'confirmed')}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleBookingAction(booking.id, 'cancelled')}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleBookingAction(booking.id, 'completed')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors duration-200"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">No bookings found for the selected date</p>
          </div>
        )}
      </div>

      {/* Add/Edit Office Hour Modal */}
      {showAddModal && <OfficeHourModal />}
    </motion.div>
  );
};

export default OfficeHoursManagement;