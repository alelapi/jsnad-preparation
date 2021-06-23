# setImmediate() vs setTimeout()

**setImmediate** designed to execute a script once the current poll phase completes

**setTimeout** schedules a script to be run after a minimum threshold in ms has elapsed

If we run both commands within an I/O cycle (i.e. the main module), the immediate callback is always executed first.
Otherwise the execution order is non-deterministic, and it is bound by the performance of the process.
