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
    return `
      <div class="categoria hover-elevacion" style="animation-delay: ${index * 0.1}s;" tabindex="0" aria-label="Categoría ${categoria.nombre}">
        <div class="categoria-header">
          <h3 style="border-left: 5px solid ${categoria.color || '#c81c7c'}; padding-left: 15px; margin: 0;">
            <span class="categoria-icono">${categoria.icono}</span>
            ${categoria.nombre}
          </h3>
          <span class="productos-contador">${productosCategoria.length} productos</span>
        </div>
        <p class="categoria-descripcion">${categoria.descripcion}</p>
        <div class="estadisticas-categoria" style="margin: 15px 0; padding: 15px;">
          <div class="stat-item">
            <span class="stat-numero" style="font-size: 1.5em;">$${formatearPrecio(precioPromedio)}</span>
            <span class="stat-label">Precio Promedio</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero" style="font-size: 1.5em;">${productosCategoria.filter(p => p.stock && p.stock > 0).length}</span>
            <span class="stat-label">Disponibles</span>
          </div>
        </div>
        <div class="productos-categoria">
          ${productosDestacados.map((producto, prodIndex) => `
            <div class="producto ${prodIndex === 0 ? 'producto-destacado' : ''} hover-escala">
              <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
              <div class="producto-info">
                <h4>${producto.nombre}</h4>
                <p style="color: #666; font-size: 0.85em; margin: 5px 0;">${producto.descripcion || ''}</p>
                <p class="producto-precio">$${formatearPrecio(producto.precio)}</p>
                ${producto.stock !== undefined ? `
                  <p style="font-size: 0.8em; color: ${producto.stock < 5 ? '#ff4444' : '#28a745'};">
                    ${producto.stock > 0 ? `✅ Stock: ${producto.stock}` : '❌ Sin stock'}
                  </p>
                ` : ''}
                <button class="btn-agregar hover-brillo" onclick="agregarAlCarrito(${producto.id})" 
                        ${producto.stock === 0 ? 'disabled' : ''} aria-label="Agregar ${producto.nombre} al carrito">
                  ${producto.stock === 0 ? '❌ Sin Stock' : '🛒 Agregar al Carrito'}
                </button>
              </div>
            </div>
          `).join('')}
          ${productosCategoria.length > 3 ? `
            <div class="producto" style="display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border: 2px dashed #dee2e6;">
              <div style="text-align: center; color: #666;">
                <div style="font-size: 2em; margin-bottom: 10px;">➕</div>
                <p>Ver ${productosCategoria.length - 3} productos más</p>
              </div>
            </div>
          ` : ''}
        </div>
        <a href="productos.html?categoria=${categoria.id}" class="btn-ver-todos hover-elevacion" onclick="filtrarPorCategoria('${categoria.id}')" aria-label="Ver todos los productos de ${categoria.nombre}">
          🔍 Ver todos los ${categoria.nombre.toLowerCase()}
          <span style="background: rgba(200, 28, 124, 0.1); padding: 2px 8px; border-radius: 10px; font-size: 0.8em;">
            ${productosCategoria.length}
          </span>
        </a>
      </div>
    `;
  }).join('');
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
    
// Sobrescribir la función cargarCategorias original
cargarCategorias = cargarCategoriasDetalladas;

// Inicialización específica de la página
document.addEventListener('DOMContentLoaded', function() {
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
    // Números 1-9 para ir a categorías específicas
    if (e.key >= '1' && e.key <= '9') {
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
  });
});
    
    // Función para mostrar recomendaciones basadas en categoría
    function mostrarRecomendaciones(categoriaId) {
      const productosCategoria = productos.filter(p => p.categoria === categoriaId);
      const recomendados = productosCategoria
        .sort((a, b) => b.precio - a.precio) // Por precio alto (asumimos que es mejor)
        .slice(0, 3);
      
      if (recomendados.length > 0) {
        const nombres = recomendados.map(p => p.nombre).join(', ');
        mostrarNotificacion(`💡 Recomendados en esta categoría: ${nombres}`, 'info');
      }
    }
    
    // Función para comparar productos de una categoría
    function compararProductos(categoriaId) {
      const productosCategoria = productos.filter(p => p.categoria === categoriaId);
      if (productosCategoria.length < 2) {
        mostrarNotificacion('Necesitas al menos 2 productos para comparar', 'warning');
        return;
      }
      
      // Crear una ventana modal simple con comparación
      const comparacion = productosCategoria.slice(0, 3).map(p => 
        `${p.nombre}: ${formatearPrecio(p.precio)}`
      ).join('\n');
      
      alert(`Comparación rápida:\n\n${comparacion}`);
    }
    
    // Función para obtener tendencias de precios por categoría
    function obtenerTendencias() {
      const tendencias = categorias.map(categoria => {
        const productosCategoria = productos.filter(p => p.categoria === categoria.id);
        const precioPromedio = productosCategoria.length > 0 ? 
          Math.round(productosCategoria.reduce((sum, p) => sum + p.precio, 0) / productosCategoria.length) : 0;
        
        return {
          nombre: categoria.nombre,
          promedio: precioPromedio,
          cantidad: productosCategoria.length
        };
      });
      
      console.log('Tendencias de precios por categoría:', tendencias);
      return tendencias;
    }