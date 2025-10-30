import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PDFUpload } from '../PDFUpload';

describe('PDFUpload', () => {
  const mockOnFileUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload interface', () => {
    render(<PDFUpload onFileUpload={mockOnFileUpload} isLoading={false} />);
    
    expect(screen.getByText('Upload PDF to Sign')).toBeInTheDocument();
    expect(screen.getByText('Click here or drag and drop your PDF file')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(<PDFUpload onFileUpload={mockOnFileUpload} isLoading={true} />);
    
    expect(screen.getByText('Signing PDF...')).toBeInTheDocument();
    expect(screen.getByTestId('file-input')).toBeDisabled();
  });

  it('calls onFileUpload when file is selected', () => {
    render(<PDFUpload onFileUpload={mockOnFileUpload} isLoading={false} />);
    
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  it('accepts only PDF files', () => {
    render(<PDFUpload onFileUpload={mockOnFileUpload} isLoading={false} />);
    
    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toHaveAttribute('accept', '.pdf');
  });
});