### --- Day 6: Tuning Trouble ---

The preparations are finally complete; you and the Elves leave camp on foot and begin to make your
way toward the <b>star</b> fruit grove.

As you move through the dense undergrowth, one of the Elves gives you a handheld <b>device</b>. He
says that it has many fancy features, but the most important one to set up right now is the
<b>communication system</b>.

However, because he's heard you have [significant](https://adventofcode.com/2016/day/6)
[experience](https://adventofcode.com/2016/day/25) [dealing](https://adventofcode.com/2019/day/7)
[with](https://adventofcode.com/2019/day/9) [signal-based](https://adventofcode.com/2019/day/16)
[systems](https://adventofcode.com/2021/day/25), he convinced the other Elves that it would be okay
to give you their one malfunctioning device - surely you'll have no problem fixing it.

As if inspired by comedic timing, the device emits a few colorful sparks.

To be able to communicate with the Elves, the device needs to <b>lock on to their signal</b>. The
signal is a series of seemingly-random characters that the device receives one at a time.

To fix the communication system, you need to add a subroutine to the device that detects a
<b>start-of-packet marker</b> in the datastream. In the protocol being used by the Elves, the start
of a packet is indicated by a sequence of <b>four characters that are all different</b>.

The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs
to identify the first position where the four most recently received characters were all different.
Specifically, it needs to report the number of characters from the beginning of the buffer to the
end of the first such four-character marker.

For example, suppose you receive the following datastream buffer:

<pre>
mjqjpqmgbljsphdztnvjfqwrcgsmlb</pre>

After the first three characters (<code>mjq</code>) have been received, there haven't been enough
characters received yet to find the marker. The first time a marker could occur is after the fourth
character is received, making the most recent four characters <code>mjqj</code>. Because
<code>j</code> is repeated, this isn't a marker.

The first time a marker appears is after the <b>seventh</b> character arrives. Once it does, the
last four characters received are <code>jpqm</code>, which are all different. In this case, your
subroutine should report the value <code><b>7</b></code>, because the first start-of-packet marker
is complete after 7 characters have been processed.

Here are a few more examples:

- <code>bvwbjplbgvbhsrlpgdmjqwftvncz</code>: first marker after character <code><b>5</b></code>
- <code>nppdvjthqldpwncqszvftbrmjlhg</code>: first marker after character <code><b>6</b></code>
- <code>nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg</code>: first marker after character
  <code><b>10</b></code>
- <code>zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw</code>: first marker after character <code><b>11</b></code>

<b>How many characters need to be processed before the first start-of-packet marker is detected?</b>