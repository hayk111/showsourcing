### Async behavior standards

Often time when something is submitted on the website the goal is to display it instantly with a loader indicating that the item is still pending and when the response arrives remove that pending.

Say we have an array of comments and we submit a new comment. What happens is this:

  1. The action comment (we use the verb as root action) is sent
  2. An effect catch that action and sends the comment via http and also dispatch the action
    ADD_PENDING_COMMENT.
  3. When the response from the http request arrives we need to set the previously pending comment to ready
		SET_COMMENT_READY


Thus the pattern used for action name is:

	1. Verb describing action
	2. ADD_PENDING_...
	3. SET_..._READY

	