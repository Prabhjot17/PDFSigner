import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PDFViewer } from '../PDFViewer';

describe('PDFViewer', () => {
  const mockOnReset = jest.fn();
  const mockViewUrl = 'blob:mock-view-url';
  const mockDownloadUrl = 'blob:mock-download-url';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PDF viewer with success message', () => {
    render(<PDFViewer viewUrl={mockViewUrl} downloadUrl={mockDownloadUrl} onReset={mockOnReset} />);
    
    expect(screen.getByText('✅ PDF Successfully Signed')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-iframe')).toBeInTheDocument();
  });

  it('displays PDF in iframe with correct src', () => {
    render(<PDFViewer viewUrl={mockViewUrl} downloadUrl={mockDownloadUrl} onReset={mockOnReset} />);
    
    const iframe = screen.getByTestId('pdf-iframe');
    expect(iframe).toHaveAttribute('src', mockViewUrl);
  });

  it('calls onReset when reset button is clicked', () => {
    render(<PDFViewer viewUrl={mockViewUrl} downloadUrl={mockDownloadUrl} onReset={mockOnReset} />);
    
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it('provides download link with correct href', () => {
    render(<PDFViewer viewUrl={mockViewUrl} downloadUrl={mockDownloadUrl} onReset={mockOnReset} />);
    
    const downloadLink = screen.getByTestId('download-button');
    expect(downloadLink).toHaveAttribute('href', mockDownloadUrl);
    expect(downloadLink).toHaveAttribute('download', 'signed-by-prabhjot-singh.pdf');
  });
});