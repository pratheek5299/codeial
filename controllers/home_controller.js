module.exports.home = function(request, response){
    return response.render('home',{
        title: 'Home'
    })
}
//module.exports.action_name = function(request, response){}