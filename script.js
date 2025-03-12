// Lấy các phần tử DOM cần thiết
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll('header nav a');

// Scroll spy để highlight menu khi cuộn trang
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`header nav a[href="#${id}"]`).classList.add('active');
        }
    });
};

// Toggle menu trên thiết bị di động
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Chức năng tìm kiếm trong testimonials
document.getElementById('search-input').addEventListener('input', function () {
    const searchQuery = this.value.trim().toLowerCase(); // Lấy giá trị nhập vào, loại bỏ khoảng trắng thừa và chuyển thành chữ thường
    const testimonials = document.querySelectorAll('.testimonials-item');
    let foundResults = false; // Biến kiểm tra xem có kết quả nào khớp không

    testimonials.forEach(testimonial => {
        const name = testimonial.querySelector('h2').textContent.toLowerCase(); // Lấy tên trong mỗi testimonial
        const description = testimonial.querySelector('p').textContent.toLowerCase(); // Lấy mô tả

        // Kiểm tra nếu tên hoặc mô tả chứa từ khóa tìm kiếm
        if (name.includes(searchQuery) || description.includes(searchQuery)) {
            testimonial.style.display = 'flex'; // Hiển thị testimonial nếu tìm thấy
            foundResults = true; // Đánh dấu là có kết quả
        } else {
            testimonial.style.display = 'none'; // Ẩn testimonial nếu không khớp
        }
    });

    // Hiển thị thông báo nếu không có kết quả nào khớp
    const noResultsMessage = document.getElementById('no-results-message');
    if (!foundResults && searchQuery !== '') {
        if (!noResultsMessage) {
            const message = document.createElement('p');
            message.id = 'no-results-message';
            message.textContent = 'Không tìm thấy kết quả phù hợp.';
            message.style.textAlign = 'center';
            message.style.marginTop = '20px';
            message.style.color = 'red';
            document.querySelector('.testimonials-container').appendChild(message);
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.remove(); // Xóa thông báo nếu có kết quả
        }
    }
});

// Lấy dữ liệu từ file JSON và gán sự kiện click cho testimonials-item
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const testimonialsItems = document.querySelectorAll('.testimonials-item');

        testimonialsItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const member = data[index]; // Lấy thông tin từ JSON
                showMemberCard(member); // Hiển thị thẻ thông tin thành viên
            });
        });
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu:', error));

// Hàm hiển thị thẻ thông tin thành viên
function showMemberCard(member) {
    // Tạo thẻ thông tin thành viên
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <div class="card-content">
            <h2>${member.name}</h2>
            <p><strong>Ngày sinh:</strong> ${member.birthday}</p>
            <p><strong>Quê quán:</strong> ${member.hometown}</p>
            <p><strong>Nghề nghiệp:</strong> ${member.job}</p>
            <p><strong>Sở thích:</strong> ${member.hobbies}</p>
            <div class="social-icons">
                <a href="${member.facebook}" target="_blank"><i class='bx bxl-facebook-circle'></i></a>
                <a href="${member.instagram}" target="_blank"><i class='bx bxl-instagram-alt'></i></a>
            </div>
            <button onclick="closeCard()">Đóng</button>
        </div>
    `;

    // Thêm thẻ thông tin thành viên vào body
    document.body.appendChild(card);
}

// Hàm đóng thẻ thông tin thành viên
function closeCard() {
    const card = document.querySelector('.member-card');
    if (card) {
        card.remove();
    }
}