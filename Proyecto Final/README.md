# Super E-Commerce - Proyecto Final

Este proyecto es una aplicación web de e-commerce totalmente funcional, desarrollada como el proyecto final para el curso Full-Stack de Talento Tech. La aplicación consume datos de una API externa para mostrar productos y permite a los usuarios gestionar un carrito de compras persistente.

## Ver el Proyecto en Vivo

Puedes ver el sitio desplegado y funcionando en el siguiente enlace:

[**https://thbernardo.github.io/talento-tech/**](https://thbernardo.github.io/talento-tech/)

---

## Características Principales

* **Catálogo Dinámico de Productos:** Los productos se cargan dinámicamente desde la API `dummyjson.com` usando `fetch` y se renderizan como tarjetas interactivas.
* **Carrito de Compras Funcional:** Los usuarios pueden agregar productos al carrito, ver el contenido, eliminar ítems y vaciar el carrito por completo.
* **Persistencia de Datos:** El estado del carrito se guarda en `localStorage`, por lo que la selección del usuario no se pierde al recargar o cerrar la página.
* **Interfaz Responsiva:** Construido con Bootstrap, el diseño se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio.
* **Modo Claro y Oscuro:** Incluye un interruptor para cambiar entre un tema claro y uno oscuro, mejorando la experiencia de usuario.
* **Notificaciones Visuales:** Un tooltip sutil informa al usuario cuando un producto ha sido agregado al carrito.

---

## Tecnologías Utilizadas

* **HTML5:** Para la estructura semántica del contenido.
* **CSS3:** Para estilos personalizados, animaciones y el sistema de modo claro/oscuro.
* **Bootstrap 5:** Utilizado como framework principal para la maquetación responsiva, componentes de UI (Navbar, Cards, Offcanvas) y sistema de grillas.
* **JavaScript (ES6+):** Para toda la lógica de la aplicación, incluyendo:
    * Manipulación del DOM para renderizar contenido dinámico.
    * Manejo de eventos para la interactividad del usuario.
    * Consumo de APIs con `fetch` y manejo de promesas con `async/await`.
    * Uso de `localStorage` para la persistencia de datos del lado del cliente.

---

## Autor

* **Thomas Bernardo**

---