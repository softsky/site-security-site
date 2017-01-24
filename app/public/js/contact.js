jQuery(document).ready(function ($) { // wait until the document is ready
    const parser = document.createElement('a');
    $("#ajaxsuccess,#ajaxsuccess-0").hide();
    $('#send,#send-0').click(function(e){ // when the button is clicked the code executes
	
	$('.error').fadeOut('slow'); // reset the error messages (hides them)

	var error = false; // we will set this true if the form isn't valid

	var name = $('input#name,input#name-0').val(); // get the value of the input field
	if(name == "" || name == " ") {
	    $('#err-name,#err-name-0').fadeIn('slow'); // show the error message
	    error = true; // change the error state to true
	}

	var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
	var email = $('input#email,input#email-0').val(); // get the value of the input field
	if (email == "" || email == " ") { // check if the field is empty
	    $('#err-email,#err-email-0').fadeIn('slow'); // error - empty
	    error = true;
	}else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
	    $('#err-emailvld,#err-emailvld-0').fadeIn('slow'); // error - not right format
	    error = true;
	}

	if(error == true) {
	    $('#err-form,#err-form-0').slideDown('slow');
	    return false;
	}

        var form = $(e.target).parents('#ajax-form,#ajax-form-0')
        , arr = [{}].concat($(form).serializeArray())
        , data = _.reduce(arr,(result, it) => {result[it.name] = it.value;return result;});

        let [first,last] = data.name.split(/\s/);
        data.name = {
            first:first,
            last:last
        };

        const val = data.url;
        if(val.startsWith('http')){
            parser.href = val;
        } else {
            parser.href = 'http://' + val;
        }

        data.url = parser.hostname.replace(/^www\./,'');
        data = _.defaults({}, data, {
            'scan-type':'website',
            'round':0
        });
        
        $.ajax({
            method: $(form).attr('method'),
            url: $(form).attr('action'),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
	    error: function(request,error) {
		if (error == "timeout") {
		    $('#err-timedout,#err-timedout-0').slideDown('slow');
		}
		else {
		    $('#err-state,#err-state-0').slideDown('slow');
		    $("#err-state,#err-state-0").html('An error occurred: ' + error + '');
		}
	    },
	    success: function() {
		$('#ajax-form,#ajax-form-0').slideUp('slow');
		$('#ajaxsuccess,#ajaxsuccess-0').slideDown('slow');
	    }
        });
        
        e.preventDefault();
        return false;
    }); // end click function
});
