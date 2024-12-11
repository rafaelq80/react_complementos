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
import { createContext, ReactNode, useState } from "react";
import Produto from "../models/Produto";

// Cria o tipo Items, como uma herança do tipo Produto
export interface Items extends Produto{
    quantidade: number;
}

// Define os Atributos, Estados e Funções que serão compartilhados pelo Contexto
interface CartContextProps {
    adicionarProduto: (produto: Produto) => void;
    adicionarItem: (id: number) => void;
    removerItem: (id: number) => void;
    limparCart: () => void;
    items: Items[];
    quantidadeItems: number;
    valorTotal: number;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
    
    // Inicializa o Estado items, que armazenará os produtos adicionados no carrinho
    const [items, setItems] = useState<Items[]>([]);

    // Calcula o número total de itens no carrinho (quantidade acumulada)
    const quantidadeItems = items.reduce((acc, item) => acc + item.quantidade, 0);

    // Calcula o valor total da compra em Reais
    const valorTotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    // Função para adicionar produtos ao carrinho
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

    // Função para remover produtos do carrinho (reduz a quantidade ou remove)
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

    // Função para limpar o carrinho
    function limparCart() {
       alert('Compra efetuada com sucesso!');
        setItems([]);
    }

    return (
        <CartContext.Provider 
            value={{ adicionarProduto, adicionarItem, removerItem, limparCart, items, quantidadeItems, valorTotal }}
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
3. Na pasta **carrinho**, que foi criada dentro da pasta **src/components**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
4. O nome da pasta será **cardcart**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
5. Na pasta **cardcart**, que foi criada dentro da pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
6. O nome do arquivo será **CardCart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
7. Adicione o código abaixo no Componente **CardCart**:

```tsx
import { Minus, Plus } from "@phosphor-icons/react"
import { useContext } from "react"
import { CartContext, Items } from "../../../contexts/CartContext"

interface CardProdutosProps {
    item: Items
}

function CardCart({ item }: CardProdutosProps) {

    const { adicionarItem, removerItem } = useContext(CartContext)

    return (
        <div className='flex flex-col rounded-lg overflow-hidden justify-between bg-white'>
            <div className='py-4'>

                <img src={item.foto} className='mt-1 h-40 max-w-75 mx-auto' alt={item.nome} />

                <div className='p-4'>
                    <p className='text-sm text-center uppercase'>{item.nome}</p>
                    <h3 className='text-xl text-center font-bold uppercase'>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(item.preco)}
                    </h3>
                    <p className='text-sm italic text-center'>Categoria: {item.categoria?.tipo} </p>
                    <h4 className='my-2 text-center'>
                        <span className="font-semibold">Quantidade:</span> {item.quantidade} 
                    </h4>
                </div>
            </div>
            <div className="flex flex-wrap">
                <button className='w-1/2 text-slate-100 bg-blue-500 hover:bg-blue-700 
                                   flex items-center justify-center py-2'
                    onClick={() => adicionarItem(item.id)}>
                    <Plus size={32} />
                </button>
                <button className='w-1/2 text-slate-100 bg-red-500 hover:bg-red-700 
                                   flex items-center justify-center py-2'
                    onClick={() => removerItem(item.id)}>
                    <Minus size={32} />
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



Vamos criar o Componente **Cart**, dentro da pasta **src/components/carrinho/cart**, que será utilizado para listar os produtos adicionados no carrinho:

1. Na pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **cart**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
3. Na pasta **cart**, que foi criada dentro da pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
4. O nome do arquivo será **Cart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
5. Adicione o código abaixo no Componente **Cart**:

```tsx
import { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import CardCart from '../cardcart/CardCart'

function Cart() {
	const { items, quantidadeItems, valorTotal, limparCart } =
		useContext(CartContext)

	return (
		<>
			<div
				className="
                bg-gray-200 
                flex 
                flex-col
                justify-center
                "
			>
				<h1 className="text-4xl text-center my-4">
					Carrinho de Compras
				</h1>

				<h2 className="text-2xl text-center my-4">
					{items.length === 0 ? 'O Carrinho está vazio!' : ''}
				</h2>

				<div
					className="container mx-auto my-4 grid grid-cols-1 
                            md:grid-cols-2 lg:grid-cols-5 gap-4"
				>
					{items.map((produto) => (
						<CardCart key={produto.id} item={produto} />
					))}
				</div>

				{quantidadeItems > 0 && (
					<div className="container mx-auto my-8 py-4 w-[60vw] grid grid-cols-2 border rounded-lg bg-white text-lg">
						<div className="w-full flex flex-col ml-8">
							<h2 className="text-2xl text-center font-bold py-2">
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
						<div className="flex justify-center items-center">
							<button
								className="rounded text-slate-100 bg-slate-400 
          hover:bg-slate-800 w-1/2 py-2 mx-auto flex justify-center my-4"
								type="submit"
								disabled={items.length === 0 ? true : false}
								onClick={limparCart}
							>
								Finalizar Compra
							</button>
						</div>
					</div>
				)}
			</div>
		</>
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
import { Pencil, Trash } from "@phosphor-icons/react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../../contexts/CartContext"
import Produto from "../../../models/Produto"

interface CardProdutoProps {
  produto: Produto
}

function CardProdutos({ produto }: CardProdutoProps) {

  const { adicionarProduto } = useContext(CartContext)
  
  return (
    <div className='flex flex-col rounded-lg overflow-hidden justify-between bg-white my-10'>
      <div className="flex justify-end items-end pt-2 pr-2">

        <Link to={`/editarproduto/${produto.id}`}>
          <Pencil size={24} className="mr-1 hover:fill-teal-700" />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={24} className="mr-1 hover:fill-red-700" />
        </Link>

      </div>

      <div className='py-4'>

        <img src={produto.foto} className='mt-1 h-44 max-w-75 mx-auto' alt={produto.nome} />

        <div className='p-4'>
          <p className='text-sm text-center uppercase'>{produto.nome}</p>
          <h3 className='text-xl text-center font-bold uppercase'>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(produto.preco)}
          </h3>
          <p className='text-sm italic text-center'>Categoria: {produto.categoria?.tipo}</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button className='w-full text-white bg-teal-500 hover:bg-teal-900 flex items-center justify-center py-2'
          onClick={() => adicionarProduto(produto)}>
          Comprar
        </button>
      </div>
    </div >
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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DeletarCategoria from './components/categorias/deletarcategorias/DeletarCategoria';
import FormCategoria from './components/categorias/formcategoria/FormCategoria';
import ListarCategorias from './components/categorias/listarcategorias/ListarCategorias';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import DeletarProduto from './components/produtos/deletarprodutos/DeletarProduto';
import FormularioProduto from './components/produtos/formproduto/FormularioProduto';
import ListarProdutos from './components/produtos/listarprodutos/ListarProdutos';
import Cart from './components/carrinho/cart/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {

  return (
    <>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <div className='min-h-[90vh] bg-gray-200'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/cadcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/cadastrarproduto" element={<FormularioProduto />} />
                <Route path="/editarproduto/:id" element={<FormularioProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </CartProvider>
    </>
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
import { MagnifyingGlass, ShoppingCart, User } from '@phosphor-icons/react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'

function Navbar() {
	
    const navigate = useNavigate()

    const { quantidadeItems } = useContext(CartContext)

	return (
		<div
			className="
            w-full 
            bg-slate-800  
            text-white 
            flex 
            justify-center 
            py-4
        "
		>
			<div
				className="
                container 
                flex 
                justify-between 
                text-lg
            "
			>
				<Link to="/home">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1705976699033"
						alt="Logo"
						className="w-60"
					/>
				</Link>

				<div className="flex-1 flex justify-center items-center relative w-30 text-black">
					<form className="w-3/4 flex justify-center">
						<input
							className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
							type="search"
							placeholder="Pesquisar produto"
							id="busca"
							name="busca"
							required
						/>
						<button
							type="submit"
							className="h-10 w-10 ms-2 flex justify-center items-center text-sm font-medium text-white bg-teal-500 hover:bg-teal-900 rounded-lg border border-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
						>
							<MagnifyingGlass size={14} weight="bold" />
						</button>
					</form>
				</div>

				<div className="flex gap-4 py-4">
					<Link to="/produtos" className="hover:underline">
						Produtos
					</Link>
					<Link to="/categorias" className="hover:underline">
						Categorias
					</Link>
					<Link to="/cadcategoria" className="hover:underline">
						Cadastrar Categoria
					</Link>
					<User size={32} weight="bold" />
					<Link to="/cart">
						<ShoppingCart size={32} weight="bold" />
						{quantidadeItems > 0 && (
							<span className="relative -top-9 -right-5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
								{quantidadeItems}
							</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar

```

Observe que criamos um link para a rota **/cart**, no ícone do carrinho e adicionamos um span, que funcionará como um label informando o número de produtos adicionados no Carrinho.

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
