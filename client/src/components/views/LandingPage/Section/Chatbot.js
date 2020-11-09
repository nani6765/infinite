/*
    https://developers.channel.io/docs/web-installation
*/

function Chatbot() {

    const ChannelIO = window.ChannelIO

    return (
        function() {
            var w = window;
            if (w.ChannelIO) {
                return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
            }
            var ch = function() {
            ch.c(arguments);
        };
        
        ch.q = [];
        ch.c = function(args) {
           ch.q.push(args);
        };
        w.ChannelIO = ch;
        
        function l() {
            if (w.ChannelIOInitialized) {
                return;
            }
            w.ChannelIOInitialized = true;
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
            s.charset = 'UTF-8';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        }
        
        if (document.readyState === 'complete') {
            l();
        } else if (window.attachEvent) {
            window.attachEvent('onload', l);
        } else {
            window.addEventListener('DOMContentLoaded', l, false);
            window.addEventListener('load', l, false);
        }
    })();

    ChannelIO('boot', {
        "pluginKey": "93635d68-761c-4d5a-8cde-d63b06cf017c"
    })
    
}

export default Chatbot
