/**
 * جمعية براعم التكنولوجيا عشعاشة - سكريبت التفاعلية والأمان
 * Association Baraem Technology Achaacha - Interactive & Security Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. التعامل مع القائمة في شاشات الهاتف (Mobile Menu Toggle)
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            
            // تحريك خطوط أيقونة الهامبرغر
            const spans = mobileToggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'translateY(10px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-10px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. شريط التنقل المتجاوب عند النزول (Sticky Navbar Scroll Effect)
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        if (navbar) {
            if (scrollPos > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollPos > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. نظام الإشعارات والتنبيهات المباشرة (Interactive Notifications Engine)
    const bellBtn = document.getElementById('bellBtn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const closeNotifBtn = document.getElementById('closeNotifBtn');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notifCountBadge = document.getElementById('notifCount');

    if (bellBtn && notificationsPanel) {
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = notificationsPanel.classList.toggle('active');
            notificationsPanel.setAttribute('aria-hidden', !isActive);
        });

        if (closeNotifBtn) {
            closeNotifBtn.addEventListener('click', () => {
                notificationsPanel.classList.remove('active');
                notificationsPanel.setAttribute('aria-hidden', 'true');
            });
        }

        // إغلاق النافذة عند الضغط خارجها
        document.addEventListener('click', (e) => {
            if (!notificationsPanel.contains(e.target) && !bellBtn.contains(e.target)) {
                notificationsPanel.classList.remove('active');
                notificationsPanel.setAttribute('aria-hidden', 'true');
            }
        });

        if (markAllReadBtn && notifCountBadge) {
            markAllReadBtn.addEventListener('click', () => {
                const unreadItems = notificationsPanel.querySelectorAll('.notif-item.unread');
                unreadItems.forEach(item => item.classList.remove('unread'));
                notifCountBadge.style.display = 'none';
                markAllReadBtn.innerHTML = '<i class="fas fa-check-double"></i> تم تحديد الكل كـ مقروء';
                markAllReadBtn.disabled = true;
                markAllReadBtn.style.opacity = '0.6';
            });
        }
    }


    // 4. معرض الصور والفلترة الذكية (Gallery Filters & Lightbox)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // تصفية المعرض
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox للصور
    let currentImageIndex = 0;
    const zoomButtons = Array.from(document.querySelectorAll('.zoom-btn'));

    function openLightbox(index) {
        if (!zoomButtons[index]) return;
        currentImageIndex = index;
        const btn = zoomButtons[index];
        const src = btn.getAttribute('data-src');
        const caption = btn.getAttribute('data-caption');

        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    zoomButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % zoomButtons.length;
            openLightbox(currentImageIndex);
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + zoomButtons.length) % zoomButtons.length;
            openLightbox(currentImageIndex);
        });
    }

    // إمكانية التنقل بالأسهم وزر ESC
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex + 1) % zoomButtons.length;
            openLightbox(currentImageIndex);
        }
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex - 1 + zoomButtons.length) % zoomButtons.length;
            openLightbox(currentImageIndex);
        }
    });


    // 6. تتبع القسم النشط في القائمة (ScrollSpy)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // 7. أكورديون الأسئلة الشائعة للأولياء (FAQ Accordion Logic)
    const faqButtons = document.querySelectorAll('.faq-question-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const isOpen = faqItem.classList.contains('active');

            // إغلاق باقي الأسئلة
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const b = item.querySelector('.faq-question-btn');
                if (b) b.setAttribute('aria-expanded', 'false');
            });

            // فتح السؤال الحالي إذا لم يكن مفتوحاً
            if (!isOpen) {
                faqItem.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 9. زر مشاركة الموقع (One-Click Share via Web Share API or WhatsApp)
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'جمعية براعم التكنولوجيا عشعاشة 🇩🇿',
                text: 'فضاء تعليم الروبوتيك والذكاء الاصطناعي والطباعة 3D للأطفال والشباب في ولاية مستغانم. سجّل الآن!',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    // تم الإلغاء من المستخدم
                }
            } else {
                // فتح نافذة مشاركة واتساب مباشرة للمتصفحات القديمة
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    // 10. زر نسخ رقم الهاتف والواتساب بضغطة واحدة (Copy Phone Number)
    const copyPhoneBtn = document.getElementById('copyPhoneBtn');
    const copyText = document.getElementById('copyText');
    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('0696760385').then(() => {
                if (copyText) copyText.textContent = 'تم النسخ ✓';
                copyPhoneBtn.style.background = '#25d366';
                copyPhoneBtn.style.color = '#fff';

                setTimeout(() => {
                    if (copyText) copyText.textContent = 'نسخ';
                    copyPhoneBtn.style.background = '';
                    copyPhoneBtn.style.color = '';
                }, 2000);
            }).catch(() => {
                // بديل
            });
        });
    }

    // 11. تحسينات وتأكيدات الأمان الصارمة (Security Best Practices Enforcement)
    try {
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }
    } catch (e) {
        // حماية مدمجة
    }

    // فحص جميع الروابط الخارجية للتأكد من احتوائها على noopener و noreferrer
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // تحديث سنة حقوق النشر تلقائياً
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

