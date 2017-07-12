module.exports = function(app) {
app.route('/').get(function(req,res) {
  res.sendFile('index.html',{root : __dirname + '/build-prod'})
})
}
