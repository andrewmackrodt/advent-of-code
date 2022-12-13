### --- Day 13: Distress Signal ---

You climb the hill and again try contacting the Elves. However, you instead receive a signal you
weren't expecting: a <b>distress signal</b>.

Your handheld device must still not be working properly; the packets from the distress signal got
decoded <b>out of order</b>. You'll need to re-order the list of received packets (your puzzle
input) to decode the message.

Your list consists of pairs of packets; pairs are separated by a blank line. You need to identify
<b>how many pairs of packets are in the right order</b>.

For example:

<pre>
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
</pre>

Packet data consists of lists and integers. Each list starts with <code>[</code>, ends with
<code>]</code>, and contains zero or more comma-separated values (either integers or other lists).
Each packet is always a list and appears on its own line.

When comparing two values, the first value is called <b>left</b> and the second value is called
<b>right</b>. Then:

- If <b>both values are integers</b>, the <b>lower integer</b> should come first. If the left
  integer is lower than the right integer, the inputs are in the right order. If the left integer is
  higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are
  the same integer; continue checking the next part of the input.
- If <b>both values are lists</b>, compare the first value of each list, then the second value, and
  so on. If the left list runs out of items first, the inputs are in the right order. If the right
  list runs out of items first, the inputs are not in the right order. If the lists are the same
  length and no comparison makes a decision about the order, continue checking the next part of the
  input.
- If <b>exactly one value is an integer</b>, convert the integer to a list which contains that
  integer as its only value, then retry the comparison. For example, if comparing
  <code>[0,0,0]</code> and <code>2</code>, convert the right value to <code>[2]</code> (a list
  containing <code>2</code>); the result is then found by instead comparing <code>[0,0,0]</code> and
  <code>[2]</code>.

Using these rules, you can determine which of the pairs in the example are in the right order:

<pre>
== Pair 1 ==
- Compare [1,1,3,1,1] vs [1,1,5,1,1]
  - Compare 1 vs 1
  - Compare 1 vs 1
  - Compare 3 vs 5
    - Left side is smaller, so inputs are <b>in the right order</b>

== Pair 2 ==
- Compare [[1],[2,3,4]] vs [[1],4]
  - Compare [1] vs [1]
    - Compare 1 vs 1
  - Compare [2,3,4] vs 4
    - Mixed types; convert right to [4] and retry comparison
    - Compare [2,3,4] vs [4]
      - Compare 2 vs 4
        - Left side is smaller, so inputs are <b>in the right order</b>

== Pair 3 ==
- Compare [9] vs [[8,7,6]]
  - Compare 9 vs [8,7,6]
    - Mixed types; convert left to [9] and retry comparison
    - Compare [9] vs [8,7,6]
      - Compare 9 vs 8
        - Right side is smaller, so inputs are <b>not</b> in the right order

== Pair 4 ==
- Compare [[4,4],4,4] vs [[4,4],4,4,4]
  - Compare [4,4] vs [4,4]
    - Compare 4 vs 4
    - Compare 4 vs 4
  - Compare 4 vs 4
  - Compare 4 vs 4
  - Left side ran out of items, so inputs are <b>in the right order</b>

== Pair 5 ==
- Compare [7,7,7,7] vs [7,7,7]
  - Compare 7 vs 7
  - Compare 7 vs 7
  - Compare 7 vs 7
  - Right side ran out of items, so inputs are <b>not</b> in the right order

== Pair 6 ==
- Compare [] vs [3]
  - Left side ran out of items, so inputs are <b>in the right order</b>

== Pair 7 ==
- Compare [[[]]] vs [[]]
  - Compare [[]] vs []
    - Right side ran out of items, so inputs are <b>not</b> in the right order

== Pair 8 ==
- Compare [1,[2,[3,[4,[5,6,7]]]],8,9] vs [1,[2,[3,[4,[5,6,0]]]],8,9]
  - Compare 1 vs 1
  - Compare [2,[3,[4,[5,6,7]]]] vs [2,[3,[4,[5,6,0]]]]
    - Compare 2 vs 2
    - Compare [3,[4,[5,6,7]]] vs [3,[4,[5,6,0]]]
      - Compare 3 vs 3
      - Compare [4,[5,6,7]] vs [4,[5,6,0]]
        - Compare 4 vs 4
        - Compare [5,6,7] vs [5,6,0]
          - Compare 5 vs 5
          - Compare 6 vs 6
          - Compare 7 vs 0
            - Right side is smaller, so inputs are <b>not</b> in the right order
</pre>

What are the indices of the pairs that are already <b>in the right order</b>? (The first pair has
index 1, the second pair has index 2, and so on.) In the above example, the pairs in the right order
are 1, 2, 4, and 6; the sum of these indices is <b><code>13</code></b>.

Determine which pairs of packets are already in the right order. <b>What is the sum of the indices
of those pairs?</b>

### --- Part Two ---

Now, you just need to put <b>all</b> of the packets in the right order. Disregard the blank lines in
your list of received packets.

The distress signal protocol also requires that you include two additional <b>divider packets</b>:

<pre>
[[2]]
[[6]]
</pre>

Using the same rules as before, organize all packets - the ones in your list of received packets as
well as the two divider packets - into the correct order.

For the example above, the result of putting the packets in the correct order is:

<pre>
[]
[[]]
[[[]]]
[1,1,3,1,1]
[1,1,5,1,1]
[[1],[2,3,4]]
[1,[2,[3,[4,[5,6,0]]]],8,9]
[1,[2,[3,[4,[5,6,7]]]],8,9]
[[1],4]
<b>[[2]]</b>
[3]
[[4,4],4,4]
[[4,4],4,4,4]
<b>[[6]]</b>
[7,7,7]
[7,7,7,7]
[[8,7,6]]
[9]
</pre>

Afterward, locate the divider packets. To find the <b>decoder key</b> for this distress signal, you
need to determine the indices of the two divider packets and multiply them together. (The first
packet is at index 1, the second packet is at index 2, and so on.) In this example, the divider
packets are <b>10th</b> and <b>14th</b>, and so the decoder key is <b><code>140</code></b>.

Organize all of the packets into the correct order. <b>What is the decoder key for the distress
signal?</b>