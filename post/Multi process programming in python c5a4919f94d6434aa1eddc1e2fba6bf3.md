# Multi process programming in python

Python is single-threaded single process program. There is a global interpreter lock that is lovingly call GIL and hated a lot which stops us from making the system much faster taking advantage of all those hardware improvements. 

in Python we have 2 libraries to use in threading :

1. Threading

```python
import threading

def even():  # creating second function
    for i in range(0, 20, 2):
        print("even :" + str(i))

def odd():
    for i in range(1, 20, 2):
        print("odd :" + str(i))

# creating a thread for each function
trd1 = threading.Thread(target=even)
trd2 = threading.Thread(target=odd)
trd1.start()  # starting the thread 1
trd2.start()  # starting the thread 2
print("End")
```

This gives the following output:

> even :0
even :2
even :4
even :6
even :8
odd :1
odd :3
odd :5
even :10
even :12
even :14
End
odd :7
even :16
odd :9
odd :11
odd :13
odd :15
odd :17
odd :19
even :18
> 

Notice that the returned text from both the functions are mixed up and the End is in the middle somewhere. From this we can infer that:

1. the threads are working independant of each other.
2. the program is no longer waiting for the output from the threads before it moves to the next line.

**Note:** you can use this to call a function which takes a long time while you can return the results earlier.

To pass data between threads, we use a producer-consumer design pattern, where the producer produces the data which the consumer will consume. As an example, i have written a program which gets 10 random numbers and sums them up.

```python
import concurrent.futures
import logging
import queue
import random
import threading
import time

startTime = time.time()

def nextNumber():
    for x in range(10):
        yield random.randint(1, 11)

n = nextNumber()

def producer(queue, n, event):
    """Pretend we're getting a number from the network."""
    while not event.is_set():
        try:
            message = next(n)
            logging.info("Producer got message: %s", message)
            queue.put(message)
        except StopIteration:
            logging.info("producer: about to set event")
            event.set()
    logging.info("Producer received event. Exiting")

def consumer(queue, sum, event):
    """Pretend we're saving a number in the database."""
    while not event.is_set() or not queue.empty():
        message = queue.get()
        sum_n = sum.get()
        sum_n = sum_n + message
        sum.put(sum_n)
        logging.info(
            "Consumer storing message: %s (size=%d)", message, queue.qsize()
        )

    # logging.info("Consumer received event. Exiting")

if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

    pipeline = queue.Queue(maxsize=10)
    sum = queue.Queue(maxsize=1)
    sum.put(0)
    n = nextNumber()
    event = threading.Event()
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        executor.submit(producer, pipeline, n, event)
        executor.submit(consumer, pipeline, sum, event)

    sum_n = sum.get()
    print("the sum is :" + str(sum_n))
    print("Program is done!")

    executionTime = time.time() - startTime
    print("Execution time in seconds: " + str(executionTime))
```

The code is self explanatory.

There are limitations to this approach though.

the GIL is the most obvious issue here. because there will be multiple threads competing for the GIL. or variables which could get locked. So use queues because they are thread safe.

i will follow up with a post on multi processing in python next week. Please let me know what you thing about the article - feedback will be taken seriously.