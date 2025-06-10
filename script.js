// ===== Global Functions =====
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize components based on page
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    if (path === 'gallery.html') {
        initGallery();
    } else if (path === 'rules.html') {
        initRules();
    } else if (path === 'faq.html') {
        initFAQ();
    } else if (path === 'contact.html') {
        initContact();
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

// ===== Gallery Page Functions =====
function initGallery() {
    // Lightbox functionality
    const artworkCards = document.querySelectorAll('.artwork-card');
    const lightbox = document.querySelector('.lightbox');
    
    if (artworkCards.length && lightbox) {
        artworkCards.forEach(card => {
            const zoomBtn = card.querySelector('.zoom-btn');
            const likeBtn = card.querySelector('.like-btn');
            
            zoomBtn.addEventListener('click', function() {
                openLightbox(card);
            });
            
            likeBtn.addEventListener('click', function() {
                toggleLike(likeBtn);
            });
        });
        
        // Close lightbox
        document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-controls button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterArtworks(this.dataset.filter);
        });
    });
}

function openLightbox(card) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxArtist = lightbox.querySelector('.lightbox-artist');
    
    lightboxImg.src = card.querySelector('img').src;
    lightboxTitle.textContent = card.querySelector('h3').textContent;
    lightboxArtist.textContent = card.querySelector('.artist').textContent;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.querySelector('.lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function toggleLike(button) {
    const likeCount = button.querySelector('.like-count');
    let count = parseInt(likeCount.textContent);
    
    if (button.classList.contains('liked')) {
        count--;
        button.innerHTML = '<i class="far fa-heart"></i> <span class="like-count">' + count + '</span>';
    } else {
        count++;
        button.innerHTML = '<i class="fas fa-heart"></i> <span class="like-count">' + count + '</span>';
    }
    
    button.classList.toggle('liked');
}

function filterArtworks(filter) {
    document.querySelectorAll('.artwork-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== Rules Page Functions =====
function initRules() {
    // Table of contents navigation
    const tocLinks = document.querySelectorAll('.toc-link');
    const ruleSections = document.querySelectorAll('.rule-section');
    
    if (tocLinks.length && ruleSections.length) {
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Update active class
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
        
        // Highlight TOC on scroll
        window.addEventListener('scroll', function() {
            let current = '';
            
            ruleSections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = '#' + section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===== FAQ Page Functions =====
function initFAQ() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        });
    }
    
    // FAQ Search
    const searchInput = document.querySelector('.search-faq input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchFAQs(this.value.toLowerCase());
            }
        });
    }
}

function searchFAQs(term) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (question.includes(term) || answer.includes(term)) {
            item.style.display = 'block';
            
            // Open matching items
            if (!item.classList.contains('active')) {
                item.classList.add('active');
                const answerEl = item.querySelector('.faq-answer');
                answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
            }
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== Contact Page Functions =====
function initContact() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Form submission (simulated)
            console.log('Form submitted:', {
                name,
                email,
                subject: this.querySelector('#subject').value,
                message,
                attachment: this.querySelector('#attachment').files[0]?.name
            });
            
            // Show success message
            alert('Thank you for your message! We will respond soon.');
            this.reset();
        });
    }
}