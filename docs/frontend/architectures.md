# Frontend architectures

## MVC
Separate different concerns such as Presentation and Data Handling to different actors.

## MVP
Views get data and push events to presenter, who is responsible to manage events and pass models to views.

## MVVM
ViewModel expose bindable properties that are consumed by View and they are kept in sync.

## RIA (Rich Internet Application) Architecture
Category of applications where an application depends heavily on client-side code and their UX is very close to that of a desktop application.
- Phase 1: JQuery, Backbone.js, Knockout.js => add some DOM API to reduce server cycles
- Phase 2: Ember.js, Angular.js => decouple frontend from backend
- Phase 3: React, Angular >2, Vue
- Next(?): Elm, Web components, Svelte 

## Modular architecture
Split application in to separeted modules based on different domains.

## Micro frontends
Similar to micro services in backend, application is separated into different use cases and managed by different teams.

## Component architecture
More fine granular separation of application in components. Every component has own folder with everything it needs (css, html, business logic).

## Dumb-smart components
Components are separated in dumb components that are only for presentation, and smart components that are responsible for data flow, separating presentation from data injection.
Dumb components receive data from smart components and send data back using event emitters. Smart components inject service and facade to work with data flow.

## State management
Frontend apps need to manage temporary data with state management like Redux or NgRx.

## Unidirectional architecture
The data flow is unidirectional, powered with data flow streams. The Data flows only in one direction and it is towards the view. 