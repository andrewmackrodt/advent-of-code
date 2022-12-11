### --- Day 1: Calorie Counting ---

Santa's reindeer typically eat regular reindeer food, but they need a lot of [magical
energy](/2018/day/25) to deliver presents on Christmas. For that, their favorite snack is a special
type of <b>star</b> fruit that only grows deep in the jungle. The Elves have brought you on their
annual expedition to the grove where the fruit grows.

To supply enough magical energy, the expedition needs to retrieve a minimum of <b>fifty stars</b> by
December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab
any fruit you see along the way, just in case.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent
calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants <b>one
star</b>. Good luck!

The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the
Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking
inventory of their supplies. One important consideration is food - in particular, the number of
<b>Calories</b> each Elf is carrying (your puzzle input).

The Elves take turns writing down the number of Calories contained by the various meals, snacks,
rations, etc. that they've brought with them, one item per line. Each Elf separates their own
inventory from the previous Elf's inventory (if any) by a blank line.

For example, suppose the Elves finish writing their items' Calories and end up with the following
list:

<pre>
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
</pre>

This list represents the Calories of the food carried by five Elves:

- The first Elf is carrying food with <code>1000</code>, <code>2000</code>, and <code>3000</code>
  Calories, a total of <b><code>6000</code></b> Calories.
- The second Elf is carrying one food item with <b><code>4000</code></b> Calories.
- The third Elf is carrying food with <code>5000</code> and <code>6000</code> Calories, a total of
  <b><code>11000</code></b> Calories.
- The fourth Elf is carrying food with <code>7000</code>, <code>8000</code>, and <code>9000</code>
  Calories, a total of <b><code>24000</code></b> Calories.
- The fifth Elf is carrying one food item with <b><code>10000</code></b> Calories.

In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like
to know how many Calories are being carried by the Elf carrying the <b>most</b> Calories. In the
example above, this is <b><code>24000</code></b> (carried by the fourth Elf).

Find the Elf carrying the most Calories. <b>How many total Calories is that Elf carrying?</b>

### --- Part Two ---

By the time you calculate the answer to the Elves' question, they've already realized that the Elf
carrying the most Calories of food might eventually <b>run out of snacks</b>.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories
carried by the <b>top three</b> Elves carrying the most Calories. That way, even if one of those
Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with <code>24000</code> Calories),
then the third Elf (with <code>11000</code> Calories), then the fifth Elf (with <code>10000</codE>
Calories). The sum of the Calories carried by these three elves is <b><code>45000</code></b>.

Find the top three Elves carrying the most Calories. <b>How many Calories are those Elves carrying
in total?</b>