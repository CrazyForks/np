var tc = {
    title: text => {
        console.debug(text);

        var div = document.createElement("div");
        div.innerHTML = `<hr/><h1>${text}<h1>`;
        document.body.appendChild(div);
    },
    json: (obj, isHtml) => {
        console.debug(obj);

        var pre = document.createElement("pre");
        if (isHtml) {
            pre.innerHTML = JSON.stringify(obj, null, 2);
        } else {
            pre.innerText = JSON.stringify(obj, null, 2);
        }
        document.body.appendChild(pre);
    }
}



tc.title("svgo");
var svg1 = `<svg t="1619703181284" class="icon" viewBox="0 0 1043 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2820" width="200" height="200"><path d="M113.118429 456.802589L138.382018 362.560886c7.699717-31.295626 37.221215-46.482165 53.010957-71.781236 55.885046-49.853009 125.253467-63.868624 196.14764-74.158568 79.906745-2.235402 125.501845-41.230745 143.349577-122.556793 7.096514-32.253655 3.903083-68.623288 35.943842-91.048271 29.521497-7.841648 55.139912 0.319343 78.274547 18.912209a501.723521 501.723521 0 0 1 69.794212 93.603017l24.057182 92.041783c-3.796635 17.741284 8.302921 24.163629 21.502436 28.989258 44.140315 16.109086 77.706825 46.872473 110.457237 78.842268a576.059502 576.059502 0 0 1 53.756091 109.108898c-1.312855 39.456616 12.028591 69.90066 40.875919 99.918914 146.578491 152.575045 77.49393 392.011418-133.591871 459.641194-137.601401 44.104833-280.667118 44.708037-423.519939 34.560022-66.778194-4.754664-133.378976-12.560829-198.276594-30.053736-210.80194-56.77211-280.312292-308.698347-128.19852-465.850644 18.450936-19.125105 36.937354-36.263185 31.153695-65.926612zM598.768346 61.988047c-20.650855 147.820381-104.318752 212.327691-229.394806 219.175827-127.098561 7.096514-193.131621 83.98724-197.67339 212.895412-0.603204 17.386459 0 31.934312-17.528389 44.388693-82.922763 59.894576-112.053952 141.752862-87.145189 240.21699 25.050693 99.031849 97.328686 144.449537 193.025174 161.906961a1404.045242 1404.045242 0 0 0 431.645447 13.199515c39.030826-4.96756 78.87775-10.822183 116.063482-23.099152 86.293607-28.386055 153.74597-80.545431 172.125941-174.787133 17.741284-91.154719-14.618818-166.342282-89.948312-220.559647-19.657343-14.193027-17.386459-30.621457-18.309005-49.249805-5.074007-104.141339-64.64924-180.499827-165.20684-203.776392-28.918293-6.706205-29.55698-19.018657-28.705398-41.762983 2.590228-68.765218-20.508925-127.382421-78.948715-178.548286z" fill="#72420D" p-id="2821"></path><path d="M598.768346 61.988047c58.439791 51.165864 81.609908 109.747585 78.913233 178.690216-0.851582 22.744327-0.212895 35.09226 28.705398 41.762983 100.5576 23.276565 160.09735 99.59957 165.206839 203.776392 0.922547 18.592866-1.348338 35.09226 18.309006 49.249806 75.329493 54.217365 107.760561 129.404928 89.948311 220.559646-18.273523 94.277185-85.690403 146.294631-172.12594 174.787133-37.185732 12.276969-76.961691 18.131593-116.063482 23.099153a1404.045242 1404.045242 0 0 1-431.645448-13.199516c-95.802935-17.457424-167.97448-62.875112-193.025173-161.906961-24.837798-98.464128 4.222426-180.322414 87.145188-240.216989 17.492906-12.631794 16.925185-27.002235 17.528389-44.388694 4.506286-129.085585 70.574829-206.118241 197.67339-212.895412 125.111537-6.954583 208.779434-71.497376 229.430289-219.317757z m-99.706018 761.491406c58.29786-2.909571 105.667089-26.115171 139.37553-74.832737 10.36091-14.938161 15.75426-33.992301 39.492099-36.085772 15.61233-1.38382 28.811846-20.544407 17.741284-28.208642-25.370037-17.457424-55.778598-28.59895-85.477508-38.250209-12.489864-4.045013-20.757303 8.941607-21.041163 22.992704a11.070561 11.070561 0 0 0 1.24189 4.932077c21.289541 42.579082-12.596312 59.610715-39.030826 75.96818-46.127339 28.811846-93.283673 17.741284-141.930274-30.444044-14.867196-14.760749-29.911805-27.179648-48.220811-11.531835s-8.906125 34.240679 3.548257 49.994939c34.630987 42.862943 79.835779 63.655728 134.301522 65.500822z m-144.62695-307.63387c0 8.586782 0.212895 17.173563 0 25.760345-0.993512 32.431068 4.541769 59.184925 46.12734 58.014 39.563064-1.135442 41.550088-27.569956 40.414645-57.339831a432.63896 432.63896 0 0 1 13.554341-127.737247c6.49331-24.44749 6.599758-45.807996-22.070157-53.401266s-49.675596 2.057989-59.53975 32.927823a401.556229 401.556229 0 0 0-18.486419 121.776176z m312.849808-75.258528c-10.467358-30.018253-25.724862-43.643559-48.185328-26.718374-23.06367 17.386459-42.579082 39.740477-62.449321 61.030018a27.144165 27.144165 0 0 0-1.028994 37.859901c19.408965 21.715332 39.030826 43.998385 62.200942 61.349361 20.686338 15.505883 52.301306 1.170925 43.962903-17.528389-19.550895-44.104833-53.365783-81.929251 5.464315-115.992517z" fill="#FCFBFA" p-id="2822"></path><path d="M499.062328 823.443971c-54.465743-1.774128-99.670535-22.566914-134.017662-65.394374-12.631794-15.75426-22.070158-34.311644-3.548257-49.99494s33.353615-3.228914 48.220811 11.531835c48.611119 48.291776 95.802935 59.25589 141.930275 30.444044 26.292583-16.357464 60.107471-33.318132 39.030825-75.968179a11.070561 11.070561 0 0 1-1.24189-4.932077c0.283861-14.193027 8.551299-27.037717 21.041164-22.992705 29.69891 9.651259 60.107471 20.792785 85.477508 38.250209 11.106044 7.664235-2.057989 26.824822-17.741285 28.208642-23.737838 2.093472-29.166671 21.289541-39.492099 36.085773-33.992301 48.717567-81.36153 71.923167-139.65939 74.761772z" fill="#FEA623" p-id="2823"></path><path d="M354.435378 515.845583a401.556229 401.556229 0 0 1 18.486419-121.669728c9.828672-30.869835 30.727904-40.556576 59.53975-32.927824s28.563468 28.953776 22.070157 53.401266a432.63896 432.63896 0 0 0-13.554341 127.737247c1.09996 29.769875-0.887064 56.204389-40.414645 57.339831-41.656536 1.170925-47.156334-25.582932-46.12734-58.013999 0.390308-8.693229 0-17.280011 0-25.866793z" fill="#704111" p-id="2824"></path><path d="M667.249703 440.587055c-58.830099 34.063266-25.157141 71.887684-5.53528 115.957034 8.338404 18.699314-23.276565 33.069754-43.962903 17.528389-23.099152-17.315494-42.791978-39.634029-62.200943-61.349361a27.144165 27.144165 0 0 1 1.028995-37.859901c19.870238-21.289541 39.385651-43.679042 62.449321-61.030018 22.495949-16.889703 37.788936-3.264396 48.22081 26.753857z" fill="#734517" p-id="2825"></path></svg>`;
var so = svgo(svg1, {
    path: 'shit.svg',
    multipass: true
});
console.debug(so)
var div = document.createElement("div");
div.style.display = "flex";
div.innerHTML = `<h2>Before size: ${svg1.length}</h2>${svg1}<h2>After size: ${so.data.length}</h2>${so.data}`;
document.body.appendChild(div)



tc.title("js-yaml");
console.debug(jsyaml)
tc.json(jsyaml.load('basePath: /\ndefinitions: {}')); // yaml => json
tc.json(jsyaml.dump({ "basePath": "/", "definitions": {} }).replaceAll("\n", "<br/>"), true); // json => yaml



tc.title("clean-css");
var input = 'a{ font-weight: bold; }';
var options = { /* options */ };
var output = new CleanCSS(options).minify(input);
tc.json(output)



tc.title("fast-xml-parser");
console.debug(fastXmlParser);
tc.json(new fastXmlParser.parse('<a>1</a><b>a</b>')); // XML => JSON
tc.json(new fastXmlParser.j2xParser().parse({ a: 1, b: "a" })); // JSON => XML



tc.title("device-detector-js");
var dd = new DeviceDetector();
tc.json(dd.parse(navigator.userAgent))
setTimeout(function () {
    console.time();
    for (var i = 0; i < 999; i++) {
        dd.parse(navigator.userAgent)
    }
    console.log("device-detector-js 999 parse");
    console.timeEnd();
}, 1000)