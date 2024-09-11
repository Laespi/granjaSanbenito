// Selección de elementos del DOM
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.productos'); // Ajuste para la lista de productos
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Array para almacenar productos en el carrito
let allProducts = [];

// Función para mostrar el contenido del carrito
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML de los productos
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product'); // Asegúrate de usar 'cart-product' para el contenedor del producto en el carrito

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="producto-titulo">${product.title}</p>
                <span class="producto-precio">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += parseFloat(product.price.slice(1)) * product.quantity; // Asegúrate de usar parseFloat para convertir el precio
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total.toFixed()}`; // Mostrar total con dos decimales
    countProducts.innerText = totalOfProducts;
};

// Mostrar y ocultar el carrito al hacer clic en el icono
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Agregar productos al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('producto-agregar')) {
        const product = e.target.closest('.image-container'); // Usar closest para asegurar que se seleccione el contenedor correcto

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('.producto-titulo').textContent,
            price: product.querySelector('.producto-precio').textContent,
        };

        const exists = allProducts.some(p => p.title === infoProduct.title);

        if (exists) {
            allProducts = allProducts.map(p => {
                if (p.title === infoProduct.title) {
                    p.quantity++;
                }
                return p;
            });
        } else {
            allProducts.push(infoProduct);
        }

        showHTML();
    }
});

// Eliminar productos del carrito
document.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.producto-titulo').textContent;

        allProducts = allProducts.filter(p => p.title !== title);

        showHTML();
    }
});
