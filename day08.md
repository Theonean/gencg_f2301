# Day 08

## Faces - 3

Today my main goal was to improve upon the bounding box calculation, so far I've been doing a calculation with the pull vectors which decide face curvature.
However these vectors are loosely related to the actual width of the face and thus the calculated points were always either too small or too large.

To improve the accuracy I decided to take on a wholly new route: adding a function between face and feature drawing which reads the face outlines.
This is possible by getting the Bezier curves vector points (which is an inbuilt p5js function) and combining it with the p5 collide2d Librarys intersection check.
Although at start this sounded quite promising it proved to be quite the hassle until I got it working correctly, the main challenge proved to be understanding the p5 Collide Library.

In my Code I was trying to move a point to the left in a while loop to find the intersecting point. However this didn't (and couldn't) work because as I know now, the inside of a shape also counts as collision area. For bezier curves this means it implicitly creates an "inner area" which is done by connecting the end and starting point. As a result of this my "calculated" bounds were always basically 0 or the default value I gave it. The Solution to this was to invert the check, instead of checking and exiting when I collided with something, I changed it so it would exit when the collision stopped, which then turned out to work quite nicely.

The face positioning was also reworked, however it broke positioning down the line as it created too large or small numbers, so I had to scrap it early on.
As I had some time left I decided to try and add a frame around the face, which would highlight it and make it look more "done". The Frame sadly also has the issue of breaking the view bounds, but I still kept it as this is a fixable problem originating at the frame and not the face positioning.



## Sources
P5js Collide2D Library by Bmorgen - https://github.com/bmoren/p5.collide2D