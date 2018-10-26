/**
 * Created by 吕港 on 2018/4/14.
 */

var CId;
var basePath;

window.onload=function() {
    CId = getQueryString("cid");
    basePath = $("#basePath").val();

    if(CId == "" || CId == null){
        alert("请不要修改域名！")
    }else{
        extractKeyWord()
        extractPhrase()
        extractSummary()
    }
}

function extractKeyWord(){

    var myChart = echarts.init(document.getElementById('main'));
    myChart.showLoading();

    var data = {
        'CId': CId,
        'type': 1
    }
    var url = basePath + "comment/commentsMiningByCId.do"
    $.post(url,data,function(result) {
        myChart.hideLoading();
        result = result.substr(1, result.length - 2) //后一位是长度
        var array = result.split(",")

        option = {
            title: {
                text: 'faceSchool课程评论关键字',
                x: 'center',
                textStyle: {
                    fontSize: 23
                },
                top: 8

            },
            backgroundColor: '#F7F7F7',
            tooltip: {
                show: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        iconStyle: {
                            normal: {
                                color: '#FFFFFF'
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'faceSchool课程评论关键字',
                type: 'wordCloud',
                //size: ['9%', '99%'],
                sizeRange: [6, 66],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: "Jayfee",
                    value: 666
                }, {
                    name: "Nancy",
                    value: 520
                }]
            }]
        };

        var JosnList = [];

        var number = parseInt(array.length);
        for(var num = 0; num < number; num++){
            if(num < 20){
                JosnList.push({
                    name: array[num],
                    value: Math.floor(920 - Math.floor(Math.random() * 40) - 42 * num)
                })
            }else{
                JosnList.push({
                    name: array[num],
                    value: Math.floor(520 - Math.floor(Math.random() * 4) - 3 * num)
                })
            }
        }


        option.series[0].data = JosnList;

        myChart.setOption(option);
    })
}

function extractPhrase(){

    var myChart = echarts.init(document.getElementById('main1'));
    myChart.showLoading();

    var data = {
        'CId': CId,
        'type': 2
    }
    var url = basePath + "comment/commentsMiningByCId.do"
    $.post(url,data,function(result) {
        myChart.hideLoading();
        result = result.substr(1, result.length - 2) //后一位是长度
        var array = result.split(",")

        option = {
            title: {
                text: 'faceSchool课程评论关键短语',
                x: 'center',
                textStyle: {
                    fontSize: 23
                },
                top: 8

            },
            backgroundColor: '#F7F7F7',
            tooltip: {
                show: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        iconStyle: {
                            normal: {
                                color: '#FFFFFF'
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'faceSchool课程评论',
                type: 'wordCloud',
                //size: ['9%', '99%'],
                sizeRange: [6, 66],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: "Jayfee",
                    value: 666
                }, {
                    name: "Nancy",
                    value: 520
                }]
            }]
        };

        var JosnList = [];

        var number = parseInt(array.length);
        for(var num = 0; num < number; num++){
            if(num < 20){
                JosnList.push({
                    name: array[num],
                    value: Math.floor(920 - Math.floor(Math.random() * 40) - 42 * num)
                })
            }else{
                JosnList.push({
                    name: array[num],
                    value: Math.floor(520 - Math.floor(Math.random() * 4) - 3 * num)
                })
            }
        }


        option.series[0].data = JosnList;

        myChart.setOption(option);
    })
}

function extractSummary(){

    var myChart = echarts.init(document.getElementById('main2'));
    myChart.showLoading();

    var data = {
        'CId': CId,
        'type': 3
    }
    var url = basePath + "comment/commentsMiningByCId.do"
    $.post(url,data,function(result) {
        myChart.hideLoading();
        result = result.substr(1, result.length - 2) //后一位是长度
        var array = result.split(",")

        option = {
            title: {
                text: 'faceSchool课程评论摘要',
                x: 'center',
                textStyle: {
                    fontSize: 23
                },
                top: 8

            },
            backgroundColor: '#F7F7F7',
            tooltip: {
                show: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        iconStyle: {
                            normal: {
                                color: '#FFFFFF'
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'faceSchool课程评论',
                type: 'wordCloud',
                //size: ['9%', '99%'],
                sizeRange: [6, 66],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: "Jayfee",
                    value: 666
                }, {
                    name: "Nancy",
                    value: 520
                }]
            }]
        };

        var JosnList = [];

        var number = parseInt(array.length);
        for(var num = 0; num < number; num++){
            JosnList.push({
                name: array[num],
                value: 666
            })
        }


        option.series[0].data = JosnList;

        myChart.setOption(option);
    })
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
