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
        if(data[key].length > 1){
          res[key] = data[key][Math.floor(Math.random()*data[key].length)];
        } else {
          res[key] = generateArr(data[key][0]);
        }
      }
    }
  });
  return res;
}
const generateStr = (len) => {
  len = len ? len : 10;
  let res = "";
  let chars = 'abcdefghijklmnopqrstuvwxyz';
  let exact = typeof len == 'string';

  if(!exact){
    for(let i = 0; i < len; i++) res += chars[Math.floor(Math.random() * chars.length)];
  } else {
    for(var i = 0; i < len.length; i++){
      if(len[i] === ' '){
        res += ' ';
      } else {
        let randomChar = chars[Math.floor(Math.random() * chars.length)];
        res += len[i].toUpperCase() !== len[i] ? randomChar : randomChar.toUpperCase();
      }
    }
  }
  return res;
}
const generateNum = num => {
  num = num ? num : 100;
  return Math.floor(Math.random() * num);
}
const generateDate = dateStr => eval(`new Date(Math.floor(Math.random() * 2550000000000)).${dateStr.slice(5) || "toISOString()"}`);

const generateBool = () => Boolean(Math.floor(Math.random()*2))

const generateArr = data => {
  let res = [];
  let len = +data ? +data : 5;
  for(var i = 0; i < len; i++) res.push(generateStr(5));
  return res;
}
app.listen(process.env.PORT || 3000, () => console.log('Server started'));