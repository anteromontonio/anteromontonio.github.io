
const currentUrl = window.location.href;
const siteUrl = "https://anteromontonio.github.io";
let updatedUrl = currentUrl.replace("https://anteromontonio.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("si".length > 0) {
  updatedUrl = updatedUrl.replace("/si", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "",
    handler: () => {
      window.location.href = "/si/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "a simple whitespace theme for academics",
          section: "",
          handler: () => {
            window.location.href = "/si/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "All my publications group by type and listed in inverse chronological order.",
          section: "",
          handler: () => {
            window.location.href = "/si/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "",
          handler: () => {
            window.location.href = "/si/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "",
          handler: () => {
            window.location.href = "/si/repositories/";
          },
        },{id: "nav-talks",
          title: "Talks",
          description: "The list of all the talks that I have given.",
          section: "",
          handler: () => {
            window.location.href = "/si/talks/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "",
          handler: () => {
            window.location.href = "/si/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Materials for courses you taught. Replace this text with your description.",
          section: "",
          handler: () => {
            window.location.href = "/si/teaching/";
          },
        },{id: "nav-people",
          title: "people",
          description: "members of the lab or group",
          section: "",
          handler: () => {
            window.location.href = "/si/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "",
              handler: () => {
                window.location.href = "/si/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "",
              handler: () => {
                window.location.href = "/si/blog/";
              },
            },{id: "post-prešernov-dan",
        
          title: "Prešernov dan",
        
        description: "",
        section: "",
        handler: () => {
          
            window.location.href = "/si/blog/2026/presernov-dan/";
          
        },
      },{id: "post-tres-ideas-de-colores",
        
          title: "Tres ideas de colores",
        
        description: "",
        section: "",
        handler: () => {
          
            window.location.href = "/si/blog/2025/tres-ideas-de-colores/";
          
        },
      },{id: "post-three-colourful-ideas",
        
          title: "Three colourful ideas",
        
        description: "",
        section: "",
        handler: () => {
          
            window.location.href = "/si/blog/2025/three-colourful-ideas/";
          
        },
      },{id: "post-la-vida-como-el-mosh-pit",
        
          title: "La vida como el mosh pit",
        
        description: "",
        section: "",
        handler: () => {
          
            window.location.href = "/si/blog/2025/la-vida-como-el-mosh-pit/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/books/the_godfather/";
            },},{id: "news-champagne-our-paper-chiral-extensions-of-regular-toroids-was-published",
          title: ':champagne: Our paper “Chiral extensions of regular toroids” was published!',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/news/2412_chiralExtensions/";
            },},{id: "news-pencil-the-blog-has-its-very-first-proper-entry",
          title: ':pencil: The blog has its very first (proper) entry!',
          description: "",
          section: "",},{id: "news-champagne-our-paper-vertex-transitive-graphs-with-small-motion-and-transitive-permutation-groups-with-small-minimal-degree-quot-was-published",
          title: ':champagne: Our paper “Vertex-transitive graphs with small motion and transitive permutation groups with small...',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/news/2505_largeFixity/";
            },},{id: "news-slovakia-i-am-attending-the-gems-2025-conference-in-slovakia-in-june",
          title: ':slovakia: I am attending the GEMS 2025 Conference in Slovakia in June.',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/news/2505_gems/";
            },},{id: "news-slovenia-i-attended-the-gap-days-2025-in-koper-slovenia",
          title: ':slovenia: I attended the GAP Days 2025 in Koper, Slovenia.',
          description: "",
          section: "",},{id: "news-slovenia-we-are-organising-the-workshop-software-tools-for-mathematics-ul-fmf-ljubljana-slovenia",
          title: ':slovenia: We are organising the workshop Software Tools for Mathematics, UL FMF Ljubljana, Slovenia....',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/news/2508_STM2025/";
            },},{id: "news-slovenia-i-attended-the-conference-of-slovene-matematicians-in-koper-slovenia",
          title: ':slovenia: I attended the conference of Slovene Matematicians in Koper, Slovenia.',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/news/2509_KSM/";
            },},{id: "news-slovenia-i-am-giving-a-public-talk-in-kranj-slovenia",
          title: ':slovenia: I am giving a public talk in Kranj, Slovenia.',
          description: "",
          section: "",handler: () => {
              window.location.href = "/si/news/2510_kranj/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "",handler: () => {
              window.location.href = "/si/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "",handler: () => {
              window.location.href = "/si/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "",handler: () => {
              window.location.href = "/si/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "",handler: () => {
              window.location.href = "/si/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "",handler: () => {
              window.location.href = "/si/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "",handler: () => {
              window.location.href = "/si/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "",handler: () => {
              window.location.href = "/si/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "",handler: () => {
              window.location.href = "/si/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "",handler: () => {
              window.location.href = "/si/projects/9_project/";
            },},{
        id: 'social-email',
        title: '',
        section: '',
        handler: () => {
          window.open("mailto:%61%6E%74%6F%6E%69%6F.%6D%6F%6E%74%65%72%6F@%66%6D%66.%75%6E%69-%6C%6A.%73%69", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: '',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=GEJHkg0AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: '',
        handler: () => {
          window.open("https://orcid.org/0000-0002-3293-8517", "_blank");
        },
      },{
        id: 'social-arxiv',
        title: 'arXiv',
        section: '',
        handler: () => {
          window.open("https://arxiv.org/a/montero_a_1.html", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: '',
        handler: () => {
          window.open("https://github.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: '',
        handler: () => {
          window.open("https://instagram.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-facebook',
        title: 'Facebook',
        section: '',
        handler: () => {
          window.open("https://facebook.com/AnteroMontonio", "_blank");
        },
      },{
        id: 'social-discord',
        title: 'Discord',
        section: '',
        handler: () => {
          window.open("https://discord.com/users/368935416059002880", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: '',
        handler: () => {
          window.open("https://twitter.com/anteromontonio", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: '',
        handler: () => {
          window.open("https://youtube.com/@anteromontonio", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: '',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
          id: 'lang-en-gb',
          title: 'en-gb',
          section: '',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
          id: 'lang-es-mx',
          title: 'es-mx',
          section: '',
          handler: () => {
            window.location.href = "/es-mx" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: '',
      description: '',
      section: '',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: '',
      description: '',
      section: '',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: '',
      description: '',
      section: '',
      handler: () => {
        setThemeSetting("system");
      },
    },];
