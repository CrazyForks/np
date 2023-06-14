import { nrEditor } from "../../../../frame/nrEditor";
import { nrcFile } from "../../../../frame/nrcFile";
import { nrVary } from "../../nrVary";
import { nrcBase } from "../../../../frame/nrcBase";
import { nrApp } from "../../../../frame/Bootstrap/nrApp";

let nrPage = {
    pathname: "/ss/jsonto",

    init: async () => {
        //编辑器
        nrVary.domEditor1.innerHTML = nrApp.tsLoadingHtml;
        nrVary.domEditor2.innerHTML = nrApp.tsLoadingHtml;

        window["jsyaml"] = await import('js-yaml');
        await nrEditor.init();
        nrVary.domEditor1.innerHTML = '';
        nrVary.domEditor2.innerHTML = '';

        nrPage.editor1 = nrEditor.create(nrVary.domEditor1, {
            value: JSON.stringify({
                "site": {
                    "title": "NET牛人",
                    "domain": "https://www.netnr.com",
                    "mirror": "https://netnr.zme.ink",
                    "createtime": "2014.01.01"
                },
                "about": {
                    "name": "netnr",
                    "sex": "男",
                    "injob": "2012.03.01",
                    "live": "中国重庆",
                    "mail": "netnr@netnr.com",
                    "git": [
                        {
                            "name": "github",
                            "url": "https://github.com/netnr"
                        },
                        {
                            "name": "gitee",
                            "url": "https://gitee.com/netnr"
                        }
                    ]
                },
                "update": "2022.07.16",
                "version": "v.1.0.0"
            }, null, 2),
            language: "json",
        });
        nrPage.editor2 = nrEditor.create(nrVary.domEditor2, { language: "csharp" });

        nrVary.domEditor1.classList.add('border');
        nrVary.domEditor2.classList.add('border');
        nrcBase.setHeightFromBottom(nrVary.domEditor1);
        nrcBase.setHeightFromBottom(nrVary.domEditor2);

        nrPage.bindEvent();
    },

    bindEvent: () => {
        //切换
        nrVary.domSeTo.addEventListener('input', function () {
            let domCards = nrVary.domSwitch.children;
            for (let index = 0; index < domCards.length; index++) {
                const domCard = domCards[index];
                if (domCard.dataset.value == this.value) {
                    domCard.classList.remove('d-none');
                } else {
                    domCard.classList.add('d-none');
                }
            }

            switch (this.value) {
                case "json-to-csharp":
                    if (nrEditor.getLanguage(nrPage.editor2) != "csharp") {
                        nrEditor.setLanguage(nrPage.editor2, 'csharp');
                    }
                    break;
                case "json-to-xml":
                case "xml-to-json":
                    if (nrEditor.getLanguage(nrPage.editor2) != "xml") {
                        nrEditor.setLanguage(nrPage.editor2, 'xml');
                    }
                    break;
                case "json-to-yaml":
                case "yaml-to-json":
                    if (nrEditor.getLanguage(nrPage.editor2) != "yaml") {
                        nrEditor.setLanguage(nrPage.editor2, 'yaml');
                    }
                    break;
            }
        });

        //转换
        nrVary.domBtnTo.addEventListener('click', async function () {
            try {
                let toType = nrVary.domSeTo.value;
                let domCard = nrVary.domSwitch.querySelector(`[data-value="${toType}"]`);

                switch (toType) {
                    case "json-to-csharp":
                        {
                            let json = JSON.parse(nrPage.editor1.getValue());

                            await nrcBase.importScript('/file/ss-jsontocsharp.js');

                            Object.assign(jtc.config, {
                                notes: domCard.querySelector(".flag-comment").value == "1",
                                bigHump: domCard.querySelector(".flag-hump").value == "1",
                                withPropertyName: domCard.querySelector(".flag-property").value == "1",
                            })
                            let result = jtc.init(json);
                            nrEditor.keepSetValue(nrPage.editor2, result);
                        }
                        break;
                    case "json-to-xml":
                        {
                            let json = JSON.parse(nrPage.editor1.getValue());

                            let FastXmlParser = await import('fast-xml-parser');
                            let result = new FastXmlParser.XMLBuilder().build(json);
                            nrEditor.keepSetValue(nrPage.editor2, result);
                            nrEditor.formatter(nrPage.editor2);
                        }
                        break;
                    case "xml-to-json":
                        {
                            let FastXmlParser = await import('fast-xml-parser');
                            let result = new FastXmlParser.XMLParser().parse(nrPage.editor2.getValue());
                            nrEditor.keepSetValue(nrPage.editor1, JSON.stringify(result, null, 2));
                        }
                        break;
                    case "json-to-yaml":
                        {
                            let json = JSON.parse(nrPage.editor1.getValue());
                            let result = jsyaml.dump(json);
                            nrEditor.keepSetValue(nrPage.editor2, result);
                        }
                        break;
                    case "yaml-to-json":
                        {
                            let result = jsyaml.load(nrPage.editor2.getValue());
                            nrEditor.keepSetValue(nrPage.editor1, JSON.stringify(result, null, 2));
                        }
                        break;
                    case "array-to-excel":
                        {
                            let arr = JSON.parse(nrPage.editor1.getValue());
                            if (nrcBase.type(arr) == "Array") {
                                let headers = Object.keys(arr[0]);
                                let mds = [];
                                arr.forEach(row => {
                                    let cols = [];
                                    for (const key in row) {
                                        let col = row[key];
                                        cols.push(col == null ? "" : col);
                                    }
                                    mds.push(cols.join('\t'));
                                })

                                let result = `${headers.join('\t')}\r\n${mds.join('\r\n')}`;
                                nrEditor.keepSetValue(nrPage.editor2, result);
                            } else {
                                nrApp.alert('数据源不是数组');
                            }
                        }
                        break;
                    case "excel-to-array":
                        {
                            let txt2 = nrPage.editor2.getValue();
                            let keys = [];
                            let result = [];
                            txt2.split('\n').forEach(row => {
                                if (row.trim() != "") {
                                    let cols = row.split('\t');
                                    if (keys.length == 0) {
                                        keys = cols.map(x => x.trim());
                                    } else {
                                        let row = {};
                                        for (let index = 0; index < cols.length; index++) {
                                            let col = cols[index].trim();
                                            if (col == "") {
                                                col = null;
                                            } else if (parseFloat(col).toString() == col) {
                                                col = parseFloat(col);
                                            }
                                            row[keys[index]] = col;
                                        }
                                        result.push(row);
                                    }
                                }
                            });

                            nrEditor.keepSetValue(nrPage.editor1, JSON.stringify(result, null, 2));
                        }
                        break;
                    case "array-to-md":
                        {
                            let arr = JSON.parse(nrPage.editor1.getValue());
                            if (nrcBase.type(arr) == "Array") {
                                let headers = Object.keys(arr[0]);
                                let mds = [];
                                arr.forEach(row => {
                                    let cols = [];
                                    for (const key in row) {
                                        let col = row[key];
                                        cols.push(col == null ? "" : `${col}`.replace(/\|/g, "\\|"));
                                    }
                                    mds.push(cols.join(' | '));
                                })

                                let result = `${headers.join(' | ')}\r\n${headers.map(x => '---').join(' | ')}\r\n${mds.join('\r\n')}`;
                                nrEditor.keepSetValue(nrPage.editor2, result);
                            } else {
                                nrApp.alert('数据源不是数组');
                            }
                        }
                        break;
                    case "excel-to-md":
                        {
                            let txt1 = nrPage.editor1.getValue();
                            let headers = [];
                            let mds = [];
                            txt1.split('\n').forEach(row => {
                                if (row.trim() != "") {
                                    let cols = row.split('\t');
                                    if (headers.length == 0) {
                                        headers = cols.map(x => x.trim());
                                    } else {
                                        mds.push(cols.map(x => x == null ? "" : x.replace(/\|/g, "\\|")).join(' | '));
                                    }
                                }
                            });

                            let result = `${headers.join(' | ')}\r\n${headers.map(x => '---').join(' | ')}\r\n${mds.join('\r\n')}`;
                            nrEditor.keepSetValue(nrPage.editor2, result);
                        }
                        break;
                }
            } catch (ex) {
                nrApp.logError(ex);
            }
        });

        //接收文件
        nrcFile.init(async (files) => {
            let text = await nrcFile.reader(files[0]);
            nrPage.editor1.setValue(text);
        })
    },
}

export { nrPage };