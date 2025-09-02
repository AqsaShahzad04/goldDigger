import path from 'node:path'
import { getGoldPrice } from './getGoldPrice.js'

export function setPathToWebPage(req) {
    const __dirname = import.meta.dirname
    const pathToResource = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    return pathToResource    
}
export function setResponseHeaders(res,statusCode,contentType,payload) {
    res.statusCode = statusCode
    res.setHeader("Content-Type", contentType)
    res.end(payload)
}
export function getContentType(data) {
    const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.stream': 'text/event-stream',
  '.binary': 'application/octet-stream',
  '.form': 'application/x-www-form-urlencoded'
    };
    const ext = path.extname(data)
    return contentTypes[ext]||'text/html'
    
}

export function sendLiveGoldRates(res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    const interval = setInterval(() => {
         const goldRate = getGoldPrice()
        res.write(`data:${JSON.stringify({
            price: goldRate,
            timeStamp:new Date()
        })}\n\n`)
    }, 10000)
    res.on('close', () => {
        clearInterval(interval)
        console.log('user went offline');
    })
    res.on('error', () => {
        clearInterval(interval)
        console.log('💥 Client connection error')
    })

   
}