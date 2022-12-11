### --- Day 7: No Space Left On Device ---

You can hear birds chirping and raindrops hitting leaves as the expedition proceeds. Occasionally,
you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?

The device the Elves gave you has problems with more than just its communication system. You try to
run a system update:

<pre>
$ system-update --please --pretty-please-with-sugar-on-top
Error: No space left on device
</pre>

Perhaps you can delete some files to make space for the update?

You browse around the filesystem to assess the situation and save the resulting terminal output
(your puzzle input). For example:

<pre>
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
</pre>

The filesystem consists of a tree of files (plain data) and directories (which can contain other
directories or files). The outermost directory is called <code>/</code>. You can navigate around the
filesystem, moving into or out of directories and listing the contents of the directory you're
currently in.

Within the terminal output, lines that begin with <code>$</code> are <b>commands you executed</b>,
very much like some modern computers:

- <code>cd</code> means <b>change directory</b>. This changes which directory is the current
  directory, but the specific result depends on the argument:
  
  - <code>cd x</code> moves <b>in</b> one level: it looks in the current directory for the directory
    named <code>x</code> and makes it the current directory.
  - <code>cd ..</code> moves <b>out</b> one level: it finds the directory that contains the current
    directory, then makes that directory the current directory.
  - <code>cd /</code> switches the current directory to the outermost directory, <code>/</code>.
  

- <code>ls</code> means <b>list</b>. It prints out all of the files and directories immediately
  contained by the current directory:
  
  - <code>123 abc</code> means that the current directory contains a file named <code>abc</code>
    with size <code>123</code>.
  - <code>dir xyz</code> means that the current directory contains a directory named
    <code>xyz</code>.
  

Given the commands and output in the example above, you can determine that the filesystem looks
visually like this:

<pre>
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
</pre>

Here, there are four directories: <code>/</code> (the outermost directory), <code>a</code> and
<code>d</code> (which are in <code>/</code>), and <code>e</code> (which is in <code>a</code>). These
directories also contain files of various sizes.

Since the disk is full, your first step should probably be to find directories that are good
candidates for deletion. To do this, you need to determine the <b>total size</b> of each directory.
The total size of a directory is the sum of the sizes of the files it contains, directly or
indirectly. (Directories themselves do not count as having any intrinsic size.)

The total sizes of the directories above can be found as follows:

- The total size of directory <code>e</code> is <b>584</b> because it contains a single file
  <code>i</code> of size 584 and no other directories.
- The directory <code>a</code> has total size <b>94853</b> because it contains files <code>f</code>
  (size 29116), <code>g</code> (size 2557), and <code>h.lst</code> (size 62596), plus file
  <code>i</code> indirectly (<code>a</code> contains <code>e</code> which contains <code>i</code>).
- Directory <code>d</code> has total size <b>24933642</b>.
- As the outermost directory, <code>/</code> contains every file. Its total size is <b>48381165</b>,
  the sum of the size of every file.

To begin, find all of the directories with a total size of <b>at most 100000</b>, then calculate the
sum of their total sizes. In the example above, these directories are <code>a</code> and
<code>e</code>; the sum of their total sizes is <b><code>95437</code></b> (94853 + 584). (As in this
example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000. <b>What is the sum of the total
sizes of those directories?</b>

### --- Part Two ---

Now, you're ready to choose a directory to delete.

The total disk space available to the filesystem is <b><code>70000000</code></b>. To run the update,
you need unused space of at least <b><code>30000000</code></b>. You need to find a directory you can
delete that will <b>free up enough space</b> to run the update.

In the example above, the total size of the outermost directory (and thus the total amount of used
space) is <code>48381165</code>; this means that the size of the <b>unused</b> space must currently
be <code>21618835</code>, which isn't quite the <code>30000000</code> required by the update.
Therefore, the update still requires a directory with total size of at least <code>8381165</code> to
be deleted before it can run.

To achieve this, you have the following options:

- Delete directory <code>e</code>, which would increase unused space by <code>584</code>.
- Delete directory <code>a</code>, which would increase unused space by <code>94853</code>.
- Delete directory <code>d</code>, which would increase unused space by <code>24933642</code>.
- Delete directory <code>/</code>, which would increase unused space by <code>48381165</code>.

Directories <code>e</code> and <code>a</code> are both too small; deleting them would not free up
enough space. However, directories <code>d</code> and <code>/</code> are both big enough! Between
these, choose the <b>smallest</b>: <code>d</code>, increasing unused space by
<b><code>24933642</code></b>.

Find the smallest directory that, if deleted, would free up enough space on the filesystem to run
the update. <b>What is the total size of that directory?</b>