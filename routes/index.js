var express = require('express');
var fs = require('fs');
var router = express.Router();


var list = JSON.parse(fs.readFileSync('./api/json/list.json', 'utf8'));
var task = [];
list.forEach(element => {
    task.push(JSON.parse(fs.readFileSync(`./api/json/task${element.id}.json`, 'utf8')));
});

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { list: list , task : task});
});

router.post('/', function (req, res, next) {
  let taskDetail = {
    id : Math.floor(Math.random() * 100) + 1,
    listId : req.body.listId - 1,
    createdAt : new Date().toString(),
    title : req.body.title,
    desc : "desc " + req.body.desc,
    order : req.body.order
  }

  task[taskDetail.listId].push(taskDetail);
  console.log(task[taskDetail.listId]);
  // res.render('index', { list: list , task : task});
  res.redirect('/');
})

router.delete('/', function(req, res, next){

})

module.exports = router;
