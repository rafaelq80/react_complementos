<h1>Introdução ao TypeScript</h1>



TypeScript é uma linguagem criada pela Microsoft e nada mais é que um _superset_ do ECMAScript que, por sua vez, é um _superset_ do JavaScript Clássico. Isso significa que praticamente qualquer código JavaScript também é um código TypeScript. Na prática, o código TypeScript é transpilado e convertido para ECMAScript. Por isso, pode ser utilizado normalmente em qualquer projeto JavaScript.

> **Transpiler** é um programa que **traduz um código escrito em uma Linguagem de Programação para o código de uma outra Linguagem de Programação**. 
>
> **ECMAScript**: Toda a Linguagem de Programação precisa de uma padronização para reger as regras e o nivelamento da linguagem ao nível global, e para o JavaScript o ECMAScript é a sua padronização, ou seja, a versão oficial da linguagem. O  nome JavaScript, na verdade, é uma tradição do mercado de  desenvolvimento, porque o nome oficial da linguagem é ECMAScript.

O TypeScript foi construído sobre o JavaScript. Primeiro, você escreve o código TypeScript, e em seguida, você transpila (traduz) o código TypeScript em código JavaScript, através do transpiler do TypeScript. Depois de gerar o código JavaScript, você pode utilizar em qualquer ambiente que execute JavaScript, como o seu navegador, por exemplo.

Os arquivos TypeScript usam a extensão `.ts`, ao invés da extensão `.js`, utilizada pelos arquivos JavaScript. O diagrama a seguir mostra o processo de Transpilação do  TypeScript para o JavaScript:

<div align="center"><img src="https://i.imgur.com/lsrVR4x.png" title="source: imgur.com" /></div>

O TypeScript usa a mesma sintaxe do JavaScript e adiciona sintaxes adicionais para tipos de suporte. Se você tiver um programa JavaScript que não tenha nenhum erro de sintaxe, ele também poderá ser executado como um programa TypeScript. 

Outro ponto importante a ser destacado no TypeScript, é que ele permite que a pessoa desenvolvedora crie aplicações 100% JavaScript desde o Backend (utilizando Node e Nest, por exemplo) até o Frontend (utilizando React e Angular, por exemplo). Além disso, também é possível desenvolver um App Mobile, que consome a API desenvolvida no Backend, através do React Native.

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/pt/docs/" target="_blank"><b>Documentação: TypeScript</b></a></div>

<br />

<h2>1. Instalação</h2>



Para utilizar o TypeScript, precisamos ter o Node instalado na máquina. Através do Gerenciador de Pacotes do Node faremos a instalação do Transpiler do TypeScript:

1. Crie uma pasta na **Área de Trabalho**, chamada **typescript**.
2. Abra esta pasta no VSCode, clicando com o botão direito do mouse sobre a pasta **typescript** e no menu que será aberto, clique na opção **Abrir com o Code**.
3. Abra o Terminal do VSCode e digite o comando abaixo para instalar o **TypeScript**:

```bash
npm install -g typescript
```

4. Na sequência, digite o comando abaixo para checar se o TypeScript foi instalado corretamente:

```bash
tsc -v
```

5. Será exibido na tela a versão do TypeScript:

```bash
Version 5.0.4
```

*A versão instalada na sua máquina pode ser dieferente.*

> Caso apareça a mensagem: 
>
> ```bash
> "tsc is not recognized as an internal or external command". 
> ```
>
> 1. Na Barra de Pesquisar do Windows, localize o app **Editar as Variáveis de Ambiente do Sistema**.
> 2. Será aberta a janela abaixo. Clique no botão **Variáveis de Ambiente**
> 3. No item **Variáveis de Ambiente do Usuário**, dê um duplo clique no item **path**
> 4. Verifique se existe o caminho para a pasta do NPM (**c:\users\seu_usuario\AppData\Roaming\npm**), como mostra a imagem abaixo:
> 5. Se não existir, adicione este caminho através do botão **Novo**.

6. TypeScript instalado, vamos instalar a Biblioteca **ts-node**, para simplificar o uso do **TypeScript**, através do comando:

```bash
npm install -g ts-node
```
7. Na sequência, digite o comando abaixo para checar se o ts-node foi instalado corretamente:

```bash
ts-node -v
```

8. Será exibido na tela a versão do ts-node:

```bash
v10.9.1
```

*A versão instalada na sua máquina pode ser dieferente.*

<br />

<h2>2. Exemplo de código: Hello World!</h2>



1. Crie um novo arquivo, na pasta **typescript**, chamado **HelloWorld.ts**.
2. Insira o código abaixo:

```typescript
console.log("Hello World!")
```

3. No Terminal do VSCode, execute o comando abaixo:

```bash
ts-node HelloWorld.ts
```

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
Hello World!
```

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/pt/download" target="_blank"><b>Documentação - TypeScript: Instalação</b></a></div>

<br />

<h2>3. Tipos de dados</h2>



O TypeScript dispõe de inúmeros recursos que complementam o JavaScript. Provavelmente o recurso mais importante do TypeScript são os tipos. Você pode definir qual será o tipo que uma variável deve receber, que uma função deve retornar, entre outros. Os principais tipos de dados são:

<h3>3.1. Any</h3>

```typescript
let variavel: any = 'qualquer coisa'
console.log("Valor da varíavel any:", variavel)

variavel = 22
console.log("Valor da varíavel any:", variavel)

variavel = true
console.log("Valor da varíavel any:", variavel)
```

É o equivalente a uma variável escrita em JavaScript. O tipo  _any_ pode receber qualquer valor que você quiser.

<h3>3.2.Boolean</h3>

```typescript
let variavel: boolean = true
console.log("Valor da varíavel boolean:", variavel)
```

São variáveis do tipo true ou false.

<h3>3.3.Number</h3>

```typescript
let variavel: number = 10 
console.log("Valor da varíavel number:", variavel)

variavel = 10.2  
console.log("Valor da varíavel number:", variavel)

variavel = 0x01
console.log("Valor da varíavel number:", variavel)
```

O tipo Number é um pouco diferente do que se vê em outras linguagens. O TypeScript não dispõe de números inteiros, sem sinal ou algo do tipo. Todos os números são definidos como números reais e podem ser representados, inclusive, por binários, hexadecimais, entre outros. Número é número.

<h3>3.4.String</h3>

```typescript
let variavel: string = 'Eu sou uma String'
```

Strings têm uma variação muito interessante, que são os  _Template Strings_. Você pode quebrar linhas e inserir variáveis muito mais facilmente que no JavaScript. Para isso, basta abrir a  _string_  com o caractere acento grave (`).

```typescript
let mensagem: string = 'Hello, World.'  
let mensagemRecebida: string = `  
  <div>  
    <p>${mensagem}</p>  
  </div>  
`
```

<h3>3.5.Array</h3>

Há duas formas de se utilizar uma  _array_.

```typescript
let vetor1: any[]  
let vetor2: Array<any>
```

Ambas representam a mesma coisa. 

<br />

<h3>3.6. Tupla</h3>

```typescript
let tupla: [string, any] = ['key', 'value']
```

Outro tipo bem comum em outras linguagens são as _tuples_ (tuplas). Elas são muito semelhantes a um array, porém com tamanhos e valores de tipos bem definidos. São bastante úteis, porém pouco exploradas.  _Tuplas_  são muito flexíveis. 

```typescript
const tupla: [string, number] = ['Márcia da Silva', 30];
```

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean" target="_blank"><b>Documentação - TypeScript: Tipos de dados</b></a></div>

<br />

<h2>4. Functions</h2>



Com o TypeScript nós podemos definir os tipos dos parâmetros e quais valores uma função deve retornar.

```typescript
function somar(numero1: number, numero2: number): number {
    return numero1 + numero2
}

let resultado: number = somar(20, 10);

console.log(resultado);

export {}
```

Quando queremos que uma função não retorne nada, temos o tipo especial  _void_.

```typescript
function tabuada(numero: number): void {

    for (var contador = 1; contador <= 10; contador++){
        
        let resultado = numero * contador;
        console.log(`${numero} x ${contador} = ${resultado}`);

    }
        
}

tabuada(5);
```
<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
```


A nossa função também pode ter parâmetros opcionais. Veja o exemplo abaixo:

```typescript
function somar(numero1: number, numero2: number, numero3?: number): number{
    
    if(numero3 != undefined)
        return numero1 + numero2 + numero3;

    return numero1 + numero2;
}

const resultado2 = somar(10, 20);
console.log(resultado2);

const resultado3 = somar(10, 20, 30);
console.log(resultado3);

export{}
```

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
30
60
```

Perceba que o caractere interrogação (?) foi adicionado no terceiro parâmetro da função. A interrogação é o operador _elvis_, que serve para indicar que uma variável, atributo, Objeto ou parâmetro é opcional.

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions" target="_blank"><b>Documentação - TypeScript: Funções</b></a></div>

<br />

<h2>5. Null e Undefined</h2>

A convenção no TypeScript indica que `undefined`os valores da variável ou objeto ainda não foram definidos, enquanto `null` indica que os valores da variável ou objeto foram intencionalmente definidos sem um valor.

A função abaixo mostra como `null`pode ser usada retornando um objeto que sempre tem a mesma estrutura, mas com valores **intencionalmente atribuídos** `null` quando a função não retorna um `error`ou `resultado`:

```typescript
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
```

<br/>

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
Variável sem valor definido.
```

Por outro lado, `undefined`representa a ausência de qualquer valor. É um valor que é **atribuído automaticamente** a uma variável quando nenhum outro valor é atribuído. Geralmente indica que uma variável foi declarada, mas não inicializada. Também pode significar um erro de programação, como quando um parâmetro de propriedade ou função não foi fornecido:

```typescript
function teste(): void {

    let variavel: number | undefined;

    if (variavel === undefined) {
        console.log('Variável sem valor definido.');
    } else if (variavel === null) {
        console.log('Variável com valor nulo');
    }
}

teste();
```

<br />

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
{ error: null, result: 5 }
{ error: 'Não existe divisão por zero.', result: null }
```

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined" target="_blank"><b>Documentação - TypeScript: Null e Undefined</b></a></div>

<br />

<h2>6. Parâmetros Rest</h2>



Para nos ajudar a criar funções mais flexíveis, o TypeScript implementa os **Parâmetros Rest** como argumentos de uma função. Os Parâmetros Rest surgiram no ES6 (ECMAScript 6), nome oficial da versão 6 do JavaScript, com o objetivo de criar funções que aceitam um número variável de argumentos. Esses argumentos são armazenados em uma matriz que pode ser acessada posteriormente de dentro da função. A sintaxe Parâmetro Rest é composta por 3 pontos (...) antes do nome do Array:

```typescript
function funcao(...parametroRest: tipo[]): tipo {
    ...
}
```

**Exemplo:**

```typescript
function somarNumeros(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((num) => total += num);
    return total;
}

console.log(somarNumeros());
console.log(somarNumeros(10, 20));
console.log(somarNumeros(10, 20, 30));
```

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
0
30
60
```

Com o **Parâmetro Rest** , observe que enviamos um array como parâmetro da função, que pode ser de qualquer tamanho, que o Parâmetro Rest se encarregará de capturar todos os elementos do array. Observe que em cada chamada da função todos os elementos do Array foram somados.

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments" target="_blank"><b>Documentação - TypeScript: Parâmetros Rest</b></a></div>

<br />

<h2>7. Spread</h2>



O TypeScript também implementa o **Operador Spread (propagação)**, outra feature do ES6, que nos permite expandir arrays e outras expressões em locais onde vários parâmetros ou elementos são esperados. A sintaxe do Operador Spread é semelhante a sintaxe dos Parâmetros Rest, composta por 3 pontos (...) antes do nome do Array ou Expressão:

```typescript
const constante = funcao(...arr);
```

O Operador Spread nos permite, por exemplo copiar rapidamente um array ou parte dele para outro array:

```typescript
const array01 = [1, 2, 3];
const array02 = [4, 5, 6];
const arrayCombinado = [...array01, ...array02];

console.log(arrayCombinado);
```

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```typescript
[ 1, 2, 3, 4, 5, 6 ]
```

Observe que os dois arrays foram combinados.

O operador spread também é muito utilizado para extrair apenas o que é necessário de um array:

```typescript
const numeros = [1, 2, 3, 4, 5, 6];

const [um, dois, ...resto] = numeros;

console.log(numeros)
```

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
[ 1, 2, 3, 4, 5, 6 ]
```

Observe que no terceiro parâmetro do array, o operador spread indica que o array numeros será composto pelos 2 primeiros elementos do array e na sequência os demais elementos do array.

O Operador Spread também pode ser utilizado com Tuplas e Objetos:

```typescript
function listarPessoa(nome: string, idade: number) {
  return {
    nome,
    idade,
  };
}

const tupla: [string, number] = ['Márcia da Silva', 30];

const resultado = listarPessoa(...myTuple);

console.log(resultado);

```

<img src="https://i.imgur.com/V2ReOnx.png" title="source: imgur.com" width="3%"/>**Resultado do Código:**

```bash
{ nome: 'Márcia da Silva', idade: 30 }
```

Observe que nós declaramos uma tupla com 2 elementos (string e number), que correspondem exatamente aos argumentos que a função espera receber, portanto, podemos usar o operador de propagação na chamada da função. Usamos o operador de propagação para desempacotar a Tupla.

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/docs/handbook/variable-declarations.html#spread" target="_blank"><b>Documentação - TypeScript: Operador Spread</b></a></div>

<br />

<h2>8. Interfaces</h2>



Interface é uma estrutura que define um contrato em seu aplicativo. Ela define a sintaxe para as classes. As classes derivadas de uma interface devem seguir a estrutura fornecida por sua interface. O compilador TypeScript não converte interface em JavaScript. Ele usa interface para verificação de tipo. Isso também é conhecido como "subtipagem estrutural".

Uma interface é definida com a palavra-chave `interface`e pode incluir propriedades e declarações de métodos usando uma função ou uma Arrow Function.

```typescript
interface Pessoa{
    nome: string;
    sobrenome: string;
}
```

No exemplo acima, a interface inclui duas propriedades `nome`e `sobrenome`. Isso significa que qualquer objeto do tipo `Pessoa` deve definir as duas propriedades.

```typescript
let pessoa1 = {
    nome: 'Maria',
    sobrenome: 'Simões'
}

let pessoa2 = {
    nome: 'Juliana',
    sobrenome: 'Silva'
}
```

<br />

<div align="left"><img src="https://i.imgur.com/izFuHID.png" title="source: imgur.com" width="30px"/> <a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces" target="_blank"><b>Documentação - TypeScript: Interfaces</b></a></div>

<br />

Neste conteúdo, vimos um resumo com algumas das principais features do TypeScript. Há muito mais para conhecer e explorar, mas com este conteúdo, você conseguirá das os primeiros passos com o TypeScript, que oferece muitos recursos para o Desenvolvimento WEB.
