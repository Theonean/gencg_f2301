# Day 04 

## a loud piece

Todays challenge was to create a tool or drawing machine which modifies, disturbs or enhances the drawing experience.

With this challenge too I had a lot of trouble finding an idea I liked. After some mulling I thought of interpreting incoming microphone audio and then disturbing the drawing in some way.

The idea behind this was to let the canvas rotate whenever the loudness reaches above a certain threshold to signify the impact concentration-breaks can have on (art)work when someone comes and talks to you or the room becomes too loud. It should be a sympathetic piece to sensory-sensitive people.

Out of that idea this first image got created, titled "my voice" it was made by drawing straight lines and talking / singing / shouting during the process.

{% raw %}
<iframe src="imgs/day4Img1_myVoice.png" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

However this idea still felt quite forced to me so I continued working on it upon which I stumbled on the idea of creating a sound-wall which would (with its colours) roughly represent the relation (of loudness) of low-mid-high frequencies to each other.

Being content with the idea I modified my code and created three pieces, to interpret the data roughly here is the concept:
The colours of the balls Red-Green-Blue represent the intensity of the specific frequency area:
Red: Low Frequency band < 2000hz
Green: Mid Frequency band < 1000hz
Blue: High Frequency band < 20000hz (above is unhearable so ignored)

The first is made with the song "high way to hell - AC/DC"

{% raw %}
<iframe src="imgs/day4_img01_highwaytohell.png" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

The next piece is made with "fallen kingdoms - captain sparklez" (a minecraft parody of coldplays viva la vida)

{% raw %}
<iframe src="imgs/day4_img02_fallenkingdom.png" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

and finally a swiss classic "W nuss vo Bümpliz - Patent Ochsner"

{% raw %}
<iframe src="imgs/day4_img03_wNussVoBuempliz.png" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

Reflecting on this first collection made I think the bubbles are too far away from each other and it currently reads a lot more like "colour noise" instead of "musical colour" which is a shame.

Which also brings me to the part of this project I think I could improve most on: the coloring and intensity of the colours depending on the noise.
The spacing between circles is something I changed drastically for my last piece. The large distances made the previous pieces feel to "airy" and make it lose impact per bubble and readability.

For my last piece I used the song "W nuss vo Bümpliz" again, this time specific parts of the song can be recognized by the naked eye:
-the black circles where theres breaks in the song
-the slow buildup of all instruments (circles become darker and darker, sound becomes smudged)
-bluer and greener parts represent vocals / more instrumental parts, voices tend to be in the green-midrange

{% raw %}
<iframe src="imgs/day4_img03_wNussVoBuempliz_noAir.png" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

And finally heres the sketch which does the same thing as above but takes in Microphone sounds instead of songs.

{% raw %}
<iframe src="https://editor.p5js.org/Theonean/full/JL9K5YtlI" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}