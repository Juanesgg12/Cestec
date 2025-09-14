// categoria.js - Funcionalidad específica para la página de categorías con carrito integrado

// Función específica para cargar categorías mejorada y accesible
function cargarCategoriasDetalladas() {
  const container = document.getElementById('categoriasContainer');
  if (!container) return;
  
  if (!Array.isArray(productos) || !Array.isArray(categorias)) {
    container.innerHTML = '<div class="carrito-vacio">Error: Datos no disponibles</div>';
    return;
  }
  
  // Actualizar estadísticas
  const totalProductos = document.getElementById('totalProductos');
  if (totalProductos) totalProductos.textContent = productos.length;
  
  container.innerHTML = categorias.map((categoria, index) => {
    const productosCategoria = productos.filter(p => p.categoria === categoria.id);
    const productosDestacados = productosCategoria.slice(0, 3);
    const precioPromedio = productosCategoria.length > 0 ? 
      Math.round(productosCategoria.reduce((sum, p) => sum + p.precio, 0) / productosCategoria.length) : 0;
    const disponibles = productosCategoria.filter(p => p.stock > 0).length;
    
    return `
      <div class="categoria hover-elevacion" style="animation-delay: ${index * 0.1}s;" tabindex="0" aria-label="Categoría ${categoria.nombre}">
        <div class="categoria-header">
          <h3 style="border-left: 5px solid ${categoria.color || '#c81c7c'}; padding-left: 15px; margin: 0;">
            <span class="categoria-icono">${categoria.icono}</span>
            ${categoria.nombre}
          </h3>
          <span class="productos-contador">${productosCategoria.length} productos (${disponibles} disponibles)</span>
        </div>
        <p class="categoria-descripcion">${categoria.descripcion}</p>
        <div class="estadisticas-categoria" style="margin: 15px 0; padding: 15px;">
          <div class="stat-item">
            <span class="stat-numero" style="font-size: 1.5em;">$${formatearPrecio(precioPromedio)}</span>
            <span class="stat-label">Precio Promedio</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero" style="font-size: 1.5em;">${disponibles}</span>
            <span class="stat-label">Disponibles</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero" style="font-size: 1.5em;">${productosCategoria.filter(p => p.stock < 5 && p.stock > 0).length}</span>
            <span class="stat-label">Stock Bajo</span>
          </div>
        </div>
        <div class="productos-categoria">
          ${productosDestacados.map((producto, prodIndex) => {
            // Determinar clase de stock
            let stockClass = 'stock-disponible';
            let stockTexto = `✅ Stock: ${producto.stock}`;
            let botonTexto = 'Agregar al Carrito';
            let botonDisabled = '';
            
            if (producto.stock === 0) {
              stockClass = 'stock-agotado';
              stockTexto = '❌ Sin stock';
              botonTexto = 'Sin Stock';
              botonDisabled = 'disabled style="opacity:0.5;cursor:not-allowed;"';
            } else if (producto.stock < 5) {
              stockClass = 'stock-bajo';
              stockTexto = `⚠️ Últimas ${producto.stock} unidades`;
            }
            
            // Verificar si el producto está en el carrito
            const enCarrito = carrito.find(item => item.id === producto.id);
            const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
            
            return `
              <div class="producto ${prodIndex === 0 ? 'producto-destacado' : ''} hover-escala" data-stock="${producto.stock}">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSIxMDAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9kdWN0bzwvdGV4dD48L3N2Zz4='">
                <div class="producto-info">
                  <h4>${producto.nombre}</h4>
                  <p style="color: #666; font-size: 0.85em; margin: 5px 0;">${producto.descripcion || ''}</p>
                  <p class="producto-precio">$${formatearPrecio(producto.precio)}</p>
                  <p class="producto-stock ${stockClass}" style="font-size: 0.8em; margin: 8px 0;">
                    ${stockTexto}
                    ${cantidadEnCarrito > 0 ? `<br><small>(${cantidadEnCarrito} en carrito)</small>` : ''}
                  </p>
                  <button class="btn-agregar hover-brillo" onclick="agregarAlCarritoCategoria(${producto.id})" 
                          ${botonDisabled} aria-label="Agregar ${producto.nombre} al carrito">
                    ${botonTexto}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
          ${productosCategoria.length > 3 ? `
            <div class="producto" style="display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border: 2px dashed #dee2e6; min-height: 200px;">
              <div style="text-align: center; color: #666;">
                <div style="font-size: 2em; margin-bottom: 10px;">➕</div>
                <p>Ver ${productosCategoria.length - 3} productos más</p>
                <small>${productosCategoria.length - 3 - (productosCategoria.length - disponibles - 3)} disponibles</small>
              </div>
            </div>
          ` : ''}
        </div>
        <a href="productos.html?categoria=${categoria.id}" class="btn-ver-todos hover-elevacion" onclick="filtrarPorCategoria('${categoria.id}')" aria-label="Ver todos los productos de ${categoria.nombre}">
          🔍 Ver todos los ${categoria.nombre.toLowerCase()}
          <span style="background: rgba(200, 28, 124, 0.1); padding: 2px 8px; border-radius: 10px; font-size: 0.8em;">
            ${disponibles}/${productosCategoria.length}
          </span>
        </a>
      </div>
    `;
  }).join('');
}

// Función específica para agregar al carrito desde categorías
function agregarAlCarritoCategoria(productId) {
  const producto = productos.find(p => p.id === productId);
  if (!producto) {
    mostrarNotificacion('Producto no encontrado', 'error');
    return;
  }
  
  if (producto.stock === 0) {
    mostrarNotificacion('Producto sin stock', 'error');
    return;
  }
  
  const productoEnCarrito = carrito.find(p => p.id === productId);
  
  if (productoEnCarrito) {
    if (productoEnCarrito.cantidad >= producto.stock) {
      mostrarNotificacion('No hay más stock disponible', 'warning');
      return;
    }
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({...producto, cantidad: 1});
  }
  
  // Reducir stock disponible
  producto.stock--;
  
  // Guardar estados
  guardarCarritoEnStorage();
  guardarProductosEnStorage();
  actualizarContadorCarrito();
  
  // Recargar categorías para mostrar cambios de stock
  cargarCategoriasDetalladas();
  
  // Mostrar notificación con stock restante
  const stockRestante = producto.stock;
  let mensaje = 'Producto agregado al carrito';
  if (stockRestante === 0) {
    mensaje += ' (último disponible)';
  } else if (stockRestante < 5) {
    mensaje += ` (quedan ${stockRestante})`;
  }
  
  mostrarNotificacion(mensaje, 'success');
}
    
// Función de búsqueda en categorías (accesible y robusta)
function buscarEnCategorias() {
  const busquedaInput = document.getElementById('busquedaRapida');
  if (!busquedaInput) return;
  
  const busqueda = busquedaInput.value.toLowerCase();
  const categoriasEls = document.querySelectorAll('.categoria');
  let algunaCoincide = false;
  
  categoriasEls.forEach(categoria => {
    const texto = categoria.textContent.toLowerCase();
    const coincide = busqueda === '' || texto.includes(busqueda);
    categoria.style.display = coincide ? 'block' : 'none';
    
    if (coincide) {
      algunaCoincide = true;
      if (busqueda !== '') {
        categoria.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          categoria.style.animation = '';
        }, 500);
      }
    }
  });
  
  // Mostrar mensaje si no hay resultados
  if (!algunaCoincide && busqueda !== '') {
    mostrarNotificacion('No se encontraron categorías que coincidan con tu búsqueda', 'info');
  }
}

// Función para mostrar recomendaciones basadas en categoría
function mostrarRecomendaciones(categoriaId) {
  const productosCategoria = productos.filter(p => p.categoria === categoriaId && p.stock > 0);
  const recomendados = productosCategoria
    .sort((a, b) => b.precio - a.precio) // Por precio alto (asumimos que es mejor)
    .slice(0, 3);
  
  if (recomendados.length > 0) {
    const nombres = recomendados.map(p => `${p.nombre} ($${formatearPrecio(p.precio)})`).join('\n• ');
    mostrarNotificacion(`💡 Recomendados disponibles:\n• ${nombres}`, 'info');
  } else {
    mostrarNotificacion('No hay productos disponibles en esta categoría', 'warning');
  }
}

// Función para comparar productos de una categoría
function compararProductos(categoriaId) {
  const productosCategoria = productos.filter(p => p.categoria === categoriaId && p.stock > 0);
  if (productosCategoria.length < 2) {
    mostrarNotificacion('Necesitas al menos 2 productos disponibles para comparar', 'warning');
    return;
  }
  
  // Crear una ventana modal simple con comparación
  const comparacion = productosCategoria.slice(0, 3).map(p => 
    `${p.nombre}: $${formatearPrecio(p.precio)} (Stock: ${p.stock})`
  ).join('\n');
  
  alert(`Comparación rápida de productos disponibles:\n\n${comparacion}`);
}

// Función para obtener tendencias de precios por categoría
function obtenerTendencias() {
  const tendencias = categorias.map(categoria => {
    const productosCategoria = productos.filter(p => p.categoria === categoria.id);
    const productosDisponibles = productosCategoria.filter(p => p.stock > 0);
    const precioPromedio = productosDisponibles.length > 0 ? 
      Math.round(productosDisponibles.reduce((sum, p) => sum + p.precio, 0) / productosDisponibles.length) : 0;
    
    return {
      nombre: categoria.nombre,
      promedio: precioPromedio,
      total: productosCategoria.length,
      disponibles: productosDisponibles.length,
      agotados: productosCategoria.filter(p => p.stock === 0).length
    };
  });
  
  console.log('Tendencias de precios y stock por categoría:', tendencias);
  return tendencias;
}

// Función para destacar productos con stock bajo
function destacarStockBajo() {
  const productosStockBajo = productos.filter(p => p.stock > 0 && p.stock < 5);
  if (productosStockBajo.length > 0) {
    const mensaje = `⚠️ Productos con stock bajo:\n${productosStockBajo.map(p => 
      `• ${p.nombre} (${p.stock} unidades)`).join('\n')}`;
    
    if (confirm(`${mensaje}\n\n¿Quieres agregar alguno al carrito antes de que se agote?`)) {
      // Scroll al primer producto con stock bajo
      const primerProducto = document.querySelector('[data-stock="' + productosStockBajo[0].stock + '"]');
      if (primerProducto) {
        primerProducto.scrollIntoView({ behavior: 'smooth', block: 'center' });
        primerProducto.style.animation = 'pulse 1s ease 3';
      }
    }
  }
}

// Sobrescribir la función cargarCategorias original
if (typeof cargarCategorias === 'undefined') {
  window.cargarCategorias = cargarCategoriasDetalladas;
} else {
  cargarCategorias = cargarCategoriasDetalladas;
}

// Asegurar que las funciones del carrito estén disponibles
if (typeof abrirCarrito === 'undefined') {
  window.abrirCarrito = function() {
    console.error('Función abrirCarrito no encontrada. Asegúrate de que carrito.js esté cargado.');
    alert('Error: El sistema de carrito no está disponible. Recarga la página.');
  };
}

if (typeof cerrarCarrito === 'undefined') {
  window.cerrarCarrito = function() {
    const modal = document.getElementById('carritoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  };
}

if (typeof mostrarNotificacion === 'undefined') {
  window.mostrarNotificacion = function(mensaje, tipo = 'info') {
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
    alert(mensaje); // Fallback básico
  };
}

// Inicialización específica de la página de categorías
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando página de categorías...');
  
  // Verificar dependencias críticas
  if (typeof productos === 'undefined' || typeof categorias === 'undefined') {
    console.error('Variables productos o categorias no encontradas');
    return;
  }
  
  if (typeof carrito === 'undefined') {
    console.error('Variable carrito no encontrada');
    window.carrito = []; // Inicializar si no existe
  }
  
  // Cargar carrito desde storage si no existe
  if (typeof cargarCarritoDesdeStorage === 'function') {
    cargarCarritoDesdeStorage();
  }
  
  // Cargar productos desde storage si no existe
  if (typeof cargarProductosDesdeStorage === 'function') {
    cargarProductosDesdeStorage();
  }
  
  // Actualizar contador del carrito
  if (typeof actualizarContadorCarrito === 'function') {
    actualizarContadorCarrito();
  }
  
  // Cargar categorías
  setTimeout(() => {
    cargarCategoriasDetalladas();
  }, 100);
  
  // Animaciones de entrada escalonada
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
  
  // Efecto contador para estadísticas
  setTimeout(() => {
    document.querySelectorAll('.contador').forEach(el => {
      el.style.animation = 'countUp 0.8s ease-out';
    });
  }, 500);
  
  // Auto-focus en búsqueda después de un momento
  setTimeout(() => {
    const busqueda = document.getElementById('busquedaRapida');
    if (busqueda) busqueda.focus();
  }, 1500);
  
  // Atajos de teclado específicos para categorías
  document.addEventListener('keydown', function(e) {
    // Números 1-6 para ir a categorías específicas
    if (e.key >= '1' && e.key <= '6') {
      const numeroCategoria = parseInt(e.key) - 1;
      const categoriaElements = document.querySelectorAll('.categoria');
      if (categoriaElements[numeroCategoria]) {
        categoriaElements[numeroCategoria].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        categoriaElements[numeroCategoria].style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          categoriaElements[numeroCategoria].style.animation = '';
        }, 500);
      }
    }
    
    // 'R' para mostrar recomendaciones
    if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
      e.preventDefault();
      destacarStockBajo();
    }
    
    // 'T' para mostrar tendencias
    if (e.key.toLowerCase() === 't' && e.ctrlKey) {
      e.preventDefault();
      const tendencias = obtenerTendencias();
      console.table(tendencias);
      mostrarNotificacion('Tendencias mostradas en consola (F12)', 'info');
    }
  });
  
  // Actualización automática cada 30 segundos para simular cambios de stock
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      // Solo actualizar si la página está visible
      cargarCategoriasDetalladas();
    }
  }, 30000);
  
  console.log('Página de categorías inicializada correctamente.');
  
});