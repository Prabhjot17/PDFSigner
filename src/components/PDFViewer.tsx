import React from 'react';
import { getSignatureInfo } from '../services/_tests/mockSigningService';
import './PDFViewer.css';

export interface PDFViewerProps {
  viewUrl: string;
  downloadUrl: string;
  onReset: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ viewUrl, downloadUrl, onReset }) => {
  const signature = getSignatureInfo();
  
  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer__header">
        <h3>✅ PDF Successfully Signed</h3>
        <button 
          className="pdf-viewer__reset-btn" 
          onClick={onReset}
          data-testid="reset-button"
        >
          Upload New PDF
        </button>
      </div>
      
      <div className="pdf-viewer__container">
        <iframe
          src={viewUrl}
          className="pdf-viewer__iframe"
          title="Signed PDF"
          data-testid="pdf-iframe"
        />
        <div className="pdf-viewer__signature">
          <div className="signature-box">
            <div className="signature-title">📝 Digital Signature</div>
            <div className="signature-name">Prabhjot Singh</div>
            <div className="signature-date">{signature?.date || new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="pdf-viewer__actions">
        <a 
          href={downloadUrl} 
          download="signed-by-prabhjot-singh.pdf"
          className="pdf-viewer__download-btn"
          data-testid="download-button"
        >
          📥 Download Signed PDF
        </a>
      </div>
    </div>
  );
};