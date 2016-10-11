$(document).ready(() => {
    console.log('ready');
    // TODO add some initialization stuff here
    $('img[src*=class]').each((idx, it) => {
        const clazz = $(it).attr('src').match(/class=([^$\&]*)/)[1];
        $(it).addClass(clazz);
        console.log(clazz);
    });

    $('#pricing a.btn').on('click',(e)=>{
        var data = $(e.target).data();
        data.action && $('#contact #ajax-form').attr('action', data.action);
        data.subject && $('#contact input[name=subject]').val(data.subject);
        data.message && $('#contact input[name=message]').val(data.message);
    });
});
