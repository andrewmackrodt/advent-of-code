### --- Day 17: Trick Shot ---

You finally decode the Elves' message. <code>HI</code>, the message says. You continue searching for
the sleigh keys.

Ahead of you is what appears to be a large [ocean
trench](https://en.wikipedia.org/wiki/Oceanic_trench). Could the keys have fallen into it? You'd
better send a probe to investigate.

The probe launcher on your submarine can fire the probe with any
[integer](https://en.wikipedia.org/wiki/Integer) velocity in the <code>x</code> (forward) and
<code>y</code> (upward, or downward if negative) directions. For example, an initial
<code>x,y</code> velocity like <code>0,10</code> would fire the probe straight up, while an initial
velocity like <code>10,-1</code> would fire the probe forward at a slight downward angle.

The probe's <code>x,y</code> position starts at <code>0,0</code>. Then, it will follow some
trajectory by moving in <b>steps</b>. On each step, these changes occur in the following order:

- The probe's <code>x</code> position increases by its <code>x</code> velocity.
- The probe's <code>y</code> position increases by its <code>y</code> velocity.
- Due to drag, the probe's <code>x</code> velocity changes by <code>1</code> toward the value
  <code>0</code>; that is, it decreases by <code>1</code> if it is greater than <code>0</code>,
  increases by <code>1</code> if it is less than <code>0</code>, or does not change if it is already
  <code>0</code>.
- Due to gravity, the probe's <code>y</code> velocity decreases by <code>1</code>.

For the probe to successfully make it into the trench, the probe must be on some trajectory that
causes it to be within a <b>target area</b> after any step. The submarine computer has already
calculated this target area (your puzzle input). For example:

<pre>
target area: x=20..30, y=-10..-5</pre>

This target area means that you need to find initial <code>x,y</code> velocity values such that
after any step, the probe's <code>x</code> position is at least <code>20</code> and at most
<code>30</code>, <b>and</b> the probe's <code>y</code> position is at least <code>-10</code> and at
most <code>-5</code>.

Given this target area, one initial velocity that causes the probe to be within the target area
after any step is <code>7,2</code>:

<pre>
.............#....#............
.......#..............#........
...............................
S........................#.....
...............................
...............................
...........................#...
...............................
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................TTTTTTTT#TT
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................TTTTTTTTTTT
</pre>

In this diagram, <code>S</code> is the probe's initial position, <code>0,0</code>. The
<code>x</code> coordinate increases to the right, and the <code>y</code> coordinate increases
upward. In the bottom right, positions that are within the target area are shown as <code>T</code>.
After each step (until the target area is reached), the position of the probe is marked with
<code>#</code>. (The bottom-right <code>#</code> is both a position the probe reaches and a position
in the target area.)

Another initial velocity that causes the probe to be within the target area after any step is
<code>6,3</code>:

<pre>
...............#..#............
...........#........#..........
...............................
......#..............#.........
...............................
...............................
S....................#.........
...............................
...............................
...............................
.....................#.........
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................T#TTTTTTTTT
....................TTTTTTTTTTT
</pre>

Another one is <code>9,0</code>:

<pre>
S........#.....................
.................#.............
...............................
........................#......
...............................
....................TTTTTTTTTTT
....................TTTTTTTTTT#
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................TTTTTTTTTTT
....................TTTTTTTTTTT
</pre>

One initial velocity that <b>doesn't</b> cause the probe to be within the target area after any step
is <code>17,-4</code>:

<pre>
S..............................................................
...............................................................
...............................................................
...............................................................
.................#.............................................
....................TTTTTTTTTTT................................
....................TTTTTTTTTTT................................
....................TTTTTTTTTTT................................
....................TTTTTTTTTTT................................
....................TTTTTTTTTTT..#.............................
....................TTTTTTTTTTT................................
...............................................................
...............................................................
...............................................................
...............................................................
................................................#..............
...............................................................
...............................................................
...............................................................
...............................................................
...............................................................
...............................................................
..............................................................#
</pre>

The probe appears to pass through the target area, but is never within it after any step. Instead,
it continues down and to the right - only the first few steps are shown.

If you're going to fire a highly scientific probe out of a super cool probe launcher, you might as
well do it with <b>style</b>. How high can you make the probe go while still reaching the target
area?

In the above example, using an initial velocity of <code>6,9</code> is the best you can do, causing
the probe to reach a maximum <code>y</code> position of <code><b>45</b></code>. (Any higher initial
<code>y</code> velocity causes the probe to overshoot the target area entirely.)

Find the initial velocity that causes the probe to reach the highest <code>y</code> position and
still eventually be within the target area after any step. <b>What is the highest <code>y</code>
position it reaches on this trajectory?</b>

### --- Part Two ---

Maybe a fancy trick shot isn't the best idea; after all, you only have one probe, so you had better
not miss.

To get the best idea of what your options are for launching the probe, you need to find <b>every
initial velocity</b> that causes the probe to eventually be within the target area after any step.

In the above example, there are <code><b>112</b></code> different initial velocity values that meet
these criteria:

<pre>
23,-10  25,-9   27,-5   29,-6   22,-6   21,-7   9,0     27,-7   24,-5
25,-7   26,-6   25,-5   6,8     11,-2   20,-5   29,-10  6,3     28,-7
8,0     30,-6   29,-8   20,-10  6,7     6,4     6,1     14,-4   21,-6
26,-10  7,-1    7,7     8,-1    21,-9   6,2     20,-7   30,-10  14,-3
20,-8   13,-2   7,3     28,-8   29,-9   15,-3   22,-5   26,-8   25,-8
25,-6   15,-4   9,-2    15,-2   12,-2   28,-9   12,-3   24,-6   23,-7
25,-10  7,8     11,-3   26,-7   7,1     23,-9   6,0     22,-10  27,-6
8,1     22,-8   13,-4   7,6     28,-6   11,-4   12,-4   26,-9   7,4
24,-10  23,-8   30,-8   7,0     9,-1    10,-1   26,-5   22,-9   6,5
7,5     23,-6   28,-10  10,-2   11,-1   20,-9   14,-2   29,-7   13,-3
23,-5   24,-8   27,-9   30,-7   28,-5   21,-10  7,9     6,6     21,-5
27,-10  7,2     30,-9   21,-8   22,-7   24,-9   20,-6   6,9     29,-5
8,-2    27,-8   30,-5   24,-7
</pre>

<b>How many distinct initial velocity values cause the probe to be within the target area after any
step?</b>