
    // 创建一个时间
    let date = new Date();
    // 获取年份
    let years = date.getFullYear();
    // 获取月份
    let months = date.getMonth() + 1;
    // 获取时间的号数
    let days = date.getDate();
    // 获取时间的星期数
    let weekNum = date.getDay();
    let weeks;
    // 获取小时
    let hours = date.getHours();
    // 获取分钟
    let minutes = date.getMinutes();
    // 获取秒数
    let seconds = date.getSeconds();
    // 定义时间
    let date1, date2, result;
    switch (weekNum) {
        case 0:
            weeks = "日";
            break;
        case 1:
            weeks = "一";
            break;
        case 2:
            weeks = "二";
            break;
        case 3:
            weeks = "三";
            break;
        case 4:
            weeks = "四";
            break;
        case 5:
            weeks = "五";
            break;
        case 6:
            weeks = "六";
            break;
    }
    
    function getWeek(weekNum){
        switch (weekNum) {
            case 7:
                return "日";
                break;
            case 1:
                return "一";
                break;
            case 2:
                return "二";
                break;
            case 3:
                return "三";
                break;
            case 4:
                return "四";
                break;
            case 5:
                return "五";
                break;
            case 6:
                return "六";
                break;
        }
    }

    export{
        weekNum,
        days,
        getWeek
    }