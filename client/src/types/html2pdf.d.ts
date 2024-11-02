declare module 'html2pdf.js' {
  export interface Html2PdfOptions {
    margin?:
      | number
      | { top?: number; right?: number; bottom?: number; left?: number };
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: {
      scale?: number;
      scrollX?: number;
      scrollY?: number;
      useCORS?: boolean;
      logging?: boolean;
      allowTaint?: boolean;
    };
    jsPDF?: {
      unit?: 'pt' | 'mm' | 'in' | 'cm'; // Specify valid units
      format?: 'a4' | 'letter' | 'tabloid' | 'legal' | 'a3' | 'a5'; // Specify valid formats
      orientation?: 'portrait' | 'landscape'; // Specify valid orientations
    };
    pagebreak?: {
      mode?: 'avoid' | 'css' | 'legacy'; // Specify valid modes
      before?: string | string[];
      after?: string | string[];
    };
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement): Html2Pdf;
    save(): Promise<void>;
  }

  const html2pdf: {
    (): Html2Pdf;
    version: string; // Include any other properties you need
  };

  export default html2pdf;
}
