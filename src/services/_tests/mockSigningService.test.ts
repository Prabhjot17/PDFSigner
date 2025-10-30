import { mockSignPDF } from "./mockSigningService";

describe('mockSigningService', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    
    // Mock URL.createObjectURL for test environment
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('resolves with signed URLs for valid PDF file', async () => {
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    
    const promise = mockSignPDF(file);
    jest.advanceTimersByTime(2000);
    
    const result = await promise;
    expect(result).toHaveProperty('viewUrl');
    expect(result).toHaveProperty('downloadUrl');
    expect(result.viewUrl).toMatch(/^blob:/);
    expect(result.downloadUrl).toMatch(/^blob:/);
  });

  it('rejects for non-PDF files', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    await expect(mockSignPDF(file)).rejects.toThrow('Please upload a PDF file');
  });
});