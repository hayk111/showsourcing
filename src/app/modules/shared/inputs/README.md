

## Summary

The point of this module is to furnish the different inputs needed for the show sourcing app. Some inputs here are just wrappers around HTML inputs. This is useful for working with the Form Builder API. 

Another advantage is that those wrapper furnish unique ID for inputs and their label `for` attribute. Therefor, there is no need to worry about non unique IDs.

Beside the wrappers, this module should contain other inputs that are exclusive to the show sourcing app. 

## Input should extend the AbstractInput class

Inputs in this module should extend the AbstractInput class. 
So those will be usable by the FormBuilder api. 