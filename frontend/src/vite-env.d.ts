/// <reference types="vite/client" /> 

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add more VITE_... vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
