<h1>Projeto Integrador - Simulador - Carrinho de Compras</h1>



Vamos criar um Simulador de Carrinho de Compras no React, utilizando a **API Context** para armazenar os produtos do Carrinho.

<br />

> [!WARNING]
>
> **Este conteúdo apresentará como criar um Simulador bem simples de um Carrinho de Compras. Para criar um Carrinho de Compras Real, seria necessário fazer diversas mudanças no Backend do projeto, criar diversas tabelas no Banco de dados, além de ter acesso a uma API de Transações Bancárias.**

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
import { createContext, ReactNode, useState, useMemo } from "react";
import Produto from "../models/Produto";

// Cria o tipo Items, como uma herança do tipo Produto, adicionando quantidade
export interface Items extends Produto{
    quantidade: number;
}

// Define os atributos, estados e funções compartilhados pelo contexto do carrinho
interface CartContextProps {
    adicionarProduto: (produto: Produto) => void;
    adicionarItem: (id: number) => void;
    removerItem: (id: number) => void;
    limparCart: () => void;
    items: Items[];
    quantidadeItems: number;
    valorTotal: number;
}

// Props do provider do contexto
interface CartProviderProps {
    children: ReactNode;
}

// Criação do contexto do carrinho
export const CartContext = createContext({} as CartContextProps);

// Provider do contexto do carrinho, envolve a aplicação
export function CartProvider({ children }: Readonly<CartProviderProps>) {
    
    // Estado que armazena os produtos adicionados ao carrinho
    const [items, setItems] = useState<Items[]>([]);

    // Calcula o número total de itens no carrinho (quantidade acumulada)
    const quantidadeItems = items.reduce((acc, item) => acc + item.quantidade, 0);

    // Calcula o valor total da compra em Reais
    const valorTotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    // Adiciona um produto ao carrinho (ou incrementa quantidade se já existir)
    function adicionarProduto(produto: Produto) {
        // Localiza o produto no array items e guarda o indice
        const itemIndex = items.findIndex(item => item.id === produto.id);
        
        if (itemIndex !== -1) {
            // Produto já está no carrinho, aumenta a quantidade
            const novoCart = [...items];
            novoCart[itemIndex].quantidade += 1;
            setItems(novoCart);
           alert('01 item adicionado!');
        } else {
            // Produto não está no carrinho, adiciona novo item
            setItems(itensAtuais => [...itensAtuais, { ...produto, quantidade: 1 }]);
           alert('Produto adicionado ao carrinho!');
        }
    }

    // Incrementa a quantidade de um item já presente no carrinho
    function adicionarItem(id: number) {
        // Localiza o produto no array items e guarda o indice
        const itemIndex = items.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            const novoCart = [...items];
            novoCart[itemIndex].quantidade += 1;
            setItems(novoCart);
           alert('01 item adicionado!');
        } else {
           alert('Produto não encontrado no carrinho!');
        }
    }

    // Remove um item do carrinho (decrementa quantidade ou remove se for o último)
    function removerItem(id: number) {
       // Localiza o produto no array items e guarda o indice
        const itemIndex = items.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            const novoCart = [...items];
            
            if (novoCart[itemIndex].quantidade > 1) {
                // Reduz a quantidade do produto
                novoCart[itemIndex].quantidade -= 1;
                setItems(novoCart);
               alert('01 Item removido!');
            } else {
                // Remove o produto se a quantidade for 1
                novoCart.splice(itemIndex, 1);
                setItems(novoCart);
               alert('Produto removido!');
            }
        }
    }

    // Limpa o carrinho
    function limparCart() {
       alert('Compra efetuada com sucesso!');
        setItems([]);
    }

    // Memoiza o valor do contexto para evitar recriação desnecessária
    const contextValue = useMemo(() => ({
        adicionarProduto,
        adicionarItem,
        removerItem,
        limparCart,
        items,
        quantidadeItems,
        valorTotal
    }), [items, quantidadeItems, valorTotal]);

    // Retorna o provider envolvendo os filhos
    return (
        <CartContext.Provider 
            value={contextValue}
        >
            {children}
        </CartContext.Provider>
    );
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
import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { useContext } from "react"
import { Items, CartContext } from "../../contexts/CartContext"

// Props esperadas pelo CardCart: um item do carrinho
interface CardProdutosProps {
    item: Items
}

// CardCart exibe informações de um produto no carrinho e permite alterar quantidade
function CardCart({ item }: Readonly<CardProdutosProps>) {

    // Consome funções do contexto para adicionar/remover itens
    const { adicionarItem, removerItem } = useContext(CartContext)

    return (
        // Card principal com imagem, detalhes e botões
        <div className='flex flex-col rounded-lg overflow-hidden justify-between bg-white'>
            <div className='py-4'>
                {/* Imagem do produto */}
                <img src={item.foto} className='mt-1 h-40 max-w-75 mx-auto' alt={item.nome} />
                <div className='p-4'>
                    {/* Nome, preço e categoria */}
                    <p className='text-sm text-center uppercase'>{item.nome}</p>
                    <h3 className='text-xl text-center font-bold uppercase'>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(item.preco)}
                    </h3>
                    <p className='text-sm italic text-center'>Categoria: {item.categoria?.tipo} </p>
                    {/* Quantidade do item */}
                    <h4 className='my-2 text-center'>
                        <span className="font-semibold">Quantidade:</span> {item.quantidade} 
                    </h4>
                </div>
            </div>
            {/* Botões para adicionar/remover quantidade */}
            <div className="flex flex-wrap">
                <button className='w-1/2 text-slate-100 bg-blue-500 hover:bg-blue-700 
                                   flex items-center justify-center py-2'
                    onClick={() => adicionarItem(item.id)}>
                    <PlusIcon size={32} />
                </button>
                <button className='w-1/2 text-slate-100 bg-red-500 hover:bg-red-700 
                                   flex items-center justify-center py-2'
                    onClick={() => removerItem(item.id)}>
                    <MinusIcon size={32} />
                </button>
            </div>
        </div >
    )
}

export default CardCart
```

O Componente **CardCart**, basicamente irá exibir os dados de cada produto adicionado no carrinho. Além disso, ele possui 2 botões:

- Botão **+**, para aumentar o número de itens do produto
- Botão **-**, para diminuir o número de itens do produto

Observe que acessamos as funções **adicionarItem** e **removerItem** do Componente **CartContext** (Context), através do Hook **useContext**, que permitirá aumentar e diminuir a quantidade de itens de um produto adicionado no Carrinho.

Note que adicionamos o evento **onClick** nos botões **+** e **-**, que executarão respectivamente as funções **adicionarItem** e **removerItem**.

<br />

<h2>👣 Passo 03 - Criar Componente Cart</h2>



Vamos criar o Componente **Cart**, dentro da pasta **src/components/carrinho**, que será utilizado para listar os produtos adicionados no carrinho:

1. Na pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
4. O nome do arquivo será **Cart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
5. Adicione o código abaixo no Componente **Cart**:

```tsx
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import CardCart from './CardCart'

// Componente principal do Carrinho de Compras
function Cart() {
	// Consome o contexto do carrinho para acessar itens, quantidade, valor total e funções
	const { items, quantidadeItems, valorTotal, limparCart } =
		useContext(CartContext)

	return (
		// Container principal: ocupa toda a tela, fundo cinza, padding responsivo
		<div className="min-h-screen flex justify-center bg-slate-200 pt-4 px-2 mt-22 md:mt-0 md:px-8">
			{/* Limita a largura máxima e centraliza o conteúdo */}
			<div className="w-full max-w-7xl flex flex-col mx-auto">
				{/* Título do carrinho, responsivo */}
				<h1 className="text-3xl md:text-4xl text-center my-4">
					Carrinho de Compras
				</h1>

				{/* Mensagem de carrinho vazio, responsiva */}
				{items.length === 0 && (
					<span className="my-8 text-xl md:text-3xl text-center block w-full">O Carrinho está vazio!</span>
				)}

				{/* Grid de cards do carrinho: sempre 2 colunas, espaçamento responsivo */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-2 md:px-8 py-4">
					{items.map((produto) => (
						<CardCart key={produto.id} item={produto} />
					))}
				</div>

				{/* Se houver itens, exibe o resumo da compra */}
				{quantidadeItems > 0 && (
					// Resumo da compra: responsivo, centralizado, com grid para separar detalhes e botão
					<div className="container mx-auto my-12 py-4 w-full md:w-2/3 lg:w-1/2 grid grid-cols-1 md:grid-cols-2 border rounded-lg bg-white text-lg gap-4">
						{/* Detalhes do resumo */}
						<div className="w-full flex flex-col px-4 md:px-8">
							<h2 className="text-lg md:text-2xl text-center font-bold py-2">
								Resumo da Compra
							</h2>
							<p className="pb-2">
								<span className="font-semibold">
									Total de items adicionados:{' '}
								</span>
								{quantidadeItems}
							</p>
							<p>
								<span className="font-semibold">
									Subtotal:{' '}
								</span>
								{Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(valorTotal)}
							</p>
							<p>
								<span className="font-semibold">
									Desconto:{' '}
								</span>
								{Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(0.0)}
							</p>
							<p>
								<span className="font-semibold">Frete: </span>
								{Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(0.0)}
							</p>
							<hr className="border-xl border-slate-800 py-1" />
							<p>
								<span className="font-semibold">Total: </span>
								{Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(valorTotal)}
							</p>
						</div>
						{/* Botão de finalizar compra, responsivo */}
						<div className="flex justify-center items-center px-4 md:px-8">
							<button
								className="rounded text-slate-100 bg-slate-400 hover:bg-slate-800 w-full md:w-1/2 lg:w-2/3 xl:w-3/4 py-2 mx-auto flex justify-center my-4"
								type="submit"
								disabled={items.length === 0}
								onClick={limparCart}
							>
								Finalizar Compra
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
```

O Componente **Cart**, basicamente exibirá todos os produtos adicionados no carrinho.

Observe que acessamos o estado **itens** (lista de produtos do carrinho), a função **limparCart** (limpa o carrinho), o atributo **quantidadeItems** (armazena o total de itens adicionados no Carrinho) e o atributo **valorTotal** (armazena o valor total da Compra) do Componente **CartContext** (Context), através do Hook **useContext**.

Note que adicionamos o evento **onClick** no botão **Finalizar Compra**, que executará a função **limparCart**.

<br />

<h2>👣 Passo 04 - Atualizar o Componente CardProdutos</h2>



Vamos atualizar o Componente **CardProdutos**, localizado na pasta **/src/components/produtos/cardprodutos**, adicionando a Lógica necessária para o botão **Comprar** interagir com o Carrinho:

1. Substitua o código do Componente **CardProdutos**, pelo código abaixo:

```tsx
// Importa ícones de edição e exclusão, além de hooks e contexto
import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'
import { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'

// Props esperadas pelo CardProdutos: um produto
interface CardProdutoProps {
	produto: Produto
}

// CardProdutos exibe informações de um produto e permite ações de editar, deletar e comprar
function CardProdutos({ produto }: Readonly<CardProdutoProps>) {

	// Consome função do contexto para adicionar produto ao carrinho
	const { adicionarProduto } = useContext(CartContext)
	
	return (
		// Card principal com ações, imagem, detalhes e botão comprar
		<div className="flex flex-col justify-between my-4 sm:my-6 md:my-4 lg:my-10 overflow-hidden bg-white rounded-lg">
			{/* Ações de editar e deletar produto */}
			<div className="flex items-end justify-end pt-2 pr-2">
				{/* Botão para editar produto */}
				<Link to={`/editarproduto/${produto.id}`}>
					<PencilIcon
						size={24}
						className="mr-1 hover:fill-teal-800"
					/>
				</Link>

				{/* Botão para deletar produto */}
				<Link to={`/deletarproduto/${produto.id}`}>
					<TrashIcon
						size={24}
						className="mr-1 hover:fill-red-700"
					/>
				</Link>
			</div>

			{/* Imagem e detalhes do produto */}
			<div className="py-4">
				{/* Imagem do produto */}
				<img
					src={produto.foto}
					className="mx-auto mt-1 h-44 max-w-75"
					alt={produto.nome}
				/>

				<div className="p-4">
					{/* Nome do produto */}
					<p className="text-sm text-center uppercase">
						{produto.nome}
					</p>
					{/* Preço do produto */}
					<h3 className="text-xl font-bold text-center uppercase">
						{Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(produto.preco)}
					</h3>
					{/* Categoria do produto */}
					<p className="text-sm italic text-center">
						Categoria: {produto.categoria?.tipo}
					</p>
				</div>
			</div>
			{/* Botão para adicionar o produto ao carrinho */}
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
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DeletarCategoria from './components/categorias/deletarcategorias/DeletarCategoria';
import FormCategoria from './components/categorias/formcategoria/FormCategoria';
import ListarCategorias from './components/categorias/listarcategorias/ListarCategorias';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import DeletarProduto from './components/produtos/deletarprodutos/DeletarProduto';
import FormProduto from './components/produtos/formproduto/FormProduto';
import ListarProdutos from './components/produtos/listarprodutos/ListarProdutos';
import Cart from './components/carrinho/Cart';
import { CartProvider } from './contexts/CartContext';

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

  // Função para verificar se o Footer deve ser exibido (só aparece quando o Menu Mobile está fechado)
  const shouldShowFooter = (): boolean => menuState === 'closed';

  // Estrutura principal do App, com Router, Navbar, conteúdo e Footer
  return (
    // Provider do contexto do carrinho
    <CartProvider>
      {/* BrowserRouter permite navegação entre páginas sem recarregar o site */}
      <BrowserRouter>
        {/* Container principal da aplicação, flex para responsividade */}
        <div className="min-h-screen flex flex-col">
          {/* Navbar fixa no topo em mobile, relativa no desktop */}
          <div className="md:relative">
            <Navbar 
              menuState={menuState} // Estado do menu mobile
              onMenuToggle={toggleMenu} // Alterna menu mobile
              onMenuClose={closeMenu} // Fecha menu mobile
            />
          </div>
          {/* Conteúdo principal da página, com rotas e responsividade */}
          <div className="flex-1 bg-slate-100 md:pt-0 md:pb-0 max-h-[calc(100vh-64px)] overflow-auto md:max-h-full">
            <Routes>
              {/* Definição das rotas do app, cada caminho renderiza um componente */}
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
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          {/* Footer só aparece quando o menu mobile está fechado */}
          <div className={`${shouldShowFooter() ? 'block' : 'hidden'} md:static`}>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
      </CartProvider>
    
  );
}

export default App
```

Observe que envolvemos todos os Componentes adicionados no Componente **App**, com o Componente **CartProvider**.

Note que também criamos uma rota (**/cart**) para o Componente **Cart**.

<br />

<h2>👣 Passo 06 - Atualizar o Componente Navbar</h2>



Vamos atualizar o Componente **Navbar**, adicionando um link para a rota do Componente **Cart**:

```tsx
import { ListIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
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

// Componente Navbar: exibe navegação, busca e ícones de usuário/carrinho
function Navbar({ menuState, onMenuToggle, onMenuClose }: Readonly<NavbarProps>) {
    

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
            {/* Navbar fixa no topo em mobile, relativa no desktop */}
            <div className='fixed md:relative top-0 left-0 z-50 w-full bg-slate-800 text-white flex justify-center py-4 md:py-2'>
                <div className="container mx-6 mt-2 md:mt-0 flex items-center justify-between text-lg">
                    {/* Logo da loja, sempre visível, redireciona para Home */}
                    <Link to='/home'>
                        <img
                            src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1705976699033"
                            alt="Logo"
                            className='w-50 md:w-60'
                        />
                    </Link>

                    {/* Barra de busca (aparece apenas no desktop/tablet) */}
                    <div className="relative flex w-2/5 items-center justify-center text-black max-md:hidden">
                        <form className="flex w-full items-center justify-center">
                            <input className="h-9 w-10/12 rounded-lg bg-white px-4 py-4 focus:outline-none"
                                type="search"
                                placeholder="Pesquisar produto"
                                id="busca"
                                name="busca"
                                required
                            />
                            <button type="submit" className="ms-2 h-9 w-9 rounded-lg border border-teal-700 bg-teal-500 p-2.5 text-sm font-medium text-white hover:bg-teal-900">
                                <MagnifyingGlassIcon size={14} weight="bold"/>
                            </button>
                        </form>
                    </div>

                    {/* Menu de navegação desktop/tablet, com links e ícones alinhados */}
                    <div className='hidden md:flex items-center gap-4 py-4'>
                        <Link to='/produtos' className='hover:underline'>Produtos</Link>
                        <Link to='/categorias' className='hover:underline'>Categorias</Link>
                        <Link to='/cadcategoria' className='hover:underline'>Cadastrar Categoria</Link>
                        {/* Ícones de usuário e carrinho alinhados */}
                        <div className="flex items-center gap-2">
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
                    </div>

                    {/* Botão menu mobile (hambúrguer), só aparece em telas pequenas e quando o menu está fechado */}
                    {menuState === 'closed' && (
                      <button className="p-2 md:hidden cursor-pointer" onClick={handleMenuToggle} aria-label="Abrir menu">
                        <ListIcon size={32} weight="bold" />
                      </button>
                    )}
                </div>
            </div>

            {/* Menu mobile (aparece sobrepondo o conteúdo quando aberto) */}
            {menuState === 'open' && (
                <div 
                    ref={menuRef}
                    className="fixed top-0 left-0 z-50 h-full w-full bg-slate-800 bg-opacity-95 md:hidden transition-all duration-300 ease-in-out animate-fade-in animate-slide-in"
                    style={{ animation: 'fade-in 0.3s, slide-in 0.3s' }}
                >
                    <div className="relative flex flex-col items-start justify-start gap-2 p-6 text-left text-lg text-white">
                        {/* Linha com logo à esquerda e botão X à direita */}
                        <div className="flex w-full items-center justify-between mb-2">
                          <img
                              src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1705976699033"
                              alt="Logo"
                              className='w-50 md:w-60'
                          />
                          <button
                              type="button"
                              aria-label="Fechar menu"
                              className="text-white hover:text-gray-300 mr-2 cursor-pointer"
                              onClick={handleMenuClose}
                          >
                              <XIcon size={32} weight="bold" />
                          </button>
                        </div>
                        
                        {/* Barra de busca mobile */}
                        <form className="mb-4 flex w-full items-center">
                            <input className="h-9 w-10/12 rounded-lg bg-white px-4 py-4 text-black focus:outline-none"
                                type="search"
                                placeholder="Pesquisar produto"
                                id="busca-mobile"
                                name="busca-mobile"
                                required
                            />
                            <button type="submit" className="ms-2 h-9 w-9 rounded-lg border border-teal-700 bg-teal-500 p-2.5 text-sm font-medium text-white hover:bg-teal-900">
                                <MagnifyingGlassIcon size={14} weight="bold" className="text-white"/>
                            </button>
                        </form>
                        
                        {/* Links de navegação mobile */}
                        <Link to='/home' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link to='produtos' onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300">
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
                        <div className='mt-4 flex gap-4'>
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



1. Abra o Terminal do **VSCode**.
2. Execute o projeto através do comando abaixo:

```
yarn dev
```

3. Pressione a combinação de teclas **o + enter** do seu teclado para abrir o Projeto no Navegador.
4. Na sequência, clique no botão **Comprar de qualquer Produto**:

<div align="center"><img src="https://i.imgur.com/GqtwNFH.png" title="source: imgur.com" /></div>

5. Na sequência, clique no ícone do carrinho 🛒. Observe que o Produto foi adicionado no Carrinho e o número de produtos adicionados será exibido no ícone do carrinho, na Navbar:

<div align="center"><img src="https://i.imgur.com/eOAsSdu.png" title="source: imgur.com" /></div>

6. Caso você deseje adicionar mais unidades do produto, clique no botão **+** e caso você deseje remover uma unidade do produto do Carrinho, clique no botão **-** do produto, como vemos na imagem do Componente **CardCart** abaixo:

<div align="center"><img src="https://i.imgur.com/7a67PIk.png" title="source: imgur.com" /></div>

7. Se o número de itens do produto chegar a zero, o produto será removido do Carrinho.
8. Observe que a quantidade de itens e o preço final da compra será atualizado automaticamente, na Seção **Resumo da Compra**, como mostra a imagem abaixo:

<div align="center"><img src="https://i.imgur.com/Wb3vLpX.png" title="source: imgur.com" /></div>

9. Os itens **Desconto** e **Frete** são apenas figurativos.
10. Clique no botão **Finalizar Compra**. Será exibida uma mensagem de confirmação da venda, o Resumo da Compra será totalmente zerado e o Carrinho será limpo, como vemos na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/ySyAync.png" title="source: imgur.com" /></div>

11. Observe que enquanto o Carrinho estiver vazio, o botão **Finalizar Compra** e o resumo das compras permanecerá oculto.
12. Caso você tenha implementado a segurança, recomendamos que o Carrinho seja limpo ao efetuar logout.
