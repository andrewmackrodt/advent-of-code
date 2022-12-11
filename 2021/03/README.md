### --- Day 3: Binary Diagnostic ---

The submarine has been making some odd creaking noises, so you ask it to produce a diagnostic report
just in case.

The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded
properly, can tell you many useful things about the conditions of the submarine. The first parameter
to check is the <b>power consumption</b>.

You need to use the binary numbers in the diagnostic report to generate two new binary numbers
(called the <b>gamma rate</b> and the <b>epsilon rate</b>). The power consumption can then be found
by multiplying the gamma rate by the epsilon rate.

Each bit in the gamma rate can be determined by finding the <b>most common bit in the corresponding
position</b> of all numbers in the diagnostic report. For example, given the following diagnostic
report:

<pre>
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
</pre>

Considering only the first bit of each number, there are five <code>0</code> bits and seven
<code>1</code> bits. Since the most common bit is <code>1</code>, the first bit of the gamma rate is
<code>1</code>.

The most common second bit of the numbers in the diagnostic report is <code>0</code>, so the second
bit of the gamma rate is <code>0</code>.

The most common value of the third, fourth, and fifth bits are <code>1</code>, <code>1</code>, and
<code>0</code>, respectively, and so the final three bits of the gamma rate are <code>110</code>.

So, the gamma rate is the binary number <code>10110</code>, or <b><code>22</code></b> in decimal.

The epsilon rate is calculated in a similar way; rather than use the most common bit, the least
common bit from each position is used. So, the epsilon rate is <code>01001</code>, or
<b><code>9</code></b> in decimal. Multiplying the gamma rate (<code>22</code>) by the epsilon rate
(<code>9</code>) produces the power consumption, <b><code>198</code></b>.

Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then
multiply them together. <b>What is the power consumption of the submarine?</b> (Be sure to represent
your answer in decimal, not binary.)

### --- Part Two ---

Next, you should verify the <b>life support rating</b>, which can be determined by multiplying the
<b>oxygen generator rating</b> by the <b>CO2 scrubber rating</b>.

Both the oxygen generator rating and the CO2 scrubber rating are values that can be found in your
diagnostic report - finding them is the tricky part. Both values are located using a similar process
that involves filtering out values until only one remains. Before searching for either rating value,
start with the full list of binary numbers from your diagnostic report and <b>consider just the
first bit</b> of those numbers. Then:

- Keep only numbers selected by the <b>bit criteria</b> for the type of rating value for which you
  are searching. Discard numbers which do not match the bit criteria.
- If you only have one number left, stop; this is the rating value for which you are searching.
- Otherwise, repeat the process, considering the next bit to the right.

The <b>bit criteria</b> depends on which type of rating value you want to find:

- To find <b>oxygen generator rating</b>, determine the <b>most common</b> value (<code>0</code> or
  <code>1</code>) in the current bit position, and keep only numbers with that bit in that position.
  If <code>0</code> and <code>1</code> are equally common, keep values with a <b><code>1</code></b>
  in the position being considered.
- To find <b>CO2 scrubber rating</b>, determine the <b>least common</b> value (<code>0</code> or
  <code>1</code>) in the current bit position, and keep only numbers with that bit in that position.
  If <code>0</code> and <code>1</code> are equally common, keep values with a <b><code>0</code></b>
  in the position being considered.

For example, to determine the <b>oxygen generator rating</b> value using the same example diagnostic
report from above:

- Start with all 12 numbers and consider only the first bit of each number. There are more
  <code>1</code> bits (7) than <code>0</code> bits (5), so keep only the 7 numbers with a
  <code>1</code> in the first position: <code>11110</code>, <code>10110</code>, <code>10111</code>,
  <code>10101</code>, <code>11100</code>, <code>10000</code>, and <code>11001</code>.
- Then, consider the second bit of the 7 remaining numbers: there are more <code>0</code> bits (4)
  than <code>1</code> bits (3), so keep only the 4 numbers with a <code>0</code> in the second
  position: <code>10110</code>, <code>10111</code>, <code>10101</code>, and <code>10000</code>.
- In the third position, three of the four numbers have a <code>1</code>, so keep those three:
  <code>10110</code>, <code>10111</code>, and <code>10101</code>.
- In the fourth position, two of the three numbers have a <code>1</code>, so keep those two:
  <code>10110</code> and <code>10111</code>.
- In the fifth position, there are an equal number of <code>0</code> bits and <code>1</code> bits
  (one each). So, to find the <b>oxygen generator rating</b>, keep the number with a <code>1</code>
  in that position: <code>10111</code>.
- As there is only one number left, stop; the <b>oxygen generator rating</b> is <code>10111</code>,
  or <b><code>23</code></b> in decimal.

Then, to determine the <b>CO2 scrubber rating</b> value from the same example above:

- Start again with all 12 numbers and consider only the first bit of each number. There are fewer
  <code>0</code> bits (5) than <code>1</code> bits (7), so keep only the 5 numbers with a
  <code>0</code> in the first position: <code>00100</code>, <code>01111</code>, <code>00111</code>,
  <code>00010</code>, and <code>01010</code>.
- Then, consider the second bit of the 5 remaining numbers: there are fewer <code>1</code> bits (2)
  than <code>0</code> bits (3), so keep only the 2 numbers with a <code>1</code> in the second
  position: <code>01111</code> and <code>01010</code>.
- In the third position, there are an equal number of <code>0</code> bits and <code>1</code> bits
  (one each). So, to find the <b>CO2 scrubber rating</b>, keep the number with a <code>0</code> in
  that position: <code>01010</code>.
- As there is only one number left, stop; the <b>CO2 scrubber rating</b> is <code>01010</code>, or
  <b><code>10</code></b> in decimal.

Finally, to find the life support rating, multiply the oxygen generator rating (<code>23</code>) by
the CO2 scrubber rating (<code>10</code>) to get <b><code>230</code></b>.

Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2
scrubber rating, then multiply them together. <b>What is the life support rating of the
submarine?</b> (Be sure to represent your answer in decimal, not binary.)