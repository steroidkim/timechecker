var teamPermissions = [
    {name: 'ram', permission: [0, 3, 4]},
    {name: 'bat', permission: [1]},
    {name: 'run', permission: [2,5]}
];
var arrBoss = [ //월일시분초
    {name: '카스파', perHour: 2},
    {name: '적샤',  perHour: 2},
    {name: '녹샤',  perHour: 2},
    {name: '북드',  perHour: 2},
    {name: '자이언트 크로커다일',  perHour: 3},
    {name: '스피리드',  perHour: 3},
    {name: '산적두목',  perHour: 3},
    {name: '마요',  perHour: 3},
    {name: '이프리트',  perHour: 2},
    {name: '아르피어',  perHour: 4},
    {name: '자이언트 웜',  perHour: 2},
    {name: '동드', perHour: 3},
    {name: '서드', perHour: 2},
    {name: '북드', perHour: 2},
    {name: '중드', perHour: 3},
    {name: '거드', perHour: 3},
    {name: '파우스트', perHour: 1},
    {name: '에이션트 자이언트', perHour: 0},
    {name: '피닉스', perHour: 0}
];

function getCurrentTime(korean) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;

    if (korean) return month + '월 ' + day + '일 ' + hour + '시 ' + min + '분 ' + sec + '초';
    else return '' + month + day + hour + min + sec;
}
function getTimeByNumber(n) {
    if (n.length == 10) {
        var hour = n.substr(4, 2);
        var min = n.substr(6, 2);
        var sec = n.substr(8, 2);

        return hour + '시 ' + min + '분 ' + sec + '초';
    }
}
function displayCurrentTime() {
    setInterval(() => {
        var date = new Date();
        var currentTime = document.getElementById('current_time');
        currentTime.innerHTML = '(현재시간 ' + getCurrentTime(true) + ')';
    }, 1000);
}
function calculateDiffSecond(index) {
    var now = new Date();
    var bossTime = arrBoss[index].time;
    
    return Math.floor((bossTime- now) / 1000); // return diff by seconds
}
function sortByTime() {
    arrBoss.sort((a,b) => {
        return a.time - b.time;
    });
}
function removeChild(id) {
    var node = document.getElementById(id);
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}
function modifyTime() {
    var data = prompt('수정 할 ' + arrBoss[this.id].name + 
    '의 시간을 24시간 형식으로 입력하세요. 시:분:초 형식입니다. \n(13시57분32초의 경우 13:57:32 입력)');
    var splitArr = data.split(':');
    var now = new Date();
    arrBoss[this.id].time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), splitArr[0], splitArr[1], splitArr[2]);
    console.log('time:', arrBoss[this.id].time);
    sortByTime();
    removeChild('boss_list');
    displayBossList();
}
function setCutTime() {
    var now = new Date();
    now.setHours(now.getHours() + arrBoss[this.id].perHour);
    arrBoss[this.id].time = now;
    alert(arrBoss[this.id].name + '의 다음 시간이 ' + arrBoss[this.id].perHour + '시간 후인 ' + getSimpleTime(arrBoss[this.id].time) + '로 등록됩니다.')
    sortByTime();
    removeChild('boss_list');
    displayBossList();
}

function getSimpleTime(t) {
    return (t.getMonth()+1) + '월 ' + t.getDate() + '일 ' + t.getHours() + '시 ' + t.getMinutes() + '분 ' + t.getSeconds() + '초';
}

function displayBossList() {
    var bossList = document.getElementById('boss_list');
    for (var i = 0; i < arrBoss.length; i++) {
        var div = document.createElement('div');

        var name = document.createElement('span');
        name.innerHTML = arrBoss[i].name;
        div.appendChild(name);

        var perHour = document.createElement('span');
        perHour.innerHTML = '(' + arrBoss[i].perHour + ')';
        perHour.style.float = 'left';
        div.appendChild(perHour);

        var modifyBtn = document.createElement('button');
        modifyBtn.innerHTML = '시간수정';
        modifyBtn.onclick = modifyTime;
        modifyBtn.id = i;
        modifyBtn.style.float = 'right';
        div.appendChild(modifyBtn);

        var cutBtn = document.createElement('button');
        cutBtn.innerHTML = '컷';
        cutBtn.onclick = setCutTime;
        cutBtn.id = i;
        cutBtn.style.float = 'right';
        div.appendChild(cutBtn);

        var time = document.createElement('span');
        time.innerHTML = getSimpleTime(arrBoss[i].time);
        time.style.float = 'right';
        div.appendChild(time);

        bossList.appendChild(div);
    }
}
function getMinuteSecond(n) {
    var hour = 0;
    var min = Math.floor(n / 60);
    if (min >= 60) {
        hour = Math.floor(min / 60);
        min = Math.floor(n / 60) - 60;
    } else {
        hour = 0;
    }
    var sec = Math.floor(n % 60);

    if (hour == 0) return min + '분 ' + sec + '초';
    else return hour + '시간 ' + min + '분 ' + sec + '초';
}
function updateComingBoss() {
    var killing = document.getElementById('killing_boss');
    setInterval( () => {
        var arr = [];
        for (var i = 0; i < arrBoss.length; i++) {
            var obj = {diffSecond: calculateDiffSecond(i), name: arrBoss[i].name}
            arr.push(obj);
        }

        var flag = false; 
        for (var i = 0; i < arrBoss.length; i++) {
            if (arr[i].diffSecond == 60) {
                alert(arr[i].name + ' 1분 전 입니다.');
            }
            if (arr[i].diffSecond > 0) {
                var coming = document.getElementById('coming_boss');
                if (arr[i].diffSecond < 60) coming.style = 'color: red;';
                else coming.style = 'color: black;';
                coming.innerHTML = arr[i].name + ' ' + getMinuteSecond(arr[i].diffSecond) + ' 남음'
                break;
            } else {
                killing.style = 'color: blue;font-size: 1.3em;';
                killing.innerHTML = arr[i].name + ' 처치 중';
                console.log('sec', arr[i].diffSecond);
                flag = true;
            }
        }
        if (!flag) killing.innerHTML = '';
    }, 1000);
}
function initializeBossTime() {
    for (var i = 0; i < arrBoss.length; i++) {
        var d = new Date();
        d.setHours(d.getHours() + 2);
        arrBoss[i].time = d;
    }
}
function dbTest() {
    
}

dbTest();
initializeBossTime();
displayCurrentTime();
sortByTime();
displayBossList();
updateComingBoss();
/*
var d1 = new Date(2014, 2, 30, 23,30, 58); // 2014-03-01
d1
Sun Mar 30 2014 23:30:58 GMT+0900 (KST)
d1.setHours(d1.getHours() + 2)
1396197058000
d1
Mon Mar 31 2014 01:30:58 GMT+0900 (KST)
date 저장 형식 2018-05-10 14:38:44.073
*/