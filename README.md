# pathways
Pathways aims to reduce the replication of information when creating tutorials in different fields.

## The Goal
The internet is full of amazing and *free* resources to learn all kinds of skills. The problem is, most such resources are focussed. There are no comprehensive tutorials to learn a new skill on the internet. Not free ones anyway. This is what Pathways is supposed to solve. 

**Pathways' purpose is not to create amazing resources for learning, but to arrange existing resources sequentially**. A sequence of these steps will be called a *pathway*. A pathway will allow learners to learn a skill topic-by-topic without having to google around too much. Basically, the first N-1 steps of a pathway will prepare the user for the N<sup>th</sup> step.

Take learning Django, for example. If you're a complete newbie to software development and want to learn django, you might end up doing something like this - 

1. You google "Learn Django"
2. You read an article that tells you what Django follows the MVT pattern.
3. You google what MVT is. You find out it stands for Model-View-Template
4. You now google what Model means.
5. What does a view mean by the way?
6. And what the guck is a template?
7. Oh, so a template is like a frame in which you put data.
8. Where's this data coming from again?
9. It's coming from the models. So models = database?

It can go on and on till all those articles push you around like a pin ball and things finally begin to make sense. *If only you knew what to read first. Or even what to read at all*. That's what we want Pathways to do for you - tell you what to read first, and what to leave for later.

## Limiting the replication of information
Every pathway is supposed to be comprehensive. That means that the pathway should show the user how to go from level 0 to level 100 in that skill. The less assumptions a pathway author makes about the reader, the better it is. For example, don't assume that your reader already knows Python.

### Other pathways as steps

That means if you wanna learn Django, the pathway is gonna ask you to learn Python first. However, learning python does not need to be just a link to a tutorial. No, learning Python is gonna be a pathway itself.

*A step to a pathway can be a pathway itself*.

This way, every pathway that requires a user to learn Python, can simply include the Python pathway as a step at the right location. The advantage to this is that when crearting a pathway, you don't need to worry about telling the user how to learn Python - someone else probably already did it for you. You can just focus on the actual content instead of the pre-requisites.

### Other pathway steps as steps

If you can use another pathway as a step, why not just go ahead and use *individual steps* from other pathways as steps too? You can "borrow" steps from another pathway if you think someone exlpained it better than you.

For example, let's say that the Python pathway is too comprehensive and has one step for network IO in Python and another step for automation using Python. If your pathway only needs the user to know how to do network IO in Python, you can include that step from the Python pathway in your own pathway (instead of including the whole Python pathway itself).

#### Hence, less replicaton
This is how replication of information is reduced. If someone wrote about a step once, you don't need to write it again. YOu can just "include" it in your own Pathway.
