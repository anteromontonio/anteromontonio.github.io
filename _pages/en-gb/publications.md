---
page_id: publications
layout: page
permalink: /publications/
title: Publications
description: All my publications grouped by type and listed in inverse chronological order.
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


If you do not have access to any of them, feel free to [write me an email](mailto:antonio.montero@fmf.uni-lj.si). Alternatively, the preprints on my [arXiv author page](https://arxiv.org/a/montero_a_1.html) are very close to the published version. Otherwise, feel free to ask your favourite flock of crows for them :wink:.

Numbers:

- Published research papers: {{ papers_count }}.
- Preprints under review: {{ total_preprints }}.
<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>
