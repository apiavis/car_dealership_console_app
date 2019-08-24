Array.prototype.getCountByKeyValue = function(key,value) {
    let valueCount = 0;
    for (let i = 0; i < this.length; i++) {
        if(this[i][key] === value){
            valueCount++;
        };
    };
    return valueCount;
};

function getRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
};

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

const dateDiff = {
    inDays: function (d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();
        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },
    inWeeks: function (d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();
        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },
    inMonths: function (d1, d2) {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();
        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },
    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

