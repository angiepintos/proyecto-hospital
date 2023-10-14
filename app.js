//obteniendo la informacion por medio del DOM y los IDS
//campos compartidos entre pacientes y medicos
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const especialidad = document.getElementById("especialidad");
//campos propios de medicos
const consultorio = document.getElementById("consultorio");
const correo = document.getElementById("correo");
//campos propios de pacientes
const edad = document.getElementById("edad");
//llamado de formulario
const formulariomedicos = document.getElementById("registro-medico-form");
const formulariopacientes = document.getElementById("registro-paciente-form");

class Usuario{
    constructor(nombres,apellidos,cedula,telefono,especialidad){
        this.nombres= nombres;
        this.apellidos= apellidos;
        this.cedula= cedula;
        this.telefono = telefono;
        this.especialidad = especialidad;
            }
}

const mostrarMedicos = function () {
    let medicos = [];
    let cuerpotabla = document.getElementById("cuerpo-tabla-medicos");
    let localMedicos = localStorage.getItem("medicos");
    if (localMedicos){
        medicos = JSON.parse(localMedicos);
    }
    medicos.forEach (medico => {
        let fila = document.createElement("tr");
        //para crear celda DOM tiene un metodoque es insertcell()
        let celdaNombres = fila.insertCell();
        let celdaApellidos = fila.insertCell();
        let celdacedula = fila.insertCell();
        let celdaConsultorio = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaEspecialidad = fila.insertCell();
        let celdaPaciente = fila.insertCell();
        
        celdaNombres.textContent = medico.nombres;
        celdaApellidos.textContent = medico.apellidos;
        celdacedula.textContent = medico.cedula;
        celdaConsultorio.textContent = medico.consultorio;
        celdaTelefono.textContent = medico.telefono;
        celdaCorreo.textContent = medico.correo;
        celdaEspecialidad.textContent = medico.especialidad;
        celdaPaciente.textContent ="sin asignar";

        cuerpotabla.appendChild(fila);        
    });    
};

const mostrarPacientes = function (){
    let pacientes =[];
    let cuerpotabla = document.getElementById("cuerpo-tabla-pacientes")
    let localPacientes = localStorage.getItem("pacientes");
    if (localPacientes) {
        pacientes = JSON.parse(localPacientes);
    }
    pacientes.forEach((paciente) => {
        let fila = document.createElement("tr");

        let celdaNombres = fila.insertCell();
        let celdaApellidos = fila.insertCell();
        let celdaCedula = fila.insertCell();
        let celdaEdad = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        let celdaEspecialidad = fila.insertCell();
        let celdaMedico = fila.insertCell();

        celdaNombres.textContent = paciente.nombres;
        celdaApellidos.textContent = paciente.apellidos;
        celdaCedula.textContent = paciente.cedula;
        celdaEdad.textContent = paciente.edad;
        celdaTelefono.textContent = paciente.telefono;
        celdaEspecialidad.textContent = paciente.especialidad;
        celdaMedico.textContent = "Sin asignar";
        
        cuerpotabla.appendChild(fila);
        
    });
};

// unicamente ejecuta la funcion cuando estamos ubicados en listado-medicos.html
if (window.location.href.endsWith("listado-medico.html")){
    mostrarMedicos();
}
if (window.location.href.endsWith("listado-paciente.html")) {
    mostrarPacientes();
}

//unicamente ejecuta el addeventlisterner cuando estamos ubicados en el registros-medicos.html
if (window.location.href.endsWith("registro-medico.html")){
    //el evento para formulario medicos va aser de tipo enviar o guardar es decir submit
    formulariomedicos.addEventListener("submit", function (Event) {        
    //previene que la pagina se recargue sin antes hacer la logica de addeventlistener
        Event.preventDefault();
        
        let valorNombres = nombres.value;
        let valorApellidos = apellidos.value;
        let valorcedula = cedula.value;
        let valorConsultorio = consultorio.value;
        let valorTelefono = telefono.value; 
        let valorCorreo = correo.value;     
        let valorEspecialidad = especialidad.value;  

        const Medico = new Usuario(
            valorNombres,
            valorApellidos,
            valorcedula,
            valorTelefono,
            valorEspecialidad,
        );

        Medico.consultorio = valorConsultorio;
        Medico.correo = valorCorreo;  

        let medicos =[];
        
        let localmedicos = localStorage.getItem("medicos");
               //si local medicos no esta vacio lo convierte en objeto para hacer el push
        if (localmedicos){
         medicos = JSON.parse(localmedicos);
            }
            medicos.push(Medico);
            localStorage.setItem("medicos", JSON.stringify(medicos));
            alert("Medico registrado!"); 
    });      
}

 //ACCESO AL FORMULARIO REGISTRO PACIENTES
if (window.location.href.endsWith("registro-paciente.html")) {

    formulariopacientes.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let valorNombres = nombres.value;
        let valorApellidos = apellidos.value;
        let valorcedula = cedula.value;
        let valorTelefono = telefono.value; 
        let valorEspecialidad = especialidad.value;  
        let valorEdad= edad.value;
        
        const paciente = new Usuario(
            valorNombres,
            valorApellidos,
            valorcedula,
            valorTelefono,
            valorEspecialidad,
        );

       paciente.edad = valorEdad;
        

      let pacientes =[];
        
      let localPacientes = localStorage.getItem("pacientes");
             //si local pacientes no esta vacio lo convierte en objeto para hacer el push
      if (localPacientes){
       pacientes = JSON.parse(localPacientes);
          }
          pacientes.push(paciente);
          localStorage.setItem("pacientes", JSON.stringify(pacientes));
          alert("paciente registrado!");
    });
}