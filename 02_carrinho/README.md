<h1>Projeto Integrador - Simulador - Carrinho de Compras</h1>



Vamos criar um Simulador de Carrinho de Compras no React, utilizando a **API Context** para armazenar os produtos do Carrinho.

<br />

> [!WARNING]
>
> **Este conteúdo apresentará como criar um Simulador bem simples de um Carrinho de Compras. Para criar um Carrinho de Compras Real, seria necessário fazer diversas mudanças no Backend do projeto, criar diversas tabelas no Banco de dados, além de ter acesso a uma API de Transações Bancárias como o Stripe, Pague Seguro, Mercado Pago, entre outras.**

<br />

<h2>👣 Passo 01 - Criar a Context CartContext</h2>



Vamos criar o Componente **CartContext**, dentro da pasta **src/contexts**, que será utilizada para criar a Context do Carrinho, criando e compartilhando o Carrinho com toda a aplicação:

<br />

> [!WARNING]
>
> Caso você já tenha criado a pasta **contexts**, ignore o passo da criação da pasta.

<br />

1. Na pasta **src**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **contexts**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.

1. Na pasta **contexts**, que foi criada dentro da pasta **src**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
2. O nome do arquivo será **CartContext.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
3. Adicione o código abaixo no Componente **CartContext**:

```tsx
import { createContext, type ReactNode, useState } from "react"
import type Produto from "../models/Produto"

// Cria o tipo Items, como uma herança do tipo Produto
export interface Items extends Produto {
	quantidade: number
}

// Define os Atributos, Estados e Funções que serão compartilhados pelo Contexto
interface CartContextProps {
	adicionarProduto: (produto: Produto) => void
	adicionarItem: (id: number) => void
	removerItem: (id: number) => void
    removerProduto: (id: number) => void
	limparCart: () => void
	items: Items[]
	quantidadeItems: number
	valorTotal: number
}

interface CartProviderProps {
	children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
	// Inicializa o Estado items, que armazenará os produtos adicionados no carrinho
	const [items, setItems] = useState<Items[]>([])

	// Calcula o número total de itens no carrinho (quantidade acumulada)
	const quantidadeItems = items.reduce((acc, item) => acc + item.quantidade, 0)

	// Calcula o valor total da compra em Reais
	const valorTotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

	// Função para adicionar produtos ao carrinho
	function adicionarProduto(produto: Produto) {
		// Localiza o produto no array items e guarda o indice
		const itemIndex = items.findIndex((item) => item.id === produto.id)

		if (itemIndex !== -1) {
			// Produto já está no carrinho, aumenta a quantidade
			const novoCart = [...items]
			novoCart[itemIndex].quantidade += 1
			setItems(novoCart)
			alert("01 item adicionado!")
		} else {
			// Produto não está no carrinho, adiciona novo item
			setItems((itensAtuais) => [...itensAtuais, { ...produto, quantidade: 1 }])
			alert("Produto adicionado ao carrinho!")
		}
	}

	function adicionarItem(id: number) {
		// Localiza o produto no array items e guarda o indice
		const itemIndex = items.findIndex((item) => item.id === id)
        
        // Se encontrou o produto, incrementa a quantidade
		if (itemIndex !== -1) {
			const novoCart = [...items]
			novoCart[itemIndex].quantidade += 1
			setItems(novoCart)
			alert("01 item adicionado!")
		} else {
			alert("Produto não encontrado no carrinho!")
		}
	}

	// Função para remover produtos do carrinho (reduz a quantidade ou remove)
	function removerItem(id: number) {
		// Localiza o produto no array items e guarda o indice
		const itemIndex = items.findIndex((item) => item.id === id)

        // Se encontro produto, cria um novo carrinho com os itens atuais
		if (itemIndex !== -1) {
			const novoCart = [...items]

            // Se a quantidade do item for maior do que 1, 
            // decrementa quantidade do item
			if (novoCart[itemIndex].quantidade > 1) {
				// Reduz a quantidade do produto
				novoCart[itemIndex].quantidade -= 1
				setItems(novoCart)
				alert("01 Item removido!")
			} else {
				// Senão, remove o produto do carrinho
				novoCart.splice(itemIndex, 1)
				setItems(novoCart)
				alert("Produto removido!")
			}
		}
	}

	function removerProduto(id: number) {
		const existe = items.some((item) => item.id === id)

		if (!existe) {
			alert("Produto não encontrado no carrinho!")
			return
		}

        // Se o produto existe, remove o produto do carrinho
		const novoCart = items.filter((item) => item.id !== id)

		setItems(novoCart)
		alert("Produto e todos os seus itens foram removidos!")
	}

	// Função para limpar o carrinho
	function limparCart() {
		alert("Compra efetuada com sucesso!")
		setItems([])
	}

	return (
		<CartContext.Provider
			value={{
				adicionarProduto,
				adicionarItem,
				removerItem,
                removerProduto,
				limparCart,
				items,
				quantidadeItems,
				valorTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
```

<br />

<h2>👣 Passo 02 - Criar o Componente CardCart</h2>



Vamos criar o Componente **CardCart**, dentro da pasta **src/components/carrinho/cardcart**, que será utilizado para exibir os dados e a quantidade de cada produto, que foi adicionado no carrinho:

1. Na pasta **components**, dentro da pasta **src**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **carrinho**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
3. Na pasta **carrinho**, que foi criada dentro da pasta **src/components**, clique com o botão direito do mouse e clique na  opção **New File** (Novo Arquivo).
6. O nome do arquivo será **CardCart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
7. Adicione o código abaixo no Componente **CardCart**:

```tsx
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { useContext } from "react"
import { CartContext, type Items } from "../../../contexts/CartContext"

interface CardProdutosProps {
    item: Items
}

function CardCart({ item }: CardProdutosProps) {

    const { adicionarItem, removerItem, removerProduto } = useContext(CartContext)

    return (
        <div className='flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
            {/* Imagem do Produto */}
            <div className='w-32 h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>
                <img 
                    src={item.foto} 
                    className='max-h-full max-w-full object-contain' 
                    alt={item.nome} 
                />
            </div>

            {/* Informações do Produto */}
            <div className='grow flex flex-col justify-between'>
                <div>
                    <h3 className='font-semibold text-gray-800 mb-1'>
                        {item.nome}
                    </h3>
                    <p className='text-sm text-gray-500 mb-2'>
                        Categoria: {item.categoria?.tipo}
                    </p>
                    <p className='text-xl font-bold text-blue-600'>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(item.preco)}
                    </p>
                </div>

                {/* Controles de Quantidade */}
                <div className='flex items-center gap-4 mt-3'>
                    <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-l-lg transition-colors'
                            onClick={() => removerItem(item.id)}
                        >
                            <MinusIcon size={20} className="text-gray-600" />
                        </button>
                        
                        <span className='px-4 font-semibold text-gray-800 min-w-10 text-center'>
                            {item.quantidade}
                        </span>
                        
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-r-lg transition-colors'
                            onClick={() => adicionarItem(item.id)}
                        >
                            <PlusIcon size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <button 
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                        onClick={() => removerProduto(item.id)}
                        title="Remover produto"
                    >
                        <TrashIcon size={20} />
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className='flex flex-col items-end justify-between'>
                <p className='text-lg font-bold text-gray-800'>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(item.preco * item.quantidade)}
                </p>
            </div>
        </div>
    )
}

export default CardCart
```

O Componente **CardCart**, basicamente irá exibir os dados de cada produto adicionado no carrinho. Além disso, ele possui 3 botões:

- Botão **+**, para aumentar o número de itens do produto
- Botão **-**, para diminuir o número de itens ou remover o produto do carrinho quando a quantidade for igual a zero
- Botão 🗑, para remover o produto do carrinho

Observe que acessamos as funções **removerProduto**, **adicionarItem** e **removerItem** do Componente **CartContext** (Context), através do Hook **useContext**, que permitirá aumentar e diminuir a quantidade de itens de um produto adicionado no Carrinho.

Note que adicionamos o evento **onClick** nos 3 botões do componente CardCart que executarão respectivamente as funções **removerProduto**, **adicionarItem** e **removerItem**.

<br />

<h2>👣 Passo 03 - Criar Componente Cart</h2>



Vamos criar o Componente **Cart**, dentro da pasta **src/components/carrinho**, que será utilizado para listar os produtos adicionados no carrinho:

1. Na pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
4. O nome do arquivo será **Cart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
5. Adicione o código abaixo no Componente **Cart**:

```tsx
import { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import CardCart from '../cardcart/CardCart'
import { ShoppingCartIcon } from '@phosphor-icons/react'

function Cart() {
	const { items, quantidadeItems, valorTotal, limparCart } =
		useContext(CartContext)

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="container mx-auto px-4">
				{/* Cabeçalho */}
				<h1 className="text-3xl md:text-4xl text-center text-gray-800 mb-8">
					Carrinho de Compras
				</h1>

				{/* Carrinho Vazio */}
				{items.length === 0 && (
					<div className="bg-white rounded-lg shadow-sm p-12 text-center">
						<ShoppingCartIcon size={64} className="mx-auto text-gray-300 mb-4" />
						<h2 className="text-xl font-semibold text-gray-600 mb-2">
							Seu carrinho está vazio
						</h2>
						<p className="text-gray-500">
							Adicione produtos para começar suas compras!
						</p>
					</div>
				)}

				{/* Layout Principal: Lista de Produtos + Resumo */}
				{items.length > 0 && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Coluna Esquerda: Lista de Produtos */}
						<div className="lg:col-span-2 space-y-4">
							{items.map((produto) => (
								<CardCart key={produto.id} item={produto} />
							))}
						</div>

						{/* Coluna Direita: Resumo da Compra */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
								<h2 className="text-xl font-bold text-gray-800 mb-4 pb-4 border-b border-gray-200">
									Resumo da Compra
								</h2>

								<div className="space-y-3 mb-6">
									<div className="flex justify-between text-gray-600">
										<span>Produtos ({quantidadeItems})</span>
										<span className="font-semibold text-gray-800">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(valorTotal)}
										</span>
									</div>

									<div className="flex justify-between text-gray-600">
										<span>Frete</span>
										<span className="font-semibold text-green-600">
											Grátis
										</span>
									</div>

									<div className="flex justify-between text-gray-600">
										<span>Desconto</span>
										<span className="font-semibold text-gray-800">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(0.0)}
										</span>
									</div>
								</div>

								<div className="flex justify-between items-center text-lg font-bold py-4 mb-6 border-t border-gray-200">
									<span className="text-gray-800">Total</span>
									<span className="text-2xl text-blue-600">
										{Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										}).format(valorTotal)}
									</span>
								</div>

								{/* Formas de Pagamento */}
								<div className="mb-4 pb-4 border-b border-gray-200">
									<p className="text-sm text-gray-600 mb-3">Formas de pagamento:</p>
									<div className="flex flex-wrap gap-2 justify-center">
										<div className="flex flex-row bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/credit-card.png'
												alt='Logo Cartão de Crédito'
												className='w-10'
											></img>
										</div>
										<div className="flex flex-row items-center gap-1 bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/pix-svgrepo-com.svg'
												alt='Logo do PIX'
												className='w-4'
											></img>
											<span>PIX</span>
										</div>
										<div className="flex flex-row bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg'
												alt='Logo do Google Pay'
												className='w-8'
											></img>
										</div>
										<div className="flex flex-row bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg'
												alt='Logo do Apple Pay'
												className='w-8'
											></img>
										</div>
										<div className="bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/boleto-logo.svg'
												alt='Logo do Boleto Bancáriao'
												className='w-10'
											></img>
										</div>
									</div>
								</div>

								<button
									className="w-full bg-teal-500 hover:bg-teal-900 text-white font-semibold py-3 rounded-lg transition-colors"
									type="button"
									onClick={limparCart}
								>
									Finalizar Compra
								</button>

								<p className="text-xs text-gray-500 text-center mt-4">
									Frete grátis para todo o Brasil
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
```

O Componente **Cart**, basicamente exibirá todos os produtos adicionados no carrinho e um quadro exibindo o resumo da compra.

Observe que acessamos o estado **itens** (lista de produtos do carrinho), a função **limparCart** (limpa o carrinho), o atributo **quantidadeItems** (armazena o total de itens adicionados no Carrinho) e o atributo **valorTotal** (armazena o valor total da Compra) do Componente **CartContext** (Context), através do Hook **useContext**.

Note que adicionamos o evento **onClick** no botão **Finalizar Compra**, que executará a função **limparCart**.

<br />

<h2>👣 Passo 04 - Atualizar o Componente CardProdutos</h2>



Vamos atualizar o Componente **CardProdutos**, localizado na pasta **/src/components/produtos/cardprodutos**, adicionando a Lógica necessária para o botão **Comprar** interagir com o Carrinho:

1. Substitua o código do Componente **CardProdutos**, pelo código abaixo:

```tsx
import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type Produto from '../../../models/Produto'
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';

interface CardProdutoProps {
	produto: Produto
}

function CardProdutos({ produto }: Readonly<CardProdutoProps>) {

	const { adicionarProduto } = useContext(CartContext);
	
	return (
		<div className="flex flex-col justify-between overflow-hidden bg-white rounded-lg">
			<div className="flex items-end justify-end pt-2 pr-2">
				<Link to={`/editarproduto/${produto.id}`}>
					<PencilIcon
						size={24}
						className="mr-1 hover:fill-teal-800"
					/>
				</Link>

				<Link to={`/deletarproduto/${produto.id}`}>
					<TrashIcon
						size={24}
						className="mr-1 hover:fill-red-700"
					/>
				</Link>
			</div>

			<div className="py-4">
				<img
					src={produto.foto}
					className="mx-auto mt-1 h-44 max-w-75"
					alt={produto.nome}
				/>

				<div className="p-4">
					<p className="text-sm text-center uppercase">
						{produto.nome}
					</p>
					<h3 className="text-xl font-bold text-center uppercase">
						{Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(produto.preco)}
					</h3>
					<p className="text-sm italic text-center">
						Categoria: {produto.categoria?.tipo}
					</p>
				</div>
			</div>
			<div className="flex flex-wrap">
				<button
					className="flex items-center justify-center w-full py-2 text-white bg-teal-600 hover:bg-teal-900"
					onClick={() => adicionarProduto(produto)}
				>
					Comprar
				</button>
			</div>
		</div>
	)
}

export default CardProdutos

```

Observe que acessamos a função **adicionarProduto** do Componente **CartContext** (Context), através do Hook **useContext**.

Adicionamos o evento **onClick** no botão **Comprar**, que executará a função **adicionarProduto**.

<br />

<h2>👣 Passo 05 - Atualizar o Componente App</h2>



Vamos atualizar o Componente **App**, adicionando o Componente **CartContext** (torná-lo disponível para todos os Componentes) e Criando uma rota para o Componente **Cart**:

```tsx
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DeletarCategoria from "./components/categorias/deletarcategorias/DeletarCategoria"
import FormCategoria from "./components/categorias/formcategoria/FormCategoria"
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import DeletarProduto from "./components/produtos/deletarprodutos/DeletarProduto"
import FormProduto from "./components/produtos/formproduto/FormProduto"
import ListarProdutos from "./components/produtos/listarprodutos/ListarProdutos"
import ListarProdutosPorNome from "./components/produtos/listarprodutospornome/ListarProdutosPorNome"
import Cart from "./components/carrinho/cart/Cart"
import { CartProvider } from "./contexts/CartContext"

/** 
 * Tipo (type) para controlar o estado do Menu Mobile (aberto ou fechado)
 * 
 * Type é uma forma mais flexível de declarar tipos no TypeScript. 
 * Ele permite criar aliases para objetos, tipos primitivos, unions (|) e 
 * intersections (&). 
 * type é recomendado quando há necessidade de compor tipos complexos, 
 * reutilizar estruturas ou trabalhar com variações de tipo. 
 * Ao contrário da interface, o type não pode ser declarado mais de uma vez
 * no seu código.
*/
type MenuState = 'closed' | 'open';

function App() {

  // Estado para controlar se o Menu Mobile está aberto ou fechado
  const [menuState, setMenuState] = useState<MenuState>('closed');

  // Função para alternar o estado do Menu Mobile (abrir/fechar)
  const toggleMenu = (): void => {
    setMenuState(prevState => prevState === 'closed' ? 'open' : 'closed');
  };

  // Função para fechar o Menu Mobile (usada em eventos de navegação ou clique fora)
  const closeMenu = (): void => {
    setMenuState('closed');
  };

  return (
    <>
      {/* Provider do contexto do carrinho */}
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            
            <Navbar 
              menuState={menuState}
              onMenuToggle={toggleMenu}
              onMenuClose={closeMenu}
            />
            
            <div className='flex-1 w-full pt-16 bg-slate-200'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/cadcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/cadproduto" element={<FormProduto />} />
                <Route path="/editarproduto/:id" element={<FormProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
                <Route path="/consultarnome/:nome" element={<ListarProdutosPorNome />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
            <Footer />           
          </div>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
```

Observe que envolvemos todos os Componentes adicionados no Componente **App**, com o Componente **CartProvider**.

Note que também criamos uma rota (**/cart**) para o Componente **Cart**.

<br />

<h2>👣 Passo 06 - Atualizar o Componente Navbar</h2>



Vamos atualizar o Componente **Navbar**, adicionando um link para a rota do Componente **Cart**:

```tsx
import { ListIcon, ShoppingCartIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import { CartContext } from "../../contexts/CartContext";

/** 
 * Tipo (type) para controlar o estado do Menu Mobile (aberto ou fechado)
 * 
 * Type é uma forma mais flexível de declarar tipos no TypeScript. 
 * Ele permite criar aliases para objetos, tipos primitivos, unions (|) e 
 * intersections (&). 
 * type é recomendado quando há necessidade de compor tipos complexos, 
 * reutilizar estruturas ou trabalhar com variações de tipo. 
 * Ao contrário da interface, o type não pode ser declarado mais de uma vez
 * no seu código.
*/
type MenuState = 'closed' | 'open';

/** 
 * Tipagem das props recebidas pelo componente Navbar
 * - menuState: estado do menu mobile
 * - onMenuToggle: função para abrir/fechar menu mobile
 * - onMenuClose: função para fechar menu mobile
 * Todas as funções são passadas pelo componente pai (App)
*/
interface NavbarProps {
  menuState: MenuState;
  onMenuToggle: () => void;
  onMenuClose: () => void;
};

function Navbar({ menuState, onMenuToggle, onMenuClose }: Readonly<NavbarProps>) {
    
    // Obtém a quantidade de itens do carrinho via context
    const { quantidadeItems } = useContext(CartContext)
    
    /**
     * Referência para o menu mobile (pode ser usada para acessibilidade ou foco)
     * 
     * O useRef é um hook do React que permite criar uma referência mutável 
     * que persiste durante o ciclo de vida do componente. 
     * Ele é comumente utilizado para acessar diretamente elementos do DOM ou 
     * para armazenar valores que não precisam causar re-renderização quando 
     * modificados, que é o caso do menu mobile.
     *  
    */ 
    const menuRef = useRef<HTMLDivElement>(null);
    
    /** 
     * Função Handler (função responsável por responder a eventos disparados 
     * pela interface do usuário, como cliques, digitação, envio de formulários,
     *  entre outros.), para alternar o menu mobile entre abrir e fechar.
     */ 
    const handleMenuToggle = (): void => {
        onMenuToggle();
    };
    
    // Handler para fechar o menu mobile, ao clicar no botão X
    const handleMenuClose = (): void => {
        onMenuClose();
    };

    return (
        <>
            {/* Navbar fixa no topo, visível em todas as telas */}
            <div className='fixed top-0 left-0 z-50 flex justify-center w-full py-4 text-white bg-slate-800 md:py-2'>
                <div className="container flex items-center justify-between mx-6 mt-2 text-lg">
                    {/* Logo da loja, sempre visível, redireciona para Home */}
                    <Link to='/home'>
                        <img
                            src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png"
                            alt="Logo"
                            className='w-50 md:w-60'
                        />
                    </Link>

                    {/* Barra de busca (aparece apenas no desktop/tablet) */}
                    <div className="relative flex items-center justify-center w-2/5 text-black max-md:hidden">
                        <SearchForm />
                    </div>

                    {/* Menu de navegação desktop/tablet */}
                    <div className='items-center hidden gap-4 py-4 md:flex'>
                        <Link to='/produtos' className='hover:underline'>Produtos</Link>
                        <Link to='/categorias' className='hover:underline'>Categorias</Link>
                        <Link to='/cadcategoria' className='hover:underline'>Cadastrar Categoria</Link>
                        <UserIcon size={32} weight='bold' />
                        <Link to="/cart" className="relative flex items-center">
                            <ShoppingCartIcon size={32} weight="bold" />
                            {quantidadeItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {quantidadeItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Botão menu mobile (hambúrguer), só aparece em telas pequenas e quando o menu está fechado */}
                    {menuState === 'closed' && (
                      <button className="p-2 cursor-pointer md:hidden" onClick={handleMenuToggle} aria-label="Abrir menu">
                        <ListIcon size={32} weight="bold" />
                      </button>
                    )}
                </div>
            </div>

            {/* Menu mobile (aparece sobrepondo o conteúdo quando aberto) */}
            {menuState === 'open' && (
                <div 
                    ref={menuRef}
                    className="fixed top-0 left-0 z-50 w-full h-full transition-all duration-300 ease-in-out bg-slate-800 bg-opacity-95 md:hidden animate-fade-in animate-slide-in"
                    style={{ animation: 'fade-in 0.3s, slide-in 0.3s' }}
                >
                    <div className="relative flex flex-col items-start justify-start gap-2 p-6 text-lg text-left text-white">
                        {/* Linha com logo à esquerda e botão X à direita */}
                        <div className="flex items-center justify-between w-full mb-2">
                          <img
                              src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png"
                              alt="Logo"
                              className='w-50 md:w-60'
                          />
                          <button
                              type="button"
                              aria-label="Fechar menu"
                              className="mr-2 text-white cursor-pointer hover:text-gray-300"
                              onClick={handleMenuClose}
                          >
                              <XIcon size={32} weight="bold" />
                          </button>
                        </div>
                        
                        {/* Barra de busca mobile */}
                        <div className="w-full mb-4">
                            <SearchForm />
                        </div>
                        
                        {/* Links de navegação mobile */}
                        <Link to='/home' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link to='/produtos' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Produtos
                        </Link>
                        <Link to='/cadproduto' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Cadastrar Produto
                        </Link>
                        <Link to='/categorias' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Categorias
                        </Link>
                        <Link to='/cadcategoria' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Cadastrar Categoria
                        </Link>
                        
                        {/* Ícones de usuário e carrinho no menu mobile */}
                        <div className='flex gap-4 mt-4'>
                        <Link to='' onClick={handleMenuClose} >
                            <UserIcon size={32} weight='bold' className="text-white" />
                        </Link>
                        <Link to='/cart' onClick={handleMenuClose} >
                            <ShoppingCartIcon size={32} weight='bold' className="text-white" />                        
                            {quantidadeItems > 0 && (
                                <span className="relative -top-9 -right-5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {quantidadeItems}
                                </span>
						    )}
                        </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
```

Observe que criamos um link para a rota **/cart**, no ícone do carrinho e adicionamos um span, que funcionará como um label informando o número de produtos adicionados no Carrinho. Note que o link foi adicionado tanto no menu desktop, quanto no menu mobile.

<br />

<h2>👣 Passo 07 - Testar o Carrinho</h2>



1. Clique no botão **Comprar de qualquer Produto**:

<div align="center"><img src="https://i.imgur.com/F2Ruj59.png" title="source: imgur.com" /></div>

2. Na sequência, clique no ícone do carrinho 🛒. Observe que o Produto foi adicionado no Carrinho e o número de produtos adicionados será exibido no ícone do carrinho, na Navbar:

<div align="center"><img src="https://i.imgur.com/2qmegTk.png" title="source: imgur.com" /></div>

3. Caso você deseje adicionar mais unidades do produto, clique no botão **+**, caso você deseje remover uma unidade do produto do Carrinho, clique no botão **-** do produto e caso deseje remover o produto do carrinho, clique no botão com o ícone da lixeira, como vemos na imagem do Componente **CardCart** abaixo:

<div align="center"><img src="https://i.imgur.com/8G7BiTJ.png" title="source: imgur.com" /></div>

4. Se o número de itens do produto chegar a zero, o produto será removido do Carrinho.
5. Observe que a quantidade de itens e o preço final da compra será atualizado automaticamente, na Seção **Resumo da Compra**, como mostra a imagem abaixo:

<div align="center"><img src="https://i.imgur.com/txXURbq.png" title="source: imgur.com" /></div>

6. Os itens **Desconto** e **Frete** são apenas figurativos.
7. Clique no botão **Finalizar Compra**. Será exibida uma mensagem de confirmação da venda, o Resumo da Compra será totalmente zerado e o Carrinho será limpo, como vemos na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/SoJRawk.png" title="source: imgur.com" /></div>

8. Observe que enquanto o Carrinho estiver vazio, o botão **Finalizar Compra** e o resumo das compras permanecerá oculto.
9. Caso você tenha implementado a segurança, recomendamos que o Carrinho seja limpo ao efetuar logout.
