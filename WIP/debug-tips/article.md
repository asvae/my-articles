# Vue.js debug tips and tricks

// \/ TODO Old Copypasta
**#modal #popup #javascript #vuejs 2017-05-08**
// /\

By reading this article you will learn the current state of vue development tools and learn several advanced tricks. I will lightly touch a wide range of topics, providing links to in-depth docs.

## Console and debugger

Sounds familiar, huh? Don't be surprised. A wast majority of debug problem is resolvable by these common means. Be sure to check docs on them:

* [Console][console docs]
* [Debugger][debugger docs]

They're powerful, native and are getting better with each Chrome upgrade.

## Advanced tricks

### Access component without chrome vue dev tools

Let's assume you have a simple component, and your intention is to test whether DOM responds to `text` changes or not.

Here's your component:

```html
<template>
  <div class="my-test-component">
    {{ text }}
  </div>
<template>

<script>
  export default {
    data () {
      return {
        text: 'Text'
      }
    }
  }
</script>
```

  Sometimes this approach won't work and instead of the component you want you get another one. This happens when you use another component as a root for your current component. As a result, for single DOM node there are 2 components.

  You can still reach your component via `$parent` though:

```javascript
$0.__vue__.$parent.text = 'New text'
```

`__vue__` property references the deepest child, so, depending on number of components, you might have to chain `$parent` a couple of times.
  
```html
<template>
  <other-component>
    {{ text }}
  </other-component>
</template>
```

In chrome, open console on `Elements` tab. Find your component and click on it (using the same string for component name and class name makes it easier to locate them in dom).

![][chrome console dom node selected]

After that you gain access to current dom node from console:

```javascript
$0
```

So, we got a DOM node. What's next?

Internally, vue interconnects component instance (which is regular object) to DOM node.

* `component.$el` - gives you DOM node ([docs][vue api el]).
* `node.__vue__` - gives you component instance.

So, in order to modify `text` in component:

```javascript
$0.__vue__.text = 'New Text'
```

Sometimes this approach won't work and instead of target component you get *another* one. This happens when you use *another* component as a root for your *target* component. Vue resolves the problem by binding single DOM node to 2 components.

```html
<template>
  <other-component>
    {{ text }}
  </other-component>
</template>
```

You can still reach your *target* component though:
```javascript
$0.__vue__.$parent.text = 'New text'
```

`__vue__` property references the deep most child, so, depending on number of components, you might have to chain `$parent` a couple of times.

I won't recommend using `node.__vue__` for app code. Though it's efficient for debug purposes and sometimes for functional tests.

### Make an object globally accessible

Let's assume we have component like this, and we want to tweak `user`

-----------------

Have your own brilliant solutions? - [Tell me](/README.md). : 3
 
[chrome console dom node selected]: https://i.imgur.com/gwPabus.png
[vue api el]: https://vuejs.org/v2/api/#vm-el
[console docs]: https://developer.mozilla.org/en-US/docs/Web/API/Console
[debugger docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger

