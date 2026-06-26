import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        research: 'Research',
        publications: 'Publications',
        projects: 'Projects',
        blog: 'Blog',
        teaching: 'Teaching',
        events: 'Events',
        contact: 'Contact',
        analytics: 'Analytics',
        media: 'Media & Presentations',
        networking: 'Networking'
      },

      // Hero Section
      hero: {
        greeting: 'HELLO, I\'M',
        name: 'Dr. Daniel Mesafint',
        titles: {
          researcher: 'AI Researcher',
          professor: 'Assistant Professor',
          coordinator: 'Technology Transfer Coordinator',
          expert: 'Vision-Language Expert',
          specialist: 'Deep Learning Specialist'
        },
        description: {
          main: 'Dynamic and results-oriented AI Researcher with over 5 years of experience specializing in Vision-Language Transformers and leading transformative projects.',
          secondary: 'Proven track record of diagnosing complex challenges, delivering innovative solutions, and fostering collaborative team environments.'
        },
        buttons: {
          viewCV: 'View My CV',
          contact: 'Contact Me'
        }
      },

      // About Section
      about: {
        title: 'About Me',
        subtitle: 'Passionate AI researcher dedicated to transforming agriculture through innovative technology',
        background: {
          title: 'Background',
          content: 'With over 5 years of experience in artificial intelligence and computer vision, I specialize in developing cutting-edge solutions for agricultural challenges. My work focuses on Vision-Language Transformers and their applications in precision agriculture.'
        },
        expertise: {
          title: 'Expertise',
          areas: {
            ai: 'Artificial Intelligence',
            cv: 'Computer Vision',
            ml: 'Machine Learning',
            agriculture: 'Agricultural Technology',
            research: 'Research & Development'
          }
        },
        mission: {
          title: 'Mission',
          content: 'To bridge the gap between advanced AI research and practical agricultural applications, making technology accessible to farmers worldwide and contributing to sustainable food security.'
        },
        cards: {
          journalReviewer: {
            title: 'Journal Reviewer',
            description: 'ACM, BMJ Public Health, Journal of Big Data'
          },
          curriculumDeveloper: {
            title: 'Curriculum Developer',
            description: 'AI systems and educational program design'
          },
          skillsRadar: 'Skills Radar',
          collaborate: {
            title: 'Let\'s Collaborate',
            description: 'Interested in AI research collaboration or academic partnerships? I\'m always open to discussing innovative projects and opportunities.',
            button: 'Get in Touch'
          },
          researchImpact: 'Research Impact',
          researchJourney: 'Research Journey'
        }
      },

      // Research Section
      research: {
        title: 'Research Interests',
        subtitle: 'Exploring the frontiers of artificial intelligence through innovative research and practical applications',
        areas: {
          llm: {
            title: 'Large Language Models (LLMs)',
            description: 'Advanced research in transformer architectures, fine-tuning methodologies, and efficient training techniques for multilingual applications.'
          },
          visionLanguage: {
            title: 'Vision-Language Transformers',
            description: 'Exploring multimodal AI systems that understand and generate content across visual and textual domains.'
          },
          explainableAI: {
            title: 'Explainable AI (XAI)',
            description: 'Developing interpretable AI systems that provide transparent decision-making processes for critical applications.'
          },
          adversarialRobustness: {
            title: 'Adversarial Robustness',
            description: 'Enhancing AI model security against adversarial attacks and improving model reliability in real-world scenarios.'
          },
          printing3D: {
            title: '3D Printing & AI-driven Materials Science',
            description: 'Integrating AI with materials science for innovative 3D printing applications and smart material design.'
          },
          healthcare: {
            title: 'AI for Healthcare',
            description: 'Applying AI technologies to solve healthcare challenges, from diagnostic systems to treatment optimization.'
          }
        },
        timeline: {
          title: 'Research Evolution Timeline'
        },
        collaborations: {
          title: 'Research Collaborations',
          interested: 'Interested in Collaboration?',
          description: 'I\'m always looking for opportunities to collaborate on cutting-edge AI research. Whether you\'re a researcher, industry partner, or student, let\'s explore how we can work together.',
          viewPublications: 'View Publications',
          contactMe: 'Contact Me'
        }
      },

      // Publications Section
      publications: {
        title: 'Publications',
        subtitle: 'Peer-reviewed research contributions to the advancement of AI and machine learning',
        stats: {
          total: 'Total Publications',
          journals: 'Journal Articles',
          conferences: 'Conference Papers',
          citations: 'Total Citations'
        },
        filters: {
          search: 'Search publications, authors, or keywords...',
          allYears: 'All Years',
          allTypes: 'All Types'
        },
        actions: {
          view: 'View',
          doi: 'DOI',
          download: 'Download Bibliography (BibTeX)',
          downloadPdf: 'Download PDF',
          viewPaper: 'View Paper'
        },
        noResults: {
          title: 'No publications found',
          description: 'Try adjusting your search criteria or filters'
        },
        modal: {
          authors: 'Authors:',
          abstract: 'Abstract',
          keywords: 'Keywords'
        }
      },

      // Projects Section
      projects: {
        title: 'Featured Work & Publications',
        subtitle: 'Innovative AI solutions, research implementations, and thought leadership articles that bridge theory and practice',
        categories: {
          all: 'All',
          research: 'Research',
          application: 'Application',
          enterprise: 'Enterprise',
          healthcare: 'Healthcare',
          manufacturing: 'Manufacturing'
        },
        status: {
          active: 'Active',
          completed: 'Completed',
          planning: 'Planning'
        },
        details: {
          technologiesUsed: 'Technologies Used',
          impact: 'Impact',
          viewCode: 'View Code',
          liveDemo: 'Live Demo',
          code: 'Code',
          demo: 'Demo'
        },
        sections: {
          allProjects: 'All Projects',
          exploreMore: 'Explore More on GitHub',
          githubDescription: 'Check out my GitHub profile for more projects, contributions, and open-source work. I\'m always working on something new and exciting!',
          visitGithub: 'Visit GitHub Profile'
        }
      },

      // Contact Section
      contact: {
        title: 'Get In Touch',
        subtitle: 'Let\'s discuss research collaborations, academic partnerships, or any questions you might have',
        form: {
          name: 'Full Name',
          email: 'Email Address',
          subject: 'Subject',
          message: 'Message',
          type: 'Inquiry Type',
          send: 'Send Message',
          sending: 'Sending...',
          success: 'Message sent successfully! I\'ll get back to you soon.',
          error: 'Failed to send message. Please try again.'
        },
        info: {
          email: 'Email',
          phone: 'Phone',
          location: 'Location',
          schedule: 'Schedule Meeting'
        },
        officeHours: {
          title: 'Office Hours',
          monday: 'Mon - Fri: 9:00 AM - 5:00 PM',
          response: 'Response: Within 24 hours',
          bestTime: 'Best Time: 2:00 - 4:00 PM'
        }
      },

      // Blog Section
      blog: {
        title: 'Latest Articles & Insights',
        subtitle: 'Exploring the intersection of technology, research, and innovation through in-depth articles and thought leadership',
        search: 'Search articles...',
        readMore: 'Read More',
        readTime: 'min read',
        categories: {
          research: 'Research',
          technology: 'Technology',
          agriculture: 'Agriculture',
          ai: 'Artificial Intelligence'
        }
      },

      // Testimonials Section
      testimonials: {
        title: 'What Clients Say',
        subtitle: 'Testimonials',
        description: 'Testimonials from research collaborators, industry partners, and academic peers who have worked with me on various projects.',
        project: 'Project:',
        pauseAutoplay: 'Pause Auto-play',
        resumeAutoplay: 'Resume Auto-play',
        nextTestimonial: 'Next testimonial',
        prevTestimonial: 'Previous testimonial',
        goToTestimonial: 'Go to testimonial'
      },

      // Sidebar Section
      sidebar: {
        title: 'Dr. Daniel Portfolio',
        progress: 'Progress',
        quickActions: {
          light: 'Light',
          dark: 'Dark',
          viewCV: 'View My CV'
        },
        footer: {
          name: 'Dr. Daniel Mesafint',
          title: 'AI Researcher & Data Scientist'
        }
      },

      // ChatBot Section
      chatbot: {
        title: 'AI Assistant',
        subtitle: 'Ask me about Dr. Daniel',
        welcome: "Hello! I'm Dr. Daniel's AI assistant. I can help you learn about his research, publications, and collaboration opportunities. How can I assist you today?",
        placeholder: 'Type your message...',
        quickReplies: {
          publications: 'Show Publications',
          research: 'Research Areas',
          contact: 'Contact Info',
          cv: 'View My CV'
        },
        typing: 'AI is typing...',
        askAnything: 'Ask me anything',
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
          unclear: "I want to make sure I understand you correctly. Are you asking about Dr. Daniel's {topic}? I can provide detailed information about:\n\n• His research in AI and machine learning\n• Publications and academic work\n• How to contact or collaborate with him\n• His teaching and supervision experience\n\nCould you clarify what specific aspect interests you most?",
          publications: {
            recent: "Dr. Daniel's most recent publications showcase his cutting-edge research:\n\n📄 **EfficientNet_ConvNeXt for Facial Expression Recognition** (IEEE, 2025)\n   - Novel approach to emotion recognition using advanced neural networks\n\n📄 **Adversarial Robustness of Vision-Language Transformers** (Elsevier, 2024)\n   - Groundbreaking work on making AI systems more secure\n\n📄 **Deep Learning for HIV Test Prediction** (Springer, 2023)\n   - AI applications in healthcare diagnostics\n\nWith 25+ total publications and 500+ citations, his work is making real impact in the field!",
            general: "Dr. Daniel has an impressive publication record with 25+ peer-reviewed papers in top venues like IEEE, Elsevier, and Springer. His work spans:\n\n🔬 **Research Areas:**\n• Vision-Language Transformers\n• Explainable AI\n• Healthcare AI Applications\n• Adversarial Robustness\n\n📊 **Impact Metrics:**\n• 500+ citations\n• H-index: 12\n• Published in top-tier journals\n\nWould you like to explore any specific publication or research area?"
          },
          research: {
            current: "Dr. Daniel is currently working on several exciting projects:\n\n🚀 **Current Research Focus:**\n• Large Language Models (LLMs) for specialized domains\n• Vision-Language Transformers for multimodal understanding\n• Explainable AI for healthcare applications\n• Adversarial robustness in deep learning systems\n\n🤝 **Active Collaborations:**\n• Stanford University - Advanced AI systems\n• MIT - Robustness research\n• Oxford University - Healthcare AI\n• Google Research - Large-scale ML\n\nHis research combines theoretical advances with practical applications, especially in healthcare and education.",
            general: "Dr. Daniel's research is at the forefront of AI innovation! His expertise spans:\n\n🧠 **Core Research Areas:**\n• **Large Language Models (LLMs)** - Advanced natural language processing\n• **Vision-Language Transformers** - Multimodal AI systems\n• **Explainable AI (XAI)** - Making AI transparent and trustworthy\n• **Adversarial Robustness** - Securing AI against attacks\n• **AI for Healthcare** - Medical diagnosis and treatment\n• **3D Printing & AI Materials** - Smart manufacturing\n\nHis work bridges theory and practice, with real-world applications that make a difference. Which area interests you most?"
          },
          contact: "I'd be happy to help you connect with Dr. Daniel! Here are the best ways to reach him:\n\n📧 **Email:** danielmesafint1985@gmail.com\n   (He typically responds within 24 hours)\n\n🏢 **Institution:** Debre Tabor University, Ethiopia\n\n💼 **LinkedIn:** /in/daniel-mesafint\n   (Great for professional networking)\n\n📅 **Schedule a Meeting:** Available via Calendly for:\n   • Research discussions\n   • Collaboration opportunities\n   • Student supervision inquiries\n   • Speaking engagements\n\nWhat type of inquiry would you like to make?",
          collaboration: "Dr. Daniel is actively seeking meaningful collaborations! He's particularly interested in:\n\n🤝 **Collaboration Opportunities:**\n• **Research Projects** - Joint AI/ML research initiatives\n• **Student Supervision** - MSc and PhD student mentoring\n• **Industry Partnerships** - Applied AI solutions\n• **Academic Consulting** - Expert advice on AI projects\n• **Speaking Engagements** - Conferences and workshops\n\n🌟 **Current Collaborations:**\n• Stanford University - Advanced AI systems\n• MIT - Robustness and security research\n• Oxford University - Healthcare AI applications\n• Google Research - Large-scale machine learning\n\nHe brings deep expertise in AI/ML with a focus on practical, impactful solutions. What type of collaboration interests you?",
          teaching: "Dr. Daniel is passionate about education and mentoring the next generation of AI researchers!\n\n👨‍🏫 **Teaching Excellence:**\n• **Courses:** Machine Learning, Deep Learning, Computer Vision, AI Ethics\n• **Students Supervised:** 20+ MSc students\n• **Teaching Awards:** Best Teacher Award 2023\n\n🎓 **Supervision Approach:**\n• Hands-on research experience\n• Industry-relevant projects\n• Publication opportunities\n• Career guidance and mentoring\n\n🏆 **Student Success:**\n• High publication rate among supervised students\n• Strong industry placement record\n• Active research community\n\nAre you interested in studying under his supervision or learning about his teaching philosophy?",
          background: "Let me tell you about Dr. Daniel's impressive background!\n\n🎓 **Academic Excellence:**\n• **PhD in Computer Science** with AI/ML specialization\n• **Assistant Professor** at Debre Tabor University\n• **5+ years** of intensive AI research experience\n\n🏆 **Professional Achievements:**\n• **25+ publications** in top-tier venues\n• **500+ citations** and growing impact\n• **Research Excellence Award 2024**\n• **Best Teacher Award 2023**\n\n🌍 **Global Recognition:**\n• Collaborations with Stanford, MIT, Oxford\n• Industry partnerships with Google Research\n• International conference speaker\n• Peer reviewer for major AI journals\n\nHis journey combines rigorous academic training with practical industry experience, making him a well-rounded AI expert.",
          projects: "Dr. Daniel is working on several cutting-edge projects that push the boundaries of AI:\n\n🚀 **Current Projects:**\n• **Healthcare AI Platform** - AI-powered diagnostic tools\n• **Multimodal AI Systems** - Vision-language understanding\n• **Explainable AI Framework** - Transparent AI decision-making\n• **Adversarial Defense Systems** - Robust AI security\n\n💡 **Innovation Focus:**\n• Real-world problem solving\n• Ethical AI development\n• Scalable solutions\n• Industry collaboration\n\n🎯 **Impact Areas:**\n• Healthcare diagnostics\n• Educational technology\n• Smart manufacturing\n• Social good applications\n\nEach project combines theoretical rigor with practical impact. Would you like to learn more about any specific project?"
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
      },

      // Teaching Section
      teaching: {
        title: 'Teaching & Supervision',
        subtitle: 'Empowering the next generation of AI researchers through innovative education and mentorship'
      },

      // Awards Section
      awards: {
        title: 'Achievements & Collaborations',
        subtitle: 'Showcasing research excellence, prestigious partnerships, and professional contributions to the global AI community'
      },

      // Additional Components
      floatingMenu: {
        viewCV: 'View My CV',
        publications: 'Publications',
        contact: 'Contact',
        shareProfile: 'Share Profile',
        profileShared: 'Profile link copied to clipboard!'
      },

      timeline: {
        title: 'Career Journey',
        subtitle: 'An interactive timeline showcasing my professional journey, educational milestones, and key achievements in research and technology',
        categories: {
          all: 'All Events',
          career: 'Career',
          education: 'Education',
          achievement: 'Achievements'
        },
        stats: {
          experience: 'Years Experience',
          papers: 'Research Papers',
          awards: 'Awards Won',
          projects: 'Projects Led'
        },
        details: {
          description: 'Description',
          achievements: 'Key Achievements',
          technologies: 'Technologies & Skills',
          clickToView: 'Click to view details'
        }
      },

      socialMedia: {
        title: 'Social Media & Community',
        subtitle: 'Stay connected and follow my latest research updates, insights, and community contributions across social platforms',
        platforms: {
          twitter: 'Twitter',
          linkedin: 'LinkedIn',
          github: 'GitHub',
          youtube: 'YouTube'
        },
        stats: {
          followers: 'Followers',
          connections: 'Connections',
          subscribers: 'Subscribers'
        },
        content: {
          latestTweets: 'Latest Tweets',
          linkedinUpdates: 'LinkedIn Updates',
          recentRepos: 'Recent Repositories',
          latestVideos: 'Latest Videos',
          stayConnected: 'Stay Connected',
          followDescription: 'Follow me on your preferred platform to get the latest updates on AI research, healthcare technology, and insights from the field.'
        }
      },

      loadingScreen: {
        loading: 'Loading Dr. Daniel Mesafint\'s portfolio',
        loadingComplete: 'Portfolio loaded successfully'
      },

      search: {
        placeholder: 'Search...',
        shortcut: 'Search (Ctrl+K)',
        noResults: 'No results found',
        searchEverything: 'Search everything'
      },

      pwa: {
        install: 'Install App',
        installPrompt: 'Install this app for a better experience',
        offline: 'You are offline',
        online: 'Back online'
      },

      // Events Section
      events: {
        title: 'Events & Calendar',
        subtitle: 'Stay updated with upcoming conferences, office hours, workshops, and important academic dates',
        tabs: {
          upcoming: 'Upcoming Events',
          officeHours: 'Office Hours',
          workshops: 'Workshop Schedule',
          academic: 'Academic Calendar'
        },
        details: {
          date: 'Date',
          time: 'Time',
          location: 'Location',
          attendees: 'Attendees',
          duration: 'Duration',
          level: 'Level'
        }
      },

      // Quick Intro Section
      quickIntro: {
        title: 'Quick Introduction',
        description: 'Get to know my expertise and achievements in AI research and education',
        publications: 'Publications',
        students: 'Students Taught',
        awards: 'Awards',
        projects: 'Projects',
        expertise: {
          title: 'Areas of Expertise',
          description: 'Specializing in cutting-edge AI research with practical applications in healthcare, education, and agriculture.'
        }
      },

      // Featured Research Section
      featuredResearch: {
        title: 'Featured Research',
        description: 'Highlighting my most impactful research projects and ongoing investigations',
        viewAll: 'View All Research'
      },

      // Latest Publications Section
      latestPublications: {
        title: 'Latest Publications',
        description: 'Recent peer-reviewed research contributions to the advancement of AI and machine learning',
        viewAll: 'View All Publications'
      },

      // Quick Links Section
      quickLinks: {
        title: 'Explore My Work',
        description: 'Quick access to different sections of my portfolio and professional activities'
      },

      // Research Interests Section
      researchInterests: {
        title: 'Research Interests',
        subtitle: 'Exploring the frontiers of artificial intelligence through innovative research and practical applications'
      },

      // Research Projects Section
      researchProjects: {
        title: 'Research Projects',
        subtitle: 'Current and past research initiatives driving innovation in AI and machine learning'
      },

      // Research Funding Section
      researchFunding: {
        title: 'Research Funding & Awards',
        subtitle: 'Financial support and recognition enabling groundbreaking research and innovation'
      },

      // Research Collaborations Section
      researchCollaborations: {
        title: 'Research Collaborations',
        subtitle: 'Global partnerships and collaborative networks advancing AI research worldwide'
      },

      // Research Timeline Section
      researchTimeline: {
        title: 'Research Timeline',
        subtitle: 'A chronological journey through my research evolution and key milestones'
      },

      // Biography Section
      biography: {
        title: 'Biography',
        subtitle: 'Learn about my journey, passion, and dedication to advancing AI research',
        background: {
          title: 'Professional Background',
          content: 'With over 5 years of experience in artificial intelligence and computer vision, I specialize in developing cutting-edge solutions for real-world challenges. My work focuses on Vision-Language Transformers, Explainable AI, and their applications in healthcare and education.',
          secondary: 'I am passionate about bridging the gap between theoretical research and practical applications, ensuring that AI technologies can make a meaningful impact on society.'
        },
        mission: {
          title: 'Mission & Vision',
          content: 'My mission is to advance the field of artificial intelligence through innovative research while fostering the next generation of AI researchers. I believe in making AI accessible, explainable, and beneficial for all.'
        },
        highlights: {
          title: 'Career Highlights'
        },
        philosophy: {
          title: 'Research Philosophy',
          content: '"The true measure of AI success is not in the complexity of algorithms, but in their ability to solve real problems and improve human lives while remaining transparent and trustworthy."'
        }
      },

      // Career Timeline Section
      careerTimeline: {
        title: 'Career Journey',
        subtitle: 'An interactive timeline showcasing my professional journey, educational milestones, and key achievements in research and technology'
      },

      // Professional Experience Section
      professionalExperience: {
        title: 'Professional Experience',
        subtitle: 'A comprehensive overview of my career journey across academia, research, and industry'
      },

      // Editorial Roles Section
      editorialRoles: {
        title: 'Editorial & Review Roles',
        subtitle: 'Contributing to the academic community through peer review and editorial responsibilities'
      },

      // Leadership Section
      leadership: {
        title: 'Leadership & Management',
        subtitle: 'Leading teams, organizations, and initiatives to drive innovation and excellence'
      },

      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        retry: 'Retry',
        close: 'Close',
        open: 'Open',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        download: 'Download',
        share: 'Share',
        more: 'More',
        less: 'Less',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        date: 'Date',
        time: 'Time',
        location: 'Location'
      },

      // Time and Date
      time: {
        formats: {
          date: 'MM/DD/YYYY',
          time: 'h:mm A',
          datetime: 'MM/DD/YYYY h:mm A'
        },
        zones: {
          local: 'Local Time',
          utc: 'UTC',
          et: 'Eastern Time',
          pt: 'Pacific Time',
          gmt: 'GMT'
        }
      },

      // Currency
      currency: {
        usd: 'USD',
        eur: 'EUR',
        etb: 'ETB',
        gbp: 'GBP'
      }
    }
  },

  am: {
    translation: {
      // Navigation (Amharic)
      nav: {
        home: 'መነሻ',
        about: 'ስለኔ',
        research: 'ምርምር',
        publications: 'ህትመቶች',
        projects: 'ፕሮጀክቶች',
        blog: 'ብሎግ',
        teaching: 'ማስተማር',
        events: 'ዝግጅቶች',
        contact: 'ያግኙኝ',
        analytics: 'ትንታኔ',
        media: 'ሚዲያ እና አቀራረቦች',
        networking: 'ኔትወርኪንግ'
      },

      // Hero Section (Amharic)
      hero: {
        greeting: 'ሰላም፣ እኔ',
        name: 'ዶ/ር ዳንኤል መሳፍንት',
        titles: {
          researcher: 'የሰው ሰራሽ ዘይቤ ተመራማሪ',
          professor: 'ረዳት ፕሮፌሰር',
          coordinator: 'የቴክኖሎጂ ሽግግር አስተባባሪ',
          expert: 'የእይታ-ቋንቋ ባለሙያ',
          specialist: 'የጥልቅ ትምህርት ስፔሻሊስት'
        },
        description: {
          main: 'ከ5 ዓመት በላይ ልምድ ያለው፣ በእይታ-ቋንቋ ትራንስፎርመሮች ላይ የተካነ እና ለውጥ ያመጣ ፕሮጀክቶችን የሚመራ ተለዋዋጭ እና ውጤታማ የሰው ሰራሽ ዘይቤ ተመራማሪ።',
          secondary: 'ውስብስብ ችግሮችን በመመርመር፣ ፈጠራ መፍትሄዎችን በማቅረብ እና የትብብር የቡድን አካባቢዎችን በማሳደግ የተረጋገጠ ታሪክ።'
        },
        buttons: {
          viewCV: 'የእኔን ሲቪ ይመልከቱ',
          contact: 'ያግኙኝ'
        }
      },

      // About Section (Amharic)
      about: {
        title: 'ስለኔ',
        subtitle: 'ግብርናን በፈጠራ ቴክኖሎጂ ለመለወት የተሰጠ ተጓዳኝ የሰው ሰራሽ ዘይቤ ተመራማሪ',
        background: {
          title: 'ዳራ',
          content: 'በሰው ሰራሽ ዘይቤ እና በኮምፒውተር እይታ ላይ ከ5 ዓመት በላይ ልምድ ያለኝ፣ ለግብርና ችግሮች ዘመናዊ መፍትሄዎችን በማዘጋጀት ላይ እተካለሁ። ስራዬ በእይታ-ቋንቋ ትራንስፎርመሮች እና በትክክለኛ ግብርና ላይ ባለው አተገባበር ላይ ያተኩራል።'
        },
        expertise: {
          title: 'ብቃት',
          areas: {
            ai: 'ሰው ሰራሽ ዘይቤ',
            cv: 'የኮምፒውተር እይታ',
            ml: 'የማሽን ትምህርት',
            agriculture: 'የግብርና ቴክኖሎጂ',
            research: 'ምርምር እና ልማት'
          }
        },
        mission: {
          title: 'ተልእኮ',
          content: 'በላቀ የሰው ሰራሽ ዘይቤ ምርምር እና በተግባራዊ የግብርና አተገባበሮች መካከል ያለውን ክፍተት ለመሙላት፣ ቴክኖሎጂን በዓለም ዙሪያ ላሉ ገበሬዎች ተደራሽ ማድረግ እና ለዘላቂ የምግብ ዋስትና አስተዋፅኦ ማድረግ።'
        },
        cards: {
          journalReviewer: {
            title: 'የጆርናል ገምጋሚ',
            description: 'ACM, BMJ Public Health, Journal of Big Data'
          },
          curriculumDeveloper: {
            title: 'የትምህርት ሥርዓተ-ትምህርት ገንቢ',
            description: 'የሰው ሰራሽ ዘይቤ ስርዓቶች እና የትምህርት ፕሮግራም ዲዛይን'
          },
          skillsRadar: 'የክህሎት ራዳር',
          collaborate: {
            title: 'እንተባበር',
            description: 'በሰው ሰራሽ ዘይቤ ምርምር ትብብር ወይም በአካዳሚክ አጋርነት ፍላጎት አለዎት? ሁልጊዜ ፈጠራ ፕሮጀክቶችን እና እድሎችን ለመወያየት ክፍት ነኝ።',
            button: 'ያግኙኝ'
          },
          researchImpact: 'የምርምር ተፅእኖ',
          researchJourney: 'የምርምር ጉዞ'
        }
      },

      // Research Section (Amharic)
      research: {
        title: 'የምርምር ፍላጎቶች',
        subtitle: 'በፈጠራ ምርምር እና በተግባራዊ አተገባበሮች የሰው ሰራሽ ዘይቤ ድንበሮችን መመርመር',
        areas: {
          llm: {
            title: 'ትላልቅ የቋንቋ ሞዴሎች (LLMs)',
            description: 'በትራንስፎርመር አርክቴክቸሮች፣ በጥሩ ማስተካከያ ዘዴዎች እና ለባለብዙ ቋንቋ አተገባበሮች በቀልጣፋ ስልጠና ቴክኒኮች ላይ የላቀ ምርምር።'
          },
          visionLanguage: {
            title: 'የእይታ-ቋንቋ ትራንስፎርመሮች',
            description: 'በእይታ እና በጽሁፍ ዓለማት ውስጥ ይዘትን የሚረዱ እና የሚያመነጩ ባለብዙ ሞዳል የሰው ሰራሽ ዘይቤ ስርዓቶችን መመርመር።'
          },
          explainableAI: {
            title: 'ሊብራራ የሚችል ሰው ሰራሽ ዘይቤ (XAI)',
            description: 'ለወሳኝ አተገባበሮች ግልጽ የውሳኔ አሰጣጥ ሂደቶችን የሚሰጡ ሊተረጎሙ የሚችሉ የሰው ሰራሽ ዘይቤ ስርዓቶችን ማዘጋጀት።'
          },
          adversarialRobustness: {
            title: 'የተቃዋሚ ጥንካሬ',
            description: 'ከተቃዋሚ ጥቃቶች ላይ የሰው ሰራሽ ዘይቤ ሞዴል ደህንነትን ማሻሻል እና በእውነተኛ ዓለም ሁኔታዎች ውስጥ የሞዴል አስተማማኝነትን ማሻሻል።'
          },
          printing3D: {
            title: 'ባለ3 ገጽታ ህትመት እና የሰው ሰራሽ ዘይቤ የሚመራ የቁሳቁስ ሳይንስ',
            description: 'ለፈጠራ ባለ3 ገጽታ ህትመት አተገባበሮች እና ለብልህ ቁሳቁስ ዲዛይን የሰው ሰራሽ ዘይቤን ከቁሳቁስ ሳይንስ ጋር ማዋሃድ።'
          },
          healthcare: {
            title: 'ለጤና አጠባበቅ የሰው ሰራሽ ዘይቤ',
            description: 'ከመመርመሪያ ስርዓቶች እስከ የሕክምና ማመቻቸት ድረስ የጤና አጠባበቅ ተግዳሮቶችን ለመፍታት የሰው ሰራሽ ዘይቤ ቴክኖሎጂዎችን መተግበር።'
          }
        },
        timeline: {
          title: 'የምርምር ዝግመተ ለውጥ የጊዜ መስመር'
        },
        collaborations: {
          title: 'የምርምር ትብብሮች',
          interested: 'በትብብር ፍላጎት አለዎት?',
          description: 'ሁልጊዜ በዘመናዊ የሰው ሰራሽ ዘይቤ ምርምር ላይ ለመተባበር እድሎችን እፈልጋለሁ። ተመራማሪ፣ የኢንዱስትሪ አጋር ወይም ተማሪ ቢሆኑ፣ እንዴት አብረን መስራት እንደምንችል እንመርምር።',
          viewPublications: 'ህትመቶችን ይመልከቱ',
          contactMe: 'ያግኙኝ'
        }
      },

      // Common (Amharic)
      common: {
        loading: 'በመጫን ላይ...',
        error: 'ስህተት',
        retry: 'እንደገና ሞክር',
        close: 'ዝጋ',
        open: 'ክፈት',
        save: 'አስቀምጥ',
        cancel: 'ሰርዝ',
        confirm: 'አረጋግጥ',
        delete: 'ሰርዝ',
        edit: 'አርትዕ',
        view: 'ይመልከቱ',
        download: 'አውርድ',
        share: 'አጋራ',
        more: 'ተጨማሪ',
        less: 'ያነሰ',
        next: 'ቀጣይ',
        previous: 'ቀዳሚ',
        search: 'ፈልግ',
        filter: 'ማጣሪያ',
        sort: 'ደርድር',
        date: 'ቀን',
        time: 'ሰዓት',
        location: 'አካባቢ'
      },

      // Time and Date (Amharic)
      time: {
        formats: {
          date: 'DD/MM/YYYY',
          time: 'HH:mm',
          datetime: 'DD/MM/YYYY HH:mm'
        },
        zones: {
          local: 'የአካባቢ ሰዓት',
          utc: 'UTC',
          et: 'የምስራቅ ሰዓት',
          pt: 'የፓሲፊክ ሰዓት',
          gmt: 'GMT'
        }
      },

      // Currency (Amharic)
      currency: {
        usd: 'ዶላር',
        eur: 'ዩሮ',
        etb: 'ብር',
        gbp: 'ፓውንድ'
      },

      // ChatBot Section (Amharic)
      chatbot: {
        title: 'የሰው ሰራሽ ዘይቤ ረዳት',
        subtitle: 'ስለ ዶ/ር ዳንኤል ይጠይቁኝ',
        welcome: 'ሰላም! እኔ የዶ/ር ዳንኤል የሰው ሰራሽ ዘይቤ ረዳት ነኝ። ስለ ምርምሩ፣ ህትመቶቹ እና የትብብር እድሎች ለማወቅ ልረዳዎት እችላለሁ። ዛሬ እንዴት ልረዳዎት?',
        placeholder: 'መልእክትዎን ይተይቡ...',
        quickReplies: {
          publications: 'ህትመቶችን አሳይ',
          research: 'የምርምር ዘርፎች',
          contact: 'የመገናኛ መረጃ',
          cv: 'የእኔን ሲቪ ይመልከቱ'
        },
        typing: 'AI እየተየበ ነው...',
        askAnything: 'ማንኛውንም ይጠይቁኝ',
        responses: {
          greetings: [
            'ሰላም! እኔ የዶ/ር ዳንኤል የሰው ሰራሽ ዘይቤ ረዳት ነኝ። ስለ ምርምሩ እና ስራው ለማወቅ እዚህ ነኝ። ምን ማወቅ ይፈልጋሉ?',
            'ሰላም! ለመገናኘት ደስ ይላል! ስለ ዶ/ር ዳንኤል ምርምር፣ ህትመቶች እና እንዴት ማግኘት እንደሚችሉ ሁሉንም ልነግርዎት እችላለሁ። ምን ይፈልጋሉ?',
            'እንኳን ደህና መጡ! የዶ/ር ዳንኤልን በሰው ሰራሽ ዘይቤ እና በማሽን ትምህርት ስራ እንዲያገኙ ለመርዳት ደስተኛ ነኝ። የትኛው ዘርፍ ይፈልጋሉ?'
          ],
          thanks: [
            'በጣም እንኳን ደህና መጡ! ስለ ዶ/ር ዳንኤል ስራ ሌላ ማወቅ የሚፈልጉት ነገር አለ?',
            'ለመርዳት ደስተኛ ነኝ! ስለ ምርምሩ ወይም እንዴት ማግኘት እንደሚችሉ ሌላ ማንኛውንም ይጠይቁኝ።',
            'ደስታዬ ነው! ስለ ዶ/ር ዳንኤል ብቃት ተጨማሪ መረጃ በሚፈልጉበት ጊዜ እዚህ ነኝ።'
          ],
          goodbye: 'ስለ ዶ/ር ዳንኤል ስራ ፍላጎትዎ እናመሰግናለን! ተጨማሪ ጥያቄዎች ካሉዎት በማንኛውም ጊዜ ያግኙን። መልካም ቀን ይሁንልዎት!',
          unclear: 'ትክክል እንደተረዳሁዎት ማረጋገጥ እፈልጋለሁ። ስለ ዶ/ር ዳንኤል {topic} እየጠየቁ ነው? ዝርዝር መረጃ ልሰጥዎት እችላለሁ:\n\n• በሰው ሰራሽ ዘይቤ እና በማሽን ትምህርት ምርምሩ\n• ህትመቶች እና አካዳሚክ ስራዎች\n• እንዴት ማግኘት ወይም መተባበር እንደሚችሉ\n• የማስተማር እና የክትትል ልምዱ\n\nየትኛው ዘርፍ በጣም እንደሚፈልጉ ማብራራት ይችላሉ?'
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
          healthcareAI: 'የጤና አጠባበቅ AI',
          visionLanguageModels: 'የእይታ-ቋንቋ ሞዴሎች',
          currentProjects: 'የአሁን ፕሮጀክቶች',
          sendEmail: 'ኢሜይል ላክ',
          scheduleMeeting: 'ስብሰባ ያዘጋጁ',
          linkedinProfile: 'LinkedIn መገለጫ',
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
    }
  },

  fr: {
    translation: {
      // Navigation (French)
      nav: {
        home: 'Accueil',
        about: 'À propos',
        research: 'Recherche',
        publications: 'Publications',
        projects: 'Projets',
        blog: 'Blog',
        teaching: 'Enseignement',
        events: 'Événements',
        contact: 'Contact',
        analytics: 'Analytique',
        media: 'Médias et Présentations',
        networking: 'Réseautage'
      },

      // Hero Section (French)
      hero: {
        greeting: 'BONJOUR, JE SUIS',
        name: 'Dr. Daniel Mesafint',
        titles: {
          researcher: 'Chercheur en IA',
          professor: 'Professeur Assistant',
          coordinator: 'Coordinateur de Transfert Technologique',
          expert: 'Expert Vision-Langage',
          specialist: 'Spécialiste en Apprentissage Profond'
        },
        description: {
          main: 'Chercheur en IA dynamique et axé sur les résultats avec plus de 5 ans d\'expérience spécialisé dans les Transformateurs Vision-Langage et dirigeant des projets transformateurs.',
          secondary: 'Historique prouvé de diagnostic de défis complexes, de livraison de solutions innovantes et de promotion d\'environnements d\'équipe collaboratifs.'
        },
        buttons: {
          viewCV: 'Voir Mon CV',
          contact: 'Me Contacter'
        }
      },

      // Common (French)
      common: {
        loading: 'Chargement...',
        error: 'Erreur',
        retry: 'Réessayer',
        close: 'Fermer',
        open: 'Ouvrir',
        save: 'Enregistrer',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        delete: 'Supprimer',
        edit: 'Modifier',
        view: 'Voir',
        download: 'Télécharger',
        share: 'Partager',
        more: 'Plus',
        less: 'Moins',
        next: 'Suivant',
        previous: 'Précédent',
        search: 'Rechercher',
        filter: 'Filtrer',
        sort: 'Trier',
        date: 'Date',
        time: 'Heure',
        location: 'Lieu'
      }
    }
  },

  or: {
    translation: {
      // Navigation (Oromifa/Oromo)
      nav: {
        home: 'Mana',
        about: 'Waaʼee Koo',
        research: 'Qorannoo',
        publications: 'Maxxansaa',
        projects: 'Pirojektii',
        blog: 'Biloogii',
        teaching: 'Barsiisuu',
        events: 'Taateewwan',
        contact: 'Na Quunnamaa',
        analytics: 'Xiinxala',
        media: 'Miidiyaa fi Dhiheessaa',
        networking: 'Networkii'
      },

      // Hero Section (Oromifa/Oromo)
      hero: {
        greeting: 'NAGAA, ANI',
        name: 'Dr. Daaniʼel Masaafint',
        titles: {
          researcher: 'Qorattaa AI',
          professor: 'Proofeesara Gargaaraa',
          coordinator: 'Qindoomina Dabarsa Teeknooloojii',
          expert: 'Ogeessa Mul\'ata-Afaanii',
          specialist: 'Addaataa Barumsaa Gadi Fagoo'
        },
        description: {
          main: 'Qorattaan AI kan sochii qabu fi bu\'aa irratti xiyyeeffate kan waggaa 5 ol muuxannoo qabu, Vision-Language Transformers irratti addaan baafamee fi pirojektii jijjiirraa geggeessuu.',
          secondary: 'Seenaa mirkaneeffame kan rakkoolee walxaxaa qoruu, furmaata kalaqaa kennuu fi naannoo garee tumsa guddisuu.'
        },
        buttons: {
          viewCV: 'CV Koo Ilaali',
          contact: 'Na Quunnamaa'
        }
      },

      // About Section (Oromifa/Oromo)
      about: {
        title: 'Waaʼee Koo',
        subtitle: 'Qorattaan AI kan qabsoo qabu kan qonnaa teeknooloojii kalaqaan jijjiiruuf of kennee',
        background: {
          title: 'Duubaa',
          content: 'Artificial Intelligence fi computer vision irratti waggaa 5 ol muuxannoo qabuu, rakkoolee qonnaa furmaata ammayyaa qopheessuutti addaan baafameera. Hojiin koo Vision-Language Transformers fi itti fayyadama qonna sirrii irratti xiyyeeffata.'
        },
        expertise: {
          title: 'Dandeettii',
          areas: {
            ai: 'Artificial Intelligence',
            cv: 'Computer Vision',
            ml: 'Machine Learning',
            agriculture: 'Teeknooloojii Qonnaa',
            research: 'Qorannoo fi Misooma'
          }
        },
        mission: {
          title: 'Ergaa',
          content: 'Qorannoo AI olaanaa fi itti fayyadama qonnaa qabatamaa gidduu jiru hanqina guutuuf, teeknooloojii qonnaan bultoota addunyaa hundaaf dhaqqabaa gochuu fi nageenya nyaataa itti fufiinsa qabuuf gumaacha gochuu.'
        }
      },

      // Research Section (Oromifa/Oromo)
      research: {
        title: 'Naannoowwan Qorannoo',
        subtitle: 'Daangaa AI fi computer vision itti fayyadama qonnaa keessatti qoruu',
        areas: {
          visionLanguage: {
            title: 'Moodeelota Mul\'ata-Afaanii',
            description: 'Sirna AI multimodal kan odeeffannoo mul\'ataa fi barreeffamaa xiinxaluuf qorannoo qonnaa'
          },
          cropMonitoring: {
            title: 'Sirna Hordoffii Midhaan',
            description: 'Tooftaalee computer vision olaanaa fayyaa midhaan yeroo dhugaa madaaluu fi tilmaama oomishaa'
          },
          precisionAg: {
            title: 'Qonna Sirrii',
            description: 'Furmaata IoT walitti makame bulchiinsa qabeenya gaarii fi muuxannoo qonnaa itti fufiinsa qabu'
          },
          diseaseDetection: {
            title: 'Adda Baasuu Dhukkubaa',
            description: 'Sirna adda baasuu dafaa dhukkuba biqiltuu AI powered xiinxala suuraa fi machine learning fayyadamuun'
          }
        }
      },

      // Common (Oromifa/Oromo)
      common: {
        loading: 'Fe\'aa jira...',
        error: 'Dogoggora',
        retry: 'Irra Deebi\'ii Yaali',
        close: 'Cufi',
        open: 'Bani',
        save: 'Olkaa\'i',
        cancel: 'Dhiisi',
        confirm: 'Mirkaneessi',
        delete: 'Haqi',
        edit: 'Gulaalii',
        view: 'Ilaali',
        download: 'Buufadhu',
        share: 'Qoodaa',
        more: 'Dabalataa',
        less: 'Xiqqaa',
        next: 'Itti Aanuu',
        previous: 'Dura',
        search: 'Barbaadi',
        filter: 'Calaluu',
        sort: 'Tartiibii',
        date: 'Guyyaa',
        time: 'Sa\'aatii',
        location: 'Bakka'
      },

      // Time and Date (Oromifa/Oromo)
      time: {
        formats: {
          date: 'DD/MM/YYYY',
          time: 'HH:mm',
          datetime: 'DD/MM/YYYY HH:mm'
        },
        zones: {
          local: 'Sa\'aatii Naannoo',
          utc: 'UTC',
          et: 'Sa\'aatii Bahaatii',
          pt: 'Sa\'aatii Pacific',
          gmt: 'GMT'
        }
      },

      // Currency (Oromifa/Oromo)
      currency: {
        usd: 'Doolara',
        eur: 'Yuuroo',
        etb: 'Birrii',
        gbp: 'Paawundii'
      }
    }
  },

  ti: {
    translation: {
      // Navigation (Tigrigna)
      nav: {
        home: 'ገዛ',
        about: 'ብዛዕባይ',
        research: 'ምርምር',
        publications: 'ህትመታት',
        projects: 'ፕሮጀክታት',
        blog: 'ብሎግ',
        teaching: 'ምምሃር',
        events: 'ፍጻመታት',
        contact: 'ርኸቡኒ',
        analytics: 'ትንተና',
        media: 'ሚድያን ኣቀራርባን',
        networking: 'ኔትወርኪንግ'
      },

      // Hero Section (Tigrigna)
      hero: {
        greeting: 'ሰላም፣ ኣነ',
        name: 'ዶ/ር ዳንኤል መሳፍንት',
        titles: {
          researcher: 'ተመራማሪ AI',
          professor: 'ረዳት ፕሮፌሰር',
          coordinator: 'ኣስተባባሪ ምስግጋር ቴክኖሎጂ',
          expert: 'ኣዋቂ ራእይ-ቋንቋ',
          specialist: 'ስፔሻሊስት ዓሚቕ ትምህርቲ'
        },
        description: {
          main: 'ተለዋዋጢን ውጽኢት ዝኸተልን ተመራማሪ AI ዝኾነ፣ ልዕሊ 5 ዓመት ተመኩሮ ዘለዎ፣ ኣብ Vision-Language Transformers ዝተፈልየን ለውጢ ዘምጽእ ፕሮጀክታት ዝመርሕን።',
          secondary: 'ዝተረጋገጸ ታሪኽ ዘለዎ ዝተሓላለኹ ብድሆታት ምምርማር፣ ፈጠራዊ ፍታሕ ምቕራብን ናይ ምትሕብባር ጉጅለ ሃዋሁው ምዕባይን።'
        },
        buttons: {
          viewCV: 'CV ይ ርአ',
          contact: 'ርኸቡኒ'
        }
      },

      // About Section (Tigrigna)
      about: {
        title: 'ብዛዕባይ',
        subtitle: 'ንሕርሻ ብፈጠራዊ ቴክኖሎጂ ንምቕያር ዝተወፈየ ተመራማሪ AI',
        background: {
          title: 'ድሕረ ባይታ',
          content: 'ኣብ artificial intelligence ከምኡ\'ውን computer vision ልዕሊ 5 ዓመት ተመኩሮ ዘለኒ፣ ንብድሆታት ሕርሻ ዘመናዊ ፍታሕ ኣብ ምዳላው ዝተፈልየ እየ። ስራሐይ ኣብ Vision-Language Transformers ከምኡ\'ውን ኣብ ትኽክለኛ ሕርሻ ዘለዎ ኣተገባብራ ይትኩር።'
        },
        expertise: {
          title: 'ብቕዓት',
          areas: {
            ai: 'Artificial Intelligence',
            cv: 'Computer Vision',
            ml: 'Machine Learning',
            agriculture: 'ቴክኖሎጂ ሕርሻ',
            research: 'ምርምርን ምዕባለን'
          }
        },
        mission: {
          title: 'ተልእኮ',
          content: 'ኣብ መንጎ ላዕለዋይ ምርምር AI ከምኡ\'ውን ተግባራዊ ኣተገባብራ ሕርሻ ዘሎ ክፍተት ንምምላእ፣ ቴክኖሎጂ ንኣካፋሊ ዓለም ተበጻሒ ምግባርን ንዘላቒ ድሕንነት መግቢ ኣበርክቶ ምግባርን።'
        }
      },

      // Research Section (Tigrigna)
      research: {
        title: 'ዓውድታት ምርምር',
        subtitle: 'ዳንጋታት AI ከምኡ\'ውን computer vision ኣብ ኣተገባብራ ሕርሻ ምምርማር',
        areas: {
          visionLanguage: {
            title: 'ሞዴላት ራእይ-ቋንቋ',
            description: 'ንትንተና ሕርሻ ክልተ ዓይነት ሓበሬታ ራእይን ጽሑፍን ዝርድእ ስርዓት AI multimodal ምምዕባል'
          },
          cropMonitoring: {
            title: 'ስርዓታት ምክትታል ዝራእቲ',
            description: 'ንሓቀኛ ግዜ ምግምጋም ጥዕና ዝራእቲን ትንበያ ምርትን ላዕለዋይ ሜላታት computer vision'
          },
          precisionAg: {
            title: 'ትኽክለኛ ሕርሻ',
            description: 'ንዝተመሓየሸ ምሕደራ ጸጋታትን ዘላቒ ልምዳት ሕርሻን ዝተዋሃሃዱ ፍታሓት IoT'
          },
          diseaseDetection: {
            title: 'ምፍላጥ ሕማም',
            description: 'ንሕማማት ተኽሊ ብምትንታን ምስልን machine learningን ዝጥቀም AI powered ቀዳማይ ምፍላጥ ስርዓታት'
          }
        }
      },

      // Common (Tigrigna)
      common: {
        loading: 'ይጽዕን ኣሎ...',
        error: 'ጌጋ',
        retry: 'ደጊምካ ፈትን',
        close: 'ዓጽዎ',
        open: 'ክፈቶ',
        save: 'ዓቅቦ',
        cancel: 'ሰርዞ',
        confirm: 'ኣረጋግጾ',
        delete: 'ሰርዞ',
        edit: 'ኣርትዖ',
        view: 'ርአ',
        download: 'ኣውርዶ',
        share: 'ኣካፍሎ',
        more: 'ተወሳኺ',
        less: 'ውሑድ',
        next: 'ቀጻሊ',
        previous: 'ቀዳማይ',
        search: 'ደልዮ',
        filter: 'ፍልተር',
        sort: 'ስርዖ',
        date: 'ዕለት',
        time: 'ሰዓት',
        location: 'ቦታ'
      },

      // Time and Date (Tigrigna)
      time: {
        formats: {
          date: 'DD/MM/YYYY',
          time: 'HH:mm',
          datetime: 'DD/MM/YYYY HH:mm'
        },
        zones: {
          local: 'ናይ ከባቢ ሰዓት',
          utc: 'UTC',
          et: 'ናይ ምብራቕ ሰዓት',
          pt: 'ናይ ፓሲፊክ ሰዓት',
          gmt: 'GMT'
        }
      },

      // Currency (Tigrigna)
      currency: {
        usd: 'ዶላር',
        eur: 'ዩሮ',
        etb: 'ብር',
        gbp: 'ፓውንድ'
      }
    }
  }
};

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;