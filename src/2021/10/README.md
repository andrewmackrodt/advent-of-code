### --- Day 10: Syntax Scoring ---

You ask the submarine to determine the best route out of the deep-sea cave, but it only replies:

<pre>
Syntax error in navigation subsystem on line: all of them</pre>

<b>All of them?!</b> The damage is worse than you thought. You bring up a copy of the navigation
subsystem (your puzzle input).

The navigation subsystem syntax is made of several lines containing <b>chunks</b>. There are one or
more chunks on each line, and chunks contain zero or more other chunks. Adjacent chunks are not
separated by any delimiter; if one chunk stops, the next chunk (if any) can immediately start. Every
chunk must <b>open</b> and <b>close</b> with one of four legal pairs of matching characters:

- If a chunk opens with <code>(</code>, it must close with <code>)</code>.
- If a chunk opens with <code>[</code>, it must close with <code>]</code>.
- If a chunk opens with <code>{</code>, it must close with <code>}</code>.
- If a chunk opens with <code>&lt;</code>, it must close with <code>&gt;</code>.

So, <code>()</code> is a legal chunk that contains no other chunks, as is <code>[]</code>. More
complex but valid chunks include <code>([])</code>, <code>{()()()}</code>,
<code>&lt;([{}])&gt;</code>, <code>[&lt;&gt;({}){}[([])&lt;&gt;]]</code>, and even
<code>(((((((((())))))))))</code>.

Some lines are <b>incomplete</b>, but others are <b>corrupted</b>. Find and discard the corrupted
lines first.

A corrupted line is one where a chunk <b>closes with the wrong character</b> - that is, where the
characters it opens and closes with do not form one of the four legal pairs listed above.

Examples of corrupted chunks include <code>(]</code>, <code>{()()()&gt;</code>,
<code>(((()))}</code>, and <code>&lt;([]){()}[{}])</code>. Such a chunk can appear anywhere within a
line, and its presence causes the whole line to be considered corrupted.

For example, consider the following navigation subsystem:

<pre>
[({(&lt;(())[]&gt;[[{[]{&lt;()&lt;&gt;&gt;
[(()[&lt;&gt;])]({[&lt;{&lt;&lt;[]&gt;&gt;(
{([(&lt;{}[&lt;&gt;[]}&gt;{[]{[(&lt;()&gt;
(((({&lt;&gt;}&lt;{&lt;{&lt;&gt;}{[]{[]{}
[[&lt;[([]))&lt;([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{&lt;[[]]&gt;}&lt;{[{[{[]{()[[[]
[&lt;(&lt;(&lt;(&lt;{}))&gt;&lt;([]([]()
&lt;{([([[(&lt;&gt;()){}]&gt;(&lt;&lt;{{
&lt;{([{{}}[&lt;[[[&lt;&gt;{}]]]&gt;[]]
</pre>

Some of the lines aren't corrupted, just incomplete; you can ignore these lines for now. The
remaining five lines are corrupted:

- <code>{([(&lt;{}[&lt;&gt;[]}&gt;{[]{[(&lt;()&gt;</code> - Expected <code>]</code>, but found
  <code>}</code> instead.
- <code>[[&lt;[([]))&lt;([[{}[[()]]]</code> - Expected <code>]</code>, but found <code>)</code>
  instead.
- <code>[{[{({}]{}}([{[{{{}}([]</code> - Expected <code>)</code>, but found <code>]</code> instead.
- <code>[&lt;(&lt;(&lt;(&lt;{}))&gt;&lt;([]([]()</code> - Expected <code>&gt;</code>, but found
  <code>)</code> instead.
- <code>&lt;{([([[(&lt;&gt;()){}]&gt;(&lt;&lt;{{</code> - Expected <code>]</code>, but found
  <code>&gt;</code> instead.

Stop at the first incorrect closing character on each corrupted line.

Did you know that syntax checkers actually have contests to see who can get the high score for
syntax errors in a file? It's true! To calculate the syntax error score for a line, take the
<b>first illegal character</b> on the line and look it up in the following table:

- <code>)</code>: <code>3</code> points.
- <code>]</code>: <code>57</code> points.
- <code>}</code>: <code>1197</code> points.
- <code>&gt;</code>: <code>25137</code> points.

In the above example, an illegal <code>)</code> was found twice (<code>2*3 = <b>6</b></code>
points), an illegal <code>]</code> was found once (<code><b>57</b></code> points), an illegal
<code>}</code> was found once (<code><b>1197</b></code> points), and an illegal <code>&gt;</code>
was found once (<code><b>25137</b></code> points). So, the total syntax error score for this file is
<code>6+57+1197+25137 = <b>26397</b></code> points!

Find the first illegal character in each corrupted line of the navigation subsystem. <b>What is the
total syntax error score for those errors?</b>