

## Auth States

Authentication has 3 states: null, false, true.
null is when we don't know yet.

## Auth players

There are 3 mains players needed for this particular implementation:

 1. AuthReducer: contains the AuthState (null, true, false);
 2. The Auth service: sets the AuthState in the reducer
 3. Auth Guard: uses that authState

When the application starts the authState is null. A JWT from a previous session could be in the local storage.
Meaning that the user could or could not be actually connected. Even if the JWT is valid, the JWT could have been
invalidated on the server. (That can happen if the user tried to connect with another browser / computer).

Thus when we don't know if the user is connected the authenticated state is NULL.

When the application starts, the authService checks if there is a JWT in the localStorage. If there isn't any, then the authState is immediately set to false.

If there is a JWT in the localStorage, then we need to check with the server if it is valid. Thus we send a request to 'api/user'. Upon response we set the state to either true or false depending on the response.
