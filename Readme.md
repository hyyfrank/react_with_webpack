 1.how to add a middleware,不同的middleware可以compose起来
 ```javascript
 const logger = ({ getState }) => {
   return next => action => {
     console.log('will dispatch', action)
      Call the next dispatch method in the middleware chain.
     const returnValue = next(action)
     console.log('state after dispatch', getState())
      This will likely be the action itself, unless
      a middleware further in chain changed it.
     return returnValue
   }
 }
 ```

 2. how to compose middleware

 ```javascript
 let middleware = [a, b]
 if (process.env.NODE_ENV !== 'production') {
   const c = require('some-debug-middleware')
   const d = require('another-debug-middleware')
   middleware = [...middleware, c, d]
 }
createStore(todos, ['Use Redux'], applyMiddleware(...middleware))
createStore(todos, ['Use Redux'], applyMiddleware(logger))
```