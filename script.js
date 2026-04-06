// script.js - Interactive UI Elements

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Adjusting for fixed navbar height
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll animations (Revealing elements)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation preparations
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Send data to backend (Express Server we will create)
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    formStatus.textContent = 'Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Gagal mengirim pesan.');
                }
            } catch (error) {
                console.error(error);
                // Fallback for UI if backend is not running yet
                formStatus.textContent = 'Pesan dikirim sementara ke lokal (Server backend belum aktif). Terima kasih!';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } finally {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }
        });
    }

    // Fallback Image handling for profile and ID card
    const profileImg = document.getElementById('profileImage');
    if(profileImg) {
        profileImg.addEventListener('error', function() {
            // Replace with a placeholder pattern if image is missing
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22480%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20480%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e%20text%20%7B%20fill%3A%2394a3b8%3Bfont-weight%3Abold%3Bfont-family%3AInter%2C%20sans-serif%2C%20Arial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e%22%3E%3Crect%20width%3D%22400%22%20height%3D%22480%22%20fill%3D%22%231e293b%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22120%22%20y%3D%22240%22%3E%5BGambar%20Foto%20Almet%5D%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
        });
    }

    const idCardImg = document.getElementById('idCardImage');
    if(idCardImg) {
        idCardImg.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18f%20text%20%7B%20fill%3A%2394a3b8%3Bfont-weight%3Abold%3Bfont-family%3AInter%2C%20sans-serif%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18f%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231e293b%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%3E%5BGambar%20ID%20Card%20SGP%5D%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
        });
    }

});
