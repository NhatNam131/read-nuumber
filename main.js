const unitTexts = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const scaleTexts = ['', 'nghìn', 'triệu', 'tỷ'];

function readThreeDigtis(number, hasScale = false) {
    let result = '';

    const hunders = Math.floor(number / 100);
    const remainder = number % 100;
    const tens = Math.floor(remainder / 10);
    const units = remainder % 10;

    if (hunders > 0) {
        result += unitTexts[hunders] + ' trăm ';
    } else if (hasScale) {
        result += 'không trăm ';
    }

    if (tens > 1) {
        result += unitTexts[tens] + ' mươi ';
    } else if (tens === 1) {
        result += 'mười ';
    } else if (hasScale && units > 0) {
        result += 'linh ';
    }

    if (units === 1 && tens > 1) {
        result += 'mốt';
    } else if (units === 5 && tens > 0) {
        result += 'lăm';
    } else if (units > 0) {
        result += unitTexts[units];
    }

    return result.trim();
}

function upperCaseFisrt(value) {
    return value
        .split(', ')
        .map((charactor) => {
            if (!charactor) return '';
            return charactor[0].toUpperCase() + charactor.slice(1).toLowerCase();
        })
        .join('')
        .trim();
}

function readNumber(number) {
    if (number === 0) return 'Không đồng';

    let result = '';
    let index = 0;
    const lastIndex = Math.floor(String(number).length / 3);

    do {
        const threeDigits = number % 1000;
        const hasScale = index !== lastIndex;
        const text = readThreeDigtis(threeDigits, hasScale);

        if (threeDigits > 0) {
            const unit = scaleTexts[index];
            result = `${text} ${unit} ${result}`;
        }

        number = Math.floor(number / 1000);
        index++;
    } while (number > 0);

    return upperCaseFisrt(result) + ' đồng';
}

console.log(readNumber(0));
console.log(readNumber(11));
console.log(readNumber(15));
console.log(readNumber(150));
console.log(readNumber(102));
console.log(readNumber(1002));
console.log(readNumber(3945));
console.log(readNumber(10000));
