<h1>Busca pelo Nome do Produto (busca por padrão)</h1>



Em um ambiente digital repleto de opções, oferecer uma busca eficiente com critérios de filtragem bem definidos é essencial para melhorar a experiência do usuário e otimizar o processo de localização de dados. A capacidade de encontrar rapidamente um serviço ou um produto específico reduz a frustração do cliente e aumenta as chances de fechamento da compra.

A busca textual permite que o usuário vá direto ao que procura, sem precisar navegar por inúmeras páginas. Já os filtros possibilitam um refinamento mais detalhado, permitindo a seleção com base em características como preço, categoria, disponibilidade, avaliações e outros atributos relevantes.

Além de melhorar a usabilidade, um sistema de busca e filtragem bem estruturado impacta diretamente a retenção de clientes, pois transmite confiabilidade e eficiência. Quando os consumidores encontram facilmente o que precisam, há uma maior tendência de retorno e fidelização à plataforma.

Portanto, investir em uma busca inteligente e em filtros personalizados não apenas melhora a experiência do usuário, mas também contribui para o crescimento e o sucesso do negócio.

Vamos implementar uma busca simples utilizando o atributo nome do produto como o critério principal e dentro do componente que exibirá os resultados da busca, vamos adicionar um formulário com critérios de filtragem baseados no preço.

<br />

<h2>👣 Passo 01 - Criar o Componente ListarProdutosPorNome</h2>



Vamos criar o Componente **ListarProdutosPorNome**, dentro da pasta **src/components/produtos/listarprodutospornome**, que será utilizado para exibir os dados dos produtos encontrados na busca:

1. Na pasta **produtos**, que foi criada dentro da pasta **src/components**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **listarprodutospornome**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
3. Na pasta **listarprodutospornome**, que foi criada dentro da pasta **src/components/produtos**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
4. O nome do arquivo será **ListarProdutosPorNome.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
5. Adicione o código abaixo no Componente **ListarProdutosPorNome**:

```tsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PacmanLoader } from "react-spinners"
import Produto from "../../../models/Produto"
import { listar } from "../../../services/Service"
import CardProdutos from "../cardprodutos/CardProdutos"

function ListarProdutosPorNome() {
	const [produtos, setProdutos] = useState<Produto[]>([]) // Todos os Produtos
	const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]) // Produtos Filtrados
	const [filtroPreco, setFiltroPreco] = useState<string>("")
	const [isLoading, setIsLoading] = useState(false)

	const { nome } = useParams<{ nome: string }>()

	async function buscarTodosProdutos() {
		try {
			setIsLoading(true)
			await listar("/produtos", setProdutos)
		} catch (error) {
			alert("Erro ao carregar produtos!")
		} finally {
			setIsLoading(false)
		}
	}

	function filtrarProdutos() {
		let produtosFiltrados = produtos

		if (produtosFiltrados && nome) {
			produtosFiltrados = produtosFiltrados.filter((produto) =>
				produto.nome.toUpperCase().includes(nome.toUpperCase())
			)
		}

		if (filtroPreco) {
			produtosFiltrados = produtosFiltrados.filter((produto) => {
				const preco = produto.preco
				if (filtroPreco === "200") return preco <= 200
				if (filtroPreco === "500") return preco > 200 && preco <= 500
				if (filtroPreco === "m500") return preco > 500
				return true
			})
		}

		setProdutosFiltrados(produtosFiltrados)
	}

	function limparFiltroPreco() {
		setFiltroPreco("")
		const radioButtons = document.getElementsByName("preco")
		radioButtons.forEach((radio) => {
			;(radio as HTMLInputElement).checked = false
		})
	}

	// Carrega todos os produtos na primeira vez
	useEffect(() => {
		buscarTodosProdutos()
	}, [])

	// Filtra os produtos de acordo com o termo da busca
	useEffect(() => {
		filtrarProdutos()
	}, [nome, produtos, filtroPreco])

	return (
		<>
			<div className="bg-gray-200 flex flex-col justify-center container">
				<div className="flex flex-col mx-4">
					<h1 className="text-4xl text-center my-4">
						Resultados da busca por <span className="italic text-teal-800">{nome}</span>
					</h1>

					{isLoading && (
						<PacmanLoader
							color="#0D9488"
							margin={0}
							size={80}
							speedMultiplier={2}
							aria-label="Pacman-loading"
							className="mx-auto my-8"
						/>
					)}

					{!isLoading && produtosFiltrados.length === 0 && (
						<div className="text-center my-4">
							<h2 className="text-2xl text-gray-600">Nenhum produto encontrado para "{nome}"</h2>
						</div>
					)}

					<div className="flex gap-4">
						<div className="flex flex-col w-1/5 ml-4 my-15 p-4 border rounded-lg border-slate-400">
							<h3 className="text-base font-bold py-2">Preço:</h3>
							<div className="flex gap-2">
								<input
									type="radio"
									name="preco"
									value="200"
									onChange={(e) => setFiltroPreco(e.target.value)}
								/>
								<label htmlFor="200"> Até R$ 200,00</label>
							</div>
							<div className="flex gap-2">
								<input
									type="radio"
									name="preco"
									value="500"
									onChange={(e) => setFiltroPreco(e.target.value)}
								/>
								<label htmlFor="500"> R$ 200,00 - R$500,00</label>
							</div>
							<div className="flex gap-2">
								<input
									type="radio"
									name="preco"
									value="m500"
									onChange={(e) => setFiltroPreco(e.target.value)}
								/>
								<label htmlFor="m500">Acima de R$ 500,00</label>
							</div>
							<div className="mt-8">
								<button
									className="flex justify-center w-1/2 py-2 mx-auto font-bold text-white rounded bg-teal-500 hover:bg-teal-700"
									onClick={limparFiltroPreco}>
									Limpar
								</button>
							</div>
						</div>

						{!isLoading && produtosFiltrados.length > 0 && (
							<div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{produtosFiltrados.map((produto) => (
									<CardProdutos key={produto.id} produto={produto} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarProdutosPorNome
```

<br />

<h2>👣 Passo 02 - Atualizar o Componente Navbar</h2>



Vamos atualizar o Componente **Navbar**, localizado na pasta **/src/components/navbar**, adicionando a Lógica necessária para o formulário **Buscar Produto por Nome**:

1. Substitua o código do Componente **Navbar**, pelo código abaixo:

```tsx
import { ShoppingCart, User } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

	const navigate = useNavigate()

	const [nome, setNome] = useState<string>("")

	function handleBuscarProdutos(e: ChangeEvent<HTMLInputElement>){
		setNome(e.target.value)
	}

	function buscarProdutos(e: FormEvent<HTMLFormElement>){
		e.preventDefault()
		navigate(`/consultarnome/${nome}`)
		setNome('')
	}
	
	return (
		<>
			<div className="flex justify-center w-full py-4 text-white bg-slate-800">
				<div className="container flex items-center justify-between mx-4 text-lg">
					<Link to="/home">
						<img
							src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1705976699033"
							alt="Logo"
							className="w-60"
						/>
					</Link>

					<div className="relative flex items-center justify-center w-2/5 text-black">
						<form 
							className="flex items-center justify-center w-full"
							onSubmit={buscarProdutos}
						>
							<input
								className="w-10/12 px-4 py-4 bg-white rounded-lg h-9 focus:outline-none"
								type="search"
								placeholder="Pesquisar produto pelo nome"
								id="nome"
								name="nome"
								required
								value={nome}
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleBuscarProdutos(e)}
							/>
							<button
								type="submit"
								className="h-9 w-9 p-2.5 ms-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-900 rounded-lg border border-teal-700"
							>
								<MagnifyingGlass
									size={14}
									weight="bold"
								/>
							</button>
						</form>
					</div>

					<div className="flex items-center gap-4 py-4">
						<Link
							to="/produtos"
							className="hover:underline"
						>
							Produtos
						</Link>
						<Link
							to="/categorias"
							className="hover:underline"
						>
							Categorias
						</Link>
						<Link
							to="/cadastrarcategoria"
							className="hover:underline"
						>
							Cadastrar Categoria
						</Link>
							<User
								size={32}
								weight="bold"
							/>

							<ShoppingCart
								size={32}
								weight="bold"
							/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
```

<br />

<h2>👣 Passo 03 - Atualizar o Componente App</h2>



Adicione a rota abaixo no Componente **app**:

```tsx
<Route path="/consultarnome/:nome" element={<ListarProdutosPorNome />} />
```

<br />

<h2>👣 Passo 04 - Testar a aplicação</h2>



1. Digite o nome do jogo que você deseja procurar:

<div align="center"><img src="https://i.imgur.com/OxpXVsl.png" title="source: imgur.com" /></div>

2. Caso ele seja encontrado, o resultado será exibido na tela

<div align="center"><img src="https://i.imgur.com/sAKiDnj.png" title="source: imgur.com" /></div>

3. Faça uma busca mais genérica, digitando uma letra, por exemplo.

<div align="center"><img src="https://i.imgur.com/UoKBjYw.png" title="source: imgur.com" /></div>

4. Observe que todos os jogos que possuem no seu nome a letra digitada serão exibidos na tela.
5. No formulário gerado no lado esquerdo da tela, é possível filtrar os jogos pelo preço. 

<div align="center"><img src="https://i.imgur.com/cIRDvbV.png" title="source: imgur.com" /></div>

6. Note que ao escolher o filtro **Acima de R$ 500,00**, serão exibidos apenas o jogos cujo valor seja maior do que R$ 500,00.
7. Na sequência, clique no botão **Limpar**

<div align="center"><img src="https://i.imgur.com/AyL9ZkQ.png" title="source: imgur.com" /></div>

8. Observe que todos os filtros serão removidos e todos os produtos da busca inicial serão exibidos novamente.

<div align="center"><img src="https://i.imgur.com/UoKBjYw.png" title="source: imgur.com" /></div>

<br />
