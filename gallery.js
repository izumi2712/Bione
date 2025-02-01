fetch('/gallery-data.json')
    .then(response => response.json())
    .then(data => {
        console.log('Dữ liệu JSON đã được tải:', data); // Log dữ liệu JSON
        const timeline = document.getElementById('timeline');
        const searchInput = document.getElementById('search-input');

        function renderTimeline(filteredData = data) {
            timeline.innerHTML = ''; // Xóa nội dung cũ

            filteredData.forEach(folder => {
                console.log('Đang xử lý folder:', folder.folder); // Log tên folder
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';

                const timelineDate = document.createElement('div');
                timelineDate.className = 'timeline-date';
                timelineDate.textContent = folder.folder;
                timelineItem.appendChild(timelineDate);

                const gallery = document.createElement('div');
                gallery.className = 'gallery';

                folder.files.forEach(file => {
                    console.log('Đang xử lý file:', file); // Log tên file
                    const filePath = `B1 Memories/${file}`;
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';

                    if (file.endsWith('.mp4')) {
                        const video = document.createElement('video');
                        video.src = filePath;
                        video.controls = true;
                        galleryItem.appendChild(video);
                    } else {
                        const img = document.createElement('img');
                        img.src = filePath;
                        img.alt = file;
                        galleryItem.appendChild(img);
                    }

                    const fileName = document.createElement('p');
                    fileName.textContent = file.split('/').pop();
                    galleryItem.appendChild(fileName);

                    gallery.appendChild(galleryItem);
                });

                timelineItem.appendChild(gallery);
                timeline.appendChild(timelineItem);
            });

            setupOverlay();
        }

        renderTimeline();

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = data.filter(folder => 
                folder.folder.toLowerCase().includes(searchTerm)
            );
            renderTimeline(filteredData);
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