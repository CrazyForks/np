﻿var jc = {
    options: {
        js: {},
        cleancss: {
            "compatibility": "",
            "format": false,
            "inline": [
                "local"
            ],
            "rebase": false,
            "level": {
                "0": true,
                "1": {
                    "cleanupCharsets": true,
                    "normalizeUrls": true,
                    "optimizeBackground": true,
                    "optimizeBorderRadius": true,
                    "optimizeFilter": true,
                    "optimizeFontWeight": true,
                    "optimizeOutline": true,
                    "removeEmpty": true,
                    "removeNegativePaddings": true,
                    "removeQuotes": true,
                    "removeWhitespace": true,
                    "replaceMultipleZeros": true,
                    "replaceTimeUnits": true,
                    "replaceZeroUnits": true,
                    "roundingPrecision": "",
                    "selectorsSortingMethod": "standard",
                    "specialComments": "all",
                    "tidyAtRules": true,
                    "tidyBlockScopes": true,
                    "tidySelectors": true
                },
                "2": false
            },
            "sourceMap": false
        }
    },
    sizeof: function (str, charset) {
        var total = 0, charCode, i, len;
        charset = charset ? charset.toLowerCase() : '';
        if (charset === 'utf-16' || charset === 'utf16') {
            for (i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0xffff) {
                    total += 2;
                } else {
                    total += 4;
                }
            }
        } else {
            for (i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0x007f) {
                    total += 1;
                } else if (charCode <= 0x07ff) {
                    total += 2;
                } else if (charCode <= 0xffff) {
                    total += 3;
                } else {
                    total += 4;
                }
            }
        }
        return total;
    },
    sizeFormat: function (size) {
        var unit = "bytes";
        ["kb", "mb", "gb"].forEach(u => {
            if (size >= 1024) {
                size = (size / 1024).toFixed(2);
                unit = u;
            }
        })
        return size + " " + unit;
    },
    changeLang: function (editor, lang) {
        var oldModel = editor.getModel();
        var newModel = monaco.editor.createModel(editor.getValue(), lang);
        editor.setModel(newModel);
        if (oldModel) {
            oldModel.dispose();
        }
    },
    getLang: function (editor) {
        return editor.getModel().getLanguageId()
    },
    setEE: function (lang) {
        if (lang != jc.getLang(ee1)) {
            jc.changeLang(ee1, lang)
            jc.changeLang(ee2, lang)

            ss.ls["vscode-lang"] = lang;
            ss.lsSave();
        }
    },
    download: function (filename, content, contentType) {
        if (!contentType) contentType = 'application/octet-stream';
        var a = document.createElement('a');
        var blob = new Blob([content], { 'type': contentType });
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }
}

require(['vs/editor/editor.main'], function () {

    var defaultContent = ss.lsStr("vscode-content") || '/* 粘贴 JS、CSS 内容 ；自动保存，可拖拽文件打开 */',
        defaultLang = ss.lsStr("vscode-lang") || 'javascript';

    window.ee1 = monaco.editor.create(document.getElementById("editor1"), ss.meConfig({
        value: defaultContent,
        language: defaultLang
    }));

    window.ee2 = monaco.editor.create(document.getElementById("editor2"), ss.meConfig({
        value: "/* 输出的内容 */",
        language: defaultLang,
        wordWrap: "on"
    }));

    ee1.onDidChangeModelContent(function (e) {
        clearTimeout(window.defer1);
        window.defer1 = setTimeout(function () {
            var txt = ee1.getValue();
            ss.ls["vscode-content"] = txt;
            ss.lsSave();
        }, 1000 * 1)
    });

    $('#btnFn1').click(function () {
        var code = ee1.getValue();
        if (code != "") {
            jc.setEE("javascript");
            Terser.minify(code, jc.options.js).then(result => {
                ee2.setValue(result.code);
            }).catch(e => {
                ee2.setValue(e + "");
            })
        }
    });

    $('#btnFn2').click(function () {
        var code = ee1.getValue();
        if (code != "") {
            jc.setEE("css");

            var cout = new CleanCSS(jc.options.cleancss).minify(code);
            console.log(cout);
            if (cout.errors.length) {
                ee2.setValue(cout.errors.join("\r\n"));
            } else {
                ee2.setValue(cout.styles);
            }
        }
    });

    //下载
    $('#btnDown').click(function () {
        var dfn = jc.getLang(ee1) == "javascript" ? "code.js" : "style.css";
        var filename = $('#txtFileName').val() || dfn;
        var code = ee2.getValue();
        jc.download(filename, code);
    })

    $(window).on('load resize', function () {
        var ch = $(window).height() - $('#editor1').offset().top - 20;
        $('#editor1').css('height', Math.max(200, ch));
        $('#editor2').css('height', Math.max(200, ch));
    });
});

//接收文件
ss.receiveFiles(function (files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        ee1.setValue(e.target.result);
    };
    reader.readAsText(file);
});