class Venta
{
    constructor(nombre, precio)
    {
        this.nombre = nombre;
        this.precio = precio;
    }
}

function crearVenta(nombre, precio)
{
    const venta = new Venta(nombre, precio)
    array.push(venta)
    localStorage.setItem("ventas", JSON.stringify(array))
}

const formulario = document.getElementById("form")
let array = [];

(localStorage.getItem('ventas')) ?  array = JSON.parse(localStorage.getItem('ventas')) :   /*Verifico si existe "ventas" en localstorage*/
                                    localStorage.setItem('ventas', JSON.stringify(array)) //Si existe obtengo sus valores y no si no, lo creo

formulario.addEventListener(`submit`, (e)=>
{
    e.preventDefault()   
    let nombre = document.getElementById('name').value
    let precio = parseFloat(document.getElementById('precio').value)
    crearVenta(nombre, precio) //Con esta funcion creada en la linea 10 creo mi obj venta, la guardo en array y lo almaceno en el local storage
    formulario.reset()

    Toastify({
    text: "Se ha registrado la venta",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to top, #061700, #52c234)",
    },
    }).showToast();
})

const mostrarVentas = document.getElementById('mostrarVentas')
const divVentas = document.getElementById(`ventas`)
const vendidos = JSON.parse(localStorage.getItem('ventas'))


mostrarVentas.addEventListener('click', ()=>
{
    if(array.length==0) //Si el array no tiene contenido para mostrar se visualisa un cartel que lo indica
    {
        Toastify({
            text: "No hay ventas registradas",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to bottom, #FF4B2B, #FF416C)",
            },
            }).showToast();
    }

    const vendidos = JSON.parse(localStorage.getItem('ventas'))
    let precioTotal=0
    divVentas.innerHTML = ""
    
    vendidos.forEach((ventas, id)=>  
    {
        precioTotal+=ventas.precio

        divVentas.innerHTML+=   //Cargo el DOM con el contenido del localstorage
        `
            <tr id="row${id}" class="text-center">
                <td>${id+1}</td>
                <td>${ventas.nombre}</td>
                <td>$ ${ventas.precio}</td>
                <td>$ ${precioTotal}</td>
                <td>
                    <button  onclick="borrarRow(${id})">
                        <img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-delete-interface-anggara-flat-anggara-putra-2.png"/>
                    </button>
                </td>
            </tr>
        `
    })   
})

const ocultar = document.getElementById('ocultar')//Oculto  el contenido de las tablas
ocultar.addEventListener('click', ()=>{
    divVentas.innerHTML = ""
})

const borrarTabla = document.getElementById('borrarTabla')
borrarTabla.addEventListener('click', ()=>{
    localStorage.clear('ventas')
    location.reload()
})

function borrarRow(idBorrado)  //Elimina la fila seleccionada
{
    vendidos.forEach((ventas, id)=>
    {
        if(id == idBorrado )
        {
            document.getElementById(`row${id}`).remove()
            array.splice(id,1)
            localStorage.setItem("ventas", JSON.stringify(array))
        }
    })
}

const divVentas2021 = document.getElementById("ventas2021")

fetch("../json/ventas2021.json")
.then(response => response.json())
.then(ventasPasadas =>
    {
        ventasPasadas.forEach((v)=>
        {
            divVentas2021.innerHTML +=
                `
                    <div class="card border-success mb-3 text-center">
                        <div class="card-header text-dark">${v.mes} ${v.año}</div>
                        <div class="card-body text-success">
                            <h4 class="card-title">$${v.ventasTotales}</h4>
                        </div>
                    </div>
                `
        })
    })

