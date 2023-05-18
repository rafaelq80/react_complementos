function somarNumeros(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((num) => total += num);
    return total;
}

console.log(somarNumeros());
console.log(somarNumeros(10, 20));
console.log(somarNumeros(10, 20, 30));
