 // Inicializa
 $(document).ready(function(){
    //Obtener elementos
    var mybutton = document.getElementById("toTop");
    var mylogo = document.getElementById("miLogoBco");

    // Mostrar/ocultar elementos con scroll down/up
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
        mylogo.style.visibility = "visible";
    } else {
        mybutton.style.display = "none";
        mylogo.style.visibility = "hidden";
    }
    }

    // Sube al top
    $('#toTop').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
    });

    // My Storyline Mobile
    //tab selection with a dropdown list for small devices
    $('#tab_selector').on('change', function (e) {
        $('.form-tabs li a').eq($(this).val()).tab('show');
    });

    //Tooltips
    $('[data-toggle="tooltip"]').tooltip({ animated: 'fade', html: true });

    //Botón carga formulario
    $("#btnSuperior").on("click",function(){          
        $("#modalBody").load("formulario.html",
        function(responseTxt, statusTxt, xhr){//callback
            if(statusTxt =="success") {
            console.log(xhr)
            }
            if(statusTxt =="error") {
            alert("Error: "+ xhr.status+": "+ xhr.statusText);
            console.log(xhr);
            }
        });
    });

    // Botón Cerrar
    $("#btnCerrar").on("click",function(){
        $("#formContact").css("display","block")
        $("#mensajeOK").css("display","none")
    });

});//Cierre ready

// Formatos permitidos formulario
function permite(elEvento, permitidos) {
    // Variables que definen los caracteres permitidos
    var numeros = "0123456789";
    var caracteres = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var numeros_caracteres = numeros + caracteres;
    // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha, 32=espacio
    var teclas_especiales = [8, 37, 39, 46, 32];
    
    // Seleccionar los caracteres a partir del parámetro de la función
    if (permitidos == 'num') {
        permitidos = numeros; 
    }else if (permitidos == 'car'){
        permitidos = caracteres; 
    }else if (permitidos == 'num_car'){
        permitidos = numeros_caracteres
    } 

    // Obtener la tecla pulsada
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    
    // Comprobar si la tecla pulsada es alguna de las teclas especiales
    var tecla_especial = false;
    for(var i in teclas_especiales) {
        
        if(codigoCaracter == teclas_especiales[i]) {
        tecla_especial = true;
        break;
    }
    }

    // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
    // o si es una tecla especial
    return permitidos.indexOf(caracter) != -1 || tecla_especial;
    
}
    

// ======== Validaciones tiempo real ===========
function validaName(item){
    value=item.value;
    console.log('(tr)Nombre: ' + value)//Imprime cada caracter ingresado

    if( value == null || value.length == 0 || /^\s+$/.test(value) ) {
        $("#mensajeNombre").show();
        $(item).addClass("is-invalid")

    } else {
        $("#mensajeNombre").hide();
        $(item).removeClass("is-invalid").addClass("is-valid")
    }
}

function validaEmail(item){
    value=item.value;
    if( value == null || value.length == 0) {//Si no existe (null) o si el campo está vacío
        $("#mensajeEmail").show().html("Falta ingresar tu Email.");
        $(item).addClass("is-invalid")
        
    } else if( !(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)) ) {//RegEx minimalista
        $("#mensajeEmail").show().html("Debes ingresar un Email válido.");
        $(item).addClass("is-invalid") 

    } else {
        console.log('(tr) Email ingresado es ' + value);
        $("#mensajeEmail").hide().empty();
        $(item).removeClass("is-invalid").addClass("is-valid")
    }
}
function validaMotivo(item) {
    value=item.value;
    console.log('(tr)Motivo: ' + value)//Imprime lo ingresado

    if( value == null || value.length == 0 || /^\s+$/.test(value) ) {
        $("#mensajeMotivo").show();
        $(item).addClass("is-invalid")

    } else {
        $("#mensajeMotivo").hide();
        $(item).removeClass("is-invalid").addClass("is-valid")
    }       
}

function validaAcepta(item){
    value=item.checked;
    
    if (value === true)
    {
        console.log("(tr)Aceptación: SÍ");
        $("#mensajeAcepta").hide().empty();
        $(item).removeClass("is-invalid").addClass("is-valid") 
    }
    else
    {
        $("#mensajeAcepta").show();
        console.log("(tr)Aceptación: NO");
        $(item).addClass("is-invalid").show();
    }
    
    console.log(value);
}

// ======== on Submit ===========
function validaForm() {
let formValido=true;

let mensaje="";

    // Nombre
    let valorNombre=document.forms["formContact"]["nombre"].value;

    // No permitir el envío con Null, vacío o solo con espacios
    //if( valorNombre == null || valorNombre.length == 0 || /^\s+$/.test(valorNombre) || !(/[a-zA-Z]/.test(valorNombre)) || /^[0-9]/.test(valorNombre)) {
    if( valorNombre == null || valorNombre.length == 0 || /^\s+$/.test(valorNombre)) {
        $("#mensajeNombre").html("Falta ingresar tu Nombre.").show();
        $("#nombre").addClass("is-invalid")
        formValido=false;
    // No permite el envío con caracteres no alfabéticos
    } else if( /[^a-zA-Z]/.test(valorNombre)) {
        $("#mensajeNombre").html("Por favor ingresa tu nombre sin caracteres extraños.").show();
        $("#nombre").addClass("is-invalid")
        formValido=false;

    } else {
        mensaje= mensaje + "- <b>Nombre:</b> " + valorNombre + ".</br>";
        $("#mensajeNombre").hide().empty();
        $("#nombre").removeClass("is-invalid").addClass("is-valid") 
    }
    
    // Email
    email = document.getElementById("email").value;
    if( email == null || email.length == 0) {//Si no existe (null) o si el campo está vacío
        $("#mensajeEmail").html("Falta ingresar tu Email.");
        $("#email").addClass("is-invalid").show();
        formValido=false;

    } else if( !(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)) ) {//RegEx minimalista
        $("#mensajeEmail").html("Debes ingresar un Email válido.");
        $("#email").addClass("is-invalid").show();
        formValido=false;
    } else {
        mensaje= mensaje + "- <b>Email:</b> " + email + ".</br>";
        $("#mensajeEmail").hide().empty();
        $("#email").removeClass("is-invalid").addClass("is-valid") 
    }

    // Motivo
    let valorMotivo=document.forms["formContact"]["motivo"].value;

    if( valorMotivo == null || valorMotivo.length == 0 || /^\s+$/.test(valorMotivo) ) {
        $("#mensajeMotivo").show();
        $("#motivo").addClass("is-invalid").show();
        formValido=false;

    } else {
        mensaje= mensaje + "- <b>Mensaje:</b> " + valorMotivo + ".</br>";
        $("#mensajeMotivo").hide();
        $("#motivo").removeClass("is-invalid").addClass("is-valid")  
    }

    // Aceptación condiciones
    var acepta = document.querySelector('input[name = "acepta"]:checked');
    if(acepta != null){  //Hay algo chequeado
        mensaje= mensaje + "- Además aceptaste que te contactemos a tu correo electrónico.</br>";
        $("#acepta").removeClass("is-invalid").addClass("is-valid") 
        $("#mensajeAcepta").empty();//Limpia mensaje
        } else {
            $("#mensajeAcepta").show();
            $("#acepta").addClass("is-invalid").show();
            formValido=false; 
        }
    
    // Mensaje final
    document.getElementById("resumenMensaje").innerHTML= mensaje; 
    console.log('Form válido: ' + formValido);

    if (formValido==true) {
        console.log('Form final: ' + formValido);
        $("#formContact").css("display","none")
        $("#mensajeOK").css("display","block")
    }

    return formValido;
    
}


// Formulario Bootstrap
/*(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();*/
