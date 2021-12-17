### --- Day 16: Packet Decoder ---

As you leave the cave and reach open waters, you receive a transmission from the Elves back on the
ship.

The transmission was sent using the Buoyancy Interchange Transmission System (BITS), a method of
packing numeric expressions into a binary sequence. Your submarine's computer has saved the
transmission in [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) (your puzzle input).

The first step of decoding the message is to convert the hexadecimal representation into binary.
Each character of hexadecimal corresponds to four bits of binary data:

<pre>
0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111
</pre>

The BITS transmission contains a single <b>packet</b> at its outermost layer which itself contains
many other packets. The hexadecimal representation of this packet might encode a few extra
<code>0</code> bits at the end; these are not part of the transmission and should be ignored.

Every packet begins with a standard header: the first three bits encode the packet <b>version</b>,
and the next three bits encode the packet <b>type ID</b>. These two values are numbers; all numbers
encoded in any packet are represented as binary with the most significant bit first. For example, a
version encoded as the binary sequence <code>100</code> represents the number <code>4</code>.

Packets with type ID <code>4</code> represent a <b>literal value</b>. Literal value packets encode a
single binary number. To do this, the binary number is padded with leading zeroes until its length
is a multiple of four bits, and then it is broken into groups of four bits. Each group is prefixed
by a <code>1</code> bit except the last group, which is prefixed by a <code>0</code> bit. These
groups of five bits immediately follow the packet header. For example, the hexadecimal string
<code>D2FE28</code> becomes:

<pre>
110100101111111000101000
VVVTTTAAAAABBBBBCCCCC
</pre>

Below each bit is a label indicating its purpose:

- The three bits labeled <code>V</code> (<code>110</code>) are the packet version, <code>6</code>.
- The three bits labeled <code>T</code> (<code>100</code>) are the packet type ID, <code>4</code>,
  which means the packet is a literal value.
- The five bits labeled <code>A</code> (<code>10111</code>) start with a <code>1</code> (not the
  last group, keep reading) and contain the first four bits of the number, <code>0111</code>.
- The five bits labeled <code>B</code> (<code>11110</code>) start with a <code>1</code> (not the
  last group, keep reading) and contain four more bits of the number, <code>1110</code>.
- The five bits labeled <code>C</code> (<code>00101</code>) start with a <code>0</code> (last group,
  end of packet) and contain the last four bits of the number, <code>0101</code>.
- The three unlabeled <code>0</code> bits at the end are extra due to the hexadecimal representation
  and should be ignored.

So, this packet represents a literal value with binary representation <code>011111100101</code>,
which is <code>2021</code> in decimal.

Every other type of packet (any packet with a type ID other than <code>4</code>) represent an
<b>operator</b> that performs some calculation on one or more sub-packets contained within. Right
now, the specific operations aren't important; focus on parsing the hierarchy of sub-packets.

An operator packet contains one or more packets. To indicate which subsequent binary data represents
its sub-packets, an operator packet can use one of two modes indicated by the bit immediately after
the packet header; this is called the <b>length type ID</b>:

- If the length type ID is <code>0</code>, then the next <b>15</b> bits are a number that represents
  the <b>total length in bits</b> of the sub-packets contained by this packet.
- If the length type ID is <code>1</code>, then the next <b>11</b> bits are a number that represents
  the <b>number of sub-packets immediately contained</b> by this packet.

Finally, after the length type ID bit and the 15-bit or 11-bit field, the sub-packets appear.

For example, here is an operator packet (hexadecimal string <code>38006F45291200</code>) with length
type ID <code>0</code> that contains two sub-packets:

<pre>
00111000000000000110111101000101001010010001001000000000
VVVTTTILLLLLLLLLLLLLLLAAAAAAAAAAABBBBBBBBBBBBBBBB
</pre>

- The three bits labeled <code>V</code> (<code>001</code>) are the packet version, <code>1</code>.
- The three bits labeled <code>T</code> (<code>110</code>) are the packet type ID, <code>6</code>,
  which means the packet is an operator.
- The bit labeled <code>I</code> (<code>0</code>) is the length type ID, which indicates that the
  length is a 15-bit number representing the number of bits in the sub-packets.
- The 15 bits labeled <code>L</code> (<code>000000000011011</code>) contain the length of the
  sub-packets in bits, <code>27</code>.
- The 11 bits labeled <code>A</code> contain the first sub-packet, a literal value representing the
  number <code>10</code>.
- The 16 bits labeled <code>B</code> contain the second sub-packet, a literal value representing the
  number <code>20</code>.

After reading 11 and 16 bits of sub-packet data, the total length indicated in <code>L</code> (27)
is reached, and so parsing of this packet stops.

As another example, here is an operator packet (hexadecimal string <code>EE00D40C823060</code>) with
length type ID <code>1</code> that contains three sub-packets:

<pre>
11101110000000001101010000001100100000100011000001100000
VVVTTTILLLLLLLLLLLAAAAAAAAAAABBBBBBBBBBBCCCCCCCCCCC
</pre>

- The three bits labeled <code>V</code> (<code>111</code>) are the packet version, <code>7</code>.
- The three bits labeled <code>T</code> (<code>011</code>) are the packet type ID, <code>3</code>,
  which means the packet is an operator.
- The bit labeled <code>I</code> (<code>1</code>) is the length type ID, which indicates that the
  length is a 11-bit number representing the number of sub-packets.
- The 11 bits labeled <code>L</code> (<code>00000000011</code>) contain the number of sub-packets,
  <code>3</code>.
- The 11 bits labeled <code>A</code> contain the first sub-packet, a literal value representing the
  number <code>1</code>.
- The 11 bits labeled <code>B</code> contain the second sub-packet, a literal value representing the
  number <code>2</code>.
- The 11 bits labeled <code>C</code> contain the third sub-packet, a literal value representing the
  number <code>3</code>.

After reading 3 complete sub-packets, the number of sub-packets indicated in <code>L</code> (3) is
reached, and so parsing of this packet stops.

For now, parse the hierarchy of the packets throughout the transmission and <b>add up all of the
version numbers</b>.

Here are a few more examples of hexadecimal-encoded transmissions:

- <code>8A004A801A8002F478</code> represents an operator packet (version 4) which contains an
  operator packet (version 1) which contains an operator packet (version 5) which contains a literal
  value (version 6); this packet has a version sum of <code><b>16</b></code>.
- <code>620080001611562C8802118E34</code> represents an operator packet (version 3) which contains
  two sub-packets; each sub-packet is an operator packet that contains two literal values. This
  packet has a version sum of <code><b>12</b></code>.
- <code>C0015000016115A2E0802F182340</code> has the same structure as the previous example, but the
  outermost packet uses a different length type ID. This packet has a version sum of
  <code><b>23</b></code>.
- <code>A0016C880162017C3686B18A3D4780</code> is an operator packet that contains an operator packet
  that contains an operator packet that contains five literal values; it has a version sum of
  <code><b>31</b></code>.

Decode the structure of your hexadecimal-encoded BITS transmission; <b>what do you get if you add up
the version numbers in all packets?</b>