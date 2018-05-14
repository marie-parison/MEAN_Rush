var mongoose = require('mongoose');

module.exports = {

    connect : function() {

        mongoose.connect("mongodb://localhost:27017/mean_intro");
        
        mongoose.connection.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
        mongoose.connection.once('open', function (){
            console.log("Connexion à la base OK");
        });
    }
}