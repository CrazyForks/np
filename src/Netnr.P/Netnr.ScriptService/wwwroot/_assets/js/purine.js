﻿var agg = {
    grid: null,
    gbox: document.querySelector('.grid'),
    init: function () {
        agg.bindGrid();
    },

    bindGrid: function () {

        var data = [
            {
              "type": "主食类",
              "food": "牛奶",
              "number": 1.4
            },
            {
              "type": "主食类",
              "food": "皮蛋白",
              "number": 2
            },
            {
              "type": "主食类",
              "food": "红薯",
              "number": 2.4
            },
            {
              "type": "主食类",
              "food": "鸡蛋黄",
              "number": 2.6
            },
            {
              "type": "主食类",
              "food": "荸荠",
              "number": 2.6
            },
            {
              "type": "主食类",
              "food": "鸭蛋黄",
              "number": 3.2
            },
            {
              "type": "主食类",
              "food": "土豆",
              "number": 3.6
            },
            {
              "type": "主食类",
              "food": "鸭蛋白",
              "number": 3.4
            },
            {
              "type": "主食类",
              "food": "鸡蛋白",
              "number": 3.7
            },
            {
              "type": "主食类",
              "food": "树薯粉",
              "number": 6
            },
            {
              "type": "主食类",
              "food": "皮蛋黄",
              "number": 6.6
            },
            {
              "type": "主食类",
              "food": "小米",
              "number": 7.3
            },
            {
              "type": "主食类",
              "food": "冬粉",
              "number": 7.8
            },
            {
              "type": "主食类",
              "food": "玉米",
              "number": 9.4
            },
            {
              "type": "主食类",
              "food": "高粱",
              "number": 9.7
            },
            {
              "type": "主食类",
              "food": "芋头",
              "number": 10.1
            },
            {
              "type": "主食类",
              "food": "米粉",
              "number": 11.1
            },
            {
              "type": "主食类",
              "food": "小麦",
              "number": 12.1
            },
            {
              "type": "主食类",
              "food": "淀粉",
              "number": 14.8
            },
            {
              "type": "主食类",
              "food": "脱脂奶",
              "number": 15.7
            },
            {
              "type": "主食类",
              "food": "通心粉",
              "number": 16.5
            },
            {
              "type": "主食类",
              "food": "面粉",
              "number": 17.1
            },
            {
              "type": "主食类",
              "food": "糯米",
              "number": 17.7
            },
            {
              "type": "主食类",
              "food": "大米",
              "number": 18.1
            },
            {
              "type": "主食类",
              "food": "面条",
              "number": 19.8
            },
            {
              "type": "主食类",
              "food": "糙米",
              "number": 22.4
            },
            {
              "type": "主食类",
              "food": "麦片",
              "number": 24.4
            },
            {
              "type": "主食类",
              "food": "薏米",
              "number": 25
            },
            {
              "type": "主食类",
              "food": "燕麦",
              "number": 25
            },
            {
              "type": "主食类",
              "food": "大豆",
              "number": 27
            },
            {
              "type": "主食类",
              "food": "豆浆",
              "number": 27.7
            },
            {
              "type": "主食类",
              "food": "红豆",
              "number": 53.2
            },
            {
              "type": "主食类",
              "food": "米糠",
              "number": 54
            },
            {
              "type": "主食类",
              "food": "豆腐",
              "number": 55.5
            },
            {
              "type": "主食类",
              "food": "熏豆干",
              "number": 63.6
            },
            {
              "type": "主食类",
              "food": "豆腐干",
              "number": 66.5
            },
            {
              "type": "主食类",
              "food": "绿豆",
              "number": 75.1
            },
            {
              "type": "主食类",
              "food": "黄豆",
              "number": 116.5
            },
            {
              "type": "主食类",
              "food": "黑豆",
              "number": 137.4
            },
            {
              "type": "海鲜水产类",
              "food": "海参",
              "number": 4.2
            },
            {
              "type": "海鲜水产类",
              "food": "海蜇皮",
              "number": 9.3
            },
            {
              "type": "海鲜水产类",
              "food": "桂鱼",
              "number": 24
            },
            {
              "type": "海鲜水产类",
              "food": "金枪鱼",
              "number": 60
            },
            {
              "type": "海鲜水产类",
              "food": "鱼丸",
              "number": 63.2
            },
            {
              "type": "海鲜水产类",
              "food": "鲑鱼",
              "number": 70
            },
            {
              "type": "海鲜水产类",
              "food": "鲈鱼",
              "number": 70
            },
            {
              "type": "海鲜水产类",
              "food": "鲨鱼皮",
              "number": 73.2
            },
            {
              "type": "海鲜水产类",
              "food": "螃蟹",
              "number": 81.6
            },
            {
              "type": "海鲜水产类",
              "food": "乌贼",
              "number": 89.8
            },
            {
              "type": "海鲜水产类",
              "food": "鳝鱼",
              "number": 92.8
            },
            {
              "type": "海鲜水产类",
              "food": "鳕鱼",
              "number": 109
            },
            {
              "type": "海鲜水产类",
              "food": "旗鱼",
              "number": 109.8
            },
            {
              "type": "海鲜水产类",
              "food": "鱼翅",
              "number": 110.6
            },
            {
              "type": "海鲜水产类",
              "food": "鲍鱼",
              "number": 112.4
            },
            {
              "type": "海鲜水产类",
              "food": "鳗鱼",
              "number": 113.1
            },
            {
              "type": "海鲜水产类",
              "food": "蚬子",
              "number": 114
            },
            {
              "type": "海鲜水产类",
              "food": "大比目鱼",
              "number": 125
            },
            {
              "type": "海鲜水产类",
              "food": "刀鱼",
              "number": 134.9
            },
            {
              "type": "海鲜水产类",
              "food": "鲫鱼",
              "number": 137.1
            },
            {
              "type": "海鲜水产类",
              "food": "鲤鱼",
              "number": 137.1
            },
            {
              "type": "海鲜水产类",
              "food": "虾",
              "number": 137.7
            },
            {
              "type": "海鲜水产类",
              "food": "草鱼",
              "number": 140.3
            },
            {
              "type": "海鲜水产类",
              "food": "黑鲳鱼",
              "number": 140.3
            },
            {
              "type": "海鲜水产类",
              "food": "红鲋",
              "number": 140.3
            },
            {
              "type": "海鲜水产类",
              "food": "黑鳝",
              "number": 140.6
            },
            {
              "type": "海鲜水产类",
              "food": "吞拿鱼",
              "number": 142
            },
            {
              "type": "海鲜水产类",
              "food": "鱼子酱",
              "number": 144
            },
            {
              "type": "海鲜水产类",
              "food": "海鳗",
              "number": 159.5
            },
            {
              "type": "海鲜水产类",
              "food": "草虾",
              "number": 162
            },
            {
              "type": "海鲜水产类",
              "food": "鲨鱼",
              "number": 166.8
            },
            {
              "type": "海鲜水产类",
              "food": "虱目鱼",
              "number": 180
            },
            {
              "type": "海鲜水产类",
              "food": "乌鱼",
              "number": 183.2
            },
            {
              "type": "海鲜水产类",
              "food": "鲭鱼",
              "number": 194
            },
            {
              "type": "海鲜水产类",
              "food": "吴郭鱼",
              "number": 199.4
            },
            {
              "type": "海鲜水产类",
              "food": "四破鱼",
              "number": 217.5
            },
            {
              "type": "海鲜水产类",
              "food": "白鲳鱼",
              "number": 238.1
            },
            {
              "type": "海鲜水产类",
              "food": "牡蛎",
              "number": 239
            },
            {
              "type": "海鲜水产类",
              "food": "生蚝",
              "number": 239
            },
            {
              "type": "海鲜水产类",
              "food": "鲭鱼罐装",
              "number": 246
            },
            {
              "type": "海鲜水产类",
              "food": "鲺鱼泥",
              "number": 247.3
            },
            {
              "type": "海鲜水产类",
              "food": "吻仔鱼",
              "number": 284.2
            },
            {
              "type": "海鲜水产类",
              "food": "蛙鱼",
              "number": 297
            },
            {
              "type": "海鲜水产类",
              "food": "蛤蜊",
              "number": 316
            },
            {
              "type": "海鲜水产类",
              "food": "沙丁鱼",
              "number": 345
            },
            {
              "type": "海鲜水产类",
              "food": "秋刀鱼",
              "number": 355.4
            },
            {
              "type": "海鲜水产类",
              "food": "皮刀鱼",
              "number": 355.4
            },
            {
              "type": "海鲜水产类",
              "food": "凤尾鱼",
              "number": 363
            },
            {
              "type": "海鲜水产类",
              "food": "扁鱼干",
              "number": 366.7
            },
            {
              "type": "海鲜水产类",
              "food": "青鱼",
              "number": 378
            },
            {
              "type": "海鲜水产类",
              "food": "鲱鱼",
              "number": 378
            },
            {
              "type": "海鲜水产类",
              "food": "干贝",
              "number": 390
            },
            {
              "type": "海鲜水产类",
              "food": "白带鱼",
              "number": 391.6
            },
            {
              "type": "海鲜水产类",
              "food": "带鱼",
              "number": 391.6
            },
            {
              "type": "海鲜水产类",
              "food": "蚌蛤",
              "number": 436.3
            },
            {
              "type": "海鲜水产类",
              "food": "熏鲱鱼",
              "number": 840
            },
            {
              "type": "海鲜水产类",
              "food": "小鱼干",
              "number": 1538.9
            },
            {
              "type": "海鲜水产类",
              "food": "白带鱼皮",
              "number": 3509
            },
            {
              "type": "动物肉类",
              "food": "猪血",
              "number": 11.8
            },
            {
              "type": "动物肉类",
              "food": "猪皮",
              "number": 29.8
            },
            {
              "type": "动物肉类",
              "food": "火腿",
              "number": 55
            },
            {
              "type": "动物肉类",
              "food": "猪心",
              "number": 65.3
            },
            {
              "type": "动物肉类",
              "food": "猪脑",
              "number": 66.3
            },
            {
              "type": "动物肉类",
              "food": "牛肚",
              "number": 79
            },
            {
              "type": "动物肉类",
              "food": "鸽子",
              "number": 80
            },
            {
              "type": "动物肉类",
              "food": "牛肉",
              "number": 83.7
            },
            {
              "type": "动物肉类",
              "food": "兔肉",
              "number": 107.6
            },
            {
              "type": "动物肉类",
              "food": "羊肉",
              "number": 111.5
            },
            {
              "type": "动物肉类",
              "food": "鸭肠",
              "number": 121
            },
            {
              "type": "动物肉类",
              "food": "瘦猪肉",
              "number": 122.5
            },
            {
              "type": "动物肉类",
              "food": "鸡胸肉",
              "number": 137.4
            },
            {
              "type": "动物肉类",
              "food": "鸭肫",
              "number": 137.4
            },
            {
              "type": "动物肉类",
              "food": "鹿肉",
              "number": 138
            },
            {
              "type": "动物肉类",
              "food": "鸡肫",
              "number": 138.4
            },
            {
              "type": "动物肉类",
              "food": "鸭肉",
              "number": 165
            },
            {
              "type": "动物肉类",
              "food": "猪肝",
              "number": 169.5
            },
            {
              "type": "动物肉类",
              "food": "牛肝",
              "number": 169.5
            },
            {
              "type": "动物肉类",
              "food": "马肉",
              "number": 200
            },
            {
              "type": "动物肉类",
              "food": "猪大肠",
              "number": 262.2
            },
            {
              "type": "动物肉类",
              "food": "猪小肠",
              "number": 262.2
            },
            {
              "type": "动物肉类",
              "food": "猪脾",
              "number": 270.6
            },
            {
              "type": "动物肉类",
              "food": "鸡肝",
              "number": 293.5
            },
            {
              "type": "动物肉类",
              "food": "鸭肝",
              "number": 301.5
            },
            {
              "type": "动物肉类",
              "food": "熏羊脾",
              "number": 773
            },
            {
              "type": "动物肉类",
              "food": "小牛颈肉",
              "number": 1260
            },
            {
              "type": "蔬菜类",
              "food": "冬瓜",
              "number": 2.8
            },
            {
              "type": "蔬菜类",
              "food": "南瓜",
              "number": 2.8
            },
            {
              "type": "蔬菜类",
              "food": "洋葱",
              "number": 2.4
            },
            {
              "type": "蔬菜类",
              "food": "鸡蛋黄",
              "number": 2.6
            },
            {
              "type": "蔬菜类",
              "food": "姜",
              "number": 5.3
            },
            {
              "type": "蔬菜类",
              "food": "葫芦",
              "number": 7.2
            },
            {
              "type": "蔬菜类",
              "food": "萝卜",
              "number": 7.5
            },
            {
              "type": "蔬菜类",
              "food": "胡瓜",
              "number": 8.2
            },
            {
              "type": "蔬菜类",
              "food": "酸菜类",
              "number": 8.6
            },
            {
              "type": "蔬菜类",
              "food": "腌菜类",
              "number": 8.6
            },
            {
              "type": "蔬菜类",
              "food": "苋菜",
              "number": 8.7
            },
            {
              "type": "蔬菜类",
              "food": "葱头",
              "number": 8.7
            },
            {
              "type": "蔬菜类",
              "food": "青椒",
              "number": 8.7
            },
            {
              "type": "蔬菜类",
              "food": "蒜头",
              "number": 8.7
            },
            {
              "type": "蔬菜类",
              "food": "黑木耳",
              "number": 8.8
            },
            {
              "type": "蔬菜类",
              "food": "胡萝卜",
              "number": 8.9
            },
            {
              "type": "蔬菜类",
              "food": "圆白菜",
              "number": 9.7
            },
            {
              "type": "蔬菜类",
              "food": "榨菜",
              "number": 10.2
            },
            {
              "type": "蔬菜类",
              "food": "苦瓜",
              "number": 11.3
            },
            {
              "type": "蔬菜类",
              "food": "丝瓜",
              "number": 11.4
            },
            {
              "type": "蔬菜类",
              "food": "荠菜",
              "number": 12.4
            },
            {
              "type": "蔬菜类",
              "food": "芥菜",
              "number": 12.4
            },
            {
              "type": "蔬菜类",
              "food": "包心菜",
              "number": 12.4
            },
            {
              "type": "蔬菜类",
              "food": "芹菜",
              "number": 12.4
            },
            {
              "type": "蔬菜类",
              "food": "白菜",
              "number": 12.6
            },
            {
              "type": "蔬菜类",
              "food": "青葱",
              "number": 13
            },
            {
              "type": "蔬菜类",
              "food": "菠菜",
              "number": 13.3
            },
            {
              "type": "蔬菜类",
              "food": "辣椒",
              "number": 14.2
            },
            {
              "type": "蔬菜类",
              "food": "茄子",
              "number": 14.3
            },
            {
              "type": "蔬菜类",
              "food": "小黄瓜",
              "number": 14.6
            },
            {
              "type": "蔬菜类",
              "food": "生菜",
              "number": 15.2
            },
            {
              "type": "蔬菜类",
              "food": "青蒿",
              "number": 16.3
            },
            {
              "type": "蔬菜类",
              "food": "韭黄",
              "number": 16.8
            },
            {
              "type": "蔬菜类",
              "food": "空心菜",
              "number": 17.5
            },
            {
              "type": "蔬菜类",
              "food": "芥兰菜",
              "number": 18.5
            },
            {
              "type": "蔬菜类",
              "food": "韭菜花",
              "number": 19.5
            },
            {
              "type": "蔬菜类",
              "food": "芫荽",
              "number": 20.2
            },
            {
              "type": "蔬菜类",
              "food": "雪里蕻",
              "number": 24.4
            },
            {
              "type": "蔬菜类",
              "food": "韭菜",
              "number": 25
            },
            {
              "type": "蔬菜类",
              "food": "鲍鱼菇",
              "number": 26.7
            },
            {
              "type": "蔬菜类",
              "food": "蘑菇",
              "number": 28.4
            },
            {
              "type": "蔬菜类",
              "food": "生竹笋",
              "number": 29
            },
            {
              "type": "蔬菜类",
              "food": "四季豆",
              "number": 29.7
            },
            {
              "type": "蔬菜类",
              "food": "油菜",
              "number": 30.2
            },
            {
              "type": "蔬菜类",
              "food": "皇帝豆",
              "number": 32.2
            },
            {
              "type": "蔬菜类",
              "food": "茼蒿菜",
              "number": 33.4
            },
            {
              "type": "蔬菜类",
              "food": "九层塔",
              "number": 33.9
            },
            {
              "type": "蔬菜类",
              "food": "大蒜",
              "number": 38.2
            },
            {
              "type": "蔬菜类",
              "food": "大葱",
              "number": 38.2
            },
            {
              "type": "蔬菜类",
              "food": "海藻",
              "number": 44.2
            },
            {
              "type": "蔬菜类",
              "food": "笋干",
              "number": 53.6
            },
            {
              "type": "蔬菜类",
              "food": "花豆",
              "number": 57
            },
            {
              "type": "蔬菜类",
              "food": "菜豆",
              "number": 58.2
            },
            {
              "type": "蔬菜类",
              "food": "金针菇",
              "number": 60.9
            },
            {
              "type": "蔬菜类",
              "food": "海带",
              "number": 96.6
            },
            {
              "type": "蔬菜类",
              "food": "绿豆芽",
              "number": 166
            },
            {
              "type": "蔬菜类",
              "food": "香菇",
              "number": 214
            },
            {
              "type": "蔬菜类",
              "food": "紫菜",
              "number": 274
            },
            {
              "type": "蔬菜类",
              "food": "黄豆芽",
              "number": 500
            },
            {
              "type": "蔬菜类",
              "food": "芦笋",
              "number": 500
            },
            {
              "type": "蔬菜类",
              "food": "豆苗菜",
              "number": 500
            },
            {
              "type": "水果干果类",
              "food": "杏子",
              "number": 0.1
            },
            {
              "type": "水果干果类",
              "food": "石榴",
              "number": 0.8
            },
            {
              "type": "水果干果类",
              "food": "凤梨",
              "number": 0.9
            },
            {
              "type": "水果干果类",
              "food": "菠萝",
              "number": 0.9
            },
            {
              "type": "水果干果类",
              "food": "葡萄",
              "number": 0.9
            },
            {
              "type": "水果干果类",
              "food": "苹果",
              "number": 0.9
            },
            {
              "type": "水果干果类",
              "food": "香蕉",
              "number": 1.2
            },
            {
              "type": "水果干果类",
              "food": "桃子",
              "number": 1.3
            },
            {
              "type": "水果干果类",
              "food": "枇杷",
              "number": 1.3
            },
            {
              "type": "水果干果类",
              "food": "杨桃",
              "number": 1.4
            },
            {
              "type": "水果干果类",
              "food": "莲蓬",
              "number": 1.5
            },
            {
              "type": "水果干果类",
              "food": "木瓜",
              "number": 1.6
            },
            {
              "type": "水果干果类",
              "food": "芒果",
              "number": 2
            },
            {
              "type": "水果干果类",
              "food": "橙子",
              "number": 3
            },
            {
              "type": "水果干果类",
              "food": "桔子",
              "number": 3
            },
            {
              "type": "水果干果类",
              "food": "柠檬",
              "number": 3.4
            },
            {
              "type": "水果干果类",
              "food": "哈密瓜",
              "number": 4
            },
            {
              "type": "水果干果类",
              "food": "李子",
              "number": 4.2
            },
            {
              "type": "水果干果类",
              "food": "番石榴",
              "number": 4.8
            },
            {
              "type": "水果干果类",
              "food": "葡萄干",
              "number": 5.4
            },
            {
              "type": "水果干果类",
              "food": "红枣",
              "number": 6
            },
            {
              "type": "水果干果类",
              "food": "小番茄",
              "number": 7.6
            },
            {
              "type": "水果干果类",
              "food": "黑枣",
              "number": 8.3
            },
            {
              "type": "水果干果类",
              "food": "核桃",
              "number": 8.4
            },
            {
              "type": "水果干果类",
              "food": "龙眼干",
              "number": 8.6
            },
            {
              "type": "水果干果类",
              "food": "桂圆干",
              "number": 8.6
            },
            {
              "type": "水果干果类",
              "food": "大樱桃",
              "number": 17
            },
            {
              "type": "水果干果类",
              "food": "草莓",
              "number": 21
            },
            {
              "type": "水果干果类",
              "food": "瓜子",
              "number": 24.2
            },
            {
              "type": "水果干果类",
              "food": "杏仁",
              "number": 31.7
            },
            {
              "type": "水果干果类",
              "food": "栗子",
              "number": 34.6
            },
            {
              "type": "水果干果类",
              "food": "腰果",
              "number": 80.5
            },
            {
              "type": "水果干果类",
              "food": "花生",
              "number": 96.3
            },
            {
              "type": "水果干果类",
              "food": "干葵花籽",
              "number": 143
            },
            {
              "type": "佐料类",
              "food": "蜂蜜",
              "number": 1.2
            },
            {
              "type": "佐料类",
              "food": "米醋",
              "number": 1.5
            },
            {
              "type": "佐料类",
              "food": "糯米醋",
              "number": 1.5
            },
            {
              "type": "佐料类",
              "food": "果酱",
              "number": 1.9
            },
            {
              "type": "佐料类",
              "food": "番茄酱",
              "number": 3
            },
            {
              "type": "佐料类",
              "food": "粉丝",
              "number": 3.8
            },
            {
              "type": "佐料类",
              "food": "冬瓜糖",
              "number": 7.1
            },
            {
              "type": "佐料类",
              "food": "味精",
              "number": 12.3
            },
            {
              "type": "佐料类",
              "food": "酱油",
              "number": 25
            },
            {
              "type": "佐料类",
              "food": "枸杞",
              "number": 31.7
            },
            {
              "type": "佐料类",
              "food": "味噌",
              "number": 34.3
            },
            {
              "type": "佐料类",
              "food": "莲子",
              "number": 40.9
            },
            {
              "type": "佐料类",
              "food": "黑芝麻",
              "number": 57
            },
            {
              "type": "佐料类",
              "food": "白芝麻",
              "number": 89.5
            },
            {
              "type": "佐料类",
              "food": "银耳",
              "number": 98.9
            },
            {
              "type": "佐料类",
              "food": "白木",
              "number": 98.9
            },
            {
              "type": "佐料类",
              "food": "鸡肉汤",
              "number": 500
            },
            {
              "type": "佐料类",
              "food": "鸡精",
              "number": 500
            },
            {
              "type": "佐料类",
              "food": "浓肉汁",
              "number": 500
            },
            {
              "type": "佐料类",
              "food": "麦芽",
              "number": 500
            },
            {
              "type": "佐料类",
              "food": "发芽豆类",
              "number": 500
            },
            {
              "type": "佐料类",
              "food": "酵母粉",
              "number": 559.1
            }
          ];

        data.forEach(d => {
            d.rank = "低";
            d.class = "green";
            if (d.number > 25) {
                d.rank = "中";
                d.class = "orange";
            }
            if (d.number > 150) {
                d.rank = "高";
                d.class = "red";
            }
            d.rank += "嘌呤";
        })

        var gridOptions = {
            columnDefs: [
                {
                    headerName: "#", width: 80, pinned: "left", sortable: false,
                    cellRenderer: function (params) {
                        return `<b class="text-dark">${params.node.rowIndex + 1}</b>`
                    },
                    menuTabs: ['generalMenuTab', 'columnsMenuTab']
                },
                {
                    field: "type", headerName: "分类", enableRowGroup: true
                },
                {
                    field: "food", headerName: "食物"
                },
                {
                    field: "number", headerName: "含量", filter: "agNumberColumnFilter",
                    filterParams: {
                        filterOptions: ['lessThanOrEqual', 'greaterThanOrEqual', 'inRange'],
                        buttons: ['reset', 'apply']
                    }
                },
                {
                    field: "rank", headerName: "等级", enableRowGroup: true
                }
            ],
            rowData: data,
            suppressDragLeaveHidesColumns: true,
            suppressMakeColumnVisibleAfterUnGroup: true,
            rowGroupPanelShow: 'always',
            enableRangeSelection: true,
            defaultColDef: ss.agg.defaultColDef,
            localeText: ss.agg.localeText,
            getRowStyle: function (item) {
                if (item.data) {
                    return {
                        "color": item.data.class
                    }
                }
            },
            onGridReady: function () {
                //表格创建完成后执行的事件
                //gridOptions.api.sizeColumnsToFit();//调整表格大小自适应
            }
        };

        agg.grid = new agGrid.Grid(agg.gbox, gridOptions);

        agg.resize();
        $(window).resize(agg.resize);
    },

    resize: function () {
        var h = $(window).height() - $(agg.gbox).offset().top - 15;
        agg.gbox.style.height = h + "px";
    }
}

agg.init();