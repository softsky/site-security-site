$(document).ready(() => {
    console.log('initialized');
    
    $('input#url').on('focus', () => {
	$('.scan-result > dl').empty();
    });
    
    $('input#url').on('blur', (e) => {
	const val = $(e.target).val()
	, parser = document.createElement('a');
	parser.href = val.startsWith('http:')?val:'http://' + val;
	const domain = parser.hostname.replace(/^www\./,'');

	$('#domain').text('@' + domain);

	console.log('Capturing shot for:' + domain);
	options = {
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
    
    $('button[type=submit]').click(() => {
	console.log('Hiding');
	$('form').fadeIn('slow', () => {
	    $('h1').text('Thank you!');
	});

	var email = $('input#email').val();
	if(email.indexOf('@') < 0){
	    email += $('#domain').text();
	};
	
	$.ajax({
	    url: `/sendpulse/addressbooks/565640/emails`,
	    method: 'POST',
	    dataType: 'json',
	    contentType: 'application/json',
	    data: JSON.stringify([{
		email: email,
		variables: {
		    firstName: $('input#firstName').val(),
		    lastName: $('input#lastName').val(),
		    website_url: $('input#url').val()
		}
	    }]),
	    success: (data, textStatus) => {
		console.log(data, textStatus);
	    }
	});
    });
});
