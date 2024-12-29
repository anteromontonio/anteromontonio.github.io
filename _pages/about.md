---
layout: about
title: About
permalink: /
subtitle: "Groups, as men, will be known by their actions."

profile:
  align: right
  image: tero_cafe_small.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Faculty of Mathematics and Physics</p>
    <p>University of Ljubljana</p>
    <p>Jadranska 19, 1000 Ljubljana</p>
    <p>Slovenia</p>

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

{% capture source %}{% include_relative about-n.md %}{% endcapture %}
{{ source | split: "---" | last }}

