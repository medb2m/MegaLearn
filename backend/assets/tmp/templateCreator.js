import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const templateGenerator = async (name, certificateid) => {
  return new Promise((resolve, reject) => {
    try {
      const userName = name;
      const certificateId = certificateid;

      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
      });

      const jumpLine = (doc, lines) => {
        for (let index = 0; index < lines; index++) {
          doc.moveDown();
        }
      };

      const outputPath = path.join(__dirname, `${userName}_certificate.pdf`);
      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);

      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
      doc.fontSize(10);

      const distanceMargin = 18;

      doc
        .fillAndStroke('#652d90')
        .lineWidth(20)
        .lineJoin('round')
        .rect(
          distanceMargin,
          distanceMargin,
          doc.page.width - distanceMargin * 2,
          doc.page.height - distanceMargin * 2,
        )
        .stroke();

      const maxWidth = 240;
      const maxHeight = 140;

      const logoPath = path.join(__dirname, 'assets', 'MegaLearnLOGO.jpg');
      const fontPathLight = path.join(__dirname, 'fonts', 'NotoSansJP-Light.otf');
      const fontPathRegular = path.join(__dirname, 'fonts', 'NotoSansJP-Regular.otf');
      const fontPathBold = path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf');
      const qrPath = path.join(__dirname, 'assets', 'qr.png');

      doc.image(logoPath, doc.page.width / 2 - maxWidth / 2, 60, {
        fit: [maxWidth, maxHeight],
        align: 'center',
      });

      jumpLine(doc, 10);

      doc
        .font(fontPathLight)
        .fontSize(15)
        .fill('#021c27')
        .text('MegaLearn Academy', {
          align: 'center',
        });

      doc
        .font(fontPathRegular)
        .fontSize(16)
        .fill('#021c27')
        .text('CERTIFICATE OF COMPLETION', {
          align: 'center',
        });

      jumpLine(doc, 1);

      doc
        .font(fontPathBold)
        .fontSize(24)
        .fill('#021c27')
        .text(userName, {
          align: 'center',
        });

      jumpLine(doc, 1);

      doc
        .font(fontPathLight)
        .fontSize(10)
        .fill('#021c27')
        .text('Successfully completed the Super Course of PI.', {
          align: 'center',
        });

      jumpLine(doc, 7);

      doc.lineWidth(1);

      const lineSize = 174;
      const signatureHeight = 390;

      doc.fillAndStroke('#021c27');
      doc.strokeOpacity(0.2);

      const startLine1 = 128;
      const endLine1 = 128 + lineSize;
      doc
        .moveTo(startLine1, signatureHeight)
        .lineTo(endLine1, signatureHeight)
        .stroke();

      const startLine2 = endLine1 + 32;
      const endLine2 = startLine2 + lineSize;
      doc
        .moveTo(startLine2, signatureHeight)
        .lineTo(endLine2, signatureHeight)
        .stroke();

      const startLine3 = endLine2 + 32;
      const endLine3 = startLine3 + lineSize;
      doc
        .moveTo(startLine3, signatureHeight)
        .lineTo(endLine3, signatureHeight)
        .stroke();

      doc
        .font(fontPathBold)
        .fontSize(10)
        .fill('#021c27')
        .text('those who knows', startLine1, signatureHeight + 10, {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          align: 'center',
        });

      doc
        .font(fontPathLight)
        .fontSize(10)
        .fill('#021c27')
        .text('Associate Professor', startLine1, signatureHeight + 25, {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          align: 'center',
        });

      doc
        .font(fontPathBold)
        .fontSize(10)
        .fill('#021c27')
        .text('those who knows', startLine2, signatureHeight + 10, {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          align: 'center',
        });

      doc
        .font(fontPathLight)
        .fontSize(10)
        .fill('#021c27')
        .text('Professor', startLine2, signatureHeight + 25, {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          align: 'center',
        });

      doc
        .font(fontPathBold)
        .fontSize(10)
        .fill('#021c27')
        .text('those who knows', startLine3, signatureHeight + 10, {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          align: 'center',
        });

      doc
        .font(fontPathLight)
        .fontSize(10)
        .fill('#021c27')
        .text('Director', startLine3, signatureHeight + 25, {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          align: 'center',
        });

      const link =
        'https://verify-your-certificate.mega/verification-here';

      const linkWidth = doc.widthOfString(link);
      const linkHeight = doc.currentLineHeight();

      doc
        .underline(
          doc.page.width / 2 - linkWidth / 2,
          448,
          linkWidth,
          linkHeight,
          { color: '#021c27' },
        )
        .link(
          doc.page.width / 2 - linkWidth / 2,
          448,
          linkWidth,
          linkHeight,
          link,
        );

      doc
        .font(fontPathLight)
        .fontSize(10)
        .fill('#021c27')
        .text(
          link,
          doc.page.width / 2 - linkWidth / 2,
          448,
          linkWidth,
          linkHeight,
        );

      doc
        .font(fontPathLight)
        .fontSize(10)
        .fill('#021c27')
        .text(`ID : ${certificateId}`, {
          align: 'left',
        });

      const bottomHeight = doc.page.height - 100;

      doc.image(qrPath, doc.page.width / 2 - 30, bottomHeight, {
        fit: [60, 60],
      });

      doc.end();

      writeStream.on('finish', () => {
        console.log(`PDF generated for ${userName}`);
        resolve();
      });

      writeStream.on('error', (err) => {
        console.error(`Error generating PDF for ${userName}: ${err.message}`);
        reject(err);
      });
    } catch (err) {
      console.error(`Error in templateGenerator: ${err.message}`);
      reject(err);
    }
  });
};
