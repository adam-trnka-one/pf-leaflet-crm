
import { useEffect } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';

export const useProductFruits = () => {
  const { workspaceData } = useWorkspace();

  useEffect(() => {
    if (!workspaceData.workspaceCode || !workspaceData.username) {
      return; // Don't initialize if required fields are missing
    }

    // Remove existing ProductFruits script if it exists
    const existingScript = document.querySelector('script[data-productfruits-init]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create the initialization script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-productfruits-init', 'true');
    
    // Build props object from custom properties
    const props: Record<string, string> = {};
    workspaceData.customProperties.forEach((prop, index) => {
      if (prop.name && prop.value) {
        props[`prop${index + 1}`] = prop.value;
      }
    });

    // Generate sign-up date in required format (current date as example)
    const signUpDate = new Date().toISOString();

    const initData = {
      username: workspaceData.username,
      ...(workspaceData.email && { email: workspaceData.email }),
      ...(workspaceData.firstName && { firstname: workspaceData.firstName }),
      ...(workspaceData.lastName && { lastname: workspaceData.lastName }),
      signUpAt: signUpDate,
      ...(workspaceData.role && { role: workspaceData.role }),
      ...(Object.keys(props).length > 0 && { props })
    };

    script.innerHTML = `
      if (window.$productFruits) {
        window.$productFruits.push(['init', '${workspaceData.workspaceCode}', 'en', ${JSON.stringify(initData)}]);
      }
    `;

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-productfruits-init]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [workspaceData]);
};
