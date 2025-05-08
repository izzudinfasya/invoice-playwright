import { chromium } from 'playwright';

export async function generatePDF(html) {
    const browser = await chromium.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm' },
        printBackground: true
    });

    await browser.close();
    return pdfBuffer;
}
