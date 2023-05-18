function listarPessoa(nome: string, idade: number) {
    return {
      nome,
      idade,
    };
  }
  
  const tupla: [string, number] = ['Márcia da Silva', 30];
  
  const resultado = listarPessoa(...tupla);
  
  console.log(resultado);
