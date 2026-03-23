// ============================================
// FUNCIONES PARA MOSTRAR DATOS
// ============================================

// Variable para controlar el carrusel
let carruselIndex = 0;
let habitacionesCargadas = [];

// Función para convertir Buffer a string si es necesario
function obtenerUrlImagen(valor) {
    if (!valor) return 'assets/images/default.svg';
    if (typeof valor === 'string') return valor;
    // Si es un Buffer, convertirlo a string (para el navegador)
    if (valor.type === 'Buffer' && valor.data) {
        // Convertir el array de bytes a string manualmente
        let str = '';
        for (let i = 0; i < valor.data.length; i++) {
            str += String.fromCharCode(valor.data[i]);
        }
        return str;
    }
    return 'assets/images/default.svg';
}

function mostrarHabitacionesSidebar(habitaciones) {
    const gridContenedor = document.getElementById('habitaciones-gallery-grid');
    const carouselTrack = document.getElementById('carousel-track');
    
    if (!gridContenedor && !carouselTrack) return;
    
    console.log('Cargando miniaturas en sidebar:', habitaciones);
    
    if (!habitaciones || habitaciones.length === 0) {
        if (gridContenedor) {
            gridContenedor.innerHTML = '<p class="mensaje-vacio">No hay habitaciones disponibles</p>';
        }
        return;
    }
    
    // Guardar habitaciones para el carrusel
    habitacionesCargadas = habitaciones;
    
    // Renderizar Grid
    if (gridContenedor) {
        gridContenedor.innerHTML = '';
        
        habitaciones.forEach(habitacion => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => verDetalles(habitacion.IDHabitacion || habitacion.id);
            
            // Usar la función para obtener la URL correcta
            const imagen = obtenerUrlImagen(habitacion.ImagenHabitacion);
            
            item.innerHTML = `
                <img src="${imagen}" alt="${habitacion.NombreHabitacion}" 
                     onerror="this.src='assets/images/default.svg'">
                <div class="gallery-item-info">
                    <h4>${habitacion.NombreHabitacion}</h4>
                    <p class="precio">$${habitacion.Costo}/noche</p>
                </div>
            `;
            gridContenedor.appendChild(item);
        });
    }
    
        // Renderizar Carrusel
    if (carouselTrack) {
        carouselTrack.innerHTML = '';
        
        habitaciones.forEach(habitacion => {
            const slide = document.createElement('li');
            slide.className = 'carousel-slide';
            
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => verDetalles(habitacion.IDHabitacion || habitacion.id);
            
            // Usar la función para obtener la URL correcta
            const imagen = obtenerUrlImagen(habitacion.ImagenHabitacion);
            
            item.innerHTML = `
                <img src="${imagen}" alt="${habitacion.NombreHabitacion}" 
                     onerror="this.src='assets/images/default.svg'">
                <div class="gallery-item-info">
                    <h4>${habitacion.NombreHabitacion}</h4>
                    <p class="precio">$${habitacion.Costo}/noche</p>
                </div>
            `;
            
            slide.appendChild(item);
            carouselTrack.appendChild(slide);
        });
        
        // Reiniciar índice del carrusel
        carruselIndex = 0;
    }
}

// Función para cambiar entre vista grid y carrusel
function cambiarVista(vista) {
    const gridViewBtn = document.getElementById('gallery-grid-view');
    const carouselViewBtn = document.getElementById('gallery-carousel-view');
    const gridContenedor = document.getElementById('habitaciones-gallery-grid');
    const carouselContenedor = document.getElementById('habitaciones-gallery-carousel');
    
    if (vista === 'grid') {
        gridViewBtn.classList.add('active');
        carouselViewBtn.classList.remove('active');
        gridContenedor.style.display = 'grid';
        carouselContenedor.style.display = 'none';
    } else {
        gridViewBtn.classList.remove('active');
        carouselViewBtn.classList.add('active');
        gridContenedor.style.display = 'none';
        carouselContenedor.style.display = 'flex';
    }
}

// Función para mover el carrusel
function moverCarrusel(direccion) {
    const track = document.getElementById('carousel-track');
    if (!track || habitacionesCargadas.length === 0) return;
    
    carruselIndex += direccion;
    
    // Ciclar el índice
    if (carruselIndex < 0) {
        carruselIndex = habitacionesCargadas.length - 1;
    } else if (carruselIndex >= habitacionesCargadas.length) {
        carruselIndex = 0;
    }
    
    // Mover el track
    track.style.transform = `translateX(-${carruselIndex * 100}%)`;
}

// Función para cargar habitaciones en el sidebar
async function cargarHabitacionesSidebar() {
    console.log('Cargando miniaturas para sidebar...');
    try {
        const habitaciones = await obtenerHabitaciones();
        console.log('Miniaturas obtenidas:', habitaciones);
        mostrarHabitacionesSidebar(habitaciones);
    } catch (error) {
        console.error('Error al cargar miniaturas:', error);
        const gridContenedor = document.getElementById('habitaciones-gallery-grid');
        if (gridContenedor) {
            gridContenedor.innerHTML = '<p class="mensaje-vacio">Error al cargar</p>';
        }
    }
}

// Función para mostrar clientes en el sidebar
function mostrarClientesSidebar(clientes) {
    const gridContenedor = document.getElementById('clientes-gallery-grid');
    if (!gridContenedor) return;
    
    console.log('Cargando clientes en sidebar:', clientes);
    
    if (!clientes || clientes.length === 0) {
        gridContenedor.innerHTML = '<p class="mensaje-vacio">No hay clientes registrados</p>';
        return;
    }
    
    gridContenedor.innerHTML = '';
    
    clientes.forEach(cliente => {
        const item = document.createElement('div');
        item.className = 'cliente-item';
        
        // Determinar el nombre a mostrar
        const nombre = cliente.NombreCliente || cliente.Nombre || cliente.nombre || 'Sin nombre';
        const email = cliente.EmailCliente || cliente.Email || cliente.email || 'Sin email';
        
        item.innerHTML = `
            <div class="cliente-item-info">
                <h4>${nombre}</h4>
                <p>${email}</p>
            </div>
        `;
        gridContenedor.appendChild(item);
    });
}

// Función para cargar clientes en el sidebar
async function cargarClientesSidebar() {
    console.log('Cargando clientes para sidebar...');
    try {
        const clientes = await obtenerClientes();
        console.log('Clientes obtenidos:', clientes);
        mostrarClientesSidebar(clientes);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        const gridContenedor = document.getElementById('clientes-gallery-grid');
        if (gridContenedor) {
            gridContenedor.innerHTML = '<p class="mensaje-vacio">Error al cargar</p>';
        }
    }
}

// Función para registrar un nuevo cliente
async function registrarCliente(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('cliente-nombre').value;
    const email = document.getElementById('cliente-email').value;
    const telefono = document.getElementById('cliente-telefono').value;
    const direccion = document.getElementById('cliente-direccion').value;
    
    const mensajeDiv = document.getElementById('mensaje-registro-cliente');
    
    try {
        const response = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NombreCliente: nombre,
                EmailCliente: email,
                TelefonoCliente: telefono,
                DireccionCliente: direccion
            })
        });
        
        if (response.ok) {
            mensajeDiv.textContent = 'Cliente registrado exitosamente';
            mensajeDiv.className = 'mensaje-registro exito';
            
            // Limpiar formulario
            document.getElementById('form-registro-cliente').reset();
            
            // Recargar lista de clientes
            cargarClientesSidebar();
            
            // Ocultar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeDiv.textContent = '';
                mensajeDiv.className = 'mensaje-registro';
            }, 3000);
        } else {
            throw new Error('Error al registrar cliente');
        }
    } catch (error) {
        console.error('Error:', error);
        mensajeDiv.textContent = 'Error al registrar cliente';
        mensajeDiv.className = 'mensaje-registro error';
    }
}

// Configurar formulario de registro de clientes
function configurarFormularioRegistroCliente() {
    const formulario = document.getElementById('form-registro-cliente');
    if (formulario) {
        formulario.addEventListener('submit', registrarCliente);
    }
}

function mostrarHabitaciones(habitaciones) {
    const contenedor = document.getElementById('habitaciones');
    if (!contenedor) return;
    
    console.log('Habitaciones recibidas:', habitaciones);
    contenedor.innerHTML = '';
    
    if (!habitaciones || habitaciones.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No hay habitaciones disponibles</p>';
        return;
    }
    
    habitaciones.forEach(habitacion => {
        const card = document.createElement('div');
        card.className = 'habitacion-card';
        // Usar la función para obtener la URL correcta
        const imagenUrl = obtenerUrlImagen(habitacion.ImagenHabitacion);
        card.innerHTML = `
            <div class="habitacion-imagen">
                <img src="${imagenUrl}" 
                     alt="${habitacion.NombreHabitacion}"
                     onerror="this.src='assets/images/default.svg'">
            </div>
            <div class="habitacion-info">
                <h3>${habitacion.NombreHabitacion}</h3>
                <p class="descripcion">${habitacion.Descripcion || 'Sin descripción'}</p>
                <p class="precio">$${habitacion.Costo} / noche</p>
                <span class="estado ${String(habitacion.Estado || 'disponible').toLowerCase()}">${habitacion.Estado || 'disponible'}</span>
                <button onclick="verDetalles(${habitacion.IDHabitacion})" class="btn-ver">Ver Detalles</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

function mostrarClientes(clientes) {
    const contenedor = document.getElementById('clientes');
    if (!contenedor) return;
    
    console.log('Clientes recibidos:', clientes);
    contenedor.innerHTML = '';
    
    if (!clientes || clientes.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No hay clientes registrados</p>';
        return;
    }
    
    clientes.forEach(cliente => {
        const card = document.createElement('div');
        card.className = 'cliente-card';
        card.innerHTML = `
            <h3>${cliente.NombreCliente || 'Cliente'}</h3>
            <p><strong>Email:</strong> ${cliente.EmailCliente || 'Sin email'}</p>
            <p><strong>Teléfono:</strong> ${cliente.TelefonoCliente || 'Sin teléfono'}</p>
            <p><strong>ID:</strong> ${cliente.IDCliente}</p>
        `;
        contenedor.appendChild(card);
    });
}

function mostrarReservas(reservas) {
    const contenedor = document.getElementById('reservas');
    if (!contenedor) return;
    
    console.log('Reservas recibidas:', reservas);
    contenedor.innerHTML = '';
    
    if (!reservas || reservas.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No hay reservas registradas</p>';
        return;
    }
    
    reservas.forEach(reserva => {
        const card = document.createElement('div');
        card.className = 'reserva-card';
        card.innerHTML = `
            <h3>Reserva #${reserva.IDReserva || reserva.id}</h3>
            <p><strong>Cliente:</strong> ${reserva.NombreCliente || reserva.cliente_id}</p>
            <p><strong>Habitación:</strong> ${reserva.IDHabitacion || reserva.habitacion_id}</p>
            <p><strong>Entrada:</strong> ${reserva.FechaEntrada ? new Date(reserva.FechaEntrada).toLocaleDateString() : reserva.fecha_entrada}</p>
            <p><strong>Salida:</strong> ${reserva.FechaSalida ? new Date(reserva.FechaSalida).toLocaleDateString() : reserva.fecha_salida}</p>
            <span class="estado ${(reserva.Estado || 'pendiente').toLowerCase()}">${reserva.Estado || 'pendiente'}</span>
        `;
        contenedor.appendChild(card);
    });
}

function mostrarServicios(servicios) {
    const contenedor = document.getElementById('servicios');
    if (!contenedor) return;
    
    console.log('Servicios recibidos:', servicios);
    contenedor.innerHTML = '';
    
    if (!servicios || servicios.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No hay servicios disponibles</p>';
        return;
    }
    
    servicios.forEach(servicio => {
        const card = document.createElement('div');
        card.className = 'servicio-card';
        card.innerHTML = `
            <h3>${servicio.NombreServicio}</h3>
            <p>${servicio.Descripcion || 'Sin descripción'}</p>
            <p class="precio">$${servicio.Costo}</p>
        `;
        contenedor.appendChild(card);
    });
}

// ============================================
// FUNCIONES DE CARGA
// ============================================

async function cargarHabitaciones() {
    console.log('Cargando habitaciones...');
    const habitaciones = await obtenerHabitaciones();
    console.log('Habitaciones obtenidas:', habitaciones);
    mostrarHabitaciones(habitaciones);
}

async function cargarClientes() {
    console.log('Cargando clientes...');
    const clientes = await obtenerClientes();
    console.log('Clientes obtenidos:', clientes);
    mostrarClientes(clientes);
}

async function cargarReservas() {
    console.log('Cargando reservas...');
    const reservas = await obtenerReservas();
    console.log('Reservas obtenidas:', reservas);
    mostrarReservas(reservas);
}

async function cargarServicios() {
    console.log('Cargando servicios...');
    const servicios = await obtenerServicios();
    console.log('Servicios obtenidos:', servicios);
    mostrarServicios(servicios);
}

// ============================================
// FUNCIONES DE INTERACCIÓN
// ============================================

function verDetalles(id) {
    console.log('Ver detalles de habitación:', id);
    // Aquí puedes redirigir a una página de detalles
    // window.location.href = `pages/detalle.html?id=${id}`;
    alert(`Ver detalles de habitación ID: ${id}`);
}

// ============================================
// INICIALIZAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada, conectando con backend...');
    console.log('Backend URL:', 'http://localhost:3000/api');
    
    // Cargar datos según la página actual
    if (document.getElementById('habitaciones')) {
        cargarHabitaciones();
    }
    
    if (document.getElementById('clientes')) {
        cargarClientes();
    }
    
    if (document.getElementById('reservas')) {
        cargarReservas();
    }
    
    if (document.getElementById('servicios')) {
        cargarServicios();
    }
    
    // Cargar miniaturas en el sidebar
    if (document.getElementById('habitaciones-gallery-grid')) {
        cargarHabitacionesSidebar();
        
        // Configurar botones de cambio de vista
        const gridViewBtn = document.getElementById('gallery-grid-view');
        const carouselViewBtn = document.getElementById('gallery-carousel-view');
        
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => cambiarVista('grid'));
        }
        
        if (carouselViewBtn) {
            carouselViewBtn.addEventListener('click', () => cambiarVista('carousel'));
        }
    }
    
    // Cargar clientes en el sidebar
    if (document.getElementById('clientes-gallery-grid')) {
        cargarClientesSidebar();
    }
    
    // Configurar formulario de registro de clientes
    configurarFormularioRegistroCliente();
});
