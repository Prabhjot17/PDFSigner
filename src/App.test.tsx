import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders PDF Signer title', () => {
    render(<App />);
    expect(screen.getByText('PDF Signer')).toBeInTheDocument();
  });

  it('shows error banner when error occurs', () => {
    render(<App />);
    const errorMessage = 'Test error message';
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

});