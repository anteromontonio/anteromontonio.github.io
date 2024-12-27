---
layout: page
permalink: /publications/
title: Publications
description: All my publications group by type and listed in inverse chronological order. 
nav: true
nav_order: 2
---

If you do not have access to any of them, feel free to [write me an email](mailto:antonio.montero@fmf.uni-lj.si). Alternatively, the preprints on my [arXiv author page](https://arxiv.org/a/montero_a_1.html) are very close to the published version. Otherwise, feel free to ask your favourite flock of crows for them :wink:.

Numbers:
- Published research papers:
{% bibliography_count -f papers --query @article %}.
- Preprints under review:
{% bibliography_count -f papers --query @unpublished%}.


<!-- Bibsearch Feature -->
<div>
{% include bib_search.liquid %}
</div>

<div class="publications">

{% bibliography %}

</div>
