declare module 'pdf-parse' {
  interface PDFParseOptions {
    max?: number;
    version?: string;
  }

  interface PDFParseResult {
    numpages: number;
    text: string;
    info: {
      [key: string]: any;
    };
    metadata: {
      [key: string]: any;
    };
    version: string;
  }

  function PDFParse(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFParseResult>;
  
  export = PDFParse;
} 