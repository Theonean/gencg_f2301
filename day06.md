# Day 06

## Faces

Todays challenge was to make a face-generator or something akin to it.
As I had mainly stayed with the usable geometric forms (square, circle, rect, etc.) I wanted to give beziers a try.

For preparation I doodled some small and simple faces and tried to think of the various important positions or variables I'd have to save.
While drawing I quickly realized I could add some more variety by adding eye / nose / mouth variations, so I drew some of those.

Because I wanted to stray away from simple shapes I used bezier curves for the face outline. This proved to be a fortunate decision later 
as the "control points" (pull force on start and end point) were randomized in their strength and direction which results in a multitude of faceshapes.

press r to reload a new face.
{% raw %}
<iframe src="https://editor.p5js.org/Theonean/full/Seed3k0sM" width="100%" height="300" frameborder="no"></iframe>
{% endraw %}