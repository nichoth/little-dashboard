# notes

## UI state vs serialized state

Serialized state uses a store/model as source of truth. The view listens to the store.

UI state changes in a way that's not related to the model state. We need to re-render the UI whenever any state changes. The top level loop function needs to know when to re-render. So when a component nested 12 levels deep has a state change, we need to tell the loop to update, and we need to pass it a new full tree of state. It is a pure (static) function, so it needs a full state tree.


