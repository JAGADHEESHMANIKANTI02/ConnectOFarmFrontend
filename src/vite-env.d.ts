/// <reference types="vite/client" />

// CSS module declarations — allows importing CSS files without TS errors
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

// SVG asset imports
declare module '*.svg' {
    const src: string;
    export default src;
}

// Image asset imports
declare module '*.png' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.webp' { const src: string; export default src; }
