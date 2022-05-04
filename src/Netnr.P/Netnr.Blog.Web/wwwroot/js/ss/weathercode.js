﻿var WeatherCode = [
    {
        name: "北京", citys: [
            { name: "北京", code: 101010100, py: "BJ" },
            { name: "朝阳", code: 101010300, py: "CY" },
            { name: "顺义", code: 101010400, py: "SY" },
            { name: "怀柔", code: 101010500, py: "HR" },
            { name: "通州", code: 101010600, py: "TZ" },
            { name: "昌平", code: 101010700, py: "CP" },
            { name: "延庆", code: 101010800, py: "YQ" },
            { name: "丰台", code: 101010900, py: "FT" },
            { name: "石景山", code: 101011000, py: "SJS" },
            { name: "大兴", code: 101011100, py: "DX" },
            { name: "房山", code: 101011200, py: "FS" },
            { name: "密云", code: 101011300, py: "MY" },
            { name: "门头沟", code: 101011400, py: "MTG" },
            { name: "平谷", code: 101011500, py: "PG" },
            { name: "八达岭", code: 101011600, py: "BDL" },
            { name: "佛爷顶", code: 101011700, py: "BYD" },
            { name: "汤河口", code: 101011800, py: "THK" },
            { name: "密云上甸子", code: 101011900, py: "MYSDZ" },
            { name: "斋堂", code: 101012000, py: "ZT" },
            { name: "霞云岭", code: 101012100, py: "XYL" },
            { name: "海淀", code: 101010200, py: "HD" }
        ]
    },
    {
        name: "天津", citys: [
            { name: "天津", code: 101030100, py: "TJ" },
            { name: "宝坻", code: 101030300, py: "BD" },
            { name: "东丽", code: 101030400, py: "DL" },
            { name: "西青", code: 101030500, py: "XQ" },
            { name: "北辰", code: 101030600, py: "BC" },
            { name: "蓟县", code: 101031400, py: "JX" },
            { name: "汉沽", code: 101030800, py: "HG" },
            { name: "静海", code: 101030900, py: "JH" },
            { name: "津南", code: 101031000, py: "JN" },
            { name: "塘沽", code: 101031100, py: "TG" },
            { name: "大港", code: 101031200, py: "DG" },
            { name: "武清", code: 101030200, py: "WQ" },
            { name: "宁河", code: 101030700, py: "NH" }
        ]
    },
    {
        name: "上海", citys: [
            { name: "上海", code: 101020100, py: "SH" },
            { name: "宝山", code: 101020300, py: "BS" },
            { name: "嘉定", code: 101020500, py: "JD" },
            { name: "南汇", code: 101020600, py: "NH" },
            { name: "浦东", code: 101021300, py: "PD" },
            { name: "青浦", code: 101020800, py: "QP" },
            { name: "松江", code: 101020900, py: "SJ" },
            { name: "奉贤", code: 101021000, py: "FX" },
            { name: "崇明", code: 101021100, py: "CM" },
            { name: "徐家汇", code: 101021200, py: "XJH" },
            { name: "闵行", code: 101020200, py: "MX" },
            { name: "金山", code: 101020700, py: "JS" }
        ]
    },
    {
        name: "河北", citys: [
            { name: "石家庄", code: 101090101, py: "SJZ" },
            { name: "张家口", code: 101090301, py: "ZJK" },
            { name: "承德", code: 101090402, py: "CD" },
            { name: "唐山", code: 101090501, py: "TS" },
            { name: "秦皇岛", code: 101091101, py: "QHD" },
            { name: "沧州", code: 101090701, py: "CZ" },
            { name: "衡水", code: 101090801, py: "HS" },
            { name: "邢台", code: 101090901, py: "XT" },
            { name: "邯郸", code: 101091001, py: "HD" },
            { name: "保定", code: 101090201, py: "BD" },
            { name: "廊坊", code: 101090601, py: "LF" }
        ]
    },
    {
        name: "河南", citys: [
            { name: "郑州", code: 101180101, py: "ZZ" },
            { name: "新乡", code: 101180301, py: "XX" },
            { name: "许昌", code: 101180401, py: "XC" },
            { name: "平顶山", code: 101180501, py: "PDS" },
            { name: "信阳", code: 101180601, py: "XY" },
            { name: "南阳", code: 101180701, py: "NY" },
            { name: "开封", code: 101180801, py: "KF" },
            { name: "洛阳", code: 101180901, py: "LY" },
            { name: "商丘", code: 101181001, py: "SQ" },
            { name: "焦作", code: 101181101, py: "JZ" },
            { name: "鹤壁", code: 101181201, py: "HB" },
            { name: "濮阳", code: 101181301, py: "PY" },
            { name: "周口", code: 101181401, py: "ZK" },
            { name: "漯河", code: 101181501, py: "TH" },
            { name: "驻马店", code: 101181601, py: "ZMD" },
            { name: "三门峡", code: 101181701, py: "SMX" },
            { name: "济源", code: 101181801, py: "JY" },
            { name: "安阳", code: 101180201, py: "AY" }
        ]
    },
    {
        name: "安徽", citys: [
            { name: "合肥", code: 101220101, py: "HF" },
            { name: "芜湖", code: 101220301, py: "WH" },
            { name: "淮南", code: 101220401, py: "HN" },
            { name: "马鞍山", code: 101220501, py: "MAS" },
            { name: "安庆", code: 101220601, py: "AQ" },
            { name: "宿州", code: 101220701, py: "SZ" },
            { name: "阜阳", code: 101220801, py: "FY" },
            { name: "亳州", code: 101220901, py: "BZ" },
            { name: "黄山", code: 101221001, py: "HS" },
            { name: "滁州", code: 101221101, py: "CZ" },
            { name: "淮北", code: 101221201, py: "HB" },
            { name: "铜陵", code: 101221301, py: "TL" },
            { name: "宣城", code: 101221401, py: "XC" },
            { name: "六安", code: 101221501, py: "LA" },
            { name: "巢湖", code: 101221601, py: "CH" },
            { name: "池州", code: 101221701, py: "CZ" },
            { name: "蚌埠", code: 101220201, py: "BB" }
        ]
    },
    {
        name: "浙江", citys: [
            { name: "杭州", code: 101210101, py: "HZ" },
            { name: "舟山", code: 101211101, py: "ZS" },
            { name: "湖州", code: 101210201, py: "HZ" },
            { name: "嘉兴", code: 101210301, py: "JX" },
            { name: "金华", code: 101210901, py: "JH" },
            { name: "绍兴", code: 101210501, py: "SX" },
            { name: "台州", code: 101210601, py: "TZ" },
            { name: "温州", code: 101210701, py: "WZ" },
            { name: "丽水", code: 101210801, py: "LS" },
            { name: "衢州", code: 101211001, py: "QZ" },
            { name: "宁波", code: 101210401, py: "NB" }
        ]
    },
    {
        name: "重庆", citys: [
            { name: "重庆", code: 101040100, py: "CQ" },
            { name: "合川", code: 101040300, py: "HC" },
            { name: "南川", code: 101040400, py: "NC" },
            { name: "江津", code: 101040500, py: "JJ" },
            { name: "万盛", code: 101040600, py: "WS" },
            { name: "渝北", code: 101040700, py: "YB" },
            { name: "北碚", code: 101040800, py: "BB" },
            { name: "巴南", code: 101040900, py: "BN" },
            { name: "长寿", code: 101041000, py: "CS" },
            { name: "黔江", code: 101041100, py: "QJ" },
            { name: "万州", code: 101041300, py: "WZLB" },
            { name: "涪陵", code: 101041400, py: "FL" },
            { name: "开县", code: 101041500, py: "KX" },
            { name: "城口", code: 101041600, py: "CK" },
            { name: "云阳", code: 101041700, py: "YY" },
            { name: "巫溪", code: 101041800, py: "WX" },
            { name: "奉节", code: 101041900, py: "FJ" },
            { name: "巫山", code: 101042000, py: "WS" },
            { name: "潼南", code: 101042100, py: "TN" },
            { name: "垫江", code: 101042200, py: "DJ" },
            { name: "梁平", code: 101042300, py: "LP" },
            { name: "忠县", code: 101042400, py: "ZX" },
            { name: "石柱", code: 101042500, py: "SZ" },
            { name: "大足", code: 101042600, py: "DZ" },
            { name: "荣昌", code: 101042700, py: "RC" },
            { name: "铜梁", code: 101042800, py: "TL" },
            { name: "璧山", code: 101042900, py: "BS" },
            { name: "丰都", code: 101043000, py: "FD" },
            { name: "武隆", code: 101043100, py: "WL" },
            { name: "彭水", code: 101043200, py: "PS" },
            { name: "綦江", code: 101043300, py: "QJ" },
            { name: "酉阳", code: 101043400, py: "YY" },
            { name: "秀山", code: 101043600, py: "XS" },
            { name: "永川", code: 101040200, py: "YC" }
        ]
    },
    {
        name: "福建", citys: [
            { name: "福州", code: 101230101, py: "FZ" },
            { name: "泉州", code: 101230501, py: "QZ" },
            { name: "漳州", code: 101230601, py: "ZZ" },
            { name: "龙岩", code: 101230701, py: "LY" },
            { name: "晋江", code: 101230509, py: "JJ" },
            { name: "南平", code: 101230901, py: "NP" },
            { name: "厦门", code: 101230201, py: "XM" },
            { name: "宁德", code: 101230301, py: "ND" },
            { name: "莆田", code: 101230401, py: "PT" },
            { name: "三明", code: 101230801, py: "SM" }
        ]
    },
    {
        name: "甘肃", citys: [
            { name: "兰州", code: 101160101, py: "LZ" },
            { name: "平凉", code: 101160301, py: "PL" },
            { name: "庆阳", code: 101160401, py: "QY" },
            { name: "武威", code: 101160501, py: "WW" },
            { name: "金昌", code: 101160601, py: "JC" },
            { name: "嘉峪关", code: 101161401, py: "JYG" },
            { name: "酒泉", code: 101160801, py: "JQ" },
            { name: "天水", code: 101160901, py: "TS" },
            { name: "武都", code: 101161001, py: "WD" },
            { name: "临夏", code: 101161101, py: "LX" },
            { name: "合作", code: 101161201, py: "HZ" },
            { name: "白银", code: 101161301, py: "BY" },
            { name: "定西", code: 101160201, py: "DX" },
            { name: "张掖", code: 101160701, py: "ZY" }
        ]
    },
    {
        name: "广东", citys: [
            { name: "广州", code: 101280101, py: "GZ" },
            { name: "惠州", code: 101280301, py: "HZ" },
            { name: "梅州", code: 101280401, py: "MZ" },
            { name: "汕头", code: 101280501, py: "ST" },
            { name: "深圳", code: 101280601, py: "SZ" },
            { name: "珠海", code: 101280701, py: "ZH" },
            { name: "佛山", code: 101280800, py: "BS" },
            { name: "肇庆", code: 101280901, py: "ZQ" },
            { name: "湛江", code: 101281001, py: "ZJ" },
            { name: "江门", code: 101281101, py: "JM" },
            { name: "河源", code: 101281201, py: "HY" },
            { name: "清远", code: 101281301, py: "QY" },
            { name: "云浮", code: 101281401, py: "YF" },
            { name: "潮州", code: 101281501, py: "CZ" },
            { name: "东莞", code: 101281601, py: "DG" },
            { name: "中山", code: 101281701, py: "ZS" },
            { name: "阳江", code: 101281801, py: "YJ" },
            { name: "揭阳", code: 101281901, py: "JY" },
            { name: "茂名", code: 101282001, py: "MM" },
            { name: "汕尾", code: 101282101, py: "SW" },
            { name: "韶关", code: 101280201, py: "SG" }
        ]
    },
    {
        name: "广西", citys: [
            { name: "南宁", code: 101300101, py: "NN" },
            { name: "柳州", code: 101300301, py: "LZ" },
            { name: "来宾", code: 101300401, py: "LB" },
            { name: "桂林", code: 101300501, py: "GL" },
            { name: "梧州", code: 101300601, py: "WZ" },
            { name: "防城港", code: 101301401, py: "FCG" },
            { name: "贵港", code: 101300801, py: "GG" },
            { name: "玉林", code: 101300901, py: "YL" },
            { name: "百色", code: 101301001, py: "BS" },
            { name: "钦州", code: 101301101, py: "QZ" },
            { name: "河池", code: 101301201, py: "HC" },
            { name: "北海", code: 101301301, py: "BH" },
            { name: "崇左", code: 101300201, py: "CZ" },
            { name: "贺州", code: 101300701, py: "HZ" }
        ]
    },
    {
        name: "贵州", citys: [
            { name: "贵阳", code: 101260101, py: "GY" },
            { name: "安顺", code: 101260301, py: "AS" },
            { name: "都匀", code: 101260401, py: "DY" },
            { name: "兴义", code: 101260906, py: "XY" },
            { name: "铜仁", code: 101260601, py: "TR" },
            { name: "毕节", code: 101260701, py: "BJ" },
            { name: "六盘水", code: 101260801, py: "LPS" },
            { name: "遵义", code: 101260201, py: "ZY" },
            { name: "凯里", code: 101260501, py: "KL" }
        ]
    },
    {
        name: "云南", citys: [
            { name: "昆明", code: 101290101, py: "KM" },
            { name: "红河", code: 101290301, py: "HH" },
            { name: "文山", code: 101290601, py: "WS" },
            { name: "玉溪", code: 101290701, py: "YX" },
            { name: "楚雄", code: 101290801, py: "CX" },
            { name: "普洱", code: 101290901, py: "PE" },
            { name: "昭通", code: 101291001, py: "ZT" },
            { name: "临沧", code: 101291101, py: "LC" },
            { name: "怒江", code: 101291201, py: "NJ" },
            { name: "香格里拉", code: 101291301, py: "XGLL" },
            { name: "丽江", code: 101291401, py: "LJ" },
            { name: "德宏", code: 101291501, py: "DH" },
            { name: "景洪", code: 101291601, py: "JH" },
            { name: "大理", code: 101290201, py: "DL" },
            { name: "曲靖", code: 101290401, py: "QJ" },
            { name: "保山", code: 101290501, py: "BS" }
        ]
    },
    {
        name: "内蒙古", citys: [
            { name: "呼和浩特", code: 101080101, py: "HHHT" },
            { name: "乌海", code: 101080301, py: "WH" },
            { name: "集宁", code: 101080401, py: "JN" },
            { name: "通辽", code: 101080501, py: "TL" },
            { name: "阿拉善左旗", code: 101081201, py: "ALSZQ" },
            { name: "鄂尔多斯", code: 101080701, py: "EEDS" },
            { name: "临河", code: 101080801, py: "LH" },
            { name: "锡林浩特", code: 101080901, py: "XLHT" },
            { name: "呼伦贝尔", code: 101081000, py: "HLBE" },
            { name: "乌兰浩特", code: 101081101, py: "WLHT" },
            { name: "包头", code: 101080201, py: "BT" },
            { name: "赤峰", code: 101080601, py: "CF" }
        ]
    },
    {
        name: "江西", citys: [
            { name: "南昌", code: 101240101, py: "NC" },
            { name: "上饶", code: 101240301, py: "SR" },
            { name: "抚州", code: 101240401, py: "FZ" },
            { name: "宜春", code: 101240501, py: "YC" },
            { name: "鹰潭", code: 101241101, py: "YT" },
            { name: "赣州", code: 101240701, py: "GZ" },
            { name: "景德镇", code: 101240801, py: "JDZ" },
            { name: "萍乡", code: 101240901, py: "PX" },
            { name: "新余", code: 101241001, py: "XY" },
            { name: "九江", code: 101240201, py: "JJ" },
            { name: "吉安", code: 101240601, py: "JA" }
        ]
    },
    {
        name: "湖北", citys: [
            { name: "武汉", code: 101200101, py: "WH" },
            { name: "黄冈", code: 101200501, py: "HG" },
            { name: "荆州", code: 101200801, py: "JZ" },
            { name: "宜昌", code: 101200901, py: "YC" },
            { name: "恩施", code: 101201001, py: "ES" },
            { name: "十堰", code: 101201101, py: "SY" },
            { name: "神农架", code: 101201201, py: "SNJ" },
            { name: "随州", code: 101201301, py: "SZ" },
            { name: "荆门", code: 101201401, py: "JM" },
            { name: "天门", code: 101201501, py: "TM" },
            { name: "仙桃", code: 101201601, py: "XT" },
            { name: "潜江", code: 101201701, py: "QJ" },
            { name: "襄樊", code: 101200201, py: "XF" },
            { name: "鄂州", code: 101200301, py: "EZ" },
            { name: "孝感", code: 101200401, py: "XG" },
            { name: "黄石", code: 101200601, py: "HS" },
            { name: "咸宁", code: 101200701, py: "XN" }
        ]
    },
    {
        name: "四川", citys: [
            { name: "成都", code: 101270101, py: "CD" },
            { name: "自贡", code: 101270301, py: "ZG" },
            { name: "绵阳", code: 101270401, py: "MY" },
            { name: "南充", code: 101270501, py: "NC" },
            { name: "达州", code: 101270601, py: "DZ" },
            { name: "遂宁", code: 101270701, py: "SN" },
            { name: "广安", code: 101270801, py: "GA" },
            { name: "巴中", code: 101270901, py: "BZ" },
            { name: "泸州", code: 101271001, py: "LZ" },
            { name: "宜宾", code: 101271101, py: "YB" },
            { name: "内江", code: 101271201, py: "NJ" },
            { name: "资阳", code: 101271301, py: "ZY" },
            { name: "乐山", code: 101271401, py: "LS" },
            { name: "眉山", code: 101271501, py: "MS" },
            { name: "凉山", code: 101271601, py: "LS" },
            { name: "雅安", code: 101271701, py: "YA" },
            { name: "甘孜", code: 101271801, py: "GZ" },
            { name: "阿坝", code: 101271901, py: "AB" },
            { name: "德阳", code: 101272001, py: "DY" },
            { name: "广元", code: 101272101, py: "GY" },
            { name: "攀枝花", code: 101270201, py: "PZH" }
        ]
    },
    {
        name: "宁夏", citys: [
            { name: "银川", code: 101170101, py: "YC" },
            { name: "中卫", code: 101170501, py: "ZW" },
            { name: "固原", code: 101170401, py: "GY" },
            { name: "石嘴山", code: 101170201, py: "SZS" },
            { name: "吴忠", code: 101170301, py: "WZ" }
        ]
    },
    {
        name: "青海", citys: [
            { name: "西宁", code: 101150101, py: "XN" },
            { name: "黄南", code: 101150301, py: "HN" },
            { name: "海北", code: 101150801, py: "HB" },
            { name: "果洛", code: 101150501, py: "GL" },
            { name: "玉树", code: 101150601, py: "YS" },
            { name: "海西", code: 101150701, py: "HX" },
            { name: "海东", code: 101150201, py: "HD" },
            { name: "海南", code: 101150401, py: "HN" }
        ]
    },
    {
        name: "山东", citys: [
            { name: "济南", code: 101120101, py: "JN" },
            { name: "潍坊", code: 101120601, py: "WF" },
            { name: "临沂", code: 101120901, py: "LY" },
            { name: "菏泽", code: 101121001, py: "HZ" },
            { name: "滨州", code: 101121101, py: "BZ" },
            { name: "东营", code: 101121201, py: "DY" },
            { name: "威海", code: 101121301, py: "WH" },
            { name: "枣庄", code: 101121401, py: "ZZ" },
            { name: "日照", code: 101121501, py: "RZ" },
            { name: "莱芜", code: 101121601, py: "LW" },
            { name: "聊城", code: 101121701, py: "LC" },
            { name: "青岛", code: 101120201, py: "QD" },
            { name: "淄博", code: 101120301, py: "ZB" },
            { name: "德州", code: 101120401, py: "DZ" },
            { name: "烟台", code: 101120501, py: "YT" },
            { name: "济宁", code: 101120701, py: "JN" },
            { name: "泰安", code: 101120801, py: "TA" }
        ]
    },
    {
        name: "陕西", citys: [
            { name: "西安", code: 101110101, py: "XA" },
            { name: "延安", code: 101110300, py: "YA" },
            { name: "榆林", code: 101110401, py: "YL" },
            { name: "铜川", code: 101111001, py: "TC" },
            { name: "商洛", code: 101110601, py: "SL" },
            { name: "安康", code: 101110701, py: "AK" },
            { name: "汉中", code: 101110801, py: "HZ" },
            { name: "宝鸡", code: 101110901, py: "BJ" },
            { name: "咸阳", code: 101110200, py: "XY" },
            { name: "渭南", code: 101110501, py: "WN" }
        ]
    },
    {
        name: "山西", citys: [
            { name: "太原", code: 101100101, py: "TY" },
            { name: "临汾", code: 101100701, py: "LF" },
            { name: "运城", code: 101100801, py: "YC" },
            { name: "朔州", code: 101100901, py: "SZ" },
            { name: "忻州", code: 101101001, py: "XZ" },
            { name: "长治", code: 101100501, py: "CZ" },
            { name: "大同", code: 101100201, py: "DT" },
            { name: "阳泉", code: 101100301, py: "YQ" },
            { name: "晋中", code: 101100401, py: "JZ" },
            { name: "晋城", code: 101100601, py: "JC" },
            { name: "吕梁", code: 101101100, py: "LL" }
        ]
    },
    {
        name: "新疆", citys: [
            { name: "乌鲁木齐", code: 101130101, py: "WLMQ" },
            { name: "石河子", code: 101130301, py: "SHZ" },
            { name: "昌吉", code: 101130401, py: "CJ" },
            { name: "吐鲁番", code: 101130501, py: "TLF" },
            { name: "库尔勒", code: 101130601, py: "KEL" },
            { name: "阿拉尔", code: 101130701, py: "ALE" },
            { name: "阿克苏", code: 101130801, py: "AKS" },
            { name: "喀什", code: 101130901, py: "KS" },
            { name: "伊宁", code: 101131001, py: "YN" },
            { name: "塔城", code: 101131101, py: "TC" },
            { name: "哈密", code: 101131201, py: "HM" },
            { name: "和田", code: 101131301, py: "HT" },
            { name: "阿勒泰", code: 101131401, py: "ALT" },
            { name: "阿图什", code: 101131501, py: "ATS" },
            { name: "博乐", code: 101131601, py: "BL" },
            { name: "克拉玛依", code: 101130201, py: "KLMY" }
        ]
    },
    {
        name: "西藏", citys: [
            { name: "拉萨", code: 101140101, py: "LS" },
            { name: "山南", code: 101140301, py: "SN" },
            { name: "阿里", code: 101140701, py: "AL" },
            { name: "昌都", code: 101140501, py: "CD" },
            { name: "那曲", code: 101140601, py: "NQ" },
            { name: "日喀则", code: 101140201, py: "RKZ" },
            { name: "林芝", code: 101140401, py: "LZ" }
        ]
    },
    {
        name: "台湾", citys: [
            { name: "台北县", code: 101340101, py: "TBX" },
            { name: "高雄", code: 101340201, py: "GX" },
            { name: "台中", code: 101340401, py: "TZ" }
        ]
    },
    {
        name: "海南", citys: [
            { name: "海口", code: 101310101, py: "HK" },
            { name: "三亚", code: 101310201, py: "SY" },
            { name: "东方", code: 101310202, py: "DF" },
            { name: "临高", code: 101310203, py: "LG" },
            { name: "澄迈", code: 101310204, py: "CM" },
            { name: "儋州", code: 101310205, py: "DZ" },
            { name: "昌江", code: 101310206, py: "CJ" },
            { name: "白沙", code: 101310207, py: "BS" },
            { name: "琼中", code: 101310208, py: "QZ" },
            { name: "定安", code: 101310209, py: "DA" },
            { name: "屯昌", code: 101310210, py: "TC" },
            { name: "琼海", code: 101310211, py: "QH" },
            { name: "文昌", code: 101310212, py: "WC" },
            { name: "保亭", code: 101310214, py: "BT" },
            { name: "万宁", code: 101310215, py: "WN" },
            { name: "陵水", code: 101310216, py: "LS" },
            { name: "西沙", code: 101310217, py: "XS" },
            { name: "南沙岛", code: 101310220, py: "NSD" },
            { name: "乐东", code: 101310221, py: "LD" },
            { name: "五指山", code: 101310222, py: "WZS" },
            { name: "琼山", code: 101310102, py: "QS" }
        ]
    },
    {
        name: "湖南", citys: [
            { name: "长沙", code: 101250101, py: "CS" },
            { name: "株洲", code: 101250301, py: "ZZ" },
            { name: "衡阳", code: 101250401, py: "HY" },
            { name: "郴州", code: 101250501, py: "CZ" },
            { name: "常德", code: 101250601, py: "CD" },
            { name: "益阳", code: 101250700, py: "YY" },
            { name: "娄底", code: 101250801, py: "LD" },
            { name: "邵阳", code: 101250901, py: "SY" },
            { name: "岳阳", code: 101251001, py: "YY" },
            { name: "张家界", code: 101251101, py: "ZJJ" },
            { name: "怀化", code: 101251201, py: "HH" },
            { name: "黔阳", code: 101251301, py: "QY" },
            { name: "永州", code: 101251401, py: "YZ" },
            { name: "吉首", code: 101251501, py: "JS" },
            { name: "湘潭", code: 101250201, py: "XT" }
        ]
    },
    {
        name: "江苏", citys: [
            { name: "南京", code: 101190101, py: "NJ" },
            { name: "镇江", code: 101190301, py: "ZJ" },
            { name: "苏州", code: 101190401, py: "SZ" },
            { name: "南通", code: 101190501, py: "NT" },
            { name: "扬州", code: 101190601, py: "YZ" },
            { name: "宿迁", code: 101191301, py: "SQ" },
            { name: "徐州", code: 101190801, py: "XZ" },
            { name: "淮安", code: 101190901, py: "HA" },
            { name: "连云港", code: 101191001, py: "LYG" },
            { name: "常州", code: 101191101, py: "CZ" },
            { name: "泰州", code: 101191201, py: "TZ" },
            { name: "无锡", code: 101190201, py: "WX" },
            { name: "盐城", code: 101190701, py: "YC" }
        ]
    },
    {
        name: "黑龙江", citys: [
            { name: "哈尔滨", code: 101050101, py: "HEB" },
            { name: "牡丹江", code: 101050301, py: "MDJ" },
            { name: "佳木斯", code: 101050401, py: "JMS" },
            { name: "绥化", code: 101050501, py: "SH" },
            { name: "黑河", code: 101050601, py: "HH" },
            { name: "双鸭山", code: 101051301, py: "SYS" },
            { name: "伊春", code: 101050801, py: "YC" },
            { name: "大庆", code: 101050901, py: "DQ" },
            { name: "七台河", code: 101051002, py: "QTH" },
            { name: "鸡西", code: 101051101, py: "JX" },
            { name: "鹤岗", code: 101051201, py: "HG" },
            { name: "齐齐哈尔", code: 101050201, py: "QQHE" },
            { name: "大兴安岭", code: 101050701, py: "DXAL" }
        ]
    },
    {
        name: "吉林", citys: [
            { name: "长春", code: 101060101, py: "CC" },
            { name: "延吉", code: 101060301, py: "YJ" },
            { name: "四平", code: 101060401, py: "SP" },
            { name: "白山", code: 101060901, py: "BS" },
            { name: "白城", code: 101060601, py: "BC" },
            { name: "辽源", code: 101060701, py: "LY" },
            { name: "松原", code: 101060801, py: "SY" },
            { name: "吉林", code: 101060201, py: "JL" },
            { name: "通化", code: 101060501, py: "TH" }
        ]
    },
    {
        name: "辽宁", citys: [
            { name: "沈阳", code: 101070101, py: "SY" },
            { name: "鞍山", code: 101070301, py: "AS" },
            { name: "抚顺", code: 101070401, py: "FS" },
            { name: "本溪", code: 101070501, py: "BX" },
            { name: "丹东", code: 101070601, py: "DD" },
            { name: "葫芦岛", code: 101071401, py: "HLD" },
            { name: "营口", code: 101070801, py: "YK" },
            { name: "阜新", code: 101070901, py: "FX" },
            { name: "辽阳", code: 101071001, py: "LY" },
            { name: "铁岭", code: 101071101, py: "TL" },
            { name: "朝阳", code: 101071201, py: "CY" },
            { name: "盘锦", code: 101071301, py: "PJ" },
            { name: "大连", code: 101070201, py: "DL" },
            { name: "锦州", code: 101070701, py: "JZ" }
        ]
    }
];