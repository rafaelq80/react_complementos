<h1>Trabalhando com Números Decimais no React + Spring</h1>



No React, quando trabalhamos com números acentuados, em muitas situações eles são retornados como `string`, devido a algumas limitações relacionadas ao sistema de serialização e deserialização dos dados, responsável por converter o Objeto TypeScript em JSON, e vice-versa. Este problema, acaba gerando erros na hora de cadastrar ou atualizar os dados de um Objeto no Spring. Veja no exemplo abaixo:

```json
{
	"id": 13,
	"nome": "Kena: Bridge of Spirits",
	"preco": "459.99",
	"foto": "https://ik.imagekit.io/vzr6ryejm/capas_games/kena.png?updatedAt=1714809337058",
	"curtir": 0,
	"categoria": {
		"id": 3,
		"tipo": "Aventura"
	}
}
```

No exemplo acima, o atributo **preco**, mesmo sendo configurado no Spring com o tipo **BigDecimal** e no Banco de dados configurado como **decimal**, está sendo retornado no JSON como uma **string**.

Para resolver este problema, vamos apresentar neste tutorial como tratar este problema no React:

<br />

<h2>1. Ajustes no Frontend React</h2>



Utilizaremos como exemplo o Frontend da Loja de Games:

<br />

<h2>👣 Passo 01 - Atualizar o Componente FormProduto</h2>



1. No Projeto React (Frontend), abra o Componente **FormProduto**
2. Substitua o código da Função **atualizarEstado**, pelo código abaixo:

```tsx
function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
	
	const { type, value, name } = e.target
	let valor: string | number = value
	
	if (['number', 'range'].includes(type) || (!isNaN(Number(value)) && value !== '')) {
		// Remove zeros à esquerda mantendo pelo menos um dígito
		const valorSemZeros = value.replace(/^0+(?!$)/, '') || '0'
		valor = parseFloat(Number(valorSemZeros).toFixed(2))
	}
	
	setProduto({
		...produto,
		[name]: valor,
		categoria: categoria,
	})
}
```

O código acima, converte os atributos numéricos (preço, por exemplo), em um number com 2 casas decimais. Os demais atributos, são mantidos como string.

<br />

<h2>👣 Passo 02 - Configurar um Input como Number</h2>



Vamos configurar o input do atributo **preco** para trabalhar com números decimais:

1. No Componente **FormProduto**, localize o input **preco**
2. Configure o input **preco**, como mostra a imagem abaixo:

<div align="center"><img src="https://i.imgur.com/0y0PXIb.png" title="source: imgur.com" /></div>

Na **linha 08**, definimos o tipo do input como **number (numero)**, através da propriedade **type**.

Na **linha 09**, definimos o incremento do campo em **0.01**, através da propriedade **step**.

> A propriedade **step** do HTML, é usada para definir os incrementos que um input do tipo number deve aceitar. Ele especifica quais valores são válidos para o input com base nos incrementos permitidos. O valor da propriedade step pode ser um número inteiro ou decimal.
>
> Quando você define `step=".01"` em um input do tipo number, significa que os valores válidos para o campo podem ter incrementos de 0,01 (um centésimo).
>
> A propriedade `step=".01"` é muito utilizada em campos de formulário que aceitam valores monetários ou valores com duas casas decimais, como preços, taxas de juros, ou medições precisas, onde pequenos incrementos são importantes.

<br />

<h2>👣 Passo 03 - Removendo o Spinner do Input do tipo Number</h2>



Quando configuramos um HTML input, com a propriedade **type** como **number**, o HTML por padrão, adiciona os **spins buttons**, que são duas setas, para aumentar ou diminuir o valor inserido no input, como vemos na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/49CUD4w.png" title="source: imgur.com" /></div>

Para remover globalmente, ou seja, de todos os HTML inputs do tipo number do projeto, vamos adicionar uma nova diretiva no arquivo **index.css**:

1. Abra o arquivo **index.css** do Projeto React, localizado dentro da pasta **src**
2. Adicione o trecho de código abaixo no arquivo **index.css**:

```css
@layer utilities {
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
}
```

**Vamos entender o código:**

<div align="center"><img src="https://i.imgur.com/XydPY6w.png" title="source: imgur.com" /></div>

**Linha 02:** A diretiva `@layer` é usada para definir camadas (`layers`) no CSS, que ajudam a controlar a ordem em que o CSS é aplicado. Isso pode ser útil para organizar e gerenciar o estilo, especialmente em projetos grandes ou com muitas dependências de CSS.

Esta camada foi nomeada como `utilities`, porque contém estilos utilitários, ou seja, regras de CSS que serão aplicadas em diferentes partes do projeto para ajustar o comportamento de elementos específicos, em nosso caso, inputs do tipo number.

**Linhas 03 a 07:** Foram adicionados pseudo-elementos, que se aplicam aos botões de incremento (`spin buttons`) que aparecem dentro do input do tipo number, que são exibidos nos navegadores baseados no motor WebKit, como o  Chrome e o Safari, por exemplo.

- **`-webkit-appearance: none;`**: Esta propriedade desativa a aparência padrão desses botões de incremento/decremento, efetivamente removendo-os do campo de entrada.

- **`margin: 0;`**: Esta regra remove qualquer margem em torno dos botões, garantindo que não haja espaço extra deixado por eles.

**Linhas 09 a 11:** Foi adicionada uma propriedade específica, que se aplica aos botões de incremento (`spin buttons`) que aparecem dentro do input do tipo number, que são exibidos nos navegadores baseados no motor Gecko, como o  Firefox, por exemplo.

- **`-moz-appearance: textfield;`**: Essa propriedade redefine a aparência do campo de entrada de número para que ele se comporte como um campo de texto. Ela remove os botões de incremento/decremento que são exibidos nos campos do tipo number no Firefox.

3. Após adicionar a Diretiva no arquivo index.css, observe que os spins buttons foram removidos, como vemos na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/2D66ufk.png" title="source: imgur.com" /></div>

<br />

<hr>
<br />
<h2>Mensagem: ⚠ Warning: Also define the standard property 'appearance' for compatibilitycss(vendorPrefix)</h2> 




Ao inserir as linhas acima no arquivo **index.css**, o Visual Studio Code pode emitir um Warning (Aviso), que ele não reconheceu as propriedades do CSS como padrões. Esse alerta é emitido pelo **Lint** (ferramenta de análise de código) do CSS, caso ele esteja instalado no seu Visual Studio Code. Para desabilitar este alerta, siga os passos abaixo:

  1. Abra as **Configurações do VSCode** através do menu **File 🡪 Preferences 🡪 Settings** (Arquivo 🡪 Preferências 🡪 Configurações)

<div align="center"><img src="https://i.imgur.com/HHV5tH8.png" title="source: imgur.com" /></div>

2. Será aberta janela do **Settings** (Configurações)

<div align="center"><img src="https://i.imgur.com/FAIEW4J.png" title="source: imgur.com" /></div>

  3. No item **Search Settings** (Procurar Configurações), digite: **Vendor Prefix** e altere esta configuração para **ignore**, conforme indicado na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/edjm487.png" title="source: imgur.com" /></div>

4. A mensagem de alerta não será mais exibida.
