---
page_id: publications
layout: page
permalink: /publications/
title: Publicaciones
description: Todas mis publicaciones agrupadas por tipo y listadas en orden cronológico inverso.
nav: true
nav_order: 2
---

Si no tienes acceso a alguna de ellas, no dudes en [escribirme un correo](mailto:antonio.montero@fmf.uni-lj.si). Alternativamente, los preprints en mi [página de autor en arXiv](https://arxiv.org/a/montero_a_1.html) son muy cercanos a la versión publicada. De lo contrario, no dudes en pedirle a tu bandada de cuervos favorita por ellas :wink:.

Numeritos:

- Artículos de investigación publicados:
  {% bibliography_count -f papers --query @article %}.
- Preprints bajo revisión:
  {% bibliography_count -f papers --query @unpublished%}.


<!-- Bibsearch Feature -->

{% include bib_search.liquid %}


<!-- _pages/publications.md -->
<div class="publications">

{% bibliography %}

</div>
