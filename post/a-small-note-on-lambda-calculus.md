# A small note on &lambda; calculus and Church Encoding

- 2 September 2019

Lambda Calculus ( called **&lambda;C** from now on  ) is something that every programmer reads and wonders about at a point of her career.  

From Wikipedia
> Lambda calculus (also written as λ-calculus) is a formal system in mathematical logic for expressing computation based on function abstraction and application using variable binding and substitution. It is a universal model of computation that can be used to simulate any Turing machine.  
 
**&lambda;C** expresses the process of computation, with just 4 parts:
 1. single letter variables
 2. parantheses ()
 3. Lambda &lambda;
 4. Dot .  

It uses these 4 parts to write expressions. Let me illustrate this with an example:

> ( &lambda;y.x(yz) )(ab)  

In the above function ( which is an expression ), the `λy` is the head.`x(yz)` is the body ( which is an expression ) and `ab` which is an argument ( also an expression ).   

Lambda calculus resolves each expression using substitution, starting from the rightmost ( and innermost ) expression.

But before we dive into that, there is something else I should go into. **Church Numerals**: Church numerals are the encoded natural numbers ( encoded using chuch encoding ). We can define a church numeral as a higher-order function which takes a single argument function as an argument and returns another single argument function.

Let us see the numbers and their lambda expression equivalents:  

| number | Lambda expression |  
|----|------:|  
|0|λf.λx. x|  
|1|λf.λx. f x|  
|2|λf.λx. f (f x)|  
|3|λf.λx. f (f (f x))|  

By looking at the above we can conclude that if 1 is (partially) encoded as a function of `x`, then 3 is encoded as the same function applied thrice to the same `x`. In other words we could say 'n' is encoded as a function 'f' composed 'n' times. So if we were to write a function that would add 1 to a numeral, it would be just be applying the function one more time (or composing it one more time).    
> SUCC := λn.λf.λx.f (n f x)

Since we have defined it, let us see how we can give the `SUCC` function `0` as the argument and see if it resolves to `1`.

```
SUCC := (λn.λf.λx.f (n f x))(λf.λx. x)
      = λf.λx.f ( (λf.λx. x) f x)
      = λf.λx.f ( (   λx. x)   x)
      = λf.λx.f (              x)
      = λf.λx.f x 
      = 1
```

Similarly, we resolve for `2`

```
SUCC := (λn.λf.λx.f (n f x))(λf.λx.f x)
      = λf.λx.f ( (λf.λx.f x) f x)
      = λf.λx.f ( (   λx.f x)   x)
      = λf.λx.f ( (      f x)   x)
      = λf.λx.f (f x) 
      = 2
```

Now since we have defined an increment function (`SUCC`), we should define a function that adds 2 numbers. Going with the 'composing' idea, we can say that adding 2 mumbers `m` and `n` could be defined as applying a function `f`, `n` times to the same function `f` applied `m` times. Writing that down, we get:  
```
ADD := λm.λf.λn.λx.m f( n f (x))
```  

Multiplication two numbers `a` and `b` would be defined as applying a function `f`, `n` times and then doing this `m` times over. Defining things in λC, we get:
> MUL :⇔ λa.λb.λc.a(bc)  

Lets try and resolve this one multiplying 2 and 3
MUL 2 3 := ( λa.λb.λc.a(bc) ) ( λg.λx. g (g x) ) ( λh.λx. h (h (h x)) )  

``` 
MUL 2 3 := ( λa.λb.λc.a(bc) ) ( λg.λx. g (g x) ) ( λh.λx. h (h (h x)))
         = ( λc . ( λg.λx. g (g x) )( ( λh.λx. h (h (h x))) c ) )
         = ( λc . ( λg.λx. g (g x) )(      λx. c (c (c x)))     )
         = ( λc . (     λx. (λx. c (c (c x))) ((λx. c (c (c x))) x) )     )
         = ( λc . (     λx. (λx. c (c (c x))) ( c (c (c x))))     )
         = λc . λx. (c (c (c ( c (c (c x))))))      
```

So we see how, just by the process of resolving using substitution, we get the final expression where the form is the encoding for 6.

We still have the subtraction to defined, But that will be another post - This one took quite some time to wrap my head around!

Read More:  
[&lambda; calculus in python code](http://vanderwijk.info/blog/pure-lambda-calculus-python/): this [link](http://matt.might.net/articles/python-church-y-combinator/)
will explain all the code better.


Main References:  
[Wikipedia: Church Encoding](https://en.wikipedia.org/wiki/Church_encoding)  
[Wikipedia: Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus)  


Links I regularly went back to when I needed some gentle explanations ( when Wikipedia got too terse for me! ):  
[λC for dummies](http://bach.ai/lambda-calculus-for-absolute-dummies/): Amazingly well written note on λC.  
[Stackoverflow answer for explanation of multiplication in λC](https://math.stackexchange.com/a/595576)  


Other Interesting Reads:  
[To understand λC in poetry](https://cstheory.stackexchange.com/a/36601)      
[Class notes onλC](http://pages.cs.wisc.edu/~horwitz/CS704-NOTES/1.LAMBDA-CALCULUS.html) 


> Written with [StackEdit](https://stackedit.io/) and Notable and Vim.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkzODkxNTgzMSwtNzc2MTYwNzQ1LC04MT
gzMDYwNjMsLTIwMTM1OTM2MTMsMTYxMTQyODgxOSwzODUyMzgz
NDddfQ==
-->
