### --- Day 1: Trebuchet?! ---

Something is wrong with global snow production, and you've been selected to take a look. The Elves
have even given you a map; on it, they've used stars to mark the top fifty locations that are likely
to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all
<b>fifty stars</b> by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent
calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants <b>one
star</b>. Good luck!

You try to ask why they can't just use a [weather machine](https://adventofcode.com/2015/day/1)
("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly
blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do
you think snow comes from") when you realize that the Elves are already loading you into a
[trebuchet](https://en.wikipedia.org/wiki/Trebuchet) ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle
input) has been <b>amended</b> by a very young Elf who was apparently just excited to show off her
art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a
specific <b>calibration value</b> that the Elves now need to recover. On each line, the calibration
value can be found by combining the <b>first digit</b> and the <b>last digit</b> (in that order) to
form a single <b>two-digit number</b>.

For example:

<pre>
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
</pre>

In this example, the calibration values of these four lines are <code>12</code>, <code>38</code>,
<code>15</code>, and <code>77</code>. Adding these together produces <code><b>142</b></code>.

Consider your entire calibration document. <b>What is the sum of all of the calibration values?</b>