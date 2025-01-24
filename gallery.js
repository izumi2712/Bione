// Fetch dữ liệu từ file JSON
async function fetchGalleryData() {
    try {
        const response = await fetch('gallery-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching gallery data:', error);
        return []; // Trả về mảng rỗng nếu xảy ra lỗi
    }
}

// Tạo một mục trong thư viện (ảnh hoặc video)
function createGalleryItem(filePath, isVideo) {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    if (isVideo) {
        const video = document.createElement('video');
        video.src = filePath;
        video.controls = true; // Bật controls để tương tác tốt hơn
        video.muted = true;
        video.loop = true;
        video.addEventListener('canplay', () => video.play()); // Phát video khi có thể
        item.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = filePath;
        img.alt = 'Gallery Image'; // Thêm alt để hỗ trợ SEO
        item.appendChild(img);
    }

    // Gắn sự kiện mở Viewer
    item.addEventListener('click', () => openViewer(filePath, isVideo));

    return item;
}

// Mở Viewer để hiển thị ảnh hoặc video lớn hơn
function openViewer(filePath, isVideo) {
    const viewer = document.getElementById('viewer');
    const viewerContent = document.getElementById('viewer-content');

    // Xóa nội dung cũ
    viewerContent.innerHTML = '';

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
        img.alt = 'Gallery Image';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        viewerContent.appendChild(img);
    }

    // Hiển thị Viewer
    viewer.style.display = 'flex';
}

// Đóng Viewer và dừng phát video
function closeViewer() {
    const viewer = document.getElementById('viewer');
    viewer.style.display = 'none';

    // Dừng phát video nếu có
    const video = document.querySelector('#viewer-content video');
    if (video) {
        video.pause();
    }
}

// Gắn sự kiện vào nút đóng Viewer
document.getElementById('close-btn').addEventListener('click', closeViewer);

// Hiển thị hoặc ẩn nội dung thư mục
function toggleContent(title, content) {
    title.classList.toggle('open');
    content.classList.toggle('show');
}

// Khởi tạo thư viện
async function initGallery() {
    const galleryData = await fetchGalleryData(); // Lấy dữ liệu từ JSON
    const gallery = document.getElementById('gallery');

    gallery.classList.add('timeline'); // Thêm lớp timeline để hiển thị theo thời gian

    galleryData.forEach(folder => {
        // Tạo phần tử timeline item
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        // Tạo tiêu đề thư mục
        const timelineTitle = document.createElement('div');
        timelineTitle.classList.add('timeline-title');
        timelineTitle.innerHTML = `${folder.folder} <span class="toggle-icon">▼</span>`;
        timelineItem.appendChild(timelineTitle);

        // Tạo nội dung thư mục
        const timelineContent = document.createElement('div');
        timelineContent.classList.add('timeline-content');
        folder.files.forEach(file => {
            const filePath = `B1 Memories/${file}`;
            const isVideo = /\.(mp4)$/i.test(file); // Kiểm tra file có phải video không
            const item = createGalleryItem(filePath, isVideo);
            timelineContent.appendChild(item);
        });

        timelineItem.appendChild(timelineContent);
        gallery.appendChild(timelineItem);

        // Gắn sự kiện toggle cho tiêu đề thư mục
        timelineTitle.addEventListener('click', () => toggleContent(timelineTitle, timelineContent));
    });
}

// Khởi chạy thư viện
initGallery();
