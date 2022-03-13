# PACA-PACA.JSON

The idea is very simple, you send and example of your data structre and you get back the exact same structre but with diffrend data

### Useage

```js
let pacaPacaJson = await fetch('https://pacapaca-api.herokuapp.com', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "data": {
        "name": "Superman Cohen",
        "age": 120,
        "nation": ["$random", "US", "IL", "RU"],
        "isLoggedIn": true,
        "createdAt": "date"
    },
    "repeat": 3
  })
}).then(res => res.json());

// Will return something like:
pacaPacaJson = [
    {
        "name": "Qaeebxvt Sttmk",
        "age": 28,
        "nation": "RU",
        "isLoggedIn": false,
        "createdAt": "1988-04-13T09:18:40.178Z"
    },
    {
        "name": "Bezhwiun Ubdon",
        "age": 47,
        "nation": "IL",
        "isLoggedIn": true,
        "createdAt": "2012-01-24T16:36:31.588Z"
    },
    {
        "name": "Fkqjslxq Wuedw",
        "age": 76,
        "nation": "USA",
        "isLoggedIn": false,
        "createdAt": "2030-09-22T04:32:27.470Z"
    }
]
```

Now let's see what out options are:

#### String:
```js
let data = {
  nation: "",                // Will return random STRING, 10 chars long
  nation: "3",               // Will return random STRING, 3 chars long
  nation: ['$random', 'US', 'IL', 'RU'], // Will return 'US', 'IL', or 'RU'
  nation: "Usa California",   // Will return random chars but with the same structre (spaces, uppercase letters) for example -> "Khi Tisjdefks"
}
```

#### Date
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
  hobbies: [10], // same as above, but n=10
  hobbies: ["10"] // random two digit numbers
  hobbies: ["User#123", 3] // Will return something like: ["Jdse#893", "Kdse#329", "Isec#439"], 3 is optional, default n=10
  hobbies: [{"name": ["$random", "football", "chess", "vide games"]}, 3] // Will return [{"name": "vide games"},{"name": "chess"},{"name": "vide games"}]}
```
#### Boolean
```js
let data = {
  isLogged: false, // Will return randomly true or false
  isLogged: true,  // Will return randomly true or false
}
```
