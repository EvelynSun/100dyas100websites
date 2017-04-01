//run some Jquery code

$(document).ready(function() {
    
    // when the 'btnSearch' button clicked
    
    $('#btnSearch').on('click',function(){
        
        //btnSearch button disapperaed,img fadeout
        $('#btnSearch').html('');
        $('#cartnImg').fadeOut(500);
        
        
        
        // add inputSearch input
        
        $('#inputSearch').append('<input type="text" id="search_box" placeholder="Enter Here">'+'<img src="https://s-media-cache-ak0.pinimg.com/736x/56/b4/9f/56b49f8fe357deecf54ad7805209d79e.jpg">');
        
        
        // input of "serach_box" focusin , the placeholder is none
      
         $('#search_box').focusin(function(event) {
                $(this).attr('placeholder','');
            })
        
         
         //fousout ,the placeholder is 'Enter Here'            
                        .focusout(function (event) {
                 $(this).attr('placeholder', 'Enter Here');
            })
         
         //keyup function
                        .keyup(function(event){

                             $('input').css('background-color','pink');
             
                              setTimeout(wikiSearch,1000);
             
             
                  
            })
         
       var wikiSearch = function() {
            
                             var searchTerm = $('#search_box').val();
                             
                                    
                             if(!searchTerm) {
                                 return;
                             } else {

                               // console.log("searchTerm"+searchTerm);

                                 var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchTerm+"&callback=?";
                                 
                                 $.ajax({
                                     type:"GET",
                                     url: url,
                
                                     dataType:"json",
                                     success:function(data){
                                         
                                         $('#results').html('');
                                         
                                       //  console.log('data:'+data[1][0]);
                                      //   console.log(data[2][0]);
                                         console.log(data[3][0])
                                      for(var i = 0;i<data[1].length;i++) {
                                          
                                          $('#results').prepend('<a href='+data[3][i]+'>'+data[1][i]+'</a><p>'+data[2][i]+'</p>')
                                      }   
                                        
                                     }
                                 }) 
                           
                             }
            
        }
                        
    })
    
    
   
    
        
                        //.focusout(function(event))
})