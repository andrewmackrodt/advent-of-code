### --- Day 5: Supply Stacks ---

The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies
are stored in stacks of marked <b>crates</b>, but because the needed supplies are buried under many
other crates, the crates need to be rearranged.

The ship has a <b>giant cargo crane</b> capable of moving crates between stacks. To ensure none of
the crates get crushed or fall over, the crane operator will rearrange them in a series of
carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of
each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot
to ask her <b>which</b> crate will end up where, and they want to be ready to unload them as soon as
possible so they can embark.

They do, however, have a drawing of the starting stacks of crates <b>and</b> the rearrangement
procedure (your puzzle input). For example:

<pre>
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
</pre>

In this example, there are three stacks of crates. Stack 1 contains two crates: crate <code>Z</code>
is on the bottom, and crate <code>N</code> is on top. Stack 2 contains three crates; from bottom to
top, they are crates <code>M</code>, <code>C</code>, and <code>D</code>. Finally, stack 3 contains a
single crate, <code>P</code>.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is
moved from one stack to a different stack. In the first step of the above rearrangement procedure,
one crate is moved from stack 2 to stack 1, resulting in this configuration:

<pre>
[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
</pre>

In the second step, three crates are moved from stack 1 to stack 3. Crates are moved <b>one at a
time</b>, so the first crate to be moved (<code>D</code>) ends up below the second and third crates:

<pre>
        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3
</pre>

Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved <b>one at a
time</b>, crate <code>C</code> ends up below crate <code>M</code>:

<pre>
        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3
</pre>

Finally, one crate is moved from stack 1 to stack 2:

<pre>
        [<b>Z</b>]
        [N]
        [D]
[<b>C</b>] [<b>M</b>] [P]
 1   2   3
</pre>

The Elves just need to know <b>which crate will end up on top of each stack</b>; in this example,
the top crates are <code>C</code> in stack 1, <code>M</code> in stack 2, and <code>Z</code> in stack
3, so you should combine these together and give the Elves the message <code><b>CMZ</b></code>.

<b>After the rearrangement procedure completes, what crate ends up on top of each stack?</b>