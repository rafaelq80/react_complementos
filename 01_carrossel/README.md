<h1>Projeto Blog Pessoal - Criando um Slider de Fotos com Swiper</h1>

O Carousel é uma apresentação de slides para percorrer uma série de conteúdos, construído com CSS e um pouco de JavaScript. Funciona com uma série de imagens, texto ou marcação personalizada. Também inclui suporte para controles e indicadores anteriores/seguintes.

Para criar um Carousel no Projeto React, existem muitas Bibliotecas JavaScript, para este guia, nós escolhemos a Biblioteca **Swiper**

<br />

<div align="left"><img src="https://i.imgur.com/ZUDElcI.png" title="source: imgur.com" width="4%"/> <a href="https://swiperjs.com/react" target="_blank"><b>Documentação do Swiper JS - Carousel (Slide de Fotos)</b></a></div>

<br />

<h2>👣 Passo 01 - Instalar o Swiper</h2>



Para instalar o pacote **Swiper**, no Terminal do VSCode digite o comando abaixo:

```bash
npm install swiper
```

<br />

<h2>👣 Passo 02 - Criar o Componente Carrossel.tsx</h2>



1. Na pasta **components**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).

2. O nome da pasta será **carrossel** (letras minúsculas). 

3. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).

4. O nome do arquivo será **Carrossel.tsx**, como mostra a figura abaixo. 

<div align="center"><img src="https://i.imgur.com/mG8Jpfd.png" title="source: imgur.com" /></div>

5. Insira o Código abaixo no Componente **Carrossel**:

```react
// Importando os Componentes React Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Importando os estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importando seu CSS
import "./Carrossel.css";

// Importanto Componentes do Swiper
import { Autoplay, Pagination, Navigation } from "swiper";

function Carrossel() {
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
                    <img src="https://i.imgur.com/EYLPjQm.jpg" alt="Imagem" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src="https://i.imgur.com/zl9uZzx.jpg" alt="Imagem" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src="https://i.imgur.com/153khxC.png" alt="Imagem" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src="https://i.imgur.com/RxL2yjz.jpg" alt="Imagem" />
                </SwiperSlide>

            </Swiper>
        </>
    )
}

export default Carrossel
```

<br />

| <img src="https://i.imgur.com/RfjtOFi.png" title="source: imgur.com" width="100px"/> | <div align="left">**DICA 01:** *Para obter um melhor resultado, utilize imagens grandes em termos de dimensão e não em resolução. Neste exemplo, as imagens estão com as seguintes dimensões: 2560 x 1600 pixels*.</div> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

<br />

| <img src="https://i.imgur.com/RfjtOFi.png" title="source: imgur.com" width="100px"/> | <div align="left">**DICA 02:** *Caso as imagens sejam muito pesadas (alta resolução), uma alternativa é compactar as imagens antes de utilizar. Uma boa alternativa de software para compactação de imagens é o Irfan View (https://www.irfanview.com/)*.</div> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

<br />

<h2>👣 Passo 03 - Criar a Folha de Estilos Carrossel.css</h2>



1. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).

2. O nome do arquivo será **Carrossel.css**, como mostra a figura abaixo. 

<div align="center"><img src="https://i.imgur.com/m7JudHW.png" title="source: imgur.com" /></div>

5. Insira o Código abaixo no arquivo **Carrossel.css**:

```css
.swiper {
    width: 100vw;
    height: 60vh;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* object-position: 80% 100%; */
  }
  
  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
```

<br />

<h2>👣 Passo 04 - Atualizar o Componente Home.tsx</h2>



1. Abra o Componente **Home.tsx**, localizado na pasta **src/pages/home**.
2. Substitua o conteúdo do arquivo **Home.tsx** pelo código abaixo:

```react
import { Grid } from '@material-ui/core'
import Carrossel from '../../components/carrossel/Carrossel'

function Home() {
  return (
    <Grid container style={{ marginTop: "8px" }}>
      <Grid item xs={12}>
        <Carrossel />
      </Grid>
    </Grid>
  )
}

export default Home
```

<br />

<h2>👣 Passo 05 - Atualizar a Folha de Estilos App.css</h2>



1. Abra a Folha de Estilos **App.css**, localizado na pasta **src**.
2. Substitua o conteúdo do arquivo **App.css** pelo código abaixo:

```react
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
```

<br />

<h2>👣 Passo 06 - Atualizar o Componente Navbar.tsx</h2>



1. Abra o Componente **Navbar.tsx**, localizado na pasta **src/components/estaticos/navbar**.
2. Substitua o conteúdo do arquivo **Navbar.tsx** pelo código abaixo:

```react
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';


function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Box style={{ cursor: "pointer" }} >
                        <Typography variant="h5" color="inherit">
                            BlogPessoal
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="start">
                        <Box mx={1} style={{ cursor: "pointer" }}>
                            <Typography variant="h6" color="inherit">
                                home
                            </Typography>
                        </Box>
                        <Box mx={1} style={{ cursor: "pointer" }}>
                            <Typography variant="h6" style={{color: "yellow"}}>
                                Criar Postagem
                            </Typography>
                        </Box>
                        <Box mx={1} style={{ cursor: "pointer" }}>
                            <Typography variant="h6" color="inherit">
                                postagens
                            </Typography>
                        </Box>
                        <Box mx={1} style={{ cursor: "pointer" }}>
                            <Typography variant="h6" color="inherit">
                                temas
                            </Typography>
                        </Box>
                        <Box mx={1} style={{ cursor: "pointer" }}>
                            <Typography variant="h6" color="inherit">
                                cadastrar tema
                            </Typography>
                        </Box>
                        <Box mx={1} style={{ cursor: "pointer" }}>
                            <Typography variant="h6" color="inherit">
                                logout
                            </Typography>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>

        </>
    )
}

export default Navbar;
```

O resultado final, você confere na imagem abaixo:

<div align="center"><img src="https://i.imgur.com/AaXaRxV.png" title="source: imgur.com" /></div>
