import { PDFDocument, rgb } from 'pdf-lib';

export const mockSignPDF = async (file: File): Promise<{ viewUrl: string; downloadUrl: string }> => {
  if (!file.type.includes('pdf')) {
    throw new Error('Please upload a PDF file');
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    // Handle test environment where arrayBuffer might not exist
    const arrayBuffer = file.arrayBuffer ? await file.arrayBuffer() : new ArrayBuffer(0);
    // Create a simple PDF if arrayBuffer is empty (test environment)
    const pdfDoc = arrayBuffer.byteLength > 0 ? 
      await PDFDocument.load(arrayBuffer) : 
      await PDFDocument.create();
    
    let pages = pdfDoc.getPages();
    if (pages.length === 0) {
      pdfDoc.addPage();
      pages = pdfDoc.getPages();
    }
    const lastPage = pages[pages.length - 1];
    const { width, height } = lastPage.getSize();
    
    const signatureInfo = getSignatureInfo();
    
    // Add signature box background (bottom right)
    lastPage.drawRectangle({
      x: width - 220,
      y: 20,
      width: 200,
      height: 80,
      borderColor: rgb(0, 0.47, 1),
      borderWidth: 2,
      color: rgb(0.95, 0.95, 0.95),
    });
    
    // Add signature text (bottom right)
    lastPage.drawText('DIGITALLY SIGNED', {
      x: width - 210,
      y: 80,
      size: 14,
      color: rgb(0, 0.47, 1),
    });
    
    lastPage.drawText(`Signed by: ${signatureInfo.signer}`, {
      x: width - 210,
      y: 60,
      size: 11,
      color: rgb(0, 0, 0),
    });
    
    lastPage.drawText(`Date: ${signatureInfo.date}`, {
      x: width - 210,
      y: 40,
      size: 10,
      color: rgb(0.3, 0.3, 0.3),
    });
    
    const pdfBytes = await pdfDoc.save();
    const signedBlob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const signedUrl = URL.createObjectURL(signedBlob);
    
    // Return original PDF for viewing and signed PDF for download
    const originalUrl = URL.createObjectURL(file);
    return { viewUrl: originalUrl, downloadUrl: signedUrl };
  } catch (error) {
    console.error('PDF signing error:', error);
    throw new Error('Failed to sign PDF');
  }
};

export const getSignatureInfo = () => {
  return {
    signer: 'Prabhjot Singh',
    date: new Date().toLocaleString(),
    hash: Math.random().toString(36).substring(2, 15)
  };
};