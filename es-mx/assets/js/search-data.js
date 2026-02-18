
const currentUrl = window.location.href;
const siteUrl = "https://anteromontonio.github.io";
let updatedUrl = currentUrl.replace("https://anteromontonio.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("es-mx".length > 0) {
  updatedUrl = updatedUrl.replace("/es-mx", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-acerca-de",
    title: "Acerca de",
    section: "Menú de navegación",
    handler: () => {
      window.location.href = "/es-mx/";
    },
  },{id: "nav-publicaciones",
          title: "Publicaciones",
          description: "Todas mis publicaciones agrupadas por tipo y listadas en orden cronológico inverso.",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/es-mx/publications/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "Mi blog personal (no-necesariamente-académico). Aquí escribo sobre matemáticas, café, música, vida o a veces solo desahogo. A veces en 🇬🇧 inglés, a veces en 🇲🇽 español y espero que algún día también en 🇸🇮 esloveno.",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/es-mx/blog/";
          },
        },{id: "nav-pláticas",
          title: "Pláticas",
          description: "La lista de todas las pláticas que he dado.",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/es-mx/talks/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Esta es una versión corta de mi CV que incluye información que no está en otro lugar de este sitio web.",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/es-mx/cv/";
          },
        },{id: "post-prešernov-dan",
        
          title: "Prešernov dan",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/es-mx/blog/2026/presernov-dan/";
          
        },
      },{id: "post-tres-ideas-de-colores",
        
          title: "Tres ideas de colores",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/es-mx/blog/2025/tres-ideas-de-colores/";
          
        },
      },{id: "post-three-colourful-ideas",
        
          title: "Three colourful ideas",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/es-mx/blog/2025/three-colourful-ideas/";
          
        },
      },{id: "post-la-vida-como-el-mosh-pit",
        
          title: "La vida como el mosh pit",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/es-mx/blog/2025/la-vida-como-el-mosh-pit/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/es-mx/books/the_godfather/";
            },},{id: "news-champagne-our-paper-chiral-extensions-of-regular-toroids-was-published",
          title: ':champagne: Our paper “Chiral extensions of regular toroids” was published!',
          description: "",
          section: "Noticias",handler: () => {
              window.location.href = "/es-mx/news/2412_chiralExtensions/";
            },},{id: "news-pencil-the-blog-has-its-very-first-proper-entry",
          title: ':pencil: The blog has its very first (proper) entry!',
          description: "",
          section: "Noticias",},{id: "news-champagne-our-paper-vertex-transitive-graphs-with-small-motion-and-transitive-permutation-groups-with-small-minimal-degree-quot-was-published",
          title: ':champagne: Our paper “Vertex-transitive graphs with small motion and transitive permutation groups with small...',
          description: "",
          section: "Noticias",handler: () => {
              window.location.href = "/es-mx/news/2505_largeFixity/";
            },},{id: "news-slovakia-i-am-attending-the-gems-2025-conference-in-slovakia-in-june",
          title: ':slovakia: I am attending the GEMS 2025 Conference in Slovakia in June.',
          description: "",
          section: "Noticias",handler: () => {
              window.location.href = "/es-mx/news/2505_gems/";
            },},{id: "news-slovenia-i-attended-the-gap-days-2025-in-koper-slovenia",
          title: ':slovenia: I attended the GAP Days 2025 in Koper, Slovenia.',
          description: "",
          section: "Noticias",},{id: "news-slovenia-we-are-organising-the-workshop-software-tools-for-mathematics-ul-fmf-ljubljana-slovenia",
          title: ':slovenia: We are organising the workshop Software Tools for Mathematics, UL FMF Ljubljana, Slovenia....',
          description: "",
          section: "Noticias",handler: () => {
              window.location.href = "/es-mx/news/2508_STM2025/";
            },},{id: "news-slovenia-i-attended-the-conference-of-slovene-matematicians-in-koper-slovenia",
          title: ':slovenia: I attended the conference of Slovene Matematicians in Koper, Slovenia.',
          description: "",
          section: "Noticias",handler: () => {
              window.location.href = "/es-mx/news/2509_KSM/";
            },},{id: "news-slovenia-i-am-giving-a-public-talk-in-kranj-slovenia",
          title: ':slovenia: I am giving a public talk in Kranj, Slovenia.',
          description: "",
          section: "Noticias",handler: () => {
              window.location.href = "/es-mx/news/2510_kranj/";
            },},{id: "projects-projeto-1",
          title: 'projeto 1',
          description: "com imagem de fundo",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/1_project/";
            },},{id: "projects-projeto-2",
          title: 'projeto 2',
          description: "um projeto com imagem de fundo e comentários do giscus",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/2_project/";
            },},{id: "projects-projeto-3-com-um-nome-bem-longo",
          title: 'projeto 3 com um nome bem longo',
          description: "um projeto que redireciona pra outro website",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/3_project/";
            },},{id: "projects-projeto-4",
          title: 'projeto 4',
          description: "outro sem imagem",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/4_project/";
            },},{id: "projects-projeto-5",
          title: 'projeto 5',
          description: "um projeto com imagem de fundo",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/5_project/";
            },},{id: "projects-projeto-6",
          title: 'projeto 6',
          description: "um projeto sem imagem",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Proyectos",handler: () => {
              window.location.href = "/es-mx/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'Enviar un correo',
        section: 'Redes sociales',
        handler: () => {
          window.open("mailto:%61%6E%74%6F%6E%69%6F.%6D%6F%6E%74%65%72%6F@%66%6D%66.%75%6E%69-%6C%6A.%73%69", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=GEJHkg0AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://orcid.org/0000-0002-3293-8517", "_blank");
        },
      },{
        id: 'social-arxiv',
        title: 'arXiv',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://arxiv.org/a/montero_a_1.html", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://github.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://instagram.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-facebook',
        title: 'Facebook',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://facebook.com/AnteroMontonio", "_blank");
        },
      },{
        id: 'social-discord',
        title: 'Discord',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://discord.com/users/368935416059002880", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://twitter.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Redes sociales',
        handler: () => {
          window.open("https://youtube.com/@anteromontonio", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Redes sociales',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
          id: 'lang-en-gb',
          title: 'en-gb',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Cambiar tema a claro',
      description: 'Cambiar el tema del sitio a claro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Cambiar tema a oscuro',
      description: 'Cambiar el tema del sitio a oscuro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Usar tema del sistema operativo',
      description: 'Usar el tema del sistema operativo',
      section: 'Tema',
      handler: () => {
        setThemeSetting("system");
      },
    },];
