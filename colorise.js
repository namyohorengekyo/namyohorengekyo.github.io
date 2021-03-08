document.addEventListener("DOMContentLoaded", colorise);

/*
const styleSheets = Array.from(document.styleSheets).filter(
    (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
);
for (let style of styleSheets) {
if (style instanceof CSSStyleSheet && style.cssRules) {
    ...
}
}*/

function colorise() {
    var colors = {
        'ni-ji': 'rgb(175, 25, 25)',
        'sa': '',
        'a': 'yellow',
        'i': 'red',
        'e': 'red',
    }

    function findColorTags() {
        var colors = []
        const styleSheets = window.document.styleSheets;
        const styleSheetsLength = styleSheets.length;
        for (var i = 0; i < styleSheetsLength; i++) {
            const styleSheet = styleSheets[i]
            if (!styleSheet.href.endsWith('color.css')) continue;
            var rules
            try {
                rules = styleSheet.rules || styleSheet.cssRules;
            } catch (err) {
                continue;
            }
            if (!rules) continue;

            for (let ruleId in rules) {
                const rule = rules[ruleId]
                const tag = rule.selectorText
                if (!tag) continue;
                const head = 'span.'
                if (tag.startsWith(head)) {
                    colors.push(tag.substr(head.length))
                }
            }

            return colors.sort(
                function (a, b) {
                    return a.length - b.length // || a.localeCompare(b)
                }
            );
        }
    }

    colors = findColorTags()

    var lines = document.getElementsByClassName('sutra')
    for (i_lines = lines.length - 1; i_lines >= 0; i_lines--) {
        var line = document.getElementsByClassName('sutra')[i_lines]
        var text = line.innerHTML
        text = text.toLowerCase()

        if( colors.length ){
            for (var i = 0; i < text.length; i++) {
                for (const tag of colors) {
                    if (tag === text.substr(i, tag.length)
                        .replace('é', 'e')
                        .replace('è', 'e')
                        .replace('ï', 'i')
                    ) {
                        const tagHead = '<span class="' + tag + '">'
                        const tagTail = '</span>'
                        var head = text.substr(0, i)
                        var word = text.substr(i, tag.length)
                        var tail = text.substr(i + tag.length)

                        text = head + tagHead + word + tagTail + tail
                        i += tagHead.length + word.length + tagTail.length
                        break
                    }
                }
            }
        }

        text = text.replace(/\./g, ' </P><P> ')

        line.innerHTML = text
    }

};