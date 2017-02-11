//TODO merge with contact.js
$(window).on('hashchange', () => {
    if(window.location.hash){
        var hash = window.location.hash.match(/^#(.*)/)
        if(hash && hash.length > 1){
            var [scanType, round, coupon] = hash[1].split(/\//)
            if(scanType){
                $('select#scanType').val(scanType)
            }
            if(round){
                $('select#round').val(round)
                $('select#round option:selected').attr('disabled', false)
            }
            if(coupon){
                $('input#coupon').val(coupon)
            }
        }
    }

})

$(document).ready(() => {
    const parser = document.createElement('a')
    console.log('initialized')
    $(window).trigger('hashchange')
    
    $('input#url').on('focus', () => {
        $('.scan-result > dl').empty()
    })
    
    $('input#url').on('blur', (e) => {
        const val = $(e.target).val()
        if(!val){
            // if domain is empty, return
            return
        }

        if(val.startsWith('http')){
            parser.href = val
            $(e.target).val(val.replace(/https?:\/\//, ''))
        } else {
            parser.href = 'http://' + val
        }
        const domain = parser.hostname.replace(/^www\./,'')
        $(e.target).val(domain)
        $('#domain').text('@' + domain)
        const options = {
            screenSize: {
                width: (window).width(),
                height: $(window).height()
            }
        }
        
        $('#screenshot').attr('src',`/ws/${domain}?options=${JSON.stringify(options)}`)

        
        /* $.ajax({
         *     url: `/api/exec/whatweb/${domain}`,
         *     dataType: 'json',
         *     success: (data, textStatus) => {
         *         console.log(data)
         *         const KEYS = ['IP', 'Country', 'PoweredBy', 'HTTPServer', 'Apache']
         *         _(_(data).filter({http_status:200}).map(_.property('plugins')).first())
         *         //.pickBy((value, key) => KEYS.indexOf(key) > -1)
         *             .each((obj, idx) => {

         *                 if(obj.string && obj.string.length){
         *                     $('.scan-result > dl')
         *                         .append($('<dt>').text(idx))
         *                         .append($('<dd>').text(obj.string.join()))
         *                 }
         *                 
         *             })
         *     }
         * })*/
    })
    $('input#email').on('change', (e) => {
        console.log('onchange, email', $(e.target).val())
        var val = $(e.target).val()
        if(val.endsWith($('#url').val()))
            $(e.target).val(val.replace(/\@.*/,''))
    })
    
    $('button[type=submit]').click((e) => {
        var email = $('input#email').val()
        if(email.indexOf('@') < 0){
            email += $('#domain').text()
        }
        
        var form = $(e.target).parents('form')

        $.ajax({
            method: 'POST',
            url: $(form).attr('action'),
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
            success: (data) => {
                const messages = {
                    queued: 'Your scan has been queued. We will send you email when it\'s started',
                    error: 'Error:' + data.msg + JSON.stringify(data.reason)
                }
                //console.log(data, textStatus);
                $('.alert[role=alert]')
                    .addClass('alert-success')
                    .text(messages[data.status])
                    .fadeIn(100)
                    .fadeOut(3000, () => {
                        $(this).removeClass('alert-success')
                    })
                
                
            },
            error: (err) => {
                $('.alert[role=alert]')
                    .addClass('alert-danger')
                    .text(JSON.stringify(JSON.parse(err.responseText).error.message))
                    .fadeIn(100)                
                    .fadeOut(3000, () => {
                        $(this).removeClass('alert-danger')
                    })
                
            }
        })
        e.preventDefault()
        return false
    })
})
