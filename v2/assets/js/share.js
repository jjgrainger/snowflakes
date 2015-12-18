/*
 *     Share.js v.1.0
 */
(function(window, undefined) {

    // build url from base and paremeters
    function buildURL(base, options) {

        // create empty string
        var params = "";

        // for every key in the object passed
        for(var key in options) {
            // build the url
            // key=value&
            if(options[key]) {
                params = params + key + '=' + encodeURIComponent(options[key]) + '&';
            }
        }

        // remove the last & from the url and return
        params = params.slice(0, -1);

        return base + params;
    }


    // creates a popup window and focuses
    function dialog(url, title, w, h) {
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        var newWindow = window.open(url, title, 'scrollbars=yes, width='+w+', height='+h+', top='+top+', left='+left);
        newWindow.focus();
    }


    var networks = {

        // mailto
        "email" : {
            url : "mailto:?",
            options : {
                subject : document.title,
                body : window.location.href
            }
        },

        // facebook
        "facebook" : {
            url : "https://www.facebook.com/sharer/sharer.php?",
            options : {
                u : window.location.href
            }
        },

        // twitter
        "twitter" : {
            url : "https://twitter.com/intent/tweet?",
            options : {
                text : document.title,
                url : window.location.href,
                via : false,
                hashtags : false
            }
        },

        // google plus
        "google" : {
            url : "https://plus.google.com/share?",
            options : {
                url : window.location.href
            }
        },

        // linkedin
        "linkedin" : {
            url : "http://www.linkedin.com/shareArticle?",
            options : {
                mini : true,
                url : window.location.href,
                title : document.title,
                summary : false,
                source : false
            }
        },

        // pinterest
        "pinterest" : {
            url : "http://www.pinterest.com/pin/create/button/?",
            options : {
                title : document.title,
                description : document.title,
                media : false
            }
        }
    }


    window.Share = function(service, options) {

        // default to service being a url, not a name
        var base;
        var opts;
        var url;

        // if predefined service exists use that
        if(networks[service]) {

            base = networks[service].url;
            opts = networks[service].options;

            // merge user options with options passed
            for(var key in options) {
                opts[key] = options[key];
            }

        // else bypass
        } else {
            base = service;
            opts = options;
        }

        url = buildURL(base, opts);

        // the title for dialog isn't the title for the window
        // its a unique identifier - so urls can be rewritten into the same winodw
        // set a unique id and refer to that on runtime?
        dialog(url, '_blank', 600, 250);

    }

})(window);
