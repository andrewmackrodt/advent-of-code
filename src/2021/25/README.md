### --- Day 25: Sea Cucumber ---

This is it: the bottom of the ocean trench, the last place the sleigh keys could be. Your
submarine's experimental antenna <b>still isn't boosted enough</b> to detect the keys, but they
<b>must</b> be here. All you need to do is <b>reach the seafloor</b> and find them.

At least, you'd touch down on the seafloor if you could; unfortunately, it's completely covered by
two large herds of [sea cucumbers](https://en.wikipedia.org/wiki/Sea_cucumber), and there isn't an
open space large enough for your submarine.

You suspect that the Elves must have done this before, because just then you discover the phone
number of a deep-sea marine biologist on a handwritten note taped to the wall of the submarine's
cockpit.

"Sea cucumbers? Yeah, they're probably hunting for food. But don't worry, they're predictable
critters: they move in perfectly straight lines, only moving forward when there's space to do so.
They're actually quite polite!"

You explain that you'd like to predict when you could land your submarine.

"Oh that's easy, they'll eventually pile up and leave enough space for-- wait, did you say
submarine? And the only place with that many sea cucumbers would be at the very bottom of the
Mariana--" You hang up the phone.

There are two herds of sea cucumbers sharing the same region; one always moves <b>east</b>
(<code>&gt;</code>), while the other always moves <b>south</b> (<code>v</code>). Each location can
contain at most one sea cucumber; the remaining locations are <b>empty</b> (<code>.</code>). The
submarine helpfully generates a map of the situation (your puzzle input). For example:

<pre>
v...&gt;&gt;.vv&gt;
.vv&gt;&gt;.vv..
&gt;&gt;.&gt;v&gt;...v
&gt;&gt;v&gt;&gt;.&gt;.v.
v&gt;v.vv.v..
&gt;.&gt;&gt;..v...
.vv..&gt;.&gt;v.
v.v..&gt;&gt;v.v
....v..v.&gt;
</pre>

Every <b>step</b>, the sea cucumbers in the east-facing herd attempt to move forward one location,
then the sea cucumbers in the south-facing herd attempt to move forward one location. When a herd
moves forward, every sea cucumber in the herd first simultaneously considers whether there is a sea
cucumber in the adjacent location it's facing (even another sea cucumber facing the same direction),
and then every sea cucumber facing an empty location simultaneously moves into that location.

So, in a situation like this:

<pre>
...&gt;&gt;&gt;&gt;&gt;...</pre>

After one step, only the rightmost sea cucumber would have moved:

<pre>
...&gt;&gt;&gt;&gt;.&gt;..</pre>

After the next step, two sea cucumbers move:

<pre>
...&gt;&gt;&gt;.&gt;.&gt;.</pre>

During a single step, the east-facing herd moves first, then the south-facing herd moves. So, given
this situation:

<pre>
..........
.&gt;v....v..
.......&gt;..
..........
</pre>

After a single step, of the sea cucumbers on the left, only the south-facing sea cucumber has moved
(as it wasn't out of the way in time for the east-facing cucumber on the left to move), but both sea
cucumbers on the right have moved (as the east-facing sea cucumber moved out of the way of the
south-facing sea cucumber):

<pre>
..........
.&gt;........
..v....v&gt;.
..........
</pre>

Due to <b>strong water currents</b> in the area, sea cucumbers that move off the right edge of the
map appear on the left edge, and sea cucumbers that move off the bottom edge of the map appear on
the top edge. Sea cucumbers always check whether their destination location is empty before moving,
even if that destination is on the opposite side of the map:

<pre>
Initial state:
...&gt;...
.......
......&gt;
v.....&gt;
......&gt;
.......
..vvv..

After 1 step:
..vv&gt;..
.......
&gt;......
v.....&gt;
&gt;......
.......
....v..

After 2 steps:
....v&gt;.
..vv...
.&gt;.....
......&gt;
v&gt;.....
.......
.......

After 3 steps:
......&gt;
..v.v..
..&gt;v...
&gt;......
..&gt;....
v......
.......

After 4 steps:
&gt;......
..v....
..&gt;.v..
.&gt;.v...
...&gt;...
.......
v......
</pre>

To find a safe place to land your submarine, the sea cucumbers need to stop moving. Again consider
the first example:

<pre>
Initial state:
v...&gt;&gt;.vv&gt;
.vv&gt;&gt;.vv..
&gt;&gt;.&gt;v&gt;...v
&gt;&gt;v&gt;&gt;.&gt;.v.
v&gt;v.vv.v..
&gt;.&gt;&gt;..v...
.vv..&gt;.&gt;v.
v.v..&gt;&gt;v.v
....v..v.&gt;

After 1 step:
....&gt;.&gt;v.&gt;
v.v&gt;.&gt;v.v.
&gt;v&gt;&gt;..&gt;v..
&gt;&gt;v&gt;v&gt;.&gt;.v
.&gt;v.v...v.
v&gt;&gt;.&gt;vvv..
..v...&gt;&gt;..
vv...&gt;&gt;vv.
&gt;.v.v..v.v

After 2 steps:
&gt;.v.v&gt;&gt;..v
v.v.&gt;&gt;vv..
&gt;v&gt;.&gt;.&gt;.v.
&gt;&gt;v&gt;v.&gt;v&gt;.
.&gt;..v....v
.&gt;v&gt;&gt;.v.v.
v....v&gt;v&gt;.
.vv..&gt;&gt;v..
v&gt;.....vv.

After 3 steps:
v&gt;v.v&gt;.&gt;v.
v...&gt;&gt;.v.v
&gt;vv&gt;.&gt;v&gt;..
&gt;&gt;v&gt;v.&gt;.v&gt;
..&gt;....v..
.&gt;.&gt;v&gt;v..v
..v..v&gt;vv&gt;
v.v..&gt;&gt;v..
.v&gt;....v..

After 4 steps:
v&gt;..v.&gt;&gt;..
v.v.&gt;.&gt;.v.
&gt;vv.&gt;&gt;.v&gt;v
&gt;&gt;.&gt;..v&gt;.&gt;
..v&gt;v...v.
..&gt;&gt;.&gt;vv..
&gt;.v.vv&gt;v.v
.....&gt;&gt;vv.
vvv&gt;...v..

After 5 steps:
vv&gt;...&gt;v&gt;.
v.v.v&gt;.&gt;v.
&gt;.v.&gt;.&gt;.&gt;v
&gt;v&gt;.&gt;..v&gt;&gt;
..v&gt;v.v...
..&gt;.&gt;&gt;vvv.
.&gt;...v&gt;v..
..v.v&gt;&gt;v.v
v.v.&gt;...v.

...

After 10 steps:
..&gt;..&gt;&gt;vv.
v.....&gt;&gt;.v
..v.v&gt;&gt;&gt;v&gt;
v&gt;.&gt;v.&gt;&gt;&gt;.
..v&gt;v.vv.v
.v.&gt;&gt;&gt;.v..
v.v..&gt;v&gt;..
..v...&gt;v.&gt;
.vv..v&gt;vv.

...

After 20 steps:
v&gt;.....&gt;&gt;.
&gt;vv&gt;.....v
.&gt;v&gt;v.vv&gt;&gt;
v&gt;&gt;&gt;v.&gt;v.&gt;
....vv&gt;v..
.v.&gt;&gt;&gt;vvv.
..v..&gt;&gt;vv.
v.v...&gt;&gt;.v
..v.....v&gt;

...

After 30 steps:
.vv.v..&gt;&gt;&gt;
v&gt;...v...&gt;
&gt;.v&gt;.&gt;vv.&gt;
&gt;v&gt;.&gt;.&gt;v.&gt;
.&gt;..v.vv..
..v&gt;..&gt;&gt;v.
....v&gt;..&gt;v
v.v...&gt;vv&gt;
v.v...&gt;vvv

...

After 40 steps:
&gt;&gt;v&gt;v..v..
..&gt;&gt;v..vv.
..&gt;&gt;&gt;v.&gt;.v
..&gt;&gt;&gt;&gt;vvv&gt;
v.....&gt;...
v.v...&gt;v&gt;&gt;
&gt;vv.....v&gt;
.&gt;v...v.&gt;v
vvv.v..v.&gt;

...

After 50 steps:
..&gt;&gt;v&gt;vv.v
..v.&gt;&gt;vv..
v.&gt;&gt;v&gt;&gt;v..
..&gt;&gt;&gt;&gt;&gt;vv.
vvv....&gt;vv
..v....&gt;&gt;&gt;
v&gt;.......&gt;
.vv&gt;....v&gt;
.&gt;v.vv.v..

...

After 55 steps:
..&gt;&gt;v&gt;vv..
..v.&gt;&gt;vv..
..&gt;&gt;v&gt;&gt;vv.
..&gt;&gt;&gt;&gt;&gt;vv.
v......&gt;vv
v&gt;v....&gt;&gt;v
vvv...&gt;..&gt;
&gt;vv.....&gt;.
.&gt;v.vv.v..

After 56 steps:
..&gt;&gt;v&gt;vv..
..v.&gt;&gt;vv..
..&gt;&gt;v&gt;&gt;vv.
..&gt;&gt;&gt;&gt;&gt;vv.
v......&gt;vv
v&gt;v....&gt;&gt;v
vvv....&gt;.&gt;
&gt;vv......&gt;
.&gt;v.vv.v..

After 57 steps:
..&gt;&gt;v&gt;vv..
..v.&gt;&gt;vv..
..&gt;&gt;v&gt;&gt;vv.
..&gt;&gt;&gt;&gt;&gt;vv.
v......&gt;vv
v&gt;v....&gt;&gt;v
vvv.....&gt;&gt;
&gt;vv......&gt;
.&gt;v.vv.v..

After 58 steps:
..&gt;&gt;v&gt;vv..
..v.&gt;&gt;vv..
..&gt;&gt;v&gt;&gt;vv.
..&gt;&gt;&gt;&gt;&gt;vv.
v......&gt;vv
v&gt;v....&gt;&gt;v
vvv.....&gt;&gt;
&gt;vv......&gt;
.&gt;v.vv.v..
</pre>

In this example, the sea cucumbers stop moving after <b><code>58</code></b> steps.

Find somewhere safe to land your submarine. <b>What is the first step on which no sea cucumbers
move?</b>

### --- Part Two ---

Suddenly, the experimental antenna control console lights up:

<pre>
<b>Sleigh keys detected!</b></pre>

According to the console, the keys are <b>directly under the submarine</b>. You landed right on
them! Using a robotic arm on the submarine, you move the sleigh keys into the airlock.

Now, you just need to get them to Santa in time to save Christmas! You check your clock - it
<b>is</b> Christmas. There's no way you can get them back to the surface in time.

Just as you start to lose hope, you notice a button on the sleigh keys: <b>remote start</b>. You can
start the sleigh from the bottom of the ocean! You just need some way to <b>boost the signal</b>
from the keys so it actually reaches the sleigh. Good thing the submarine has that experimental
antenna! You'll definitely need <b>50 stars</b> to boost it that far, though.

The experimental antenna control console lights up again:

<pre>
<b>Energy source detected.
Integrating energy source from device "sleigh keys"...done.
Installing device drivers...done.
Recalibrating experimental antenna...done.
Boost strength due to matching signal phase: <em>1 star</em>
</b>
</pre>

Only <b>49 stars</b> to go.