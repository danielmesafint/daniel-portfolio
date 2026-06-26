import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Plus, X, CheckCircle, AlertCircle, Filter } from 'lucide-react';

const BookingSystem = ({ user }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingReason, setBookingReason] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('all');
  const [isBooking, setIsBooking] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      instructor: 'Dr. Daniel Mesafint',
      date: '2024-01-15',
      time: '2:00 PM',
      location: 'Office 301',
      reason: 'Discuss thesis progress',
      status: 'confirmed'
    }
  ]);

  // Mock available slots
  const availableSlots = [
    {
      id: 1,
      instructor: 'Dr. Daniel Mesafint',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '30 min',
      location: 'Office 301',
      type: 'Office Hours'
    },
    {
      id: 2,
      instructor: 'Dr. Smith',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '45 min',
      location: 'Office 205',
      type: 'Office Hours'
    },
    {
      id: 3,
      instructor: 'Dr. Johnson',
      date: '2024-01-17',
      time: '3:00 PM',
      duration: '30 min',
      location: 'Office 150',
      type: 'Office Hours'
    },
    {
      id: 4,
      instructor: 'Dr. Daniel Mesafint',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '30 min',
      location: 'Office 301',
      type: 'Research Discussion'
    },
    {
      id: 5,
      instructor: 'Dr. Brown',
      date: '2024-01-18',
      time: '1:00 PM',
      duration: '30 min',
      location: 'Office 180',
      type: 'Office Hours'
    }
  ];

  const instructors = [...new Set(availableSlots.map(slot => slot.instructor))];
  
  const filteredSlots = availableSlots.filter(slot => {
    if (filterInstructor === 'all') return true;
    return slot.instructor === filterInstructor;
  });

  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmBooking = async () => {
    if (!bookingReason.trim()) {
      alert('Please provide a reason for the meeting.');
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add new appointment
    const newAppointment = {
      id: appointments.length + 1,
      instructor: selectedSlot.instructor,
      date: selectedSlot.date,
      time: selectedSlot.time,
      location: selectedSlot.location,
      reason: bookingReason,
      status: 'confirmed'
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    setSelectedSlot(null);
    setBookingReason('');
    setIsBooking(false);
    
    alert('Appointment booked successfully! You will receive a confirmation email.');
  };

  const cancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      alert('Appointment cancelled successfully.');
    }
  };

  const rescheduleAppointment = (appointmentId) => {
    alert('Reschedule functionality - redirecting to available slots...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 text-red-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Office Hours Booking</h1>
              <p className="text-gray-400">Schedule meetings with your instructors</p>
            </div>
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={filterInstructor}
              onChange={(e) => setFilterInstructor(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Instructors</option>
              {instructors.map(instructor => (
                <option key={instructor} value={instructor}>{instructor}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Slots */}
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-400" />
              Available Slots
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredSlots.map((slot) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-600/50 rounded-lg hover:bg-gray-600/70 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <User className="w-4 h-4 text-blue-400" />
                        <p className="text-white font-medium">{slot.instructor}</p>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                          {slot.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{slot.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{slot.time} ({slot.duration})</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{slot.location}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookSlot(slot)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Book</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Appointments */}
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              My Appointments ({appointments.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-green-400" />
                        <p className="text-white font-medium">{appointment.instructor}</p>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{appointment.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{appointment.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{appointment.location}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">
                      <strong>Reason:</strong> {appointment.reason}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => rescheduleAppointment(appointment.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white text-xs transition-colors duration-200"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No upcoming appointments</p>
                  <p className="text-gray-500 text-sm">Book a slot to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSlot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {/* Appointment Details */}
              <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
                <h3 className="text-white font-medium mb-3">{selectedSlot.instructor}</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedSlot.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedSlot.time} ({selectedSlot.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedSlot.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Reason for Meeting */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">
                  Reason for Meeting <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="Please describe what you'd like to discuss..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={isBooking || !bookingReason.trim()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingSystem;