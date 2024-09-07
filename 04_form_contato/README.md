<h1>Projeto Integrador - Formulário de Contato</h1>



Um **Formulário de Contato** é uma ferramenta essencial para qualquer site ou empresa que deseja se comunicar com seus visitantes e/ou clientes de forma eficiente. Ele permite que os usuários entrem em contato fornecendo informações importantes, como nome, e-mail, assunto e mensagem. O **Formulário de Contato** é uma maneira conveniente e organizada de melhorar o relacionamento com seus consumidores e visitantes.

Existem diversas formas de criar um **Formulário de Contato** no React. Neste tutorial, utilizaremos uma Biblioteca chamada **EmailJS**, que permite enviar e-mails diretamente do seu código do lado do cliente (Projeto React), sem a necessidade de um componente do lado do servidor. Veja como funciona:

1. **Configuração**: você cria uma conta na plataforma EmailJS, configura a conta de e-mail que será utilizada para receber os e-mails e os seus modelos de e-mail. Você pode definir modelos para vários cenários, como formulários de contato, confirmações de pedidos ou redefinições de senha.

2. **Integração**: Em sua aplicação web, você instala a biblioteca EmailJS, adiciona o Componente no seu formulário e configura as credenciais da sua conta EmailJS (ID do usuário, ID do Email e ID da Template) no código do lado do cliente.

3. **Uso**: Quando um usuário envia um formulário (por exemplo, um formulário de contato), você pode usar o EmailJS para enviar um e-mail. Você passa o ID do modelo, o endereço de e-mail do destinatário e quaisquer dados dinâmicos (como entrada do usuário) para a API da Biblioteca EmailJS. A Biblioteca EmailJS processa essas informações e envia o e-mail usando o modelo configurado.

4. **Personalização**: você pode personalizar o conteúdo do e-mail incluindo espaços reservados em seu modelo. Esses espaços reservados são substituídos por dados reais quando o e-mail é enviado. Por exemplo, você pode incluir o nome, e-mail e mensagem do usuário no corpo do e-mail.

5. **Considerações de segurança**: Lembre-se de que usar EmailJS significa que a funcionalidade do seu e-mail depende inteiramente do código do lado do cliente. Embora seja conveniente, é essencial lidar com informações confidenciais (como chaves de API ou endereços de e-mail) com cuidado para evitar a exposição, configurando variáveis de ambiente, por exemplo.

6. **Limitações da conta gratuita:** A conta gratuita da  Biblioteca EmailJS lhe permite enviar e/ou receber até 500 e-mails por dia.

<br />

<div align="left"><img src="https://i.imgur.com/cUBt5MQ.png" title="source: imgur.com" width="4%"/> <a href="https://swiperjs.com/react" target="_blank"><b>Documentação do Email JS - Envio de E-mails no React</b></a></div>

<br />

<h2>👣 Passo 01 - Criar uma Conta grátis no Email JS</h2>



Vamos criar uma conta gratuita no Email JS:

1. Acesse o endereço: **https://www.emailjs.com**

<div align="center"><img src="https://i.imgur.com/xuhsxew.png" title="source: imgur.com" /></div>

2. Clique na opção **CREATE FREE ACCOUNT**

<div align="center"><img src="https://i.imgur.com/0R6f5Gu.png" title="source: imgur.com" /></div>

3. Na próxima janela, informe o **endereço do e-mail, que será utilizado para enviar e receber mensagens, através do EmailJS,** crie uma senha para o serviço, valide no reCAPTCHA e clique no botão **Sign Up**.

<div align="center"><img src="https://i.imgur.com/8rvzOCA.png" title="source: imgur.com" /></div>

4. Você receberá um e-mail para validar a sua conta. Clique no botão **Verify email**.

<div align="center"><img src="https://i.imgur.com/ozLc6pu.png" title="source: imgur.com" /></div>

5. Após a validação da conta, clique no botão **Go to Sign-In**, para efetuar o login.

<div align="center"><img src="https://i.imgur.com/ChvZLdK.png" title="source: imgur.com" /></div>

6. Observe que você receberá um novo e-mail, confirmando que a sua conta foi validada.

<div align="center"><img src="https://i.imgur.com/2D9vY8w.png" title="source: imgur.com" /></div>

7. Faça o login no site do EmailJS.

<div align="center"><img src="https://i.imgur.com/eaq0VEW.png" title="source: imgur.com" /></div>

8. Será aberta a janela abaixo:

<div align="center"><img src="https://i.imgur.com/hRWsgZE.png" title="source: imgur.com" /></div>

<br />

<h2>👣 Passo 02 - Criar o arquivo .env no Projeto React</h2>

<br />

> [!WARNING]
>
> **Caso você já tenha criado o arquivo .env no seu projeto, ignore este Passo!**

<br />

Crie o arquivo **.env** na pasta raiz do seu projeto:

1. **Dentro da pasta raiz do Projeto React**, crie um arquivo com o nome **.env**, como mostra a imagem abaixo:

<div align="center"><img src="https://i.imgur.com/UzC2uBS.png" title="source: imgur.com" /></div>

<br />

> [!CAUTION]
>
> Um Erro muito comum é criar o arquivo **.env** dentro de alguma pasta do projeto. O arquivo **.env**, **obrigatoriamente deve estar na pasta raiz do seu projeto**, como mostra a imagem acima. Caso contrário, o seu Frontend deixará de funcionar localmente.

<br />

Para finalizar, vamos modiﬁcar o nosso arquivo **.gitignore**, para que o nosso arquivo **.env** não seja enviado para o Github, funcionando apenas no nosso computador, da seguinte forma:

1. Abra o arquivo **.gitignore**, localizado na pasta raiz do projeto:

<div align="center"><img src="https://i.imgur.com/1PjxLWv.png" title="source: imgur.com" /></div>

2. Adicione a linha abaixo no arquivo **.gitignore**:

```tsx
.env
```

3. após a alteração, o arquivo **.gitignore** ficará semelhante a imagem abaixo:

<div align="center"><img src="https://i.imgur.com/BO2DAk5.png" title="source: imgur.com" /></div>

A linha adicionada pode ser colocada em qualquer ponto do arquivo, não precisa estar exatamente no mesmo local indicado na imagem acima.

<br />

<h2>👣 Passo 03 - Criar um Email Service no Email JS</h2>



Nesta etapa, vamos adicionar um serviço de e-mail. Um serviço de email fornece integração entre a Biblioteca EmailJS e seu servidor de e-mails. Os serviços de e-mail permitem conectar provedores de e-mail pessoais que oferecem funcionalidades básicas de e-mail: um endereço de e-mail e uma caixa de entrada. Isso inclui provedores como Gmail, Fastmail, Outlook 365, entre outros. Os serviços de e-mail pessoal são úteis no EmailJS quando você precisa enviar um pequeno número de e-mails para si mesmo ou para outras pessoas a partir de sua conta de e-mail pessoal. Observe que sua conta de e-mail pessoal poderá ser bloqueada se você ultrapassar o limite diário do provedor de e-mail, e seu endereço de e-mail poderá ser sinalizado como spam se você enviar e-mails não solicitados para vários destinatários. Nossa recomendação geral é usar serviços de e-mail pessoais apenas para fins de desenvolvimento ou para uso em volumes muito baixos.

Os serviços de email transacional permitem conectar provedores de email transacional dedicados que foram projetados para enviar um grande número de emails para um grande número de destinatários. Esses provedores geralmente são mais robustos, podem lidar com volumes maiores e fornecer uma melhor reputação de e-mail (o que significa menos chances de seus e-mails acabarem na pasta de spam). Recomendamos fortemente que você use um desses provedores para seu ambiente de produção em conjunto com uma conta paga.

Como estamos construindo um formulário de contato simples, onde o e-mail deverá ir para a caixa de entrada de e-mail pessoal, optamos por utilizar o Gmail. 

1. Clique no botão **Add New Service**

<div align="center"><img src="https://i.imgur.com/KAsuzjn.png" title="source: imgur.com" /></div>

2. Na janela **Select Service**, selecione o **Provedor de Serviço de Email Gmail**

<div align="center"><img src="https://i.imgur.com/uxdjgpj.png" title="source: imgur.com" /></div>

3. Na janela **Config Service**, na opção **Name**, adicione um nome para o Serviço. No exemplo definimos o nome como **Gmail**

<div align="center"><img src="https://i.imgur.com/f3nfUxp.png" title="source: imgur.com" /></div>

4. Na sequência, clique no botão **Connect Account**, para conectar o Serviço **Gmail** com a sua conta de e-mail no Gmail.

<div align="center"><img src="https://i.imgur.com/U7TpmHH.png" title="source: imgur.com" /></div>

5. Dê um duplo clique sobre a conta do Gmail, que você deseja utilizar e faça o login, caso seja solicitado

<div align="center"><img src="https://i.imgur.com/Iew0U5n.png" title="source: imgur.com" /></div>

6. Na sequência, clique no botão **Continuar** para validar o login via EmailJS.

<div align="center"><img src="https://i.imgur.com/9sT6LD7.png" title="source: imgur.com" /></div>

7. Para finalizar, clique no botão **Continuar** para autorizar o acesso do EmailJS aos serviços da sua conta do Gmail.

<div align="center"><img src="https://i.imgur.com/FiJfsbD.png" title="source: imgur.com" /></div>

8. Se a configuração for concluída com êxito, observe que na janela **Config Service** onde estava o botão **Connect Account**, será exibida uma mensagem indicando que o Serviço **Gmail** está conectado com a sua conta de e-mail no Gmail.

<div align="center"><img src="https://i.imgur.com/HHPRwPs.png" title="source: imgur.com" /></div>

9. Na opção **Service ID** (indicado na imagem abaixo), copie o código gerado pelo Serviço **Gmail**

<div align="center"><img src="https://i.imgur.com/Iw9JrzO.png" title="source: imgur.com" /></div>

10. Adicione este código no arquivo **.env**, criado no Projeto React, na variável **VITE_EMAIL_SERVICE_ID**, como mostra o trecho de código abaixo:

```bash
VITE_API_URL=https://lojagames.onrender.com
VITE_EMAIL_SERVICE_ID=service_2943o9q
```

11. Clique no botão **Create Service**, para concluir a criação do Serviço **Gmail**.

<div align="center"><img src="https://i.imgur.com/66I1yYe.png" title="source: imgur.com" /></div>

<br />

<h2>👣 Passo 04 - Criar um Email Template no Email JS</h2>



Agora que temos o Serviço de e-mail criado, precisamos criar nosso Template (modelo) de e-mail, que definirá o assunto do nosso e-mail, qual conteúdo ele conterá, para onde deverá ser enviado, entre outros. Vamos criar o Template:

1. No menu lateral, localizado no lado esquerdo da tela, clique na opção **Email Templates**:

<div align="center"><img src="https://i.imgur.com/95U7gPG.png" title="source: imgur.com" /></div>

2. Na sequência, clique no botão **Create New Template**

<div align="center"><img src="https://i.imgur.com/RebehBl.png" title="source: imgur.com" /></div>

3. Na janela **Template**, na opção **Subject**, vamos adicionar o assunto do e-mail. Como o assunto da mensagem será digitado pelo usuário no Formulário de Contato, vamos adicionar a variável **assunto**. Note que por se tratar de uma variável, ela será adicionada dentro de 2 chaves `{{ assunto }}`, como vemos na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/F2k2OLH.png" title="source: imgur.com" /></div>

4. Em seguida, na opção **Content**, clique no botão **Edit Content 🡪 Design Editor**, para editar o conteúdo do corpo do e-mail:

<div align="center"><img src="https://i.imgur.com/nuAnI6y.png" title="source: imgur.com" /></div>

5. Vamos criar um modelo bem simples. Substitua o modelo atual, pelo código abaixo:

```bash
Olá Loja de Games,

Você recebeu uma nova mensagem de {{nome}}, email: {{email}}

{{mensagem}}

Atenciosamente,
EmailJS team
```

6. Note que foram adicionadas algumas variáveis no meio do texto: `{{ nome }}, {{ email }} e {{ mensagem }}`, que serão recebidas através do Formulário de Contato. Na imagem abaixo, você confere o resultado final:

<div align="center"><img src="https://i.imgur.com/4zDfHjP.png" title="source: imgur.com" /></div>

7. Clique no botão **Apply Changes** para concluir.
8. No menu superior, clique na opção **Settings**.
9. No item **Name**, defina um nome para a Template. Em nosso exemplo, utilizamos o nome **Nest Send Mail Template**, como vemos na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/YzRCVYe.png" title="source: imgur.com" /></div>

10. Na opção **Template ID** (indicado na imagem abaixo), copie o código gerado pelo Template **Nest Send Mail Template**

<div align="center"><img src="https://i.imgur.com/TjcqZg0.png" title="source: imgur.com" /></div>

11. Adicione este código no arquivo **.env**, criado no Projeto React, na variável **VITE_EMAIL_TEMPLATE_ID**, como mostra o trecho de código abaixo:

```bash
VITE_API_URL=https://lojagames.onrender.com
VITE_EMAIL_SERVICE_ID=service_2943o9q
VITE_EMAIL_TEMPLATE_ID=template_ksrkdfh
```

12. Clique no botão **Save**, para concluir a criação do Template **Nest Send Mail Template**.

<div align="center"><img src="https://i.imgur.com/GatjfyA.png" title="source: imgur.com" /></div>

<br />

<h2>👣 Passo 05 - Obter a Public Key do Usuário no Email JS</h2>



A **Chave Pública (Public Key)** é uma parte fundamental da **Criptografia Assimétrica**.

- **Chave Pública**: É uma chave criptográfica que pode ser compartilhada livremente com outras pessoas. Ela é usada para **criptografar dados** de forma segura. Qualquer pessoa pode usar a chave pública para criptografar uma mensagem, produzindo um **texto cifrado**. No entanto, apenas quem conhece a **chave privada correspondente** pode visualizar o texto criptografado e obter o conteúdo da mensagem original.

- **Chave Privada**: A chave privada é mantida em sigilo e nunca deve ser compartilhada. Ela é usada para **descriptografar** mensagens que foram criptografadas com a chave pública correspondente.

Em resumo, a criptografia de chave pública permite que as pessoas se comuniquem de forma segura, mesmo quando compartilham suas chaves públicas. Por exemplo, você pode publicar sua chave pública em um site para que qualquer pessoa possa enviar mensagens criptografadas para você, mas somente você, com a sua chave privada, pode ver o conteúdo dessas mensagens criptografadas. É uma maneira poderosa de garantir a privacidade e a autenticidade das comunicações digitais.

Todas as contas criadas no EmailJS, possuem as 2 chaves. Para o Formulário de Contato funcionar, vamos adicionar a Chave Pública dentro do seu código.

<br />

> [!CAUTION]
>
> **Jamais, sobre hipótese alguma, compartilhe a Chave Privada da sua conta.**

<br />

1. No menu lateral, localizado no lado esquerdo da tela, clique na opção **Account**:

<div align="center"><img src="https://i.imgur.com/NXA8zwZ.png" title="source: imgur.com" /></div>

2. Na janela **Account**, na opção **Public Key** (indicado na imagem abaixo), copie a Chave Pública da Conta no EmailJS.

<div align="center"><img src="https://i.imgur.com/2hsF0py.png" title="source: imgur.com" /></div>

3. Adicione este código no arquivo **.env**, criado no Projeto React, na variável **VITE_EMAIL_USER_ID**, como mostra o trecho de código abaixo:

```bash
VITE_API_URL=https://lojagames.onrender.com
VITE_EMAIL_SERVICE_ID=service_2943o9q
VITE_EMAIL_TEMPLATE_ID=template_ksrkdfh
VITE_EMAIL_USER_ID=N_a_lZPbxWUmSyfvB
```

<br />

> [!IMPORTANT]
>
> **As Variáveis de Ambiente criadas dentro do arquivo .env, também deverão ser criadas na Vercel, no Netlify ou em qualquer outro Serviço de Hospedagem durante o processo do Deploy do Frontend. Caso contrário o Formulário de Contato não irá funcionar na nuvem.**

<br />

<h2>👣 Passo 06 - Instalar a Biblioteca Email JS</h2>



Para instalar o pacote **EmailJS**, no Terminal do VSCode digite o comando abaixo:

```bash
yarn add @emailjs/browser
```

<br />

<h2>👣 Passo 07 - Criar a Página de Contato</h2>



Vamos criar o Componente **Contato**, que será o Formulário de Contato propriamente dito:

1. Na pasta **pages**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).
2. O nome da pasta será **contato** (letras minúsculas).
3. Clique com o botão direito do mouse sobre a pasta **contato**, que foi criada dentro da pasta **pages** e clique na opção **New File** (Novo Arquivo).
4. O nome do arquivo será **Contato.tsx**
5. Insira o Código abaixo no Componente **Contato**:

```tsx
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import emailjs from "@emailjs/browser";
import './Contato.css'

/**
* Interface que definirá os dados necessários para enviar o e-mail
*/
interface Contato {
    assunto: string;
    nome: string
    email: string;
    mensagem: string;
}

function Contato() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    /** 
    * Estado que verificará se o e-mail foi enviado com sucesso
    */
    const [isSucess, setIsSucess] = useState<boolean>(false)

    const [contato, setContato] = useState<Contato>({} as Contato)

    /** 
    * Como utilizaremos um campo do tipo TextArea para armazenar a mensagem, 
    * precisamos indicar na função atualizarEstado que podemos ter dois tipos 
    * de campos HTML disparando eventos:
    * 1) HTMLInputElement -> Input
    * 2) HTMLTextAreaElement -> Text Area
    */
    function atualizarEstado(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setContato({
            ...contato,
            [e.target.name]: e.target.value
        })

    }

    /** 
    * Se o e-mail for enviado com sucesso, o usuário será redirecionado para 
    * a Página de Login.
    */
    useEffect(() => {
        if (isSucess) {
            retornar()
        }
    }, [isSucess])

    function retornar() {
        navigate('/')
    }

    async function sendMail(e: FormEvent<HTMLFormElement>) {

        e.preventDefault()
        setIsLoading(true)

        /** 
        * Inicializamos a Biblioteca emailjs através do Método init, que receberá como 
        * parâmetro a Chave Publica da conta criada no EmailJS
        * Note que está sendo utilizada a variável de ambiente VITE_EMAIL_USER_ID para obter
        * a Chave Publica da conta.
        */
        emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);

        /** 
        * Chamamos o Método send, da Biblioteca emailjs, responsável por enviar o e-mail. 
        * Note que o método send receberá 3 parâmetros:
        * 1) ID do Serviço de e-mail, que será utilizado para enviar e receber as mensagens, 
        *    obtido através da variável de ambiente VITE_EMAIL_SERVICE_ID
	    * 2) ID da Template, que será utilizado para configurar a mensagem (assunto, corpo, 
	    *    entre outros, obtido através da variável de ambiente VITE_EMAIL_TEMPLATE_ID
	    * 3) Os dados que serão enviados na mensagem, obtidos através da Interface Contato
        */
        emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            { 
                assunto: contato.assunto,
                nome: contato.nome,
                email: contato.email,
                mensagem: contato.mensagem,
            }
        )
        .then((resposta: any) => {
            /**
            * Se a mensagem for enviada com sucesso...
            */
            ToastAlerta('Mensagem enviada com sucesso!', 'sucesso')
            setIsSucess(true)
        })
        .catch((erro: any) => {
            /**
            * Se a mensagem não for enviada com sucesso...
            */
            ToastAlerta('Erro ao emviar a Mensagem!', 'erro')
        })

        setIsLoading(false)

    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
                            place-items-center font-bold">

                <div className="fundoContato hidden lg:block"></div>

                <form className='flex justify-center items-center flex-col w-2/3 gap-3'
                    onSubmit={sendMail} method='POST'>

                    <h2 className='text-slate-900 text-5xl'>Contato</h2>

                    <div className="flex flex-col w-full font-normal">
                        <label htmlFor="nome">Nome: </label>
                        <input
                            id="nome"
                            type="text"
                            name="nome"
                            className="border-2 border-slate-700 rounded p-2"
                            placeholder="Digite seu nome"
                            value={contato.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full font-normal">

                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="border-2 border-slate-700 rounded p-2"
                            placeholder="Digite seu email"
                            value={contato.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full font-normal">
                        <label htmlFor="assunto">Assunto: </label>
                        <input
                            id="assunto"
                            type="text"
                            name="assunto"
                            className="border-2 border-slate-700 rounded p-2"
                            placeholder="Digite o assunto da mensagem"
                            value={contato.assunto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full font-normal">
                        <label htmlFor="mensagem">Mensagem: </label>
                        <textarea
                            id="mensagem"
                            name="mensagem"
                            className="border-2 border-slate-700 rounded p-2"
                            placeholder="Digite sua mensagem"
                            rows={5}
                            value={contato.mensagem}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    <div className="flex justify-around w-full gap-8">
                        <button
                            className='rounded text-white bg-red-400 
                                     hover:bg-red-700 w-1/2 py-2'
                            onClick={retornar}
                        >
                            Cancelar
                        </button>

                        <button
                            type='submit'
                            className='rounded text-white bg-teal-500 hover:bg-teal-700
                                       w-1/2 py-2 flex justify-center'
                        >
                            {isLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                                <span>Enviar</span>
                            }

                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Contato
```

Para compreender o código, leia os comentários adicionados no código.

<br />

<h2>👣 Passo 08 - Criar a Folha de Estilos Contato.css</h2>



Vamos criar uma Folha de Estilos CSS chamada **Contato.css**, que será utilizada para customizar o Componente Contato:

1. Clique com o botão direito do mouse sobre a pasta **contato**, que foi criada dentro da pasta **pages** e clique na opção **New File** (Novo Arquivo).
2. O nome do arquivo será **Contato.css**.
3. Insira o Código abaixo no arquivo **Contato.css**:

```css
.fundoContato {
    background-image: url("https://ik.imagekit.io/vzr6ryejm/games/fundo_contato.jpg?updatedAt=1717602723860");
    background-repeat: no-repeat;
    width: 100%;
    min-height: 100vh;
    background-size: cover;
    background-position: center;
  }
```

<br />

<h2>👣 Passo 09 - Atualizar o Componente App</h2>



Vamos atualizar o Componente **App**, criando uma rota para o Componente **Contato**:

```tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Cart from './components/carrinho/cart/Cart';
import DeletarCategoria from './components/categorias/deletarcategorias/DeletarCategoria';
import FormCategoria from './components/categorias/formcategoria/FormCategoria';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import DeletarProduto from './components/produtos/deletarprodutos/DeletarProduto';
import ListarProdutos from './components/produtos/listarprodutos/ListarProdutos';
import ListarProdutosPorNome from './components/produtos/listarprodutospornome/ListarProdutosPorNome';
import AtualizarUsuario from './components/usuarios/atualizarusuario/AtualizarUsuario';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Perfil from './pages/perfil/Perfil';
import FormProduto from './components/produtos/formproduto/FormProduto';
import Contato from './pages/contato/Contato';

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
                <Route path="/home" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/cadastrarproduto" element={<FormProduto />} />
                <Route path="/editarproduto/:id" element={<FormProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
                <Route path="/categorias" element={<ListarCategorias />} />
                <Route path="/cadastrarcategoria" element={<FormCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/atualizarusuario" element={<AtualizarUsuario />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/listarpornome/:busca" element={<ListarProdutosPorNome />} />
                <Route path="/contato" element={<Contato />} />
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

Observe que criamos uma rota (**/contato**) para o Componente **Contato**.

<br />

<h2>👣 Passo 10 - Atualizar o Componente Login</h2>



Vamos atualizar o Componente **Login**, adicionando um link para a rota do Componente **Contato**:

```tsx
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 
                    h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}>
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="email"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-slate-400 hover:bg-slate-800 flex justify-center
                                    text-white w-1/2 py-2">
                                    
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                    <p>
                        Envie uma mensagem para nós {' '}
                        <Link to="/contato" className="text-indigo-800 hover:underline">
                            Clicando aqui
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;
```

Observe que criamos um link para a rota **/contato**, logo abaixo do Link de Cadastro.

<br />

<h2>👣 Passo 11 - Testar o Formulário de Contato</h2>



1. Abra o Terminal do **VSCode**.
2. Execute o projeto através do comando abaixo:

```
yarn dev
```

3. Pressione a combinação de teclas **o + enter** do seu teclado para abrir o Projeto no Navegador.
4. Com o projeto aberto no seu Navegador, clique no link **Envie uma mensagem para nós Clicando aqui**, indicado na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/VGlXp1c.png" title="source: imgur.com" /></div>

5. Na sequência, Preencha os dados do Formulário de Contato e Clique no botão **Enviar**:

<div align="center"><img src="https://i.imgur.com/BHI8Ebm.png" title="source: imgur.com" /></div>

6. Se a mensagem for enviada corretamente, será exibida uma mensagem de confirmação e você será redirecionado para a **Página de Login**.
6. Verifique se você recebeu a mensagem na conta de e-mail cadastrada no **EmailJS**:

<div align="center"><img src="https://i.imgur.com/mDtwC4B.png" title="source: imgur.com" /></div>
