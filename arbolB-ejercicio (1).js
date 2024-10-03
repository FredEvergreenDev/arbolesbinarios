// Estructura de datos Nodo
class Node {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}

// Funciones auxiliares

function sonArbolesIdenticos(arbolA, arbolB) {
    // Caso base: Ambos arboles son nulos (vacios)
    if (arbolA === null && arbolB === null) { // and
        return true;
    }

    // Uno de los arboles es nulo y el otro no 
    if (arbolA === null || arbolB === null) { // or 
        return false;
    }

    // Comprobamos los valores de los nodos raiz y recursivamente los subarboles
    return (
        arbolA.valor === arbolB.valor &&
        sonArbolesIdenticos(arbolA.izquierdo, arbolB.izquierdo) &&
        sonArbolesIdenticos(arbolA.derecho, arbolB.derecho)
    );
}

function copiarArbol(arbolOriginal) {
    if (arbolOriginal === null) {
        return null; 
    }

    let nuevoArbol = new Node(arbolOriginal.valor); 
    nuevoArbol.izquierdo = copiarArbol(arbolOriginal.izquierdo); 
    nuevoArbol.derecho = copiarArbol(arbolOriginal.derecho); 

    return nuevoArbol;
}

function visualizarNodosEnNivel(arbol, nivel) {
    if (arbol === null) {
        return; 
    }

    if (nivel === 1) {
        console.log(arbol.valor); 
    } else if (nivel > 1) {
        visualizarNodosEnNivel(arbol.izquierdo, nivel - 1);
        visualizarNodosEnNivel(arbol.derecho, nivel - 1);
    }
}

function contarHojas(arbol) {
    // Caso base: el árbol está vacío
    if (arbol === null) {
        return 0;
    }

    // Caso base: el nodo es una hoja (no tiene hijos)
    if (arbol.izquierdo === null && arbol.derecho === null) {
        return 1;
    }

    // Recursivamente contamos las hojas en los subárboles izquierdo y derecho
    return contarHojas(arbol.izquierdo) + contarHojas(arbol.derecho);
}

// Estructura de datos BinaryTree
class BinaryTree {
    constructor() {
        this.raiz = null;
    }

    // Insertar un nodo en el árbol (puedes implementar diferentes métodos de inserción según tus necesidades)
    insertar(valor) {
        this.raiz = this._insertarRecursivo(this.raiz, valor);
    }

    _insertarRecursivo(nodoActual, valor) {
        if (nodoActual === null) {
            return new Node(valor);
        }

        if (valor < nodoActual.valor) {
            nodoActual.izquierdo = this._insertarRecursivo(nodoActual.izquierdo, valor);
        } else if (valor > nodoActual.valor) {
            nodoActual.derecho = this._insertarRecursivo(nodoActual.derecho, valor);
        }

        return nodoActual;
    }

    // 1. Determinar si dos árboles binarios son idénticos
    sonIdenticos(otroArbol) {
        return sonArbolesIdenticos(this.raiz, otroArbol.raiz);
    }

    // 2. Obtener una copia del árbol binario
    copiar() {
        return new BinaryTree(copiarArbol(this.raiz)); 
    }

    // 3. Visualizar los nodos en un nivel específico
    visualizarNivel(nivel) {
        visualizarNodosEnNivel(this.raiz, nivel);
    }

    // 4. Contar el número de hojas en el árbol binario
    contarHojas() {
        return contarHojas(this.raiz);
    }
}

// Ejemplo de uso
let arbol1 = new BinaryTree();
arbol1.insertar(5);
arbol1.insertar(3);
arbol1.insertar(7);
arbol1.insertar(2);
arbol1.insertar(4);

let arbol2 = new BinaryTree();
arbol2.insertar(5);
arbol2.insertar(3);
arbol2.insertar(7);
arbol2.insertar(2);
arbol2.insertar(4);

let arbol3 = new BinaryTree();
arbol3.insertar(5);
arbol3.insertar(3);
arbol3.insertar(8); // Valor diferente

console.log("¿Árbol 1 y Árbol 2 son idénticos?", arbol1.sonIdenticos(arbol2)); // true
console.log("¿Árbol 1 y Árbol 3 son idénticos?", arbol1.sonIdenticos(arbol3)); // false

let copiaArbol1 = arbol1.copiar();
console.log("Copia del Árbol 1:", copiaArbol1);

console.log("Nodos en el nivel 2 del Árbol 1:");
arbol1.visualizarNivel(2); // 3 7

console.log("Número de hojas en el Árbol 1:", arbol1.contarHojas()); // 3