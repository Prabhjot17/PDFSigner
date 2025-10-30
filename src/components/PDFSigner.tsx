import React, { useState } from 'react';
import { PDFUpload } from './PDFUpload';
import { PDFViewer } from './PDFViewer';
import { mockSignPDF } from '../services/_tests/mockSigningService';
import './PDFSigner.css';

export interface PDFSignerProps {
  onError?: (error: string) => void;
}

export const PDFSigner: React.FC<PDFSignerProps> = ({ onError }) => {
  const [pdfUrls, setPdfUrls] = useState<{ viewUrl: string; downloadUrl: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const urls = await mockSignPDF(file);
      setPdfUrls(urls);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign PDF';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPdfUrls(null);
  };

  return (
    <div className="pdf-signer">
      <h1 className="pdf-signer__title">PDF Signer</h1>
      {!pdfUrls ? (
        <PDFUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
      ) : (
        <PDFViewer viewUrl={pdfUrls.viewUrl} downloadUrl={pdfUrls.downloadUrl} onReset={handleReset} />
      )}
    </div>
  );
};