const DOMitems = document.querySelector('#items');
let carrito = [];
const miLocalStorage = window.localStorage;
const DOMcarrito = document.querySelector('#carrito');
$.ajax({
  url: 'https://corebiz-test.herokuapp.com/api/v1/products',
  method: 'GET',
  // dataType: 'json',
  success: function(data, status, jqXHR){
      datos=data;
      renderizarProductos(datos);
      guardarCarritoEnLocalStorage();
      cargarCarritoDeLocalStorage();
      console.log(data)
   },
  error: function(jqXHR, status, data){
      console.log(data);
      console.log(status);
       console.log(jqXHR);
       }
    })

    function renderizarProductos() {
      datos.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('fondoCar');
          // Body
          const miNodoCardBody = document.createElement('div');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('tituloCar');
          miNodoTitle.textContent = info.productName;
          // Imagen
          const miNodoImagen = document.createElement('img');
          miNodoImagen.setAttribute('src', info.imageUrl);
          // Precio
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('tituloCar');
          miNodoPrecio.textContent = '$' + info.price;
          // Boton 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('botonComprar');
          miNodoBoton.textContent = 'comprar';
          miNodoBoton.setAttribute('marcador', info.productId);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          // Insertamos
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
      });
  }

  function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Calculo el total
    renderizarCarrito();
     console.log(carrito)
    guardarCarritoEnLocalStorage();
}
function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = '';
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
      // Obtenemos el item que necesitamos de la variable base de datos
      const miItem = datos.filter((itemBaseDatos) => {
          // ¿Coincide las id? Solo puede existir un caso
          return itemBaseDatos.productId === parseInt(item);
      });
      // Cuenta el número de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
          return itemId === item ? total += 1 : total;
      }, 0);
      // Creamos el nodo del item del carrito
      const miNodo = document.createElement('li');
      console.log(numeroUnidadesItem)
      // miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].productName} - $${miItem[0].price}`;
      miNodo.textContent = `${numeroUnidadesItem}`;
      DOMcarrito.appendChild(miNodo);
  });
}
function guardarCarritoEnLocalStorage () {
  miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}
function cargarCarritoDeLocalStorage () {
  // ¿Existe un carrito previo guardado en LocalStorage?
  if (miLocalStorage.getItem('carrito') !== null) {
      // Carga la información
      carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}