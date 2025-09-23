
/// <reference types="vite/client" />

declare global {
  interface Window {
    $productFruits?: any[];
    productFruits?: {
      api?: {
        checklists?: {
          injectToElement: (checklistId: number, element: HTMLElement) => void;
        };
      };
    };
  }
}

export {};
