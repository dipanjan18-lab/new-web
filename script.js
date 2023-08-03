document.getElementById('copyButton').addEventListener('click', function() {
    var iframe = document.querySelector('.mini-window-content');
    if (iframe) {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var text = iframeDoc.body.innerText;

        var tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        alert('Text copied to clipboard!');
    }
});
