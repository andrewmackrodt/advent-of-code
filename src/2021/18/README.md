### --- Day 18: Snailfish ---

You descend into the ocean trench and encounter some
[snailfish](https://en.wikipedia.org/wiki/Snailfish). They say they saw the sleigh keys! They'll
even tell you which direction the keys went if you help one of the smaller snailfish with his
<b>math homework</b>.

Snailfish numbers aren't like regular numbers. Instead, every snailfish number is a <b>pair</b> - an
ordered list of two elements. Each element of the pair can be either a regular number or another
pair.

Pairs are written as <code>[x,y]</code>, where <code>x</code> and <code>y</code> are the elements
within the pair. Here are some example snailfish numbers, one snailfish number per line:

<pre>
[1,2]
[[1,2],3]
[9,[8,7]]
[[1,9],[8,5]]
[[[[1,2],[3,4]],[[5,6],[7,8]]],9]
[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]
</pre>

This snailfish homework is about <b>addition</b>. To add two snailfish numbers, form a pair from the
left and right parameters of the addition operator. For example, <code>[1,2]</code> +
<code>[[3,4],5]</code> becomes <code>[[1,2],[[3,4],5]]</code>.

There's only one problem: <b>snailfish numbers must always be reduced</b>, and the process of adding
two snailfish numbers can result in snailfish numbers that need to be reduced.

To <b>reduce a snailfish number</b>, you must repeatedly do the first action in this list that
applies to the snailfish number:

- If any pair is <b>nested inside four pairs</b>, the leftmost such pair <b>explodes</b>.
- If any regular number is <b>10 or greater</b>, the leftmost such regular number <b>splits</b>.

Once no action in the above list applies, the snailfish number is reduced.

During reduction, at most one action applies, after which the process returns to the top of the list
of actions. For example, if <b>split</b> produces a pair that meets the <b>explode</b> criteria,
that pair <b>explodes</b> before other <b>splits</b> occur.

To <b>explode</b> a pair, the pair's left value is added to the first regular number to the left of
the exploding pair (if any), and the pair's right value is added to the first regular number to the
right of the exploding pair (if any). Exploding pairs will always consist of two regular numbers.
Then, the entire exploding pair is replaced with the regular number <code>0</code>.

Here are some examples of a single explode action:

- <code>[[[[<b>[9,8]</b>,1],2],3],4]</code> becomes <code>[[[[<b>0</b>,<b>9</b>],2],3],4]</code>
  (the <code>9</code> has no regular number to its left, so it is not added to any regular number).
- <code>[7,[6,[5,[4,<b>[3,2]</b>]]]]</code> becomes <code>[7,[6,[5,[<b>7</b>,<b>0</b>]]]]</code>
  (the <code>2</code> has no regular number to its right, and so it is not added to any regular
  number).
- <code>[[6,[5,[4,<b>[3,2]</b>]]],1]</code> becomes
  <code>[[6,[5,[<b>7</b>,<b>0</b>]]],<b>3</b>]</code>.
- <code>[[3,[2,[1,<b>[7,3]</b>]]],[6,[5,[4,[3,2]]]]]</code> becomes
  <code>[[3,[2,[<b>8</b>,<b>0</b>]]],[<b>9</b>,[5,[4,[3,2]]]]]</code> (the pair <code>[3,2]</code>
  is unaffected because the pair <code>[7,3]</code> is further to the left; <code>[3,2]</code> would
  explode on the next action).
- <code>[[3,[2,[8,0]]],[9,[5,[4,<b>[3,2]</b>]]]]</code> becomes
  <code>[[3,[2,[8,0]]],[9,[5,[<b>7</b>,<b>0</b>]]]]</code>.

To <b>split</b> a regular number, replace it with a pair; the left element of the pair should be the
regular number divided by two and rounded <b>down</b>, while the right element of the pair should be
the regular number divided by two and rounded <b>up</b>. For example, <code>10</code> becomes
<code>[5,5]</code>, <code>11</code> becomes <code>[5,6]</code>, <code>12</code> becomes
<code>[6,6]</code>, and so on.

Here is the process of finding the reduced result of <code>[[[[4,3],4],4],[7,[[8,4],9]]]</code> +
<code>[1,1]</code>:

<pre>
after addition: [[[[<b>[4,3]</b>,4],4],[7,[[8,4],9]]],[1,1]]
after explode:  [[[[0,7],4],[7,[<b>[8,4]</b>,9]]],[1,1]]
after explode:  [[[[0,7],4],[<b>15</b>,[0,13]]],[1,1]]
after split:    [[[[0,7],4],[[7,8],[0,<b>13</b>]]],[1,1]]
after split:    [[[[0,7],4],[[7,8],[0,<b>[6,7]</b>]]],[1,1]]
after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]
</pre>

Once no reduce actions apply, the snailfish number that remains is the actual result of the addition
operation: <code>[[[[0,7],4],[[7,8],[6,0]]],[8,1]]</code>.

The homework assignment involves adding up a <b>list of snailfish numbers</b> (your puzzle input).
The snailfish numbers are each listed on a separate line. Add the first snailfish number and the
second, then add that result and the third, then add that result and the fourth, and so on until all
numbers in the list have been used once.

For example, the final sum of this list is <code>[[[[1,1],[2,2]],[3,3]],[4,4]]</code>:

<pre>
[1,1]
[2,2]
[3,3]
[4,4]
</pre>

The final sum of this list is <code>[[[[3,0],[5,3]],[4,4]],[5,5]]</code>:

<pre>
[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
</pre>

The final sum of this list is <code>[[[[5,0],[7,4]],[5,5]],[6,6]]</code>:

<pre>
[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]
</pre>

Here's a slightly larger example:

<pre>
[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]
</pre>

The final sum <code>[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]</code> is found after
adding up the above snailfish numbers:

<pre>
  [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
+ [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
= [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]

  [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
+ [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
= [[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]

  [[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]
+ [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
= [[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]

  [[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]
+ [7,[5,[[3,8],[1,4]]]]
= [[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]

  [[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]
+ [[2,[2,2]],[8,[8,1]]]
= [[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]

  [[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]
+ [2,9]
= [[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]

  [[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]
+ [1,[[[9,3],9],[[9,0],[0,7]]]]
= [[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]

  [[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]
+ [[[5,[7,4]],7],1]
= [[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]

  [[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]
+ [[[[4,2],2],6],[8,7]]
= [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]
</pre>

To check whether it's the right answer, the snailfish teacher only checks the <b>magnitude</b> of
the final sum. The magnitude of a pair is 3 times the magnitude of its left element plus 2 times the
magnitude of its right element. The magnitude of a regular number is just that number.

For example, the magnitude of <code>[9,1]</code> is <code>3*9 + 2*1 = <b>29</b></code>; the
magnitude of <code>[1,9]</code> is <code>3*1 + 2*9 = <b>21</b></code>. Magnitude calculations are
recursive: the magnitude of <code>[[9,1],[1,9]]</code> is <code>3*29 + 2*21 = <b>129</b></code>.

Here are a few more magnitude examples:

- <code>[[1,2],[[3,4],5]]</code> becomes <code><b>143</b></code>.
- <code>[[[[0,7],4],[[7,8],[6,0]]],[8,1]]</code> becomes <code><b>1384</b></code>.
- <code>[[[[1,1],[2,2]],[3,3]],[4,4]]</code> becomes <code><b>445</b></code>.
- <code>[[[[3,0],[5,3]],[4,4]],[5,5]]</code> becomes <code><b>791</b></code>.
- <code>[[[[5,0],[7,4]],[5,5]],[6,6]]</code> becomes <code><b>1137</b></code>.
- <code>[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]</code> becomes
  <code><b>3488</b></code>.

So, given this example homework assignment:

<pre>
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
</pre>

The final sum is:

<pre>
[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]</pre>

The magnitude of this final sum is <code><b>4140</b></code>.

Add up all of the snailfish numbers from the homework assignment in the order they appear. <b>What
is the magnitude of the final sum?</b>

### --- Part Two ---

You notice a second question on the back of the homework assignment:

What is the largest magnitude you can get from adding only two of the snailfish numbers?

Note that snailfish addition is not
[commutative](https://en.wikipedia.org/wiki/Commutative_property) - that is, <code>x + y</code> and
<code>y + x</code> can produce different results.

Again considering the last example homework assignment above:

<pre>
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
</pre>

The largest magnitude of the sum of any two snailfish numbers in this list is
<code><b>3993</b></code>. This is the magnitude of
<code>[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]</code> +
<code>[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]</code>, which reduces to
<code>[[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]]</code>.

<b>What is the largest magnitude of any sum of two different snailfish numbers from the homework
assignment?</b>