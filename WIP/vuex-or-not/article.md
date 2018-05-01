# Vuex or not

This article intends to highlight several cases from my developer experience when usage of vuex was not beneficial or even harmful for project.

In first part or the article I'll skim over problems. In second part I'll provide a couple of solutions which could be superior in your case.

# Problems

TL;DR:
* nested data is hard;
* no patterns;
* no classes;
* complexity.

## Deep nesting

Imagine you have a structure like this:

```
Product[] > Field[] > FieldValue[]
```

And you intend to make a change to `FieldValue`. 

First you get it from store (ids taken from props):

```javascript
this.store.products[this.product.id][this.field.id][fieldValue.id]
```

Then you edit the form and save value:

```javascript
this.editField(product.id, field.id, fieldValue.id, fieldValueData)
```

Inside the action you would have to find **product** in list, then **field** in **product**, then **fieldValue** in **field**. After that you'd have to merge changes in store. This easily takes 10-15 lines of code. And such cases could be numerous, depending on complexity of you app.

Second, less obvious problem, is that the solution has tight coupling. After we pass `product.id` via props into **FieldValueEdit** -  component becomes knowledgeable about **product**. Which makes it impossible to reuse component in different contexts nor test in isolation.

## Communication and conventions

To simplify communication between developers we have powerful tools, such as UML and rich OOP thesaurus, yet vuex doesn't benefit from any of those. This limits developers in ability to showcase high level ideas without getting immersed in actual code.

Furthermore, developing on vuex, you have 2 ways to progress:

* Stick to manual and simplest cases (conventional). Which is limited (but reasonable for app with number of components ≤ 100).
* Invent your own methods and patterns (unconventional). Which requires additional documentation and training. You'd also lack tooling and IDE support.

## No classes

You may think of vuex storage as of pure JSON store. As such it does not provide any of the rich object features javascript does. 

## Complexity

Vuex is not a cheap (easy) solution. You can write less or comparable amount of code without vuex, while getting same, if not better, results.

Which brings us to the second section.

# Alternative solutions [WIP]
