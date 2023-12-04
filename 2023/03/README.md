### --- Day 3: Gear Ratios ---

You and the Elf eventually reach a [gondola lift](https://en.wikipedia.org/wiki/Gondola_lift)
station; he says the gondola lift will take you up to the <b>water source</b>, but this is as far as
he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't
expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix
it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure
out which one. If you can <b>add up all the part numbers</b> in the engine schematic, it should be
easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There
are lots of numbers and symbols you don't really understand, but apparently <b>any number adjacent
to a symbol</b>, even diagonally, is a "part number" and should be included in your sum. (Periods
(<code>.</code>) do not count as a symbol.)

Here is an example engine schematic:

<pre>
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
</pre>

In this schematic, two numbers are <b>not</b> part numbers because they are not adjacent to a
symbol: <code>114</code> (top right) and <code>58</code> (middle right). Every other number is
adjacent to a symbol and so <b>is</b> a part number; their sum is <code><b>4361</b></code>.

Of course, the actual engine schematic is much larger. <b>What is the sum of all of the part numbers
in the engine schematic?</b>

### --- Part Two ---

The engineer finds the missing part and installs it in the engine! As the engine springs to life,
you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the
gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the
engineer, holding a phone in one hand and waving with the other. You're going so slowly that you
haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A <b>gear</b> is
any <code>*</code> symbol that is adjacent to <b>exactly two part numbers</b>. Its <b>gear ratio</b>
is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer
can figure out which gear needs to be replaced.

Consider the same engine schematic again:

<pre>
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
</pre>

In this schematic, there are <b>two</b> gears. The first is in the top left; it has part numbers
<code>467</code> and <code>35</code>, so its gear ratio is <code>16345</code>. The second gear is in
the lower right; its gear ratio is <code>451490</code>. (The <code>*</code> adjacent to
<code>617</code> is <b>not</b> a gear because it is only adjacent to one part number.) Adding up all
of the gear ratios produces <code><b>467835</b></code>.

<b>What is the sum of all of the gear ratios in your engine schematic?</b>