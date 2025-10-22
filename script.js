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

    // Observer para animaciones
    document.querySelectorAll('.servicio-card, .galeria-item, .info-item').forEach(el => {
        observer.observe(el);
    });
}

let formInitialized = false;
const DISABLE_LEGACY_FORM_LISTENERS = true;

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');

    if (!contactForm || !whatsappBtn) return;
    if (formInitialized) return;
    formInitialized = true;

    const publicSpan = document.getElementById('whatsappPublic');
    if (publicSpan) publicSpan.textContent = 'Click para chatear';

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = getFormData();
        const validation = validateForm(data);

        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            return;
        }
        if (!data.consent) {
            showMessage('Debes aceptar la Política de Privacidad.', 'error');
            return;
        }
        if (!data.captchaToken || (Date.now() - (window.turnstileTimestamp || 0) > 120000)) {
            showMessage('Por favor, valida que no eres un robot.', 'error');
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

    // Protección de WhatsApp
    const OBFUSCATED_PHONE_B64 = 'NTY5NTQwOTQ1NjQ='; // 56954094564
    let lastClickTs = 0;

    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const now = Date.now();
        if (now - lastClickTs < 5000) {
            showMessage('Espera unos segundos antes de reintentar.', 'error');
            return;
        }

        const consent = !!document.getElementById('consent')?.checked;
        if (!consent) {
            showMessage('Debes aceptar la Política de Privacidad.', 'error');
            return;
        }

        if (!confirm('¿Deseas abrir el chat en WhatsApp?')) return;

        const phoneNumber = atob(OBFUSCATED_PHONE_B64);
        const presetMessage = 'Hola, me gustaría cotizar un proyecto.';
        const userMessageInput = document.getElementById('mensaje');
        const finalMessage = userMessageInput && userMessageInput.value.trim().length > 0
            ? sanitizeInput(userMessageInput.value.trim())
            : presetMessage;

        lastClickTs = now;
        setTimeout(() => {
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
            window.open(whatsappUrl, '_blank');
            showMessage('Abriendo WhatsApp...', 'info');
        }, 500);
    });
}

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

// Observer para animaciones
document.querySelectorAll('.servicio-card, .galeria-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Funcionalidad del formulario de contacto
const contactForm = document.getElementById('contactForm');
const whatsappBtn = document.getElementById('whatsappBtn');

// Función para sanitizar inputs y prevenir XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/script/gi, '')
        .replace(/[^\x20-\x7EÀ-ÿ\n\r]/g, '') // elimina caracteres no imprimibles
        .trim();
}

function validateForm(data) {
    const errors = [];
    
    // Validar nombre
    if (!data.nombre || data.nombre.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres.');
    }
    if (data.nombre.length > 50) {
        errors.push('El nombre no puede exceder 50 caracteres.');
    }
    
    // Validar email
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Por favor, ingresa un email válido.');
    }
    
    // Validar teléfono
    if (!data.telefono || !isValidPhone(data.telefono)) {
        errors.push('Por favor, ingresa un teléfono válido (mínimo 10 dígitos).');
    }
    
    // Validar servicio
    if (!data.servicio) {
        errors.push('Por favor, selecciona un servicio.');
    }
    
    // Validar mensaje
    if (!data.mensaje || data.mensaje.length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres.');
    }
    if (data.mensaje.length > 1000) {
        errors.push('El mensaje no puede exceder 1000 caracteres.');
    }
    const allowedMsg = /^[A-Za-zÀ-ÿ0-9.,;:()\-@!?\s\n]+$/;
    if (!allowedMsg.test(data.mensaje)) {
        errors.push('Tu mensaje contiene caracteres no permitidos.');
    }
    if (!data.consent) {
        errors.push('Debes aceptar la Política de Privacidad.');
    }
    // ... existing code ...
    return {
        isValid: errors.length === 0,
        message: errors.length > 0 ? errors.join(' ') : ''
    };
}

// Función mejorada para validar email
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Función mejorada para validar teléfono
function isValidPhone(phone) {
    // Remover espacios, guiones y paréntesis para validación
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    return phoneRegex.test(cleanPhone);
}

// Función para limpiar formulario con confirmación
function clearForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        // Limpiar mensajes de error si existen
        const errorMessages = document.querySelectorAll('.form-message');
        errorMessages.forEach(msg => msg.remove());
    }
}

// Función mejorada para envío de email (simulado)
// Configuración de EmailJS
const EMAILJS_CONFIG = {
    serviceID: 'service_fgmp496', // Reemplaza con tu Service ID
    templateID: 'template_jbczxk9', // Reemplaza con tu Template ID
    publicKey: 'wNW5SJFQ-7W1oHpV_' // Reemplaza con tu Public Key
};

// Inicializar EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS inicializado correctamente');
    } else {
        console.error('EmailJS no está disponible');
    }
}

function sendEmail(data) {
    return new Promise((resolve, reject) => {
        // Validación adicional del lado del servidor (simulada)
        if (!data || typeof data !== 'object') {
            reject(new Error('Datos inválidos'));
            return;
        }
        
        const lastSubmission = localStorage.getItem('lastFormSubmission');
        const now = Date.now();
        if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) {
            reject(new Error('Por favor espera un minuto antes de enviar otro mensaje.'));
            return;
        }
        
        if (typeof emailjs === 'undefined') {
            reject(new Error('Servicio de email no disponible. Intenta nuevamente más tarde.'));
            return;
        }

        const isConfigured = EMAILJS_CONFIG &&
            EMAILJS_CONFIG.serviceID && !EMAILJS_CONFIG.serviceID.includes('TU_') &&
            EMAILJS_CONFIG.templateID && !EMAILJS_CONFIG.templateID.includes('TU_') &&
            EMAILJS_CONFIG.publicKey && !EMAILJS_CONFIG.publicKey.includes('TU_');

        if (!isConfigured) {
            reject(new Error('Email no configurado. Completa SERVICE_ID, TEMPLATE_ID y PUBLIC_KEY.'));
            return;
        }

        const companyName = 'Soluciones L. Maldonado';
        const adminWhatsAppNumber = '56954094564';
        const subject = `Nueva solicitud de cotización — ${data.servicio} — ${data.nombre}`;
        const submittedAt = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
        const waText = `Hola, soy ${data.nombre}. Me interesa el servicio de ${data.servicio}. ${data.mensaje}`;
        const whatsappLink = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(waText)}`;
        const mailtoLink = `mailto:${data.email}?subject=${encodeURIComponent('Re: Cotización — ' + data.servicio)}&body=${encodeURIComponent(data.mensaje)}`;

        const templateParams = {
            subject,
            company_name: companyName,
            lead_source: 'Web - Formulario de Contacto',
            submitted_at: submittedAt,

            from_name: data.nombre,
            from_email: data.email,
            phone: data.telefono,
            service: data.servicio,
            message: data.mensaje,

            whatsapp_link: whatsappLink,
            mailto_link: mailtoLink,

            to_name: 'Luis Maldonado',
            reply_to: data.email
        };
        
        emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
            .then((response) => {
                localStorage.setItem('lastFormSubmission', now.toString());
                resolve({
                    success: true,
                    message: 'Email enviado correctamente',
                    timestamp: new Date().toISOString(),
                    response: response
                });
            })
            .catch((error) => {
                reject(new Error('Error al enviar el email. Por favor, intenta nuevamente.'));
            });
    });
}

// Función mejorada para generar mensaje de WhatsApp
function generateWhatsAppMessage(data) {
    const message = `🏗️ *Solicitud de Cotización - Construcciones Erick*

👤 *Nombre:* ${data.nombre}
📧 *Email:* ${data.email}
📱 *Teléfono:* ${data.telefono}
🔧 *Servicio:* ${data.servicio}

💬 *Mensaje:*
${data.mensaje}

---
_Enviado desde la página web oficial_`;

    return message;
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
    messageDiv.setAttribute('role', 'alert');
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
if (!DISABLE_LEGACY_FORM_LISTENERS && contactForm) {
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
if (!DISABLE_LEGACY_FORM_LISTENERS && whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const data = getFormData();
        const validation = validateForm(data);
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            return;
        }
        const whatsappMessage = generateWhatsAppMessage(data);
        const phoneNumber = '56954094564';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank');
        showMessage('Redirigiendo a WhatsApp...', 'success');
        setTimeout(() => {
            clearForm();
        }, 2000);
    });
}

// Efectos visuales adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    initEmailJS();
    
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
let projectMeta = {};
let currentProjectMeta = null;

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
        
        // Procesar configuración
        galleryCollections = {};
        projectMeta = {};

        if (Array.isArray(galleryConfig.projects)) {
            for (const project of galleryConfig.projects) {
                if (!project || !project.id || !project.folder) continue;

                // Guardar metadatos del proyecto
                projectMeta[project.id] = {
                    title: project.name,
                    description: project.description,
                    location: project.location,
                    date: project.date
                };

                // Preparar colección de imágenes
                galleryCollections[project.id] = [];

                if (Array.isArray(project.images)) {
                    for (const image of project.images) {
                        // Evitar imágenes sin filename
                        if (!image || !image.filename) continue;

                        galleryCollections[project.id].push({
                            title: project.name,
                            description: project.description,
                            location: project.location,
                            date: project.date,
                            imageSrc: `./img/galeria/${project.folder}/${image.filename}`,
                            alt: image.alt || project.name,
                            isMain: image.isMain || false
                        });
                    }
                }
            }
        }

        console.log('Configuración de galería cargada:', galleryCollections);
    } catch (error) {
        console.error('Error al cargar la configuración de la galería:', error);
        galleryCollections = {};
    }
}

function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) {
        console.warn('Modal de galería no encontrado');
        return;
    }

    // Cargar configuración antes de inicializar
    loadGalleryConfig().then(() => {
        const closeBtn = document.querySelector('.modal-close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const galleryItems = document.querySelectorAll('.galeria-item');

        if (galleryItems.length === 0) {
            console.warn('No se encontraron elementos de galería');
            return;
        }

        // Abrir modal al hacer clic en elementos de galería
        galleryItems.forEach(item => {
            if (item) {
                item.addEventListener('click', () => {
                    const projectId = item.getAttribute('data-project');
                    if (projectId && galleryCollections[projectId] && galleryCollections[projectId].length > 0) {
                        openGalleryModal(projectId);
                    } else {
                        console.warn(`No hay imágenes disponibles para el proyecto: ${projectId}`);
                    }
                });
            }
        });

        // Cerrar modal
        if (closeBtn) {
            closeBtn.addEventListener('click', closeGalleryModal);
        } else {
            console.warn('Botón de cerrar modal no encontrado');
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeGalleryModal();
                }
            });
        }

        // Navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousImage);
        } else {
            console.warn('Botón anterior no encontrado');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextImage);
        } else {
            console.warn('Botón siguiente no encontrado');
        }

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (modal && modal.style.display === 'block') {
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
    currentProjectMeta = projectMeta[projectId] || null;

    // Seleccionar imagen principal si existe
    const mainIndex = currentCollection.findIndex(item => item.isMain);
    currentImageIndex = mainIndex >= 0 ? mainIndex : 0;

    // Título del proyecto
    if (currentCollection.length > 0) {
        modalTitle.textContent = currentCollection[0].title;
    } else if (currentProjectMeta && currentProjectMeta.title) {
        modalTitle.textContent = currentProjectMeta.title;
    } else {
        modalTitle.textContent = 'Galería de Proyectos';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

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
        modalTitle.textContent = currentItem.title || (currentProjectMeta && currentProjectMeta.title) || 'Proyecto';
    }
    
    if (modalDescription) {
        const desc = (currentItem.description && currentItem.description.trim().length > 0)
            ? currentItem.description
            : (currentProjectMeta && currentProjectMeta.description) || 'Descripción no disponible';
        modalDescription.textContent = desc;
    }
    
    if (modalInfo) {
        const safeLocation = sanitizeInput(
            (currentItem.location && currentItem.location.trim().length > 0)
                ? currentItem.location
                : (currentProjectMeta && currentProjectMeta.location) || 'No especificada'
        );
        const safeDate = sanitizeInput(
            (currentItem.date && currentItem.date.trim && currentItem.date.trim().length > 0)
                ? currentItem.date
                : (currentProjectMeta && currentProjectMeta.date) || 'No especificada'
        );
        modalInfo.innerHTML = `
            <p><strong>Ubicación:</strong> ${safeLocation}</p>
            <p><strong>Fecha:</strong> ${safeDate}</p>
        `;
        // Asegurar que el panel esté visible
        modalInfo.parentElement && (modalInfo.parentElement.style.display = 'block');
    }
    
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