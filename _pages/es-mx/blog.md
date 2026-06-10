---
page_id: blog
layout: default
permalink: /blog/
title: Blog
blog_name: Cafecito?
description: Mi blog personal (no-necesariamente-académico). Aquí escribo sobre matemáticas, café, música, vida o a veces nomás hago berrinche. A veces en 🇬🇧 inglés, a veces en 🇲🇽 español y espero que algún día también en 🇸🇮 esloveno.
nav: true
nav_order: 5
pagination:
  enabled: false
---

<div class="post">

{% assign blog_name_size = page.blog_name | size %}
{% assign blog_description_size = page.description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}

  <div class="header-bar">
    <h1>{{ page.blog_name }}</h1>
    <h2>{{ page.description }}</h2>
  </div>
  {% endif %}

{% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}

  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endif %}

{% assign featured_posts = site.posts | where: "featured", "true" %}
{% if featured_posts.size > 0 %}
<br>

<div class="container featured-posts">
{% assign is_even = featured_posts.size | modulo: 2 %}
<div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
{% for post in featured_posts %}
<div class="col mb-4">
<a href="{{ post.url | relative_url }}">
<div class="card hoverable">
<div class="row g-0">
<div class="col-md-12">
<div class="card-body">
<div class="float-right">
<i class="fa-solid fa-thumbtack fa-xs"></i>
</div>
<h3 class="card-title text-lowercase">{{ post.title }}</h3>
<p class="card-text">{{ post.description }}</p>

                    {% if post.external_source == blank %}
                      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                    {% else %}
                      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                    {% endif %}
                    {% assign year = post.date | date: "%Y" %}

                    <p class="post-meta">
                      Lectura de {{ read_time }} min &nbsp; &middot; &nbsp;
                      <a href="{{ year | prepend: '/blog/' | relative_url }}">
                        <i class="fa-solid fa-calendar fa-sm"></i> {{ year }} </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      {% endfor %}
      </div>
    </div>
    <hr>

{% endif %}

  {% assign active_lang = site.active_lang %}
  {% assign current_lang_posts = site.posts | where: "language", active_lang | sort: "date" | reverse %}
  {% assign other_lang_posts = site.posts | where_exp: "p", "p.language != active_lang" | sort: "date" | reverse %}
  {% assign blog_strings = site.data[active_lang].strings.blog %}

  {% if current_lang_posts.size > 0 %}
    <h2 class="bibliography">{{ blog_strings.posts_in_current_lang }}</h2>
    <ul class="post-list">
      {% for post in current_lang_posts %}
        {% include blog_post_item.liquid post=post %}
      {% endfor %}
    </ul>
  {% endif %}

  {% if other_lang_posts.size > 0 %}
    <h2 class="bibliography">{{ blog_strings.posts_in_other_langs }}</h2>
    <ul class="post-list">
      {% for post in other_lang_posts %}
        {% include blog_post_item.liquid post=post %}
      {% endfor %}
    </ul>
  {% endif %}


</div>
