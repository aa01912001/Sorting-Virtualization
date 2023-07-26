"strict mode"

var DELAY = 30;
var TOTAL = 50;
var MAX = 40;
var MIN = 1;

var preNumbers = [];
var randomNumbers = [];

var swapTimes = 0;
var comparisonTimes = 0;
var duration = 0;

var setIntervalID = -1;

const sortingStrategies = {
    "Insertion Sort": insertionSort,
    "Selection Sort": selectionSort,
    "Bubble Sort": bubbleSort,
    "Cocktail Sort": cocktailSort,
    "Gnome Sort": gnomeSort,
    "Quick Sort": quickSort,
    "Merge Sort": mergeSort,
    "Heap Sort": heapSort,
};

async function insertionSort() {
    let len = randomNumbers.length
    for (let i = 1; i < len; i++) {
        for (let j = i; j >= 1; j--) {
            countAndRenderForComparison()
            if (randomNumbers[j] < randomNumbers[j - 1]) {
                countAndRenderForSwap()
                await swapTwoArrayElementByIndex(j, j - 1);
            } else {
                break;
            }
        }
    }
}

function countAndRenderForSwap() {
    swapTimes++;
    document.getElementById("s1").innerText = swapTimes
}

function countAndRenderForComparison() {
    comparisonTimes++;
    document.getElementById("s2").innerText = comparisonTimes
}


async function selectionSort() {
    let len = randomNumbers.length
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            countAndRenderForComparison()
            if (randomNumbers[j] < randomNumbers[minIndex]) {
                minIndex = j;
            }
        }
        await swapTwoArrayElementByIndex(minIndex, i);
        countAndRenderForSwap()
    }
}

async function bubbleSort() {
    let len = randomNumbers.length
    for (let i = 0; i < len - 1; i++) {
        let hasSwap = false
        for (let j = len - 1; j > i; j--) {
            countAndRenderForComparison();
            if (randomNumbers[j] < randomNumbers[j - 1]) {
                countAndRenderForSwap();
                hasSwap = true;
                await swapTwoArrayElementByIndex(j, j - 1);
            }
        }

        if (!hasSwap) return;
    }
}

async function cocktailSort() {
    let len = randomNumbers.length
    for (let i = 0; i < len; i++) {
        let hasSwap = false
        for (let j = i; j < len - i - 1; j++) {
            countAndRenderForComparison();
            if (randomNumbers[j] > randomNumbers[j + 1]) {
                countAndRenderForSwap();
                hasSwap = true;
                await swapTwoArrayElementByIndex(j, j + 1);
            }

        }
        if (!hasSwap) return;

        hasSwap = false;
        for (let k = len - i - 1; k >= i + 1; k--) {
            countAndRenderForComparison();
            if (randomNumbers[k] < randomNumbers[k - 1]) {
                countAndRenderForSwap();
                hasSwap = true;
                await swapTwoArrayElementByIndex(k, k - 1);
            }
        }
        if (!hasSwap) return;
    }
}

async function gnomeSort() {
    let len = randomNumbers.length
    let pos = 0;
    while (pos < len) {
        countAndRenderForComparison();
        if (pos == 0 || randomNumbers[pos] >= randomNumbers[pos - 1]) {
            pos++;
        } else {
            countAndRenderForSwap();
            await swapTwoArrayElementByIndex(pos, pos - 1);
            pos--;
        }
    }
}

async function quickSort(left = 0, right = randomNumbers.length - 1) {
    if (left >= right) return;

    i = left;
    j = right;
    pivot = randomNumbers[left];

    while (i != j) {
        while (randomNumbers[j] > pivot && i < j) {
            countAndRenderForComparison();
            j--;
        }
        while (randomNumbers[i] <= pivot && i < j) {
            countAndRenderForComparison();
            i++;
        }
        countAndRenderForSwap();
        await swapTwoArrayElementByIndex(i, j);
    }

    countAndRenderForSwap();
    await swapTwoArrayElementByIndex(left, i);

    await quickSort(left, i - 1);
    await quickSort(i + 1, right);
}

async function mergeSort(left = 0, right = randomNumbers.length - 1) {
    if (left >= right) return;
    let mid = left + Math.floor((right - left) / 2);
    // divide process
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    // merge process
    let arrLeft = [...randomNumbers.slice(left, mid + 1)];
    let arrRight = [...randomNumbers.slice(mid + 1, right + 1)]
    let p1 = 0, p2 = 0, cur = left;
    while (p1 < arrLeft.length && p2 < arrRight.length) {
        countAndRenderForComparison()
        if (arrLeft[p1] <= arrRight[p2]) {
            countAndRenderForSwap();
            await assignArrayElementByIndex(cur, arrLeft[p1]);
            p1++;
            cur++;
        } else {
            countAndRenderForSwap();
            await assignArrayElementByIndex(cur, arrRight[p2]);
            p2++;
            cur++;
        }
    }

    while (p1 < arrLeft.length) {
        countAndRenderForSwap();
        await assignArrayElementByIndex(cur, arrLeft[p1]);
        p1++;
        cur++;
    }

    while (p2 < arrRight.length) {
        countAndRenderForSwap();
        await assignArrayElementByIndex(cur, arrRight[p2]);
        p2++;
        cur++;
    }

    return;
}

async function heapSort() {
    let maxheapIndex = randomNumbers.length - 1;
    await createMaxHeap(maxheapIndex);
    for (let i = randomNumbers.length - 1; i >= 0; i--) {
        countAndRenderForSwap();
        await swapTwoArrayElementByIndex(0, maxheapIndex);
        maxheapIndex--;
        await maxHeapify(0, maxheapIndex);
    }
    return;
}

async function createMaxHeap(maxheapIndex) {
    for (let i = Math.floor(maxheapIndex / 2); i >= 0; i--) {
        await maxHeapify(i, maxheapIndex);
    }
    return;
}

async function maxHeapify(nodeIndex, maxheapIndex) {
    let leftChildIndex = nodeIndex * 2 + 1;
    let rightChildIndex = nodeIndex * 2 + 2;
    let maxValueIndex = -1;
    countAndRenderForComparison();
    if (leftChildIndex <= maxheapIndex && randomNumbers[leftChildIndex] > randomNumbers[nodeIndex]) {
        maxValueIndex = leftChildIndex;
    } else {
        maxValueIndex = nodeIndex;
    }

    countAndRenderForComparison();
    if (rightChildIndex <= maxheapIndex && randomNumbers[rightChildIndex] > randomNumbers[maxValueIndex]) {
        maxValueIndex = rightChildIndex;
    }

    if (maxValueIndex != nodeIndex) {
        countAndRenderForSwap();
        await swapTwoArrayElementByIndex(nodeIndex, maxValueIndex);
        await maxHeapify(maxValueIndex, maxheapIndex);
    }
}

function randomOnclick() {
    document.getElementById("s1").innerText = 0
    document.getElementById("s2").innerText = 0
    document.getElementById("s3").innerText = 0
    swapTimes = 0
    comparisonTimes = 0
    duration = 0

    preNumbers = [...randomNumbers]
    let displayContainer = document.getElementsByClassName("display-container")[0];

    randomNumbers = []
    let displayHtmlStringArray = []
    let displayHtmlString = ""
    for (let i = 0; i < TOTAL; i++) {
        randomNumbers.push(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN);
        displayHtmlStringArray.push(`<div style="height:` + randomNumbers[i] + `vh"></div>`);
        displayHtmlString += displayHtmlStringArray[i]
    }

    displayContainer.innerHTML = displayHtmlString
}

function resetOnclick() {
    document.getElementById("s1").innerText = 0
    document.getElementById("s2").innerText = 0
    document.getElementById("s3").innerText = 0
    swapTimes = 0
    comparisonTimes = 0
    duration = 0

    let displayContainer = document.getElementsByClassName("display-container")[0];
    randomNumbers = [...preNumbers]
    let displayHtmlStringArray = []
    let displayHtmlString = ""
    for (let i = 0; i < TOTAL; i++) {
        displayHtmlStringArray.push(`<div style="height:` + randomNumbers[i] + `vh"></div>`);
        displayHtmlString += displayHtmlStringArray[i]
    }
    displayContainer.innerHTML = displayHtmlString
}

async function startOnclick() {
    document.getElementById("s1").innerText = 0
    document.getElementById("s2").innerText = 0
    document.getElementById("s3").innerText = 0
    swapTimes = 0
    comparisonTimes = 0
    duration = 0

    preNumbers = [...randomNumbers]

    let startTime = new Date()
    await sortingStrategies[document.getElementById("algorithm-input").value]()
    let endTime = new Date()
    duration = endTime - startTime
    document.getElementById("s3").innerText = duration


    // final animation
    let len = randomNumbers.length
    let displayContainer = document.getElementsByClassName("display-container")[0]
    for (let i = 0; i < len; i++) {
        displayContainer.getElementsByTagName("div")[i].style.backgroundColor = "Green"

        await sleep(DELAY)
        beep(DELAY, (randomNumbers[i]) * 5 + 300, 10, "sine")

        displayContainer.getElementsByTagName("div")[i].style.backgroundColor = "White"
    }
}



async function swapTwoArrayElementByIndex(index1, index2) {
    let displayContainer = document.getElementsByClassName("display-container")[0]
    displayContainer.getElementsByTagName("div")[index1].style.backgroundColor = "Red"

    await sleep(DELAY)

    let tmp = randomNumbers[index1];
    randomNumbers[index1] = randomNumbers[index2];
    randomNumbers[index2] = tmp;

    beep(DELAY, (randomNumbers[index1]) * 5 + 100, 10, "sine")

    let div1 = displayContainer.getElementsByTagName("div")[index1];
    let div2 = displayContainer.getElementsByTagName("div")[index2];
    swapElements(div1, div2)

    await sleep(DELAY)

    displayContainer.getElementsByTagName("div")[index2].style.backgroundColor = "White";
}

async function assignArrayElementByIndex(index, value) {
    let displayContainer = document.getElementsByClassName("display-container")[0]
    displayContainer.getElementsByTagName("div")[index].style.backgroundColor = "Red"

    await sleep(DELAY)
    randomNumbers[index] = value

    beep(DELAY, (randomNumbers[index]) * 5 + 100, 10, "sine")

    let div = displayContainer.getElementsByTagName("div")[index];
    div.style.height = value + "vh";

    await sleep(DELAY)

    displayContainer.getElementsByTagName("div")[index].style.backgroundColor = "White";
}

function swapElements(el1, el2) {
    var p2 = el2.parentNode, n2 = el2.nextSibling
    if (n2 === el1) {
        p2.insertBefore(el1, el2)
        return
    }
    el1.parentNode.insertBefore(el2, el1);
    p2.insertBefore(el1, n2);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function algorithmInputOnclick() {
    document.getElementsByClassName("visible")[0].style.display = "block";
}

function algorithmItemOnclick(value) {
    document.getElementById("algorithm-input").value = value;
    document.getElementsByClassName("visible")[0].style.display = "none";
}

function timesOnclick() {
    document.getElementsByClassName("visible")[0].style.display = "none";
}

function setOnclick() {
    DELAY = Number(document.getElementById("delay").value)
    TOTAL = Number(document.getElementById("total").value)
    MAX = Number(document.getElementById("max").value)
    MIN = Number(document.getElementById("min").value)

    let hintElement = document.getElementById("set-hint");
    hintElement.style.display = "inline";
    clearInterval(setIntervalID);
    let op = 1;  // initial opacity
    setIntervalID = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(setIntervalID);
            hintElement.style.display = 'none';
        }
        hintElement.style.opacity = op;
        op -= op * 0.1;
    }, 70);
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

//All arguments are optional:

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume / 100; // 1 -> 100 %
    if (frequency) { oscillator.frequency.value = frequency; }
    if (type) { oscillator.type = type; }

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + ((duration || 500) / 1000));
};