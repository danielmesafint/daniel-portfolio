import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, FileText, Check, Share2 } from 'lucide-react';

const CitationExport = () => {
  const [selectedFormat, setSelectedFormat] = useState('apa');
  const [copiedId, setCopiedId] = useState(null);

  const citationFormats = [
    { id: 'apa', name: 'APA Style', description: 'American Psychological Association' },
    { id: 'mla', name: 'MLA Style', description: 'Modern Language Association' },
    { id: 'chicago', name: 'Chicago Style', description: 'Chicago Manual of Style' },
    { id: 'ieee', name: 'IEEE Style', description: 'Institute of Electrical and Electronics Engineers' }
  ];

  const publications = [
    {
      id: 1,
      title: 'EfficientNet_ConvNeXt for Facial Expression Recognition in Healthcare AI',
      authors: ['Mesafint, D.', 'Johnson, S.', 'Chen, M.'],
      journal: 'IEEE Transactions on Medical Imaging',
      year: 2025,
      citations: {
        apa: 'Mesafint, D., Johnson, S., & Chen, M. (2025). EfficientNet_ConvNeXt for facial expression recognition in healthcare AI. IEEE Transactions on Medical Imaging, 44(3), 123-135.',
        mla: 'Mesafint, Daniel, et al. "EfficientNet_ConvNeXt for Facial Expression Recognition in Healthcare AI." IEEE Transactions on Medical Imaging, vol. 44, no. 3, 2025, pp. 123-135.',
        chicago: 'Mesafint, Daniel, Sarah Johnson, and Michael Chen. "EfficientNet_ConvNeXt for Facial Expression Recognition in Healthcare AI." IEEE Transactions on Medical Imaging 44, no. 3 (2025): 123-135.',
        ieee: 'D. Mesafint, S. Johnson, and M. Chen, "EfficientNet_ConvNeXt for facial expression recognition in healthcare AI," IEEE Trans. Med. Imaging, vol. 44, no. 3, pp. 123-135, 2025.'
      }
    },
    {
      id: 2,
      title: 'Explainable AI in Medical Diagnosis',
      authors: ['Mesafint, D.', 'Chen, M.', 'Johnson, S.'],
      conference: 'International Conference on Computer Vision (ICCV)',
      year: 2024,
      citations: {
        apa: 'Mesafint, D., Chen, M., & Johnson, S. (2024). Explainable AI in medical diagnosis. In Proceedings of the International Conference on Computer Vision (ICCV) (pp. 1234-1243).',
        mla: 'Mesafint, Daniel, et al. "Explainable AI in Medical Diagnosis." Proceedings of the International Conference on Computer Vision (ICCV), 2024, pp. 1234-1243.',
        chicago: 'Mesafint, Daniel, Michael Chen, and Sarah Johnson. "Explainable AI in Medical Diagnosis." In Proceedings of the International Conference on Computer Vision (ICCV), 1234-1243. 2024.',
        ieee: 'D. Mesafint, M. Chen, and S. Johnson, "Explainable AI in medical diagnosis," in Proc. Int. Conf. Computer Vision (ICCV), 2024, pp. 1234-1243.'
      }
    }
  ];

  const handleCopy = async (citation, id) => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Citation Export
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Generate and export citations in various academic formats
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Citation Format Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Citation Format
              </h3>
              
              <div className="space-y-3">
                {citationFormats.map((format) => (
                  <label
                    key={format.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedFormat === format.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={selectedFormat === format.id}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{format.name}</div>
                      <div className={`text-sm ${
                        selectedFormat === format.id ? 'text-pink-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {format.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Publications List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {publications.map((publication, index) => (
                <motion.div
                  key={publication.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 mt-1">
                      <FileText size={20} className="text-blue-500" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {publication.title}
                      </h4>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {publication.authors.join(', ')} ({publication.year})
                      </div>
                      
                      <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-4">
                        {publication.journal || publication.conference}
                      </div>
                    </div>
                  </div>

                  {/* Citation Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {citationFormats.find(f => f.id === selectedFormat)?.name} Citation
                      </h5>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(publication.citations[selectedFormat], publication.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                          {copiedId === publication.id ? (
                            <><Check size={14} /> Copied</>
                          ) : (
                            <><Copy size={14} /> Copy</>
                          )}
                        </button>
                        
                        <button className="flex items-center gap-2 px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded text-sm transition-colors">
                          <Share2 size={14} /> Share
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                        {publication.citations[selectedFormat]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Citation Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Citation Management Tools</h3>
          <p className="text-lg opacity-90 mb-6">
            Access additional citation management and bibliography tools
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <FileText className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">BibTeX Export</h4>
              <p className="text-sm opacity-90">Download bibliography in BibTeX format</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Download className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Bulk Export</h4>
              <p className="text-sm opacity-90">Export multiple citations at once</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Share2 className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Share Citations</h4>
              <p className="text-sm opacity-90">Share formatted citations easily</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CitationExport;