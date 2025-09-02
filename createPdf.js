import PDFDocument from 'pdfkit'
import fs from 'node:fs'

export function generatePdf(data) {
    return new Promise((resolve, reject) => {
    const doc = new PDFDocument()
    const stream=fs.createWriteStream('goldInvoice.pdf')
    doc.pipe(stream)
    doc.font('Helvetica-Bold').fontSize(25).text('GOLD INVESTMENT INVOICE', {
       align:'center'
    })
    doc.moveDown()
    doc.font('Helvetica').fontSize(14).text(`Date:${data.date}`,{
        align:'center'
    }).moveDown(0.5).fontSize(18).text(`Gold Rate at the time of investment : $${data.goldRate} `, {
        align:'center'
    }).moveDown(0.5).text(`Amount invested:$${data.amount} `, {
        align:'center'
    }).moveDown(0.5).text(`Ounces you owned : ${data.ouncesOwned}/oz`, {
        align:'center'
    })
    doc.end()
    stream.on('finish', () => resolve())
     stream.on('error', reject)
    })
    
}