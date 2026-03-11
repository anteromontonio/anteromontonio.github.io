
const currentUrl = window.location.href;
const siteUrl = "https://anteromontonio.github.io";
let updatedUrl = currentUrl.replace("https://anteromontonio.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("".length > 0) {
  updatedUrl = updatedUrl.replace("/", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation menu",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "All my publications group by type and listed in inverse chronological order.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This is a short version of my CV that includes information that is not elsewhere on this website. You can also find pdf versions of my CV and other relevant academic documents.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "My personal (not-necessary-academic) blog. Here I write about maths, coffee, music, life or sometimes I just vent. Sometimes in 🇬🇧 English, sometimes in 🇲🇽 Spanish and hopefully some day in 🇸🇮 Slovene.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-talks",
          title: "Talks",
          description: "The list of all the talks that I have given.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/talks/";
          },
        },{id: "post-prešernov-dan",
        
          title: "Prešernov dan",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/presernov-dan/";
          
        },
      },{id: "post-tres-ideas-de-colores",
        
          title: "Tres ideas de colores",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/tres-ideas-de-colores/";
          
        },
      },{id: "post-three-colourful-ideas",
        
          title: "Three colourful ideas",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/three-colourful-ideas/";
          
        },
      },{id: "post-la-vida-como-el-mosh-pit",
        
          title: "La vida como el mosh pit",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/la-vida-como-el-mosh-pit/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-champagne-our-paper-chiral-extensions-of-regular-toroids-was-published",
          title: ':champagne: Our paper “Chiral extensions of regular toroids” was published!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2412_chiralExtensions/";
            },},{id: "news-pencil-the-blog-has-its-very-first-proper-entry",
          title: ':pencil: The blog has its very first (proper) entry!',
          description: "",
          section: "News",},{id: "news-champagne-our-paper-vertex-transitive-graphs-with-small-motion-and-transitive-permutation-groups-with-small-minimal-degree-quot-was-published",
          title: ':champagne: Our paper “Vertex-transitive graphs with small motion and transitive permutation groups with small...',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2505_largeFixity/";
            },},{id: "news-slovakia-i-am-attending-the-gems-2025-conference-in-slovakia-in-june",
          title: ':slovakia: I am attending the GEMS 2025 Conference in Slovakia in June.',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2505_gems/";
            },},{id: "news-slovenia-i-attended-the-gap-days-2025-in-koper-slovenia",
          title: ':slovenia: I attended the GAP Days 2025 in Koper, Slovenia.',
          description: "",
          section: "News",},{id: "news-slovenia-we-are-organising-the-workshop-software-tools-for-mathematics-ul-fmf-ljubljana-slovenia",
          title: ':slovenia: We are organising the workshop Software Tools for Mathematics, UL FMF Ljubljana, Slovenia....',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2508_STM2025/";
            },},{id: "news-slovenia-i-attended-the-conference-of-slovene-matematicians-in-koper-slovenia",
          title: ':slovenia: I attended the conference of Slovene Matematicians in Koper, Slovenia.',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2509_KSM/";
            },},{id: "news-slovenia-i-am-giving-a-public-talk-in-kranj-slovenia",
          title: ':slovenia: I am giving a public talk in Kranj, Slovenia.',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2510_kranj/";
            },},{id: "news-slovenia-i-am-giving-talk-at-ul-pef-as-part-of-the-celebration-of-the-international-day-of-mathematics-pi-day",
          title: ':slovenia: I am giving talk at UL-PEF as part of the celebration of the...',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2602_talkPEF/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'Send an email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6E%74%6F%6E%69%6F.%6D%6F%6E%74%65%72%6F@%66%6D%66.%75%6E%69-%6C%6A.%73%69", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=GEJHkg0AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-3293-8517", "_blank");
        },
      },{
        id: 'social-arxiv',
        title: 'arXiv',
        section: 'Socials',
        handler: () => {
          window.open("https://arxiv.org/a/montero_a_1.html", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-facebook',
        title: 'Facebook',
        section: 'Socials',
        handler: () => {
          window.open("https://facebook.com/AnteroMontonio", "_blank");
        },
      },{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/368935416059002880", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@anteromontonio", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
          id: 'lang-es-mx',
          title: 'es-mx',
          section: 'Languages',
          handler: () => {
            window.location.href = "/es-mx" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
