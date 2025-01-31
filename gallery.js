// Lấy dữ liệu từ file JSON
fetch('/gallery-data.json')
    .then(response => response.json())
    .then(data => {
        const timeline = document.getElementById('timeline');
        const searchInput = document.getElementById('search-input');

        // Hàm hiển thị timeline
        function renderTimeline(filteredData = data) {
            timeline.innerHTML = ''; // Xóa nội dung cũ

            // Duyệt qua từng mốc thời gian
            filteredData.forEach(folder => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';

                // Thêm ngày tháng
                const timelineDate = document.createElement('div');
                timelineDate.className = 'timeline-date';
                timelineDate.textContent = folder.folder; // Tên folder là mốc thời gian
                timelineItem.appendChild(timelineDate);

                // Tạo gallery cho mốc thời gian này
                const gallery = document.createElement('div');
                gallery.className = 'gallery';

                // Thêm ảnh/video vào gallery
                folder.files.forEach(file => {
                    const filePath = `B1 memories/${file}`;
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';

                    if (file.endsWith('.mp4')) {
                        // Nếu là video
                        const video = document.createElement('video');
                        video.src = filePath;
                        video.controls = true;
                        galleryItem.appendChild(video);
                    } else {
                        // Nếu là ảnh
                        const img = document.createElement('img');
                        img.src = filePath;
                        img.alt = file;
                        galleryItem.appendChild(img);
                    }

                    // Thêm tên file
                    const fileName = document.createElement('p');
                    fileName.textContent = file.split('/').pop(); // Lấy tên file
                    galleryItem.appendChild(fileName);

                    gallery.appendChild(galleryItem);
                });

                timelineItem.appendChild(gallery);
                timeline.appendChild(timelineItem);
            });

            // Gọi hàm xử lý overlay sau khi tạo xong gallery
            setupOverlay();
        }

        // Hiển thị toàn bộ timeline ban đầu
        renderTimeline();

        // Xử lý sự kiện tìm kiếm
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase(); // Lấy giá trị tìm kiếm
            const filteredData = data.filter(folder => 
                folder.folder.toLowerCase().includes(searchTerm) // Lọc theo mốc thời gian
            );
            renderTimeline(filteredData); // Hiển thị kết quả lọc
        });
    })
    .catch(error => {
        console.error('Lỗi khi tải dữ liệu gallery:', error);
    });

// Hàm xử lý overlay (giữ nguyên)
function setupOverlay() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Tạo nội dung overlay
    const overlayContent = document.createElement('div');
    overlayContent.className = 'overlay-content';

    // Tạo nút đóng
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;'; // Dấu X

    // Thêm nút đóng và nội dung vào overlay
    overlay.appendChild(overlayContent);
    overlay.appendChild(closeBtn);

    // Thêm overlay vào body
    document.body.appendChild(overlay);

    // Xử lý sự kiện khi bấm vào ảnh/video
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const media = item.querySelector('img, video'); // Lấy ảnh hoặc video
            if (media) {
                const mediaClone = media.cloneNode(true); // Clone ảnh/video
                overlayContent.innerHTML = ''; // Xóa nội dung cũ
                overlayContent.appendChild(mediaClone); // Thêm ảnh/video vào overlay
                overlay.style.display = 'flex';
                setTimeout(() => overlay.classList.add('show'), 10);
            }
        });
    });

    // Xử lý sự kiện khi bấm nút đóng
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.style.display = 'none', 300);
    });

    // Xử lý sự kiện khi bấm ra ngoài overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => overlay.style.display = 'none', 300);
        }
    });
}