const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'B1 memories');

function getFilesByFolder() {
    try {
        const folders = fs.readdirSync(baseDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const result = folders.map(folder => {
            const folderPath = path.join(baseDir, folder);
            const files = fs.readdirSync(folderPath)
                .filter(file => /\.(mp4|jpg|png|jpeg)$/i.test(file));
            return {
                folder,
                files: files.map(file => path.join(folder, file))
            };
        });

        return result;
    } catch (error) {
        console.error('Lỗi khi đọc thư mục:', error.message);
        return [];
    }
}

const data = getFilesByFolder();
fs.writeFileSync('gallery-data.json', JSON.stringify(data, null, 2));
console.log('Đã tạo xong gallery-data.json!');