//CARGA DE IMAGENES EN ARREGLO

let banderas = ["an.jpg","ba.jpg","cn.jpg","nz.jpg","ir.jpg"];


//ARREGLO QUE GUARDARA LA OPCION CORRECTA

let correcta = [1,2,0,2,0];

//ARREGLO QUE GUARDARA LOS PAISES A MOSTRAR EN CADA JUGADA

let opciones = [];

//CARGO EN EL ARREGLO OPCIONES LAS OPCIONES A MOSTRAR
opciones.push(["RUMANIA","ANDORRA","MOLDAVIA"]);
opciones.push(["PALAOS","JAPON","BANGLADESH"]);
opciones.push(["COREA DEL NORTE","COREA DEL SUR","COSTA RICA"]);
opciones.push(["AUSTRALIA","FIJI","NUEVA ZELANDA"]);
opciones.push(["IRLANDA","COSTA DE MARFIL","INDIA"]);


//VARIABLE QUE GUARDA LA POSICION ACTUAL
let posActual = 0;
//VARIABLE QUE GUARDA LA CANTIDAD DE ACERTADAS 
let cantidadAcertadas = 0;

function comenzarJuego(){
    //reseteamos las variables
    posActual = 0;
    cantidadAcertadas = 0;
    //activamos las pantallas necesarias
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    // ocultamos el canvas
    document.getElementById("mi-canvas").style.display = "none";

    cargarBandera();
}

//funcion que carga la siguiente bandera y sus opciones
function cargarBandera(){
    //controlo sis se acabaron las banderas
    if(banderas.length <= posActual){
        terminarJuego();
    }
    else{//cargo las opciones
        //limpiamos las clases que se asignaron
        limpiarOpciones();

        document.getElementById("imgBandera").src = "bns/" + banderas[posActual];
        document.getElementById("n0").innerHTML = opciones[posActual][0];
        document.getElementById("n1").innerHTML = opciones[posActual][1];
        document.getElementById("n2").innerHTML = opciones[posActual][2];
    }
}

function limpiarOpciones(){
    document.getElementById("n0").className = "nombre";
    document.getElementById("n1").className = "nombre";
    document.getElementById("n2").className = "nombre";

    document.getElementById("l0").className = "letra";
    document.getElementById("l1").className = "letra";
    document.getElementById("l2").className = "letra";
}

function comprobarRespuesta(opElegida){
    if(opElegida==correcta[posActual]){//acertó
        //agregamos las clases para colocar el color verde a la opcion elegida
        document.getElementById("n" + opElegida).className = "nombre nombreAcertado";
        document.getElementById("l" + opElegida).className = "letra letraAcertada";
        cantidadAcertadas++;
    }else{//no acerto
        //agramos las clases para colocar en rojo la opcion elegida
        document.getElementById("n" + opElegida).className = "nombre nombreErroneo";
        document.getElementById("l" + opElegida).className = "letra letraErronea";

        //opcion que era correcta
        document.getElementById("n" + correcta[posActual]).className = "nombre nombreAcertad";
        document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
    }
    posActual++;
    //Esperamos 1 segundo y pasamos mostrar la siguiente bandera y sus opciones
    setTimeout(cargarBandera,1000);
}
function terminarJuego(){
    //ocultamos las pantallas y mostramos la pantalla final
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
    //agreamos los resultados
    document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
    document.getElementById("numIncorrectas").innerHTML = banderas.length - cantidadAcertadas;
}

function volverAlInicio(){
    //ocultamos las pantallas y activamos la inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
    // mostramos el canvas
    document.getElementById("mi-canvas").style.display = "block";
}


const canvas = document.getElementById('mi-canvas');
const ctx = canvas.getContext('2d');

// CONFIGURACION DE LAS DIMENSIONES
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const stripeHeight = canvasHeight / 3;
const sunRadius = 20; // RADIO DEL SOL
const rayLength = 30; // LARGO DE LOS RAYOS
const rayCount = 12; // NUMERO DE RAYOS

// SE DIBUJA BANDERA ARGENTINA
function drawFlag() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // DIBUJO DE LAS FRANJAS CELESTES
    ctx.fillStyle = '#75AADB'; 
    ctx.fillRect(0, 0, canvasWidth, stripeHeight);
    ctx.fillRect(0, stripeHeight * 2, canvasWidth, stripeHeight);

    // DIBUJO DE LA FRANJA BLANCA
    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillRect(0, stripeHeight, canvasWidth, stripeHeight);
}

// SE DIBUJA EL SOL CON RAYOS 
function drawSun(scale) {
    ctx.save();
    ctx.translate(canvasWidth / 2, stripeHeight + stripeHeight / 2); // Move origin to the center of the flag
    ctx.scale(scale, scale); // Scale the canvas context
    ctx.translate(-canvasWidth / 2, -stripeHeight - stripeHeight / 2); // Move origin back

    // SE DIBUJA LOS RAYOS
    ctx.strokeStyle = '#FFD700'; // SE ASIGNA COLOR A LOS RAYOS
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * 2 * Math.PI;
        const xStart = canvasWidth / 2 + Math.cos(angle) * sunRadius;
        const yStart = stripeHeight + stripeHeight / 2 + Math.sin(angle) * sunRadius;
        const xEnd = canvasWidth / 2 + Math.cos(angle) * (sunRadius + rayLength);
        const yEnd = stripeHeight + stripeHeight / 2 + Math.sin(angle) * (sunRadius + rayLength);
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
    }
    ctx.stroke();

    // SE DIBUJA EL SOL
    ctx.fillStyle = '#FFD700'; // SE ASIGNA COLOR AL SOL
    ctx.beginPath();
    ctx.arc(canvasWidth / 2, stripeHeight + stripeHeight / 2, sunRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

// SE HACE LA ANIMACION A MODO DE LOOP
let scale = 1;
let scaleDirection = 1; // 1 PARA CRECER, -1 PARA ENCOGERSE

function animate() {
    drawFlag();

    // SE HACE EL EFECTO DE PULSACION
    if (scale > 1.2 || scale < 0.8) {
        scaleDirection *= -1; // SE HACE LO CONTRARIO, EFECTO AGRANDE, ACHIQUE
    }
    scale += 0.01 * scaleDirection; // SE AJUSTA LA VELOCIDAD A LA QUE SE MUEVE

    drawSun(scale);
    requestAnimationFrame(animate);
}

// Start animation
animate();
