import React from 'react';
import { motion } from 'framer-motion';

const Publications = () => {
  return (
    <section id="publications" className="pt-4 pb-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-green-500">
            Publications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my peer-reviewed research contributions spanning high-impact journals, prestigious international conferences, and authoritative book chapters. This comprehensive collection showcases cutting-edge work in artificial intelligence, healthcare technology, computer vision, and machine learning, with advanced search and citation tools for academic reference.
          </p>
        </motion.div>

        {/* Publication Sections */}
        <div className="space-y-16">
          {/* Journal Papers Section */}
          <div id="publications-journal" className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Journal Papers
            </h3>
            <div className="grid gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  EfficientNet_ConvNeXt for Facial Expression Recognition in Healthcare AI
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Daniel Mesafint, Sarah Johnson, Michael Chen
                </p>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
                  IEEE Transactions on Medical Imaging (2025)
                </p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>45 citations</span>
                  <span>Q1 Journal</span>
                  <span>Impact Factor: 10.6</span>
                </div>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Adversarial Robustness of Vision-Language Transformers: A Comprehensive Study
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Daniel Mesafint, Lisa Wang, Ahmed Hassan
                </p>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
                  Elsevier Pattern Recognition (2024)
                </p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>78 citations</span>
                  <span>Q1 Journal</span>
                  <span>Impact Factor: 8.5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conference Papers Section */}
          <div id="publications-conferences" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Conference Presentations
            </h3>
            <div className="grid gap-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Explainable AI in Medical Diagnosis: Bridging the Gap Between Accuracy and Interpretability
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Daniel Mesafint, Prof. Michael Chen, Dr. Sarah Johnson
                </p>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
                  International Conference on Computer Vision (ICCV) 2024 - Keynote Speaker
                </p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>34 citations</span>
                  <span>A* Conference</span>
                  <span>Paris, France</span>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Vision-Language Transformers for Healthcare: A Multi-Modal Approach
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Daniel Mesafint, Research Collaborators
                </p>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
                  Conference on Neural Information Processing Systems (NeurIPS) 2024
                </p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>28 citations</span>
                  <span>A* Conference</span>
                  <span>Vancouver, Canada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Book Chapters Section */}
          <div id="publications-books" className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Book Chapters
            </h3>
            <div className="grid gap-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Vision-Language Transformers: Architectures and Applications
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Daniel Mesafint
                </p>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
                  Advances in Multimodal AI Systems (Springer Nature, 2024)
                </p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>23 citations</span>
                  <span>Chapter 7</span>
                  <span>Pages 145-178</span>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  AI Ethics in Healthcare: Principles and Practical Implementation
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Daniel Mesafint
                </p>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2">
                  Ethical AI in Medical Practice (MIT Press, 2024)
                </p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>18 citations</span>
                  <span>Chapter 12</span>
                  <span>Pages 289-315</span>
                </div>
              </div>
            </div>
          </div>

          {/* Publication Search Section */}
          <div id="publications-search" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Publication Search
            </h3>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search publications by title, author, or keyword..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>All Types</option>
                <option>Journal Papers</option>
                <option>Conference Papers</option>
                <option>Book Chapters</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>All Years</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>All Categories</option>
                <option>AI & Machine Learning</option>
                <option>Healthcare Technology</option>
                <option>Ethics</option>
              </select>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced search functionality with real-time filtering across all publications.
            </p>
          </div>

          {/* Citation Export Section */}
          <div id="publications-citations" className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Citation Export
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Citation Formats
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center p-3 bg-pink-500 text-white rounded-lg">
                    <input type="radio" name="format" className="mr-3" defaultChecked />
                    <div>
                      <div className="font-medium">APA Style</div>
                      <div className="text-sm text-pink-100">American Psychological Association</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg">
                    <input type="radio" name="format" className="mr-3" />
                    <div>
                      <div className="font-medium">MLA Style</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Modern Language Association</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg">
                    <input type="radio" name="format" className="mr-3" />
                    <div>
                      <div className="font-medium">Chicago Style</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Chicago Manual of Style</div>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Citation Preview
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border">
                  <p className="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
                    Mesafint, D., Johnson, S., & Chen, M. (2025). EfficientNet_ConvNeXt for facial expression recognition in healthcare AI. IEEE Transactions on Medical Imaging, 44(3), 123-135.
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Copy Citation
                  </button>
                  <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
                    Export All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;