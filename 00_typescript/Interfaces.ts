//Cria uma Interface (um modelo de dados)
interface Pessoa{
    nome: string;
    sobrenome: string;
}

//Cria 2 Objetos da Interface Pessoa
let pessoa1 = {
    nome: 'João',
    sobrenome: 'Moreira'
}

let pessoa2 = {
    nome: 'Pedro',
    sobrenome: 'Silva'
}

//Cria uma função que retorna os dados do Objeto Pesssoa
function listarDados(pessoa: Pessoa){
    return `${pessoa.nome} ${pessoa.sobrenome}`;
}

//Executa a Função
const listarPessoa1 = listarDados(pessoa1)
console.log(listarPessoa1);

console.log(listarDados(pessoa2))

export{}