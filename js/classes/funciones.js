function ISODateString_noTime(d) {
    function pad(n) {return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate());
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

//
function download(mimeType,filename, text) {
    if(!mimeType){
	mimeType="text/plain";
    }
    var element = document.createElement('a');
    element.setAttribute('href', 'data:'+mimeType+';charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function formatXML(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

/**
 * Creates a file upload dialog and returns text in promise
 * @returns {Promise<any>}
 */
function uploadText() {
    return new Promise((resolve) => {
        // create file input
        const uploader = document.createElement('input')
        uploader.type = 'file'
        uploader.style.display = 'none'

        // listen for files
        uploader.addEventListener('change', () => {
            const files = uploader.files

            if (files.length) {
                const reader = new FileReader()
                reader.addEventListener('load', () => {
                    uploader.parentNode.removeChild(uploader)
                    resolve(reader.result)
                })
                reader.readAsText(files[0])
            }
        })

        // trigger input
        document.body.appendChild(uploader)
        uploader.click()
    })
}

// Sirve para establecer o modificar el valor de una cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Sirve para recuperar el valor almacenado para una cookie
function getCookie(cname) { // cookie name
    var name = cname + "=";
    var ca = document.cookie.split(';'); // Splitea los pares key (clave) / value (valor) name1=valor1;name2=valor2
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

// Sirve para borrar una cookie
function deleteCookie(cname) { // cookie name
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";  // Así es como se borra una cookie   
}
