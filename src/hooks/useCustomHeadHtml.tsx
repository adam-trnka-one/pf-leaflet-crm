import { useEffect } from 'react';

const STORAGE_KEY = 'leaflet-custom-head-html';
const CUSTOM_HEAD_MARKER = 'data-custom-head-html';

export const useCustomHeadHtml = () => {
  useEffect(() => {
    const injectCustomHead = () => {
      // Remove any previously injected custom elements
      const existingCustomElements = document.querySelectorAll(`[${CUSTOM_HEAD_MARKER}]`);
      existingCustomElements.forEach(el => el.remove());

      const customHtml = localStorage.getItem(STORAGE_KEY);
      if (!customHtml || customHtml.trim() === '') {
        return;
      }

      try {
        // Create a temporary container to parse the HTML
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = customHtml;

        // Process each child element
        Array.from(tempContainer.children).forEach(child => {
          const element = child.cloneNode(true) as HTMLElement;
          element.setAttribute(CUSTOM_HEAD_MARKER, 'true');
          
          // Handle script tags specially - they need to be recreated to execute
          if (element.tagName === 'SCRIPT') {
            const script = document.createElement('script');
            script.setAttribute(CUSTOM_HEAD_MARKER, 'true');
            
            // Copy all attributes
            Array.from(element.attributes).forEach(attr => {
              script.setAttribute(attr.name, attr.value);
            });
            
            // Copy content
            script.textContent = element.textContent;
            
            document.head.appendChild(script);
          } else {
            document.head.appendChild(element);
          }
        });

        console.log('Custom HEAD HTML injected successfully');
      } catch (error) {
        console.error('Error injecting custom HEAD HTML:', error);
      }
    };

    injectCustomHead();

    // Listen for storage changes to update dynamically
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        injectCustomHead();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
};

export const getCustomHeadHtml = (): string => {
  return localStorage.getItem(STORAGE_KEY) || '';
};

export const setCustomHeadHtml = (html: string): void => {
  localStorage.setItem(STORAGE_KEY, html);
  // Dispatch storage event for same-tab updates
  window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY, newValue: html }));
};

export const resetCustomHeadHtml = (): void => {
  localStorage.setItem(STORAGE_KEY, '');
  // Dispatch storage event for same-tab updates
  window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY, newValue: '' }));
};
