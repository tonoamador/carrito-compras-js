//Variables

const carrito = document.querySelector('#carrito'),
      listaCursos = document.querySelector('#lista-cursos'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];


cargarEventListener();
function cargarEventListener(){
    //Cuando das clic a agregar curso, este ejecuta un event listener que tiene la función de agregarCurso
    listaCursos.addEventListener('click',agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
    })

}

//Funciones

function agregarCurso(e){
    e.preventDefault();
    //Nos aseguramos de que el usuario haya presionado en agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        //Accedemos a todo el div que tiene el contenido del curso
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar cursos del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Eliminar del arreglo por data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);

        carritoHTML(); //Iterar sobre el carrito y mostar el HTML

    }
}

//Leer el contenido del HTML al que le dimos clic y extraer la información del curso
function leerDatosCurso(curso){
    // console.log(curso);



    //Crear un objeto con el contenido del curso actual

    //Aquí se crea el objeto
    const infoCurso ={
        //Obtenemos la información de la imagen con el método de querySelector(), seleccionamos el img, de ahí usamos .src para obtener la información del atributo de src
        imagen : curso.querySelector('img').src,
        //Para el caso del titulo lo seleccionamos y para obtener su contenido usamos .textContent
        titulo : curso.querySelector('h4').textContent,
        //El mismo caso para el precio
        precio : curso.querySelector('.precio span').textContent,
        //Para obtener el id seleccionamos el tag a que es un enlace y usamos .getAttribute y le pasamos data-id, este atributo viene en el html y contiene un id
        id : curso.querySelector('a').getAttribute('data-id'),
        //Se crea este para representar la cantidad, entonces siempre que se da clic es porque tiene 1
        cantidad : 1
    }

    //Revisa si un elemento del carrito ya existe
    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);

    if(existe){
        const cursos  = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retrona el objeto actualizado
            }else{
                return curso; //Retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];
    }else{
        //Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso]

    }

    //Agregar elementos al arreglo de carrito
    console.log(articulosCarrito);
    carritoHTML();
    // console.log(infoCurso);
}

//Muestra el carrito de compras en el HTML

function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();
    //Recorrer el carrito y hacer el HTML
    articulosCarrito.forEach( curso=>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>

            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;


        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}

function limpiarHTML(){
    //Forma lenta de eliminar HTML
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}