
// 表格模板

// 中频生产表格
let editor3_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": [100, 80, 80, 80, 90, 100, 80, 90, 120 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 6, "type": "text", "name": null, "key": null, "value": "生产过程填写",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "leader", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "领料日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "生产者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "机器编码",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "sn", "type": "sn", "key": null,  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "物料核对及备注",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "液晶屏型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "screenVer", "type": "textfield", "key": null,  "value": "威伦屏 TK6071", "placeholder": "液晶屏型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "screenNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "screenRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "滤波电容型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "lcapVer", "type": "textfield", "key": null,  "value": "SHP900V-850", "placeholder": "滤波电容型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lcapNum", "type": "textfield", "key": null,  "value": "3", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lcapRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "吸收电容型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "xcapVer", "type": "textfield", "key": null,  "value": "1UF/1200V", "placeholder": "吸收电容型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "xcapNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "xcapRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "可控硅模块",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "silicon", "type": "textfield", "key": null,  "value": "160SKKH", "placeholder": "可控硅模块" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "siliconNum", "type": "textfield", "key": null,  "value": "3", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "siliconRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "风扇型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "fanVer", "type": "textfield", "key": null,  "value": "9225 DC24V", "placeholder": "风扇型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "fanNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "fanRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "开关电源型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "switchVer", "type": "textfield", "key": null,  "value": "DRH-120-24", "placeholder": "开关电源型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "switchNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "switchRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "IGBT型号",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "igbtState", "key": "igbtOptions", "value": "300",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "textfield", "name": "igbtNum", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "textfield", "name": "igbtRemark", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流霍尔型号",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "lemState", "key": "lemOptions", "value": "300",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "textfield", "name": "lemNum", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "textfield", "name": "lemRemark", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "主板型号",}, 
                    { "rowspan": 1, "cellspan": 6, "name": "boardVer", "type": "textfield", "key": null,  "value": "MINI-MFVF3C-CTR(V0.4)180912", "placeholder": "主板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "boardRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "检查",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "门极板型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "craneVer", "type": "textfield", "key": null,  "value": "ZFSD0115+", "placeholder": "门极板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "充电电阻型号",}, 
                    { "rowspan": 1, "cellspan": 3, "name": "eresisVer", "type": "textfield", "key": null,  "value": "80W 330R", "placeholder": "充电电阻型号" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "滤波板型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "lbbVer", "type": "textfield", "key": null,  "value": "Lightning(V0.4)-180105", "placeholder": "滤波板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "泄放电阻型号",}, 
                    { "rowspan": 1, "cellspan": 3, "name": "xresisVer", "type": "textfield", "key": null,  "value": "10K 100V", "placeholder": "泄放电阻型号" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "空气开关状态",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "airSwitchState", "key": "hasOptions", "value": "无",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "型号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "airSwitchVer", "type": "textfield", "key": null,  "value": "", "placeholder": "型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "操作机构",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "airSwitchFrom", "type": "textfield", "key": null,  "value": "", "placeholder": "操作机构" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "安装方式",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "fitState", "key": "fitOptions", "value": "外挂",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "螺丝拧紧记号标注",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "screwState", "key": "yesOptions", "value": "是",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "壳体清洁度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "cleanState", "key": "cleanOptions", "value": "清洁",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "散热板材料",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "heatState", "key": "heatOptions", "value": "镶铜板",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "连接线牢固度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "linkState", "key": "checkOptions", "value": "已查",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "生产完成日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "finishDate", "key": null, "value": "",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "第一次检查",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "recheck", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 5, "name": "remark", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            }
        ]
    }
};

// 变压器生产表格
let editor4_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": [100, 80, 80, 80, 90, 100, 80, 90, 120 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 3, "type": "text", "name": null, "key": null, "value": "生产过程填写",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "匝数比",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "turnsState", "key": "turnsOptions", "value": "51:1",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "leader", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "领料日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "生产者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "机器编码",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "sn", "type": "sn", "key": null,  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "物料核对及备注",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "铁芯型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "ironVer", "type": "textfield", "key": null,  "value": "100A", "placeholder": "铁芯型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "ironNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "ironRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "线包型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "linesVer", "type": "textfield", "key": null,  "value": "100A", "placeholder": "线包型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "linesNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "linesRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "肖特基二极管型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "diodeVer", "type": "textfield", "key": null,  "value": "M7-DK300A", "placeholder": "肖特基二极管型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "diodeNum", "type": "textfield", "key": null,  "value": "8", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "diodeRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "温控开关型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "switchVer", "type": "textfield", "key": null,  "value": "KSD301", "placeholder": "温控开关型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "switchNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "switchRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "风扇型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "fanVer", "type": "textfield", "key": null,  "value": "220V大风扇A2175", "placeholder": "风扇型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "fanNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "fanRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "接线端子排型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "ukVer", "type": "textfield", "key": null,  "value": "TD100-2P", "placeholder": "接线端子排型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "ukNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "ukRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "端子板型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "portVer", "type": "textfield", "key": null,  "value": "Tvansformer(v102)170313", "placeholder": "端子板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "portNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "portRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "罗氏线圈线径",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "luoVer", "type": "textfield", "key": null,  "value": "0.15mm", "placeholder": "罗氏线圈线径" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "luoNum", "type": "textfield", "key": null,  "value": "2000", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "luoRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "散热板型号型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "heatbVer", "type": "textfield", "key": null,  "value": "100-B2散热器（小）", "placeholder": "散热板型号型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "heatbNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "heatbRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "检查",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "安装方式",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "fitState", "key": "fitOptions", "value": "外挂",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "螺丝拧紧记号标注",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "screwState", "key": "yesOptions", "value": "是",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "壳体清洁度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "cleanState", "key": "cleanOptions", "value": "清洁",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "是否水冷",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "heatState", "key": "yesOptions", "value": "是",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "连接线牢固度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "linkState", "key": "checkOptions", "value": "已查",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "生产完成日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "finishDate", "key": null, "value": "",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "第一次检查",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "recheck", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 5, "name": "remark", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            }
        ]
    }
};

// 控制器生产表格
let editor5_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": [100, 80, 80, 80, 90, 100, 80, 90, 120 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 3, "type": "text", "name": null, "key": null, "value": "生产过程填写",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "频率",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "freqState", "key": "freqOptions", "value": "1000HZ",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "leader", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "领料日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "生产者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "机器编码",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "sn", "type": "sn", "key": null,  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "物料核对及备注",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "液晶屏型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "screenVer", "type": "textfield", "key": null,  "value": "迪文(不带壳）", "placeholder": "液晶屏型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "screenNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "screenRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "滤波电容型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "lcapVer", "type": "textfield", "key": null,  "value": "478M00 4700UF/450VDC", "placeholder": "滤波电容型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lcapNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lcapRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "吸收电容型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "xcapVer", "type": "textfield", "key": null,  "value": "1UF/1200V", "placeholder": "吸收电容型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "xcapNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "xcapRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "可控硅模块",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "silicon", "type": "textfield", "key": null,  "value": "三相模块MDST150A", "placeholder": "可控硅模块" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "siliconNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "siliconRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "风扇型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "fanVer", "type": "textfield", "key": null,  "value": "220V小风扇DP200A 2123", "placeholder": "风扇型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "fanNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "fanRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "开关电源型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "switchVer", "type": "textfield", "key": null,  "value": "RS-150-24", "placeholder": "开关电源型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "switchNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "switchRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "IGBT型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "igbtVer", "type": "textfield", "key": null,  "value": "IGBT300VN-120-50", "placeholder": "IGBT型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "igbtNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "igbtRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "接线端子排型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "ukVer", "type": "textfield", "key": null,  "value": "TD75-4P TD100-2", "placeholder": "接线端子排型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "ukNum", "type": "textfield", "key": null,  "value": "各1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "ukRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "主板型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "boardVer", "type": "textfield", "key": null,  "value": "MINI-MFDC-VTR(V303)-171115", "placeholder": "主板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "boardNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "boardRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "门极板型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "craneVer", "type": "textfield", "key": null,  "value": "IGBT-G(V3.3)-170510", "placeholder": "门极板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "craneNum", "type": "textfield", "key": null,  "value": "2", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "craneRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "滤波板型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "lboardVer", "type": "textfield", "key": null,  "value": "Lightning(v0.4)-180105", "placeholder": "滤波板型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lboardNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lboardRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "散热板型号型号",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "heatbVer", "type": "textfield", "key": null,  "value": "100A-B1散热器（大）", "placeholder": "散热板型号型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "heatbNum", "type": "textfield", "key": null,  "value": "1", "placeholder": "数量" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "heatbRemark", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "空气开关状态",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "airSwitchState", "key": "hasOptions", "value": "无",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "型号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "airSwitchVer", "type": "textfield", "key": null,  "value": "BKN(50) AC400V", "placeholder": "型号" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "操作机构",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "airSwitchFrom", "type": "textfield", "key": null,  "value": "", "placeholder": "操作机构" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "检查",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "安装方式",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "fitState", "key": "fitOptions", "value": "外挂",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "螺丝拧紧记号标注",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "screwState", "key": "yesOptions", "value": "是",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "壳体清洁度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "cleanState", "key": "cleanOptions", "value": "清洁",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "散热板材料",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "heatState", "key": "heatOptions", "value": "镶铜板",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "连接线牢固度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "linkState", "key": "checkOptions", "value": "已查",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "生产完成日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "finishDate", "key": null, "value": "",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "remark", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            }
        ]
    }
};

// 维修表格
let editor6_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": [100, 80, 80, 80, 90, 100, 80, 90, 120 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 6, "type": "text", "name": null, "key": null, "value": "退换货流程卡"},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "返修次数"},
                    { "rowspan": 1, "cellspan": 2, "type": "select", "name": "fixTimes", "key": "times", "value": ""},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "返厂日期"},
                    { "rowspan": 1, "cellspan": 4, "type": "date", "name": "date", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "机器编码"},
                    { "rowspan": 1, "cellspan": 3, "type": "sn", "name": "sn", "key": null, "value": ""},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "客户名称"},
                    { "rowspan": 1, "cellspan": 4, "name": "company", "type": "select", "needsearch": true, "key": "company",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "返厂信息"},
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fixState", "key": "fixOptions", "value": "需维修"},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "机器型号"},
                    { "rowspan": 1, "cellspan": 4, "name": "deviceVersion", "type": "select", "key": "deviceVersion",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数量"},
                    { "rowspan": 1, "cellspan": 3, "type": "select", "name": "deviceNum", "key": "times", "value": ""},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "不良现象"},
                    { "rowspan": 1, "cellspan": 4, "name": "bads", "type": "select", "key": "badState",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "不良原因"},
                    { "rowspan": 1, "cellspan": 3, "name": "badReason", "type": "select", "key": "badReason",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "处理方式"},
                    { "rowspan": 1, "cellspan": 4, "name": "handleType", "type": "select", "key": "handleType",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "处理结果"},
                    { "rowspan": 1, "cellspan": 3, "name": "fixedState", "type": "option", "key": "fixedOptions",  "value": "可正常使用" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "完成日期"},
                    { "rowspan": 1, "cellspan": 4, "type": "date", "name": "finishDate", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "维修人员"},
                    { "rowspan": 1, "cellspan": 3, "name": "handler", "type": "select", "key": "leaders",  "value": "黄辉" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "原程序版本"},
                    { "rowspan": 1, "cellspan": 4, "name": "originClip", "type": "select", "key": "clipVersions",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "现程序版本"},
                    { "rowspan": 1, "cellspan": 3, "name": "currentClip", "type": "select", "key": "clipVersions",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "remark", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "出产前",}, 
                    { "rowspan": 4, "cellspan": 8, "name": "attachments1", "type": "image", "key": null,  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "出产后",}, 
                    { "rowspan": 4, "cellspan": 8, "name": "attachments2", "type": "image", "key": null,  "value": "" },
                ]
            },
        ]
    }
};

// 包装测试表格
let editor9_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": [120, 80, 80, 80, 90, 100, 100, 80, 90 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 6, "type": "text", "name": null, "key": null, "value": "测试过程填写",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 2, "cellspan": 2, "name": "leader", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "80分体控制器编号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "_sn1", "type": "textfield", "key": null,  "value": "", "placeholder": "编码", "mutable": false },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器编号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "_sn2", "type": "textfield", "key": null,  "value": "", "placeholder": "编码", "mutable": false },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "中频控制器编号",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "_sn3", "type": "textfield", "key": null,  "value": "", "placeholder": "编码", "mutable": false },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "风扇转动情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fanState", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数据存储状态",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "storeState", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "屏幕显示情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screenState", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "芯片版本",}, 
                    { "rowspan": 1, "cellspan": 3, "name": "clip", "type": "select", "key": "clipVersions",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 5, "type": "text", "name": null, "key": null, "value": "变压器次级连接材料",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "linkState", "key": "linkOptions", "value": "紫铜",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "测试数据记录",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角40%（时间20/5）",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流5KA（时间20/5）",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalD1", "type": "number", "key": null,  "value": "40", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalD2", "type": "number", "key": null,  "value": "40", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40LocalD3", "type": "number", "key": null,  "value": "40", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle40DisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const5KDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角80%（时间20/5）",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流10KA（时间20/5）",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalD1", "type": "number", "key": null,  "value": "80", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalD2", "type": "number", "key": null,  "value": "80", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80LocalD3", "type": "number", "key": null,  "value": "80", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angle80DisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "const10KDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 3, "type": "text", "name": null, "key": null, "value": "注：电流检测仪的波形",}, 
                    { "rowspan": 1, "cellspan": 6, "type": "option", "name": "waveState", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "remark", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 9, "type": "text", "name": null, "key": null, "value": "",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 6, "type": "text", "name": null, "key": null, "value": "发货前测试填写",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "责任人",}, 
                    { "rowspan": 2, "cellspan": 2, "name": "leader2", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试日期",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "date", "name": "date2", "key": null, "value": "",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "测试者",}, 
                    { "rowspan": 1, "cellspan": 2, "name": "tester2", "type": "select", "key": "leaders",  "value": "" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "风扇转动情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fan2State", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "数据存储状态",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "store2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "屏幕显示情况",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screen2State", "key": "stateOptions", "value": "正常",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "螺丝检查",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screw2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "液晶屏安装",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "fit2State", "key": "screenFitOptions", "value": "外置",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "芯片版本",}, 
                    { "rowspan": 1, "cellspan": 3, "name": "clip2", "type": "select", "key": "clipVersions",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "中频变频选择",}, 
                    { "rowspan": 2, "cellspan": 3, "type": "option", "name": "freq2State", "key": "freqTypeOptions", "value": "中频",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "接插件液晶显示卡子配备情况",}, 
                    { "rowspan": 2, "cellspan": 3, "type": "option", "name": "card2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "屏幕程序版本",}, 
                    { "rowspan": 1, "cellspan": 3, "type": "option", "name": "screenVer2State", "key": "screenOptions", "value": "普通",}, 
                    { "rowspan": 1, "cellspan": 4, "name": "screenVerDesc", "type": "textfield", "key": null,  "value": "", "placeholder": "备注（注明屏幕显示客户名称）" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角模式",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流模式",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒导通角50%（时间10/5）",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "text", "name": null, "key": null, "value": "恒流15KA（时间10/5）",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "本机显示",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "电流显示仪",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流（A)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(R)",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流(P)",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalA1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalD1", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayR1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayP1", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalA2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalD2", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayR2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayP2", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "angleDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalA3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constLocalD3", "type": "number", "key": null,  "value": "", "placeholder": "导通角" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayR3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                    { "rowspan": 1, "cellspan": 1, "name": "constDisplayP3", "type": "number", "key": null,  "value": "", "placeholder": "电流" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "外壳清洁度检查",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "clean2State", "key": "cleanOptions", "value": "清洁",}, 
                    { "rowspan": 2, "cellspan": 3, "type": "text", "name": null, "key": null, "value": "水压测试结果（注：水压测试为10kg十分钟）",}, 
                    { "rowspan": 2, "cellspan": 2, "type": "option", "name": "pressure2State", "key": "pressureOptions", "value": "完好",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "配件配备情况",}, 
                    { "rowspan": 1, "cellspan": 2, "type": "option", "name": "parts2State", "key": "partsOptions", "value": "完整",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "包装情况",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "pack2State", "key": "packOptions", "value": "木箱",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "第二次签名",}, 
                    { "rowspan": 2, "cellspan": 2, "name": "recheck2", "type": "select", "key": "leaders",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "注：电流检测仪的波形",}, 
                    { "rowspan": 1, "cellspan": 4, "type": "option", "name": "wave2State", "key": "stateOptions", "value": "正常",}, 
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "客户名称",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "company", "type": "select", "needsearch": true, "key": "company",  "value": "" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "备注",}, 
                    { "rowspan": 1, "cellspan": 8, "name": "remark2", "type": "textfield", "option": "remark", "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "图片",}, 
                    { "rowspan": 4, "cellspan": 8, "name": "attachments", "type": "image", "key": null,  "value": "" },
                ]
            },
        ]
    }
};

// 变压器检验表
let editor8_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": ["0.05", 80, 140, 100, 120, 80, 60, 80, 120 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "机器编码",}, 
                    { "rowspan": 1, "cellspan": 7, "name": "sn", "type": "sn", "key": null,  "value": "" },
                ]
            },
            {
                "td": [
                    {
                        "rowspan": 1,
                        "cellspan": 1,
                        "type": "text",     // 单元格类型，text/number/textfield/select
                        "name": null,       // 字段名
                        "key": null,        // 如果是选项类型需要设置key
                        "value": "序号",     // 默认值
                    }, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测项目" }, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测内容" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测设备" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测标准" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "判断结果" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测人" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 5, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 5, "cellspan": 1, "type": "text", "key": null,  "value": "绝缘性能", }, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "初级→次级绝缘" },
                    { "rowspan": 4, "cellspan": 1, "type": "text", "key": null,  "value": "1000V摇表" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞500MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 5, "cellspan": 1, "name": "leaderIns", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "初级→外壳绝缘" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞500MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "次级→外壳绝缘" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞100MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "线圈L1→L2绝缘" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞500MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV4", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge4State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark4", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "整流器铜件与螺栓" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "万用表" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞10MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV5", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge5State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark5", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "二极管",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "正反向电压",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "万用表",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "正向＜0.33V",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "dioTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 2, "cellspan": 1, "name": "dioJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderDio", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "dioRemark1", "type": "textfield", "key": null,  "value": "黑表棒接正极输出板", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "反向OL",}, 
                ],
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "介电强度",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "初级→次级",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "耐压测试仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "DC2500V（1min）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "dieTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "dieJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderDie", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 3, "cellspan": 1, "name": "dieRemark1", "type": "textfield", "key": null,  "value": "漏电流＜5mA，无击穿闪烁现象", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "初级→外壳",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "DC2500V（1min）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "dieTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "dieJudge2State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "次级→外壳",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "DC1500V（1min）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "dieTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "dieJudge3State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "4",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "流量监测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器水流量",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "流量计",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＞12L/min",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "trafficTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "trafficJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderTraffic", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "trafficRemark1", "type": "textfield", "key": null,  "value": "标准流量计在水流量18L/min时", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "整流组件水流量",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＞11L/min",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "trafficTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "trafficJudge2State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "5",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "磁化电流过程检测",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "串联磁化电流",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变频电源",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流：＜1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "magTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "magJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderMag", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "magRemark1", "type": "textfield", "key": null,  "value": "灌环氧前,300V500HZ前提下通电检测", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "功率：＜20",},
                    { "rowspan": 1, "cellspan": 1, "name": "magTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "magJudge2State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "6",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "磁化电流过程检测",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "串联磁化电流",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变频电源",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流：＜1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "mag2TestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "mag2Judge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderMag2", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "mag2Remark1", "type": "textfield", "key": null,  "value": "灌环氧前,300V500HZ前提下通电检测", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "功率：＜20",},
                    { "rowspan": 1, "cellspan": 1, "name": "mag2TestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "mag2Judge2State", "type": "bool", "key": null,  "value": "true" },
                ]
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "7",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "温控器检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "二极管温控",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "万用表",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "通路",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "tmpTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderTmp", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "初级温控",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "tmpTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "次级温控",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "tmpTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "8",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "磁化电流最终检测",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "并联磁化电流",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "控制器+钳流表",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流：＜4A",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "mag3TestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 2, "cellspan": 1, "name": "mag3Judge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderMag3", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "mag3Remark1", "type": "textfield", "key": null,  "value": "检测时间10min，钳流表电流表跳动，不稳定现象", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 11, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "9",}, 
                    { "rowspan": 11, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角%/通电100ms",}, 
                    { "rowspan": 11, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "大电流检测仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流（KA）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 11, "cellspan": 1, "name": "leaderOut", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "10%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2.4（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "20%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3.4（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "30%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "6.7（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV4", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge4State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark4", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "40%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "10.0（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV5", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge5State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark5", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "50%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "12.9（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV6", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge6State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark6", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "60%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "15.8（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV7", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge7State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark7", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "70%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "18.6（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV8", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge8State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark8", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "80%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "21.2（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV9", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge9State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark9", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "90%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "24.4（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV10", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge10State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark10", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "99%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "25.5（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV11", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge11State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark11", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "10",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器过负载检测",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角99%",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "检测试验台",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流31.8KA，焊接时间200ms，休止600ms，工作次数＞100次",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "transJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 4, "cellspan": 1, "name": "leaderTrans", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 4, "cellspan": 1, "name": "transRemark1", "type": "textfield", "key": null,  "value": "进水温度＜40℃", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "transTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "焊接次数",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "transJudge2State", "type": "bool", "key": null,  "value": "true" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "transTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                ]
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "11",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器正极板温差检测",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "汇流板",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "热电偶",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＜50℃",}, 
                    { "rowspan": 3, "cellspan": 1, "name": "anoTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 3, "cellspan": 1, "name": "anoJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderAno", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 3, "cellspan": 1, "name": "anoRemark1", "type": "textfield", "key": null,  "value": "用手触摸正极输出板两边无明显温度差异", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "12",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "外观检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器几何尺寸",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "游标卡尺",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "符合图纸要求",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 4, "cellspan": 1, "name": "leaderLook", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "安装螺栓",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "扳手",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "无松动",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "水接头无开裂现象",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "目测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "无漏水现象",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器表面",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "目测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "无油污、划痕",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV4", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge4State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark4", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "13",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "标识检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出板有“+，-”极钢印",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "钢印",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "字迹清楚位置正确",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "flagTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderFlag", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "“进出水”有钢印标识",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "flagTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器编号",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "number", "name": "sn_check", "key": null, "value": "", "placeholder": "机器编码"}, 
                    { "rowspan": 1, "cellspan": 1, "name": "flagTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "14",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "最终结果",}, 
                    { "rowspan": 1, "cellspan": 6, "type": "option", "name": "resState", "key": "qualifiedOptions", "value": "合格",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "resRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "15",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "出库时间",},
                    { "rowspan": 1, "cellspan": 7, "type": "date", "name": "date", "key": null, "value": "",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "16",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "客户名称",},
                    { "rowspan": 1, "cellspan": 7, "name": "company", "type": "select", "needsearch": true, "key": "company",  "value": "" },
                ]
            },
        ]
    }
};

// 变压器检验表
let editor7_sheetTmpl = {
    "cellHeight": 34, // 行高
    "table": {
        "th": ["0.05", 80, 140, 100, 120, 80, 60, 80, 120 ], // 列宽
        "tr": [
            {
                "td": [
                    { "rowspan": 1, "cellspan": 2, "type": "text", "name": null, "key": null, "value": "机器编码",}, 
                    { "rowspan": 1, "cellspan": 7, "name": "sn", "type": "sn", "key": null,  "value": "" },
                ]
            },
            {
                "td": [
                    {
                        "rowspan": 1,
                        "cellspan": 1,
                        "type": "text",     // 单元格类型，text/number/textfield/select
                        "name": null,       // 字段名
                        "key": null,        // 如果是选项类型需要设置key
                        "value": "序号",     // 默认值
                    }, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测项目" }, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测内容" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测设备" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测标准" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "判断结果" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "检测人" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 5, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "1",}, 
                    { "rowspan": 5, "cellspan": 1, "type": "text", "key": null,  "value": "绝缘性能", }, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "初级→次级绝缘" },
                    { "rowspan": 4, "cellspan": 1, "type": "text", "key": null,  "value": "1000V摇表" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞500MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 5, "cellspan": 1, "name": "leaderIns", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "初级→外壳绝缘" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞500MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "次级→外壳绝缘" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞100MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "线圈L1→L2绝缘" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞500MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV4", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge4State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark4", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "整流器铜件与螺栓" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "万用表" },
                    { "rowspan": 1, "cellspan": 1, "type": "text", "key": null,  "value": "＞10MΩ" },
                    { "rowspan": 1, "cellspan": 1, "name": "insTestV5", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "insJudge5State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "insRemark5", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "2",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "二极管",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "正反向电压",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "万用表",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "正向＜0.33V",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "dioTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 2, "cellspan": 1, "name": "dioJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderDio", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "dioRemark1", "type": "textfield", "key": null,  "value": "黑表棒接正极输出板", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "反向OL",}, 
                ],
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "介电强度",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "初级→次级",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "耐压测试仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "DC2500V（1min）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "dieTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "dieJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderDie", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 3, "cellspan": 1, "name": "dieRemark1", "type": "textfield", "key": null,  "value": "漏电流＜5mA，无击穿闪烁现象", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "初级→外壳",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "DC2500V（1min）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "dieTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "dieJudge2State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "次级→外壳",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "DC1500V（1min）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "dieTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "dieJudge3State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "4",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "流量监测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器水流量",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "流量计",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＞12L/min",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "trafficTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "trafficJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderTraffic", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "trafficRemark1", "type": "textfield", "key": null,  "value": "标准流量计在水流量18L/min时", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "整流组件水流量",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＞11L/min",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "trafficTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "trafficJudge2State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "5",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "磁化电流过程检测",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "串联磁化电流",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变频电源",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流：＜2.1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "magTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "magJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderMag", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "magRemark1", "type": "textfield", "key": null,  "value": "灌环氧前,300V500HZ前提下通电检测", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "功率：＜40",},
                    { "rowspan": 1, "cellspan": 1, "name": "magTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "magJudge2State", "type": "bool", "key": null,  "value": "true" },
                ],
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "6",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "磁化电流过程检测",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "串联磁化电流",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变频电源",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流：＜2.1",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "mag2TestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "mag2Judge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderMag2", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "mag2Remark1", "type": "textfield", "key": null,  "value": "灌环氧前,300V500HZ前提下通电检测", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "功率：＜40",},
                    { "rowspan": 1, "cellspan": 1, "name": "mag2TestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "mag2Judge2State", "type": "bool", "key": null,  "value": "true" },
                ]
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "7",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "温控器检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "二极管温控",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "万用表",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "通路",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "tmpTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderTmp", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "初级温控",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "tmpTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "次级温控",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "tmpTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "tmpRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "8",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "磁化电流最终检测",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "并联磁化电流",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "控制器+钳流表",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "电流：＜8A",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "mag3TestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 2, "cellspan": 1, "name": "mag3Judge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 2, "cellspan": 1, "name": "leaderMag3", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 2, "cellspan": 1, "name": "mag3Remark1", "type": "textfield", "key": null,  "value": "检测时间10min，钳流表电流表跳动，不稳定现象", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 11, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "9",}, 
                    { "rowspan": 11, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角%/通电100ms",}, 
                    { "rowspan": 11, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "大电流检测仪",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流（KA）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 11, "cellspan": 1, "name": "leaderOut", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "10%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "3（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "20%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "8.5（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "30%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "13.7（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV4", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge4State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark4", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "40%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "18.5（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV5", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge5State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark5", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "50%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "23.1（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV6", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge6State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark6", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "60%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "27.2（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV7", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge7State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark7", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "70%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "31（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV8", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge8State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark8", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "80%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "34.6（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV9", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge9State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark9", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "90%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "37.6（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV10", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge10State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark10", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "99%",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "39.3（±5%）",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "outTestV11", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "outJudge11State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "outRemark11", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "10",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器过负载检测",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "导通角99%",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "检测试验台",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流39.3KA，焊接时间200ms，休止600ms，工作次数＞100次",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出电流",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "transJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 4, "cellspan": 1, "name": "leaderTrans", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 4, "cellspan": 1, "name": "transRemark1", "type": "textfield", "key": null,  "value": "进水温度＜40℃", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "transTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "焊接次数",}, 
                    { "rowspan": 2, "cellspan": 1, "name": "transJudge2State", "type": "bool", "key": null,  "value": "true" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "name": "transTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                ]
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "11",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器正极板温差检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "左正极板",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "热电偶",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＜45℃",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "anoTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "anoJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderAno", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 3, "cellspan": 1, "name": "anoRemark1", "type": "textfield", "key": null,  "value": "用手触摸正极输出板两边无明显温度差异", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "中正极板",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＜50℃",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "anoTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "anoJudge2State", "type": "bool", "key": null,  "value": "true" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "右正极板",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "＜45℃",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "anoTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "anoJudge3State", "type": "bool", "key": null,  "value": "true" },
                ]
            },
            {
                "td": [
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "12",}, 
                    { "rowspan": 4, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "外观检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器几何尺寸",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "游标卡尺",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "符合图纸要求",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 4, "cellspan": 1, "name": "leaderLook", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "安装螺栓",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "扳手",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "无松动",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "水接头无开裂现象",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "目测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "无漏水现象",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器表面",},
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "目测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "无油污、划痕",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "lookTestV4", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookJudge4State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "lookRemark4", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "13",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "标识检测",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "输出板有“+，-”极钢印",}, 
                    { "rowspan": 3, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "钢印",}, 
                    { "rowspan": 2, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "字迹清楚位置正确",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "flagTestV1", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagJudge1State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 3, "cellspan": 1, "name": "leaderFlag", "type": "select", "key": "leaders",  "value": "" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ],
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "“进出水”有钢印标识",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "flagTestV2", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagJudge2State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagRemark2", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "变压器编号",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "number", "name": "sn_check", "key": null, "value": "", "placeholder": "机器编码"}, 
                    { "rowspan": 1, "cellspan": 1, "name": "flagTestV3", "type": "number", "key": null,  "value": "", "placeholder": "检测值" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagJudge3State", "type": "bool", "key": null,  "value": "true" },
                    { "rowspan": 1, "cellspan": 1, "name": "flagRemark3", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "14",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "最终结果",}, 
                    { "rowspan": 1, "cellspan": 6, "type": "option", "name": "resState", "key": "qualifiedOptions", "value": "合格",}, 
                    { "rowspan": 1, "cellspan": 1, "name": "resRemark1", "type": "textfield", "key": null,  "value": "", "placeholder": "备注" },
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "15",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "出库时间",},
                    { "rowspan": 1, "cellspan": 7, "type": "date", "name": "date", "key": null, "value": "",},
                ]
            },
            {
                "td": [
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "16",}, 
                    { "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "客户名称",},
                    { "rowspan": 1, "cellspan": 7, "name": "company", "type": "select", "needsearch": true, "key": "company",  "value": "" },
                ]
            },
        ]
    }
};

export default [
    {id: 3, title: '中频生产表格', tmpl: editor3_sheetTmpl}, 
    {id: 4, title: '变压器生产表格', tmpl: editor4_sheetTmpl}, 
    {id: 5, title: '控制器生产表格', tmpl: editor5_sheetTmpl}, 
    {id: 6, title: '维修表格', tmpl: editor6_sheetTmpl}, 
    {id: 7, title: '250/350KVA变压器检验表格', tmpl: editor7_sheetTmpl}, 
    {id: 8, title: '180KVA变压器检验表格', tmpl: editor8_sheetTmpl}, 
    {id: 9, title: '包装测试表格', tmpl: editor9_sheetTmpl}
]