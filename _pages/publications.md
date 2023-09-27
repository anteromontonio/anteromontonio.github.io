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
<ol reversed>
{% for post in site.publications reversed %}
  {% if post.type == 'research' %}
    <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ol>

## Preprints
<ul>
{% for post in site.publications  %}
  {% if post.type == 'preprint' %}
    <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ul>

## Outreach papers
<ol>
{% for post in site.publications reversed %}
  {% if post.type == 'outreach' %}
    <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ol>

## Theses
<ol reversed>
{% for post in site.publications reversed %}
  {% if post.type == 'thesis' %}
    <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ol>
