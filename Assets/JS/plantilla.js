

let slideIndex = 0;

function mostrarSlide(n) {
    const slides = document.getElementsByClassName("slide");

    // Vuelve al primer slide si llega al final
    if (n >= slides.length) {
        slideIndex = 0;
    }

    // Vuelve al último slide si retrocede desde el primero
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Oculta todos los slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Muestra el slide actual
    slides[slideIndex].style.display = "block";
}

function cambiarSlide(n) {
    // Cambia al siguiente o anterior slide
    slideIndex += n;
    mostrarSlide(slideIndex);
}

// Inicia el carrusel al cargar la página
mostrarSlide(slideIndex);


// Modificación en la función API_call
const API_call = async (productId, container) => {
    try {
        const APIResponse = await fetch(`http://fakestoreapi.com/products/${productId}`);
        const product = await APIResponse.json();

        const productContainer = document.querySelector(container);
        productContainer.innerHTML += `
            <div class="producto">
                <img src="${product.image}" alt="${product.title}" class="producto-img" style="height:300px; width:300px">
                <h3 class="nombre-producto">${product.title}</h3>
                <p class="precio-producto">$${product.price}</p>
                <button class="btn-carrito" onclick="agregarAlCarrito('${product.title}', '${product.description}', '${product.image}', ${product.price})">Añadir al carrito</button>
            </div>
        `;
    } catch (error) {
        console.error("Producto no existe:", error);
    }
};

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, descripcion, imagen, precio) {
    alert(`Se ha añadido "${nombre}" al carrito`);
    
    // Obtener la lista de productos del carrito desde localStorage o inicializarla como un array vacío
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Agregar el producto actual al carrito
    carrito.push({ nombre, descripcion, imagen, precio });
    
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Redirigir a la página del carrito
    //window.location.href = 'carrito2.html';
}



// Llamadas a la API para los productos
for (let i = 1; i <= 9; i++) {
    const columna = i <= 3 ? "columna1" : i <= 6 ? "columna2" : "columna3";
    API_call(i, `#${columna}`);
}


// Obtén el botón "Carrito" por su ID
const btnCarrito = document.getElementById('btnCarrito');

// Agrega un evento de clic al botón
btnCarrito.addEventListener('click', function() {
    // Redirige a la página del carrito
    window.location.href = 'carrito.html';
});


