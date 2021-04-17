$.ajaxSetup({async:false});



function returnName(){

   return 'kyle';
}


function checkTheLogin(un, pw){
   
   var result = '';  
   $.post( "/checkTheLogin", { username: un, password: pw })
      .done(function( data ) {
      
        result = data;          
      });
  
  return result;

}


function checkTime(){
      
   var result = '';  
   $.get( "/checkIfTimeLeft", function( data ) {

       result = data;
	});

  return result;
	
}


function getTheProducts(){
      
   var result = '';  
   $.get( "/getProducts", function( data ) {

       result = data;
	});

  return result;
	
}

function getTheDriverData(){
      
   var result = '';  
   
   $.post( "/getDriverData",{})
						.done(function( data ) {
       result = data;
	});

  return result;	
}