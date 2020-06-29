import ST_Sheet_Tmpl from '../sheet/st_sheet_tmpl'
import ST_Sheet from '../sheet/st_sheet'
import ST_Field from '../sheet/st_field'
import templates from './sheet_template'
import sheets from './sheet_data'

// 初始化数据
function initData() {
    mockField()
    mockSheet_Tmpl()
    mockSheet()
}

// 模拟表格字段
function mockField() {
    let data = [
        ['leaders', '负责人', '骆国斌'], ['leaders', '负责人', '商克科'], ['leaders', '负责人', '周光春'], ['leaders', '负责人', '季银慧'], ['leaders', '负责人', '黄辉'], ['leaders', '负责人', '陆明俊'],
        ['clipVersions', '芯片版本', 'ZMF300TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF400TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF600TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF800TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF1000TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF1200TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF1200TIN01A191225062.101'], ['clipVersions', '芯片版本', 'ZMF1400TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF1600TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZMF2400TIN01A181207062.101'], ['clipVersions', '芯片版本', 'ZVF400TON01A190326062.102'], ['clipVersions', '芯片版本', 'ZVF600TON01A190118062.102'], ['clipVersions', '芯片版本', 'ZVF800TON01A190118062.102'], ['clipVersions', '芯片版本', 'ZVF800TON01A190326062.102地址2'], ['clipVersions', '芯片版本', 'ZVF1000TON01A190120062.102'], ['clipVersions', '芯片版本', 'ZVF1200TON01A190326062.102'], ['clipVersions', '芯片版本', 'ZVF1600TON01A191225062.102地址1'], ['clipVersions', '芯片版本', 'ZVF1600TON01A191225062.102地址2'], ['clipVersions', '芯片版本', 'ZVF1800TON01A181207062.102'], ['clipVersions', '芯片版本', 'ZMF800A直流191210062建华滚焊机'], ['clipVersions', '芯片版本', 'SW26ZH190518M'],
        ['deviceVersion', '机器型号', 'AC2D主板'], ['deviceVersion', '机器型号', 'DC2C'], ['deviceVersion', '机器型号', 'DC2C主板'], ['deviceVersion', '机器型号', 'AC2D'], ['deviceVersion', '机器型号', 'AC2E'], ['deviceVersion', '机器型号', 'AC2l'], ['deviceVersion', '机器型号', 'AC2J'], ['deviceVersion', '机器型号', 'AC2F'], ['deviceVersion', '机器型号', '80分体变压器'], ['deviceVersion', '机器型号', '80分体控制器'], ['deviceVersion', '机器型号', '300控制器'], ['deviceVersion', '机器型号', '450控制器'], ['deviceVersion', '机器型号', '600控制器'], ['deviceVersion', '机器型号', '800控制器'], ['deviceVersion', '机器型号', '900控制器'], ['deviceVersion', '机器型号', '1200控制器'], ['deviceVersion', '机器型号', '1400控制器'], ['deviceVersion', '机器型号', '1600控制器'], ['deviceVersion', '机器型号', '2400控制器'],
        ['badState', '不良现象', '面板不亮'], ['badState', '不良现象', '机器不运转'], ['badState', '不良现象', '零部件炸裂'], ['badState', '不良现象', '脚踏无作用'], ['badState', '不良现象', '气阀不工作'], ['badState', '不良现象', '连续不工作'],
        ['badReason', '不良原因', '变压器不良'], ['badReason', '不良原因', '元器件不良'], ['badReason', '不良原因', '主芯片不良'], ['badReason', '不良原因', '可控硅不良'], ['badReason', '不良原因', 'IGBT不良'], ['badReason', '不良原因', '传感器不良'], ['badReason', '不良原因', '主板烧坏'], ['badReason', '不良原因', '电容不良'], ['badReason', '不良原因', '断路器不良'], ['badReason', '不良原因', '电源开关不良'], ['badReason', '不良原因', '二极管不良'], ['badReason', '不良原因', '风扇不良'], ['badReason', '不良原因', '开关不良'],
        ['handleType', '处理方式', '刷系统'], ['handleType', '处理方式', '更换变压器'], ['handleType', '处理方式', '更换元器件'], ['handleType', '处理方式', '更换主芯片'], ['handleType', '处理方式', '更换可控硅'], ['handleType', '处理方式', '更换IGBT'], ['handleType', '处理方式', '更换传感器'], ['handleType', '处理方式', '更换主板'], ['handleType', '处理方式', '更换电容'], ['handleType', '处理方式', '更换电源开关'], ['handleType', '处理方式', '更换二极管'], ['handleType', '处理方式', '更换断路器'], ['handleType', '处理方式', '更换风扇'], ['handleType', '处理方式', '更换开关'],
        ['company', '公司', ["河北十堰柯峰", "宁波骏腾发自动化", "广东旭日电器设备", "河北东光王辉", "安平县继晨丝网机械", "河北廊坊昭辉焊机", "曾义", "石家庄正晟自动化", "河北南皮王希勇", "泰州春为强通用机械", "武汉益捷自动化科技", "河北衡水蒋永志", "余姚市纪林机电", "东莞市五泰机械", "深圳良昌岳", "广东禾联公司", "深圳市凯斯莱科技", "深圳市宝龙发科技", "广东深圳王玉芹", "中山市鼎隆电气设备", "深圳市百耐信科技", "广东揭阳黄颖", "深圳市斯特科技", "东莞市未来机械科技", "广东郑明华", "深圳市智慧机器技术", "深圳市创精锐电子", "深圳比斯特自动化设备", "东莞市焊田机械设备", "深圳市爱维特赛威电子科技", "东莞市慧能焊接设备", "深圳市力诚能源科技", "深圳市斯普特设备科技", "深圳市天威赛利机电设备", "珠海市澜海传动科技", "广东德力实业", "深圳市智威自动化设备", "武强县益宏电焊机厂", "孟海明", "河北科奥自动焊接", "衡水安平张大强", "河北廊坊潘海涛", "沧州巨博自动焊接", "河北衡水安平张小强", "河北沧州张治伟", "河北泊头陈帅", "河北沧州东光陈庆龙", "东光县飞宇特种焊接", "衡水威德焊接", "东光县腾威焊接", "沧州东晟焊接", "浙江永康芝应宝兴", "慈溪市凯宏密封", "宁波北仑鸿途焊接", "余姚市焊来特焊接", "余姚市奥龙焊接", "宁波力远自动焊接", "杭州捷唐机械", "慈溪金牌焊机", "宁海县永瑞机械制造", "慈溪超翔自动化设备", "余姚市艾法机电设备", "宁波北仑宁润机械", "宁波艾莫一自动化", "永康市加效焊接自动化", "浙江海路机械制造", "浙江宁波天依电机", "浙江巨龙自动化", "宁波市众效焊接", "嘉善嘉诚混凝土制管", "宁波鸿海海菲自动化焊接", "郯城东方红新型建材", "高密宏焊机电", "临沂市乘风五金机电", "山东付云龙客户", "青岛红蕾舒雅工", "山东亿宝焊接", "无锡新星焊接", "江苏无锡吉鸿", "常州禾佳焊接", "南通东鹏焊接", "无锡海菲焊接", "江苏扬州徐高军", "常州市鹏瑞", "常州恩威焊接", "苏州市誉尚机电", "昆山金吉港电器", "常州卓毅焊接", "常州奇能自动化焊接", "江苏江扬建材机械", "常州市恒毅自动化", "江阴市神牛机电纺织", "苏州小男孩智能科技", "苏州萨瓦智能科技", "江苏凯德电控科技", "南京泽旭机电", "骏腾发实业（上海）", "杭州巨链机械", "常州市普瑞制冷配件", "建华建材（中国）", "江苏省泰兴市宏祥石化", "苏州端迈斯智能", "苏州汉道机电", "南京信尔通微波通讯工程", "常州万吉自动化", "泰州市旭瑞机械制造", "苏州罗瑞斯自动化技术", "江苏海诚过程机械制造", "无锡市荡口通用机械", "泰州春城建材", "南京菲斯特焊接科技", "江苏汤辰机械装备制造", "无锡骏业自动装备", "江阴市通利焊接", "江苏维骏工业", "泰州市高港区金正船用", "苏州市齐虎备自动化", "上海骏腾发智能", "鼎聚焊接", "安徽芜湖同创焊接", "芜湖劲松焊接机电销售", "安徽宝辰机电设备科技", "久能", "镇江奇力电器设备", "镇江市润华无线电专用", "镇江精工焊接设备", "镇江金科焊接器械", "镇江天怡机电设备", "镇江永志电器设备", "镇江晨光焊接设备", "丹阳市界牌镇华焊机电", "镇江天鑫机电制造", "镇江美华机电产品", "镇江市鑫创电子科技", "镇江阳光焊业设备", "镇江汇泰机电设备", "镇江慧创自动化设备制造", "镇江天固机械设备", "镇江市中胜机械", "成都鑫威焊接", "成都天府焊接设备", "成都智丰机电设备", "成都正阳焊接设备", "成都鑫威焊接技术", "成都兴正阳工业设备", "上海徐永东", "上海馨焊科技", "上海豪精机电", "上海固典焊接设备", "上海赤海机电设备", "上海市竖福电器", "上海舷昌机械制造", "云南陇川姬学斌", "云南刘总", "新三一重工", "福建泉州王壮建", "陕西西安方智民", "西安雷航电子信息技术", "西安创新精密仪器研究所", "柳州市冠和机电设备", "湖北十堰市凯强科工贸", "湖北焊玛技术", "湖北武汉秦丽娟", "武汉骏腾发自动焊接装备", "武汉联钧科技", "湖北中南管道", "河南洛阳武文强", "天津市北洋汇力焊接技术", "建科机械（天津）股份", "天津市科华焊接设备", "天津市银丰机械系统工程", "建科机械（天津）--九车间", "建科机械（天津）--七车间", "沈阳中科机械电子", "沈阳金竹焊接设备", "锦州市海天诚焊接技术", "重庆市一棵树除尘滤袋厂", "重庆汤普森机电", "北京启越智控科技"]],
        ['times', '次数', '1'], ['times', '次数', '2'], ['times', '次数', '3'], ['times', '次数', '4'], ['times', '次数', '5'], ['times', '次数', '6'], ['times', '次数', '7'], ['times', '次数', '8'], ['times', '次数', '9'],
        ['remark', '备注', '主芯片（V2.0版本）芯片（V0.1版本）使用220-002检测仪8V 250KVA变压器测试'], ['remark', '备注', '主芯片（V2.0版本）芯片（V0.1版本）使用220-003检测仪 变频专用变压器测试'],
    ]
    data.forEach(async d => {
        if (d[0] === 'company') {
            d[2].forEach(async m => {
                let field = new ST_Field()
                field.key = d[0]
                field.label = d[1]
                field.value = m
            
                await field.save()
            })
        } else {
            let field = new ST_Field()
            field.key = d[0]
            field.label = d[1]
            field.value = d[2]
        
            await field.save()
        }
    })
}

// 模拟表格模板
function mockSheet_Tmpl() {
    let data = []
    templates.forEach(d => {
        data.push([d.id, d.title, JSON.stringify(d.tmpl)])
    })
    data.forEach(async d => {
        let sheet = new ST_Sheet_Tmpl()
        sheet.id = d[0]
        sheet.title = d[1]
        sheet.template = d[2]
    
        await sheet.save()
    })
}

// 模拟表格数据项
function mockSheet() {
    let data = sheets
    data.forEach(async d => {
        let sheet_item = new ST_Sheet()
        sheet_item.tmpl_id = d.tmpl_id
        sheet_item.sn = d.sn
        sheet_item.sn2 = d.sn2
        sheet_item.company = d.company
        sheet_item.title = d.title
        sheet_item.date = d.date
        sheet_item.data = d.data
    
        await sheet_item.save()
    })
}

// initData()