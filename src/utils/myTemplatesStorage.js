// Storage utility for My Templates (મારા ટેમ્પલેટ્સ)

const STORAGE_KEY = 'om_graphic_studio_my_templates';

export const getMyTemplates = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading My Templates from localStorage:', err);
    return [];
  }
};

export const saveMyTemplate = (template) => {
  try {
    const existing = getMyTemplates();
    const newTemplate = {
      ...template,
      id: template.id || `custom-tpl-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isCustom: true
    };
    
    // Check if updating existing or adding new
    const index = existing.findIndex(t => t.id === newTemplate.id);
    let updated;
    if (index >= 0) {
      updated = [...existing];
      updated[index] = newTemplate;
    } else {
      updated = [newTemplate, ...existing];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTemplate;
  } catch (err) {
    console.error('Error saving template to localStorage:', err);
    return null;
  }
};

export const deleteMyTemplate = (templateId) => {
  try {
    const existing = getMyTemplates();
    const updated = existing.filter(t => t.id !== templateId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting template from localStorage:', err);
    return [];
  }
};

export const isMyTemplate = (templateId) => {
  const templates = getMyTemplates();
  return templates.some(t => t.id === templateId);
};
