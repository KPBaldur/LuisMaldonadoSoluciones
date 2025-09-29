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
const galleryCollections = {
    construccion: [
        {
            title: "Casa Residencial Moderna",
            description: "Construcción completa de casa residencial de 150m²",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#87CEEB"/>
                <rect x="50" y="150" width="300" height="120" fill="#D3D3D3" stroke="#696969" stroke-width="2"/>
                <polygon points="40,150 200,100 360,150" fill="#DC143C" stroke="#B22222" stroke-width="2"/>
                <rect x="150" y="200" width="40" height="70" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <rect x="80" y="170" width="35" height="30" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="285" y="170" width="35" height="30" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="0" y="270" width="400" height="30" fill="#228B22"/>
            </svg>`
        },
        {
            title: "Edificio Comercial",
            description: "Construcción de edificio comercial de 3 pisos",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#87CEEB"/>
                <rect x="100" y="80" width="200" height="190" fill="#D3D3D3" stroke="#696969" stroke-width="2"/>
                <rect x="120" y="100" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="155" y="100" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="190" y="100" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="225" y="100" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="260" y="100" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="120" y="140" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="155" y="140" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="190" y="140" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="225" y="140" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="260" y="140" width="25" height="20" fill="#4169E1" stroke="#000080" stroke-width="1"/>
                <rect x="180" y="220" width="40" height="50" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <rect x="0" y="270" width="400" height="30" fill="#228B22"/>
            </svg>`
        },
        {
            title: "Ampliación de Vivienda",
            description: "Ampliación y remodelación de vivienda existente",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#87CEEB"/>
                <rect x="50" y="150" width="150" height="120" fill="#D3D3D3" stroke="#696969" stroke-width="2"/>
                <rect x="200" y="130" width="150" height="140" fill="#E6E6FA" stroke="#9370DB" stroke-width="2"/>
                <polygon points="40,150 125,110 210,150" fill="#DC143C" stroke="#B22222" stroke-width="2"/>
                <polygon points="190,130 275,90 360,130" fill="#FF6347" stroke="#FF4500" stroke-width="2"/>
                <rect x="100" y="200" width="30" height="70" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <rect x="250" y="200" width="30" height="70" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <rect x="0" y="270" width="400" height="30" fill="#228B22"/>
            </svg>`
        },
        {
            title: "Estructura de Concreto",
            description: "Construcción de estructura de concreto armado",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#87CEEB"/>
                <rect x="80" y="100" width="240" height="170" fill="#C0C0C0" stroke="#696969" stroke-width="3"/>
                <rect x="100" y="120" width="20" height="150" fill="#A9A9A9"/>
                <rect x="140" y="120" width="20" height="150" fill="#A9A9A9"/>
                <rect x="180" y="120" width="20" height="150" fill="#A9A9A9"/>
                <rect x="220" y="120" width="20" height="150" fill="#A9A9A9"/>
                <rect x="260" y="120" width="20" height="150" fill="#A9A9A9"/>
                <rect x="80" y="140" width="240" height="10" fill="#A9A9A9"/>
                <rect x="80" y="180" width="240" height="10" fill="#A9A9A9"/>
                <rect x="80" y="220" width="240" height="10" fill="#A9A9A9"/>
                <rect x="0" y="270" width="400" height="30" fill="#228B22"/>
            </svg>`
        }
    ],
    plomeria: [
        {
            title: "Instalación de Baño Completo",
            description: "Instalación completa de sistema de plomería para baño",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F0F8FF"/>
                <rect x="50" y="50" width="300" height="200" fill="#E6E6FA" stroke="#9370DB" stroke-width="2"/>
                <rect x="80" y="180" width="80" height="50" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
                <circle cx="120" cy="205" r="15" fill="#4169E1"/>
                <rect x="200" y="80" width="60" height="100" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
                <rect x="210" y="90" width="40" height="80" fill="#E0F6FF"/>
                <rect x="280" y="150" width="50" height="80" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
                <circle cx="305" cy="190" r="20" fill="#4169E1"/>
                <line x1="120" y1="180" x2="120" y2="100" stroke="#4169E1" stroke-width="4"/>
                <line x1="230" y1="80" x2="230" y2="50" stroke="#4169E1" stroke-width="4"/>
                <line x1="305" y1="150" x2="305" y2="100" stroke="#4169E1" stroke-width="4"/>
            </svg>`
        },
        {
            title: "Sistema de Tuberías",
            description: "Instalación de red de tuberías de agua potable",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F0F8FF"/>
                <line x1="50" y1="150" x2="350" y2="150" stroke="#4169E1" stroke-width="8"/>
                <line x1="150" y1="150" x2="150" y2="80" stroke="#4169E1" stroke-width="6"/>
                <line x1="250" y1="150" x2="250" y2="220" stroke="#4169E1" stroke-width="6"/>
                <line x1="150" y1="80" x2="200" y2="80" stroke="#4169E1" stroke-width="6"/>
                <line x1="200" y1="220" x2="250" y2="220" stroke="#4169E1" stroke-width="6"/>
                <circle cx="150" cy="150" r="8" fill="#FF6347"/>
                <circle cx="250" cy="150" r="8" fill="#FF6347"/>
                <circle cx="150" cy="80" r="6" fill="#32CD32"/>
                <circle cx="250" cy="220" r="6" fill="#32CD32"/>
                <rect x="180" y="70" width="40" height="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                <rect x="180" y="210" width="40" height="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
            </svg>`
        },
        {
            title: "Reparación de Fugas",
            description: "Reparación y mantenimiento de tuberías con fugas",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F0F8FF"/>
                <line x1="100" y1="150" x2="300" y2="150" stroke="#4169E1" stroke-width="10"/>
                <rect x="190" y="140" width="20" height="20" fill="#FF0000"/>
                <circle cx="200" cy="150" r="3" fill="#00BFFF" opacity="0.7"/>
                <circle cx="205" cy="155" r="2" fill="#00BFFF" opacity="0.6"/>
                <circle cx="195" cy="160" r="2" fill="#00BFFF" opacity="0.6"/>
                <circle cx="200" cy="165" r="1" fill="#00BFFF" opacity="0.5"/>
                <rect x="180" y="130" width="40" height="40" fill="none" stroke="#FF6347" stroke-width="3" stroke-dasharray="5,5"/>
                <path d="M 170 120 Q 200 100 230 120" stroke="#32CD32" stroke-width="4" fill="none"/>
                <circle cx="170" cy="120" r="5" fill="#32CD32"/>
                <circle cx="230" cy="120" r="5" fill="#32CD32"/>
            </svg>`
        },
        {
            title: "Instalación de Calentador",
            description: "Instalación de sistema de calentamiento de agua",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F0F8FF"/>
                <rect x="150" y="80" width="100" height="140" fill="#C0C0C0" stroke="#696969" stroke-width="3"/>
                <circle cx="200" cy="150" r="40" fill="#FF6347" stroke="#DC143C" stroke-width="2"/>
                <circle cx="200" cy="150" r="25" fill="#FFD700"/>
                <line x1="200" y1="125" x2="200" y2="175" stroke="#FF4500" stroke-width="3"/>
                <line x1="175" y1="150" x2="225" y2="150" stroke="#FF4500" stroke-width="3"/>
                <line x1="150" y1="100" x2="100" y2="100" stroke="#4169E1" stroke-width="6"/>
                <line x1="250" y1="100" x2="300" y2="100" stroke="#FF0000" stroke-width="6"/>
                <rect x="80" y="95" width="20" height="10" fill="#32CD32"/>
                <rect x="300" y="95" width="20" height="10" fill="#FF6347"/>
                <rect x="170" y="60" width="60" height="20" fill="#8B4513"/>
            </svg>`
        }
    ],
    acabados: [
        {
            title: "Pintura Interior",
            description: "Acabados de pintura interior con técnicas modernas",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F5F5DC"/>
                <rect x="50" y="50" width="300" height="200" fill="#FFFAF0" stroke="#D2B48C" stroke-width="2"/>
                <rect x="70" y="70" width="80" height="160" fill="#FFE4E1"/>
                <rect x="170" y="70" width="80" height="160" fill="#E0FFFF"/>
                <rect x="270" y="70" width="60" height="160" fill="#F0FFF0"/>
                <rect x="100" y="200" width="30" height="30" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                <rect x="200" y="200" width="30" height="30" fill="#FF69B4" stroke="#FF1493" stroke-width="2"/>
                <rect x="300" y="200" width="20" height="30" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
                <path d="M 80 90 Q 110 80 140 90" stroke="#FF6347" stroke-width="3" fill="none"/>
                <path d="M 180 90 Q 210 80 240 90" stroke="#4169E1" stroke-width="3" fill="none"/>
            </svg>`
        },
        {
            title: "Instalación de Pisos",
            description: "Instalación de pisos laminados y cerámicos",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F5F5DC"/>
                <rect x="50" y="180" width="300" height="70" fill="#DEB887" stroke="#8B7355" stroke-width="2"/>
                <line x1="50" y1="200" x2="350" y2="200" stroke="#8B7355" stroke-width="1"/>
                <line x1="50" y1="220" x2="350" y2="220" stroke="#8B7355" stroke-width="1"/>
                <line x1="50" y1="240" x2="350" y2="240" stroke="#8B7355" stroke-width="1"/>
                <line x1="100" y1="180" x2="100" y2="250" stroke="#8B7355" stroke-width="1"/>
                <line x1="150" y1="180" x2="150" y2="250" stroke="#8B7355" stroke-width="1"/>
                <line x1="200" y1="180" x2="200" y2="250" stroke="#8B7355" stroke-width="1"/>
                <line x1="250" y1="180" x2="250" y2="250" stroke="#8B7355" stroke-width="1"/>
                <line x1="300" y1="180" x2="300" y2="250" stroke="#8B7355" stroke-width="1"/>
                <rect x="150" y="100" width="100" height="80" fill="#D2B48C" stroke="#A0522D" stroke-width="2"/>
                <circle cx="200" cy="140" r="30" fill="#CD853F"/>
            </svg>`
        },
        {
            title: "Acabados en Madera",
            description: "Trabajos de carpintería y acabados en madera",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F5F5DC"/>
                <rect x="80" y="80" width="240" height="140" fill="#DEB887" stroke="#8B7355" stroke-width="3"/>
                <rect x="100" y="100" width="200" height="100" fill="#D2B48C"/>
                <line x1="100" y1="120" x2="300" y2="120" stroke="#A0522D" stroke-width="2"/>
                <line x1="100" y1="140" x2="300" y2="140" stroke="#A0522D" stroke-width="2"/>
                <line x1="100" y1="160" x2="300" y2="160" stroke="#A0522D" stroke-width="2"/>
                <line x1="100" y1="180" x2="300" y2="180" stroke="#A0522D" stroke-width="2"/>
                <rect x="180" y="130" width="40" height="40" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <circle cx="200" cy="150" r="5" fill="#FFD700"/>
                <rect x="120" y="240" width="160" height="20" fill="#8B4513"/>
                <rect x="130" y="245" width="20" height="10" fill="#A0522D"/>
                <rect x="170" y="245" width="20" height="10" fill="#A0522D"/>
                <rect x="210" y="245" width="20" height="10" fill="#A0522D"/>
                <rect x="250" y="245" width="20" height="10" fill="#A0522D"/>
            </svg>`
        },
        {
            title: "Decoración y Detalles",
            description: "Acabados decorativos y detalles finales",
            svg: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F5F5DC"/>
                <rect x="50" y="50" width="300" height="200" fill="#FFFAF0" stroke="#D2B48C" stroke-width="2"/>
                <rect x="100" y="80" width="60" height="80" fill="#FFE4E1" stroke="#FF69B4" stroke-width="2"/>
                <rect x="240" y="80" width="60" height="80" fill="#E0FFFF" stroke="#4169E1" stroke-width="2"/>
                <circle cx="130" cy="120" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                <polygon points="130,105 135,115 145,115 137,122 140,132 130,127 120,132 123,122 115,115 125,115" fill="#FF6347"/>
                <circle cx="270" cy="120" r="20" fill="#98FB98" stroke="#32CD32" stroke-width="2"/>
                <rect x="265" y="115" width="10" height="10" fill="#FF1493"/>
                <rect x="150" y="180" width="100" height="50" fill="#DDA0DD" stroke="#9370DB" stroke-width="2"/>
                <line x1="160" y1="190" x2="240" y2="190" stroke="#8B008B" stroke-width="2"/>
                <line x1="160" y1="200" x2="240" y2="200" stroke="#8B008B" stroke-width="2"/>
                <line x1="160" y1="210" x2="240" y2="210" stroke="#8B008B" stroke-width="2"/>
                <line x1="160" y1="220" x2="240" y2="220" stroke="#8B008B" stroke-width="2"/>
            </svg>`
        }
    ]
};

let currentCollection = [];
let currentImageIndex = 0;

// Inicializar modal de galería
function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryItems = document.querySelectorAll('.galeria-item');

    // Abrir modal al hacer clic en elementos de galería
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            openGalleryModal(category);
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', closeGalleryModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    // Navegación
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeGalleryModal();
        }
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

function openGalleryModal(category) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    
    currentCollection = galleryCollections[category] || [];
    currentImageIndex = 0;

    // Configurar título
    const titles = {
        construccion: 'Proyectos de Construcción',
        plomeria: 'Proyectos de Plomería',
        acabados: 'Proyectos de Acabados'
    };
    modalTitle.textContent = titles[category] || 'Galería de Proyectos';

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
    thumbnailsContainer.innerHTML = '';

    currentCollection.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = image.svg;
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            showCurrentImage();
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function showCurrentImage() {
    if (currentCollection.length === 0) return;

    const modalImage = document.getElementById('modalImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbnails = document.querySelectorAll('.thumbnail');

    const currentImage = currentCollection[currentImageIndex];

    // Actualizar imagen principal
    modalImage.innerHTML = currentImage.svg;
    imageTitle.textContent = currentImage.title;
    imageDescription.textContent = currentImage.description;

    // Actualizar botones de navegación
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === currentCollection.length - 1;

    // Actualizar thumbnails activos
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