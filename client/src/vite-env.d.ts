/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SOURCES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}