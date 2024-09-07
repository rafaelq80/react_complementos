function dividir(numero1: number, numero2: number) {  
    if (numero2 === 0) {  
      return {  
        error: 'Não existe divisão por zero.',  
        result: null  
      };  
    } else {  
      return {  
        error: null,  
        result: numero1 / numero2  
      };  
    }  
  }

  console.log(dividir(10, 2));
  console.log(dividir(10, 0));