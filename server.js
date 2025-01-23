const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'B1 memories');

// Hàm lấy danh sách file theo thư mục
function getFilesByFolder() {
    const folders = fs.readdirSync(baseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const result = folders.map(folder => {
        const folderPath = path.join(baseDir, folder);
        const files = fs.readdirSync(folderPath).filter(file => /\.(mp4|jpg|png|jpeg)$/i.test(file));
        return {
            folder,
            files: files.map(file => path.join(folder, file))
        };
    });

    return result;
}

// Lưu kết quả ra JSON để dùng trong client
const data = getFilesByFolder();
fs.writeFileSync('gallery-data.json', JSON.stringify(data, null, 2));
console.log('Gallery data generated!');
