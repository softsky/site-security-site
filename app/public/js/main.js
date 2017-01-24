$(document).ready(() => {
    console.log('ready');
    // making all client links opening in a new window
    $('#clients a').attr('target', '_new');

    $("#name-0").focus();
    
    // TODO add some initialization stuff here
    $('img[src*=class]').each((idx, it) => {
        const clazz = $(it).attr('src').match(/class=([^$\&]*)/)[1];
        $(it).addClass(clazz);
        console.log(clazz);
    });

    $('input[name=url]').on('blur',(e)=>{
        $(".slider-text").fadeOut('slow');
        $("#details")
            .fadeIn('slow');
    });
    

    // $('#pricing a.btn').on('click',(e)=>{
    //     var data = $(e.target).data();
    //     data.action && $('#contact #ajax-form').attr('action', data.action);
    //     data.subject && $('#contact input[name=subject]').val(data.subject);
    //     data.message && $('#contact input[name=message]').val(data.message);
    // });
});
