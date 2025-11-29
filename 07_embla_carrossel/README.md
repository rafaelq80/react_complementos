<h1>Projeto Integrador - Criando um Carrossel de Imagens com Embla</h1>



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

Carrosséis podem ser criados com **HTML, CSS e JavaScript**, ou através de Bibliotecas e Frameworks prontos. O React oferece muitas Bibliotecas voltadas para a construção de Carrosséis, neste guia, nós escolhemos a Biblioteca **Embla**.

O **Embla Carousel** é uma biblioteca JavaScript leve e altamente personalizável para criar carrosséis (sliders) em páginas web. Ela não possui dependências externas e oferece controle total por meio de uma API bem definida, ideal para quem precisa de uma solução flexível e performática.

### Principais características:

- **Sem dependências:** Funciona com JavaScript puro (Vanilla JS).
- **Leve e rápido:** Ideal para aplicações modernas e com foco em performance.
- **API completa:** Permite customizar comportamentos como rolagem infinita, autoplay, loop, sensibilidade do arrasto, entre outros.
- **Compatível com frameworks:** Pode ser usado facilmente com React, Vue, Svelte, entre outros.

<br />

<div align="left"><img src="https://i.imgur.com/tQVlLrK.png" title="source: imgur.com" width="4%"/> <a href="https://www.embla-carousel.com" target="_blank"><b>Embla - Caroussel</b></a></div>

<br />

<h2>👣 Passo 01 - Instalar o Embla</h2>



Para instalar o pacote **Embla**, no Terminal do Visual Studio Code digite o comando abaixo:

```bash
npm install embla-carousel-react
```

Para instalar o pacote **Autoplay**, que permite executar o Carrossel automaticamente, no Terminal do Visual Studio Codedigite o comando abaixo:

```bash
npm install embla-carousel-autoplay
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 02 - Criar os Componentes Slide</h2>



Vamos criar três componentes chamados **Slide01**, **Slide02** e **Slide03**, que serão os elementos que compõem o carrossel propriamente dito. Embora seja possível utilizar imagens diretamente, a implementação com componentes oferece maior flexibilidade e facilita a criação de layouts responsivos. Dessa forma, é possível manipular facilmente o conteúdo, aplicar estilizações dinâmicas e adaptar o comportamento dos slides conforme as necessidades do projeto.

1. Na pasta **components**, clique com o botão direito do mouse e clique na opção **New Folder** (Nova Pasta).

2. O nome da pasta será **carrossel** (letras minúsculas). 

3. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).

4. O nome do primeiro arquivo será **Slide01.tsx**.

5. Substitua o código do Componente **Slide01.tsx**, pelo código abaixo:

```tsx
import ModalProduto from '../produtos/modalprodutos/ModalProduto'

function Slide01() {
	return (
		<div className="bg-slate-800 flex justify-center h-[50vh] md:h-[70vh]">
			<div className="container grid grid-cols-1 md:grid-cols-2 text-white">
				<div className="flex flex-col gap-0 md:gap-1 items-center justify-center py-0 md:py-1">
					<h2 className="text-3xl md:text-5xl font-bold text-center">
						Seja bem vinde!
					</h2>
					<p className="text-lg md:text-xl text-center">
						Aqui você encontra os melhores Games!
					</p>

					<div className="flex justify-around gap-4 w-full">
						<div className="hidden w-full md:flex md:justify-center md:items-center md:py-8">
							<ModalProduto />
						</div>
					</div>
				</div>

				<div className="flex justify-center items-center w-full">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/games/home.png?updatedAt=1705970755605"
						alt="Imagem Página Home"
						className="w-2/3 md:w-2/3 mx-auto h-52 md:h-80 lg:h-96 object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide01
```

6. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).
7. O nome do primeiro arquivo será **Slide02.tsx**.
8. Substitua o código do Componente **Slide02.tsx**, pelo código abaixo:

```tsx
function Slide02() {
	return (
		<div
			className="
                flex 
                justify-center
                bg-[url('https://ik.imagekit.io/vzr6ryejm/games/bg_slide_02.png?updatedAt=1714810179695')]
                bg-repeat
                h-[50vh] md:h-[70vh]
                "
		>
			<div
				className="
                    container 
                    grid 
                    grid-cols-1 md:grid-cols-2
                    text-white
                    "
			>
				<div
					className="
                        flex 
                        flex-col 
                        gap-2 md:gap-4
                        items-center 
                        justify-center 
                        py-2 md:py-4
                        "
				>
					<h2
						className="
                            text-3xl md:text-5xl 
                            font-bold
                            text-center
                            "
					>
						Promoções Imperdíveis!
					</h2>
					<p className="text-lg md:text-3xl text-center">
						É na Madrugada dos Games!
					</p>
				</div>

				<div className="flex justify-center items-center w-full">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/games/logo_promocao.png?updatedAt=1714810126717"
						alt="Imagem Página Home"
						className="w-2/3 md:w-3/4 mx-auto h-64 md:h-96 lg:h-112 object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide02
```

9. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).
10. O nome do primeiro arquivo será **Slide03.tsx**.
11. Substitua o código do Componente **Slide03.tsx**, pelo código abaixo:

```tsx
function Slide03() {
	return (
		<div className="bg-yellow-400 flex justify-center h-[50vh] md:h-[70vh]">
			<div className="container grid grid-cols-1 md:grid-cols-2 text-slate-900">
				<div className="flex flex-col gap-2 md:gap-4 items-center justify-center py-2 md:py-4">
					<h2 className="text-3xl md:text-5xl font-bold text-center">
						Promoção de Periféricos!
					</h2>
					<p className="text-lg md:text-3xl text-center">
						Descontos de até 50%
					</p>
				</div>

				<div className="flex justify-center items-center w-full">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/games/perifericos.png?updatedAt=1714810226671"
						alt="Imagem Página Home"
						className="w-2/3 md:w-2/3 mx-auto h-52 md:h-80 lg:h-96 object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide03
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 03 - Criar o Componente Carrossel.tsx</h2>



Agora vamos criar o componente **Carrossel**, que será o carrossel em si — responsável por controlar a exibição e a navegação entre os slides.

Esse componente irá integrar a lógica do Embla Carousel, além de importar os três componentes **Slide** criados anteriormente. Com ele, conseguimos aplicar animações, configurar o comportamento da rolagem e tornar o carrossel totalmente personalizável e responsivo:

1. Clique com o botão direito do mouse sobre a pasta **carrossel**, que foi criada dentro da pasta **components** e clique na opção **New File** (Novo Arquivo).
2. O nome do arquivo será **Carrossel.tsx**
3. Insira o Código abaixo no Componente **Carrossel**:

```tsx
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"
import Slide01 from "./Slide01"
import Slide02 from "./Slide02"
import Slide03 from "./Slide03"

/**
 * Componente de carrossel responsivo com funcionalidades de:
 * - Autoplay automático a cada 5 segundos
 * - Navegação manual com botões (anterior/próximo)
 * - Paginação com dots indicadores
 * - Loop infinito
 * - Controles que aparecem no hover
 * - Layout responsivo (mobile/desktop)
 */
function Carrossel() {

	// Inicializa o Carrossel com configurações do Embla
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true, // Exibe os slides infinitamente
			align: "start", // Alinha os slides à esquerda
			slidesToScroll: 1, // Permite rolagem de um slide por vez
		},

		// Plugin de autoplay: avança automaticamente a cada 5s, sem parar ao interagir
		[Autoplay({ delay: 5000, stopOnInteraction: false })]
	)

	// Armazena o índice do slide atual
	const [selectedIndex, setSelectedIndex] = useState(0) 
	
	// Armazena o número total de slides
	const [slidesCount, setSlidesCount] = useState(0)

	/**
	 * Efeito que gerencia os eventos do carrossel
	 * Atualiza o índice atual e o total de slides quando o carrossel é inicializado
	 */
	useEffect(() => {

		/** Continua apenas se o emblaapi existir */
		if (!emblaApi) return

		/**
		 * Atualiza o índice do slide atual, através do método selectedScrollSnap()
		 * A função updateIndex será chamada sempre que trocar o slide atual
		 */
		const updateIndex = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap()) 
		}

		/**
		 * Atualiza o número de slides, através da função scrollSnapList().length
		 * scrollSnapList() retorna um array e através da propriedade length
		 * identificamos o tamano do array (numero total de slides)
		 */
		setSlidesCount(emblaApi.scrollSnapList().length)

		/**
		 * - "on" = adiciona um ouvinte de eventos (semelhante ao addEventListener)
		 * - "select" = nome do evento (disparado quando o slide muda)
		 * - updateIndex = função que será chamada quando o evento acontecer (troca do slide)
		 */
		emblaApi.on("select", updateIndex)

		// Atualiza o índice do slide inicial
		updateIndex()

		// Função Cleanup: remove o evento ao desmontar o componente
		return () => {
			/**
			 * Remove o ouvinte de eventos que foi adicionado com .on()
			 * Fazendo uma analogia, é como desligar a luz antes de sair de um cômodo
			 */
			emblaApi.off("select", updateIndex)
		}
	}, [emblaApi])

	/**
	 * Navega para um slide específico ao clicar no dot correspondente, 
	 * através da função scrollTo(index), onde index é o índice do slide
	 * @param index Índice do slide para navegar
	 */
	function scrollTo(index: number) {
		emblaApi?.scrollTo(index)
	}

	/**
	 * Navega para o slide anterior, através da função scrollPrev()
	 */
	function scrollPrev() {
		emblaApi?.scrollPrev()
	}

	/**
	 * Navega para o próximo slide, através da função scrollNext()
	 */
	function scrollNext() {
		emblaApi?.scrollNext()
	}

	return (
		<div className="relative md:max-h-[70vh] max-h-[50vh]">
			{/* 
				Container principal do carrossel
				
				A propriedade ref={emblaRef} indica que o container
				<div> será controlado pelo Embla Carousel

				Imagine que emblaRef é um controle remoto e a <div> é uma TV.
				Ao fazer ref={emblaRef}, você está "emparelhando" o controle com a TV.
				Agora o Embla pode ligar, desligar, mudar de canal (slides), etc.
				
				A classe "group" permite usar group-hover nos botões, ou seja,
				permite estilizar elementos filhos com base no estado do elemento pai, 
				como, por exemplo, quando o pai é hover. 

				No nosso exemplo, ao passar o mouse no Carrossel (Elemento pai), os botões de
				navegação ficam visíveis (Elementos filhos).
			*/}
			<div 
				className="overflow-hidden group" 
				ref={emblaRef}
			>
				{/* Container dos slides */}
				<div className="flex flex-cols">
					{/* Slide 1 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide01 />
						</article>
					</div>
					
					{/* Slide 2 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide02 />
						</article>
					</div>
					
					{/* Slide 3 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide03 />
						</article>
					</div>

				</div>

				{/* Botões de Navegação - Anterior e Próximo */}
				{/* Botão Anterior */}
				<button
					className="cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100 bg-transparent hover:bg-transparent"
					onClick={scrollPrev}
					aria-label="Slide anterior"
				>
					<CaretLeftIcon size={48} className="text-white fill-white drop-shadow-xl" />
				</button>

				{/* Botão Próximo */}
				<button
					className="cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute right-3 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100 bg-transparent hover:bg-transparent"
					onClick={scrollNext}
					aria-label="Próximo slide"
				>
					<CaretRightIcon size={48} className="text-white fill-white drop-shadow-xl" />
				</button>
			</div>

			{/* Paginação (Dots) - Indicadores de slide 
			
			 	- cria um array vazio com o numero de posições equivalente ao número de slides
				- Itera sobre cada posição do array
				- Para cada iteração, cria um botão (dot)
				- A propriedade KEY é o identificador único para cada dot
				- Ao clicar em um botão dot, ele executa a função scrollTo(index), redirecionando
				  para o respectivo slide associado ao respectivo indíce
				- Observe que a estilização dos dot é dinâmica, ou seja, mudam de cor sempre
				  que o estado slidesCount for modificado
			
			*/}
			<div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
				{[...Array(slidesCount)].map((_, index) => (
					<button
						key={`carousel-dot-${index + 1}`}
						className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full transition-all p-0 ${
							selectedIndex === index ? "bg-white scale-125" : "bg-gray-400"
						}`}
						onClick={() => scrollTo(index)}
						aria-label={`Ir para slide ${index + 1}`}
						aria-current={selectedIndex === index ? "true" : "false"}
					/>
				))}
			</div>
		</div>
	)
}

export default Carrossel
```

4. Para uma melhor compreensão do código, leia os comentários e/ou consulte a documentação.

<br />

<div align="left"><img src="https://i.imgur.com/tQVlLrK.png" title="source: imgur.com" width="4%"/> <a href="https://www.embla-carousel.com/get-started/" target="_blank"><b>Documentação do Embla - Caroussel</b></a></div>

<br />

> [!TIP]
>
> Caso prefira utilizar **imagens em vez de componentes** no carrossel, opte por imagens com **grandes dimensões** (por exemplo, 2560 x 1600 pixels), mas com **resolução otimizada**. Isso garante uma boa qualidade visual sem comprometer o desempenho da aplicação.
>
> Se as imagens estiverem com **resolução muito alta** (arquivos pesados), recomenda-se compactá-las antes de utilizá-las no carrossel. Para isso, você pode utilizar ferramentas online como:
>
> <br />
>
> <div align="left"><img src="https://i.imgur.com/su6hxfF.png" title="source: imgur.com" width="4%"/> <a href="https://compressjpeg.com/" target="_blank"><b>Compactar Imagens JPG</b></a></div>
>
> <div align="left"><img src="https://i.imgur.com/su6hxfF.png" title="source: imgur.com" width="4%"/> <a href="https://compresspng.com/" target="_blank"><b>Compactar Imagens PNG</b></a></div>
>
> <br />
>
> Essas ferramentas ajudam a reduzir o tamanho dos arquivos sem perda significativa de qualidade, melhorando a experiência do usuário e o tempo de carregamento da página.

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 04 - Atualizar o Componente Home.tsx</h2>



1. Abra o Componente **Home.tsx**, localizado na pasta **src/pages/home**.
2. Substitua o conteúdo do arquivo **Home.tsx** pelo código abaixo:

```tsx
import Carrossel from '../../components/carrossel/Carrossel'
import ListarProdutosHome from '../../components/produtos/listarprodutos/ListarProdutosHome'

function Home() {
	return (
		<>
			<div className='mt-6 md:mt-0'>
				<Carrossel />
			</div>
			<div className='mt-4'>
				<ListarProdutosHome />
			</div>
		</>
	)
}

export default Home
```

<br />

<h2><img src="https://i.imgur.com/H9wEgsJ.png" title="source: imgur.com" width="4%"/> Passo 05 - Testar os Componentes</h2>



1. Abra o Terminal do **Visual Studio Code**.
2. Execute o projeto através do comando abaixo:

```bash
npm run dev
```

3. Pressione a combinação de teclas **o + enter** do seu teclado para abrir o Projeto no Navegador.
4. O seu Projeto React será aberto no Navegador e o Carrossel será exibido na tela.

<div align="center"><img src="https://ik.imagekit.io/vzr6ryejm/tutoriais/swipper.gif?updatedAt=1717249859284" title="source: imgur.com" /></div>

<br />

| <img src="https://i.imgur.com/L338M2G.png" title="source: imgur.com" width="80px"/> | **DESAFIO:** *Chegou a hora de Explorar a sua criatividade! Consulte a Documentação do Embla e personalize o seu Carrossel.* |
| ------------------------------------------------------------ | :----------------------------------------------------------- |

<br />

<div align="left"><img src="https://i.imgur.com/tQVlLrK.png" title="source: imgur.com" width="4%"/> <a href="https://www.embla-carousel.com/get-started/" target="_blank"><b>Documentação do Embla - Caroussel</b></a></div>

<br />
