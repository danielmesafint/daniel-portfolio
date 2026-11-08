// Sections hidden from the live site until real content is supplied.
// Remove an id from this list to show the section again.
export const HIDDEN_SECTIONS = ['testimonials', 'news', 'gallery'];

// The student portal module is not part of this build, so links to /student
// would only reload the home page. Set to true once the portal is restored.
export const STUDENT_PORTAL_ENABLED = false;

export const isSectionVisible = (id) => !HIDDEN_SECTIONS.includes(id);
