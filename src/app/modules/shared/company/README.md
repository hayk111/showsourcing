## Summary

Adding company module that contains a service that takes action on a company. This way there is a centralized service where every action on a company is done. 


What this service do is dispatching events to the store and is also responsible of saving/loading a company from the localStorage.

This service shouldn't grow too big it's aimed at doing simple things.