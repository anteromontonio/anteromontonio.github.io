---
layout: page
permalink: /talks/
title: Talks
description: The list of all the talks that I have given.
nav: true
nav_order: 4
tabs: true
---


Numbers:

- Total number of talks: {{ site.data.talks | size }}.
- Number of talks as plenary/invited speaker: {{ site.data.talks | where: "type", "Invited speaker"  | size }}.
- Number of talks by invitation (in conferences where all the talks were by invitation): {{ site.data.talks | where: "type", "By invitation"  | size }}.
- Number of contributed talks: {{ site.data.talks | where: "type", "Contributed"  | size }}.




<div>
{% include talks_search.liquid %}
</div>


{% tabs talks %}

{% tab talks by-year %}

<div class="publications">
{% for talk in site.data.talks reversed %}
  {% assign currentdate = talk.date | date: "%Y" %}
  {% if currentdate != date %}
    {% unless forloop.first %}</ol>{% endunless %}
    <h2 class="bibliography" >{{ currentdate }}</h2>
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

{% tab talks By conference-type %}


<div class="publications">
  <h2 class="bibliography" > International audience</h2>
    {% for talk in site.data.talks reversed  %}
      {% if talk.conf_type == "International" %}
        {% unless forloop.first %}</ol>{% endunless %}
        <ol class="bibliography">
        <li>
          {% include talk.liquid %}
        </li>
        {% if forloop.last %}</ol>{% endif %}
      {% endif %}
  {% endfor %}
  <h2 class="bibliography" > National audience</h2>
    {% for talk in site.data.talks reversed  %}
      {% if talk.conf_type == "National" %}
        <!-- {% unless forloop.first %}</ol>{% endunless %} -->
        <ol class="bibliography">
        <li>
          {% include talk.liquid %}
        </li>
        {% if forloop.last %}</ol>{% endif %}
      {% endif %}
  {% endfor %}
  <h2 class="bibliography" > Local audience / seminars</h2>
    {% for talk in site.data.talks reversed  %}
      {% if (talk.conf_type == "Local") or (talk.conf_type == "Seminar")  %}
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