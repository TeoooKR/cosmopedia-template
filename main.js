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