import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  FileText,
  Mail,
  Calendar,
  ExternalLink,
  Brain,
  Sparkles
} from 'lucide-react';

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: t('chatbot.welcome'),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Language detection and persistence management
  const [lastDetectedLanguage, setLastDetectedLanguage] = useState('en');
  const [conversationLanguage, setConversationLanguage] = useState('en');

  // Initialize conversation language on component mount with Chrome compatibility
  useEffect(() => {
    try {
      // Multiple storage methods for Chrome compatibility
      let savedLanguage = null;
      
      // Try sessionStorage first
      if (typeof Storage !== 'undefined') {
        savedLanguage = sessionStorage.getItem('chatbot_conversation_language');
      }
      
      // Fallback to localStorage for Chrome
      if (!savedLanguage && typeof Storage !== 'undefined') {
        savedLanguage = localStorage.getItem('chatbot_conversation_language');
      }
      
      // Chrome-specific: Also check for window property
      if (!savedLanguage && window.chatbotLanguage) {
        savedLanguage = window.chatbotLanguage;
      }
      
      console.log('🔍 Checking saved language:', savedLanguage);
      
      if (savedLanguage && ['en', 'am', 'or', 'ti', 'fr'].includes(savedLanguage)) {
        setConversationLanguage(savedLanguage);
        setLastDetectedLanguage(savedLanguage);
        console.log('🔄 Restored conversation language:', savedLanguage);
      } else {
        // Default to English and clear any stale data
        setConversationLanguage('en');
        setLastDetectedLanguage('en');
        // Clear all storage methods
        if (typeof Storage !== 'undefined') {
          sessionStorage.removeItem('chatbot_conversation_language');
          localStorage.removeItem('chatbot_conversation_language');
        }
        if (window.chatbotLanguage) {
          delete window.chatbotLanguage;
        }
        console.log('🔄 Initialized with default language: en');
      }
    } catch (error) {
      console.error('❌ Error initializing language:', error);
      setConversationLanguage('en');
      setLastDetectedLanguage('en');
    }
  }, []);

  // Close the assistant with the Escape key
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Update welcome message when language changes or conversation language changes
  useEffect(() => {
    setMessages(prev => {
      const updatedMessages = [...prev];
      if (updatedMessages.length > 0 && updatedMessages[0].type === 'bot') {
        // Use conversation language for welcome message if available
        const welcomeLanguage = conversationLanguage || i18n.language;
        const fromMap = getTranslationInLanguage('chatbot.welcome', welcomeLanguage);
        const welcomeMessage = fromMap && fromMap !== 'chatbot.welcome'
          ? fromMap
          : i18n.t('chatbot.welcome', { lng: welcomeLanguage });
        
        updatedMessages[0] = {
          ...updatedMessages[0],
          content: welcomeMessage
        };
      }
      return updatedMessages;
    });
  }, [i18n.language, t, conversationLanguage]);

  const quickReplies = [
    {
      text: t('chatbot.quickReplies.publications'),
      action: () => handleQuickReply('publications')
    },
    {
      text: t('chatbot.quickReplies.research'),
      action: () => handleQuickReply('research')
    },
    {
      text: t('chatbot.quickReplies.contact'),
      action: () => handleQuickReply('contact')
    },
    {
      text: t('chatbot.quickReplies.cv'),
      action: () => handleQuickReply('cv')
    }
  ];

  // Enhanced conversational AI responses with context understanding
  const [conversationContext, setConversationContext] = useState({
    lastTopic: null,
    userInterests: [],
    askedQuestions: []
  });

  // Comprehensive knowledge base about Dr. Daniel
  const knowledgeBase = {
    personal: {
      name: "Dr. Daniel Mesafint",
      title: "Assistant Professor & AI Researcher",
      affiliation: "Debre Tabor University, Ethiopia",
      specialization: "Vision-Language Transformers, Explainable AI, Healthcare AI",
      experience: "5+ years in AI research",
      education: "PhD in Computer Science (AI/ML focus)"
    },
    research: {
      areas: [
        "Large Language Models (LLMs)",
        "Vision-Language Transformers", 
        "Explainable AI (XAI)",
        "Adversarial Robustness",
        "AI for Healthcare",
        "3D Printing & AI Materials",
        "Deep Learning",
        "Computer Vision"
      ],
      recentWork: [
        "EfficientNet_ConvNeXt for Facial Expression Recognition (IEEE, 2025)",
        "Adversarial Robustness of Vision-Language Transformers (Elsevier, 2024)",
        "Deep Learning for HIV Test Prediction (Springer, 2023)"
      ],
      collaborations: ["Stanford University", "MIT", "Oxford University", "Google Research"]
    },
    publications: {
      total: "25+ peer-reviewed papers",
      venues: ["IEEE", "Elsevier", "Springer", "ACM", "Nature"],
      citations: "500+ citations",
      hIndex: "12"
    },
    contact: {
      email: "danielmesafint1985@gmail.com",
      linkedin: "/in/daniel-mesafint",
      location: "Debre Tabor University, Ethiopia",
      responseTime: "24 hours"
    },
    teaching: {
      courses: ["Machine Learning", "Deep Learning", "Computer Vision", "AI Ethics"],
      students: "20+ MSc students supervised",
      awards: ["Best Teacher Award 2023", "Research Excellence Award 2024"]
    }
  };

  // Enhanced language detection function with cache management
  const detectLanguage = (text) => {
    console.log('🔍 Detecting language for text:', text);
    
    // Clear any previous detection cache to ensure fresh detection
    const cacheKey = text.trim().toLowerCase();
    
    // Amharic language detection patterns
    const amharicPattern = /[\u1200-\u137F]/; // Ethiopic script range
    const amharicWords = [
      'ሰላም', 'ምርምር', 'ህትመቶች', 'ፕሮጀክቶች', 'ያግኙኝ', 'ስለ', 'ንገረኝ', 'ማወቅ', 'እፈልጋለሁ', 'አሳይ',
      'እንደምን', 'አደሩ', 'ዋሉ', 'ነው', 'ነሽ', 'ነህ', 'ትችላለህ', 'ትችይ', 'አሳየኝ', 'አብራራልኝ', 'ግለጽልኝ',
      'ስጠኝ', 'አቅርብልኝ', 'አመሰግናለሁ', 'ምስጋና', 'አመሰግን', 'ቻው', 'ደህና', 'ሁን', 'እንገናኛለን',
      'ምን', 'እንዴት', 'መቼ', 'የት', 'ለምን', 'ማን', 'ዶክተር', 'ዳንኤል', 'መሳፍንት', 'ዩኒቨርሲቲ',
      'ተመራማሪ', 'ፕሮፌሰር', 'ትምህርት', 'ተማሪ', 'ኮምፒውተር', 'ሳይንስ', 'ቴክኖሎጂ', 'ሰው', 'ሰራሽ', 'ዘይቤ'
    ];
    
    // French language detection patterns
    const frenchWords = ['bonjour', 'salut', 'recherche', 'publications', 'projets', 'contact', 'parlez', 'moi', 'voulez', 'pouvez'];
    
    // Enhanced Oromo language detection patterns
    const oromoWords = [
      'akkam', 'nagaa', 'qorannoo', 'maxxansaa', 'pirojektii', 'quunnamtii', 'natti', 'himaa', 'beekuu', 'fedha',
      'jirta', 'jirtu', 'maal', 'akkamitti', 'eessa', 'yoom', 'maaliif', 'eenyu', 'dandeessa', 'dandeetta',
      'argisiisi', 'ibsaa', 'kennaa', 'dhiheessaa', 'galatoomaa', 'galata', 'galatoomii', 'nagaatti', 'wal argina',
      'baga', 'dhufte', 'gammachuu', 'guddaadha', 'hojii', 'barbaadda', 'gargaaruu', 'danda\'a', 'damee', 'qorachuu'
    ];
    
    // Enhanced Tigrigna language detection patterns  
    const tigrignaWords = [
      'ሰላም', 'ከመይ', 'ምርምር', 'ህትመት', 'ፕሮጀክት', 'ርክብ', 'ንገረኒ', 'ክፈልጥ', 'እደሊ',
      'ኣለኹም', 'ኣለኺ', 'እንታይ', 'መዓስ', 'ኣበይ', 'ስለምንታይ', 'መን', 'ትኽእል', 'ኢኻ', 'ኢኺ',
      'ኣርእየኒ', 'ብርሃልኒ', 'ግለጸልኒ', 'ሃበኒ', 'ኣቕርበልኒ', 'የቐንየለይ', 'ምስጋና', 'የቐንየ', 'ንርኣየና', 'ብሰላም',
      'እንቋዕ', 'መጻእካ', 'ሓጎስ', 'ሓጋዚ', 'ስራሕ', 'ዓውዲ', 'ክትመርምር', 'ክሕግዘካ', 'ዓቢ'
    ];

    // Check for Amharic (Ethiopic script or common words)
    const hasAmharicScript = amharicPattern.test(text);
    const hasAmharicWords = amharicWords.some(word => text.includes(word));
    
    console.log('📝 Amharic script detected:', hasAmharicScript);
    console.log('📝 Amharic words detected:', hasAmharicWords);
    console.log('📝 Matching Amharic words:', amharicWords.filter(word => text.includes(word)));
    
    if (hasAmharicScript || hasAmharicWords) {
      const detectedLang = 'am';
      setLastDetectedLanguage(detectedLang);
      setConversationLanguage(detectedLang);
      
      // Multi-method persistence for Chrome compatibility
      try {
        sessionStorage.setItem('chatbot_conversation_language', detectedLang);
        localStorage.setItem('chatbot_conversation_language', detectedLang);
        window.chatbotLanguage = detectedLang;
        console.log('💾 Language persisted using multiple methods:', detectedLang);
      } catch (error) {
        console.warn('⚠️ Storage error:', error);
        window.chatbotLanguage = detectedLang; // Fallback to window property
      }
      
      console.log('✅ Language detected: Amharic (am)');
      return detectedLang;
    }
    
    // Check for Oromo (enhanced detection)
    const hasOromoWords = oromoWords.some(word => text.toLowerCase().includes(word.toLowerCase()));
    console.log('📝 Oromo words detected:', hasOromoWords);
    console.log('📝 Matching Oromo words:', oromoWords.filter(word => text.toLowerCase().includes(word.toLowerCase())));
    
    if (hasOromoWords) {
      const detectedLang = 'or';
      setLastDetectedLanguage(detectedLang);
      setConversationLanguage(detectedLang);
      
      // Multi-method persistence for Chrome compatibility
      try {
        sessionStorage.setItem('chatbot_conversation_language', detectedLang);
        localStorage.setItem('chatbot_conversation_language', detectedLang);
        window.chatbotLanguage = detectedLang;
        console.log('💾 Language persisted using multiple methods:', detectedLang);
      } catch (error) {
        console.warn('⚠️ Storage error:', error);
        window.chatbotLanguage = detectedLang; // Fallback to window property
      }
      
      console.log('✅ Language detected: Oromo (or)');
      return detectedLang;
    }
    
    // Check for Tigrigna (enhanced detection)
    const hasTigrignaWords = tigrignaWords.some(word => text.includes(word));
    console.log('📝 Tigrigna words detected:', hasTigrignaWords);
    console.log('📝 Matching Tigrigna words:', tigrignaWords.filter(word => text.includes(word)));
    
    if (hasTigrignaWords) {
      const detectedLang = 'ti';
      setLastDetectedLanguage(detectedLang);
      setConversationLanguage(detectedLang);
      
      // Multi-method persistence for Chrome compatibility
      try {
        sessionStorage.setItem('chatbot_conversation_language', detectedLang);
        localStorage.setItem('chatbot_conversation_language', detectedLang);
        window.chatbotLanguage = detectedLang;
        console.log('💾 Language persisted using multiple methods:', detectedLang);
      } catch (error) {
        console.warn('⚠️ Storage error:', error);
        window.chatbotLanguage = detectedLang; // Fallback to window property
      }
      
      console.log('✅ Language detected: Tigrigna (ti)');
      return detectedLang;
    }
    
    // Check for French
    if (frenchWords.some(word => text.toLowerCase().includes(word))) {
      const detectedLang = 'fr';
      setLastDetectedLanguage(detectedLang);
      setConversationLanguage(detectedLang);
      
      // Multi-method persistence for Chrome compatibility
      try {
        sessionStorage.setItem('chatbot_conversation_language', detectedLang);
        localStorage.setItem('chatbot_conversation_language', detectedLang);
        window.chatbotLanguage = detectedLang;
        console.log('💾 Language persisted using multiple methods:', detectedLang);
      } catch (error) {
        console.warn('⚠️ Storage error:', error);
        window.chatbotLanguage = detectedLang; // Fallback to window property
      }
      
      console.log('✅ Language detected: French (fr)');
      return detectedLang;
    }
    
    // Use conversation language if no specific language detected but we have a saved preference
    if (conversationLanguage && conversationLanguage !== 'en') {
      console.log('🔄 Using saved conversation language:', conversationLanguage);
      return conversationLanguage;
    }
    
    // Default to English
    const detectedLang = 'en';
    setLastDetectedLanguage(detectedLang);
    console.log('✅ Language detected: English (en) - default');
    return detectedLang;
  };

  // Advanced natural language understanding with language detection
  const analyzeUserInput = (input) => {
    const text = input.trim(); // Don't lowercase for Amharic compatibility
    const words = text.split(/\s+/);
    const detectedLanguage = detectLanguage(input);
    
    console.log('🔍 Analyzing input:', { input, text, detectedLanguage });
    
    // Multi-language intent classification
    const intents = {
      greeting: {
        en: /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
        am: /(ሰላም|እንደምን አደሩ|እንደምን ዋሉ|ሰላም ነው)/i,
        fr: /^(bonjour|salut|bonsoir|bonne)/i,
        or: /(akkam|nagaa|akkam jirtu|akkam jirta)/i,
        ti: /(ሰላም|ከመይ|ከመይ ኣለኹም|ከመይ ኣለኺ)/i
      },
      question: {
        en: /^(what|how|when|where|why|who|can you|could you|do you|are you)/i,
        am: /^(ምን|እንዴት|መቼ|የት|ለምን|ማን|ትችላለህ|ትችይ|ነህ|ነሽ)/i,
        fr: /^(qu'est|comment|quand|où|pourquoi|qui|pouvez|peux|êtes)/i,
        or: /^(maal|akkam|yoom|eessa|maaliif|eenyu|dandeessa|dandeetta)/i,
        ti: /^(እንታይ|ከመይ|መዓስ|ኣበይ|ስለምንታይ|መን|ትኽእል|ኢኻ|ኢኺ)/i
      },
      request: {
        en: /^(show me|tell me|explain|describe|give me|provide)/i,
        am: /^(አሳየኝ|ንገረኝ|አብራራልኝ|ግለጽልኝ|ስጠኝ|አቅርብልኝ)/i,
        fr: /^(montrez|dites|expliquez|décrivez|donnez|fournissez)/i,
        or: /^(na argisiisi|na himaa|na ibsaa|na kennaa|na dhiheessaa)/i,
        ti: /^(ኣርእየኒ|ንገረኒ|ብርሃልኒ|ግለጸልኒ|ሃበኒ|ኣቕርበልኒ)/i
      },
      thanks: {
        en: /^(thank|thanks|appreciate)/i,
        am: /^(አመሰግናለሁ|ምስጋና|አመሰግን)/i,
        fr: /^(merci|remercie|reconnaissance)/i,
        or: /^(galatoomaa|galata|galatoomii)/i,
        ti: /^(የቐንየለይ|ምስጋና|የቐንየ)/i
      },
      goodbye: {
        en: /^(bye|goodbye|see you|farewell)/i,
        am: /^(ቻው|ደህና ሁን|እንገናኛለን|ሰላም)/i,
        fr: /^(au revoir|salut|à bientôt|adieu)/i,
        or: /^(nagaatti|wal argina|nagaan bulli)/i,
        ti: /^(ሰላም|ንርኣየና|ብሰላም)/i
      }
    };

    // Topic detection with confidence scoring (multi-language)
    const topics = {
      publications: {
        keywords: [
          // English
          'publication', 'paper', 'research paper', 'article', 'journal', 'conference', 'cite', 'citation',
          // Amharic
          'ህትመቶች', 'ህትመት', 'ወረቀት', 'ጽሁፍ', 'ጆርናል', 'ኮንፈረንስ', 'ጥቅስ', 'መጽሐፍ'
        ],
        confidence: 0
      },
      research: {
        keywords: [
          // English
          'research', 'ai', 'artificial intelligence', 'machine learning', 'deep learning', 'computer vision', 'nlp', 'transformer', 'llm',
          // Amharic
          'ምርምር', 'ሰው ሰራሽ ዘይቤ', 'ማሽን ትምህርት', 'ጥልቅ ትምህርት', 'ኮምፒውተር እይታ', 'ቋንቋ ሂደት', 'ትራንስፎርመር'
        ],
        confidence: 0
      },
      contact: {
        keywords: [
          // English
          'contact', 'email', 'reach', 'get in touch', 'communicate', 'message', 'call', 'meet',
          // Amharic
          'ያግኙኝ', 'ኢሜይል', 'መገናኛ', 'ማግኘት', 'መገናኘት', 'መልእክት', 'ደውል', 'ስብሰባ'
        ],
        confidence: 0
      },
      collaboration: {
        keywords: [
          // English
          'collaborate', 'collaboration', 'partner', 'work together', 'joint research', 'project',
          // Amharic
          'ትብብር', 'አጋርነት', 'አብሮ መስራት', 'የጋራ ምርምር', 'ፕሮጀክት', 'ፕሮጀክቶች'
        ],
        confidence: 0
      },
      teaching: {
        keywords: [
          // English
          'teach', 'teaching', 'course', 'student', 'supervision', 'mentor', 'education',
          // Amharic
          'ማስተማር', 'ትምህርት', 'ኮርስ', 'ተማሪ', 'ተማሪዎች', 'ክትትል', 'መምህር', 'ትምህርት ቤት'
        ],
        confidence: 0
      },
      background: {
        keywords: [
          // English
          'background', 'education', 'experience', 'biography', 'about', 'profile', 'cv', 'resume',
          // Amharic
          'ዳራ', 'ትምህርት', 'ልምድ', 'ባዮግራፊ', 'ስለ', 'መገለጫ', 'ሲቪ', 'ሪዙሜ'
        ],
        confidence: 0
      },
      projects: {
        keywords: [
          // English
          'project', 'work', 'current work', 'ongoing', 'development', 'application',
          // Amharic
          'ፕሮጀክት', 'ፕሮጀክቶች', 'ስራ', 'የአሁኑ ስራ', 'በሂደት ላይ', 'ልማት', 'አተገባበር'
        ],
        confidence: 0
      }
    };

    // Calculate topic confidence scores
    Object.keys(topics).forEach(topic => {
      topics[topic].confidence = topics[topic].keywords.reduce((score, keyword) => {
        if (text.includes(keyword)) {
          return score + (keyword.length > 3 ? 2 : 1); // Longer keywords get higher weight
        }
        return score;
      }, 0);
    });

    // Find the most likely topic
    const bestTopic = Object.keys(topics).reduce((best, current) => 
      topics[current].confidence > topics[best].confidence ? current : best
    );

    // Detect intent using the detected language
    let intent = 'statement';
    console.log('🎯 Intent detection for language:', detectedLanguage);
    console.log('🎯 Testing text:', text);
    
    Object.keys(intents).forEach(intentType => {
      const intentPattern = intents[intentType][detectedLanguage] || intents[intentType]['en'];
      console.log(`🎯 Testing ${intentType} pattern:`, intentPattern);
      console.log(`🎯 Pattern test result for "${text}":`, intentPattern ? intentPattern.test(text) : false);
      if (intentPattern && intentPattern.test(text)) {
        console.log(`✅ Intent detected: ${intentType}`);
        intent = intentType;
      }
    });
    
    console.log('🎯 Final intent:', intent);
    console.log('🎯 Final analysis result:', { intent, detectedLanguage, text });

    return {
      intent,
      topic: topics[bestTopic].confidence > 0 ? bestTopic : 'general',
      confidence: topics[bestTopic].confidence,
      originalText: input,
      words
    };
  };

  // Get translation in specific language without changing global language
  const getTranslationInLanguage = (key, language, options = {}) => {
    // Direct translation mapping for chatbot responses
    const translations = {
      en: {
        chatbot: {
          responses: {
            greetings: [
              "Hello! I'm Dr. Daniel's AI assistant. I'm here to help you learn about his research and work. What would you like to know?",
              "Hi there! Great to meet you! I can tell you all about Dr. Daniel's research, publications, and how to get in touch with him. What interests you?",
              "Welcome! I'm excited to help you discover Dr. Daniel's work in AI and machine learning. What specific area would you like to explore?"
            ],
            thanks: [
              "You're very welcome! Is there anything else you'd like to know about Dr. Daniel's work?",
              "Happy to help! Feel free to ask me anything else about his research or how to connect with him.",
              "My pleasure! I'm here whenever you need more information about Dr. Daniel's expertise."
            ],
            goodbye: "Thank you for your interest in Dr. Daniel's work! Feel free to reach out anytime if you have more questions. Have a great day!",
            unclear: "I want to make sure I understand you correctly. Are you asking about Dr. Daniel's {topic}? I can provide detailed information about his research, publications, and collaboration opportunities.",
            publications: {
              recent: "Dr. Daniel's most recent publications showcase his cutting-edge research:\n\n📄 **EfficientNet_ConvNeXt for Facial Expression Recognition** (IEEE, 2025)\n📄 **Adversarial Robustness of Vision-Language Transformers** (Elsevier, 2024)\n📄 **Deep Learning for HIV Test Prediction** (Springer, 2023)\n\nWith 25+ total publications and 500+ citations, his work is making real impact!",
              general: "Dr. Daniel has an impressive publication record with 25+ peer-reviewed papers in top venues like IEEE, Elsevier, and Springer. His work spans Vision-Language Transformers, Explainable AI, and Healthcare AI Applications."
            },
            research: {
              current: "Dr. Daniel is currently working on several exciting projects:\n\n🚀 **Current Research Focus:**\n• Large Language Models (LLMs)\n• Vision-Language Transformers\n• Explainable AI for healthcare\n• Adversarial robustness in deep learning",
              general: "Dr. Daniel's research is at the forefront of AI innovation! His expertise spans:\n\n🧠 **Core Research Areas:**\n• Large Language Models (LLMs)\n• Vision-Language Transformers\n• Explainable AI (XAI)\n• Adversarial Robustness\n• AI for Healthcare"
            },
            contact: "I'd be happy to help you connect with Dr. Daniel!\n\n📧 **Email:** danielmesafint1985@gmail.com\n🏢 **Institution:** Debre Tabor University, Ethiopia\n💼 **LinkedIn:** /in/daniel-mesafint",
            collaboration: "Dr. Daniel is actively seeking meaningful collaborations! He's particularly interested in:\n\n🤝 **Collaboration Opportunities:**\n• Research Projects\n• Student Supervision\n• Industry Partnerships\n• Academic Consulting",
            teaching: "Dr. Daniel is passionate about education and mentoring!\n\n👨‍🏫 **Teaching Excellence:**\n• Courses: Machine Learning, Deep Learning, Computer Vision\n• Students Supervised: 20+ MSc students\n• Awards: Best Teacher Award 2023",
            background: "Let me tell you about Dr. Daniel's impressive background!\n\n🎓 **Academic Excellence:**\n• PhD in Computer Science with AI/ML specialization\n• Assistant Professor at Debre Tabor University\n• 5+ years of intensive AI research experience",
            projects: "Dr. Daniel is working on several cutting-edge projects:\n\n🚀 **Current Projects:**\n• Healthcare AI Platform\n• Multimodal AI Systems\n• Explainable AI Framework\n• Adversarial Defense Systems"
          },
          actions: {
            researchAreas: 'Research Areas',
            recentPublications: 'Recent Publications',
            contactInfo: 'Contact Information',
            viewAllPublications: 'View All Publications',
            researchImpact: 'Research Impact',
            recentPapers: 'Recent Papers',
            viewFullList: 'View Full List',
            viewProjects: 'View Projects',
            collaborationOpportunities: 'Collaboration Opportunities',
            healthcareAI: 'Healthcare AI',
            visionLanguageModels: 'Vision-Language Models',
            currentProjects: 'Current Projects',
            sendEmail: 'Send Email',
            scheduleMeeting: 'Schedule Meeting',
            linkedinProfile: 'LinkedIn Profile',
            researchCollaboration: 'Research Collaboration',
            studentSupervision: 'Student Supervision',
            industryPartnership: 'Industry Partnership',
            teachingAwards: 'Teaching Awards',
            researchOpportunities: 'Research Opportunities',
            viewCV: 'View My CV',
            viewAwards: 'View Awards',
            researchJourney: 'Research Journey',
            viewAllProjects: 'View All Projects',
            askAnotherQuestion: 'Ask Another Question',
            viewPortfolio: 'View Portfolio',
            contactDrDaniel: 'Contact Dr. Daniel'
          }
        }
      },
      am: {
        chatbot: {
          responses: {
            greetings: [
              "ሰላም! እኔ የዶ/ር ዳንኤል የሰው ሰራሽ ዘይቤ ረዳት ነኝ። ስለ ምርምሩ እና ስራው ለማወቅ ልረዳዎት እችላለሁ። ምን ማወቅ ይፈልጋሉ?",
              "ሰላም! ደስ ብሎኛል! ስለ ዶ/ር ዳንኤል ምርምር፣ ህትመቶች እና እንዴት ማግኘት እንደሚችሉ ሁሉንም ነገር ልነግርዎት እችላለሁ። ምን ይፈልጋሉ?",
              "እንኳን ደህና መጡ! የዶ/ር ዳንኤልን በሰው ሰራሽ ዘይቤ እና በማሽን ትምህርት ስራ ለማወቅ ልረዳዎት ደስ ይለኛል። የትኛውን ዘርፍ መመርመር ይፈልጋሉ?"
            ],
            thanks: [
              "በጣም እንኳን! ስለ ዶ/ር ዳንኤል ስራ ሌላ ማወቅ የሚፈልጉት ነገር አለ?",
              "ደስ ብሎኛል ረድቻለሁ! ስለ ምርምሩ ወይም እንዴት ማግኘት እንደሚችሉ ሌላ ማንኛውንም ነገር ይጠይቁኝ።",
              "ደስታዬ ነው! ስለ ዶ/ር ዳንኤል ብቃት ተጨማሪ መረጃ በሚፈልጉበት ጊዜ እዚህ ነኝ።"
            ],
            goodbye: "ስለ ዶ/ር ዳንኤል ስራ ፍላጎት ስላሳዩ አመሰግናለሁ! ተጨማሪ ጥያቄዎች ካሉዎት በማንኛውም ጊዜ ያግኙን። መልካም ቀን ይሁንልዎት!",
            unclear: "በትክክል እንድረዳዎት እፈልጋለሁ። ስለ ዶ/ር ዳንኤል {topic} እየጠየቁ ነው? ስለ ምርምሩ፣ ህትመቶቹ እና የትብብር እድሎች ዝርዝር መረጃ ልሰጥዎት እችላለሁ።",
            publications: {
              recent: "የዶ/ር ዳንኤል የቅርብ ጊዜ ህትመቶች ዘመናዊ ምርምሩን ያሳያሉ:\n\n📄 **EfficientNet_ConvNeXt for Facial Expression Recognition** (IEEE, 2025)\n📄 **Adversarial Robustness of Vision-Language Transformers** (Elsevier, 2024)\n📄 **Deep Learning for HIV Test Prediction** (Springer, 2023)\n\nከ25+ ጠቅላላ ህትመቶች እና ከ500+ ጥቅሶች ጋር፣ ስራው እውነተኛ ተፅእኖ እያሳደረ ነው!",
              general: "ዶ/ር ዳንኤል በIEEE፣ Elsevier እና Springer ባሉ ዋና ዋና ቦታዎች ከ25+ የተገመገሙ ወረቀቶች ያለው አስደናቂ የህትመት ሪከርድ አለው። ስራው የእይታ-ቋንቋ ትራንስፎርመሮችን፣ ሊብራራ የሚችል ሰው ሰራሽ ዘይቤን እና የጤና አጠባበቅ ሰው ሰራሽ ዘይቤ አተገባበሮችን ይሸፍናል።"
            },
            research: {
              current: "ዶ/ር ዳንኤል በአሁኑ ጊዜ በበርካታ አስደሳች ፕሮጀክቶች ላይ እየሰራ ነው:\n\n🚀 **የአሁኑ የምርምር ትኩረት:**\n• ትላልቅ የቋንቋ ሞዴሎች (LLMs)\n• የእይታ-ቋንቋ ትራንስፎርመሮች\n• ለጤና አጠባበቅ ሊብራራ የሚችል ሰው ሰራሽ ዘይቤ\n• በጥልቅ ትምህርት ውስጥ የተቃዋሚ ጥንካሬ",
              general: "የዶ/ር ዳንኤል ምርምር በሰው ሰራሽ ዘይቤ ፈጠራ ግንባር ቀደም ነው! ብቃቱ የሚሸፍነው:\n\n🧠 **ዋና የምርምር ዘርፎች:**\n• ትላልቅ የቋንቋ ሞዴሎች (LLMs)\n• የእይታ-ቋንቋ ትራንስፎርመሮች\n• ሊብራራ የሚችል ሰው ሰራሽ ዘይቤ (XAI)\n• የተቃዋሚ ጥንካሬ\n• ለጤና አጠባበቅ ሰው ሰራሽ ዘይቤ"
            },
            contact: "ከዶ/ር ዳንኤል ጋር እንዲገናኙ ልረዳዎት ደስ ይለኛል!\n\n📧 **ኢሜይል:** danielmesafint1985@gmail.com\n🏢 **ተቋም:** ደብረ ታቦር ዩኒቨርሲቲ፣ ኢትዮጵያ\n💼 **ሊንክድኢን:** /in/daniel-mesafint",
            collaboration: "ዶ/ር ዳንኤል ትርጉም ያላቸውን ትብብሮች በንቃት እየፈለገ ነው! በተለይ ፍላጎት ያለው:\n\n🤝 **የትብብር እድሎች:**\n• የምርምር ፕሮጀክቶች\n• የተማሪ ክትትል\n• የኢንዱስትሪ አጋርነቶች\n• የአካዳሚክ ምክር",
            teaching: "ዶ/ር ዳንኤል ስለ ትምህርት እና መምህርነት ተጓዳኝ ነው!\n\n👨‍🏫 **የማስተማር ብቃት:**\n• ኮርሶች: የማሽን ትምህርት፣ ጥልቅ ትምህርት፣ የኮምፒውተር እይታ\n• የተከታተሉ ተማሪዎች: ከ20+ የማስተርስ ተማሪዎች\n• ሽልማቶች: የምርጥ መምህር ሽልማት 2023",
            background: "ስለ ዶ/ር ዳንኤል አስደናቂ ዳራ ልነግርዎት!\n\n🎓 **የአካዳሚክ ብቃት:**\n• በኮምፒውተር ሳይንስ ውስጥ ዶክትሬት ከሰው ሰራሽ ዘይቤ/ማሽን ትምህርት ስፔሻላይዜሽን\n• በደብረ ታቦር ዩኒቨርሲቲ ረዳት ፕሮፌሰር\n• ከ5+ ዓመት ጠንካራ የሰው ሰራሽ ዘይቤ ምርምር ልምድ",
            projects: "ዶ/ር ዳንኤል በበርካታ ዘመናዊ ፕሮጀክቶች ላይ እየሰራ ነው:\n\n🚀 **የአሁኑ ፕሮጀክቶች:**\n• የጤና አጠባበቅ ሰው ሰራሽ ዘይቤ መድረክ\n• ባለብዙ ሞዳል ሰው ሰራሽ ዘይቤ ስርዓቶች\n• ሊብራራ የሚችል ሰው ሰራሽ ዘይቤ ማዕቀፍ\n• የተቃዋሚ መከላከያ ስርዓቶች"
          },
          actions: {
            researchAreas: 'የምርምር ዘርፎች',
            recentPublications: 'የቅርብ ጊዜ ህትመቶች',
            contactInfo: 'የመገናኛ መረጃ',
            viewAllPublications: 'ሁሉንም ህትመቶች ይመልከቱ',
            researchImpact: 'የምርምር ተፅእኖ',
            recentPapers: 'የቅርብ ጊዜ ወረቀቶች',
            viewFullList: 'ሙሉ ዝርዝር ይመልከቱ',
            viewProjects: 'ፕሮጀክቶችን ይመልከቱ',
            collaborationOpportunities: 'የትብብር እድሎች',
            healthcareAI: 'የጤና አጠባበቅ ሰው ሰራሽ ዘይቤ',
            visionLanguageModels: 'የእይታ-ቋንቋ ሞዴሎች',
            currentProjects: 'የአሁኑ ፕሮጀክቶች',
            sendEmail: 'ኢሜይል ላክ',
            scheduleMeeting: 'ስብሰባ ይያዙ',
            linkedinProfile: 'ሊንክድኢን መገለጫ',
            researchCollaboration: 'የምርምር ትብብር',
            studentSupervision: 'የተማሪ ክትትል',
            industryPartnership: 'የኢንዱስትሪ አጋርነት',
            teachingAwards: 'የማስተማር ሽልማቶች',
            researchOpportunities: 'የምርምር እድሎች',
            viewCV: 'የእኔን ሲቪ ይመልከቱ',
            viewAwards: 'ሽልማቶችን ይመልከቱ',
            researchJourney: 'የምርምር ጉዞ',
            viewAllProjects: 'ሁሉንም ፕሮጀክቶች ይመልከቱ',
            askAnotherQuestion: 'ሌላ ጥያቄ ይጠይቁ',
            viewPortfolio: 'ፖርትፎሊዮ ይመልከቱ',
            contactDrDaniel: 'ዶ/ር ዳንኤልን ያግኙ'
          }
        }
      },
      or: {
        chatbot: {
          responses: {
            greetings: [
              "Akkam! Ani gargaaraa AI Dr. Daniel ti. Waa'ee qorannoo fi hojii isaa akka beektu si gargaaruu nan danda'a. Maal beekuu barbaadda?",
              "Akkam jirta! Gammachuu guddaadha! Waa'ee qorannoo Dr. Daniel, maxxansaawwan isaa fi akkamitti argachuu dandeessu hunda sitti himuu nan danda'a. Maal barbaadda?",
              "Baga nagaan dhufte! Hojii Dr. Daniel kan AI fi barumsa maashinii keessatti si gargaaruuf gammachuu guddaadha. Damee kam qorachuu barbaadda?"
            ],
            thanks: [
              "Baay'ee nagaatti! Waa'ee hojii Dr. Daniel biraa beekuu barbaaddu jiraa?",
              "Gammachuu guddaadha gargaare! Waa'ee qorannoo isaa ykn akkamitti isa argachuu dandeessu waan biraa na gaafadhu.",
              "Gammachuu koo ti! Yeroo odeeffannoo dabalataa waa'ee ogummaa Dr. Daniel barbaaddu asuma jira."
            ],
            goodbye: "Waa'ee hojii Dr. Daniel hawwii argisiisaniif galatoomaa! Gaaffii dabalataa yoo qabaattan yeroo kamiyyuu nu quunnamaa. Guyyaa gaarii qabaadhu!",
            unclear: "Sirriitti akkan si hubadhu barbaada. Waa'ee {topic} Dr. Daniel gaafachaa jirtaa? Waa'ee qorannoo isaa, maxxansaawwan isaa fi carraa tumsa odeeffannoo bal'aa kennuu nan danda'a.",
            publications: {
              recent: "Maxxansaawwan Dr. Daniel kan yeroo dhiyoo qorannoo isaa kan fuuldura jiru agarsiisu:\n\n📄 **EfficientNet_ConvNeXt for Facial Expression Recognition** (IEEE, 2025)\n📄 **Adversarial Robustness of Vision-Language Transformers** (Elsevier, 2024)\n📄 **Deep Learning for HIV Test Prediction** (Springer, 2023)\n\nMaxxansaawwan 25+ fi citation 500+ waliin, hojiin isaa dhiibbaa dhugaa uumaa jira!",
              general: "Dr. Daniel galmeewwan maxxansaa ajaa'ibaa kan maxxansaawwan gamaaggamoo 25+ bakka gurguddoo akka IEEE, Elsevier fi Springer keessatti qaba. Hojiin isaa Vision-Language Transformers, Explainable AI, fi Healthcare AI Applications dabalata."
            },
            research: {
              current: "Dr. Daniel yeroo ammaa pirojektii gammachuu guddaa hedduu irratti hojjechaa jira:\n\n🚀 **Xiyyeeffannaa Qorannoo Ammaa:**\n• Large Language Models (LLMs)\n• Vision-Language Transformers\n• Explainable AI fayyaa eegumsa\n• Adversarial robustness barumsa gadi fagoo keessatti",
              general: "Qorannoon Dr. Daniel fuuldura kalaqaa AI keessa jira! Ogummaan isaa:\n\n🧠 **Damee Qorannoo Ijoo:**\n• Large Language Models (LLMs)\n• Vision-Language Transformers\n• Explainable AI (XAI)\n• Adversarial Robustness\n• AI fayyaa eegumsaaf"
            },
            contact: "Dr. Daniel waliin akka wal qunnamtu si gargaaruuf gammachuu guddaadha!\n\n📧 **Email:** danielmesafint1985@gmail.com\n🏢 **Dhaabbata:** Debre Tabor University, Ethiopia\n💼 **LinkedIn:** /in/daniel-mesafint",
            collaboration: "Dr. Daniel tumsa hiika qaban of danda'een barbaadaa jira! Keessumaa hawwii qabu:\n\n🤝 **Carraa Tumsa:**\n• Pirojektii Qorannoo\n• To'annoo Barataa\n• Tumsa Industrii\n• Gorsa Akaadiimii",
            teaching: "Dr. Daniel barnoota fi qajeelfama irratti hawwii guddaa qaba!\n\n👨‍🏫 **Barsiisuu Gaarii:**\n• Koorsii: Machine Learning, Deep Learning, Computer Vision\n• Barattoonni To'ataman: 20+ barattoonni MSc\n• Badhaasa: Best Teacher Award 2023",
            background: "Waa'ee seenaa ajaa'ibaa Dr. Daniel sitti hima!\n\n🎓 **Barnoota Olaanaa:**\n• PhD Computer Science keessatti AI/ML specialization waliin\n• Assistant Professor Debre Tabor University keessatti\n• Muuxannoo qorannoo AI cimaa waggaa 5+",
            projects: "Dr. Daniel pirojektii fuuldura jiru hedduu irratti hojjechaa jira:\n\n🚀 **Pirojektii Ammaa:**\n• Healthcare AI Platform\n• Multimodal AI Systems\n• Explainable AI Framework\n• Adversarial Defense Systems"
          },
          actions: {
            researchAreas: 'Damee Qorannoo',
            recentPublications: 'Maxxansaawwan Yeroo Dhiyoo',
            contactInfo: 'Odeeffannoo Quunnamtii',
            viewAllPublications: 'Maxxansaawwan Hunda Ilaali',
            researchImpact: 'Dhiibbaa Qorannoo',
            recentPapers: 'Waraqoota Yeroo Dhiyoo',
            viewFullList: 'Tarree Guutuu Ilaali',
            viewProjects: 'Pirojektoota Ilaali',
            collaborationOpportunities: 'Carraa Tumsa',
            healthcareAI: 'AI Fayyaa Eegumsaa',
            visionLanguageModels: 'Moodeela Vision-Language',
            currentProjects: 'Pirojektii Ammaa',
            sendEmail: 'Email Ergi',
            scheduleMeeting: 'Walgahii Saagi',
            linkedinProfile: 'LinkedIn Profile',
            researchCollaboration: 'Tumsa Qorannoo',
            studentSupervision: 'To\'annoo Barataa',
            industryPartnership: 'Tumsa Industrii',
            teachingAwards: 'Badhaasa Barsiisuu',
            researchOpportunities: 'Carraa Qorannoo',
            viewCV: 'CV Koo Ilaali',
            viewAwards: 'Badhaasaawwan Ilaali',
            researchJourney: 'Imala Qorannoo',
            viewAllProjects: 'Pirojektoota Hunda Ilaali',
            askAnotherQuestion: 'Gaaffii Biraa Gaafadhu',
            viewPortfolio: 'Portfolio Ilaali',
            contactDrDaniel: 'Dr. Daniel Quunnamaa'
          }
        }
      },
      ti: {
        chatbot: {
          responses: {
            greetings: [
              "ሰላም! ኣነ ናይ ዶ/ር ዳንኤል AI ሓጋዚ እየ። ብዛዕባ ምርምሩን ስራሑን ክትፈልጥ ክሕግዘካ እኽእል። እንታይ ክትፈልጥ ትደሊ?",
              "ከመይ ኣለኻ! ዓቢ ሓጎስ! ብዛዕባ ምርምር ዶ/ር ዳንኤል፣ ህትመታቱን ከመይ ክትረኽቦ ከም እትኽእል ኩሉ ክነግረካ እኽእል። እንታይ ትደሊ?",
              "እንቋዕ ብሰላም መጻእካ! ስራሕ ዶ/ር ዳንኤል ኣብ AI ን machine learning ን ክትፈልጥ ክሕግዘካ ዓቢ ሓጎስ እዩ። ኣየናይ ዓውዲ ክትመርምር ትደሊ?"
            ],
            thanks: [
              "ብጣዕሚ እንቋዕ! ብዛዕባ ስራሕ ዶ/ር ዳንኤል ካልእ ክትፈልጦ እትደሊ ነገር ኣሎ?",
              "ሓጎስ እዩ ሓጊዘ! ብዛዕባ ምርምሩ ወይ ከመይ ክትረኽቦ ከም እትኽእል ካልእ ዝኾነ ነገር ሕተተኒ።",
              "ሓጎሰይ እዩ! ብዛዕባ ብቕዓት ዶ/ር ዳንኤል ተወሳኺ ሓበሬታ እትደሊ እዋን ኣብዚ ኣለኹ።"
            ],
            goodbye: "ብዛዕባ ስራሕ ዶ/ር ዳንኤል ድሌት ስለ ዘርኣኻ የቐንየለይ! ተወሳኺ ሕቶታት እንተሎካ ኣብ ዝኾነ እዋን ተወከሰና። ጽቡቕ መዓልቲ ይግበረልካ!",
            unclear: "ብትኽክል ክርድኣካ እደሊ። ብዛዕባ {topic} ዶ/ር ዳንኤል ትሓትት ዲኻ? ብዛዕባ ምርምሩ፣ ህትመታቱን ዕድላት ምትሕብባርን ዝርዝር ሓበሬታ ክህበካ እኽእል።",
            publications: {
              recent: "ናይ ዶ/ር ዳንኤል ናይ ቀረባ እዋን ህትመታት ዘመናዊ ምርምሩ ዘርእዩ:\n\n📄 **EfficientNet_ConvNeXt for Facial Expression Recognition** (IEEE, 2025)\n📄 **Adversarial Robustness of Vision-Language Transformers** (Elsevier, 2024)\n📄 **Deep Learning for HIV Test Prediction** (Springer, 2023)\n\nብ25+ ጠቅላላ ህትመታትን 500+ citationsን፣ ስራሑ ሓቀኛ ጽልዋ ይፈጥር ኣሎ!",
              general: "ዶ/ር ዳንኤል ኣብ ዓበይቲ ቦታታት ከም IEEE፣ Elsevier ን Springer ን 25+ ዝተገምገሙ ወረቓታት ዘለዎ ዘደንቕ ናይ ህትመት መዝገብ ኣለዎ። ስራሑ Vision-Language Transformers፣ Explainable AI፣ ን Healthcare AI Applications ይሽፍን።"
            },
            research: {
              current: "ዶ/ር ዳንኤል ኣብዚ እዋን እዚ ኣብ ሓያሎ ዘሕጉስ ፕሮጀክታት ይሰርሕ ኣሎ:\n\n🚀 **ናይ ሕጂ ናይ ምርምር ትኹረት:**\n• Large Language Models (LLMs)\n• Vision-Language Transformers\n• Explainable AI ንጥዕና ክንክን\n• Adversarial robustness ኣብ deep learning",
              general: "ምርምር ዶ/ር ዳንኤል ኣብ ቅድሚት ፈጠራ AI ኣሎ! ብቕዓቱ ዝሽፍኖ:\n\n🧠 **ቀንዲ ዓውድታት ምርምር:**\n• Large Language Models (LLMs)\n• Vision-Language Transformers\n• Explainable AI (XAI)\n• Adversarial Robustness\n• AI ንጥዕና ክንክን"
            },
            contact: "ምስ ዶ/ር ዳንኤል ክትራኸብ ክሕግዘካ ሓጎስ እዩ!\n\n📧 **ኢመይል:** danielmesafint1985@gmail.com\n🏢 **ትካል:** ደብረ ታቦር ዩኒቨርሲቲ፣ ኢትዮጵያ\n💼 **ሊንክድኢን:** /in/daniel-mesafint",
            collaboration: "ዶ/ር ዳንኤል ትርጉም ዘለዎም ምትሕብባራት ብንቃት ይደሊ! ብፍላይ ድሌት ዘለዎ:\n\n🤝 **ዕድላት ምትሕብባር:**\n• ፕሮጀክታት ምርምር\n• ክትትል ተማሃሮ\n• ምትሕብባር ኢንዱስትሪ\n• ኣካዳሚያዊ ምኽሪ",
            teaching: "ዶ/ር ዳንኤል ብዛዕባ ትምህርትን መምህርነትን ተጓዳኢ እዩ!\n\n👨‍🏫 **ብቕዓት ምምሃር:**\n• ኮርሳት: Machine Learning, Deep Learning, Computer Vision\n• ዝተከታተሉ ተማሃሮ: 20+ ናይ ማስተርስ ተማሃሮ\n• ሽልማታት: Best Teacher Award 2023",
            background: "ብዛዕባ ዘደንቕ ድሕረ ባይታ ዶ/ር ዳንኤል ክነግረካ!\n\n🎓 **ኣካዳሚያዊ ብቕዓት:**\n• ዶክቶሬት ኣብ Computer Science ምስ AI/ML specialization\n• Assistant Professor ኣብ ደብረ ታቦር ዩኒቨርሲቲ\n• 5+ ዓመት ጽኑዕ ናይ AI ምርምር ተመኩሮ",
            projects: "ዶ/ር ዳንኤል ኣብ ሓያሎ ዘመናዊ ፕሮጀክታት ይሰርሕ ኣሎ:\n\n🚀 **ናይ ሕጂ ፕሮጀክታት:**\n• Healthcare AI Platform\n• Multimodal AI Systems\n• Explainable AI Framework\n• Adversarial Defense Systems"
          },
          actions: {
            researchAreas: 'ዓውድታት ምርምር',
            recentPublications: 'ናይ ቀረባ እዋን ህትመታት',
            contactInfo: 'ሓበሬታ ርክብ',
            viewAllPublications: 'ኩሎም ህትመታት ርአ',
            researchImpact: 'ጽልዋ ምርምር',
            recentPapers: 'ናይ ቀረባ እዋን ወረቓታት',
            viewFullList: 'ምሉእ ዝርዝር ርአ',
            viewProjects: 'ፕሮጀክታት ርአ',
            collaborationOpportunities: 'ዕድላት ምትሕብባር',
            healthcareAI: 'AI ጥዕና ክንክን',
            visionLanguageModels: 'Vision-Language Models',
            currentProjects: 'ናይ ሕጂ ፕሮጀክታት',
            sendEmail: 'ኢመይል ስደድ',
            scheduleMeeting: 'ኣኼባ ውዕል',
            linkedinProfile: 'LinkedIn Profile',
            researchCollaboration: 'ምትሕብባር ምርምር',
            studentSupervision: 'ክትትል ተማሃሮ',
            industryPartnership: 'ምትሕብባር ኢንዱስትሪ',
            teachingAwards: 'ሽልማታት ምምሃር',
            researchOpportunities: 'ዕድላት ምርምር',
            viewCV: 'CV ይ ርአ',
            viewAwards: 'ሽልማታት ርአ',
            researchJourney: 'ጉዕዞ ምርምር',
            viewAllProjects: 'ኩሎም ፕሮጀክታት ርአ',
            askAnotherQuestion: 'ካልእ ሕቶ ሕተት',
            viewPortfolio: 'Portfolio ርአ',
            contactDrDaniel: 'ዶ/ር ዳንኤል ተወከስ'
          }
        }
      }
    };
    
    const targetTranslations = translations[language] || translations.en;
    
    // Navigate through nested keys (e.g., 'chatbot.responses.greetings')
    const keys = key.split('.');
    let result = targetTranslations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if key not found
        result = translations.en;
        for (const fallbackKey of keys) {
          if (result && typeof result === 'object' && fallbackKey in result) {
            result = result[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    // Handle array results (like greetings array)
    if (Array.isArray(result)) {
      return result;
    }
    
    // Handle string interpolation for options
    if (typeof result === 'string' && options) {
      return result.replace(/\{(\w+)\}/g, (match, key) => options[key] || match);
    }
    
    return result || key;
  };

  // Generate contextual responses with language detection
  const generateResponse = (analysis) => {
    const { intent, topic, confidence, originalText } = analysis;
    let detectedLanguage = detectLanguage(originalText);
    
    // Chrome compatibility: Enhanced language persistence
    const isChrome = navigator.userAgent.includes('Chrome');
    
    // Chrome-specific fix: Use conversation language more aggressively
    if (isChrome && conversationLanguage && conversationLanguage !== 'en') {
      // Check if this is the same language as saved conversation language
      const isAmharicGreeting = originalText.includes('ሰላም') && conversationLanguage === 'am';
      const isOromoGreeting = originalText.toLowerCase().includes('akkam') && conversationLanguage === 'or';
      const isTigrignaGreeting = originalText.includes('ሰላም') && conversationLanguage === 'ti';
      
      if (isAmharicGreeting || isOromoGreeting || isTigrignaGreeting) {
        console.log('🔄 Chrome: Forcing saved conversation language:', conversationLanguage);
        detectedLanguage = conversationLanguage;
      }
    }
    
    console.log('🤖 Generating response for:', {
      originalText,
      detectedLanguage,
      conversationLanguage,
      intent,
      topic,
      confidence,
      lastDetectedLanguage,
      isChrome,
      storageCheck: {
        sessionStorage: typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('chatbot_conversation_language') : null,
        localStorage: typeof localStorage !== 'undefined' ? localStorage.getItem('chatbot_conversation_language') : null,
        windowProperty: window.chatbotLanguage
      }
    });
    
    // Force use detected language for response
    console.log('🌐 Using language for response:', detectedLanguage);
    
    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      lastTopic: topic,
      userInterests: prev.userInterests.includes(topic) ? prev.userInterests : [...prev.userInterests, topic],
      askedQuestions: [...prev.askedQuestions, originalText]
    }));

    // Handle greetings with detected language
    if (intent === 'greeting') {
      console.log('🎉 Greeting detected! Using language:', detectedLanguage);
      const greetings = getTranslationInLanguage('chatbot.responses.greetings', detectedLanguage);
      console.log('🎉 Retrieved greetings:', greetings);
      
      // Ensure we have greetings array
      const greetingsArray = Array.isArray(greetings) ? greetings : [greetings];
      const selectedGreeting = greetingsArray[Math.floor(Math.random() * greetingsArray.length)];
      
      console.log('🎉 Selected greeting:', selectedGreeting);
      
      return {
        content: selectedGreeting,
        actions: [
          { text: getTranslationInLanguage('chatbot.actions.researchAreas', detectedLanguage), action: () => handleIntelligentReply('research') },
          { text: getTranslationInLanguage('chatbot.actions.recentPublications', detectedLanguage), action: () => handleIntelligentReply('publications') },
          { text: getTranslationInLanguage('chatbot.actions.contactInfo', detectedLanguage), action: () => handleIntelligentReply('contact') }
        ]
      };
    }

    // Handle thanks with detected language
    if (intent === 'thanks') {
      const thankResponses = getTranslationInLanguage('chatbot.responses.thanks', detectedLanguage, { returnObjects: true });
      return {
        content: thankResponses[Math.floor(Math.random() * thankResponses.length)],
        actions: [
          { text: getTranslationInLanguage('chatbot.actions.askAnotherQuestion', detectedLanguage), action: () => {} },
          { text: getTranslationInLanguage('chatbot.actions.viewPortfolio', detectedLanguage), action: () => scrollToSection('#about') }
        ]
      };
    }

    // Handle goodbyes with detected language
    if (intent === 'goodbye') {
      return {
        content: getTranslationInLanguage('chatbot.responses.goodbye', detectedLanguage),
        actions: [
          { text: getTranslationInLanguage('chatbot.actions.contactDrDaniel', detectedLanguage), action: () => scrollToSection('#contact') },
          { text: getTranslationInLanguage('chatbot.actions.viewCV', detectedLanguage), action: () => window.open('/view-cv.html', '_blank', 'noopener,noreferrer') }
        ]
      };
    }

    // Topic-specific responses with high confidence
    if (confidence > 0) {
      return getTopicResponse(topic, analysis);
    }

    // Low confidence or unclear input with detected language
    return {
      content: getTranslationInLanguage('chatbot.responses.unclear', detectedLanguage, { topic }),
      actions: [
        { text: getTranslationInLanguage('chatbot.actions.researchAreas', detectedLanguage), action: () => handleIntelligentReply('research') },
        { text: getTranslationInLanguage('chatbot.actions.recentPublications', detectedLanguage), action: () => handleIntelligentReply('publications') },
        { text: getTranslationInLanguage('chatbot.actions.contactInfo', detectedLanguage), action: () => handleIntelligentReply('contact') }
      ]
    };
  };

  // Topic-specific response generator with language detection
  const getTopicResponse = (topic, analysis) => {
    const detectedLanguage = detectLanguage(analysis.originalText);
    
    const responses = {
      publications: () => {
        if (analysis.originalText.includes('recent') || analysis.originalText.includes('latest')) {
          return {
            content: getTranslationInLanguage('chatbot.responses.publications.recent', detectedLanguage),
            actions: [
              { text: getTranslationInLanguage('chatbot.actions.viewAllPublications', detectedLanguage), action: () => scrollToSection('#publications') },
              { text: getTranslationInLanguage('chatbot.actions.researchImpact', detectedLanguage), action: () => handleIntelligentReply('research impact') }
            ]
          };
        }
        return {
          content: getTranslationInLanguage('chatbot.responses.publications.general', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.recentPapers', detectedLanguage), action: () => handleIntelligentReply('recent publications') },
            { text: getTranslationInLanguage('chatbot.actions.researchAreas', detectedLanguage), action: () => handleIntelligentReply('research') },
            { text: getTranslationInLanguage('chatbot.actions.viewFullList', detectedLanguage), action: () => scrollToSection('#publications') }
          ]
        };
      },

      research: () => {
        if (analysis.originalText.includes('current') || analysis.originalText.includes('ongoing')) {
          return {
            content: getTranslationInLanguage('chatbot.responses.research.current', detectedLanguage),
            actions: [
              { text: getTranslationInLanguage('chatbot.actions.viewProjects', detectedLanguage), action: () => scrollToSection('#projects') },
              { text: getTranslationInLanguage('chatbot.actions.collaborationOpportunities', detectedLanguage), action: () => handleIntelligentReply('collaboration') }
            ]
          };
        }
        return {
          content: getTranslationInLanguage('chatbot.responses.research.general', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.healthcareAI', detectedLanguage), action: () => handleIntelligentReply('healthcare ai') },
            { text: getTranslationInLanguage('chatbot.actions.visionLanguageModels', detectedLanguage), action: () => handleIntelligentReply('vision language') },
            { text: getTranslationInLanguage('chatbot.actions.currentProjects', detectedLanguage), action: () => handleIntelligentReply('current research') }
          ]
        };
      },

      contact: () => {
        return {
          content: getTranslationInLanguage('chatbot.responses.contact', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.sendEmail', detectedLanguage), action: () => scrollToSection('#contact') },
            { text: getTranslationInLanguage('chatbot.actions.scheduleMeeting', detectedLanguage), action: () => window.open('mailto:danielmesafint1985@gmail.com?subject=Consultation%20request', '_blank') },
            { text: getTranslationInLanguage('chatbot.actions.linkedinProfile', detectedLanguage), action: () => window.open('https://www.linkedin.com/in/daniel-mesafint', '_blank') }
          ]
        };
      },

      collaboration: () => {
        return {
          content: getTranslationInLanguage('chatbot.responses.collaboration', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.researchCollaboration', detectedLanguage), action: () => scrollToSection('#contact') },
            { text: getTranslationInLanguage('chatbot.actions.studentSupervision', detectedLanguage), action: () => handleIntelligentReply('teaching') },
            { text: getTranslationInLanguage('chatbot.actions.industryPartnership', detectedLanguage), action: () => scrollToSection('#contact') }
          ]
        };
      },

      teaching: () => {
        return {
          content: getTranslationInLanguage('chatbot.responses.teaching', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.studentSupervision', detectedLanguage), action: () => scrollToSection('#contact') },
            { text: getTranslationInLanguage('chatbot.actions.teachingAwards', detectedLanguage), action: () => scrollToSection('#awards') },
            { text: getTranslationInLanguage('chatbot.actions.researchOpportunities', detectedLanguage), action: () => handleIntelligentReply('collaboration') }
          ]
        };
      },

      background: () => {
        return {
          content: getTranslationInLanguage('chatbot.responses.background', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.viewCV', detectedLanguage), action: () => window.open('/view-cv.html', '_blank', 'noopener,noreferrer') },
            { text: getTranslationInLanguage('chatbot.actions.viewAwards', detectedLanguage), action: () => scrollToSection('#awards') },
            { text: getTranslationInLanguage('chatbot.actions.researchJourney', detectedLanguage), action: () => scrollToSection('#interactive-timeline') }
          ]
        };
      },

      projects: () => {
        return {
          content: getTranslationInLanguage('chatbot.responses.projects', detectedLanguage),
          actions: [
            { text: getTranslationInLanguage('chatbot.actions.viewAllProjects', detectedLanguage), action: () => scrollToSection('#projects') },
            { text: getTranslationInLanguage('chatbot.actions.healthcareAI', detectedLanguage), action: () => handleIntelligentReply('healthcare ai') },
            { text: getTranslationInLanguage('chatbot.actions.collaborationOpportunities', detectedLanguage), action: () => handleIntelligentReply('collaboration') }
          ]
        };
      }
    };

    return responses[topic] ? responses[topic]() : {
      content: getTranslationInLanguage('chatbot.responses.unclear', detectedLanguage, { topic }),
      actions: [
        { text: getTranslationInLanguage('chatbot.actions.researchAreas', detectedLanguage), action: () => handleIntelligentReply('research') },
        { text: getTranslationInLanguage('chatbot.actions.recentPublications', detectedLanguage), action: () => handleIntelligentReply('publications') },
        { text: getTranslationInLanguage('chatbot.actions.contactInfo', detectedLanguage), action: () => handleIntelligentReply('contact') }
      ]
    };
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Enhanced intelligent reply handler
  const handleIntelligentReply = (topic) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: quickReplies.find(reply => reply.action.toString().includes(topic))?.text || 
               `Tell me about ${topic}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      // Use the intelligent analysis system
      const analysis = analyzeUserInput(userMessage.content);
      const response = generateResponse(analysis);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        actions: response.actions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000); // Variable response time for more natural feel
  };

  const handleQuickReply = (type) => {
    handleIntelligentReply(type);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Use the intelligent conversation system
    setTimeout(() => {
      // Analyze user input with advanced NLP
      const analysis = analyzeUserInput(currentInput);
      const response = generateResponse(analysis);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        actions: response.actions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 800); // Variable response time for natural conversation feel
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* AI Assistant Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-primary-500 to-grido-purple rounded-xl shadow-lg transition-all duration-300 group ${
          isOpen ? 'hidden' : 'flex'
        } items-center space-x-2 px-3 py-2 hover:shadow-xl`}
        style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
      >
        {/* AI Icon with Animation */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles size={20} className="text-white/30" />
          </motion.div>
          <div className="relative z-10 w-8 h-8 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <img
              src="/ai_ask_me_5.png"
              alt="AI Assistant"
              className="w-6 h-6 object-contain"
              style={{ filter: 'brightness(1.2) contrast(1.1)' }}
            />
          </div>
        </div>
        
        {/* AI Assistant Text */}
        <div className="flex flex-col items-start">
          <span className="text-white font-semibold text-sm">{t('chatbot.title')}</span>
          <span className="text-white/80 text-xs">{t('chatbot.askAnything')}</span>
        </div>
        
        {/* Notification Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          style={{ boxShadow: '0 0 10px #4ade80' }}
        />
        
        {/* Pulse Effect */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-grido-purple/20 rounded-2xl"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            role="dialog"
            aria-label="AI Assistant"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] grido-card rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-primary-500/30"
            style={{
              width: 'min(24rem, calc(100vw - 2rem))',
              height: 'min(34rem, calc(100vh - 7rem))',
              backgroundColor: 'rgba(15, 23, 42, 0.98)'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600/20 to-grido-purple/20 border-b border-primary-500/30 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/ai_ask_me_5.png"
                    alt="AI Assistant"
                    className="w-7 h-7 object-contain"
                    style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t('chatbot.title')}</h3>
                  <p className="text-white/80 text-sm">{t('chatbot.subtitle')}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                title="Close"
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={20} className="text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-accent-500' 
                          : 'bg-gradient-to-r from-primary-600 to-accent-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User size={16} className="text-white" />
                        ) : (
                          <img
                            src="/ai_ask_me_5.png"
                            alt="AI"
                            className="w-4 h-4 object-contain"
                            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                          />
                        )}
                      </div>
                      
                      <div className={`rounded-2xl p-3 ${
                        message.type === 'user'
                          ? 'bg-accent-500 text-white'
                          : 'bg-neutral-700 text-gray-100'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {/* Action Buttons */}
                        {message.actions && (
                          <div className="mt-3 space-y-2">
                            {message.actions.map((action, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={action.action}
                                className="block w-full text-left px-3 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg text-sm transition-colors"
                              >
                                {action.text}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 flex items-center justify-center overflow-hidden">
                      <img
                        src="/ai_ask_me_5.png"
                        alt="AI Assistant"
                        className="w-5 h-5 object-contain"
                        style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                      />
                    </div>
                    <div className="bg-neutral-700 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={reply.action}
                      className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-sm rounded-full transition-colors"
                    >
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-neutral-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-500 focus:outline-none text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-accent-500 hover:bg-accent-400 disabled:bg-neutral-600 disabled:cursor-not-allowed rounded-lg transition-colors text-black"
                  style={inputMessage.trim() ? { boxShadow: '0 0 15px rgba(158, 255, 0, 0.3)' } : {}}
                >
                  <Send size={16} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;