//visualizo lo que hay en carrito cada vez que cierro y abro mediante modal y estilos
const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h1 class="modal-header-title">Carrito</h1>
  `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  //aplico estilo de css para cerrar

  modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  //recorremos lo que hay en el carrito

  carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
          <img src="${product.imagen}">
          <h3>${product.nombre}</h3>
          <p>€${product.precio}</p>
          <span class="restar"> - </span>
          <p>Cantidad: ${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: €${product.cantidad * product.precio}</p>
          <span class="delete-product"> ❌ </span>
        `;

  modalContainer.append(carritoContent);

  let restar = carritoContent.querySelector(".restar");

  restar.addEventListener("click", () => {
    if (product.cantidad !== 1) {
      product.cantidad--;
    }
    saveLocal();
    pintarCarrito();
  });

  let sumar = carritoContent.querySelector(".sumar");
  sumar.addEventListener("click", () => {
    product.cantidad++;
    saveLocal();
    pintarCarrito();
  });

  let eliminar = carritoContent.querySelector(".delete-product");

  eliminar.addEventListener("click", () => {
    eliminarProducto(product.id);
  });

});

//uso metodo reduce para ver el total del carrito, recibiendo dos parametros, acc (acumulador) y el (productos)

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0); //reduce calcula total

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total a pagar:€${total}`;
  modalContainer.append(totalBuying);
};
 
//utilizo metodo find (para buscar el producto id que el usuario quiere eliminar) y filter para que busque todos los pruductos que no tenga ese id para que no se elimine
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => { 
    return carritoId !== foundId;
  });
  carritoCounter();
  saveLocal();
  pintarCarrito();
};

//guardamos en el localStorage
const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLenght", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
