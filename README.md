<div align="center">
    <h1>Bembo</h1>
    <br/>
</div>

A simple module for creating dynamic class names following the [BEM Methodology][methodology]. Intended to be used with [React][react].

Inspired by [classnames][classnames]

## Installation
This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install bembo
```

or

for installation via [yarn][yarn]

```
yarn add bembo
```

## Examples

### Using bem

```js
import bem from "bembo";

// Creating a block
bem("list") // => 'list'

// Creating a block with modifiers
bem("list", {error: true, severe: "10", success: ""}); // => 'list list--error list--severe'

// Creating an element
bem("list__item") // => 'list__item'

// Creating an element with modifiers
bem("list__item", {error: true, severe: "10", success: ""}); // => 'list__item list__item--error list__item--severe'

```

### Chaining Elements

```js
import bem from "bembo";

// Creating an element
let b = bem("list")
b.e("item") // => 'list__item'

// Adding element modifiers
b = bem("list")
b.e("item", {error: true, severe: "10", success: ""}) // => 'list__item list__item--error list__item--severe'
```

### Chaining Modifiers

```js
import bem from "bembo";

// Adding modifiers by object
let b = bem("list")
b.m({error: true, severe: "10", success: ""}) // => 'list list--error list--severe'

// Adding modifiers by string
b = bem("list")
b.m("error", "severe") // => 'list list--error list--severe'

// Overriding modifiers
b = bem("list")
b.m({error: true, success: ""}, {error: null, success: "200"}) // => 'list list--success'
```

### React

```jsx
import React from "react";
import bem from "bembo";

const b = bem("card")
const btnB = bem("btn")

function Card({title, text, error = "An error occurred", disabled = true}){
    return (
        <div className={b}>
            <h2 className={b.e('header')}>{title}</h2>
            <p className={b.e("text")}>{text}</p>
            <span className={b.e("error-text", {error})}>{error}</span>
            <button className={btnB.m({disabled})}>
                Submit
            </button>
        </div>
    )
}

/*
    <div class="card">
        <h2 class="card__header">
            Card Title
        </h2>
        <p class="card__text">
            Card text content
        </p>
        <span class="card__error-text card__error-text--error">
            An error occurred
        </span>
        <button class="btn btn--disabled">
            Submit
        </button>
    </div>
*/


```

## LICENSE

[MIT](LICENSE)

[methodology]: https://en.bem.info/methodology/
[classnames]: https://github.com/JedWatson/classnames#readme
[react]: https://reactjs.org/
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[yarn]: https://classic.yarnpkg.com/en/
[license]: https://github.com/testing-library/react-testing-library/blob/master/LICENSE