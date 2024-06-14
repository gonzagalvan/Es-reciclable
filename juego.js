const niveles = [
    [
        { nombre: 'Botella de plástico', reciclable: true, mostrado: false, puntos: 1, imagen: 'images/botella.png' },
        { nombre: 'Papel de diario', reciclable: true, mostrado: false, puntos: 1, imagen: 'images/diario-1.png' },
        { nombre: 'Cartón limpio', reciclable: true, mostrado: false, puntos: 1, imagen: 'images/caja-carton.png' },
        { nombre: 'Cáscara de banana', reciclable: false, mostrado: false, puntos: 1, imagen: 'images/cascara-banana.png' },
        { nombre: 'Lata de Coca-Cola', reciclable: true, mostrado: false, puntos: 1, imagen: 'images/lata-coca2.png' }
    ],
    [
        { nombre: 'Caja leche', reciclable: true, mostrado: false, puntos: 2, imagen: 'images/carton-leche.png' },
        { nombre: 'Botella vidrio', reciclable: true, mostrado: false, puntos: 2, imagen: 'images/botella-vidrio.png' },
        { nombre: 'Paquete de papas fritas', reciclable: false, mostrado: false, puntos: 2, imagen: 'images/bolsa-papas.png' },
        { nombre: 'Neumático', reciclable: true, mostrado: false, puntos: 2, imagen: 'images/neumatico.png' },
        { nombre: 'Lápiz', reciclable: true, mostrado: false, puntos: 2, imagen: 'images/lapiz.png' },
        { nombre: 'Celular', reciclable: true, mostrado: false, puntos: 2, imagen: 'images/celular.png' }
    ],
    [
        { nombre: 'Pilas', reciclable: true, mostrado: false, puntos: 3, imagen: 'images/bateria.png' },
        { nombre: 'Teclado y mouse', reciclable: true, mostrado: false, puntos: 3, imagen: 'images/teclado-mouse.png' },
        { nombre: 'CD', reciclable: true, mostrado: false, puntos: 3, imagen: 'images/CD.png' },
        { nombre: 'Remera', reciclable: true, mostrado: false, puntos: 3, imagen: 'images/remera.png' },
        { nombre: 'Licuadora', reciclable: true, mostrado: false, puntos: 3, imagen: 'images/licuadora.png' },
        { nombre: 'Vaso descartable', reciclable: false, mostrado: false, puntos: 2, imagen: 'images/vaso-descartable.png' }
    ]
];

let nivelActual = 0;
let indiceActual = 0;
let puntaje = 0;
let racha = 0;

function iniciarJuego() {
    document.getElementById('pantallaInicio').style.display = 'none';
    document.getElementById('pantallaJuego').style.visibility = 'visible';
    
    niveles.forEach(nivel => mezclarArray(nivel));

    mostrarElemento();
}

function mostrarElemento() {
    const elementos = niveles[nivelActual];
    if (indiceActual < elementos.length) {
        const elemento = elementos[indiceActual];
        document.getElementById('elemento').innerText = elemento.nombre;
        document.getElementById('imagenElemento').src = elemento.imagen;
        document.getElementById('btnRecicla').style.visibility = 'visible';
        document.getElementById('btnNoRecicla').style.visibility = 'visible';
    } else if (nivelActual < niveles.length - 1) {
        nivelActual++;
        indiceActual = 0;
        document.getElementById('elemento').innerText = `¡Nivel ${nivelActual + 1}!`;
        document.getElementById('imagenElemento').src = 'images/check.png';
        document.getElementById('btnRecicla').style.visibility = 'hidden';
        document.getElementById('btnNoRecicla').style.visibility = 'hidden'; 
        setTimeout(() => {
            mostrarElemento();
        }, 1000);
    } else {
        document.getElementById('elemento').innerText = '¡Juego terminado!';
        document.getElementById('imagenElemento').src = 'images/final.png';
        document.getElementById('resultado').innerText = `Puntuación: ${puntaje}`;
        document.getElementById('btnReiniciar').style.display = 'block'; 
        document.getElementById('btnRecicla').style.display = 'none';
        document.getElementById('btnNoRecicla').style.display = 'none'; 
    }
}

function verificarReciclable(respuesta) {
    const elementos = niveles[nivelActual];
    if (indiceActual < elementos.length) {
        const elemento = elementos[indiceActual];
        if (respuesta === elemento.reciclable) {
            puntaje += elemento.puntos;
            racha++;
            if (racha % 3 === 0) {
                puntaje += 2; 
            }
            document.getElementById('resultado').innerText = '¡Correcto!';
        } else {
            document.getElementById('resultado').innerText = 'Incorrecto.';
            racha = 0; 
        }
        indiceActual++;
        setTimeout(() => {
            document.getElementById('resultado').innerText = '';
            mostrarElemento();
        }, 1000);
    }
}

function reiniciarJuego() {
    nivelActual = 0;
    indiceActual = 0;
    puntaje = 0;
    racha = 0;

    document.getElementById('resultado').innerText = '';
    document.getElementById('btnRecicla').style.display = 'block';
    document.getElementById('btnNoRecicla').style.display = 'block'; 
    document.getElementById('btnReiniciar').style.display = 'none'; 
    document.querySelectorAll('button').forEach(button => button.disabled = false); 

    niveles.forEach(nivel => mezclarArray(nivel));

    mostrarElemento();
}

function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
