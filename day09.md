# Day 09

## Faces - 4 and Preparation for presentation

To try and get a more presentable overview of my face-generator I spent today stripping away the senseless and made multiple faces be drawn on the canvas.
For this I had to restructure a good bit of code, which led me to realize that there were some deep problems in the code where I would still be calculating things with windowHeight and width. This would lead to visual glitches and funny numbers being generated which made some control-variables obsolete if not harmfull. Aditionally the frame was removed due to the same problem and because the screen would be too cluttered with 20 something frames.

The rest of the day was spent on preparing my presentation.

The, for now, finished version of my p5js face generator:
just as before, press r to reload for a new screen and enjoy the multitude of emotions, maybe you'll even find yourself?

{% raw %}
<iframe src="https://editor.p5js.org/Theonean/full/A85xm4hrp" width="100%" height="300" frameborder="no"></iframe>
{% endraw %}