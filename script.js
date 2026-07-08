/* ========================================
   个人作品集 - 交互脚本
   ======================================== */

// ===== 画廊数据 =====
const galleries = {
    tank: {
        images: [
            'assets/tank/screenshot1.jpg',
            'assets/tank/screenshot2.png',
            'assets/tank/screenshot3.jpg'
        ],
        index: 0
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // ===== 导航栏滚动 =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== 移动端菜单 =====
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // ===== 灯箱：点击大图放大 =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-main img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('open');
        });
    });
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('lightbox-close')) {
            this.classList.remove('open');
        }
    });

    // ===== 键盘左右切换 =====
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('open')) {
            if (e.key === 'Escape') lightbox.classList.remove('open');
            return;
        }
        if (e.key === 'ArrowLeft') galleryNav('tank', -1);
        if (e.key === 'ArrowRight') galleryNav('tank', 1);
    });

    // ===== 缩略图 hover 预处理（提升体验） =====
    document.querySelectorAll('.gallery-thumbs img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            // 获取对应的大图并预加载提示
            this.style.opacity = '0.8';
        });
    });
});

// ===== 画廊导航 =====
function galleryNav(name, delta) {
    const g = galleries[name];
    if (!g) return;

    g.index = (g.index + delta + g.images.length) % g.images.length;
    updateGallery(name);
}

function galleryJump(name, idx) {
    const g = galleries[name];
    if (!g) return;

    g.index = idx;
    updateGallery(name);
}

function updateGallery(name) {
    const g = galleries[name];
    const mainImg = document.getElementById(name + 'MainImg');
    const counter = document.getElementById(name + '-counter');

    if (mainImg) mainImg.src = g.images[g.index];
    if (counter) counter.textContent = (g.index + 1) + ' / ' + g.images.length;

    // 更新缩略图 active
    const thumbsContainer = mainImg?.closest('.gallery')?.querySelector('.gallery-thumbs');
    if (thumbsContainer) {
        thumbsContainer.querySelectorAll('.thumb').forEach((t, i) => {
            t.classList.toggle('active', i === g.index);
        });
    }
}

// ===== 灯箱关闭 =====
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}
