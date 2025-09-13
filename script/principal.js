// Base de datos de productos
const productos = [
    // Memorias RAM
    { id: 1, nombre: "Memoria RAM 8GB DDR4 2666MHz", categoria: "ram", precio: 180000, imagen: "img/MemoriaRam2.jpg", stock: 15, descripcion: "Perfecta para gaming básico y tareas cotidianas" },
    { id: 2, nombre: "Memoria RAM 16GB DDR4 3200MHz", categoria: "ram", precio: 250000, imagen: "img/MemoriaRam2.jpg", stock: 12, descripcion: "Ideal para gaming avanzado y multitarea" },
    { id: 3, nombre: "Memoria RAM 32GB DDR4 3600MHz", categoria: "ram", precio: 480000, imagen: "img/Ram.jpg", stock: 8, descripcion: "Para workstations y edición de video profesional" },
    { id: 4, nombre: "Memoria RAM 16GB DDR5 5600MHz", categoria: "ram", precio: 320000, imagen: "img/Ram.jpg", stock: 10, descripcion: "Última generación para máximo rendimiento" },
    { id: 25, nombre: "Memoria RAM 64GB DDR4 Kit", categoria: "ram", precio: 920000, imagen: "img/Ram.jpg", stock: 5, descripcion: "Kit profesional para estaciones de trabajo" },
    
    // Monitores
    { id: 5, nombre: "Monitor 24\" Full HD IPS", categoria: "monitores", precio: 850000, imagen: "img/Monitor.webp", stock: 20, descripcion: "Excelente calidad de imagen para trabajo y entretenimiento" },
    { id: 6, nombre: "Monitor 27\" QHD 144Hz Gaming", categoria: "monitores", precio: 1200000, imagen: "img/Monitores.avif", stock: 8, descripcion: "Gaming fluido con alta resolución" },
    { id: 7, nombre: "Monitor 32\" 4K UHD", categoria: "monitores", precio: 1800000, imagen: "img/Monitor.webp", stock: 6, descripcion: "Para profesionales creativos y contenido 4K" },
    { id: 8, nombre: "Monitor Gaming 24\" 165Hz Curved", categoria: "monitores", precio: 950000, imagen: "img/Monitores.avif", stock: 12, descripcion: "Monitor curvo para máxima inmersión gaming" },
    { id: 26, nombre: "Monitor Ultrawide 34\" QHD", categoria: "monitores", precio: 2200000, imagen: "img/Monitor.webp", stock: 4, descripcion: "Productividad y gaming ultrawide" },
    { id: 27, nombre: "Monitor 21.5\" Full HD Budget", categoria: "monitores", precio: 650000, imagen: "img/Monitores.avif", stock: 25, descripcion: "Opción económica con buena calidad" },
    
    // Procesadores
    { id: 9, nombre: "Intel Core i5-12400F 6-Core", categoria: "procesadores", precio: 650000, imagen: "img/Procesador.jpg", stock: 18, descripcion: "Excelente relación precio-rendimiento para gaming" },
    { id: 10, nombre: "Intel Core i7-12700K 12-Core", categoria: "procesadores", precio: 1500000, imagen: "img/Procesadores3.png", stock: 10, descripcion: "Alto rendimiento para gaming y productividad" },
    { id: 11, nombre: "AMD Ryzen 5 5600X 6-Core", categoria: "procesadores", precio: 720000, imagen: "img/Procesador.jpg", stock: 14, descripcion: "Procesador gaming con arquitectura Zen 3" },
    { id: 12, nombre: "AMD Ryzen 7 5800X3D Gaming", categoria: "procesadores", precio: 1350000, imagen: "img/Procesadores3.png", stock: 7, descripcion: "Especializado en gaming con cache 3D" },
    { id: 28, nombre: "Intel Core i3-12100F Budget", categoria: "procesadores", precio: 420000, imagen: "img/Procesador.jpg", stock: 22, descripcion: "Procesador económico para builds básicos" },
    { id: 29, nombre: "AMD Ryzen 9 5900X 12-Core", categoria: "procesadores", precio: 1800000, imagen: "img/Procesadores3.png", stock: 5, descripcion: "Potencia extrema para profesionales" },
    
    // Tarjetas Gráficas
    { id: 13, nombre: "NVIDIA RTX 4060 8GB GDDR6", categoria: "tarjetas-graficas", precio: 1800000, imagen: "img/Procesador.jpg", stock: 12, descripcion: "Ray tracing y DLSS para gaming 1080p/1440p" },
    { id: 14, nombre: "NVIDIA RTX 4070 12GB GDDR6X", categoria: "tarjetas-graficas", precio: 2500000, imagen: "img/Procesadores3.png", stock: 8, descripcion: "Gaming 4K y creación de contenido" },
    { id: 15, nombre: "AMD RX 6600 XT 8GB GDDR6", categoria: "tarjetas-graficas", precio: 1600000, imagen: "img/Procesador.jpg", stock: 10, descripcion: "Excelente para gaming 1080p de alta calidad" },
    { id: 16, nombre: "NVIDIA RTX 4080 16GB GDDR6X", categoria: "tarjetas-graficas", precio: 4200000, imagen: "img/Procesadores3.png", stock: 4, descripcion: "Gaming 4K extremo y AI" },
    { id: 30, nombre: "AMD RX 7600 8GB GDDR6", categoria: "tarjetas-graficas", precio: 1400000, imagen: "img/Procesador.jpg", stock: 9, descripcion: "Nueva generación RDNA3" },
    { id: 31, nombre: "NVIDIA RTX 4090 24GB GDDR6X", categoria: "tarjetas-graficas", precio: 6800000, imagen: "img/Procesadores3.png", stock: 2, descripcion: "La GPU más potente del mercado" },
    
    // Discos Duros
    { id: 17, nombre: "SSD 500GB NVMe PCIe 4.0", categoria: "discos", precio: 280000, imagen: "img/MemoriaRam2.jpg", stock: 30, descripcion: "Velocidades ultrarrápidas para sistema operativo" },
    { id: 18, nombre: "SSD 1TB NVMe PCIe 4.0", categoria: "discos", precio: 450000, imagen: "img/Ram.jpg", stock: 25, descripcion: "Espacio amplio con máxima velocidad" },
    { id: 19, nombre: "HDD 2TB 7200RPM SATA", categoria: "discos", precio: 320000, imagen: "img/MemoriaRam2.jpg", stock: 18, descripcion: "Gran capacidad para almacenamiento masivo" },
    { id: 20, nombre: "SSD 2TB NVMe PCIe 4.0", categoria: "discos", precio: 850000, imagen: "img/Ram.jpg", stock: 12, descripcion: "Máximo espacio y velocidad" },
    { id: 32, nombre: "SSD 240GB SATA III", categoria: "discos", precio: 150000, imagen: "img/MemoriaRam2.jpg", stock: 35, descripcion: "SSD básico para empezar" },
    { id: 33, nombre: "HDD 4TB 5400RPM SATA", categoria: "discos", precio: 480000, imagen: "img/Ram.jpg", stock: 15, descripcion: "Almacenamiento masivo económico" },
    
    // Fuentes de Poder
    { id: 21, nombre: "Fuente 650W 80+ Gold Modular", categoria: "fuentes", precio: 450000, imagen: "img/Monitor.webp", stock: 20, descripcion: "Eficiencia energética y cables modulares" },
    { id: 22, nombre: "Fuente 750W 80+ Gold Semi-Modular", categoria: "fuentes", precio: 580000, imagen: "img/Monitores.avif", stock: 15, descripcion: "Para sistemas gaming de gama media-alta" },
    { id: 23, nombre: "Fuente 850W 80+ Platinum Modular", categoria: "fuentes", precio: 720000, imagen: "img/Monitor.webp", stock: 10, descripcion: "Máxima eficiencia para sistemas de alta gama" },
    { id: 24, nombre: "Fuente 1000W 80+ Gold Modular", categoria: "fuentes", precio: 880000, imagen: "img/Monitores.avif", stock: 8, descripcion: "Para sistemas extremos y múltiples GPUs" },
    { id: 34, nombre: "Fuente 500W 80+ Bronze", categoria: "fuentes", precio: 320000, imagen: "img/Monitor.webp", stock: 25, descripcion: "Opción básica para builds económicos" },
    { id: 35, nombre: "Fuente 1200W 80+ Titanium", categoria: "fuentes", precio: 1200000, imagen: "img/Monitores.avif", stock: 3, descripcion: "Máxima eficiencia y potencia" }
];

// Definición de categorías con información adicional
const categorias = [
    {
        id: 'ram',
        nombre: 'Memorias RAM',
        descripcion: 'Mejora el rendimiento de tu PC con nuestras memorias de alta velocidad',
        icono: '🧠',
        color: '#FF6B6B'
    },
    {
        id: 'monitores',
        nombre: 'Monitores',
        descripcion: 'Desde Full HD hasta 4K, encuentra la pantalla perfecta para tu setup',
        icono: '🖥️',
        color: '#4ECDC4'
    },
    {
        id: 'procesadores',
        nombre: 'Procesadores',
        descripcion: 'El cerebro de tu PC, procesadores Intel y AMD de última generación',
        icono: '⚡',
        color: '#45B7D1'
    },
    {
        id: 'tarjetas-graficas',
        nombre: 'Tarjetas Gráficas',
        descripcion: 'Gaming y creación de contenido con las mejores GPU del mercado',
        icono: '🎮',
        color: '#96CEB4'
    },
    {
        id: 'discos',
        nombre: 'Discos Duros',
        descripcion: 'SSDs ultrarrápidos y HDDs de gran capacidad para tus datos',
        icono: '💾',
        color: '#FECA57'
    },
    {
        id: 'fuentes',
        nombre: 'Fuentes de Poder',
        descripcion: 'Alimenta tu sistema con fuentes eficientes y confiables',
        icono: '🔋',
        color: '#FF9FF3'
    }
];

// Variables globales para el carrito
let carrito = [];

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

// Función principal de inicialización
function inicializarApp() {
    cargarCarritoDesdeStorage();
    actualizarContadorCarrito();
    // Detectar página actual y cargar contenido apropiado
    const paginaActual = obtenerPaginaActual();
    switch(paginaActual) {
        case 'index':
            cargarProductosIndex();
            break;
        case 'productos':
            cargarProductosCompletos();
            break;
        case 'categoria':
            if (typeof cargarCategorias === 'function') {
                cargarCategorias();
            }
            break;
    }
}

// Detectar página actual
function obtenerPaginaActual() {
    const url = window.location.pathname;
    if (url.includes('productos.html')) return 'productos';
    if (url.includes('categoria.html')) return 'categoria';
    return 'index';
}

// Formatear precio en pesos colombianos
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO').format(precio);
}

// Cargar productos para la página principal
function cargarProductosIndex() {
    const productosDestacados = productos.slice(0, 12); // Mostrar solo algunos productos
    cargarProductos(productosDestacados);
}

// Cargar todos los productos para la página de productos
function cargarProductosCompletos() {
    cargarProductos(productos);
    actualizarEstadisticas(productos);
}

// Cargar productos en el contenedor
function cargarProductos(productosAMostrar = productos) {
    const container = document.getElementById('productosContainer');
    const sinResultados = document.getElementById('sinResultados');
    if (!container) return;
    if (!Array.isArray(productosAMostrar)) productosAMostrar = [];
    if (productosAMostrar.length === 0) {
        container.style.display = 'none';
        if (sinResultados) sinResultados.style.display = 'block';
        return;
    }
    container.style.display = 'grid';
    if (sinResultados) sinResultados.style.display = 'none';
    container.innerHTML = productosAMostrar.map(producto => `
        <div class="producto" data-categoria="${producto.categoria}">
            <img src="${producto.imagen}" alt="${producto.nombre}" width="200" height="200" loading="lazy">
            <h3>${producto.nombre}</h3>
            <p class="producto-precio">$${formatearPrecio(producto.precio)}</p>
            ${producto.stock !== undefined ? `
                <p class="producto-stock" style="font-size: 0.8em; color: ${producto.stock < 5 ? '#ff4444' : '#666'};">
                    Stock: ${producto.stock} ${producto.stock < 5 ? '(Pocas unidades)' : ''}
                </p>
            ` : ''}
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})" 
                    ${producto.stock === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} aria-label="Agregar ${producto.nombre} al carrito">
                ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        </div>
    `).join('');
}

// Actualizar estadísticas de productos
function actualizarEstadisticas(productosAMostrar) {
    const stats = document.getElementById('productosStats');
    if (stats) {
        stats.innerHTML = `Mostrando ${productosAMostrar.length} de ${productos.length} productos`;
    }
}

// Filtrar productos
function filtrarProductos() {
    const buscador = document.getElementById('buscador');
    const categoria = document.getElementById('categoria');
    const orden = document.getElementById('orden');
    
    if (!buscador || !categoria) return;
    
    const busqueda = buscador.value.toLowerCase();
    const categoriaSeleccionada = categoria.value;
    
    let productosFiltrados = productos.filter(producto => {
        const cumpleBusqueda = producto.nombre.toLowerCase().includes(busqueda);
        const cumpleCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
        return cumpleBusqueda && cumpleCategoria;
    });
    
    // Aplicar ordenamiento si existe
    if (orden) {
        productosFiltrados = ordenarArray(productosFiltrados, orden.value);
    }
    
    cargarProductos(productosFiltrados);
    actualizarEstadisticas(productosFiltrados);
}

// Ordenar productos
function ordenarProductos() {
    filtrarProductos();
}

// Función para ordenar array de productos
function ordenarArray(array, orden) {
    const arrayOrdenado = [...array];
    
    switch(orden) {
        case 'az':
            return arrayOrdenado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case 'za':
            return arrayOrdenado.sort((a, b) => b.nombre.localeCompare(a.nombre));
        case 'precio-asc':
            return arrayOrdenado.sort((a, b) => a.precio - b.precio);
        case 'precio-desc':
            return arrayOrdenado.sort((a, b) => b.precio - a.precio);
        default:
            return arrayOrdenado;
    }
}

// Cargar categorías para la página de categorías
function cargarCategorias() {
    const container = document.getElementById('categoriasContainer');
    if (!container) return;
    
    container.innerHTML = categorias.map(categoria => {
        const productosCategoria = productos.filter(p => p.categoria === categoria.id).slice(0, 3);
        
        return `
            <div class="categoria">
                <div class="categoria-header">
                    <h3 style="border-left: 5px solid ${categoria.color || '#c81c7c'}; padding-left: 15px;">
                        ${categoria.icono} ${categoria.nombre}
                    </h3>
                    <span class="productos-contador">${productos.filter(p => p.categoria === categoria.id).length} productos</span>
                </div>
                <p style="color: #666; margin-bottom: 20px;">${categoria.descripcion}</p>
                
                <div class="productos-categoria">
                    ${productosCategoria.map(producto => `
                        <div class="producto">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <div class="producto-info">
                                <h4>${producto.nombre}</h4>
                                <p style="color: #666; font-size: 0.9em;">${producto.descripcion || ''}</p>
                                <p class="producto-precio">$${formatearPrecio(producto.precio)}</p>
                                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <a href="productos.html" class="btn-ver-todos" onclick="filtrarPorCategoria('${categoria.id}')">
                    Ver todos los ${categoria.nombre.toLowerCase()}
                </a>
            </div>
        `;
    }).join('');
}

// Filtrar por categoría específica (para enlaces desde categorías)
function filtrarPorCategoria(categoriaId) {
    sessionStorage.setItem('filtroCategoria', categoriaId);
}

// Aplicar filtro guardado en sessionStorage
function aplicarFiltroGuardado() {
    const filtroGuardado = sessionStorage.getItem('filtroCategoria');
    if (filtroGuardado) {
        const selectCategoria = document.getElementById('categoria');
        if (selectCategoria) {
            selectCategoria.value = filtroGuardado;
            filtrarProductos();
        }
        sessionStorage.removeItem('filtroCategoria');
    }
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('cestec-carrito');
    if (carritoGuardado) {
        try {
            carrito = JSON.parse(carritoGuardado);
        } catch (e) {
            carrito = [];
            localStorage.removeItem('cestec-carrito');
        }
    }
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('cestec-carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) {
        mostrarNotificacion('Producto no encontrado', 'error');
        return;
    }
    
    if (producto.stock !== undefined && producto.stock === 0) {
        mostrarNotificacion('Producto sin stock', 'error');
        return;
    }
    
    const productoEnCarrito = carrito.find(p => p.id === productId);
    
    if (productoEnCarrito) {
        if (producto.stock !== undefined && productoEnCarrito.cantidad >= producto.stock) {
            mostrarNotificacion('No hay más stock disponible', 'warning');
            return;
        }
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    mostrarNotificacion('Producto agregado al carrito', 'success');
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('carritoContador');
    if (!contador) return;
    
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Mostrar notificación accesible
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Remover notificación existente si la hay
    const notificacionExistente = document.getElementById('notificacion');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }
    const colores = {
        success: 'linear-gradient(to right, #4CAF50, #45a049)',
        error: 'linear-gradient(to right, #f44336, #da190b)',
        warning: 'linear-gradient(to right, #ff9800, #e68900)',
        info: 'linear-gradient(to right, #c81c7c, #81237c)'
    };
    const notificacion = document.createElement('div');
    notificacion.id = 'notificacion';
    notificacion.setAttribute('role', 'alert');
    notificacion.setAttribute('aria-live', 'polite');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colores[tipo]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        text-align: center;
        font-weight: 500;
    `;
    document.body.appendChild(notificacion);
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Aplicar filtro guardado cuando se cargue la página de productos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarFiltroGuardado);
} else {
    aplicarFiltroGuardado();
}

// Efectos específicos para la página principal
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos de entrada escalonada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    document.querySelectorAll('.entrada-escalonada').forEach(el => {
        observer.observe(el);
    });
    // Efecto parallax suave para el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});