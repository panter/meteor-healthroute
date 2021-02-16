# health route

`meteor add panter:healthroute`

simple package that adds a route `__health` for health checks

## Custom health routes

You can define custom health checks like this:

```js
import { customHealthChecks } from "meteor/panter:healthroute";

customHealthChecks({
  myCustomCheck: async () => {
    const success = await someAsyncTaskThatReturnsBoolean();
    return success;
  },
  someOtherCheck,
});
```

each of this checks should return true if everything is alright or return something else (or throw an error) otherwise.

The route will send a 503 if any health check fails.
