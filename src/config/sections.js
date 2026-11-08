// Sections hidden from the live site. Add an id (e.g. 'testimonials') to hide it.
// Testimonials, News and Gallery currently hold SAMPLE content to be replaced.
export const HIDDEN_SECTIONS = [];

// The student portal module is not part of this build, so links to /student
// would only reload the home page. Set to true once the portal is restored.
export const STUDENT_PORTAL_ENABLED = false;

export const isSectionVisible = (id) => !HIDDEN_SECTIONS.includes(id);
