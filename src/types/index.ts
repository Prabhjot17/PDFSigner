export interface PDFFile {
    file: File;
    url: string;
  }
  
  export interface SignedPDF {
    originalName: string;
    signedUrl: string;
    signedAt: Date;
  }