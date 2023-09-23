---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

<!-- {% if author.googlescholar %} -->
<!-- {% endif %} -->


You can also find my articles on [Google Scholar]({{site.author.googlescholar}}){:target=\"_blank\"} or on [ORCID]({{site.author.orcid}}){:target=\"_blank\"}. Most or them are also available as preprints on [Arxiv](https://arxiv.org/a/montero_a_1.html){:target=\"_blank\"}.

If you don't have access to any of them, you can always [write me an email](mailto:{{site.author.email}}).



{% include base_path %}

## Research papers
{% for post in site.publications reversed %}
  {% if post.type == 'research' %}
    {% include publication.html %}
  {% endif %}
{% endfor %}

## Preprints
{% for post in site.publications  %}
  {% if post.type == 'preprint' %}
    {% include publication.html %}
  {% endif %}
{% endfor %}

## Outreach papers
{% for post in site.publications reversed %}
  {% if post.type == 'outreach' %}
    {% include publication.html %}
  {% endif %}
{% endfor %}

## Theses
{% for post in site.publications  %}
  {% if post.type == 'thesis' %}
    {% include publication.html %}
  {% endif %}
{% endfor %}
