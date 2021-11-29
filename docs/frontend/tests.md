# Types of Front End Testing

## Unit tests
A unit refers to the smallest part of a software that is testable. Unit testing is the lowest-level testing among the different testing types.
Unit testing ensures that individual code sets work according to expectations.
- Jest
- Mocha
- React Testing Library (DOM unit testing)
- Chai
- Jasmine

## Acceptance tests
In acceptance testing evaluates the compliance of a system with business requirements. They ensure the proper functioning of user flows, user inputs, and designated actions.
- Nightwatch
- Cucumber.js

## Visual regression tests
It involves capturing UI screenshots and comparing them with previous screenshots, to check for regressions related to UI.
- Cypress
- Selenium

## Accessibility tests
Ensure that everyone can access an application, including users with hearing and visual disabilities, checking whether your app is compatible with devices like a screen reader.
- Lighthouse

## Performance tests
Performance testing determines the stability, responsiveness, and speed of a product and it examines how a device fares under certain conditions. 
- Lighthouse

## End-to-End tests
Ensure that the app behaves according to expectations throughout its running and it maintains data integrity between systems and between its components from the beginning to the end of a particular user flow. 
They are done when the product is almost ready for release.
- Cypress
- Selenium

## Integration tests
Combine different units and tests them as a group and verify that they interact smoothly after integration. (Eg: integration between external library and internal modules).
They are done at the very early stages of development.
- Jest
- Mocha
- React Testing Library (DOM unit testing)
- Chai
- Jasmine

## Cross-Browser compatibility tests
It focuses on enabling users to have the same experience on different browsers.
- LambdaTest
