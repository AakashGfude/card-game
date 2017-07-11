module.exports = function(app) {
app.route('/').get(function(req,res) {
  console.log('coming here?')
  res.sendFile('index.html',{root : __dirname + '/build'})
})
}
