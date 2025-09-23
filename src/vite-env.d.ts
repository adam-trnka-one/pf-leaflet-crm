
/// <reference types="vite/client" />

declare global {
  interface Window {
    $productFruits?: any[];
    productFruits?: {
      scrV?: string;
      api?: {
        checklists?: {
          injectToElement: (checklistId: number, element: HTMLElement) => void;
        };
      };
    };
  }
}

export {};
