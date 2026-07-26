import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

export async function exportToPDF(
  elementClass: string,
  fileName: string = 'نامه_اداری.pdf',
  onProgress?: (progress: number) => void
): Promise<boolean> {
  const elements = document.querySelectorAll(`.${elementClass}`);
  if (elements.length === 0) {
    console.error(`Elements .${elementClass} not found`);
    return false;
  }

  try {
    if (onProgress) onProgress(10);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      
      const imgData = await htmlToImage.toJpeg(el, {
        quality: 0.95,
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
        style: {
          transform: 'none',
        }
      });

      if (i > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
      if (onProgress) onProgress(10 + ((i + 1) / elements.length) * 80);
    }

    pdf.save(fileName);

    if (onProgress) onProgress(100);
    return true;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    return false;
  }
}

export function triggerPrint(): void {
  window.print();
}
