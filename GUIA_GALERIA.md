# Guía para Gestionar la Galería de Imágenes

Esta guía te ayudará a agregar nuevos proyectos e imágenes a la galería de tu sitio web.

## Estructura de Archivos

```
img/
├── galeria/
│   ├── construccion/
│   │   ├── Cobertiso.jpeg
│   │   ├── Cobertiso02.jpeg
│   │   └── ...
│   ├── plomeria/
│   │   └── (imágenes de proyectos de plomería)
│   └── acabados/
│       └── (imágenes de proyectos de acabados)
└── hero.jpeg

data/
└── gallery-config.json
```

## Cómo Agregar un Nuevo Proyecto

### Paso 1: Preparar las Imágenes

1. **Organiza tus imágenes**: Coloca las imágenes del proyecto en la carpeta correspondiente:
   - `img/galeria/construccion/` para proyectos de construcción
   - `img/galeria/plomeria/` para proyectos de plomería  
   - `img/galeria/acabados/` para proyectos de acabados

2. **Formatos recomendados**: 
   - JPEG (.jpg, .jpeg) para fotografías
   - PNG (.png) para imágenes con transparencia
   - Tamaño recomendado: máximo 2MB por imagen

3. **Nomenclatura**: Usa nombres descriptivos sin espacios ni caracteres especiales:
   - ✅ `proyecto_casa_moderna_01.jpg`
   - ❌ `Proyecto Casa Moderna (1).jpg`

### Paso 2: Actualizar el Archivo de Configuración

Edita el archivo `data/gallery-config.json` para agregar tu nuevo proyecto:

```json
{
  "categories": {
    "construccion": {
      "name": "Construcción",
      "projects": {
        "tu_nuevo_proyecto": {
          "name": "Nombre del Proyecto",
          "description": "Descripción detallada del proyecto...",
          "location": "Ciudad, Estado",
          "date": "2024",
          "images": [
            "imagen1.jpg",
            "imagen2.jpg",
            "imagen3.jpg"
          ]
        }
      }
    }
  }
}
```

### Ejemplo Completo

```json
{
  "categories": {
    "construccion": {
      "name": "Construcción",
      "projects": {
        "cobertizo_residencial": {
          "name": "Cobertizo Residencial",
          "description": "Construcción de cobertizo residencial con estructura metálica y acabados de primera calidad.",
          "location": "Ciudad de México",
          "date": "2024",
          "images": [
            "Cobertiso.jpeg",
            "Cobertiso02.jpeg",
            "Cobertiso03.jpeg",
            "Cobertiso04.jpg",
            "Cobertiso05.jpeg",
            "Cobertiso06.jpeg",
            "Cobertiso07.jpeg"
          ]
        },
        "casa_moderna": {
          "name": "Casa Moderna",
          "description": "Construcción de casa moderna de dos plantas con diseño contemporáneo.",
          "location": "Guadalajara, Jalisco",
          "date": "2024",
          "images": [
            "casa_moderna_01.jpg",
            "casa_moderna_02.jpg",
            "casa_moderna_03.jpg"
          ]
        }
      }
    },
    "plomeria": {
      "name": "Plomería",
      "projects": {
        "instalacion_completa": {
          "name": "Instalación Completa",
          "description": "Instalación completa de sistema de plomería en edificio residencial.",
          "location": "Monterrey, Nuevo León",
          "date": "2024",
          "images": [
            "plomeria_01.jpg",
            "plomeria_02.jpg"
          ]
        }
      }
    },
    "acabados": {
      "name": "Acabados",
      "projects": {
        "pintura_exterior": {
          "name": "Pintura Exterior",
          "description": "Aplicación de pintura exterior con materiales de alta durabilidad.",
          "location": "Puebla, Puebla",
          "date": "2024",
          "images": [
            "pintura_01.jpg",
            "pintura_02.jpg"
          ]
        }
      }
    }
  }
}
```

## Campos Obligatorios

Para cada proyecto, debes incluir:

- **name**: Nombre del proyecto (string)
- **description**: Descripción detallada (string)
- **location**: Ubicación del proyecto (string)
- **date**: Año o fecha del proyecto (string)
- **images**: Array con los nombres de las imágenes (array de strings)

## Consejos Importantes

### ✅ Buenas Prácticas

- Usa nombres únicos para cada proyecto (clave del objeto)
- Mantén las descripciones informativas pero concisas
- Verifica que todos los archivos de imagen existan en la carpeta correcta
- Usa comillas dobles en el JSON
- Mantén la estructura de carpetas organizada

### ❌ Errores Comunes

- No usar caracteres especiales en nombres de archivos
- No olvidar las comas en el JSON
- No referenciar imágenes que no existen
- No usar espacios en nombres de archivos

## Verificación

Después de agregar un proyecto:

1. **Verifica la sintaxis JSON**: Usa un validador JSON online
2. **Confirma que las imágenes existen**: Revisa que todos los archivos estén en la carpeta correcta
3. **Prueba en el navegador**: Abre la galería y verifica que el proyecto aparezca correctamente

## Solución de Problemas

### El proyecto no aparece en la galería
- Verifica la sintaxis del JSON
- Confirma que las imágenes estén en la carpeta correcta
- Revisa la consola del navegador para errores

### Las imágenes no cargan
- Verifica que los nombres de archivo coincidan exactamente
- Confirma que las imágenes estén en la carpeta de la categoría correcta
- Revisa que no haya espacios o caracteres especiales en los nombres

### Error de JSON
- Usa un validador JSON para encontrar errores de sintaxis
- Verifica que todas las comas y llaves estén correctamente colocadas

## Contacto

Si tienes problemas o necesitas ayuda, revisa la consola del navegador (F12) para ver mensajes de error específicos.