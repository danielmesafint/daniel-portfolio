// Global navigation utilities for all sections

// Initialize global navigation states
window.projectsNavigation = window.projectsNavigation || {
  activeTab: 'featured',
  setActiveTab: null,
  listeners: []
};

window.teachingNavigation = window.teachingNavigation || {
  activeTab: 'courses',
  setActiveTab: null,
  listeners: []
};

window.servicesNavigation = window.servicesNavigation || {
  activeTab: 'consulting',
  setActiveTab: null,
  listeners: []
};

window.resourcesNavigation = window.resourcesNavigation || {
  activeTab: 'course-materials',
  setActiveTab: null,
  listeners: []
};

// Global navigation functions
window.navigateToProjectTab = (tab) => {
  console.log('Global navigation: Setting project tab to:', tab);
  window.projectsNavigation.activeTab = tab;
  if (window.projectsNavigation.setActiveTab) {
    window.projectsNavigation.setActiveTab(tab);
  }
  // Notify all listeners
  window.projectsNavigation.listeners.forEach(listener => listener(tab));

  // Scroll to projects section
  setTimeout(() => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

window.navigateToTeachingTab = (tab) => {
  console.log('Global navigation: Setting teaching tab to:', tab);
  window.teachingNavigation.activeTab = tab;
  if (window.teachingNavigation.setActiveTab) {
    window.teachingNavigation.setActiveTab(tab);
  }
  // Notify all listeners
  window.teachingNavigation.listeners.forEach(listener => listener(tab));

  // Scroll to teaching section
  setTimeout(() => {
    const element = document.getElementById('teaching');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

window.navigateToServicesTab = (tab) => {
  console.log('Global navigation: Setting services tab to:', tab);
  window.servicesNavigation.activeTab = tab;
  if (window.servicesNavigation.setActiveTab) {
    window.servicesNavigation.setActiveTab(tab);
  }
  // Notify all listeners
  window.servicesNavigation.listeners.forEach(listener => listener(tab));

  // Scroll to services section
  setTimeout(() => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

window.navigateToResourcesTab = (tab) => {
  console.log('Global navigation: Setting resources tab to:', tab);
  window.resourcesNavigation.activeTab = tab;
  if (window.resourcesNavigation.setActiveTab) {
    window.resourcesNavigation.setActiveTab(tab);
  }
  // Notify all listeners
  window.resourcesNavigation.listeners.forEach(listener => listener(tab));

  // Scroll to resources section
  setTimeout(() => {
    const element = document.getElementById('resources');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

export default {
  navigateToProjectTab: window.navigateToProjectTab,
  navigateToTeachingTab: window.navigateToTeachingTab,
  navigateToServicesTab: window.navigateToServicesTab,
  navigateToResourcesTab: window.navigateToResourcesTab
};