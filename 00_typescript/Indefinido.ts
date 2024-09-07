function teste(): void {
    //A variável aceita dois tipos de valores
    // Null ou Undefined
    let variavel: number | undefined;

    if (variavel === undefined) {
        console.log('Variável sem valor definido.');
    } else if (variavel === null) {
        console.log('Variável com valor nulo');
    }
}

teste();