let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  const getProduct = fetch("https://fakestoreapi.com/products");
  getProduct
    .then((res) => res.json())
    .then((res) => {
      productos = res;
      pintarProducto(productos);
      console.log(productos);
    });
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //se van agregado segun cunado producto elija el usuario.

const pintarProducto = (ArraysDeProducto) => {
  let container = document.getElementById("container");
  container.innerHTML = "";
  ArraysDeProducto.forEach((producto) => {
    let productoCarrito = document.createElement("div");
    productoCarrito.className = "itemNuevos";
    productoCarrito.innerHTML = `<img src= "${producto.image}"/>
      <h2>${producto.title} </h2>
      <span>${producto.price}</span><br>

      <button onclick="agregarAlCarrito(${producto.id})">
      agregar</button>`;
    container.appendChild(productoCarrito);
  });
};
pintarProducto(productos);

const agregarAlCarrito = (id) => {
  let producto = productos.find((elemento) => elemento.id === id);
  let EncontradoEnCarrito = carrito.find((elemento) => elemento.id === id);

  if (EncontradoEnCarrito) {
    EncontradoEnCarrito.quantity += 1;
  } else {
    carrito.push({ ...producto, quantity: 1 });
  }

  let cartel = Swal.mixin({
    cartel: true,
    position: "center",
    timer: 1000,
    showConfirmButton: false,
  });
  cartel.fire({
    title: "se agrego con exito al carrito",
    icon: "success",
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

let inputBuscador = document.getElementById("buscador");
if (inputBuscador) {
  inputBuscador.addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    let filtroProducto = productos.filter((producto) =>
      producto.title.toLowerCase().includes(value)
    );
    pintarProducto(filtroProducto);
  });
}

const formulario = document.getElementById("Filtrado1");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  function obtenerSeleccion(nombre) {
    const radios = document.querySelectorAll(`input[name="${nombre}"]`);
    let seleccionado;
    radios.forEach((radio) => {
      if (radio.checked) {
        seleccionado = radio.value;
      }
    });
    return seleccionado;
  }
  let resultadoDeCategoria = obtenerSeleccion("category");
  if (resultadoDeCategoria) {
    let final = productos.filter(
      (producto) => producto.category == resultadoDeCategoria
    );
    pintarProducto(final);
  }
});

const formulario2 = document.getElementById("Filtrado2");
formulario2.addEventListener("submit", function (event) {
  event.preventDefault();
  function obtenerSeleccion(nombre) {
    const radios = document.querySelectorAll(`input[name="${nombre}"]`);
    let seleccionado;
    radios.forEach((radio) => {
      if (radio.checked) {
        seleccionado = radio.value;
      }
    });
    return seleccionado;
  }
  let resultadoDePrecio = obtenerSeleccion("price");
  if (resultadoDePrecio == "60") {
    let final = productos.filter((producto) => producto.price < 60);
    pintarProducto(final);
  } else if (resultadoDePrecio == "menorPrecio") {
    pintarProducto(productos.sort((a, b) => a.price - b.price));
  } else if (resultadoDePrecio == "mayorPrecio") {
    pintarProducto(productos.sort((a, b) => b.price - a.price));
  }
});
