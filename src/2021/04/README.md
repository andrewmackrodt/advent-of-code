### --- Day 4: Giant Squid ---

You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you
can't see any sunlight. What you <b>can</b> see, however, is a giant squid that has attached itself
to the outside of your submarine.

Maybe it wants to play [bingo](https://en.wikipedia.org/wiki/Bingo_(American_version))?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at
random, and the chosen number is <b>marked</b> on all boards on which it appears. (Numbers may not
appear on all boards.) If all numbers in any row or any column of a board are marked, that board
<b>wins</b>. (Diagonals don't count.)

The submarine has a <b>bingo subsystem</b> to help passengers (currently, you and the giant squid)
pass the time. It automatically generates a random order in which to draw numbers and a random set
of boards (your puzzle input). For example:

<pre>
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
</pre>

After the first five numbers are drawn (<code>7</code>, <code>4</code>, <code>9</code>,
<code>5</code>, and <code>11</code>), there are no winners, but the boards are marked as follows
(shown here adjacent to each other to save space):

<pre>
22 13 17 <b>11</b>  0         3 15  0  2 22        14 21 17 24  <b>4</b>
 8  2 23  <b>4</b> 24         <b>9</b> 18 13 17  <b>5</b>        10 16 15  <b>9</b> 19
21  <b>9</b> 14 16  <b>7</b>        19  8  <b>7</b> 25 23        18  8 23 26 20
 6 10  3 18  <b>5</b>        20 <b>11</b> 10 24  <b>4</b>        22 <b>11</b> 13  6  <b>5</b>
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  <b>7</b>
</pre>

After the next six numbers are drawn (<code>17</code>, <code>23</code>, <code>2</code>,
<code>0</code>, <code>14</code>, and <code>21</code>), there are still no winners:

<pre>
22 13 <b>17</b> <b>11</b>  <b>0</b>         3 15  <b>0</b>  <b>2</b> 22        <b>14</b> <b>21</b>
<b>17</b> 24  <b>4</b>
 8  <b>2</b> <b>23</b>  <b>4</b> 24         <b>9</b> 18 13 <b>17</b>  <b>5</b>        10 16 15 
<b>9</b> 19
<b>21</b>  <b>9</b> <b>14</b> 16  <b>7</b>        19  8  <b>7</b> 25 <b>23</b>        18  8
<b>23</b> 26 20
 6 10  3 18  <b>5</b>        20 <b>11</b> 10 24  <b>4</b>        22 <b>11</b> 13  6  <b>5</b>
 1 12 20 15 19        <b>14</b> <b>21</b> 16 12  6         <b>2</b>  <b>0</b> 12  3  <b>7</b>
</pre>

Finally, <code>24</code> is drawn:

<pre>
22 13 <b>17</b> <b>11</b>  <b>0</b>         3 15  <b>0</b>  <b>2</b> 22        <b>14</b> <b>21</b>
<b>17</b> <b>24</b>  <b>4</b>
 8  <b>2</b> <b>23</b>  <b>4</b> <b>24</b>         <b>9</b> 18 13 <b>17</b>  <b>5</b>        10 16
15  <b>9</b> 19
<b>21</b>  <b>9</b> <b>14</b> 16  <b>7</b>        19  8  <b>7</b> 25 <b>23</b>        18  8
<b>23</b> 26 20
 6 10  3 18  <b>5</b>        20 <b>11</b> 10 <b>24</b>  <b>4</b>        22 <b>11</b> 13  6  <b>5</b>
 1 12 20 15 19        <b>14</b> <b>21</b> 16 12  6         <b>2</b>  <b>0</b> 12  3  <b>7</b>
</pre>

At this point, the third board <b>wins</b> because it has at least one complete row or column of
marked numbers (in this case, the entire top row is marked: <code><b>14 21 17 24  4</b></code>).

The <b>score</b> of the winning board can now be calculated. Start by finding the <b>sum of all
unmarked numbers</b> on that board; in this case, the sum is <code>188</code>. Then, multiply that
sum by <b>the number that was just called</b> when the board won, <code>24</code>, to get the final
score, <code>188 * 24 = <b>4512</b></code>.

To guarantee victory against the giant squid, figure out which board will win first. <b>What will
your final score be if you choose that board?</b>