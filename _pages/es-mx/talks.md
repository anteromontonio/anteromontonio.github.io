---
layout: page
permalink: /talks/
title: Pláticas
description: La lista de todas las pláticas que he dado.
nav: true
nav_order: 4
tabs: true
---

Numeritos:

- Número total de pláticas: {{ site.data.talks | size }}.
- Número de pláticas como pleanario/invitado: {{ site.data.talks | where: "type", "Invited speaker"  | size }}.
- Número de pláticas por invitación (donde todas las pláticas fueron por invitación): {{ site.data.talks | where: "type", "By invitation"  | size }}.
- Número de pláticas por solicitud: {{ site.data.talks | where: "type", "Contributed"  | size }}.

<div>
{% include talks_search.liquid %}
</div>

{% tabs talks %}

{% tab talks cronológicamente %}

<div class="publications">
{% assign talksOrderedByYear = site.data.talks | sort: 'date' %}
{% for talk in talksOrderedByYear reversed %}
  {% assign currentdate = talk.date | date: "%Y" %}
    {% if currentdate != date %}
      {% unless forloop.first %}</ol>{% endunless %}
      <h2 class="bibliography" >{{ talk.date | date: '%Y' }}</h2>
      <ol class="bibliography">
      {% assign date = currentdate %}
    {% endif %}
    <li>
      {% include talk.liquid %}
    </li>
  {% if forloop.last %}</ol>{% endif %}

{% endfor %}

</div>

{% endtab %}

{% tab talks Por audiencia %}

<div class="publications">
  <h2 class="bibliography" >  Audiencia internacional </h2>
    {% for talk in talksOrderedByYear reversed  %}
      {% if talk.conf_type == "International" %}
        <!-- {% unless forloop.first %}</ol>{% endunless %} -->
        <ol class="bibliography">
        <li>
          {% include talk.liquid %}
        </li>
        {% if forloop.last %}</ol>{% endif %}
      {% endif %}
  {% endfor %}
  <h2 class="bibliography" > Audiencia nacional</h2>
    {% for talk in talksOrderedByYear reversed  %}
      {% if talk.conf_type == "National" %}
        <!-- {% unless forloop.first %}</ol>{% endunless %} -->
        <ol class="bibliography">
        <li>
          {% include talk.liquid %}
        </li>
        {% if forloop.last %}</ol>{% endif %}
      {% endif %}
  {% endfor %}
  <h2 class="bibliography" > Audiencia local/seminarios</h2>
    {% for talk in talksOrderedByYear reversed  %}
      {% if talk.conf_type == "Local" or talk.conf_type == "Seminar"  %}
        <!-- {% unless forloop.first %}</ol>{% endunless %} -->
        <ol class="bibliography">
        <li>
          {% include talk.liquid %}
        </li>
        {% if forloop.last %}</ol>{% endif %}
      {% endif %}
  {% endfor %}

{% endtab %}

{% endtabs %}
