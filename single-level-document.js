function generateSingleLevelDocument() {
    const song_title = document.getElementById("song_title").value;
    const artist = document.getElementById("artist").value;

    let includes = "";
    if (document.getElementById("include_flash_warning").checked) {
        includes += " [include(틀:광과민성 경고)]";
    }
    if (document.getElementById("include_noneffect").checked) {
        includes += " [include(틀:논이펙)]";
    }
    if (document.getElementById("include_neocosmos").checked) {
        includes += " [include(틀:Neo Cosmos 필요)]";
    }
    if (document.getElementById("include_streammod").checked) {
        includes += " [include(틀:YouTubeStream Mod 필요)]";
    }
    const youtube_video_id = document.getElementById("youtube_video_id").value;
    const creatorWrappers = document.querySelectorAll(".role-wrapper");
    let editor = "";

    creatorWrappers.forEach(wrapper => {
        const select = wrapper.querySelector("select");
        const customRole = wrapper.querySelector(".custom-role").value.trim();
        const role = select.value === "custom" ? customRole : select.value;

        const rawNames = wrapper.querySelector(".creator-names").value;
        const names = rawNames
            .split(",")
            .map(name => name.trim())
            .filter(name => name.length > 0)
            .map(name => `[[${name}]]`);

        if (role && names.length > 0) {
            editor += `||<bgcolor=#000000><color=#FFFFFF> '''${role}''' ||<-8>${names.join(", ")} ||\n`;
        }
    });

    const release_date_year = document.getElementById("release_date_year").value;
    const release_date_month = document.getElementById("release_date_month").value;
    const release_date_day = document.getElementById("release_date_day").value;
    const song_length_minute = document.getElementById("song_length_minute").value;
    let song_length_second = document.getElementById("song_length_second").value;
    if (song_length_second.length == 1) {
        song_length_second = `0${song_length_second}`
    }

    let bpm = document.getElementById("bpm").value;

    if (document.getElementById('detailed_shift').checked) {
        bpm += "}}}'''[*변속 " + document.getElementById("detailed_shift_text").value + "]";
    } else {
        bpm += "}}}'''";
    }
    const max_tile_bpm = document.getElementById("max_tile_bpm").value;
    const max_current_bpm = document.getElementById("max_current_bpm").value;
    const tile = document.getElementById("tile").value;
    let width = "30";

    let speed_target = document.getElementById("speed_target").value;
    if (document.getElementById("speed_target_checkbox").checked) {
        speed_target = ` ||<-12><width=20%> {{{-1 배속 목표}}}[br]'''{{{+3 x${speed_target}}}}'''`;
        width = "20"
    } else {
        speed_target = "";
    }

    let tag_count = 0;
    let tag = "";

    document.querySelectorAll('input[type="checkbox"][data-tag]').forEach(input => {
        if (input.checked) {
            tag_count += 1;
            tag += `,tag${tag_count}=${input.dataset.tag}`;
        }
    });

    if (tag != "") {
        tag = `
||<-12>[include(틀:레벨 태그${tag})] ||`;
    }
    
    let difficulty_workshop_index = document.getElementById("difficulty_workshop").value;
    let difficulty_workshop_color = "8AFFAB";

    if (difficulty_workshop_index >= 4 && difficulty_workshop_index <= 6) {
        difficulty_workshop_color = "FFEE6B";
    } else if (difficulty_workshop_index >= 7 && difficulty_workshop_index <= 9) {
        difficulty_workshop_color = "FF4257";
    } else if (difficulty_workshop_index >= 10) {
        difficulty_workshop_color = "FD8AFF";
    }

    let difficulty_workshop = `{{{#${difficulty_workshop_color} {{{+5 ${difficulty_workshop_index}}}}}}}`
    if (difficulty_workshop_index == "-") {
        difficulty_workshop = `{{{+5 ${difficulty_workshop_index}}}}`
    }

    let gg_quality = document.getElementById("gg_quality").value;
    if (gg_quality == "Listed") {
        gg_quality = ""
    } else if (gg_quality == "Hidden" || gg_quality == "Unlisted") {
        gg_quality = `[* ${gg_quality}]`
    } else if (gg_quality == "Recommended") {
        gg_quality = ` [[파일:gg Tag FEATURED.svg|width=20]]`;
    } else {
        gg_quality = ` [[파일:gg Tag ${gg_quality.toUpperCase()}.svg|width=20]]`;
    }
    let difficulty_gg = document.getElementById("difficulty_gg").value;
    if (difficulty_gg != "-") {
        difficulty_gg = difficulty_gg.replace("+", "p");
        difficulty_gg = difficulty_gg.replace(".", "_");
        difficulty_gg = difficulty_gg.replace("-", "m");
        difficulty_gg = "[[파일:gg Lv " + difficulty_gg + ".svg|width=40]]";
    } else {
        difficulty_gg = "'''{{{+4 -}}}'''";
    }
    let difficulty_tuf = document.getElementById("difficulty_tuf").value;
    let difficulty_tuf_legacy = "";
    if (difficulty_tuf == "P1") {
        difficulty_tuf_legacy = "1";
    }
    for (i = 2; i <= 17; i++) {
        if (difficulty_tuf == "P" + i) {
            difficulty_tuf_legacy = i + 1;
        }
    }
    if (difficulty_tuf == "P18")  {
        difficulty_tuf_legacy = "18p";
    } else if (difficulty_tuf == "P19") {
        difficulty_tuf_legacy = "19";
    } else if (difficulty_tuf == "P20") {
        difficulty_tuf_legacy = "19p";
    }
    for (let i = 1; i <= 20; i++) {
        if (difficulty_tuf === `G${i}`) {
            const base = Math.floor((i - 1) / 2);
            const suffix = (i % 2 === 0) ? 'p' : '';
            difficulty_tuf_legacy = `20_${base}${suffix}`;
            break;
        }
    }
    for (let i = 1; i <= 16; i++) {
        if (difficulty_tuf === `U${i}` || difficulty_tuf === `U${i}J`) {
            const g = Math.floor((i - 1) / 2);
            const base = Math.floor(g / 2);
            const suffix = (g % 2 === 1) ? 'p' : '';
            difficulty_tuf_legacy = `21_${base}${suffix}`;
            break;
        }
    }			
    if (difficulty_tuf_legacy != "") {
        difficulty_tuf_legacy = " ([[파일:TUF Lc " + difficulty_tuf_legacy + ".png|width=30]])";
    }

    if (difficulty_tuf != "-") {
        difficulty_tuf = "[[파일:TUF Lv " + difficulty_tuf + ".png|width=40]]";
    } else {
        difficulty_tuf = "'''{{{+4 -}}}'''";
    }

    let tutorialBlock = "";
    let tutorialRows = "";

    document.querySelectorAll(".tutorial-wrapper").forEach(wrapper => {
        const kr = wrapper.querySelector(".tutorial-korean").value.trim();
        const en = wrapper.querySelector(".tutorial-english").value.trim();
        if (kr || en) {
            tutorialRows += `{{{+1 '''${kr || "-"}'''}}}[br]{{{-2 ${en || "-"}}}}`;
        }
    });

    if (tutorialRows !== "") {
        tutorialBlock = `||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 튜토리얼}}}}}}''' ||
||<-12>${tutorialRows} ||\n`;
    }


    let link = ""
    let link_count = 0;
    if (document.getElementById("workshop_link_checkbox").checked) {
        link_count++
        link += `,space${link_count}= | ,steam=${document.getElementById("workshop_link")?.value.trim() || ""}`
    }
    if (document.getElementById("gg_link_checkbox").checked) {
        link_count++
        link += `,space${link_count}= | ,gg=${document.getElementById("gg_link")?.value.trim() || ""}`
    }
    if (document.getElementById("tuf_link_checkbox").checked) {
        link_count++
        link += `,space${link_count}= | ,tuf=${document.getElementById("tuf_link")?.value.trim() || ""}`
    }
    
    const result = `[include(틀:상위 문서,up=${song_title})]
||<-12><tablealign=right><tablewidth=675><bgcolor=#000000><table bordercolor=#808080><color=#FFFFFF>{{{#!wiki style="margin: -5px -10px; padding: 6px 10px; background-image: linear-gradient(to right, #ffffff, #000000, #808080)"
{{{#!wiki style="display: inline; text-shadow: 0 0 6px #000000; color:#fff"
'''{{{+4 ${song_title}}}}'''[br]{{{+1 ${artist}}}}[br]${includes}}}}}}} ||
||<-12><bgcolor=#000000><nopad> [youtube(${youtube_video_id},width=675,height=380)] ||
||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 레벨 제작자}}}}}}''' ||
||<-12>제작자 ||
${editor}||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 출시일}}}}}}''' ||
||<-12>${release_date_year}년 ${release_date_month}월 ${release_date_day}일 ||
||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 레벨 정보}}}}}}''' ||
||<width=${width}%> {{{-1 곡 길이}}}[br]'''{{{+3 ${song_length_minute}:${song_length_second}}}}''' ||<width=${width}%> {{{-1 BPM}}}[br]'''{{{+3 ${bpm}[* 최대 타일 BPM ${max_tile_bpm}, 체감 BPM ${max_current_bpm}] ||<width=${width}%> {{{-1 타일 수}}}[br]'''{{{+3 ${tile}}}}'''${speed_target} ||
||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 주요 패턴}}}}}}''' ||${tag}
||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 난이도}}}}}}''' ||
|| {{{-1 창작마당}}}[br]'''${difficulty_workshop}''' || {{{-1 ADOFAI.gg${gg_quality}}}}[br]${difficulty_gg} || {{{-1 TUF}}}[br]${difficulty_tuf}${difficulty_tuf_legacy} ||
${tutorialBlock}||<-12><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 주요 링크}}}}}}''' ||
||<-12>[include(틀:레벨 주요 링크,youtube=${youtube_video_id}${link},width=30)] ||
[clearfix]`;

    document.getElementById("sld_output").textContent = result;
}

let roleCount = 0;
const defaultRoles = ["트랙", "이펙트", "custom"];

function addRoleField() {
    const section = document.getElementById("creator-section");
    const roleWrapper = document.createElement("div");
    roleWrapper.className = "role-wrapper";
    roleWrapper.style.marginBottom = "10px";
    const defaultRole = defaultRoles[Math.min(roleCount, defaultRoles.length - 1)];
    roleCount++;
    roleWrapper.innerHTML = `
<div class="horizontal">
    <select onchange="toggleCustomRole(this)">
        <option value="트랙" ${defaultRole === "트랙" ? "selected" : ""}>트랙</option>
        <option value="이펙트" ${defaultRole === "이펙트" ? "selected" : ""}>이펙트</option>    
        <option value="custom" ${defaultRole === "custom" ? "selected" : ""}>기타</option>
    </select>
    <input type="text" class="custom-role" placeholder="역할 입력" style="display: ${defaultRole === "custom" ? "inline-block" : "none"};">
    <input type="text" class="creator-names" placeholder="제작자 이름을 ,로 구분해서 입력">
    <button type="button" onclick="removeRole(this)">x</button>
</div>`;
    section.appendChild(roleWrapper);
}

function toggleCustomRole(select) {
    const customInput = select.nextElementSibling;
    if (select.value === "custom") {
        customInput.style.display = "inline-block";
        customInput.focus();
    } else {
        customInput.style.display = "none";
    }
}

function addNameField(button) {
    const nameSection = button.parentElement.nextElementSibling;
    const nameInput = document.createElement("div");
    nameInput.className = "horizontal";
    nameInput.innerHTML = `
<input type="text" placeholder="제작자 이름 입력">
<button type="button" onclick="removeName(this)">x</button>
`;
    nameSection.appendChild(nameInput);
}

function removeName(button) {
    button.parentElement.remove();
}

function removeRole(button) {
    button.closest(".role-wrapper").remove();
}

document.addEventListener("DOMContentLoaded", () => {
  addRoleField();
});

document.getElementById("detailed_shift").addEventListener("change", function () {
    const detailedInput = document.getElementById("detailed_shift_input");
    detailedInput.style.display = this.checked ? "block" : "none";
});

document.getElementById("speed_target_checkbox").addEventListener("change", function () {
    const speed_target = document.getElementById("speed_target");
    speed_target.style.display = this.checked ? "block" : "none";
});

const select_workshop = document.getElementById("difficulty_workshop");
function addOptionToWorkshop(option) {
    const opt = document.createElement("option");
    opt.value = opt.text = option;
    select_workshop.appendChild(opt);
}
addOptionToWorkshop("-")
for(let i = 1; i <= 10; i++) {
    addOptionToWorkshop(i)
}

addOptionsToGG(document.getElementById("difficulty_gg"));
addOptionsToTUF(document.getElementById("difficulty_tuf"));

function addTutorialField() {
    const section = document.getElementById("tutorial-section");
    const wrapper = document.createElement("div");
    wrapper.className = "tutorial-wrapper";
    wrapper.style.marginBottom = "10px";

    wrapper.innerHTML = `
    <div class="horizontal">
        <input type="text" class="tutorial-korean" placeholder="한글 튜토리얼">
        <input type="text" class="tutorial-english" placeholder="영문 튜토리얼">
        <button type="button" onclick="removeTutorialField(this)">x</button>
    </div>
    `;

    section.appendChild(wrapper);
}

function removeTutorialField(button) {
    button.closest(".tutorial-wrapper").remove();
}

document.getElementById("workshop_link_checkbox").addEventListener("change", function () {
    const workshop_link = document.getElementById("workshop_link");
    workshop_link.style.display = this.checked ? "block" : "none";
});
document.getElementById("gg_link_checkbox").addEventListener("change", function () {
    const gg_link = document.getElementById("gg_link");
    gg_link.style.display = this.checked ? "block" : "none";
});
document.getElementById("tuf_link_checkbox").addEventListener("change", function () {
    const tuf_link = document.getElementById("tuf_link");
    tuf_link.style.display = this.checked ? "block" : "none";
});