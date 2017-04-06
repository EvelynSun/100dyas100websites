//run some Jquery code

/* functions:
    1. press 'on/off' set 'on' , count start flash, can press 'start' and'strict', four bords, when the cusor cross trough, will show pointer icon
       if set off, all above button can not be pressed.
       
    2. press start button, the count start counting from 1, comptuer turn, the four board flash randomly.(this time the four boards cant be pressed, the cusor come through, no pointer icon)
    
    3, the user turn, press the four boards, if they are same as computer's turn, come to next level, otherwise when found different  board from computer 's, the count bord flash(!!), then the computer play again.
    
    4. if choose trict mode, when compared different board then start from level 1
    
*/
    

$(document).ready(function() {
    
    
    //set the default status
    
    var status_onoff = false,
        status_start = false,
        status_strict = false,
        status_boards = false,
        level = 0,
        computerData = [],
        i = 0,
        j = 0,
        timer = 1000;
    
    //1.function setStatusOnOff(), to check 'on/off'status , 
    
    function setStatusOnOff() {
        $('#btn_onoff').addClass('mousedown');
        $('#btn_onoff').on('click',function() {
            
            if(status_onoff == false) {
                status_onoff = true;
                $('#btn_onoff').html('ON');
                
                 $('#count_number').html('<p>--!!--</p>');
                 $('#count_number p').addClass('animated flash')
                setStatusStart();
                
            }else if(status_onoff == true) {
                status_onoff = false;
                $('#btn_onoff').html('OFF');
                //end game function
                
                endGame();
            } 
             
            
        })
        
        
        
      
      
      
   }
    
    
  //2.function set status of start
    
    function setStatusStart() {
        $('#btn_start').addClass('mousedown');
        
        $('#btn_start').on('click',function(){
            
            if(status_onoff == true) {
                status_start = true;
                $('#count_number').html('<p>Start</p>');
                
                
                $('#btn_start').css('background-color','red');
               // alert('start:'+status_start)
                $('#btn_start').off();
                $('#btn_start').removeClass('mousedown');
                setStatusStrict();
                
            }else {
                status_start = false;
                alert('start:'+status_start)
            }
            
       //     
            
            
        })
        
       
    }
    
    
//3.function set status of strict mode
    
    function setStatusStrict() {
        $('#btn_strict').addClass('mousedown');
        $('#btn_strict').on('click',function() {
            if(status_onoff == true && status_start == true && status_strict == false) {
                status_strict = true;
                $('#strict p').html('strict on');
                $('#btn_strict').css('background-color','green');
            }else {
                status_strict = false;

                $('#strict p').html('strict off');
                $('#btn_strict').css('background-color','yellow');
            }
            
           // alert('status_strict:'+status_strict)
            
        })
        
        // after set all status, start game
        
        setTimeout(startGame,1000);
    }
    
//4.function startGame
    
    function startGame() {
        
        if(status_start == true) {
            
           //1.computer turn, first,show current level, then random choose from the four boards, level 1, choose 1, level 2, choose 2 boards, etc 
            i = 0;
            j = 0;
            computerData = [];
            level = setLevel();
         //    alert('level'+level)
            setCountBoardInfo(level);
        //   computerTurn(level);
            
       
           //2. urser turn, compare to the computer data, when encoured false one, if strict mode ,start from 1, else re flash the computer data
        }
    }

//funcion setLevel
    
    function setLevel() {
        
        if(level < 5) {
            timer = 1000;
        }else {
            timer = 500;
        }
        if(level == 0) { //start game,set level =1
            level = 1;
            
            return level;
        }else {  //during game
            // if urser data is same as computer's level++,else if strict mode, level = 1 return,not strict mode level same as before
            level++;
            
            return level;
        }
    }
    
//4.function to set the count board info
    
    function setCountBoardInfo(level) {
        
       $('#count_number p').html('Level:'+level);
        
       //computer turn
        
       computerTurn(level);
    }
    
    
    function computerTurn(level) {
      //  alert('computerLEVEL'+level)
        
        
      
         var       randomNumber;
        
        for(var i = 0; i<level;i++){
            randomNumber = getRandomNumber();
            computerData.push(randomNumber);
        }
     //   alert('computerData'+computerData);
        
        // show the computer data
       
        showBoard();
    }
    
    function getRandomNumber() {
        return (Math.floor(Math.random()*4)+1);
    }
    
    
    function showBoard() {
        
      
           setTimeout(function(){
               
               if(i < computerData.length) {
                   
                   flashPad(computerData[i]);
                   
                  i++;
                   showBoard();
                   
                    
               }else {
                   i = 0;
                   
                   userTurn();
               }
           },2*timer);
      
        
    }
    
    
    function flashPad(number) {
        
        
        switch(number) {
                       case 1:
                          // alert('1');
                           $('#left_upper').css('background-color','lightgreen');

                           break;
                       case 2:
                          // alert('2');
                           $('#right_upper').css('background-color','orange');
                           break;
                       case 3:
                        //   alert('3');
                           $('#left_bottom').css('background-color','lightblue');
                           break;
                       case 4:
                        //   alert('4');
                           $('#right_bottom').css('background-color','red');
                           break;
                   }
        
        setTimeout(restoreColor,timer);
        
    }
    
    
    function restoreColor() {
        
         $('#left_upper').css('background-color','darkgreen');
          $('#right_upper').css('background-color','yellow');
          $('#left_bottom').css('background-color','deepskyblue');
        $('#right_bottom').css('background-color','darkmagenta');
    }
    
    
    function userTurn() {
      //  alert('userturn');
        //alert('computerData.length'+computerData.length)
            userData = [];
        
        $('.square').addClass('mousedown');
        $('.square').on('click',function(){
            
            var id = $(this).attr('id'),
                idtoNumber;
            
            
             switch(id){
                    case 'left_upper':
                        idtoNumber = 1;
                        break;
                    case 'right_upper':
                        idtoNumber = 2;
                        break;
                    case 'left_bottom':
                        idtoNumber = 3;
                        break;
                    case 'right_bottom':
                        idtoNumber = 4;
                        break;
                }
           userData.push(idtoNumber);
           flashPad(idtoNumber) ;
            
            
            if(computerData[j] !== userData[j] ) {
                        alert('wrong')
                    
                        j = 0;
                        $('.square').removeClass('mousedown');
                        $('.square').off();
                    if(status_strict == true) {
                        level = 0;
                        setTimeout(startGame,2000);
                        
                       
                    }else{
                        setTimeout(showBoard,1000);
                    }
                
            }else if(computerData.length == userData.length) {
                $('.square').removeClass('mousedown');
                 $('.square').off();
                setTimeout(startGame,2000);
            }else{
                j++;
            }
       
        })
        
        
        
        
        
        
        
        
        
        
    }
    
    
    //end game function
    
    function endGame() {
        $('#main_wraper').off();
        $('.square').removeClass('mousedown');
        $('#btn_start').removeClass('mousedown');
        
    }
    
    setStatusOnOff();
})
    

