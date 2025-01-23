async function fetchGalleryData() {
    const response = await fetch('gallery-data.json');
    const data = await response.json();
    return data;
}

function createGalleryItem(filePath, isVideo) {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    if (isVideo) {
        const video = document.createElement('video');
        video.src = filePath;
        video.controls = false;
        video.muted = true;
        video.loop = true;
        video.play();
        item.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = filePath;
        item.appendChild(img);
    }

    item.addEventListener('click', () => openViewer(filePath, isVideo));

    return item;
}

function openViewer(filePath, isVideo) {
    const viewer = document.getElementById('viewer');
    const viewerContent = document.getElementById('viewer-content');

    viewerContent.innerHTML = ''; // Xóa nội dung trước đó
    if (isVideo) {
        const video = document.createElement('video');
        video.src = filePath;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        viewerContent.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = filePath;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        viewerContent.appendChild(img);
    }

    viewer.style.display = 'flex';
}

// Hàm đóng Viewer
function closeViewer() {
    const viewer = document.getElementById('viewer');
    viewer.style.display = 'none';

    const video = document.querySelector('#viewer-content video');
    if (video) {
        video.pause(); // Dừng phát video khi đóng
    }
}

// Gắn sự kiện vào nút đóng
document.getElementById('close-btn').addEventListener('click', closeViewer);


function toggleContent(title, content) {
    title.classList.toggle('open');
    content.classList.toggle('show');
}

async function initGallery() {
    const galleryData = await fetchGalleryData();
    const gallery = document.getElementById('gallery');

    gallery.classList.add('timeline'); // Thêm lớp timeline

    galleryData.forEach(folder => {
        // Tạo phần tử timeline item
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        // Tiêu đề thư mục
        const timelineTitle = document.createElement('div');
        timelineTitle.classList.add('timeline-title');
        timelineTitle.innerHTML = `${folder.folder} <span class="toggle-icon">▼</span>`;
        timelineItem.appendChild(timelineTitle);

        // Nội dung thư mục
        const timelineContent = document.createElement('div');
        timelineContent.classList.add('timeline-content');
        folder.files.forEach(file => {
            const filePath = `B1 memories/${file}`;
            const isVideo = /\.(mp4)$/i.test(file);
            const item = createGalleryItem(filePath, isVideo);
            timelineContent.appendChild(item);
        });

        timelineItem.appendChild(timelineContent);
        gallery.appendChild(timelineItem);

        // Thêm sự kiện toggle
        timelineTitle.addEventListener('click', () => toggleContent(timelineTitle, timelineContent));
    });
}

initGallery();
