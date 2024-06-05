<h1>Projeto Integrador - Criando um Carrossel de Imagens com Swiper</h1>



Um **carrossel de imagens** é uma ferramenta visual poderosa para exibir conteúdo de forma interativa em um website. Ele pode ser utilizado de diversas maneiras, desde a apresentação de produtos até a criação de chamadas para ação. 

No React, um carrossel de imagens é um componente que permite **exibir várias imagens ou coponentes** em uma sequência deslizante. Essas imagens ou componentes são apresentados em uma área específica da página, geralmente em formato de **slide show**.

O carrossel alterna automaticamente entre as imagens e/ou Componentes, criando um efeito de **rotação**, mas também podem **navegar manualmente** pelas imagens e/ou Componentes usando setas ou botões.

Carrossel de imagens são muito utilizados na construção de:
- **Galerias de fotos**: Exibir várias imagens em um espaço limitado.
- **Banners promocionais**: Destacar produtos, ofertas ou eventos.
- **Depoimentos**: Mostrar avaliações de clientes em rotação.
- **Notícias em destaque**: Apresentar manchetes ou destaques.

**Vantagens**:

- **Economia de espaço**: Permite mostrar várias informações em um espaço reduzido.
- **Interatividade**: Os usuários podem explorar o conteúdo de forma dinâmica.
- **Atratividade visual**: O movimento das imagens chama a atenção dos visitantes.

Carrosséis podem ser criados com **HTML, CSS e JavaScript**, ou através de Bibliotecas e Frameworks prontos. O React oferece muitas Bibliotecas voltadas para a construção de Carrosséis, neste guia, nós escolhemos a Biblioteca **Swiper**.

<br />

<div align="left"><img src="https://i.imgur.com/ZUDElcI.png" title="source: imgur.com" width="4%"/> <a href="https://swiperjs.com/react" target="_blank"><b>Documentação do Swiper JS - Carrossel de Imagens</b></a></div>

<br />

<h2>👣 Passo 01 - Instalar o Swiper</h2>



Para instalar o pacote **Swiper**, no Terminal do VSCode digite o comando abaixo:

```bash
yarn add swiper
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 02 - Criar o Componente Slide01.tsx</h2>



Vamos criar o Componente **Slide01**, que será o primeiro Slide do Carrossel, mas antes, vamos criar a pasta **carrossel**, para armazenar o Componente:

1. Na pasta **components**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).

2. O nome da pasta será **carrossel** (letras minúsculas). 

3. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).

4. O nome do arquivo será **Slide01.tsx**.

5. Copie o código do Componente **Home** (tudo que estiver dentro do fragment `<> </>`, exceto o Componente **ListarProdutos**) e insira dentro do método **return()** do Componente **Slide01.tsx**. Veja o exemplo abaixo:

```tsx
import ModalProduto from "../produtos/modalprodutos/ModalProduto";

function Slide01() {
    return (

        <div className="
                bg-slate-800 
                flex 
                justify-center
                ">
            <div className='
                    container 
                    grid 
                    grid-cols-2 
                    text-white
                    '>
                <div className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        justify-center 
                        py-4
                        ">
                    <h2 className='
                            text-5xl 
                            font-bold
                            '>
                        Seja bem vinde!
                    </h2>
                    <p className='text-xl'>Aqui você encontra os melhores Games!</p>

                    <div className="flex justify-around gap-4">
                        <button className='
                                    rounded
                                    bg-slate-800 
                                    text-white 
                                    py-2 
                                    px-4
                                    '>
                            <ModalProduto />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center ">
                    <img
                        src="https://ik.imagekit.io/vzr6ryejm/games/home.png?updatedAt=1705970755605"
                        alt="Imagem Página Home"
                        className='w-2/3'
                    />
                </div>
            </div>
        </div>
    )
}

export default Slide01
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 03 - Criar o Componente Carrossel.tsx</h2>



Vamos criar o Componente **Carrossel**, que será o Carrossel propriamente dito:

1. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).
2. O nome do arquivo será **Carrossel.tsx**
3. Insira o Código abaixo no Componente **Carrossel**:

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Carrossel.css";
import Slide01 from "./Slide01";

function Home() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <Slide01 />
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        className="swiper-slide-img" 
                        src="https://ik.imagekit.io/vzr6ryejm/games/slide_03.jpg?updatedAt=1717248886808" 
                        alt="Carrossel - Slide 02" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                <img 
                    className="swiper-slide-img"
                    src="https://ik.imagekit.io/vzr6ryejm/games/slide_04.jpg?updatedAt=1717248886688" 
                    alt="Carrossel - Slide 03" 
                />
                </SwiperSlide>

            </Swiper>
        </>
    )
}

export default Home
```

<br />

> [!TIP]
>
> Para obter um melhor resultado, utilize imagens grandes em termos de dimensão e não em resolução. Neste exemplo, as imagens estão com as seguintes dimensões: 2560 x 1600 pixels.
>
> Caso as imagens estejam com uma resolução muito alta (arquivos grandes), uma alternativa é compactar as imagens antes de utilizá-las no Carrossel. Para compactar imagens, você pode utilizar os sites:
>
> <br />
>
> <div align="left"><img src="https://i.imgur.com/su6hxfF.png" title="source: imgur.com" width="4%"/> <a href="https://compressjpeg.com/" target="_blank"><b>Compactar Imagens JPG</b></a></div>
>
> <div align="left"><img src="https://i.imgur.com/su6hxfF.png" title="source: imgur.com" width="4%"/> <a href="https://compresspng.com/" target="_blank"><b>Compactar Imagens PNG</b></a></div>
>
> <br />

<br />

<h2><img src="https://i.imgur.com/7IdCTXz.png" title="source: imgur.com" width="4%"/> Passo 04 - Criar a Folha de Estilos Carrossel.css</h2>



Vamos criar uma Folha de Estlos CSS chamada **Carrossel.css**, que será utilizada para customizar o Componente Carrossel:

1. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).

2. O nome do arquivo será **Carrossel.css**, como mostra a figura abaixo. 

3. Insira o Código abaixo no arquivo **Carrossel.css**:

```css
/*Cor dos botões de Navegação*/
:root {
    --swiper-theme-color: #ffffff;
  }
  
  /*Tamanho e o posicionamento do Carrossel*/
  .swiper {
    height: 70vh;
    margin: 0;
  }
  
  /*Estiliza a imagem do slide*/
  .swiper-slide-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 05 - Atualizar o Componente Home.tsx</h2>



1. Abra o Componente **Home.tsx**, localizado na pasta **src/pages/home**.
2. Substitua o conteúdo do arquivo **Home.tsx** pelo código abaixo:

```tsx
import Carrossel from "../../components/carrossel/Carrossel"
import ListarProdutos from "../../components/produtos/listarprodutos/ListarProdutos"

function Home() {
    return (
        <>
            <div>
                <Carrossel />
            </div>
            <ListarProdutos />
        </>
    )
}

export default Home
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 06 - Testar os Componentes</h2>



1. Abra o Terminal do **VSCode**.
2. Execute o projeto através do comando abaixo:

```bash
yarn dev
```

3. Pressione a combinação de teclas **o + enter** do seu teclado para abrir o Projeto no Navegador.
4. Com o projeto aberto no seu Navegador, faça o login na aplicação, informando o **Usuário** e a **Senha**:

<div align="center"><img src="https://i.imgur.com/99NWhni.png" title="source: imgur.com" /></div>

5. O seu Projeto React será aberto no Navegador e o Carrossel será exibido na tela.

<div align="center"><img src="https://ik.imagekit.io/vzr6ryejm/tutoriais/swipper.gif?updatedAt=1717249859284" title="source: imgur.com" /></div>

<br />

| <img src="https://i.imgur.com/L338M2G.png" title="source: imgur.com" width="80px"/> | **DESAFIO:** *Chegou a hora de Explorar a sua criatividade! Consulte a Documentação do Swiper e personalize o seu Carrossel.* |
| ------------------------------------------------------------ | :----------------------------------------------------------- |

<br />

<div align="left"><img src="https://i.imgur.com/ZUDElcI.png" title="source: imgur.com" width="4%"/> <a href="https://swiperjs.com/react" target="_blank"><b>Documentação do Swiper JS - Carrossel de Imagens</b></a></div>

<br />
