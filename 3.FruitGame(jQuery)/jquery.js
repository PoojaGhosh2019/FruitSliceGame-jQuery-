var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval function
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
$(function(){
   //click on start reset button
 $("#startreset").click(function(){
      //are we playing?
     if(playing == true){
        //reload page
         location.reload();
        }else{
            //we are not playing
            playing = true; //game initiated
            //set score to 0
            score =0;
            $("#scorevalue").html(score);
            
            //show trials left
            $("#trialsleft").show();
            trialsLeft = 3;
            addHearts();
            
            //hide game over box
            $("#gameover").hide();
            
            //change button text to reset game
            $("#startreset").html("Reset Game");
            
            startAction();
        }
   }); 
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //updating the score
       // document.getElementById("slicesound").play();
        $("#slicesound")[0].play();//play sound
        
        //stop fruit
        clearInterval(action);
        
        //hide fruit with animation
        $("#fruit1").hide("explode",500); //slicing the fruit
        
        
        //send new fruit
        setTimeout(startAction, 500);
    })

//slice a fruit
    //play sound
    //explode fruit

//functions
function addHearts(){
    $("#trialsleft").empty();
        for(i = 0; i < trialsLeft ; i++){
                $("#trialsleft").append('<img src="images/heart.png" class="life"> ');
            }
}

//start sending fruits
function startAction(){
    //generate a fruit
   $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50})//random position
    
    //generate a random step
    step = 1 + Math.round(5*Math.random())//changing the step
    
    //move fruit down by 1 step every 10ms
    action = setInterval(function(){
      $("#fruit1").css('top', $("#fruit1").position().top + step) ; 
        
        //check if the fruit is too low
       if($("#fruit1").position().top > $("#fruitscontainer").height()){
          //check any trials left
           if(trialsLeft > 1){
               //generate a fruit
           $("#fruit1").show();
            chooseFruit(); //choose a random fruit
            $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50})//random position

            //generate a random step
            step = 1 + Math.round(5*Math.random())
               
               //reduce trials by one
               trialsLeft --;
               
               //populate trialsLeft box
               addHearts();
               
              }else{
                  //game over
                  playing = false; //we are not playing anymore
                  $("#startreset").html("Start Game"); // change button to Start Game
                  $("#gameover").show();
                  $("#gameover").html('<p>Game Over!</p><p>Your Score is '+score +'</p>');
                $("#trialsleft").hide(); stopAction();
              }
          } 
        
    },10)
}

//generate random fruit
function chooseFruit(){
    $("#fruit1").attr('src','images/'+ fruits[Math.round(8*Math.random())]+'.png');
}

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});