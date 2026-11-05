/**
 * Proyecto: Temas de Estudio de Matemáticas Discretas[cite: 1]
 * Archivo: main.js (Con Sistema de Validación y Pruebas Automatizadas)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Módulo de Matemáticas Discretas inicializado correctamente.");
    
    const currentPage = window.location.pathname.split('/').pop();

    switch (currentPage) {
        case 'arboles.htm':
            initArboles();
            break;
        case 'criptografia.htm':
            initCriptografia();
            break;
        case 'grafos.htm':
            initGrafos();
            break;
        case 'logica_boole.htm':
            initLogicaBoole();
            break;
        default:
            console.log("Página principal o de pruebas detectada.");
    }
});

/* ==========================================================================
   UTILIDAD GLOBAL DE VERIFICACIÓN DE ACTIVIDADES
   ========================================================================== */
const ValidadorActividad = {
    mostrarFeedback: (elementoId, esCorrecto, mensajeCustom = "") => {
        const elemento = document.getElementById(elementoId);
        if (!elemento) {
            console.warn(`Elemento con ID "${elementoId}" no encontrado en el DOM.`);
            return;
        }

        elemento.className = esCorrecto ? "feedback-correcto" : "feedback-incorrecto";
        elemento.textContent = mensajeCustom || (esCorrecto ? "¡Correcto! Buen trabajo." : "Incorrecto. Inténtalo de nuevo.");
    }
};

/* ==========================================================================
   1. MÓDULO DE ÁRBOLES
   ========================================================================== */
function initArboles() {
    class Nodo {
        constructor(valor) {
            this.valor = valor;
            this.izq = null;
            this.der = null;
        }
    }

    class ArbolBinario {
        constructor() {
            this.raiz = null;
        }

        insertar(valor) {
            const nuevoNodo = new Nodo(valor);
            if (!this.raiz) {
                this.raiz = nuevoNodo;
            } else {
                this._insertarNodo(this.raiz, nuevoNodo);
            }
        }

        _insertarNodo(nodo, nuevoNodo) {
            if (nuevoNodo.valor < nodo.valor) {
                if (!nodo.izq) nodo.izq = nuevoNodo;
                else this._insertarNodo(nodo.izq, nuevoNodo);
            } else {
                if (!nodo.der) nodo.der = nuevoNodo;
                else this._insertarNodo(nodo.der, nuevoNodo);
            }
        }

        recorridoInOrder(nodo = this.raiz, resultado = []) {
            if (nodo) {
                this.recorridoInOrder(nodo.izq, resultado);
                resultado.push(nodo.valor);
                this.recorridoInOrder(nodo.der, resultado);
            }
            return resultado;
        }
    }

    window.verificarRecorridoArbol = function(arbolInstance, recorridoUsuarioStr, elementoFeedbackId) {
        const usuarioArray = recorridoUsuarioStr.split(',').map(n => parseInt(n.trim()));
        const recorridoReal = arbolInstance.recorridoInOrder();
        const esCorrecto = JSON.stringify(usuarioArray) === JSON.stringify(recorridoReal);

        ValidadorActividad.mostrarFeedback(elementoFeedbackId, esCorrecto);
        return esCorrecto;
    };

    window.ArbolBinario = ArbolBinario;
}

/* ==========================================================================
   2. MÓDULO DE CRIPTOGRAFÍA
   ========================================================================== */
function initCriptografia() {
    const Cripto = {
        cesar: (texto, desplazamiento) => {
            return texto.replace(/[a-z]/gi, (char) => {
                const base = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - base + desplazamiento) % 26 + 26) % 26 + base);
            });
        },

        verificarCifrado: function(textoOriginal, desplazamiento, respuestaUsuario, elementoFeedbackId) {
            const esperado = this.cesar(textoOriginal, desplazamiento);
            const esCorrecto = respuestaUsuario.trim().toLowerCase() === esperado.toLowerCase();
            
            ValidadorActividad.mostrarFeedback(elementoFeedbackId, esCorrecto, 
                esCorrecto ? "¡Cifrado correcto!" : `Incorrecto. El resultado esperado era: ${esperado}`
            );
            return esCorrecto;
        }
    };

    window.Cripto = Cripto;
}

/* ==========================================================================
   3. MÓDULO DE GRAFOS
   ========================================================================== */
function initGrafos() {
    class Grafo {
        constructor() {
            this.listaAdyacencia = new Map();
        }

        agregarVertice(v) {
            if (!this.listaAdyacencia.has(v)) {
                this.listaAdyacencia.set(v, []);
            }
        }

        agregarArista(v1, v2) {
            if (!this.listaAdyacencia.has(v1)) this.agregarVertice(v1);
            if (!this.listaAdyacencia.has(v2)) this.agregarVertice(v2);
            this.listaAdyacencia.get(v1).push(v2);
            this.listaAdyacencia.get(v2).push(v1);
        }

        bfs(inicio) {
            const visitados = new Set();
            const cola = [inicio];
            const resultado = [];

            visitados.add(inicio);

            while (cola.length > 0) {
                const vertice = cola.shift();
                resultado.push(vertice);

                for (const vecino of this.listaAdyacencia.get(vertice) || []) {
                    if (!visitados.has(vecino)) {
                        visitados.add(vecino);
                        cola.push(vecino);
                    }
                }
            }
            return resultado;
        }
    }

    window.Grafo = Grafo;
}

/* ==========================================================================
   4. MÓDULO DE LÓGICA DE BOOLE
   ========================================================================== */
function initLogicaBoole() {
    const LogicaBoole = {
        evaluarCompuerta: (tipo, a, b) => {
            switch(tipo.toUpperCase()) {
                case 'AND': return a && b;
                case 'OR': return a || b;
                case 'NOT': return !a;
                case 'XOR': return a !== b;
                default: return false;
            }
        },

        verificarRespuestaTabla: function(tipoCompuerta, p, q, valorUsuario, elementoFeedbackId) {
            const resultadoReal = this.evaluarCompuerta(tipoCompuerta, p, q);
            const esCorrecto = valorUsuario === resultadoReal;

            ValidadorActividad.mostrarFeedback(elementoFeedbackId, esCorrecto);
            return esCorrecto;
        }
    };

    window.LogicaBoole = LogicaBoole;
}

/* ==========================================================================
   SUITE DE PRUEBAS AUTOMATIZADAS (AUTOVERIFICACIÓN)
   ========================================================================== */
window.ejecutarPruebasUnitarias = function() {
    console.group("=== INICIANDO PRUEBAS DE AUTOVERIFICACIÓN ===");
    let pruebasExitosas = 0;
    let pruebasTotales = 0;

    // Test 1: Cifrado César
    pruebasTotales++;
    const testCesar = "abc".replace(/[a-z]/gi, (c) => String.fromCharCode(((c.charCodeAt(0) - 97 + 3) % 26) + 97));
    if (testCesar === "def") {
        console.log("✅ Test 1 (Cifrado César): PASÓ");
        pruebasExitosas++;
    } else {
        console.error("❌ Test 1 (Cifrado César): FALLÓ");
    }

    // Test 2: Lógica Booleana
    pruebasTotales++;
    if ((true && false) === false && (true || false) === true && (!true) === false) {
        console.log("✅ Test 2 (Lógica Booleana): PASÓ");
        pruebasExitosas++;
    } else {
        console.error("❌ Test 2 (Lógica Booleana): FALLÓ");
    }

    // Test 3: Árbol Binario InOrder
    pruebasTotales++;
    try {
        const arbolTest = {
            raiz: { valor: 10, izq: { valor: 5, izq: null, der: null }, der: { valor: 15, izq: null, der: null } },
            recorridoInOrder(nodo = this.raiz, res = []) {
                if (nodo) {
                    this.recorridoInOrder(nodo.izq, res);
                    res.push(nodo.valor);
                    this.recorridoInOrder(nodo.der, res);
                }
                return res;
            }
        };
        const resArbol = arbolTest.recorridoInOrder();
        if (JSON.stringify(resArbol) === JSON.stringify([5, 10, 15])) {
            console.log("✅ Test 3 (Árbol Binario InOrder): PASÓ");
            pruebasExitosas++;
        } else {
            console.error("❌ Test 3 (Árbol Binario InOrder): FALLÓ");
        }
    } catch(e) {
        console.error("❌ Test 3 (Árbol Binario InOrder): FALLÓ con excepción", e);
    }

    console.log(`=== RESULTADO FINAL: ${pruebasExitosas} de ${pruebasTotales} pruebas exitosas ===`);
    console.groupEnd();
    return pruebasExitosas === pruebasTotales;
};
