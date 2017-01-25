$(document).ready(() => {
    console.log('ready');
    // making all client links opening in a new window
    $('#clients a').attr('target', '_new');

    $("input[name=url]:eq(0)").focus();
    
    // TODO add some initialization stuff here
    $('img[src*=class]').each((idx, it) => {
        const clazz = $(it).attr('src').match(/class=([^$\&]*)/)[1];
        $(it).addClass(clazz);
        console.log(clazz);
    });

    $('input[name=url]').on('blur',(e)=>{
        $(".slider-text").fadeOut('slow');
        $("#details").removeClass('hidden');
        const url = $('input[name=url]').val();

        $.ajax({
            type: 'POST',
            url: '/api/whois',
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            data: `domain=${url}`
        }).done((data) => {
            let whois = $(data, 'pre').text().substring('version: ').match(/(.*)\:\s(.*)/gi);
            $('#details .code').text(whois);
        }).fail((xhr, status, errorThrown) => {
            console.log(xhr, status, errorThrown);
        });


        $.ajax({
            type: 'POST',
            url: '/api/whatweb',
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            data: `target=${url}`
        }).done((data) => {
            let r = data.match(/(.*)\s(\[\d*\])\s(.*)/);
            let fa = r[3].split(/\,\s?/);

            console.log(fa);
            $("#details ul").html('');
            $.each(fa, (idx, it) => {
                var x = it.match(/(.*)\[(.*)\]/) || [it, it, it];
                var e = $(`<li class="list-group-item"><span class='badge'>${x[2]}</span>${x[1]}</li>`);

                $("#details ul").append(e);
            });

        }).fail((xhr, status, errorThrown) => {
            console.log(xhr, status, errorThrown);
        });



        // $.ajax({
        //     type: 'POST',
        //     url:'http://whatweb.net/whatweb.php',
        //     contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        //     data: `target=${url}`,
        //     failure: (err) => {
        //         console.error(err);
        //     },
        //     success: (data) => {
        //         console.log(data);
        //     }
        // });
    });


    // $('#pricing a.btn').on('click',(e)=>{
    //     var data = $(e.target).data();
    //     data.action && $('#contact #ajax-form').attr('action', data.action);
    //     data.subject && $('#contact input[name=subject]').val(data.subject);
    //     data.message && $('#contact input[name=message]').val(data.message);
    // });
});
