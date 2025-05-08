import express from 'express';
import bodyParser from 'body-parser';
import { generatePDF } from './generate.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/api/generate-invoice', async (req, res) => {
    const { htmlContent, fileName } = req.body;

    if (!htmlContent || !fileName) {
        return res.status(400).send('Missing HTML content or file name.');
    }

    try {
        const pdfBuffer = await generatePDF(htmlContent);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${fileName}"`,
        });
        res.send(pdfBuffer);
    } catch (err) {
        console.error('PDF Generation Error:', err);
        res.status(500).send('Failed to generate PDF');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});