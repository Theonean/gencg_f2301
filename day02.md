# Day 02

## Grids & Iterative Patterns

### Moving Mandala

Part of this days task was to create some tiling or iterative pattern.
Motivated by my previous task (STAIR Logo) and inspired by Vera Molnars squares I planned to create rotating squares nested inside each other.

While creating the squares movement I had a lot of trouble not having the rotation mess things up and make things go out of viewbounds.

To try and fix this bug I tried various methods like changing the way I draw the square from rect, square, 4 lines together and finally drawing it as a shape with vertices which ended up being most reliable.
I also added in that every 2nd column and row counter rotates, adding to the moving mandala feeling.

Although I am happy with the visuals it creates I could still do a lot more with the colour ie. making it dynamic or react to the user.

{% raw %}
<iframe src="https://editor.p5js.org/Theonean/full/YK-H4r80J" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

