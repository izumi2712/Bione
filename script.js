let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = set.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top => offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href=' + id + ' ]').classList.add('active')
            })
        }
    })
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

document.getElementById('search-input').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();  // Lấy giá trị nhập vào và chuyển thành chữ thường
    const testimonials = document.querySelectorAll('.testimonials-item');

    testimonials.forEach(function (testimonial) {
        const name = testimonial.querySelector('h2').textContent.toLowerCase();  // Lấy tên trong mỗi testimonial
        const description = testimonial.querySelector('p').textContent.toLowerCase();  // Lấy mô tả (tuỳ chọn)

        // Kiểm tra nếu tên hoặc mô tả chứa từ khóa tìm kiếm
        if (name.includes(searchQuery)) {
            testimonial.style.display = 'flex';  // Hiển thị testimonial nếu tìm thấy
        } else {
            testimonial.style.display = 'none';  // Ẩn testimonial nếu không khớp
        }
    });
});
