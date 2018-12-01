$(document).ready(function(){
    
    $("#btn").on('click', function(e){     
        e.preventDefault();

        var c = $("#city").val();

        if(c === ''){
            alert('Ingrese ciudad');
            return false;
        }
        
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${c}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`,
            type:'get',
            dataType:'json',
            beforeSend:function(){
                $("#btn").html("Buscando...");
                $("#btn").attr("disabled", true);
            },
            success:function(response){

                if(response.status != 'OK'){
                    alert('error');
                    return false;
                }
                
                var loc = response.results[0].geometry.location;
                var lat = loc.lat;
                var lon = loc.lng;

                temp(lat, lon);             
                
                $("#btn").html("Ver Clima");
                $("#btn").attr("disabled", false);
            }
            
        })
        
    })


    function temp( lat, long)    {

        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=fa4293a4a4fb6ff3d32f939b87e1870a`,
            type:'get',
            dataType:'json',
            success:function(res){                
                $("#result").html(`La temperatura es de: ${res.main.temp} ° C <br> Humedad: ${res.main.humidity} %`);
            }
        })
        

    }

    
    
})