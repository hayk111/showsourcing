# Filters:

The architecture of the filters is kinda wonky but kinda cool as well.
It has been done this way to be malleable and to fit a lot of use cases.

The first implementation relied on one class `FilterRepresentation`. The drawback
of that is that lots of filters don't act the same way. For instance the price filter has
a min and a max and filter items another way than other filters. The sort filter also
has a order, which could be ascendant or descendant, etc.

Thus the architecture is has such:

Each filter has its own class exenting `BaseFilter`. This give us the possibility of giving
each filter class their own methods.

When we need to distinguish between filters we do so by checking if it's an `instanceof`.