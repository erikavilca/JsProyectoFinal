let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let containerPrecio = document.querySelector(`#containerPago`);

let containerCarrito = document.getElementById("containerProductos");
const pintarProducto = (ArraysDeProducto) => {
  containerCarrito.innerHTML = "";
  ArraysDeProducto.forEach((producto) => {
    let productoCarrito = document.createElement("div");
    productoCarrito.className = "itemNuevos";
    productoCarrito.innerHTML = `<img src= "${producto.image}"/>
    <spam class="boxInf">
      <h2>${producto.title} </h2>
      <p>${producto.price}</p>
    <div class="cantidades">
      <button onclick="restarProducto(${producto.id})">
      -</button>
      <spam>${producto.quantity}</spam>
      <button onclick="sumarProducto(${producto.id})">
      +</button>
    </div>
      <button onclick="eliminarProducto(${producto.id})">
      Eliminar</button>
    </spam>`;
    containerCarrito.appendChild(productoCarrito);
  });
};
pintarProducto(carrito);

function totalAPagar() {
  const precioFinal = carrito.reduce(
    (acc, producto) => {
      acc.precioTotal += producto.price * producto.quantity;
      acc.cantidadTotal += producto.quantity;
      return acc;
    },
    { precioTotal: 0, cantidadTotal: 0 }
  );

  if (precioFinal.precioTotal == 0) {
    let CarritoVacio = document.createElement(`div`);
    CarritoVacio.className = "carritoVacio";
    CarritoVacio.innerHTML = `<h4 class="carritoVacio"> ¡Empeza un carrito de compras! </h4>
                              <a href="index.html">
                                  <button class="btnATienda">Descubrir productos</button>
                              </a>`;
    containerCarrito.appendChild(CarritoVacio);
  }

  containerPrecio.innerHTML = "";
  let boxPrecio = document.createElement(`div`);
  boxPrecio.className = "Precio";
  boxPrecio.innerHTML = `
            <span> Productos (${precioFinal.cantidadTotal})</span><br>
            <input type="text" id="validarCupon" placeholder="Escribir el cupon"> 
            <button id="btn" onclick="obtenerValor()"> Enviar </button>
            <p>Total $${Math.round(precioFinal.precioTotal)} </p>`;
  containerPrecio.appendChild(boxPrecio);
}
totalAPagar();

function obtenerValor() {
  let cuponIngresado = document.getElementById("validarCupon");
  let valor = cuponIngresado.value;
  const unicoCupon = "Hol4";
  if (valor == unicoCupon) {
    let Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1600,
    });
    Toast.fire({
      icon: "success",
      title: "Cupon valido",
    });
  }
}
const eliminarProducto = (id) => {
  Swal.fire({
    title: "¿Queres eliminar este producto del carrito?",
    confirmButtonText: "confirmado",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((producto) => producto.id !== id);
      totalAPagar();
      localStorage.setItem("carrito", JSON.stringify(carrito));
      pintarProducto(carrito);
    }
  });
};
const sumarProducto = (id) => {
  let Encontrado = carrito.find((elemento) => elemento.id === id);
  if (Encontrado) {
    Encontrado.quantity += 1;
    totalAPagar();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    pintarProducto(carrito);
  }
};
const restarProducto = (id) => {
  let Encontrado = carrito.find((elemento) => elemento.id === id);
  if (Encontrado && Encontrado.quantity > 1) {
    Encontrado.quantity -= 1;
    totalAPagar();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    pintarProducto(carrito);
  }
};
