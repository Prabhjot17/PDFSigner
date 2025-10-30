import React, { useRef } from 'react';
import './PDFUpload.css';

export interface PDFUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onFileUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pdf-upload">
      <div className="pdf-upload__dropzone" onClick={handleClick}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="pdf-upload__input"
          disabled={isLoading}
          data-testid="file-input"
        />
        <div className="pdf-upload__content">
          {isLoading ? (
            <div className="pdf-upload__loading">
              <div className="spinner"></div>
              <p>Signing PDF...</p>
            </div>
          ) : (
            <>
              <div className="pdf-upload__icon">📄</div>
              <h3>Upload PDF to Sign</h3>
              <p>Click here or drag and drop your PDF file</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};