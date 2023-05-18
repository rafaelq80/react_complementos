/*Cria uma função tipada (number), que recebe
  dois parâmetros number (obrigatorios) e 
  um terceiro parâmetro number (opcional)
  A ? indica que o parâmetros é Opcional*/
function somar(numero1: number, numero2: number, numero3?: number): number{
    
    if(numero3 != undefined)
        return numero1 + numero2 + numero3;

    return numero1 + numero2;
}

//Cria duas Constantes para testar a Função
const resultado2 = somar(10, 20);
console.log(resultado2);

const resultado3 = somar(10, 20, 30);
console.log(resultado3);

export{}