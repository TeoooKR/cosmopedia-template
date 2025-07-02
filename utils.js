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