### --- Day 23: Amphipod ---

A group of [amphipods](https://en.wikipedia.org/wiki/Amphipoda) notice your fancy submarine and flag
you down. "With such an impressive shell," one amphipod says, "surely you can help us with a
question that has stumped our best scientists."

They go on to explain that a group of timid, stubborn amphipods live in a nearby burrow. Four types
of amphipods live there: <b>Amber</b> (<code>A</code>), <b>Bronze</b> (<code>B</code>),
<b>Copper</b> (<code>C</code>), and <b>Desert</b> (<code>D</code>). They live in a burrow that
consists of a <b>hallway</b> and four <b>side rooms</b>. The side rooms are initially full of
amphipods, and the hallway is initially empty.

They give you a <b>diagram of the situation</b> (your puzzle input), including locations of each
amphipod (<code>A</code>, <code>B</code>, <code>C</code>, or <code>D</code>, each of which is
occupying an otherwise open space), walls (<code>#</code>), and open space (<code>.</code>).

For example:

<pre>
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
</pre>

The amphipods would like a method to organize every amphipod into side rooms so that each side room
contains one type of amphipod and the types are sorted <code>A</code>-<code>D</code> going left to
right, like this:

<pre>
#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
</pre>

Amphipods can move up, down, left, or right so long as they are moving into an unoccupied open
space. Each type of amphipod requires a different amount of <b>energy</b> to move one step: Amber
amphipods require <code>1</code> energy per step, Bronze amphipods require <code>10</code> energy,
Copper amphipods require <code>100</code>, and Desert ones require <code>1000</code>. The amphipods
would like you to find a way to organize the amphipods that requires the <b>least total energy</b>.

However, because they are timid and stubborn, the amphipods have some extra rules:

- Amphipods will never <b>stop on the space immediately outside any room</b>. They can move into
  that space so long as they immediately continue moving. (Specifically, this refers to the four
  open spaces in the hallway that are directly above an amphipod starting position.)
- Amphipods will never <b>move from the hallway into a room</b> unless that room is their
  destination room <b>and</b> that room contains no amphipods which do not also have that room as
  their own destination. If an amphipod's starting room is not its destination room, it can stay in
  that room until it leaves the room. (For example, an Amber amphipod will not move from the hallway
  into the right three rooms, and will only move into the leftmost room if that room is empty or if
  it only contains other Amber amphipods.)
- Once an amphipod stops moving in the hallway, <b>it will stay in that spot until it can move into
  a room</b>. (That is, once any amphipod starts moving, any other amphipods currently in the
  hallway are locked in place and will not move again until they can move fully into a room.)

In the above example, the amphipods can be organized using a minimum of <b><code>12521</code></b>
energy. One way to do this is shown below.

Starting configuration:

<pre>
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
</pre>

One Bronze amphipod moves into the hallway, taking 4 steps and using <code>40</code> energy:

<pre>
#############
#...B.......#
###B#C#.#D###
  #A#D#C#A#
  #########
</pre>

The only Copper amphipod not in its side room moves there, taking 4 steps and using <code>400</code>
energy:

<pre>
#############
#...B.......#
###B#.#C#D###
  #A#D#C#A#
  #########
</pre>

A Desert amphipod moves out of the way, taking 3 steps and using <code>3000</code> energy, and then
the Bronze amphipod takes its place, taking 3 steps and using <code>30</code> energy:

<pre>
#############
#.....D.....#
###B#.#C#D###
  #A#B#C#A#
  #########
</pre>

The leftmost Bronze amphipod moves to its room using <code>40</code> energy:

<pre>
#############
#.....D.....#
###.#B#C#D###
  #A#B#C#A#
  #########
</pre>

Both amphipods in the rightmost room move into the hallway, using <code>2003</code> energy in total:

<pre>
#############
#.....D.D.A.#
###.#B#C#.###
  #A#B#C#.#
  #########
</pre>

Both Desert amphipods move into the rightmost room using <code>7000</code> energy:

<pre>
#############
#.........A.#
###.#B#C#D###
  #A#B#C#D#
  #########
</pre>

Finally, the last Amber amphipod moves into its room, using <code>8</code> energy:

<pre>
#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
</pre>

<b>What is the least energy required to organize the amphipods?</b>

### --- Part Two ---

As you prepare to give the amphipods your solution, you notice that the diagram they handed you was
actually folded up. As you unfold it, you discover an extra part of the diagram.

Between the first and second lines of text that contain amphipod starting positions, insert the
following lines:

<pre>
  #D#C#B#A#
  #D#B#A#C#
</pre>

So, the above example now becomes:

<pre>
#############
#...........#
###B#C#B#D###
  <b>#D#C#B#A#
  #D#B#A#C#</b>
  #A#D#C#A#
  #########
</pre>

The amphipods still want to be organized into rooms similar to before:

<pre>
#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########
</pre>

In this updated example, the least energy required to organize these amphipods is
<b><code>44169</code></b>:

<pre>
#############
#...........#
###B#C#B#D###
  #D#C#B#A#
  #D#B#A#C#
  #A#D#C#A#
  #########

#############
#..........D#
###B#C#B#.###
  #D#C#B#A#
  #D#B#A#C#
  #A#D#C#A#
  #########

#############
#A.........D#
###B#C#B#.###
  #D#C#B#.#
  #D#B#A#C#
  #A#D#C#A#
  #########

#############
#A........BD#
###B#C#.#.###
  #D#C#B#.#
  #D#B#A#C#
  #A#D#C#A#
  #########

#############
#A......B.BD#
###B#C#.#.###
  #D#C#.#.#
  #D#B#A#C#
  #A#D#C#A#
  #########

#############
#AA.....B.BD#
###B#C#.#.###
  #D#C#.#.#
  #D#B#.#C#
  #A#D#C#A#
  #########

#############
#AA.....B.BD#
###B#.#.#.###
  #D#C#.#.#
  #D#B#C#C#
  #A#D#C#A#
  #########

#############
#AA.....B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#B#C#C#
  #A#D#C#A#
  #########

#############
#AA...B.B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#.#C#C#
  #A#D#C#A#
  #########

#############
#AA.D.B.B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#.#C#C#
  #A#.#C#A#
  #########

#############
#AA.D...B.BD#
###B#.#.#.###
  #D#.#C#.#
  #D#.#C#C#
  #A#B#C#A#
  #########

#############
#AA.D.....BD#
###B#.#.#.###
  #D#.#C#.#
  #D#B#C#C#
  #A#B#C#A#
  #########

#############
#AA.D......D#
###B#.#.#.###
  #D#B#C#.#
  #D#B#C#C#
  #A#B#C#A#
  #########

#############
#AA.D......D#
###B#.#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#A#
  #########

#############
#AA.D.....AD#
###B#.#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#.#
  #########

#############
#AA.......AD#
###B#.#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#D#
  #########

#############
#AA.......AD#
###.#B#C#.###
  #D#B#C#.#
  #D#B#C#.#
  #A#B#C#D#
  #########

#############
#AA.......AD#
###.#B#C#.###
  #.#B#C#.#
  #D#B#C#D#
  #A#B#C#D#
  #########

#############
#AA.D.....AD#
###.#B#C#.###
  #.#B#C#.#
  #.#B#C#D#
  #A#B#C#D#
  #########

#############
#A..D.....AD#
###.#B#C#.###
  #.#B#C#.#
  #A#B#C#D#
  #A#B#C#D#
  #########

#############
#...D.....AD#
###.#B#C#.###
  #A#B#C#.#
  #A#B#C#D#
  #A#B#C#D#
  #########

#############
#.........AD#
###.#B#C#.###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########

#############
#..........D#
###A#B#C#.###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########

#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########
</pre>

Using the initial configuration from the full diagram, <b>what is the least energy required to
organize the amphipods?</b>
