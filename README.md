# PACA-PACA.JSON

It is a simple API, you send how you would like your fake data to look like, the API sends it back to you.

### Useage

```js
let pacaPacaJson = await fetch('paca-paca.com/', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    data: {
      name: "",
      age: 120,
      nation: ["US", "IL", "RU"],
      isLoggedIn: true,
      createdAt: "date"
    }, repeat: 3 // self explanatory
  })
}).then(res => res.json());

// Will return something like:
pacaPacaJson = [
    {
        "name": "qmjfdvyltx",
        "age": 98,
        "nation": "US",
        "isLoggedIn": false,
        "createdAt": "2023-09-18T23:40:52.189Z"
    },
    {
        "name": "fyzavtdbvl",
        "age": 25,
        "nation": "RU",
        "isLoggedIn": false,
        "createdAt": "2042-11-29T18:44:38.667Z"
    },
    {
        "name": "kvovguhdxg",
        "age": 83,
        "nation": "IL",
        "isLoggedIn": true,
        "createdAt": "2049-07-18T04:25:10.041Z"
    }
]
```

Now let's see what out options are:

#### String:
```js
let data = {
  nation: "",                // Will return random STRING, 10 chars long
  nation: "3",               // Will return random STRING, 3 chars long
  nation: ['US', 'IL', 'RU'] // Will return 'US', 'IL', or 'RU'
}
```

## Date
```js
let data = {
  createdAt: "date",           // Will return random date between 1970-2050
  createdAt: "date.getTime()", // same as above, just runs the function on the DATE, works with every valid date function in javascript.
}
```

#### Number
```js
let data = {
  age: 0,   // Will return random NUMBER between 0 and 100
  age: 955, // Will return random NUMBER between 0 and 955
}
```

#### Array
```js
let data = {
  hobbies: [],   // Will return something like: ["xlncx", "flqwt", "lxfbv", "iwcak", "ytxja"]
  hobbies: [10], // The 10 sets the length of the wanted Array
}
```
#### Boolean
```js
let data = {
  isLogged: false, // Will return randomly true or false
  isLogged: true,  // Will return randomly true or false
}
```
