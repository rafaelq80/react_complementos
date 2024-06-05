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
import { ToastAlerta } from "../utils/ToastAlerta";

interface CartContextProps {
    adicionarProduto: (produto: Produto) => void
    removerProduto: (produtoId: number) => void
    limparCart: () => void
    items: Produto[]
    quantidadeItems: number
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {

    // Estado que armazenará os Produtos do Carrinho
    const [items, setItems] = useState<Produto[]>([])

    // Estadoque retorna o número de itens do Carrinho
    const quantidadeItems = items.length

    // Função para adicionar Produtos no Carrinho
    function adicionarProduto(produto: Produto) {
        const indice = items.find(items => items.id === produto.id)
        if(indice !== undefined){
            ToastAlerta('Este Produto já foi Adicionado!', 'info')
        }else{
            setItems(state => [...state, produto])
            ToastAlerta('Produto Adicionado!', 'sucesso')
        }
    }

    // Função para Remover um produto especifico do Carrinho
    function removerProduto(produtoId: number) {
        const indice = items.findIndex(items => items.id === produtoId)
        let novoCart = [...items]

        if(indice >= 0){
            novoCart.splice(indice, 1)
            setItems(novoCart)
        }

    }

    // Função para Limpar o Carrinho
    function limparCart() {
        ToastAlerta('Compra Efetuada com Sucesso', 'sucesso')
        setItems([])
    }

    return (
        <CartContext.Provider 
            value={{ adicionarProduto, removerProduto, limparCart, items, quantidadeItems }}
        >
            {children}
        </CartContext.Provider>
    )
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
import { CartContext } from "../../../contexts/CartContext"
import Produto from "../../../models/Produto"

interface CardProdutosProps {
    item: Produto
}

function CardCart({ item }: CardProdutosProps) {

    const { removerProduto } = useContext(CartContext)

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
                    <p className='text-sm italic text-center'>Categoria: Tipo </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <button className='w-full text-slate-100 bg-red-500 hover:bg-red-700 
                                   flex items-center justify-center py-2'
                    onClick={() => removerProduto(item.id)}>
                    Remover
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
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import CardCart from "../cardcart/CardCart";


function Cart() {

    const navigate = useNavigate();
    
    const { items, limparCart } = useContext(CartContext)
    
    return (
        <div className="
                bg-gray-200 
                flex 
                flex-col
                justify-center
                ">

            <h1 className="text-4xl text-center my-4">
                Carrinho de Compras
            </h1>
            <h2 className="text-2xl text-center my-4">
                { items.length === 0 ? 'O Carrinho está vazio!' : ''}
            </h2>
            <div className='container mx-auto my-4 grid grid-cols-1 
                            md:grid-cols-2 lg:grid-cols-5 gap-4'>
                {
                    items.map(produto => (
                        <CardCart key={produto.id} item={produto} />
                    ))
                }
            </div>

            <button className="rounded text-slate-100 bg-slate-400 
          hover:bg-slate-800 w-1/4 py-2 mx-auto flex justify-center"
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
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Perfil from './pages/perfil/Perfil';
import Cart from './components/carrinho/cart/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <BrowserRouter>
            <Navbar />
            <div className='min-h-[90vh] bg-gray-200'>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/cadastrarcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/cadastrarproduto" element={<FormularioProduto />} />
                <Route path="/editarproduto/:id" element={<FormularioProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
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
import { User, ShoppingCart, MagnifyingGlass } from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('Usuário desconectado!', 'info')
        navigate('/')

    }

    let navbarComponent

    if (usuario.token !== "") {
        navbarComponent = (

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
                            <button type="submit" 
                                className="h-9 w-9 p-2.5 ms-2 text-sm font-medium 
                                           text-white bg-teal-500 hover:bg-teal-900 
                                           rounded-lg border border-teal-700 
                                           focus:ring-4 focus:outline-none 
                                           focus:ring-blue-300 dark:bg-teal-600 
                                           dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                                >
                                <MagnifyingGlass size={14} weight="bold" />
                            </button>
                        </form>
                    </div>

                    <div className='flex gap-4 py-4'>
                        <Link to='/produtos' className='hover:underline'>Produtos</Link>
                        <Link to='/categorias' className='hover:underline'>Categorias</Link>
                        <Link to='/cadastrarcategoria' className='hover:underline'>Cadastrar Categoria</Link>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                        <Link to='/perfil'><User size={32} weight='bold' /></Link>
                        <Link to='/cart'><ShoppingCart size={32} weight='bold' /></Link>
                    </div>
                </div>
            </div>

        )
    }
        return (

            <>
                {navbarComponent}
            </>

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
4. Com o projeto aberto no seu Navegador, Faça o Login.

<div align="center"><img src="https://i.imgur.com/99NWhni.png" title="source: imgur.com" /></div>

5. Na sequência, clique no botão **Comprar de qualquer Produto**:

<div align="center"><img src="https://i.imgur.com/GqtwNFH.png" title="source: imgur.com" /></div>

6. Na sequência, clique no ícone do carrinho 🛒. Observe que o Produto foi adicionado no Carrinho:

<div align="center"><img src="https://i.imgur.com/UZj93DL.png" title="source: imgur.com" /></div>

7. Caso você deseje remover o produto do Carrinho, clique no botão **Remover** do produto.
8. Clique no botão **Finalizar Compra**. Será exibida uma mensagem de confirmação da venda e o Carrinho será limpo:

<div align="center"><img src="https://i.imgur.com/tZgTeKq.png" title="source: imgur.com" /></div>

9. Observe que enquanto o Carrinho estiver vazio, o botão **Finalizar Compra** permanecerá desabilitado.
