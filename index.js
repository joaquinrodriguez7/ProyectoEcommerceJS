const stockProductos = [
  {
    id: 1,
    marca: "Samsung",
    modelo: "Galaxy S22",
    cantidad: 1,
    precio: 235999,
    img: "img/samsung-s22.jpg",
  },
  {
    id: 2,
    marca: "Samsung",
    modelo: "Galaxy S22+",
    cantidad: 1,
    precio: 296999,
    img: "img/samsung-s22+.jpg",
  },
  {
    id: 3,
    marca: "Samsung",
    modelo: "Galaxy S22 Ultra",
    cantidad: 1,
    precio: 362999,
    img: "img/samsung-s22ultra.jpg",
  },
  {
    id: 4,
    marca: "Samsung",
    modelo: "Galaxy Z Flip4",
    cantidad: 1,
    precio: 239999,
    img: "img/samsung-zflip4.jpg",
  },
  {
    id: 5,
    marca: "Motorola",
    modelo: "Edge 30 Neo",
    cantidad: 1,
    precio: 99999,
    img: "img/motorola-edge30neo.jpg",
  },
  {
    id: 6,
    marca: "Motorola",
    modelo: "Edge 30",
    cantidad: 1,
    precio: 119999,
    img: "img/motorola-edge30.jpg",
  },
  {
    id: 7,
    marca: "Motorola",
    modelo: "Edge 30 Pro",
    cantidad: 1,
    precio: 189999,
    img: "img/motorola-edge30pro.jpg",
  },
  {
    id: 8,
    marca: "Motorola",
    modelo: "Edge 30 Ultra",
    cantidad: 1,
    precio: 229999,
    img: "img/motorola-edge30ultra.jpg",
  },
  {
    id: 9,
    marca: "Apple",
    modelo: "iPhone 13 Mini",
    cantidad: 1,
    precio: 615999,
    img: "img/iphone13mini.jpg",
  },
  {
    id: 10,
    marca: "Apple",
    modelo: "iPhone 13",
    cantidad: 1,
    precio: 617999,
    img: "img/iphone13.jpg",
  },
  {
    id: 11,
    marca: "Apple",
    modelo: "iPhone 13 Pro",
    cantidad: 1,
    precio: 681999,
    img: "img/iphone13pro.jpg",
  },
  {
    id: 12,
    marca: "Apple",
    modelo: "iPhone 13 Pro Max",
    cantidad: 1,
    precio: 816999,
    img: "img/iphone13promax.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarrito();
if(activarFuncion){
  document.querySelector("#activarFuncion").click(procesarPedido);
}});

if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Agrega un producto para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, marca, modelo, precio, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3 justify-content-center col-md-3 bg-white">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body row justify-content-evenly">
      <h4 class="card-text"> $ ${precio}</h4>
      <h6 class="card-title">${marca} ${modelo}</h6>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-dark" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>`;
  };
});
 
const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, marca, modelo, precio, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor articulo">
        <div>
          <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
          <p class="fw-bold">${marca} ${modelo}</p>
          <p>Precio: $ ${precio}</p>
          <p>Cantidad :${cantidad}</p>
          <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>`;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center fs-3">¡El carrito está vacio!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const prodId = id;
  carrito = carrito.filter((prod) => prod.id !== prodId);
  mostrarCarrito();
}

function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, marca, modelo, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
      <td>
        <img class="img-fluid img-carrito" src="${img}"/>
      </td>
        <td class="fw-bold">${marca} ${modelo}</td>
        <td>$ ${precio}</td>
        <td>${cantidad}</td>
        <td>$ ${precio * cantidad}</td>
    `;
      listaCompra.appendChild(row);
    }
  });

  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const persona = document.querySelector('#persona').value
   const email = document.querySelector('#correo').value

   if(email === '' || persona == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {
  const btn = document.getElementById('button');
  btn.value = 'Enviando...';
  const serviceID = 'default_service';
  const templateID = 'template_nij8umi';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }

function consultaServer() {
fetch("https://63474c76db76843976a9972c.mockapi.io/Celulares")
  .then(res => res.json())
  .then(response => console.log(response))
}


consultaServer()