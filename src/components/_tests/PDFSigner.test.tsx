import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PDFSigner } from '../PDFSigner';
import { mockSignPDF } from '../../services/_tests/mockSigningService';


jest.mock('../../services/_tests/mockSigningService');

const mockMockSignPDF = mockSignPDF as jest.MockedFunction<typeof mockSignPDF>;

describe('PDFSigner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload component initially', () => {
    render(<PDFSigner />);
    
    expect(screen.getByText('PDF Signer')).toBeInTheDocument();
    expect(screen.getByText('Upload PDF to Sign')).toBeInTheDocument();
  });

  it('shows loading state during PDF signing', async () => {
    mockMockSignPDF.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ viewUrl: 'mock-view-url', downloadUrl: 'mock-download-url' }), 100)));
    
    render(<PDFSigner />);
    
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(screen.getByText('Signing PDF...')).toBeInTheDocument();
  });

  it('shows PDF viewer after successful signing', async () => {
    mockMockSignPDF.mockResolvedValue({ viewUrl: 'mock-view-url', downloadUrl: 'mock-download-url' });
    
    render(<PDFSigner />);
    
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('✅ PDF Successfully Signed')).toBeInTheDocument();
    });
  });

  it('calls onError when signing fails', async () => {
    const onError = jest.fn();
    mockMockSignPDF.mockRejectedValue(new Error('Signing failed'));
    
    render(<PDFSigner onError={onError} />);
    
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Signing failed');
    });
  });

  it('resets to upload view when reset button is clicked', async () => {
    mockMockSignPDF.mockResolvedValue({ viewUrl: 'mock-view-url', downloadUrl: 'mock-download-url' });
    
    render(<PDFSigner />);
    
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('reset-button'));
    
    expect(screen.getByText('Upload PDF to Sign')).toBeInTheDocument();
  });
});