---
page_id: publications
layout: page
permalink: /publications/
title: Publicaciones
description: Todas mis publicaciones agrupadas por tipo y listadas en orden cronológico inverso.
nav: true
nav_order: 2
---
{% assign hidden_preprints = 1 %} 

{% capture papers_count %}
  {% bibliography_count -f papers --query @article %}
{% endcapture %}

{% capture preprints_count %}
  {% bibliography_count -f papers --query @unpublished %}
{% endcapture %}

{% assign total_preprints = preprints_count | plus: hidden_preprints %}

Si no tienes acceso a alguna de ellas, no dudes en [escribirme un correo](mailto:antonio.montero@fmf.uni-lj.si). Alternativamente, los preprints en mi [página de autor en arXiv](https://arxiv.org/a/montero_a_1.html) son muy cercanos a la versión publicada. De lo contrario, no dudes en pedirle a tu bandada de cuervos favorita por ellas :wink:.

Numeritos:

- Artículos de investigación publicados: {{ papers_count }}.
- Preprints bajo revisión: {{ total_preprints }}.


<!-- Bibsearch Feature -->

{% include bib_search.liquid %}


<!-- _pages/publications.md -->
<div class="publications">

{% bibliography %}

</div>
