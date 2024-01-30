---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

## Education

- B.S. in Physics and Mathematics (with honours).
  <p class="page__meta" style="margin-top:0"> 
    <i class="ai ai-fw ai-archive" aria-hidden="true"></i>Faculty of physics and mathematics, University of Michoacan (UMSNH), Mexico.
    <i class="fa fa-solid fa-fw fa-calendar" aria-hidden="true"></i> 2013.
    <i class="fa fa-solid fa-fw fa-book" aria-hidden="true"></i> <a href="/publication/2013_Montero_PoliedrosRegularesEn"> Thesis. </a>
  </p>
- M.S. in Mathematics (with honours).
  <p class="page__meta" style="margin-top:0"> 
    <i class="ai ai-fw ai-archive" aria-hidden="true"></i> National Autonomous University of Mexico (UNAM) Mexico.
    <i class="fa fa-solid fa-fw fa-calendar" aria-hidden="true"></i> 2015.
    <i class="fa fa-solid fa-fw fa-book" aria-hidden="true"></i> <a href="/publication/2015_Montero_RealizacionesRegularesDe"> Thesis. </a>
  </p>
- Ph.D in Mathematics (with honours).
  <p class="page__meta" style="margin-top:0"> 
    <i class="ai ai-fw ai-archive" aria-hidden="true"></i> National Autonomous University of Mexico (UNAM) Mexico.
    <i class="fa fa-solid fa-fw fa-calendar" aria-hidden="true"></i> 2019.
    <i class="fa fa-solid fa-fw fa-book" aria-hidden="true"></i> <a href="/publication/2019_Montero_ChiralExtensionsToroids"> Thesis. </a>
  </p>

## Work experience
<ul>
{% for job in site.data.jobs reversed %}
<li> {{ job.position }}
  <p class="page__meta" style="margin-top:0"> 
    <i class="fa fa-solid fa-fw fa-calendar" aria-hidden="true"></i> {{ job.period }}
    <i class="ai ai-fw ai-archive" aria-hidden="true"></i> {{ job.institution }}
    <i class="fa fa-fw fa-map-marker" aria-hidden="true"></i> {{ job.location }} 
  </p>  
  {% if job.notes %}
  <p class="page__meta" style="margin-top:0"> 
    {{ job.notes }}
  </p>
  {% endif %}
  </li>
{% endfor %}
</ul>



  
<!-- ## Skills

* Skill 1
* Skill 2
  * Sub-skill 2.1
  * Sub-skill 2.2
  * Sub-skill 2.3
* Skill 3 -->

## Publications

### Research papers
<ol reversed>
{% for post in site.publications reversed %}
  {% if post.type == 'research' %}
    <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ol>

### Preprints
<ul>
{% for post in site.publications  %}
  {% if post.type == 'preprint' %}
      <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ul>

### Outreach papers
<ol>
{% for post in site.publications reversed %}
  {% if post.type == 'outreach' %}
    <li>{% include publication.html %}</li>
  {% endif %}
{% endfor %}
</ol>

  
## Talks (a selection of)
The full list of talks could be accessed [here](/talks).

  <ul>{% for post in site.talks %}
    {% if post.highlighted %}
    {% include archive-single-talk.html %}
    {% endif %}
  {% endfor %}</ul>
  
<!-- ## Teaching

  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
## Academic Service -->


