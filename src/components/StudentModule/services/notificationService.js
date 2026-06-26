// Notification Service for Student Portal
// This service handles email notifications and other communication

class NotificationService {
  constructor() {
    this.notificationHistory = this.loadNotificationHistory();
  }

  // Load notification history from localStorage
  loadNotificationHistory() {
    try {
      const history = localStorage.getItem('notificationHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading notification history:', error);
      return [];
    }
  }

  // Save notification history to localStorage
  saveNotificationHistory() {
    try {
      localStorage.setItem('notificationHistory', JSON.stringify(this.notificationHistory));
    } catch (error) {
      console.error('Error saving notification history:', error);
    }
  }

  // Create a notification record
  createNotificationRecord(type, recipient, subject, message, status = 'sent') {
    const notification = {
      id: Date.now() + Math.random(),
      type,
      recipient,
      subject,
      message,
      status,
      timestamp: new Date().toISOString(),
      readAt: null
    };

    this.notificationHistory.push(notification);
    this.saveNotificationHistory();
    return notification;
  }

  // Send approval email notification
  async sendApprovalNotification(studentData) {
    const subject = 'Student Portal Access Approved - Welcome!';
    const message = this.generateApprovalEmailContent(studentData);

    try {
      // In a real application, this would call an actual email service
      // For now, we'll simulate the email sending process
      await this.simulateEmailSending(studentData.email, subject, message);

      // Create notification record
      const notification = this.createNotificationRecord(
        'approval',
        studentData.email,
        subject,
        message,
        'sent'
      );

      // Show success message to instructor
      this.showNotificationToInstructor(
        'success',
        `Approval email sent to ${studentData.firstName} ${studentData.lastName} (${studentData.email})`
      );

      return { success: true, notification };
    } catch (error) {
      console.error('Failed to send approval notification:', error);
      
      // Create failed notification record
      const notification = this.createNotificationRecord(
        'approval',
        studentData.email,
        subject,
        message,
        'failed'
      );

      // Show error message to instructor
      this.showNotificationToInstructor(
        'error',
        `Failed to send approval email to ${studentData.email}. Please contact the student manually.`
      );

      return { success: false, error: error.message, notification };
    }
  }

  // Send rejection email notification
  async sendRejectionNotification(studentData, reason = '') {
    const subject = 'Student Portal Registration Update';
    const message = this.generateRejectionEmailContent(studentData, reason);

    try {
      await this.simulateEmailSending(studentData.email, subject, message);

      const notification = this.createNotificationRecord(
        'rejection',
        studentData.email,
        subject,
        message,
        'sent'
      );

      this.showNotificationToInstructor(
        'info',
        `Rejection notification sent to ${studentData.firstName} ${studentData.lastName} (${studentData.email})`
      );

      return { success: true, notification };
    } catch (error) {
      console.error('Failed to send rejection notification:', error);
      
      const notification = this.createNotificationRecord(
        'rejection',
        studentData.email,
        subject,
        message,
        'failed'
      );

      this.showNotificationToInstructor(
        'error',
        `Failed to send rejection email to ${studentData.email}. Please contact the student manually.`
      );

      return { success: false, error: error.message, notification };
    }
  }

  // Generate approval email content
  generateApprovalEmailContent(studentData) {
    return `
Dear ${studentData.firstName} ${studentData.lastName},

Congratulations! Your registration for Dr. Daniel Mesafint's Student Portal has been approved.

Registration Details:
- Student ID: ${studentData.studentId}
- Program: ${studentData.program}
- Academic Year: Year ${studentData.year}
- Email: ${studentData.email}

You can now access the Student Portal using your registered email and password:
🔗 Portal Access: ${window.location.origin}/student

What you can do now:
✅ Access course materials and assignments
✅ View your grades and academic progress
✅ Book office hours with instructors
✅ Participate in course forums and discussions
✅ Use the AI-powered student assistant
✅ Collaborate on research projects

Getting Started:
1. Visit the Student Portal login page
2. Use your registered email: ${studentData.email}
3. Enter the password you created during registration
4. Explore your personalized dashboard

If you have any questions or need assistance, please don't hesitate to contact:
📧 Dr. Daniel Mesafint: daniel@university.edu
📞 Office Hours: Mon, Wed, Fri 2:00-4:00 PM

Welcome to the learning community!

Best regards,
Dr. Daniel Mesafint
Assistant Professor, Computer Science Department

---
This is an automated message from the Student Portal System.
Please do not reply to this email.
    `.trim();
  }

  // Generate rejection email content
  generateRejectionEmailContent(studentData, reason) {
    return `
Dear ${studentData.firstName} ${studentData.lastName},

Thank you for your interest in registering for Dr. Daniel Mesafint's Student Portal.

After careful review, we regret to inform you that your registration application has not been approved at this time.

Registration Details:
- Student ID: ${studentData.studentId}
- Program: ${studentData.program}
- Email: ${studentData.email}
- Application Date: ${new Date(studentData.registrationDate).toLocaleDateString()}

${reason ? `Reason: ${reason}` : ''}

Next Steps:
If you believe this decision was made in error or if you have additional information to support your application, please contact Dr. Daniel Mesafint directly:

📧 Email: daniel@university.edu
📞 Office Hours: Mon, Wed, Fri 2:00-4:00 PM
🏢 Office: Room 301

You may also reapply in the future if your circumstances change or if you meet the necessary requirements.

Thank you for your understanding.

Best regards,
Dr. Daniel Mesafint
Assistant Professor, Computer Science Department

---
This is an automated message from the Student Portal System.
Please do not reply to this email.
    `.trim();
  }

  // Simulate email sending (replace with actual email service in production)
  async simulateEmailSending(to, subject, message) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simulate occasional failures (5% failure rate)
    if (Math.random() < 0.05) {
      throw new Error('Email service temporarily unavailable');
    }

    // Log the email for development purposes
    console.log('📧 EMAIL SENT:', {
      to,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // In production, replace this with actual email service call:
    // return await emailProvider.send({ to, subject, html: message });
    
    return { success: true, messageId: `msg_${Date.now()}` };
  }

  // Show notification to instructor
  showNotificationToInstructor(type, message) {
    // Create a toast notification or alert
    const notification = {
      type, // 'success', 'error', 'info', 'warning'
      message,
      timestamp: new Date().toISOString()
    };

    // For now, use alert (in production, use a proper toast notification system)
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };

    alert(`${icons[type]} ${message}`);

    // Store instructor notifications for dashboard
    const instructorNotifications = JSON.parse(localStorage.getItem('instructorNotifications') || '[]');
    instructorNotifications.push(notification);
    localStorage.setItem('instructorNotifications', JSON.stringify(instructorNotifications));
  }

  // Get notification history
  getNotificationHistory(type = null, limit = 50) {
    let history = [...this.notificationHistory];
    
    if (type) {
      history = history.filter(notification => notification.type === type);
    }

    return history
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  // Get notification statistics
  getNotificationStats() {
    const total = this.notificationHistory.length;
    const sent = this.notificationHistory.filter(n => n.status === 'sent').length;
    const failed = this.notificationHistory.filter(n => n.status === 'failed').length;
    const approvals = this.notificationHistory.filter(n => n.type === 'approval').length;
    const rejections = this.notificationHistory.filter(n => n.type === 'rejection').length;

    return {
      total,
      sent,
      failed,
      approvals,
      rejections,
      successRate: total > 0 ? ((sent / total) * 100).toFixed(1) : 0
    };
  }
}

// Create and export a singleton instance
const notificationService = new NotificationService();
export default notificationService;