# process.nextTick()

In a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues.

## process.nextTick() vs setImmediate()

**process.nextTick()**: fires immediately on the same phase

**setImmediate()**: fires on the following iteration or 'tick' of the event loop

Their names are confusing. process.nextTick() fires more immediately than setImmediate(), but this is an artifact of the past which is unlikely to change. Making this switch would break a large percentage of the packages on npm.

## Why use process.nextTick()?

There are two main reasons:

- Allow users to handle errors, cleanup any then unneeded resources, or perhaps try the request again before the event loop continues.

- At times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues.
