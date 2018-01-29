## selection

This part of the store is where we load entities related
to a selection. 

It's a bit of an anti pattern because when we start the application
we load the projects, tags, etc. and we reload those here.
So some project for a selection will be in the store twice. That goes against
the philosophy of having the store as 'one single source of truth'. However
it makes things easier than holding relationships between entities.
