We quantify unstructured text data at Anzyz. 
MongoDB is a big part of our software architecture. A huge part of the magic that we provide our customers is the time we take to see the effect the manually crafted AI has on the text. on sub 100gb databases, the performance while finding substring in a text string field , while nothing to write about, was not bad. However, when customers came back to us with really huge datasets, we found that MongoDB really slowed down. It did not matter how much hardware we threw at the problem ( A very bad way of solving any problem, really! ), it was not going to speed up anytime.
Minutes to get results is not acceptable to me. So i slowly started to research options for Full Text Search (FTS). One of the first to be rejected was Elastic Search. Changes in the arcitecture and a starting RAM consumption for a little over 1GB was too much for my frugal taste. For the same reason of having starting overheads, I had to reject other solutions too. However, during my reasearch, i saw that sqlite kept coming up, was super dependable, had a well tested FTS extention, was available inbuilt in python and seemed a good option for building a small proof of concept to see how it performed. So i started to play around with it one evening and i was very happy with the results. However I wanted to test it a bit further to se where it broke ( rather, see where my process broke, sqlite is extremely well tested ) before i integrated it in the system. I found that sqliteFTS does not have a vey good way of handling any special characters ( [see this](https://stackoverflow.com/a/28996203) ). However, it was still the best fit for my work. Integrating SqliteFTS into the codebase was the work of a few hours. The speedup in search is very noticable.
We have used the results of the sqlite search in the first stage of an aggregation pipeline in mongodb - This has resulted in an unexpected, but very pleasant speedup.

We do have drawbacks:
1. Indexing the text happens during the startup and this takes some time.
2. The simple tokenisation whic hthe fTS used by default limits the characters to `[A-Za-z0-0]`is not something i am happy with. I look to changing this in the future.

All in all, I am satisfied with the results of adding sqlitefts to the system. As i pointed out it took minimal effort to get that done. There were no changes to the infrastructure. The speedup is remarkable. 

 
> Written with [StackEdit](https://stackedit.io/).
