---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

<!-- {% if author.googlescholar %} -->
<!-- {% endif %} -->

You can also find my articles on [Google Scholar]({{site.author.googlescholar}}){:target=\"_blank\"} or on [ORCID]({{site.author.orcid}}){:target=\"_blank\"}.

If you don't have access to any of them, you can alwas [write me an email](mailto:{{site.author.email}}).



{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
