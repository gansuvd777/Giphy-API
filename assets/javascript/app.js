$(document).ready(function(){
    //==============================================================
    var topics = ['Florida','California','New York','Texas',
                'Michigan','Georgia','Washington','Minnesota', 'Illinois'
                  ];
    var stillImgUrl = '';
    var animateImgUrl = '';
    var gifCondition = '';
    var stillUrl = '';
    var animateUrl = '';
    //==============================================================
    var createBtn = function(){
        //removes all elements within the btn-section
        $('#btn-section').empty();
        //Create buttons from array
        for(var i = 0; i < topics.length; i++){
            //Creates new buttons
            var newBtn = $('<button>');
            //Give button an attribute
            newBtn.attr('data-name',topics[i]);
            //Add class to button
            newBtn.attr('class', 'gif btn');
            //Give button name that reflext array
            newBtn.text(topics[i]);
            $('#btn-section').append(newBtn);
        }
    }
    //Display Gif
    var displayGif = function(){
        //Gets the value of the button that is clicked
        var btnVal = $(this).data('name');
        //Api URL and key 
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+ btnVal +'&api_key=' + 'dc6zaTOxFJmzC' + "&limit=10&rating=PG";
            $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){
            console.log(response);
        //removes images when new btn is clicked
        $('.gifSection').empty();
        for(var i = 0;i < 10; i++){
            //Still & Animated Images
            stillImgUrl = response.data[i].images.fixed_height_still.url;
            animateImgUrl = response.data[i].images.fixed_height.url;
            //rating
            var rating = response.data[i].rating;
            //Assign image element to newImg variable
            var newDiv = $('<div>');
            var newP = $('<p>');
            var newImg = $('<img>');
            //Give img element stillImgUrl, animated  & src attribute
            newImg.attr('data-still',stillImgUrl);
            newImg.attr('data-animate',animateImgUrl);
            newImg.attr('src',stillImgUrl);
            newImg.attr('data-type','still');
            newImg.addClass('img-thumbnail gifImage');
            //Give p element the rating texts
            newP.html('Giphy Rating: ' + rating);
            //Adds Images to DOM
            $(newP).appendTo(newDiv)
            $(newImg).appendTo(newDiv); 
            $('.gifSection').append(newDiv);
        }
        });
    }
    var submit = function(){
        //When submit button is clicked 
        $('#submit-btn').on('click',function(event){
            //Prevent from the default form/input events from occuring //***** COME BACK TO THIS
            event.preventDefault();
            //Get input text value
            var inputVal = $('#userInput').val();
            //push user input to array
            topics.push(inputVal);
            //Create new buttons
            createBtn();
        });
   }
    var gifAnimate = function(){
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if(gifCondition === 'still'){
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src',animateUrl);
            //Switch the data-type to animate
            $(this).data('type','animate');
            
        }
        else if(gifCondition === 'animate'){	
            //Change src to still
            $(this).attr('src',stillUrl);
            //Switch the data-type to still
            $(this).data('type','still');
            
        }
    }
    
    //===========================================================
    createBtn();
    submit();
    $(document).on('click','.gif',displayGif);
    $(document).on('click','.gifImage',gifAnimate);
    
    });