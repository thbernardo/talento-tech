document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
    cargarCarrito();
    actualizarInterfazCarrito();
    
    const botonFinalizar = document.getElementById('btn-finalize');
    const botonVaciar = document.getElementById('btn-empty-cart');
    const botonCambiarTema = document.getElementById('theme-toggle');

    botonFinalizar.addEventListener('click', finalizarCompra);
    botonVaciar.addEventListener('click', vaciarCarrito);
    botonCambiarTema.addEventListener('click', cambiarTema);

    aplicarTemaGuardado();
});

const URL_API = 'https://dummyjson.com/products';
let todosLosProductos = [];
let carrito = [];
let temporizadorTooltip;

async function obtenerProductos() {
    try {
        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();
        todosLosProductos = datos.products;
        renderizarProductos(todosLosProductos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

function renderizarProductos(productos) {
    const contenedorProductos = document.getElementById('productos-container');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        const tarjetaProductoHTML = `
            <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text text-muted small">${producto.description}</p>
                        <p class="card-text fs-4 text-primary mt-auto">$${producto.price}</p>
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.innerHTML += tarjetaProductoHTML;
    });
}

function agregarAlCarrito(idProducto) {
    const productoParaAgregar = todosLosProductos.find(producto => producto.id === idProducto);
    if (!productoParaAgregar) return;

    const itemEnCarrito = carrito.find(item => item.id === idProducto);
    if (itemEnCarrito) {
        itemEnCarrito.quantity++;
    } else {
        carrito.push({ ...productoParaAgregar, quantity: 1 });
    }

    guardarCarrito();
    actualizarInterfazCarrito();
    mostrarTooltip();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    actualizarInterfazCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('shoppingCart');
    actualizarInterfazCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    alert('¡Gracias por tu compra!');
    vaciarCarrito();
    const panelCarrito = bootstrap.Offcanvas.getInstance('#offcanvasCart');
    panelCarrito.hide();
}

function guardarCarrito() {
    localStorage.setItem('shoppingCart', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('shoppingCart');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}
function actualizarInterfazCarrito() {
    actualizarContadorCarrito();
    renderizarItemsCarrito();
}

function actualizarContadorCarrito() {
    const contadorCarritoEl = document.getElementById('cart-count');
    const cantidadTotal = carrito.reduce((total, item) => total + item.quantity, 0);
    contadorCarritoEl.textContent = cantidadTotal;
}

function renderizarItemsCarrito() {
    const cuerpoCarritoEl = document.getElementById('cart-body');
    const totalCarritoEl = document.getElementById('cart-total');
    cuerpoCarritoEl.innerHTML = '';

    if (carrito.length === 0) {
        cuerpoCarritoEl.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        totalCarritoEl.textContent = '0.00';
        return;
    }

    let totalGeneral = 0;
    carrito.forEach(item => {
        const totalItem = item.price * item.quantity;
        totalGeneral += totalItem;
        const itemCarritoHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <img src="${item.thumbnail}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                <div class="mx-2 flex-grow-1">
                    <h6 class="my-0 small">${item.title}</h6>
                    <small class="text-muted">Cantidad: ${item.quantity}</small>
                </div>
                <span class="fw-bold">$${totalItem.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm ms-2" onclick="eliminarDelCarrito(${item.id})">X</button>
            </div>
        `;
        cuerpoCarritoEl.innerHTML += itemCarritoHTML;
    });

    totalCarritoEl.textContent = totalGeneral.toFixed(2);
}
function mostrarTooltip() {
    const tooltipEl = document.getElementById('added-tooltip');
    tooltipEl.classList.add('show');
    
    clearTimeout(temporizadorTooltip);

    temporizadorTooltip = setTimeout(() => {
        tooltipEl.classList.remove('show');
    }, 1500);
}

function cambiarTema() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem('theme');
    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}