### --- Day 8: Treetop Tree House ---

The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The
Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're
curious if this would be a good location for a [tree
house](https://en.wikipedia.org/wiki/Tree_house).

First, determine whether there is enough tree cover here to keep a tree house <b>hidden</b>. To do
this, you need to count the number of trees that are <b>visible from outside the grid</b> when
looking directly along a row or column.

The Elves have already launched a [quadcopter](https://en.wikipedia.org/wiki/Quadcopter) to generate
a map with the height of each tree (your puzzle input). For example:

<pre>
30373
25512
65332
33549
35390
</pre>

Each tree is represented as a single digit whose value is its height, where <code>0</code> is the
shortest and <code>9</code> is the tallest.

A tree is <b>visible</b> if all of the other trees between it and an edge of the grid are
<b>shorter</b> than it. Only consider trees in the same row or column; that is, only look up, down,
left, or right from any given tree.

All of the trees around the edge of the grid are <b>visible</b> - since they are already on the
edge, there are no trees to block the view. In this example, that only leaves the <b>interior nine
trees</b> to consider:

- The top-left <code>5</code> is <b>visible</b> from the left and top. (It isn't visible from the
  right or bottom since other trees of height <code>5</code> are in the way.)
- The top-middle <code>5</code> is <b>visible</b> from the top and right.
- The top-right <code>1</code> is not visible from any direction; for it to be visible, there would
  need to only be trees of height <b>0</b> between it and an edge.
- The left-middle <code>5</code> is <b>visible</b>, but only from the right.
- The center <code>3</code> is not visible from any direction; for it to be visible, there would
  need to be only trees of at most height <code>2</code> between it and an edge.
- The right-middle <code>3</code> is <b>visible</b> from the right.
- In the bottom row, the middle <code>5</code> is <b>visible</b>, but the <code>3</code> and
  <code>4</code> are not.

With 16 trees visible on the edge and another 5 visible in the interior, a total of
<code><b>21</b></code> trees are visible in this arrangement.

Consider your map; <b>how many trees are visible from outside the grid?</b>