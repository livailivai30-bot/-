interface ImportMetaEnv {
  readonly VITE_OCR_ENDPOINT?: string;
  readonly VITE_BARCODE_ENDPOINT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module '*.css';
