function tabuada(numero: number): void {

    for (var contador = 1; contador <= 10; contador++){
        
        let resultado = numero * contador;
        console.log(`${numero} x ${contador} = ${resultado}`);

    }
        
}

tabuada(5);