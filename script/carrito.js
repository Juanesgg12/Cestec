// carrito.js - Funcionalidad específica del carrito de compras
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
        return `
            <div class="carrito-item">
                <div class="item-imagen">
                    <img src="${item.imagen}" alt="${item.nombre}" width="60" height="60" loading="lazy">
                </div>
                <div class="item-info">
                    <h4>${item.nombre}</h4>
                    <p class="item-precio-unitario">$${formatearPrecio(item.precio)} c/u</p>
                </div>
                <div class="item-controles">
                    <div class="cantidad-controles">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)" aria-label="Disminuir cantidad">-</button>
                        <span class="cantidad-display">${item.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)" aria-label="Aumentar cantidad">+</button>
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
    const producto = carrito.find(p => p.id === productId);
    const productoOriginal = productos.find(p => p.id === productId);
    
    if (!producto) return;
    
    const nuevaCantidad = producto.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(productId);
        return;
    }
    
    // Verificar stock si está definido
    if (productoOriginal && productoOriginal.stock !== undefined && nuevaCantidad > productoOriginal.stock) {
        mostrarNotificacion('No hay más stock disponible', 'warning');
        return;
    }
    
    producto.cantidad = nuevaCantidad;
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    actualizarCarritoModal();
}

// Eliminar producto específico del carrito
function eliminarDelCarrito(productId) {
    const producto = carrito.find(p => p.id === productId);
    if (!producto) return;
    
    // Mostrar confirmación solo si hay más de 1 producto
    if (producto.cantidad > 1) {
        if (!confirm(`¿Eliminar todas las ${producto.cantidad} unidades de ${producto.nombre}?`)) {
            return;
        }
    }
    
    carrito = carrito.filter(p => p.id !== productId);
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    actualizarCarritoModal();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

// Vaciar todo el carrito
function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito ya está vacío', 'info');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
        carrito = [];
        localStorage.removeItem('cestec-carrito');
        actualizarContadorCarrito();
        actualizarCarritoModal();
        mostrarNotificacion('Carrito vaciado correctamente', 'success');
    }
}

// Proceder al pago
function procederPago() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'warning');
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
        `TOTAL: ${formatearPrecio(total)}\n\n` +
        `¿Deseas proceder con el pago?`
    );
    
    if (confirmarCompra) {
        procesarCompra(total);
    }
}

// Procesar la compra (simulación)
function procesarCompra(total) {
    // Mostrar indicador de carga
    mostrarIndicadorCarga();
    
    // Simular procesamiento de pago
    setTimeout(() => {
        // Simular actualización de stock
        actualizarStockDespuesCompra();
        
        // Mostrar mensaje de éxito
        mostrarMensajeCompraExitosa(total);
        
        // Limpiar carrito
        carrito = [];
        localStorage.removeItem('cestec-carrito');
        actualizarContadorCarrito();
        cerrarCarrito();
        
        // Recargar productos si estamos en la página de productos
        const container = document.getElementById('productosContainer');
        if (container && typeof cargarProductos === 'function') {
            cargarProductos();
        }
        
        ocultarIndicadorCarga();
    }, 2000);
}

// Mostrar indicador de carga durante el procesamiento
function mostrarIndicadorCarga() {
    const indicador = document.createElement('div');
    indicador.id = 'indicadorCarga';
    indicador.innerHTML = `
        <div class="carga-overlay">
            <div class="carga-contenido">
                <div class="spinner"></div>
                <h3>Procesando tu compra...</h3>
                <p>Por favor espera un momento</p>
            </div>
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
function mostrarMensajeCompraExitosa(total) {
    const numeroOrden = generarNumeroOrden();
    const fechaEntrega = calcularFechaEntrega();
    
    const mensaje = `
        ¡Compra realizada exitosamente! 🎉
        
        Número de orden: ${numeroOrden}
        Total pagado: ${formatearPrecio(total)}
        Fecha estimada de entrega: ${fechaEntrega}
        
        Te hemos enviado un correo de confirmación.
        ¡Gracias por confiar en CesTec!
    `;
    
    alert(mensaje);
}

// Actualizar stock después de la compra (simulación)
function actualizarStockDespuesCompra() {
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto && producto.stock !== undefined) {
            producto.stock = Math.max(0, producto.stock - item.cantidad);
        }
    });
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

// Buscar producto en carrito
function buscarEnCarrito(productId) {
    return carrito.find(item => item.id === productId);
}

// Verificar si hay productos con stock bajo en el carrito
function verificarStockBajo() {
    const productosStockBajo = carrito.filter(item => {
        const productoOriginal = productos.find(p => p.id === item.id);
        return productoOriginal && productoOriginal.stock !== undefined && productoOriginal.stock < 5;
    });
    
    if (productosStockBajo.length > 0) {
        const nombres = productosStockBajo.map(p => p.nombre).join(', ');
        mostrarNotificacion(`¡Atención! Productos con stock bajo: ${nombres}`, 'warning');
    }
}

// Calcular descuentos (función para futuras implementaciones)
function calcularDescuentos() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    let descuento = 0;
    
    // Descuento por compra mayor a $5,000,000
    if (total >= 5000000) {
        descuento = total * 0.1; // 10% de descuento
    }
    // Descuento por compra mayor a $3,000,000
    else if (total >= 3000000) {
        descuento = total * 0.05; // 5% de descuento
    }
    
    return {
        total: total,
        descuento: descuento,
        totalConDescuento: total - descuento
    };
}

// Validar carrito antes del checkout
function validarCarrito() {
    const errores = [];
    
    carrito.forEach(item => {
        const productoOriginal = productos.find(p => p.id === item.id);
        
        if (!productoOriginal) {
            errores.push(`Producto ${item.nombre} ya no está disponible`);
        } else if (productoOriginal.stock !== undefined) {
            if (productoOriginal.stock === 0) {
                errores.push(`${item.nombre} está agotado`);
            } else if (item.cantidad > productoOriginal.stock) {
                errores.push(`Solo hay ${productoOriginal.stock} unidades de ${item.nombre}`);
            }
        }
    });
    
    return {
        esValido: errores.length === 0,
        errores: errores
    };
}

// Exportar carrito (para respaldo o transferencia)
function exportarCarrito() {
    const resumen = obtenerResumenCarrito();
    const datosExport = {
        carrito: carrito,
        fecha: new Date().toISOString(),
        total: resumen.total,
        totalItems: resumen.totalItems
    };
    
    const dataStr = JSON.stringify(datosExport, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `carrito_cestec_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Importar carrito desde archivo
function importarCarrito(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            
            if (datos.carrito && Array.isArray(datos.carrito)) {
                // Validar que los productos importados existan
                const carritoValido = datos.carrito.filter(item => 
                    productos.find(p => p.id === item.id)
                );
                
                if (carritoValido.length > 0) {
                    carrito = carritoValido;
                    guardarCarritoEnStorage();
                    actualizarContadorCarrito();
                    if (document.getElementById('carritoModal').style.display === 'block') {
                        actualizarCarritoModal();
                    }
                    mostrarNotificacion('Carrito importado correctamente', 'success');
                } else {
                    mostrarNotificacion('No se encontraron productos válidos', 'error');
                }
            } else {
                mostrarNotificacion('Formato de archivo inválido', 'error');
            }
        } catch (error) {
            mostrarNotificacion('Error al leer el archivo', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Event listeners para el modal del carrito
document.addEventListener('DOMContentLoaded', function() {
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
});