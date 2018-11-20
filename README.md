# but-wait

but-wait allows to synchronize initialization tasks across your application easily.

## Installation

Install with npm:

```bash
npm i --save but-wait
```

Install with yarn:

```bash
yarn add but-wait
```

## Example
```js
// component.js
import butWait from "but-wait";

butWait.thereIsMore(
    fetch("some/important/data")
        .then(data =>  processData(data))
)


// main.js
import butWait from "but-wait";

butWait.noMore().then(() => {
    //important data is fetched and processed
    startApplication()
})
```

## Documentation

### thereIsMore(more)
add a task that should be run before. Can not be called after **noMore()** was called.

| Argument | Type |Description |
| --- | --- | --- |
| more      | `<function:<Promise>>` <br> **or** `<Promise>` | can be either a Promise or a function that returns a Promise. <br>  |

### noMore()
can only be called once

| Argument | Type |Description |
| --- | --- | --- |
| *returns*      | `<Promise>` | resolved after all Promises in the stack are resolved |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

TODO-List
* add namespaces
* add tests

## License
[MIT](https://choosealicense.com/licenses/mit/)