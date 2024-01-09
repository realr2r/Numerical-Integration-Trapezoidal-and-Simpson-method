let inputs = document.querySelectorAll("input");
let solveBtn = document.querySelector(".solve-Btn");

let n;
let a;
let b;
let eq;
let tAns_1;
let tAns_2;
let relE_1;
let sAns_1;
let sAns_2;
let relE_2;

let answersContainer = document.querySelector(".answers-container");

solveBtn.addEventListener("click", () => {
    answersContainer.innerHTML = "";

    grabValues();

    let answers = [];
    answers.push(trapezoidal(n, a, b));
    answers.push(trapezoidal(n + 1, a, b));
    answers.push(relativeError(answers[0], answers[1]));
    console.log(answers.join("\n"));
    showAnswers("T", n, answers);


    if (n % 2 == 0) {
        answers = [];
        answers.push(simpsons(n, a, b));
        answers.push(simpsons(n + 2, a, b));
        answers.push(relativeError(answers[0], answers[1]));
        console.log(answers.join("\n"));
        showAnswers("S", n, answers);

    }
    else {
        let container = document.createElement("span");
        container.className = "error-container";
        container.innerText = "n must be even to perform Simpson's method";
        answersContainer.appendChild(container);
    }
})

function grabValues() {
    n = math.evaluate(inputs[0].value);
    a = math.evaluate(inputs[1].value);
    b = math.evaluate(inputs[2].value);
    eq = inputs[3].value;

}

function trapezoidal(_n, _a, _b) {
    let k = _a;
    let stepSize = (_b - _a) / _n;
    let integration = 0;
    for (let i = 0; i <= _n; i++) {
        if (i == 0 || i == _n) {
            integration += func(k);
        }
        else {
            integration += (2 * func(k));
        }
        k += stepSize;
    }

    return (stepSize / 2) * integration;
}

function simpsons(_n, _a, _b) {
    let k = _a;
    let stepSize = (_b - _a) / _n;
    let integration = 0;
    for (let i = 0; i <= _n; i++) {
        if (i == 0 || i == _n) {
            integration += func(k);
        }
        else {
            if (i % 2 == 0) {
                integration += (2 * func(k));
            }
            else {
                integration += (4 * func(k));
            }
        }
        k += stepSize;
    }

    return (stepSize / 3) * integration;
}

function func(val) {
    return math.evaluate(eq, { x: val });
}

function relativeError(original, assumed) {
    return ((Math.abs(assumed - original) / original) * 100);
}

function showAnswers(type, _n, _answers) {
    let container = document.createElement("div");
    container.className = "answer-container";

    let title = type == "T" ? "Trapezoidal Method" : "Simpsons Method";

    let titleContainer = document.createElement("h2");
    titleContainer.innerText = title;
    container.appendChild(titleContainer);

    _answers.forEach((answer, i) => {
        let textContainer = document.createElement("span");

        switch (i) {
            case 0:
                textContainer.innerText = `$$${type}_{${_n}} = ${_answers[0]}$$`;
                break;
            case 1:
                _n += (type == "T") ? 1 : 2;
                textContainer.innerText = `$$${type}_{${_n}} = ${_answers[1]}$$`;
                break;
            case 2:
                let relETitle = document.createElement("span");
                relETitle.className = "relative-error-title";
                relETitle.innerText = "Relative Error(%)";
                textContainer.innerText = `$$RE = ${_answers[2]}$$`;

                container.appendChild(relETitle);
                break;
        }
        container.appendChild(textContainer);
    })

    answersContainer.appendChild(container);
    MathJax.typeset();
}