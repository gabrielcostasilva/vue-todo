# Vue Todo
This project is based on [Shaun Pelling tutorial on Vue Animations](https://www.youtube.com/watch?v=RIApQjn9fvw&list=PL4cUxeGkcC9ghm7-iTfS9n468Kp7l9Ipu).


## Changes in this Branch

This branch replaces the JSON-based data fetch API with the local IndexedDB approach. The previous code used the `fetch` command along with `json-server` to fetch data from a REST-based API. You can check the diff to see details.

The current code uses [`Localbase` library](https://github.com/dannyconnell/localbase) to manage data directly from the browser IndexedDB. The library significantly reduces the effort for managing IndexedDB. The library is Promise-based instead of callback-based as the original IndexedDB library.

Firstly, we created a variable that represents the DB. Then, the DB is initialised when the `TODO` component is mounted. This fetches existing data.

```
let db = null

onMounted(() => {
    
    db = new Localbase('todo-db')

    db.collection('todos')
    .get()
    .then((response) => (todos.value = response))
})
```

Next, we replaced the `POST` operation with `Localbase` `add()` method.

```
db.collection('todos')
    .add({
    id: Date.now().toString(),
    text: newTodo.value,
    })
    .then(() => router.go())
```

Finally, we replaced the `DELETE` operation with `Localbase` `delete()` method.

```
db.collection('todos')
    .doc({ id })
    .delete()
    .then(() => router.go())
```

## Dependencies

This branch introduces the [`Localbase`](https://github.com/dannyconnell/localbase) dependency, which is the library that eases the IndexedDB use. 