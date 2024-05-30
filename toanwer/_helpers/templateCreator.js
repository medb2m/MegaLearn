import PDFDocument from 'pdfkit';
import fs from 'fs';



export function templateGenerator(username,certificateid) {
    
    const userName = username
    const certificateId = certificateid
    
    
    const doc = new PDFDocument({
      layout: 'landscape',
      size: 'A4',
    });
    
    const jumpLine = (doc, lines) => {
        for (let index = 0; index < lines; index++) {
          doc.moveDown();
        }
      };



doc.pipe(fs.createWriteStream('output.pdf'));

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

doc.image('../assets/tmp/assets/MegaLearnLOGO.jpg', doc.page.width / 2 - maxWidth / 2, 60, {
  fit: [maxWidth, maxHeight],
  align: 'center',
}); 

jumpLine(doc, 10)

doc
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
  .fontSize(15)
  .fill('#021c27')
  .text('MegaLearn Academy', {
    align: 'center',
  });

doc
  .font('../assets/tmp/fonts/NotoSansJP-Regular.otf')
  .fontSize(16)
  .fill('#021c27')
  .text('CERTIFICATE OF COMPLETION', {
    align: 'center',
  });

jumpLine(doc, 1)

doc
  .font('../assets/tmp/fonts/NotoSansJP-Bold.otf')
  .fontSize(24)
  .fill('#021c27')
  .text(userName, {
    align: 'center',
  });

jumpLine(doc, 1)

doc
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Successfully completed the Super Course of PI.', {
    align: 'center',
  });

jumpLine(doc, 7)

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
  .font('../assets/tmp/fonts/NotoSansJP-Bold.otf')
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
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
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
  .font('../assets/tmp/fonts/NotoSansJP-Bold.otf')
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
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
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
  .font('../assets/tmp/fonts/NotoSansJP-Bold.otf')
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
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
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
  'https://verify-your-certificate.mega/verifation-here';

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
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(
    link,
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight
  );

doc
  .font('../assets/tmp/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(`ID : ${certificateId}`, {
    align: 'left',
  });

const bottomHeight = doc.page.height - 100;

doc.image('../assets/tmp/assets/qr.png', doc.page.width / 2 - 30, bottomHeight, {
  fit: [60, 60],
});

doc.end();

}