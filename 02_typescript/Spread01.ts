const array01 = [1, 2, 3];
const array02 = [4, 5, 6];
const arrayCombinado = [...array01, ...array02];

console.log(arrayCombinado);

const numeros = [1, 2, 3, 4, 5, 6];

const [um, dois, ...rest] = numeros;

console.log(numeros)