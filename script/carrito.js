// carrito.js - Funcionalidad mejorada del carrito de compras
// Asegúrate de que las variables globales 'carrito', 'productos' y 'mostrarNotificacion' existan antes de usar este script.

// Abrir modal del carrito
function abrirCarrito() {
    const modal = document.getElementById('carritoModal');
    if (!modal) {
        console.error('Modal del carrito no encontrado');
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    actualizarCarritoModal();
    // Accesibilidad: enfocar el modal
    setTimeout(() => {
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    }, 100);
}

// Cerrar modal del carrito
function cerrarCarrito() {
    const modal = document.getElementById('carritoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
    // Accesibilidad: devolver el foco al botón del carrito si existe
    const btnCarrito = document.querySelector('.carrito-icono');
    if (btnCarrito) btnCarrito.focus();
}

// Actualizar contenido del modal del carrito
function actualizarCarritoModal() {
    const carritoItems = document.getElementById('carritoItems');
    const carritoTotal = document.getElementById('carritoTotal');
    if (!carritoItems || !carritoTotal) {
        console.error('Elementos del carrito no encontrados');
        return;
    }
    if (!Array.isArray(carrito)) {
        carritoItems.innerHTML = '<div class="carrito-vacio">Error: Carrito no inicializado</div>';
        carritoTotal.textContent = '0';
        return;
    }
    if (carrito.length === 0) {
        carritoItems.innerHTML = `
            <div class="carrito-vacio" role="status" aria-live="polite">
                <div class="carrito-vacio-icono">🛒</div>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos productos para comenzar</p>
            </div>
        `;
        carritoTotal.textContent = '0';
        return;
    }
    let total = 0;
    carritoItems.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        // Obtener el producto original para verificar stock actual
        const productoOriginal = productos.find(p => p.id === item.id);
        const stockActual = productoOriginal ? productoOriginal.stock : 0;
        
        return `
            <div class="carrito-item">
                <div class="item-imagen">
                    <img src="${item.imagen}" alt="${item.nombre}" width="60" height="60" loading="lazy">
                </div>
                <div class="item-info">
                    <h4>${item.nombre}</h4>
                    <p class="item-precio-unitario">$${formatearPrecio(item.precio)} c/u</p>
                    ${stockActual !== undefined && stockActual < 5 ? 
                        `<p style="font-size: 0.8em; color: #ff6b35;">⚠️ Stock limitado: ${stockActual} disponibles</p>` 
                        : ''}
                </div>
                <div class="item-controles">
                    <div class="cantidad-controles">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)" aria-label="Disminuir cantidad">-</button>
                        <span class="cantidad-display">${item.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)" 
                                ${stockActual !== undefined && item.cantidad >= stockActual ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}
                                aria-label="Aumentar cantidad">+</button>
                    </div>
                    <div class="item-subtotal">$${formatearPrecio(subtotal)}</div>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})" title="Eliminar producto" aria-label="Eliminar producto">
                        <i class="icon-trash">🗑️</i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    carritoTotal.textContent = formatearPrecio(total);
}

// Cambiar cantidad de un producto en el carrito
function cambiarCantidad(productId, cambio) {
    const productoCarrito = carrito.find(p => p.id === productId);
    const productoOriginal = productos.find(p => p.id === productId);
    
    if (!productoCarrito || !productoOriginal) return;
    
    const nuevaCantidad = productoCarrito.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(productId);
        return;
    }
    
    // Verificar si hay suficiente stock
    if (cambio > 0) {
        if (productoOriginal.stock !== undefined && nuevaCantidad > productoOriginal.stock) {
            mostrarNotificacion('No hay más stock disponible', 'warning');
            return;
        }
        
        // Reducir stock del producto original al aumentar en carrito
        if (productoOriginal.stock !== undefined) {
            productoOriginal.stock--;
        }
    } else {
        // Devolver stock al producto original al disminuir en carrito
        if (productoOriginal.stock !== undefined) {
            productoOriginal.stock++;
        }
    }
    
    productoCarrito.cantidad = nuevaCantidad;
    
    // Guardar cambios y actualizar visualización
    guardarCarritoEnStorage();
    guardarProductosEnStorage();
    actualizarContadorCarrito();
    actualizarCarritoModal();
    
    // Actualizar productos mostrados si es necesario
    actualizarVisualizacionProductos();
}

// Eliminar producto específico del carrito
function eliminarDelCarrito(productId) {
    const productoCarrito = carrito.find(p => p.id === productId);
    const productoOriginal = productos.find(p => p.id === productId);
    
    if (!productoCarrito) return;
    
    // Mostrar confirmación solo si hay más de 1 producto
    if (productoCarrito.cantidad > 1) {
        if (!confirm(`¿Eliminar todas las ${productoCarrito.cantidad} unidades de ${productoCarrito.nombre}?`)) {
            return;
        }
    }
    
    // Devolver todo el stock al producto original
    if (productoOriginal && productoOriginal.stock !== undefined) {
        productoOriginal.stock += productoCarrito.cantidad;
    }
    
    // Remover del carrito
    carrito = carrito.filter(p => p.id !== productId);
    
    guardarCarritoEnStorage();
    guardarProductosEnStorage();
    actualizarContadorCarrito();
    actualizarCarritoModal();
    actualizarVisualizacionProductos();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

// Vaciar todo el carrito
function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito ya está vacío', 'info');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
        // Devolver todo el stock a los productos originales
        carrito.forEach(item => {
            const productoOriginal = productos.find(p => p.id === item.id);
            if (productoOriginal && productoOriginal.stock !== undefined) {
                productoOriginal.stock += item.cantidad;
            }
        });
        
        carrito = [];
        localStorage.removeItem('cestec-carrito');
        guardarProductosEnStorage();
        actualizarContadorCarrito();
        actualizarCarritoModal();
        actualizarVisualizacionProductos();
        mostrarNotificacion('Carrito vaciado correctamente', 'success');
    }
}

// Proceder al pago
function procederPago() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'warning');
        return;
    }
    
    // Validar disponibilidad antes del pago
    const validacion = validarDisponibilidadCarrito();
    if (!validacion.esValido) {
        alert(`No se puede proceder con el pago:\n\n${validacion.errores.join('\n')}`);
        return;
    }
    
    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // Crear resumen detallado
    const resumen = carrito.map(item => 
        `• ${item.nombre} x${item.cantidad} = $${formatearPrecio(item.precio * item.cantidad)}`
    ).join('\n');
    
    // Mostrar resumen de compra
    const confirmarCompra = confirm(
        `RESUMEN DE TU COMPRA:\n\n${resumen}\n\n` +
        `TOTAL: $${formatearPrecio(total)}\n\n` +
        `¿Deseas proceder con el pago?`
    );
    
    if (confirmarCompra) {
        procesarCompra(total);
    }
}

// Procesar la compra (simulación mejorada)
function procesarCompra(total) {
    // Mostrar indicador de carga
    mostrarIndicadorCarga();
    
    // Simular procesamiento de pago
    setTimeout(() => {
        try {
            // Los productos ya tienen el stock reducido, solo necesitamos completar la compra
            const numeroOrden = generarNumeroOrden();
            const fechaEntrega = calcularFechaEntrega();
            
            // Mostrar mensaje de éxito
            mostrarMensajeCompraExitosa(total, numeroOrden, fechaEntrega);
            
            // Limpiar carrito
            carrito = [];
            localStorage.removeItem('cestec-carrito');
            actualizarContadorCarrito();
            cerrarCarrito();
            
            // Recargar productos si estamos en la página de productos
            actualizarVisualizacionProductos();
            
        } catch (error) {
            console.error('Error procesando compra:', error);
            mostrarNotificacion('Error al procesar la compra. Intenta nuevamente.', 'error');
        } finally {
            ocultarIndicadorCarga();
        }
    }, 2000);
}

// Validar disponibilidad del carrito antes del pago
function validarDisponibilidadCarrito() {
    const errores = [];
    
    carrito.forEach(item => {
        const productoOriginal = productos.find(p => p.id === item.id);
        
        if (!productoOriginal) {
            errores.push(`• ${item.nombre} ya no está disponible`);
        } else if (productoOriginal.stock !== undefined) {
            const stockTotal = productoOriginal.stock + item.cantidad; // Stock actual + lo que está en carrito
            if (stockTotal < item.cantidad) {
                errores.push(`• Solo hay ${stockTotal} unidades de ${item.nombre}, tienes ${item.cantidad} en el carrito`);
            }
        }
    });
    
    return {
        esValido: errores.length === 0,
        errores: errores
    };
}

// Mostrar indicador de carga durante el procesamiento
function mostrarIndicadorCarga() {
    const indicador = document.createElement('div');
    indicador.id = 'indicadorCarga';
    indicador.className = 'indicador-carga';
    indicador.innerHTML = `
        <div class="carga-contenido">
            <div class="spinner"></div>
            <h3>Procesando tu compra...</h3>
            <p>Por favor espera un momento</p>
        </div>
    `;
    document.body.appendChild(indicador);
}

// Ocultar indicador de carga
function ocultarIndicadorCarga() {
    const indicador = document.getElementById('indicadorCarga');
    if (indicador) {
        indicador.remove();
    }
}

// Mostrar mensaje de compra exitosa
function mostrarMensajeCompraExitosa(total, numeroOrden, fechaEntrega) {
    const mensaje = `
¡Compra realizada exitosamente! 🎉

Número de orden: ${numeroOrden}
Total pagado: $${formatearPrecio(total)}
Fecha estimada de entrega: ${fechaEntrega}

Te hemos enviado un correo de confirmación.
¡Gracias por confiar en CesTec!
    `;
    
    alert(mensaje);
    mostrarNotificacion('¡Compra exitosa! Revisa tu email.', 'success');
}

// Generar número de orden único
function generarNumeroOrden() {
    const fecha = new Date();
    const año = fecha.getFullYear().toString().slice(-2);
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `CES${año}${mes}${dia}${random}`;
}

// Calcular fecha de entrega estimada
function calcularFechaEntrega() {
    const hoy = new Date();
    const entrega = new Date(hoy.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 días
    
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return entrega.toLocaleDateString('es-CO', opciones);
}

// Función para actualizar la visualización de productos después de cambios en stock
function actualizarVisualizacionProductos() {
    // Buscar si existe la función cargarProductos y ejecutarla
    if (typeof cargarProductos === 'function') {
        cargarProductos();
    }
    
    // Si estamos en la página de categorías, actualizar también
    if (typeof cargarCategorias === 'function') {
        cargarCategorias();
    }
}

// Función para guardar productos en localStorage (para persistir cambios de stock)
function guardarProductosEnStorage() {
    try {
        localStorage.setItem('cestec-productos', JSON.stringify(productos));
    } catch (error) {
        console.warn('No se pudo guardar el estado de productos:', error);
    }
}

// Función para cargar productos desde localStorage
function cargarProductosDesdeStorage() {
    try {
        const productosGuardados = localStorage.getItem('cestec-productos');
        if (productosGuardados) {
            const productosParseados = JSON.parse(productosGuardados);
            // Fusionar con productos base para mantener nuevos productos
            productosParseados.forEach(prodGuardado => {
                const prodBase = productos.find(p => p.id === prodGuardado.id);
                if (prodBase) {
                    prodBase.stock = prodGuardado.stock;
                }
            });
        }
    } catch (error) {
        console.warn('No se pudo cargar el estado de productos:', error);
    }
}

// Función para resetear stock (útil para pruebas o administración)
function resetearStock() {
    if (confirm('¿Estás seguro de que quieres resetear todo el stock a los valores originales?')) {
        productos.forEach(producto => {
            if (producto.stockOriginal !== undefined) {
                producto.stock = producto.stockOriginal;
            }
        });
        
        // Vaciar carrito también
        carrito = [];
        
        // Guardar cambios
        guardarProductosEnStorage();
        localStorage.removeItem('cestec-carrito');
        
        // Actualizar UI
        actualizarContadorCarrito();
        actualizarVisualizacionProductos();
        cerrarCarrito();
        
        mostrarNotificacion('Stock reseteado correctamente', 'success');
    }
}

// Obtener resumen del carrito para otras funciones
function obtenerResumenCarrito() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    return {
        items: carrito,
        totalItems: totalItems,
        total: total,
        totalFormateado: formatearPrecio(total)
    };
}

// Event listeners para el modal del carrito
document.addEventListener('DOMContentLoaded', function() {
    // Cargar estado de productos al inicializar
    cargarProductosDesdeStorage();
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarCarrito();
        }
    });
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('carritoModal');
        if (modal && event.target === modal) {
            cerrarCarrito();
        }
    });
    
    // Accesibilidad: permitir tabular dentro del modal
    const modal = document.getElementById('carritoModal');
    if (modal) {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Mantener el foco dentro del modal
                const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        });
    }
    
    // Agregar botón de reset para administración (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Reset Stock';
        resetBtn.style.cssText = 'position:fixed;bottom:10px;right:10px;z-index:9999;padding:10px;background:#ff6b35;color:white;border:none;border-radius:5px;cursor:pointer;';
        resetBtn.onclick = resetearStock;
        document.body.appendChild(resetBtn);
    }
});