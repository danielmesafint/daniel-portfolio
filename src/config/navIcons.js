// Icons for the top menu and its sub-menus (previously used by the side menu).
import {
  Home, User, Search, FileText, Code, GraduationCap, Briefcase, FolderOpen, Mail,
  TrendingUp, Calendar, BookOpen, Award, Camera, Users, Star, BarChart3,
  Presentation, Lock, Sheet, Database, Upload, Shield, Download, LayoutGrid
} from 'lucide-react';

export const NAV_ICONS = {
  // Main menu
  Home: Home,
  About: User,
  Research: Search,
  Publications: FileText,
  Projects: Code,
  Teaching: GraduationCap,
  Services: Briefcase,
  Resources: FolderOpen,
  Contact: Mail,
  // About
  Biography: User,
  'Skills & Expertise': TrendingUp,
  'Career Timeline': Calendar,
  'Professional Experience': Briefcase,
  'Editorial Roles': BookOpen,
  Leadership: Award,
  Gallery: Camera,
  // Research
  'Research Interests': Search,
  'Research Projects': Code,
  'Research Funding': Award,
  'Research Collaborations': Users,
  'Research Timeline': Calendar,
  // Publications
  'Journal Papers': FileText,
  'Conference Presentations': Award,
  'Book Chapters': BookOpen,
  'Publication Search': Search,
  'Citation Export': BarChart3,
  // Projects
  'Featured Projects': Star,
  'All Projects': Code,
  'Software Tools': TrendingUp,
  Demos: BarChart3,
  // Teaching
  Courses: BookOpen,
  'Teaching Experience': GraduationCap,
  Supervision: Users,
  Workshops: TrendingUp,
  Achievements: Award,
  // Services
  Consulting: Briefcase,
  'AI/ML Model Dev': TrendingUp,
  Editing: FileText,
  Advisory: Users,
  'Data Analysis': BarChart3,
  // Resources
  'Course Materials (PDF, slides)': Presentation,
  'Assignments (private access)': Lock,
  'Lab Materials': Sheet,
  'Thesis Templates': FileText,
  'Article Templates': BookOpen,
  Datasets: Database,
  'AI Project Code': Code,
  'Student Uploads': Upload,
  'Ethics Documents': Shield,
  'Blog & Articles': BookOpen,
  'Downloads & Tools': Download
};

export const iconFor = (name) => NAV_ICONS[name] || LayoutGrid;
