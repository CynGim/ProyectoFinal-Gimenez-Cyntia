//metodo para recorrer los productos con funcion array mediante forEach
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer =document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//obtengo lo que tengo guardado en el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//funcion asincrona de asyncawait mediante fetch mencionando la ruta de los productos de data.json generando promesas
/*const getProducts = async () => {
    const response = await fetch("/data.json");
    const data = await response.json("");
    console.log(data);*/
    
    const getProducts = async () => {
    const response = await fetch("/data.json");
    const data = await response.json("");
    console.log(data);
    
    data.forEach((product)=> {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p class="price">€${product.precio}</p></div>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement("button");
        comprar.innerText = "Agregar al carrito";
        comprar.className = "Agregar al carrito";
    
        content.append(comprar);
       
    //creo evento para detectar accion (agregando objetos al carrito) y aplico funcion para que detecte los productos que se repiten mediante some devolviendo valor true o false
    
    comprar.addEventListener("click", () => { 
     const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
        
    //creo condicion sumando la cantidad si el producto es igual
        if (repeat){
            carrito.map((prod) => {
             if (prod.id === product.id) {
             prod.cantidad++; 
             } 
           });
           
        } else {
            carrito.push({
                id : product.id,
                imagen: product.imagen,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter(); 
        saveLocal();
        }
       }); 
    });
};

getProducts();

//envio y guardo informacion mediante localStorage y JSON
const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};
