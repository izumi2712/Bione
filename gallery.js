// Mở modal và play video
function openVideo(videoSrc) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.style.display = 'flex'; // Hiển thị modal
    modalVideo.src = videoSrc; // Gán video nguồn
    modalVideo.play(); // Tự động play
}

// Đóng modal và dừng video
function closeVideo() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.style.display = 'none'; // Ẩn modal
    modalVideo.pause(); // Dừng video
    modalVideo.src = ''; // Xóa video nguồn
}
function goToMainPage() {
    window.location.href = "index.html"; // Thay "main.html" bằng tên tệp HTML chính của bạn
  }
  