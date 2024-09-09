<h1>Projeto Integrador - Simulador - Carrinho de Compras</h1>



Vamos criar um Simulador de Carrinho de Compras no React, utilizando a **API Context** para armazenar os produtos do Carrinho.

<br />

> [!WARNING]
>
> **Este conteúdo apresentará como criar um Simulador bem simples de um Carrinho de Compras. Para criar um Carrinho de Compras Real, seria necessário fazer diversas mudanças no Backend do projeto, criar diversas tabelas no Banco de dados, além de ter acesso a uma API de Transações Bancárias.**

<br />

<h2>👣 Passo 01 - Criar a Context CartContext</h2>



Vamos criar o Componente **CartContext**, dentro da pasta **src/contexts**, que será utilizada para criar a Context do Carrinho, criando e compartilhando o Carrinho com toda a aplicação:

1. Na pasta **src**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **contexts**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.

1. Na pasta **contexts**, dentro da pasta **src**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
2. O nome do arquivo será **CartContext.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
3. Adicione o código abaixo no Componente **CartContext**:

```tsx
import { createContext, ReactNode, useState } from "react";
import Produto from "../models/Produto";


export interface Items extends Produto{
    quantidade: number;
}

interface CartContextProps {
    adicionarProduto: (produto: Produto) => void;
    aumentarProduto: (produtoId: number) => void;
    removerProduto: (produtoId: number) => void;
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
    
    const [items, setItems] = useState<Items[]>([]);

    // Calcula o número total de itens no carrinho (quantidade acumulada)
    const quantidadeItems = items.reduce((acc, item) => acc + item.quantidade, 0);

    // Calcula o valor total da compra
    const valorTotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    // Função para adicionar produtos ao carrinho
    function adicionarProduto(produto: Produto) {
        const itemIndex = items.findIndex(item => item.id === produto.id);
        
        if (itemIndex !== -1) {
            // Produto já está no carrinho, aumenta a quantidade
            const novoCart = [...items];
            novoCart[itemIndex].quantidade += 1;
            setItems(novoCart);
           alert('01 item adicionado!');
        } else {
            // Produto não está no carrinho, adiciona novo item
            setItems(prevItems => [...prevItems, { ...produto, quantidade: 1 }]);
           alert('Produto adicionado ao carrinho!');
        }
    }

    function aumentarProduto(produtoId: number) {
        const itemIndex = items.findIndex(item => item.id === produtoId);
        
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
    function removerProduto(produtoId: number) {
        const itemIndex = items.findIndex(item => item.id === produtoId);
        
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
            value={{ adicionarProduto, aumentarProduto, removerProduto, limparCart, items, quantidadeItems, valorTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

```

<br />

<h2>👣 Passo 02 - Criar o Componente CardCart</h2>



Vamos criar o Componente **CardCart**, dentro da pasta **src/components/cardcart**, que será utilizado para exibir os dados de cada produto adicionado no carrinho:

1. Na pasta **components**, dentro da pasta **src**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **carrinho**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
3. Na pasta **carrinho**, dentro da pasta **src/components**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
4. O nome da pasta será **cardcart**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
5. Na pasta **cardcart**, dentro da pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
6. O nome do arquivo será **CardCart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
7. Adicione o código abaixo no Componente **CardCart**:

```tsx
import { useContext } from "react"
import { CartContext, Items } from "../../../contexts/CartContext"
import Produto from "../../../models/Produto"
import { Plus, Minus } from "@phosphor-icons/react"

interface CardProdutosProps {
    item: Items
}

function CardCart({ item }: CardProdutosProps) {

    const { aumentarProduto, removerProduto } = useContext(CartContext)

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
                    onClick={() => aumentarProduto(item.id)}>
                    <Plus size={32} />
                </button>
                <button className='w-1/2 text-slate-100 bg-red-500 hover:bg-red-700 
                                   flex items-center justify-center py-2'
                    onClick={() => removerProduto(item.id)}>
                    <Minus size={32} />
                </button>
            </div>
        </div >
    )
}

export default CardCart
```

O Componente **CardCart**, basicamente irá exibir os dados de cada produto adicionado no carrinho.

Observe que acessamos a função **removerProduto** do Componente **CartContext** (Context), através do Hook **useContext**, que permitirá remover um produto do Carrinho.

Note que adicionamos o evento **onClick** no botão **Remover**, que executará a função **removerProduto**.

<br />

<h2>👣 Passo 03 - Criar Componente Cart</h2>



Vamos criar o Componente **Cart**, dentro da pasta **src/components/cart**, que será utilizado para listar os produtos adicionados no carrinho:

1. Na pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **cart**. Após digitar o nome da pasta, pressione a tecla **enter** do seu teclado para concluir.
3. Na pasta **cart**, dentro da pasta **src/components/carrinho**, clique com o botão direito do mouse e clique na opção **New File** (Novo Arquivo).
4. O nome do arquivo será **Cart.tsx**. Após digitar o nome do arquivo, pressione a tecla **enter** do seu teclado para concluir.
5. Adicione o código abaixo no Componente **Cart**:

```tsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import CardCart from "../cardcart/CardCart";


function Cart() {

    const { items, quantidadeItems, valorTotal, limparCart } = useContext(CartContext)

    return (
        <div className="
                bg-gray-200 
                flex 
                flex-col
                justify-center
                mb-8
                ">

            <h1 className="text-4xl text-center my-4">
                Carrinho de Compras
            </h1>
            <h2 className="text-2xl text-center my-4">
                {items.length === 0 ? 'O Carrinho está vazio!' : ''}
            </h2>
            <div className='container mx-auto my-4 grid grid-cols-1 
                            md:grid-cols-2 lg:grid-cols-5 gap-4'>
                {
                    items.map(produto => (
                        <CardCart key={produto.id} item={produto} />
                    ))
                }
            </div>
                <div className="text-center text-lg">
                    <p>
                        <span className="font-semibold">Total de items adicionados: </span> 
                        {quantidadeItems}
                    </p>
                    <p>
                        <span className="font-semibold">Valor Total compra: </span> 
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(valorTotal)}
                    </p>
                </div>
            <button className="rounded text-slate-100 bg-slate-400 
          hover:bg-slate-800 w-1/4 py-2 mx-auto flex justify-center mt-8"
                type="submit"
                disabled={items.length === 0 ? true : false}
                onClick={limparCart}>
                Finalizar Compra
            </button>
        </div>
    )
}

export default Cart
```

O Componente **Cart**, basicamente exibirá todos os produtos adicionados no carrinho.

Observe que acessamos o estado **itens** (lista de produtos do carrinho) e a função **limparCart** do Componente **CartContext** (Context), através do Hook **useContext**.

Note que adicionamos o evento **onClick** no botão **Finalizar Compra**, que executará a função **limparCart**.

<br />

<h2>👣 Passo 04 - Atualizar o Componente CardProdutos</h2>



Vamos atualizar o Componente **CardProdutos**, localizado na pasta **/src/components/produtos/cardprodutos**, adicionando a Lógica necessária para o botão **Comprar** interagir com o Carrinho:

1. Substitua o código do Componente **CardProdutos**, pelo trecho de código abaixo:

```tsx
import { Pencil, Trash } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import Produto from "../../../models/Produto"
import { useContext } from "react"
import { CartContext } from "../../../contexts/CartContext"

interface CardProdutoProps {
  produto: Produto
}

function CardProdutos({ produto }: CardProdutoProps) {

  const { adicionarProduto } = useContext(CartContext)
  
  return (
    <div className='flex flex-col rounded-lg overflow-hidden justify-between bg-white my-2'>
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

import 'react-toastify/dist/ReactToastify.css';

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
                <Route path="/cadastrarcategoria" element={<FormCategoria />} />
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
import { MagnifyingGlass, ShoppingCart, User } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Navbar() {

    return (

        <div className='
            w-full 
            bg-slate-800  
            text-white 
            flex 
            justify-center 
            py-4
        '>
            <div className="
                container 
                flex 
                justify-between 
                text-lg
            ">
                <Link to='/home'>
                    <img
                        src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1705976699033"
                        alt="Logo"
                        className='w-60'
                    />
                </Link>

                <div className="flex-1 flex justify-center items-center relative w-30 text-black">
                    <form className="w-3/4 flex justify-center">
                        <input className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
                            type="search"
                            placeholder="Pesquisar produto"
                            id="busca"
                            name="busca"
                            required
                        />
                        <button type="submit" className="h-9 w-9 p-2.5 ms-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-900 rounded-lg border border-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                            <MagnifyingGlass size={14} weight="bold" />
                        </button>
                    </form>
                </div>

                <div className='flex gap-4 py-4'>
                    <Link to='/produtos' className='hover:underline'>Produtos</Link>
                    <Link to='/categorias' className='hover:underline'>Categorias</Link>
                    <Link to='/cadcategoria' className='hover:underline'>Cadastrar Categoria</Link>
                    <User size={32} weight='bold' />
                    <Link to='/cart'><ShoppingCart size={32} weight='bold' /></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
```

Observe que criamos um link para a rota **/cart**, no ícone do carrinho.

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

5. Na sequência, clique no ícone do carrinho 🛒. Observe que o Produto foi adicionado no Carrinho:

<div align="center"><img src="https://i.imgur.com/I976FQQ.png" title="source: imgur.com" /></div>

6. Caso você deseje adicionar mais unidades do produto, clique no botão **+**.
7. Caso você deseje remover uma unidade do produto do Carrinho, clique no botão **-** do produto.
8. Se o número de itens do produto chegar a zero, o produto será removido do Carrinho.
9. Observe que a quantidade de itens e o preço final da compra será atualizado automaticamente.
10. Clique no botão **Finalizar Compra**. Será exibida uma mensagem de confirmação da venda e o Carrinho será limpo:

<div align="center"><img src="https://i.imgur.com/LdHbXxR.png" title="source: imgur.com" /></div>

9. Observe que enquanto o Carrinho estiver vazio, o botão **Finalizar Compra** permanecerá desabilitado e a quantidade e preço total serão zerados.
