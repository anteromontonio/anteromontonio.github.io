---
layout: archive
title: "Talks and presentations"
permalink: /talks/
author_profile: true
---

{% if site.talkmap_link == true %}

<p style="text-decoration:underline;"><a href="/talkmap.html">See a map of all the places I've given a talk!</a></p>

{% endif %}

<!-- ## International audience -->

<ol reversed>
  {% for post in site.talks reversed %}
      {% include archive-single-talk.html audience="International" %}
  {% endfor %}
</ol>

<!-- ## National audience
<ol reversed>
  {% for post in site.talks reversed %}
    {% if post.conf_type == 'National' %}
      {% include archive-single-talk.html %}
    {% endif %}
  {% endfor %}
</ol>

## Local audience / seminar talks

<ol reversed>
  {% for post in site.talks reversed %}
    {% if post.conf_type == 'Seminar' or post.conf_type == 'Local' %}
      {% include archive-single-talk.html %}
    {% endif %}
  {% endfor %}
</ol> -->