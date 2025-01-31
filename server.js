const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'gallery.html' : req.url);

    // Kiểm tra xem file có tồn tại không
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File không tồn tại
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Lỗi server
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            // Trả về file
            const extname = path.extname(filePath);
            let contentType = 'text/html';
            if (extname === '.json') {
                contentType = 'application/json';
            } else if (extname === '.css') {
                contentType = 'text/css';
            } else if (extname === '.js') {
                contentType = 'text/javascript';
            } else if (extname === '.mp4') {
                contentType = 'video/mp4';
            } else if (extname === '.jpg' || extname === '.jpeg') {
                contentType = 'image/jpeg';
            } else if (extname === '.png') {
                contentType = 'image/png';
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});