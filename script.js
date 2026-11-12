class Paciente {
    constructor(nombre, oxigeno, ritmo) {
        this.nombre = nombre;
        this.oxigeno = parseFloat(oxigeno);
        this.ritmo = parseFloat(ritmo);
        this.riesgo = this.determinarRiesgo(); // Se calcula al crear el paciente
    }
 
    // FUNCION PARA DETERMINAR EL RIESGO 
    determinarRiesgo() {
        if (this.oxigeno < 90 || this.ritmo > 130) {
            return "Rojo (Crítico)"; 
        } else if (this.oxigeno >= 90 && this.oxigeno <= 94) {
            return "Amarillo (Urgente)"; 
        } else {
            return "Verde (Estable)"; 
        }
    }
}
 
// CARGAR DEL DOM LOS INPUTS Y ELEMENTOS
const nombreInput = document.getElementById("nombreP");
const oxigenoInput = document.getElementById("oxigenoP");
const ritmoInput = document.getElementById("ritmoP");
const btnRegistrar = document.getElementById("btnRegistrar");
const lista = document.getElementById("listaPacientes");
 
// CARGAR DATOS AL INICIAR
document.addEventListener("DOMContentLoaded", cargarPacientes);
 
function cargarPacientes() {
    mostrarPacientes();
}
 
// FUNCION PARA AGREGAR NUEVOS PACIENTES
btnRegistrar.addEventListener("click", agregarPaciente);
 
function agregarPaciente() {
    const nombre = nombreInput.value.trim();
    const oxigeno = parseFloat(oxigenoInput.value);
    const ritmo = parseFloat(ritmoInput.value);
 
    // Validación básica de campos vacíos
    if (nombre === "" || isNaN(oxigeno) || isNaN(ritmo)) {
        return alert("Escribe todos los datos del paciente primero");
    }
 
    // Crear el objeto y guardar
    const nuevoPaciente = new Paciente(nombre, oxigeno, ritmo);
    const pacientes = obtenerPacientes();
    pacientes.push(nuevoPaciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes)); // Guardar en LocalStorage
 
    mostrarPacientes();
    // Limpiar inputs
    nombreInput.value = "";
    oxigenoInput.value = "";
    ritmoInput.value = "";
}
 
// FUNCION PARA MOSTRAR LOS DATOS EN EL DOM
function mostrarPacientes() {
    const pacientes = obtenerPacientes();
    lista.innerHTML = "";
    pacientes.forEach((paciente) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
<td>${paciente.nombre}</td>
<td>${paciente.oxigeno}%</td>
<td>${paciente.ritmo}</td>
<td>${paciente.riesgo}</td>
        `;
        lista.appendChild(tr); 
    });
}
 
// FUNCION PARA OBTENER LOS DATOS DE LOCALSTORAGE
function obtenerPacientes() {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}