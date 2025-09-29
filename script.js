// Funciones de inicialización
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function initScrollEffects() {
    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header && window.scrollY > 100) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
    });

    // Animaciones de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.servicio-card, .galeria-item, .info-item').forEach(el => {
        observer.observe(el);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');

    if (!contactForm || !whatsappBtn) return;

    // Manejar envío del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = getFormData();
        const validation = validateForm(data);
        
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            return;
        }
        
        try {
            showMessage('Enviando mensaje...', 'info');
            await sendEmail(data);
            showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            clearForm();
        } catch (error) {
            console.error('Error al enviar:', error);
            showMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        }
    });

    // Manejar botón de WhatsApp
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const data = getFormData();
        const validation = validateForm(data);
        
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            return;
        }
        
        const message = generateWhatsAppMessage(data);
        const phoneNumber = '1234567890'; // Reemplazar con número real
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        showMessage('Redirigiendo a WhatsApp...', 'success');
        clearForm();
    });
}

// Navegación móvil - Código existente
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.servicio-card, .galeria-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Funcionalidad del formulario de contacto
const contactForm = document.getElementById('contactForm');
const whatsappBtn = document.getElementById('whatsappBtn');

// Funciones auxiliares para el formulario de contacto
function getFormData() {
    return {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        mensaje: document.getElementById('mensaje').value.trim()
    };
}

function validateForm(data) {
    if (!data.nombre) {
        return { isValid: false, message: 'Por favor, ingresa tu nombre.' };
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        return { isValid: false, message: 'Por favor, ingresa un email válido.' };
    }
    
    if (!data.telefono || !isValidPhone(data.telefono)) {
        return { isValid: false, message: 'Por favor, ingresa un teléfono válido.' };
    }
    
    if (!data.mensaje) {
        return { isValid: false, message: 'Por favor, escribe tu mensaje.' };
    }
    
    return { isValid: true };
}

function clearForm() {
    document.getElementById('contactForm').reset();
}

function sendEmail(data) {
    return new Promise((resolve, reject) => {
        // Simular envío de email
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

function generateWhatsAppMessage(data) {
    return `Hola! Mi nombre es ${data.nombre}.

Email: ${data.email}
Teléfono: ${data.telefono}

Mensaje: ${data.mensaje}

¡Espero su respuesta!`;
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Función para mostrar mensajes de error/éxito
function showMessage(message, type = 'success') {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 
            'background: rgba(40, 167, 69, 0.1); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.3);' : 
            type === 'info' ?
            'background: rgba(23, 162, 184, 0.1); color: #17a2b8; border: 1px solid rgba(23, 162, 184, 0.3);' :
            'background: rgba(220, 53, 69, 0.1); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.3);'
        }
    `;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Event listener para el envío del formulario por email
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = getFormData();
        const validation = validateForm(data);
        
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            return;
        }

        try {
            showMessage('Enviando mensaje...', 'info');
            await sendEmail(data);
            showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            clearForm();
        } catch (error) {
            console.error('Error al enviar:', error);
            showMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        }
    });
}

// Event listener para el botón de WhatsApp
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const data = getFormData();
        const validation = validateForm(data);
        
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            return;
        }

        const whatsappMessage = generateWhatsAppMessage(data);
        const phoneNumber = '573001234567'; // Número de WhatsApp (cambiar por el real)
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp en una nueva ventana
        window.open(whatsappURL, '_blank');
        
        // Mostrar mensaje de confirmación
        showMessage('Redirigiendo a WhatsApp...', 'success');
        
        // Limpiar formulario después de un breve delay
        setTimeout(() => {
            clearForm();
        }, 2000);
    });
}

// Efectos visuales adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura para el título principal
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #ff6b35';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remover cursor después de completar
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Iniciar efecto después de un breve delay
        setTimeout(typeWriter, 1000);
    }

    // Contador animado para las estadísticas
    const stats = document.querySelectorAll('.stat h3');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 98 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
            }
        }, 20);
    };

    // Observer para las estadísticas
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const text = statElement.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    animateCounter(statElement, number);
                    statsObserver.unobserve(statElement);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Efecto parallax eliminado para evitar movimiento no deseado del hero

    // Efecto de hover para las tarjetas de servicio
    const servicioCards = document.querySelectorAll('.servicio-card');
    servicioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading para las imágenes SVG (si fuera necesario)
    const lazyImages = document.querySelectorAll('svg');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
});

// Función para manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

// Función para mejorar la accesibilidad
document.addEventListener('keydown', function(e) {
    // Navegación con teclado para el menú móvil
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Función para detectar si el usuario prefiere movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar animaciones para usuarios que prefieren movimiento reducido
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

// Galería Modal
// Configuración de la galería - se carga desde JSON
let galleryConfig = null;
let galleryCollections = {};

let currentCollection = [];
let currentImageIndex = 0;

// Inicializar modal de galería
// Función para cargar la configuración de la galería
async function loadGalleryConfig() {
    try {
        const response = await fetch('./data/gallery-config.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar la configuración de la galería');
        }
        galleryConfig = await response.json();
        
        // Procesar la configuración para crear las colecciones por proyecto
        galleryCollections = {};
        
        // Verificar que projects sea un array
        if (Array.isArray(galleryConfig.projects)) {
            for (const project of galleryConfig.projects) {
                galleryCollections[project.id] = [];
                
                // Verificar que el proyecto tenga imágenes
                if (Array.isArray(project.images)) {
                    for (const image of project.images) {
                        galleryCollections[project.id].push({
                            title: project.name,
                            description: project.description,
                            location: project.location,
                            date: project.date,
                            imageSrc: `./img/galeria/${project.folder}/${image.filename}`,
                            alt: image.alt,
                            isMain: image.isMain || false
                        });
                    }
                }
            }
        }
        
        console.log('Configuración de galería cargada:', galleryCollections);
    } catch (error) {
        console.error('Error al cargar la configuración de la galería:', error);
        // Fallback: crear colecciones vacías
        galleryCollections = {};
    }
}

function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    // Cargar configuración antes de inicializar
    loadGalleryConfig().then(() => {
        const closeBtn = document.querySelector('.modal-close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const galleryItems = document.querySelectorAll('.galeria-item');

        // Abrir modal al hacer clic en elementos de galería
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const projectId = item.getAttribute('data-project');
                if (projectId && galleryCollections[projectId] && galleryCollections[projectId].length > 0) {
                    openGalleryModal(projectId);
                } else {
                    console.warn(`No hay imágenes disponibles para el proyecto: ${projectId}`);
                }
            });
        });

        // Cerrar modal
        if (closeBtn) {
            closeBtn.addEventListener('click', closeGalleryModal);
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });

        // Navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousImage);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextImage);
        }

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') showPreviousImage();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'Escape') closeGalleryModal();
            }
        });
    }).catch(error => {
        console.error('Error al inicializar la galería:', error);
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación móvil
    initMobileNav();
    
    // Inicializar efectos de scroll
    initScrollEffects();
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Inicializar modal de galería
    initGalleryModal();
    
    console.log('🏗️ Construcciones Erick - Página web cargada correctamente');
});

function openGalleryModal(projectId) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    
    currentCollection = galleryCollections[projectId] || [];
    currentImageIndex = 0;

    // Configurar título con el nombre del proyecto
    if (currentCollection.length > 0) {
        modalTitle.textContent = currentCollection[0].title;
    } else {
        modalTitle.textContent = 'Galería de Proyectos';
    }

    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Cargar imágenes
    loadModalImages();
    showCurrentImage();
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadModalImages() {
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    if (!thumbnailsContainer) return;
    
    thumbnailsContainer.innerHTML = '';
    
    currentCollection.forEach((item, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'modal-thumbnail';
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.src = item.imageSrc;
        img.alt = item.alt;
        img.loading = 'lazy';
        
        thumbnail.appendChild(img);
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            showCurrentImage();
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function showCurrentImage() {
    if (!currentCollection.length) return;
    
    const currentItem = currentCollection[currentImageIndex];
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalInfo = document.getElementById('modalInfo');
    
    if (modalImage) {
        modalImage.src = currentItem.imageSrc;
        modalImage.alt = currentItem.alt;
    }
    
    if (modalTitle) {
        modalTitle.textContent = currentItem.title;
    }
    
    if (modalDescription) {
        modalDescription.textContent = currentItem.description;
    }
    
    if (modalInfo) {
        modalInfo.innerHTML = `
            <p><strong>Ubicación:</strong> ${currentItem.location || 'No especificada'}</p>
            <p><strong>Fecha:</strong> ${currentItem.date || 'No especificada'}</p>
        `;
    }
    
    // Actualizar thumbnails activos
    const thumbnails = document.querySelectorAll('.modal-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showCurrentImage();
    }
}

function showNextImage() {
    if (currentImageIndex < currentCollection.length - 1) {
        currentImageIndex++;
        showCurrentImage();
    }
}