### --- Day 20: Grove Positioning System ---

It's finally time to meet back up with the Elves. When you try to contact them, however, you get no
reply. Perhaps you're out of range?

You know they're headed to the grove where the <b>star</b> fruit grows, so if you can figure out
where that is, you should be able to meet back up with them.

Fortunately, your handheld device has a file (your puzzle input) that contains the grove's
coordinates! Unfortunately, the file is <b>encrypted</b> - just in case the device were to fall into
the wrong hands.

Maybe you can decrypt it?

When you were still back at the camp, you overheard some Elves talking about coordinate file
encryption. The main operation involved in decrypting the file is called <b>mixing</b>.

The encrypted file is a list of numbers. To <b>mix</b> the file, move each number forward or
backward in the file a number of positions equal to the value of the number being moved. The list is
<b>circular</b>, so moving a number off one end of the list wraps back around to the other end as if
the ends were connected.

For example, to move the <code>1</code> in a sequence like <code>4, 5, 6, <b>1</b>, 7, 8, 9</code>,
the <code>1</code> moves one position forward: <code>4, 5, 6, 7, <b>1</b>, 8, 9</code>. To move the
<code>-2</code> in a sequence like <code>4, <b>-2</b>, 5, 6, 7, 8, 9</code>, the <code>-2</code>
moves two positions backward, wrapping around: <code>4, 5, 6, 7, 8, <b>-2</b>, 9</code>.

The numbers should be moved <b>in the order they originally appear</b> in the encrypted file.
Numbers moving around during the mixing process do not change the order in which the numbers are
moved.

Consider this encrypted file:

<pre>
1
2
-3
3
-2
0
4
</pre>

Mixing this file proceeds as follows:

<pre>
Initial arrangement:
1, 2, -3, 3, -2, 0, 4

1 moves between 2 and -3:
2, 1, -3, 3, -2, 0, 4

2 moves between -3 and 3:
1, -3, 2, 3, -2, 0, 4

-3 moves between -2 and 0:
1, 2, 3, -2, -3, 0, 4

3 moves between 0 and 4:
1, 2, -2, -3, 0, 3, 4

-2 moves between 4 and 1:
1, 2, -3, 0, 3, 4, -2

0 does not move:
1, 2, -3, 0, 3, 4, -2

4 moves between -3 and 0:
1, 2, -3, 4, 0, 3, -2
</pre>

Then, the grove coordinates can be found by looking at the 1000th, 2000th, and 3000th numbers after
the value <code>0</code>, wrapping around the list as necessary. In the above example, the 1000th
number after <code>0</code> is <code><b>4</b></code>, the 2000th is <code><b>-3</b></code>, and the
3000th is <code><b>2</b></code>; adding these together produces <code><b>3</b></code>.

Mix your encrypted file exactly once. <b>What is the sum of the three numbers that form the grove
coordinates?</b>

### --- Part Two ---

The grove coordinate values seem nonsensical. While you ponder the mysteries of Elf encryption, you
suddenly remember the rest of the decryption routine you overheard back at camp.

First, you need to apply the <b>decryption key</b>, <code>811589153</code>. Multiply each number by
the decryption key before you begin; this will produce the actual list of numbers to mix.

Second, you need to mix the list of numbers <b>ten times</b>. The order in which the numbers are
mixed does not change during mixing; the numbers are still moved in the order they appeared in the
original, pre-mixed list. (So, if -3 appears fourth in the original list of numbers to mix, -3 will
be the fourth number to move during each round of mixing.)

Using the same example as above:

<pre>
Initial arrangement:
811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612

After 1 round of mixing:
0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306, 811589153

After 2 rounds of mixing:
0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153

After 3 rounds of mixing:
0, 811589153, 2434767459, 3246356612, 1623178306, -1623178306, -2434767459

After 4 rounds of mixing:
0, 1623178306, -2434767459, 811589153, 2434767459, 3246356612, -1623178306

After 5 rounds of mixing:
0, 811589153, -1623178306, 1623178306, -2434767459, 3246356612, 2434767459

After 6 rounds of mixing:
0, 811589153, -1623178306, 3246356612, -2434767459, 1623178306, 2434767459

After 7 rounds of mixing:
0, -2434767459, 2434767459, 1623178306, -1623178306, 811589153, 3246356612

After 8 rounds of mixing:
0, 1623178306, 3246356612, 811589153, -2434767459, 2434767459, -1623178306

After 9 rounds of mixing:
0, 811589153, 1623178306, -2434767459, 3246356612, 2434767459, -1623178306

After 10 rounds of mixing:
0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153
</pre>

The grove coordinates can still be found in the same way. Here, the 1000th number after
<code>0</code> is <code><b>811589153</b></code>, the 2000th is <code><b>2434767459</b></code>, and
the 3000th is <code><b>-1623178306</b></code>; adding these together produces
<code><b>1623178306</b></code>.

Apply the decryption key and mix your encrypted file ten times. <b>What is the sum of the three
numbers that form the grove coordinates?</b>