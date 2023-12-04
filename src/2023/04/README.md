### --- Day 4: Scratchcards ---

The gondola takes you up. Strangely, though, the ground doesn't seem to be coming with you; you're
not climbing a mountain. As the circle of Snow Island recedes below you, an entire new landmass
suddenly appears above you! The gondola carries you to the surface of the new island and lurches
into the station.

As you exit the gondola, the first thing you notice is that the air here is much <b>warmer</b> than
it was on Snow Island. It's also quite <b>humid</b>. Is this where the water source is?

The next thing you notice is an Elf sitting on the floor across the station in what seems to be a
pile of colorful square cards.

"Oh! Hello!" The Elf excitedly runs over to you. "How may I be of service?" You ask about water
sources.

"I'm not sure; I just operate the gondola lift. That does sound like something we'd have, though -
this is <b>Island Island</b>, after all! I bet the <b>gardener</b> would know. He's on a different
island, though - er, the small kind surrounded by water, not the floating kind. We really need to
come up with a better naming scheme. Tell you what: if you can help me with something quick, I'll
let you <b>borrow my boat</b> and you can go visit the gardener. I got all these
[scratchcards](https://en.wikipedia.org/wiki/Scratchcard) as a gift, but I can't figure out what
I've won."

The Elf leads you over to the pile of colorful cards. There, you discover dozens of scratchcards,
all with their opaque covering already scratched off. Picking one up, it looks like each card has
two lists of numbers separated by a vertical bar (<code>|</code>): a list of <b>winning numbers</b>
and then a list of <b>numbers you have</b>. You organize the information into a table (your puzzle
input).

As far as the Elf has been able to figure out, you have to figure out which of the <b>numbers you
have</b> appear in the list of <b>winning numbers</b>. The first match makes the card worth <b>one
point</b> and each match after the first <b>doubles</b> the point value of that card.

For example:

<pre>
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
</pre>

In the above example, card 1 has five winning numbers (<code>41</code>, <code>48</code>,
<code>83</code>, <code>86</code>, and <code>17</code>) and eight numbers you have (<code>83</code>,
<code>86</code>, <code>6</code>, <code>31</code>, <code>17</code>, <code>9</code>, <code>48</code>,
and <code>53</code>). Of the numbers you have, four of them (<code>48</code>, <code>83</code>,
<code>17</code>, and <code>86</code>) are winning numbers! That means card 1 is worth
<code><b>8</b></code> points (1 for the first match, then doubled three times for each of the three
matches after the first).

- Card 2 has two winning numbers (<code>32</code> and <code>61</code>), so it is worth
  <code><b>2</b></code> points.
- Card 3 has two winning numbers (<code>1</code> and <code>21</code>), so it is worth
  <code><b>2</b></code> points.
- Card 4 has one winning number (<code>84</code>), so it is worth <code><b>1</b></code> point.
- Card 5 has no winning numbers, so it is worth no points.
- Card 6 has no winning numbers, so it is worth no points.

So, in this example, the Elf's pile of scratchcards is worth <code><b>13</b></code> points.

Take a seat in the large pile of colorful cards. <b>How many points are they worth in total?</b>