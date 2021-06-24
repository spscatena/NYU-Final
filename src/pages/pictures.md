---
pageTitle: Apples
navTitle: Pictures
singleImage: /img/apples.png
images:
  - apples.png
  - apples-red.png
  - apples-group.png
pageClass: pictures
---

<!-- ![alt info goes here]( {{ singleImage }}) -->

<!-- <img src="{{ singleImage }}" alt="info goes here" style="transform: scale(50%) rotate(20deg);" /> -->

{% for filename in images %}
<img src="/img/{{ filename }}" alt="nice apple" />
{% endfor %}

[Home](/)
