fetch('./gallery-data.json')
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

    // Tạo nút điều khiển (trái/phải)
    const controls = document.createElement('div');
    controls.className = 'overlay-controls';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;'; // Nút trái
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;'; // Nút phải

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    // Tạo nút phóng to/thu nhỏ
    const zoomControls = document.createElement('div');
    zoomControls.className = 'zoom-controls';

    const zoomInButton = document.createElement('button');
    zoomInButton.innerHTML = '+'; // Nút phóng to
    const zoomOutButton = document.createElement('button');
    zoomOutButton.innerHTML = '-'; // Nút thu nhỏ

    zoomControls.appendChild(zoomInButton);
    zoomControls.appendChild(zoomOutButton);

    // Thêm các nút vào overlay
    overlay.appendChild(overlayContent);
    overlay.appendChild(closeBtn);
    overlay.appendChild(controls);
    overlay.appendChild(zoomControls);

    // Thêm overlay vào body
    document.body.appendChild(overlay);

    let currentIndex = 0;
    let currentFolder = null;
    let currentMediaList = [];
    let currentScale = 1; // Biến lưu tỷ lệ phóng to hiện tại

    // Xử lý sự kiện khi bấm vào ảnh/video
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const folderItem = item.closest('.timeline-item');
            currentFolder = folderItem.querySelector('.timeline-date').textContent;
            currentMediaList = Array.from(folderItem.querySelectorAll('.gallery-item'));
            currentIndex = currentMediaList.indexOf(item);

            showMedia(currentMediaList[currentIndex]);
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('show'), 10);
        });
    });

    // Hàm hiển thị media
    function showMedia(item) {
        const media = item.querySelector('img, video').cloneNode(true);
        overlayContent.innerHTML = '';
        overlayContent.appendChild(media);
        currentScale = 1; // Reset tỷ lệ phóng to khi hiển thị media mới
        media.style.transform = `scale(${currentScale})`; // Áp dụng tỷ lệ ban đầu
    }

    // Xử lý sự kiện nút trái
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentMediaList.length) % currentMediaList.length;
        showMedia(currentMediaList[currentIndex]);
    });

    // Xử lý sự kiện nút phải
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentMediaList.length;
        showMedia(currentMediaList[currentIndex]);
    });

    // Xử lý sự kiện nút phóng to
    zoomInButton.addEventListener('click', () => {
        const media = overlayContent.querySelector('img, video');
        if (media) {
            currentScale += 0.1; // Tăng tỷ lệ phóng to lên 10%
            media.style.transform = `scale(${currentScale})`;
        }
    });

    // Xử lý sự kiện nút thu nhỏ
    zoomOutButton.addEventListener('click', () => {
        const media = overlayContent.querySelector('img, video');
        if (media) {
            currentScale -= 0.1; // Giảm tỷ lệ phóng to đi 10%
            if (currentScale < 0.1) currentScale = 0.1; // Giới hạn tỷ lệ tối thiểu
            media.style.transform = `scale(${currentScale})`;
        }
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