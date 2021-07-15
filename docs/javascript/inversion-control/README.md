# Inversion of Control

In the context of callbacks, inversion of control is the notion of having code under your control in one part of the program, then handing control over to a callback in another part of the program.

When you pass a callback to a third party vendor function you can't be sure that your callback will be invoked. Actually you are giving the control of the flow to external library, that's what is called Inversion of Control.

To fix it you can use Promise.

To understand if a callback is really invoked, one solution could be wrap into a setTimeout.

```
const wrappedThirdPartyFunc = (cb, thirdPartyFunc) => {
    const timeout = setTimeout(
        () => { throw new Error('cb not invoked') },
        500
    );
    thirdPartyFunc(() => {
        clearTimeout(timeout);
        cb()
    });
}

const goodThirdPartyFunc = (cb) => cb()
const badThirdPartyFunc = (cb) => {}

wrappedThirdPartyFunc(() => console.log('done'), goodThirdPartyFunc) // 'done'.
wrappedThirdPartyFunc(() => console.log('done'), badThirdPartyFunc) // 'Uncaught Error: cb not invoked'

```
