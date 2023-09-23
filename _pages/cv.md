---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Physics and Mathematics, _University of Michoacán (UMSNH)_, 2013.
* M.S. in Mathematics, _National Autonomous University of Mexico (UNAM)_, 2015
* Ph.D in Mathematics, _National Autonomous University of Mexico (UNAM)_, 2019

Work experience
======
* Summer 2015: Research Assistant
  * Github University
  * Duties included: Tagging issues
  * Supervisor: Professor Git

* Fall 2015: Research Assistant
  * Github University
  * Duties included: Merging pull requests
  * Supervisor: Professor Hub
  
Skills
======
* Skill 1
* Skill 2
  * Sub-skill 2.1
  * Sub-skill 2.2
  * Sub-skill 2.3
* Skill 3

Publications
======
## Research papers
<ol>
{% for post in site.publications reversed %}
  {% if post.type == 'research' %}
    {% include publication-single-cv.html %}
  {% endif %}
{% endfor %}
</ol>

## Preprints
<ol>
{% for post in site.publications  %}
  {% if post.type == 'preprint' %}
    {% include publication-single-cv.html %}
  {% endif %}
{% endfor %}
</ol>

## Outreach papers
<ol>
{% for post in site.publications reversed %}
  {% if post.type == 'outreach' %}
    {% include publication-single-cv.html %}
  {% endif %}
{% endfor %}
</ol>

## Theses
<ol>
{% for post in site.publications  %}
  {% if post.type == 'thesis' %}
    {% include publication-single-cv.html %}
  {% endif %}
{% endfor %}
</ol>
<!--
  <ol>{% for post in site.publications %}
    {% include publication-single-cv.html %}
  {% endfor %}</ol>-->
  
Talks
======
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Currently signed in to 43 different slack teams
