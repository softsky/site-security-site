$(window).on('hashchange', () => {
    if(window.location.hash){
        var hash = window.location.hash.match(/^#(.*)/);
        if(hash && hash.length > 1){
            var parts = hash[1].split(/\//);
            if(scanType){
                $('select#scanType').val(parts[0]);
            }
            if(round){
                $('select#round').val(parts[1]);
                $('select#round option:selected').attr('disabled', false);
            }
            if(coupon){
                $('input#coupon').val(parts[2]);
            }
        }
    }

});
$(document).ready(() => {
    console.log('initialized');
    $(window).trigger('hashchange');
    
    $('input#url').on('focus', () => {
	$('.scan-result > dl').empty();
    });
    
    $('input#url').on('blur', (e) => {
	const val = $(e.target).val();
        if(!val){
            // if domain is empty, return
            return;
        }
	const parser = document.createElement('a');

	if(val.startsWith('http')){
            parser.href = val;
            $(e.target).val(val.replace(/https?:\/\//, ''));
        } else {
            parser.href = 'http://' + val;
        }
	const domain = parser.hostname.replace(/^www\./,'');
        $(e.target).val(domain);
	$('#domain').text('@' + domain);
	const options = {
	    screenSize: {
		width: $(window).width(),
		height: $(window).height()
	    }
	};
	    
	$('#screenshot').attr('src',`/ws/${domain}?options=${JSON.stringify(options)}`);

	return ;
	$.ajax({
	    url: `/api/exec/whatweb/${domain}`,
	    dataType: 'json',
	    success: (data, textStatus) => {
		console.log(data);
		const KEYS = ["IP", "Country", "PoweredBy", "HTTPServer", "Apache"];
		_(_(data).filter({http_status:200}).map(_.property("plugins")).first())
		    //.pickBy((value, key) => KEYS.indexOf(key) > -1)
		    .each((obj, idx) => {

		    if(obj.string && obj.string.length){
			$('.scan-result > dl')
			    .append($('<dt>').text(idx))
			    .append($('<dd>').text(obj.string.join()));
		    }
		    
		});
	    }
	});
    });
    $('input#email').on('change', (e) => {
	console.log('onchange, email', $(e.target).val());
	var val = $(e.target).val();
	if(val.endsWith($("#url").val()))
	    $(e.target).val(val.replace(/\@.*/,''));
    });
    
    $('button[type=submit]').click((e) => {
        e.preventDefault();

	// console.log('Hiding');
	// $('form').fadeIn('slow', () => {
	//     $('h1').text('Thank you!');
	// });

	var email = $('input#email').val();
	if(email.indexOf('@') < 0){
	    email += $('#domain').text();
	};
	
	// $.ajax({
	//     url: `/sendpulse/addressbooks/565640/emails`,
	//     method: 'POST',
	//     data: {
        //         emails: JSON.stringify([{
	// 	    email: email,
	// 	    variables: {
	// 	        firstName: $('input#firstName').val(),
	// 	        lastName: $('input#lastName').val(),
	// 	        website_url: $('input#url').val()
	// 	    }
	//         }])
        //     },
	//     success: (data, textStatus) => {
	// 	console.log(data, textStatus);
	//     }
	// });

	$.ajax({
	    method: 'POST',
	    url: `/scan/new`,
            contentType: 'application/json',
            dataType: 'json',
	    data: JSON.stringify({
		email: email,
                name: {
		    first: $('input#firstName').val(),
		    last: $('input#lastName').val()
                },
                'scan-type': $('select#scanType').val(),
                round: $('select#round').val(),
                coupon: $('input#coupon').val(),
		url: $('input#url').val()
            }),
	    success: (data, textStatus) => {
                const messages = {
                    queued: 'Your scan has been queued. We will send you email when it\'s started',
                    error: 'Error:' + data.msg + JSON.stringify(data.reason)
                };
		//console.log(data, textStatus);
                $('.alert[role=alert]')
                    .addClass('alert-success')
                    .text(messages[data.status])
                    .fadeIn(100)
                    .fadeOut(3000, () => {
                        $(this).removeClass('alert-success');
                    });
                    
                
	    },
            error: (err) => {
                $('.alert[role=alert]')
                    .addClass('alert-danger')
                    .text(JSON.stringify(JSON.parse(err.responseText).error.message))
                    .fadeIn(100)                
                    .fadeOut(3000, () => {
                        $(this).removeClass('alert-danger');
                    });
                    
            }
	});
        return false;
    });
});
