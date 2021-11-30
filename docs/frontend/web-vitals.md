# Web Vitals
A unified guidance for quality signals that are essential to delivering a great user experience on the web.
`Core Web Vitals` are a subset of web vitals.

- Largest Contentful Paint (LCP): measures loading performance of main content, visible within the viewport. 
To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.

- First Contentful Paint (FCP): measures perceived load speed marking the first point in the page load timeline where the user can see anything on the screen. For this metric, "content" refers to text, images (including background images), `<svg>` elements, or non-white `<canvas>` elements.

- First Input Delay (FID): measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.
To provide a good user experience, pages should have a FID of 100 milliseconds or less.

- Time To Interact (TTI): measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly.

- Cumulative Layout Shift (CLS): measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page. 
To provide a good user experience, pages should maintain a CLS of 0.1. or less.

- Total Blocking Time (TBT): measures the total amount of time between First Contentful Paint (FCP) and Time to Interactive (TTI) where the main thread was blocked for long enough to prevent input responsiveness.

- Speed Index: measures how quickly content is visually displayed during page load.

You can measure with external tools like PageSpeed or others in Chrome User Experience Report.

You can get metrics also in Javascript using library `web-vitals`.
