import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  ThumbsUp, 
  Plus, 
  Search, 
  Filter,
  Reply,
  Send,
  Pin,
  Flag,
  Eye,
  X,
  Tag,
  User
} from 'lucide-react';

const StudentForum = ({ user }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Help with Neural Network Implementation',
      content: "I'm having trouble with backpropagation in my neural network. Can someone explain the gradient calculation? I've been working on this for hours and can't figure out where I'm going wrong.",
      author: 'John Doe',
      authorId: 'ST001',
      course: 'Machine Learning',
      courseCode: 'CS401',
      createdAt: '2024-01-20T14:30:00Z',
      replies: 5,
      likes: 3,
      views: 23,
      tags: ['neural-networks', 'backpropagation', 'help'],
      isPinned: false,
      isAnswered: false
    },
    {
      id: 2,
      title: 'Study Group for Database Final',
      content: "Looking for students to form a study group for the upcoming database systems final exam. We can meet at the library or online. Please reply if interested!",
      author: 'Sarah Smith',
      authorId: 'ST002',
      course: 'Database Systems',
      courseCode: 'CS350',
      createdAt: '2024-01-19T16:45:00Z',
      replies: 8,
      likes: 12,
      views: 45,
      tags: ['study-group', 'database', 'final-exam'],
      isPinned: true,
      isAnswered: false
    },
    {
      id: 3,
      title: 'Binary Tree Traversal Question',
      content: "What's the difference between in-order and pre-order traversal? When should I use each one? I understand the basic concept but I'm confused about practical applications.",
      author: 'Mike Johnson',
      authorId: 'ST003',
      course: 'Data Structures',
      courseCode: 'CS301',
      createdAt: '2024-01-18T10:20:00Z',
      replies: 12,
      likes: 8,
      views: 67,
      tags: ['binary-tree', 'traversal', 'algorithms'],
      isPinned: false,
      isAnswered: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    course: '',
    tags: ''
  });

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'CS401', name: 'Machine Learning' },
    { id: 'CS301', name: 'Data Structures' },
    { id: 'CS350', name: 'Database Systems' },
    { id: 'CS402', name: 'Algorithms' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCourse = filterCourse === 'all' || post.courseCode === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: user?.firstName + ' ' + user?.lastName || 'Anonymous',
      authorId: user?.studentId || 'ST000',
      course: courses.find(c => c.id === newPost.course)?.name || 'General',
      courseCode: newPost.course,
      createdAt: new Date().toISOString(),
      replies: 0,
      likes: 0,
      views: 0,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isPinned: false,
      isAnswered: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', course: '', tags: '' });
    setShowNewPostModal(false);
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const NewPostModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Create New Post</h3>
          <button
            onClick={() => setShowNewPostModal(false)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              placeholder="Enter post title..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Course</label>
            <select
              value={newPost.course}
              onChange={(e) => setNewPost({...newPost, course: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Course</option>
              {courses.slice(1).map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              placeholder="Write your post content..."
              rows="6"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={newPost.tags}
              onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
              placeholder="e.g., neural-networks, help, assignment"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={() => setShowNewPostModal(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
            >
              Create Post
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <MessageSquare className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Student Forum</h1>
            <p className="text-gray-400">Discuss courses and get help from peers</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
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
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            {filteredPosts.length} posts found
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
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {post.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                      <h3 className="text-lg font-semibold text-white hover:text-indigo-400 cursor-pointer">
                        {post.title}
                      </h3>
                      {post.isAnswered && (
                        <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                          Answered
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span>By {post.author} ({post.authorId})</span>
                      <span>•</span>
                      <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-xs">
                        {post.course}
                      </span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.content}</p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="w-3 h-3 text-gray-400" />
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center space-x-1 hover:text-red-400 transition-colors duration-200"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes} likes</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200">
                        <Reply className="w-4 h-4" />
                        <span>{post.replies} replies</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <Flag className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && <NewPostModal />}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentForum;