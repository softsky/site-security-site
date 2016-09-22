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
	var val = $(e.target).val();
	if(val.endsWith($("#url").val()))
	    $(e.target).val(val.replace(/\@.*/,''));
    });
    
    $('button[type=submit]').click(() => {
	console.log('Hiding');
	$('form').fadeIn('slow', () => {
	    $('h1').text('Thank you!');
	});
	
    });
});
