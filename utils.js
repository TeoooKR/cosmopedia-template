function switchTemplate(value) {
    const select = document.getElementById("select_template");
    const templates = Array.from(select.options).map(opt => opt.value);

    templates.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (id === value) ? "block" : "none";
        }
    });
}
window.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("select_template");
    switchTemplate(selector.value);
    selector.addEventListener("change", function () {
        switchTemplate(this.value);
    });
});

function copyOutput() {
    const select = document.getElementById("select_template");
    const selectedOption = select.options[select.selectedIndex];
    const outputId = selectedOption.getAttribute("data-output");
    const outputElement = document.getElementById(outputId);

    if (outputElement) {
        const temp = document.createElement("textarea");
        temp.value = outputElement.innerText;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
    } else {
        alert("복사할 내용이 없습니다.");
    }
}

function addOptionsToGG(select) {
    function addOptionToGG(option) {
        const opt = document.createElement("option");
        opt.value = opt.text = option;
        select.appendChild(opt);
    }
    addOptionToGG("-")
    for (let i = 1; i <= 17; i++) {
        addOptionToGG(i);
    }
    ["18", "18+", "19", "19+"].forEach(val => {
        addOptionToGG(val);
    });
    for (let i = 200; i <= 226; i++) {
        addOptionToGG((i / 10).toFixed(1));
    }
    ["Unknown", "Tiny", "-1", "-2"].forEach(val => {
        addOptionToGG(val);
    });
}

function addOptionsToTUF(select) {
    function addOptionToTUF(option) {
        const opt = document.createElement("option");
        opt.value = opt.text = option;
        select.appendChild(opt);
    }
    addOptionToTUF("-");
    ["P", "G", "U"].forEach(val => {
        for (let i = 1; i <= 20; i++) {
            addOptionToTUF(val + i);
        }
    });
    for (let i = 1; i <= 20; i++) {
        addOptionToTUF("U" + i + "J");
    }
    for (let i = 4; i <= 8; i++) {
        let plus = "";
        if (i % 2 > 0) {
            plus = "p";
        }
        addOptionToTUF(`Q${Math.floor(i / 2)}${plus}`);
    }
    ["Unranked", "Qq", "Gimmick", "Censored", "Impossible", "ma", "Grande"].forEach(val => {
        addOptionToTUF(val);
    });
}

function convertPGUtoLegacy(difficulty_tuf) {
    if (difficulty_tuf == "P1") {
        return "1";
    }
    for (i = 2; i <= 17; i++) {
        if (difficulty_tuf == "P" + i) {
            return i + 1;
        }
    }
    if (difficulty_tuf == "P18")  {
        return "18p";
    } else if (difficulty_tuf == "P19") {
        return "19";
    } else if (difficulty_tuf == "P20") {
        return "19p";
    }
    for (let i = 1; i <= 20; i++) {
        if (difficulty_tuf === `G${i}`) {
            const base = Math.floor((i - 1) / 2);
            const suffix = (i % 2 === 0) ? 'p' : '';
            return `20_${base}${suffix}`;
        }
    }
    for (let i = 1; i <= 16; i++) {
        if (difficulty_tuf === `U${i}` || difficulty_tuf === `U${i}J`) {
            const g = Math.floor((i - 1) / 2);
            const base = Math.floor(g / 2);
            const suffix = (g % 2 === 1) ? 'p' : '';
            return `21_${base}${suffix}`;
        }
    }
    return "";
}

function addComma(str) {
    let parts = str.split('.');
    let intPart = parts[0];
    let decPart = parts[1] ? '.' + parts[1] : '';

    return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + decPart;
}