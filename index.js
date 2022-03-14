const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  let response = [];
  try{
    let data = req.body.data;
    let repeat = +req.body.repeat || 10;
    for(var i = 0; i < +repeat; i++) response.push(changeData(data));
  } catch {
    response = {error: "Invalid data"};
  }
  return res.send(response)
})
function changeData(data){
  let res = {};
  Object.keys(data).forEach(key => {
    if(typeof data[key] === "object" && JSON.stringify(data[key])[0] === "{"){
      res[key] = changeData(data[key]);
    } else {
      if(typeof data[key] == "string"){
        if(data[key].startsWith("date")){
          res[key] = generateDate(data[key]);
        } else if(+data[key]) {
          res[key] = generateNum(+data[key]);
        } else {
          res[key] = generateStr(data[key]);
        }
      } else if(typeof data[key] == 'number') {
        res[key] = generateNum(data[key]);
      } else if(typeof data[key] == 'boolean') {
        res[key] = generateBool();
      } else if(typeof data[key] == 'object') {
        if(data[key].length >= 2 && data[key][0] === "$random"){
          res[key] = pickRandom(data[key].slice(1));
        } else {
          res[key] = generateArr(data[key]);
        }
      }
    }
  });
  return res;
}

const chars = 'abcdefghijklmnopqrstuvwxyz';

const generateStr = (len) => {
  len = len || 10;
  let res = "";
  let exact = typeof len == 'string';

  if(!exact){
    for(let i = 0; i < len; i++) res += chars[Math.floor(Math.random() * chars.length)];
  } else {
    res = exactBody(len);
  }
  return res;
}
const exactBody = string => {
  let res = '';
  for(var i = 0; i < string.length; i++){
    if(string[i] === ' '){
      res += ' ';
    } else if(+string[i]){
      res += Math.floor(Math.random() * 10);
    } else if(chars.includes(string[i].toLowerCase())){
      let randomChar = chars[Math.floor(Math.random() * chars.length)];
      res += string[i].toUpperCase() !== string[i] ? randomChar : randomChar.toUpperCase();
    } else {
      res += string[i];
    }
  }
  return res;
}

const generateNum = num => Math.floor(Math.random() * (num || 100));

const generateDate = dateStr => eval(`new Date(Math.floor(Math.random() * 2550000000000)).${dateStr.slice(5) || "toISOString()"}`);

const generateBool = () => Boolean(Math.floor(Math.random()*2))

const generateArr = data => {
  let res = [];
  let len = typeof data[0] === 'number' ? +data[0] : +data[1] || 10;
  if(typeof data[0] === 'object'){
    if(JSON.stringify(data[0])[0] === "["){
      for(var i = 0; i < len; i++){
        res.push([generateArr(data[0])]);
      }
    } else {
      for(var i = 0; i < len; i++) res.push(changeData(data[0]));
    }
  } else {
    for(var i = 0; i < len; i++){
      if(typeof data[0] === 'string'){
        res.push(exactBody(data[0]));
      } else res.push(generateStr(5));
    }
  }
  return res;
}

const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

app.listen(process.env.PORT || 3000, () => console.log('Server started'));
