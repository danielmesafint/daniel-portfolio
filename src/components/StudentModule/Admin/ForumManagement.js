import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Pin, 
  Lock, 
  Unlock,
  Trash2,
  Reply,
  Eye,
  Flag,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

const ForumManagement = ({ instructor }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Help with Neural Networks Implementation',
      author: 'John Doe',
      authorId: 'ST001',
      course: 'CS401 - Machine Learning',
      courseId: 1,
      content: 'I\'m having trouble implementing backpropagation. Can someone help me understand the gradient calculation?',
      createdAt: '2024-01-20T10:30:00Z',
      replies: 5,
      views: 23,
      status: 'open',
      isPinned: false,
      isLocked: false,
      tags: ['neural-networks', 'backpropagation', 'help'],
      lastActivity: '2024-01-20T15:45:00Z',
      isAnswered: false,
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Binary Tree Traversal Question',
      author: 'Sarah Smith',
      authorId: 'ST002',
      course: 'CS301 - Data Structures',
      courseId: 2,
      content: 'What\'s the difference between in-order and pre-order traversal? When should I use each?',
      createdAt: '2024-01-19T14:20:00Z',
      replies: 8,
      views: 45,
      status: 'answered',
      isPinned: true,
      isLocked: false,
      tags: ['binary-tree', 'traversal', 'algorithms'],
      lastActivity: '2024-01-20T09:15:00Z',
      isAnswered: true,
      priority: 'normal'
    },
    {
      id: 3,
      title: 'Assignment 3 Clarification Needed',
      author: 'Mike Johnson',
      authorId: 'ST003',
      course: 'CS401 - Machine Learning',
      courseId: 1,
      content: 'The requirements for assignment 3 are unclear. Should we implement the entire neural network from scratch or can we use libraries?',
      createdAt: '2024-01-18T16:45:00Z',
      replies: 12,
      views: 67,
      status: 'open',
      isPinned: false,
      isLocked: false,
      tags: ['assignment', 'clarification', 'neural-networks'],
      lastActivity: '2024-01-20T11:30:00Z',
      isAnswered: false,
      priority: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const courses = [
    { id: 1, code: 'CS401', name: 'Machine Learning' },
    { id: 2, code: 'CS301', name: 'Data Structures' },
    { id: 3, code: 'CS350', name: 'Database Systems' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || post.courseId === parseInt(filterCourse);
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || post.priority === filterPriority;
    return matchesSearch && matchesCourse && matchesStatus && matchesPriority;
  });

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        switch (action) {
          case 'pin':
            return { ...post, isPinned: !post.isPinned };
          case 'lock':
            return { ...post, isLocked: !post.isLocked };
          case 'answer':
            return { ...post, isAnswered: !post.isAnswered, status: post.isAnswered ? 'open' : 'answered' };
          case 'priority':
            const priorities = ['normal', 'high', 'urgent'];
            const currentIndex = priorities.indexOf(post.priority);
            const nextIndex = (currentIndex + 1) % priorities.length;
            return { ...post, priority: priorities[nextIndex] };
          default:
            return post;
        }
      }
      return post;
    }));
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-green-500/10 text-green-400';
      case 'open': return 'bg-blue-500/10 text-blue-400';
      case 'closed': return 'bg-gray-500/10 text-gray-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/10 text-red-400';
      case 'high': return 'bg-orange-500/10 text-orange-400';
      case 'normal': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const calculateStats = () => {
    const totalPosts = posts.length;
    const answeredPosts = posts.filter(p => p.isAnswered).length;
    const unansweredPosts = posts.filter(p => !p.isAnswered).length;
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const totalReplies = posts.reduce((sum, p) => sum + p.replies, 0);
    
    return { totalPosts, answeredPosts, unansweredPosts, totalViews, totalReplies };
  };

  const stats = calculateStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Forum Management</h2>
          <p className="text-gray-400">Manage student discussions and provide support</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Posts</p>
              <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Answered</p>
              <p className="text-2xl font-bold text-white">{stats.answeredPosts}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unanswered</p>
              <p className="text-2xl font-bold text-white">{stats.unansweredPosts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Replies</p>
              <p className="text-2xl font-bold text-white">{stats.totalReplies}</p>
            </div>
            <Reply className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="answered">Answered</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {post.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                  {post.isLocked && <Lock className="w-4 h-4 text-red-400" />}
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(post.priority)}`}>
                    {post.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>By {post.author} ({post.authorId})</span>
                  <span>•</span>
                  <span>{post.course}</span>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Reply className="w-3 h-3" />
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Last activity {formatDate(post.lastActivity)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePostAction(post.id, 'pin')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    post.isPinned ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-gray-700 text-gray-400'
                  }`}
                  title={post.isPinned ? 'Unpin post' : 'Pin post'}
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePostAction(post.id, 'lock')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    post.isLocked ? 'bg-red-500/20 text-red-400' : 'hover:bg-gray-700 text-gray-400'
                  }`}
                  title={post.isLocked ? 'Unlock post' : 'Lock post'}
                >
                  {post.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handlePostAction(post.id, 'answer')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    post.isAnswered ? 'bg-green-500/20 text-green-400' : 'hover:bg-gray-700 text-gray-400'
                  }`}
                  title={post.isAnswered ? 'Mark as unanswered' : 'Mark as answered'}
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePostAction(post.id, 'priority')}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400"
                  title="Change priority"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400">
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </motion.div>
  );
};

export default ForumManagement;