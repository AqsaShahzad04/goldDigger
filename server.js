import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createReadStream } from 'node:fs'
import { setPathToWebPage, setResponseHeaders, getContentType, sendLiveGoldRates } from './utils.js'
import { handleFormData } from './handleuserData.js'
import { generatePdf } from './createPdf.js'
const PORT=8000
const server = http.createServer(async (req, res) => {
    try {
        if (req.url.includes('.well-known') || req.url === '/favicon.ico') {
            res.statusCode = 204 // No content
            res.end()
            return
        
        }
        else if (req.url === "/download" && req.method === "GET") {
        
        
            await fs.access("./goldInvoice.pdf")
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=goldInvoice.pdf"
            });
       
            const readStream = createReadStream("./goldInvoice.pdf")
            readStream.pipe(res)
            readStream.on('error', (err) => {
                console.error('Stream error:', err)
                if (!res.headersSent) {
                    res.statusCode = 500
                    res.end('Error reading PDF file')
                }
            })
        }
        else if (req.url !== '/goldPrice' && req.method === 'GET') {
       
            const filesPath = setPathToWebPage(req)
            const contentType = getContentType(filesPath)
            const data = await fs.readFile(filesPath)
            setResponseHeaders(res, 200, contentType, data)
        }
        else if (req.url === '/goldPrice' && req.method === 'GET') {
            sendLiveGoldRates(res)
        }
        else if (req.url === '/submit' && req.method === 'POST') {
      
            const investmentDetails = await handleFormData(req)
            await generatePdf(investmentDetails)
            setResponseHeaders(res, 200, 'application/json', JSON.stringify({
                success: true,
                message: 'Investment received!',
                data: investmentDetails
            }))
       
        }
    }

    catch (error) {
        const pathToErrorFile=path.join('public','404.html')
        const errorPage = await fs.readFile(pathToErrorFile)
        setResponseHeaders(res, 400, 'text/html', errorPage)
        
    }
    
    
})
server.listen(PORT,()=>console.log('Hello from Aqsa\'s server'))