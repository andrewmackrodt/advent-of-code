### --- Day 10: Cathode-Ray Tube ---

You avoid the ropes, plunge into the river, and swim to shore.

The Elves yell something about meeting back up with them upriver, but the river is too loud to tell
exactly what they're saying. They finish crossing the bridge and disappear from view.

Situations like this must be why the Elves prioritized getting the communication system on your
handheld device working. You pull it out of your pack, but the amount of water slowly draining from
a big crack in its screen tells you it probably won't be of much immediate use.

<b>Unless</b>, that is, you can design a replacement for the device's video system! It seems to be
some kind of [cathode-ray tube](https://en.wikipedia.org/wiki/Cathode-ray_tube) screen and simple
CPU that are both driven by a precise <b>clock circuit</b>. The clock circuit ticks at a constant
rate; each tick is called a <b>cycle</b>.

Start by figuring out the signal being sent by the CPU. The CPU has a single register,
<code>X</code>, which starts with the value <code>1</code>. It supports only two instructions:

- <code>addx V</code> takes <b>two cycles</b> to complete. <b>After</b> two cycles, the
  <code>X</code> register is increased by the value <code>V</code>. (<code>V</code> can be
  negative.)
- <code>noop</code> takes <b>one cycle</b> to complete. It has no other effect.

The CPU uses these instructions in a program (your puzzle input) to, somehow, tell the screen what
to draw.

Consider the following small program:

<pre>
noop
addx 3
addx -5
</pre>

Execution of this program proceeds as follows:

- At the start of the first cycle, the <code>noop</code> instruction begins execution. During the
  first cycle, <code>X</code> is <code>1</code>. After the first cycle, the <code>noop</code>
  instruction finishes execution, doing nothing.
- At the start of the second cycle, the <code>addx 3</code> instruction begins execution. During the
  second cycle, <code>X</code> is still <code>1</code>.
- During the third cycle, <code>X</code> is still <code>1</code>. After the third cycle, the
  <code>addx 3</code> instruction finishes execution, setting <code>X</code> to <code>4</code>.
- At the start of the fourth cycle, the <code>addx -5</code> instruction begins execution. During
  the fourth cycle, <code>X</code> is still <code>4</code>.
- During the fifth cycle, <code>X</code> is still <code>4</code>. After the fifth cycle, the
  <code>addx -5</code> instruction finishes execution, setting <code>X</code> to <code>-1</code>.

Maybe you can learn something by looking at the value of the <code>X</code> register throughout
execution. For now, consider the <b>signal strength</b> (the cycle number multiplied by the value of
the <code>X</code> register) <b>during</b> the 20th cycle and every 40 cycles after that (that is,
during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).

For example, consider this larger program:

<pre>
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
</pre>

The interesting signal strengths can be determined as follows:

- During the 20th cycle, register <code>X</code> has the value <code>21</code>, so the signal
  strength is 20 * 21 = <b>420</b>. (The 20th cycle occurs in the middle of the second <code>addx
  -1</code>, so the value of register <code>X</code> is the starting value, <code>1</code>, plus all
  of the other <code>addx</code> values up to that point: 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 =
  21.)
- During the 60th cycle, register <code>X</code> has the value <code>19</code>, so the signal
  strength is 60 * 19 = <b><code>1140</code></b>.
- During the 100th cycle, register <code>X</code> has the value <code>18</code>, so the signal
  strength is 100 * 18 = <b><code>1800</code></b>.
- During the 140th cycle, register <code>X</code> has the value <code>21</code>, so the signal
  strength is 140 * 21 = <b><code>2940</code></b>.
- During the 180th cycle, register <code>X</code> has the value <code>16</code>, so the signal
  strength is 180 * 16 = <b><code>2880</code></b>.
- During the 220th cycle, register <code>X</code> has the value <code>18</code>, so the signal
  strength is 220 * 18 = <b><code>3960</code></b>.

The sum of these signal strengths is <b><code>13140</code></b>.

Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. <b>What is
the sum of these six signal strengths?</b>

### --- Part Two ---

It seems like the <code>X</code> register controls the horizontal position of a
[sprite](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)). Specifically, the sprite is 3
pixels wide, and the <code>X</code> register sets the horizontal position of the <b>middle</b> of
that sprite. (In this system, there is no such thing as "vertical position": if the sprite's
horizontal position puts its pixels where the CRT is currently drawing, then those pixels will be
drawn.)

You count the pixels on the CRT: 40 wide and 6 high. This CRT screen draws the top row of pixels
left-to-right, then the row below that, and so on. The left-most pixel in each row is in position
<code>0</code>, and the right-most pixel in each row is in position <code>39</code>.

Like the CPU, the CRT is tied closely to the clock circuit: the CRT draws <b>a single pixel during
each cycle</b>. Representing each pixel of the screen as a <code>#</code>, here are the cycles
during which the first and last pixel in each row are drawn:

<pre>
Cycle   1 -&gt; <b>#</b>######################################<b>#</b> &lt;- Cycle  40
Cycle  41 -&gt; <b>#</b>######################################<b>#</b> &lt;- Cycle  80
Cycle  81 -&gt; <b>#</b>######################################<b>#</b> &lt;- Cycle 120
Cycle 121 -&gt; <b>#</b>######################################<b>#</b> &lt;- Cycle 160
Cycle 161 -&gt; <b>#</b>######################################<b>#</b> &lt;- Cycle 200
Cycle 201 -&gt; <b>#</b>######################################<b>#</b> &lt;- Cycle 240
</pre>

So, by [carefully](https://en.wikipedia.org/wiki/Racing_the_Beam)
[timing](https://www.youtube.com/watch?v=sJFnWZH5FXc) the CPU instructions and the CRT drawing
operations, you should be able to determine whether the sprite is visible the instant each pixel is
drawn. If the sprite is positioned such that one of its three pixels is the pixel currently being
drawn, the screen produces a <b>lit</b> pixel (<code>#</code>); otherwise, the screen leaves the
pixel <b>dark</b> (<code>.</code>).
<p>The first few pixels from the larger example above are drawn as follows:

<pre>
Sprite position: ###.....................................

Start cycle   1: begin executing addx 15
During cycle  1: CRT draws pixel in position 0
Current CRT row: #

During cycle  2: CRT draws pixel in position 1
Current CRT row: ##
End of cycle  2: finish executing addx 15 (Register X is now 16)
Sprite position: ...............###......................

Start cycle   3: begin executing addx -11
During cycle  3: CRT draws pixel in position 2
Current CRT row: ##.

During cycle  4: CRT draws pixel in position 3
Current CRT row: ##..
End of cycle  4: finish executing addx -11 (Register X is now 5)
Sprite position: ....###.................................

Start cycle   5: begin executing addx 6
During cycle  5: CRT draws pixel in position 4
Current CRT row: ##..#

During cycle  6: CRT draws pixel in position 5
Current CRT row: ##..##
End of cycle  6: finish executing addx 6 (Register X is now 11)
Sprite position: ..........###...........................

Start cycle   7: begin executing addx -3
During cycle  7: CRT draws pixel in position 6
Current CRT row: ##..##.

During cycle  8: CRT draws pixel in position 7
Current CRT row: ##..##..
End of cycle  8: finish executing addx -3 (Register X is now 8)
Sprite position: .......###..............................

Start cycle   9: begin executing addx 5
During cycle  9: CRT draws pixel in position 8
Current CRT row: ##..##..#

During cycle 10: CRT draws pixel in position 9
Current CRT row: ##..##..##
End of cycle 10: finish executing addx 5 (Register X is now 13)
Sprite position: ............###.........................

Start cycle  11: begin executing addx -1
During cycle 11: CRT draws pixel in position 10
Current CRT row: ##..##..##.

During cycle 12: CRT draws pixel in position 11
Current CRT row: ##..##..##..
End of cycle 12: finish executing addx -1 (Register X is now 12)
Sprite position: ...........###..........................

Start cycle  13: begin executing addx -8
During cycle 13: CRT draws pixel in position 12
Current CRT row: ##..##..##..#

During cycle 14: CRT draws pixel in position 13
Current CRT row: ##..##..##..##
End of cycle 14: finish executing addx -8 (Register X is now 4)
Sprite position: ...###..................................

Start cycle  15: begin executing addx 13
During cycle 15: CRT draws pixel in position 14
Current CRT row: ##..##..##..##.

During cycle 16: CRT draws pixel in position 15
Current CRT row: ##..##..##..##..
End of cycle 16: finish executing addx 13 (Register X is now 17)
Sprite position: ................###.....................

Start cycle  17: begin executing addx 4
During cycle 17: CRT draws pixel in position 16
Current CRT row: ##..##..##..##..#

During cycle 18: CRT draws pixel in position 17
Current CRT row: ##..##..##..##..##
End of cycle 18: finish executing addx 4 (Register X is now 21)
Sprite position: ....................###.................

Start cycle  19: begin executing noop
During cycle 19: CRT draws pixel in position 18
Current CRT row: ##..##..##..##..##.
End of cycle 19: finish executing noop

Start cycle  20: begin executing addx -1
During cycle 20: CRT draws pixel in position 19
Current CRT row: ##..##..##..##..##..

During cycle 21: CRT draws pixel in position 20
Current CRT row: ##..##..##..##..##..#
End of cycle 21: finish executing addx -1 (Register X is now 20)
Sprite position: ...................###..................
</pre>

Allowing the program to run to completion causes the CRT to produce the following image:

<pre>
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
</pre>

Render the image given by your program. <b>What eight capital letters appear on your CRT?</b>