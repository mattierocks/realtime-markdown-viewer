// Convert text area, convert HTML, place HTML in markdown area

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    // Make the tab act like a tab
    pad.addEventListener('keydown', function(e) {
        if (e.keycode === 9) { // tab was pressed
            // Get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            // Set textarea value to: text before caret + tab + text after caret
            target.value = value.substring(0, start) +
                "\t" +
                value.substring(end);

            // Put caret at right start position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            // Prevent the focus lose
            e.preventDefault();
        }
    });

    var previousMarkdownValue;

    // Convert text area to markdown html
    var convertTextAreaToMarkdown = function() {
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function() {
        if (previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    };

    // Check every second if the text area has changed
    setInterval(function() {
        if (didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    // Convert textarea on input change
    pad.addEventListener('input', convertTextAreaToMarkdown);

    // Ignore if on home page
    if (document.location.pathname.length > 1) {
        // Implement ShareJS
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });
    }

    // Convert on page load
    convertTextAreaToMarkdown();

};