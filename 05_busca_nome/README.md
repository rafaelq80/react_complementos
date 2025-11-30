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
import type Produto from "../../../models/Produto"
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
			{/* Loading centralizado na tela */}
			{isLoading && (
				<div className="flex justify-center items-center min-h-screen">
					<PacmanLoader
						color="#0D9488"
						margin={0}
						size={80}
						speedMultiplier={2}
						aria-label="Pacman-loading"
					/>
				</div>
			)}

			{!isLoading && (
				<div className="flex justify-center mt-4 md:mt-6 bg-gray-50 min-h-screen">
					<div className="container flex flex-col m-2 md:my-0">
						{/* Título da busca */}
						<h1 className="text-2xl md:text-4xl text-center my-4 md:my-6 px-4">
							Resultados da busca por{" "}
							<span className="italic text-teal-800 font-semibold">"{nome}"</span>
						</h1>

						{/* Barra Horizontal de Filtros */}
						<div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 mx-2 md:mx-4 mb-6">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								{/* Título e Badge */}
								<div className="flex items-center gap-3">
									<h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-teal-600"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
												clipRule="evenodd"
											/>
										</svg>
										Filtros
									</h3>
									{filtroPreco && (
										<span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full font-medium">
											1 ativo
										</span>
									)}
								</div>

								{/* Container dos Filtros de Preço */}
								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6">
									<span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
										Preço:
									</span>
									
									<div className="flex flex-wrap items-center gap-3 md:gap-5">
										<label className="flex items-center gap-2 cursor-pointer group">
											<input
												type="radio"
												name="preco"
												value="200"
												onChange={(e) => setFiltroPreco(e.target.value)}
												className="w-4 h-4 text-teal-600 focus:ring-teal-500 cursor-pointer"
											/>
											<span className="text-sm text-gray-700 group-hover:text-teal-700 transition-colors whitespace-nowrap">
												Até R$ 200
											</span>
										</label>

										<label className="flex items-center gap-2 cursor-pointer group">
											<input
												type="radio"
												name="preco"
												value="500"
												onChange={(e) => setFiltroPreco(e.target.value)}
												className="w-4 h-4 text-teal-600 focus:ring-teal-500 cursor-pointer"
											/>
											<span className="text-sm text-gray-700 group-hover:text-teal-700 transition-colors whitespace-nowrap">
												R$ 200 - R$ 500
											</span>
										</label>

										<label className="flex items-center gap-2 cursor-pointer group">
											<input
												type="radio"
												name="preco"
												value="m500"
												onChange={(e) => setFiltroPreco(e.target.value)}
												className="w-4 h-4 text-teal-600 focus:ring-teal-500 cursor-pointer"
											/>
											<span className="text-sm text-gray-700 group-hover:text-teal-700 transition-colors whitespace-nowrap">
												Acima de R$ 500
											</span>
										</label>
									</div>

									{/* Botão Limpar Filtros */}
									{filtroPreco && (
										<button
											className="px-4 py-2 font-semibold text-sm text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors border border-teal-200 whitespace-nowrap"
											onClick={limparFiltroPreco}
										>
											Limpar Filtros
										</button>
									)}
								</div>
							</div>
						</div>

						{/* Contador de resultados */}
						{produtosFiltrados.length > 0 && (
							<div className="mb-4 px-2 md:px-4">
								<p className="text-sm md:text-base text-gray-600">
									<span className="font-semibold text-gray-800">
										{produtosFiltrados.length}
									</span>{" "}
									{produtosFiltrados.length === 1 ? "produto encontrado" : "produtos encontrados"}
								</p>
							</div>
						)}

						{/* Grid de Produtos ou Estado Vazio */}
						<main className="px-2 md:px-4">
							{/* Mensagem quando não há produtos */}
							{produtosFiltrados.length === 0 && (
								<div className="flex flex-col items-center justify-center py-12 md:py-20 px-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-16 w-16 md:h-20 md:w-20 text-gray-300 mb-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<h2 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2 text-center">
										Nenhum produto encontrado
									</h2>
									<p className="text-sm md:text-base text-gray-500 text-center">
										Tente ajustar os filtros ou busque por outro termo
									</p>
								</div>
							)}

							{/* Grid de Cards de Produtos */}
							{produtosFiltrados.length > 0 && (
								<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-4 md:mb-8">
									{produtosFiltrados.map((produto) => (
										<CardProdutos key={produto.id} produto={produto} />
									))}
								</div>
							)}
						</main>
					</div>
				</div>
			)}
		</>
	)
}

export default ListarProdutosPorNome
```

<br />

<h2>👣 Passo 02 - Atualizar o Componente SearchForm</h2>



Vamos atualizar o Componente **SearchForm**, localizado na pasta **/src/components/navbar**, adicionando a Lógica necessária para o formulário **Buscar Produto por Nome**, tanto no ambiente Desktop, quanto no ambiente Mobile:

1. Substitua o código do Componente **SearchForm**, pelo código abaixo:

```tsx
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm({ className = "" }: { className?: string }) {

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
        <form 
            className={`relative flex items-center w-full ${className}`}
            onSubmit={buscarProdutos}
        >
            <div className="relative w-full flex items-center">
                <input 
                    className="w-full h-10 pl-4 pr-12 text-black bg-white rounded-lg shadow-sm
                             border-2 border-transparent
                             focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
                             placeholder:text-slate-400
                             transition-all duration-200"
                    type="search"
                    required
                    placeholder="Buscar jogos..."
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleBuscarProdutos(e)}
                />
                <button 
                    type="submit" 
                    className="absolute right-1 h-8 w-8 rounded-md
                             bg-teal-500 hover:bg-teal-600 active:bg-teal-700
                             text-white 
                             flex items-center justify-center
                             transition-all duration-200
                             hover:scale-105 active:scale-95
                             shadow-sm hover:shadow-md"
                    aria-label="Buscar"
                >
                    <MagnifyingGlassIcon size={18} weight="bold"/>
                </button>
            </div>
        </form>
    );
}

export default SearchForm
```

<br />

<h2>👣 Passo 03 - Atualizar o Componente App</h2>



Adicione a rota abaixo no Componente **app**:

```tsx
<Route path="/consultarnome/:nome" element={<ListarProdutosPorNome />} />
```

<br />

<h2>👣 Passo 04 - Testar a aplicação</h2>



1. Digite uma palavra ou frase para procurar pelo nome do jogo que você deseja encontrar:

<div align="center"><img src="https://imgur.com/2ZMfDXl.png" title="source: imgur.com" /></div>

2. Caso seja encontrada algum jogo com a palavra ou frase digitada, os resultados serão exibidos na tela

<div align="center"><img src="https://i.imgur.com/nccB5Oc.png" title="source: imgur.com" /></div>

3. Faça uma busca mais genérica, digitando uma letra, por exemplo.

<div align="center"><img src="https://i.imgur.com/K6Wqa3R.png" title="source: imgur.com" /></div>

4. Observe que todos os jogos que possuem no seu nome a letra digitada serão exibidos na tela.
5. No formulário **Filtros**, é possível filtrar os jogos pelo preço de forma automática, sem enviar uma nova requisição para o Backend da aplicação. 

<div align="center"><img src="https://i.imgur.com/4U4NenN.png" title="source: imgur.com" /></div>

6. Note que ao escolher o filtro **Acima de R$ 500,00**, serão exibidos apenas o jogos cujo valor seja maior do que R$ 500,00.
7. Na sequência, clique no botão **Limpar Filtros**

<div align="center"><img src="https://i.imgur.com/AeTP6J6.png" title="source: imgur.com" /></div>

8. Observe que todos os filtros serão removidos e todos os produtos da busca inicial serão exibidos novamente.

<div align="center"><img src="https://i.imgur.com/K6Wqa3R.png" title="source: imgur.com" /></div>

<br />
