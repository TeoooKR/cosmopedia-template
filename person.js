function generatePerson() {
    const nickname_main = document.getElementById("nickname_main").value;
    const nickname_sub = document.getElementById("nickname_sub").value;
    let nickname_bar = "";
    let nickname_parens
    if (nickname_main && nickname_sub) {
        nickname_bar = `${nickname_main} | ${nickname_sub}`;
        nickname_parens = `${nickname_main}(${nickname_sub})`
    } else if (nickname_main) {
        nickname_bar = nickname_parens = nickname_main;        
    } else if (nickname_sub) {
        nickname_bar = nickname_parens = nickname_sub;
    }    
    let whereareyoufrom = document.getElementById("whereareyoufrom").value;
    if (whereareyoufrom == "") {
        whereareyoufrom = "비공개"
    }
    const birth_date_year = document.getElementById("birth_date_year").value.trim();
    const birth_date_month = document.getElementById("birth_date_month").value.trim();
    const birth_date_day = document.getElementById("birth_date_day").value.trim();

    let birth_date = `${birth_date_year}년 ${birth_date_month}월 ${birth_date_day}일 ([age(${birth_date_year}-${birth_date_month.padStart(2, '0')}-${birth_date_day.padStart(2, '0')})]세)`
    if (birth_date_year == "" && birth_date_month == "" && birth_date_day == "") {
        birth_date = "비공개";
    }

    let person_tag = "";
    let person_tag_count = 0;
    ["Player", "Charter", "Camera", "Effecter", "Composer", "Developer", "Admin"].forEach(val => {
        if (document.getElementById(`Person_Tag_${val}`).checked) {
            person_tag_count++;
            person_tag += `,tag${person_tag_count}=${val}`;
        }
    });
    const youtube_name = document.getElementById("youtube_name").value;
    const youtube_handle = document.getElementById("youtube_handle").value;
    let youtube_subscriber = addComma(document.getElementById("youtube_subscriber").value.trim());    
    youtube_subscriber = youtube_subscriber || "000";
    let youtube_view = addComma(document.getElementById("youtube_view").value.trim());
    youtube_view = youtube_view || "000,000";
    let youtube_video = addComma(document.getElementById("youtube_video").value.trim());
    youtube_video = youtube_video || "000";

    const x_name = document.getElementById("x_name").value;
    const x_handle = document.getElementById("x_handle").value;
    let x_follower = addComma(document.getElementById("x_follower").value.trim());
    x_follower = x_follower || "000";

    const soundcloud_name = document.getElementById("soundcloud_name").value;
    const soundcloud_handle = document.getElementById("soundcloud_handle").value;
    let soundcloud_follower = addComma(document.getElementById("soundcloud_follower").value.trim());
    soundcloud_follower = soundcloud_follower || "000";
    let soundcloud_track = addComma(document.getElementById("soundcloud_track").value.trim());
    soundcloud_track = soundcloud_track || "000";

    const social_media_youtube = `
||<tablealign=center><tablewidth=100%><-6><bgcolor=#000000><color=#fff><nopad>'''{{{+1 | [[https://www.youtube.com/${youtube_handle}|[[파일:Youtube.png|width=25]]]] ${youtube_name} (@${youtube_handle})}}}''' ||
||<-2> {{{-1 구독자}}}[br]'''{{{+3 ${youtube_subscriber}}}}''' ||<-2> {{{-1 조회수}}}[br]'''{{{+3 ${youtube_view}}}}''' ||<-2> {{{-1 영상 수}}}[br]'''{{{+3 ${youtube_video}}}}''' ||`;
    const social_media_x = `
||<-6><bgcolor=#000000><color=#fff><nopad>'''{{{+1 | [[https://x.com/${x_handle}|[[파일:X.jpg|width=25]]]] ${x_name} (@${x_handle})}}}''' ||
||<-6> {{{-1 팔로워}}}[br]'''{{{+3 ${x_follower}}}}''' ||`;
    const social_media_soundcloud = `
||<-6><bgcolor=#000000><color=#fff><nopad>'''{{{+1 | [[https://soundcloud.com/${soundcloud_handle}|[[파일:Soundcloud.png|width=25]]]] ${soundcloud_name} (@${soundcloud_handle})}}}''' ||
||<-3> {{{-1 팔로워}}}[br]'''{{{+3 ${soundcloud_follower}}}}''' ||<-3> {{{-1 트랙 수}}}[br]'''{{{+3 ${soundcloud_track}}}}''' ||`;

    let social_media = ``;
    if (document.getElementById("Social_Media_Youtube").checked) {
        social_media += social_media_youtube;
    }
    if (document.getElementById("Social_Media_X").checked) {
        social_media += social_media_x;
    }
    if (document.getElementById("Social_Media_Soundcloud").checked) {
        social_media += social_media_soundcloud;
    }    
    
    let main_tabub = document.getElementById("main_tabub").value;
    
    const map = {
        "-": "○○",
        "In_Out": "안밖",
        "Out_In": "밖안",
        "Staircase": "계단",
        "Reverse_Staircase": "역계단"
    };

    if (map[main_tabub]) {
        main_tabub = map[main_tabub];
    }
    // todo: etc
    const highest_level_artist = document.getElementById("highest_level_artist").value;
    const highest_level_song_title = document.getElementById("highest_level_song_title").value;
    const highest_level_editor = document.getElementById("highest_level_editor").value;
    let highest_level_difficulty_gg = document.getElementById("highest_level_difficulty_gg").value;
    const highest_level_difficulty_tuf = document.getElementById("highest_level_difficulty_tuf").value;
    let highest_level_difficulty_tuf_legacy = convertPGUtoLegacy(highest_level_difficulty_tuf);
    let highest_level_difficulty = "";
    if (highest_level_difficulty_gg != "-") {
        highest_level_difficulty_gg = highest_level_difficulty_gg.replace("+", "p");
        highest_level_difficulty_gg = highest_level_difficulty_gg.replace(".", "_");
        highest_level_difficulty_gg = highest_level_difficulty_gg.replace("-", "m");
        highest_level_difficulty_gg = "[[파일:gg Lv " + highest_level_difficulty_gg + ".svg|width=30]]";
        highest_level_difficulty += `${highest_level_difficulty_gg}`
    }
    if (highest_level_difficulty_tuf != "-") {
        highest_level_difficulty += `[[파일:TUF Lv ${highest_level_difficulty_tuf}.png|width=30]]`
    }
    if (highest_level_difficulty_tuf_legacy != "") {
        highest_level_difficulty += `[[파일:TUF Lc ${highest_level_difficulty_tuf_legacy}.png|width=30]]`
    }

    const player_information = `
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 플레이 관련 정보}}}}}}'''[*기준] ||
||<bgcolor=#000000><color=#fff> '''주 타법''' ||<-2>${main_tabub} 타법 ||
||<bgcolor=#000000><color=#fff> '''클리어한 최고 레벨''' ||<-2>[[${highest_level_song_title}/${highest_level_editor}의 레벨|${highest_level_artist} - ${highest_level_song_title}(${highest_level_editor})]] ${highest_level_difficulty} ||`;

    let standalone_level_created = addComma(document.getElementById("standalone_level_created").value);
    standalone_level_created = standalone_level_created || "000";
    let collab_level_created = addComma(document.getElementById("collab_level_created").value);
    collab_level_created = collab_level_created || "000";
    let total_level_created = addComma(document.getElementById("total_level_created").value);
    total_level_created = total_level_created || "000";

    const level_editor_information = `
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 레벨 제작 관련 정보}}}}}}'''[*기준] ||
||<width=30%> {{{-1 단독 제작 레벨}}}[br]'''{{{+3 ${standalone_level_created}}}}''' ||<width=30%> {{{-1 합작 레벨}}}[br]'''{{{+3 ${collab_level_created}}}}''' ||<width=30%> {{{-1 총 레벨 개수}}}[br]'''{{{+3 ${total_level_created}}}}''' ||`;

    let main_genre = document.getElementById("main_genre").value;
    main_genre = main_genre || `○○○, ○○○, ○○○`;
    let music_created = addComma(document.getElementById("music_created").value);
    music_created = music_created || `000`;

    const composer_information = `
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 작곡 관련 정보}}}}}}'''[*기준] ||
||<bgcolor=#000000><color=#fff> '''주 장르''' ||<-2>${main_genre} 등 ||
||<bgcolor=#000000><color=#fff> '''곡 개수''' ||<-2>${music_created} ||`;

    let created_mod_name = document.getElementById("created_mod_name").value;
    created_mod_name = created_mod_name || `○○○, ○○○`;
    let created_mod_count = addComma(document.getElementById("created_mod_count").value);
    created_mod_count = created_mod_count || `000`;
    let created_program_name = document.getElementById("created_program_name").value;
    created_program_name = created_program_name || `○○○, ○○○`;
    let created_program_count = addComma(document.getElementById("created_program_count").value);
    created_program_count = created_program_count || `000`;

    const developer_information = `
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 개발 관련 정보}}}}}}'''[*기준] ||
||<bgcolor=#000000><color=#fff> '''제작한 모드 개수''' ||<-2>${created_mod_name} 등 ${created_mod_count}개 ||
||<bgcolor=#000000><color=#fff> '''제작한 프로그램 개수''' ||<-2>${created_program_name} 등 ${created_program_count}개 ||`;

    let person_field_information = "";
    if (document.getElementById("Person_Tag_Player").checked) {
        person_field_information += player_information;
    }
    if (document.getElementById("Person_Tag_Charter").checked || document.getElementById("Person_Tag_Camera").checked || document.getElementById("Person_Tag_Effecter").checked) {
        person_field_information += level_editor_information;
    }
    if (document.getElementById("Person_Tag_Composer").checked) {
        person_field_information += composer_information;
    }
    if (document.getElementById("Person_Tag_Developer").checked) {
        person_field_information += developer_information;
    }

    const cosmopedia_username = document.getElementById("cosmopedia_username").value;
    const steam_profile_id = document.getElementById("steam_profile_id").value;
    const tuf_profile_id = document.getElementById("tuf_profile_id").value;
    const bandcamp_profile_id = document.getElementById("bandcamp_profile_id").value;
    const spotify_profile_id = document.getElementById("spotify_profile_id").value;
    const apple_music_profile_id = document.getElementById("apple_music_profile_id").value;
    const github_profile_id = document.getElementById("github_profile_id").value;
    const discord_server_link_id = document.getElementById("discord_server_link_id").value;
    let links = "";
    let link_count = 0;
    if (cosmopedia_username != "") {
        links += `[[사용자:${cosmopedia_username}|[[파일:Role_Icon_Admin.png|width=25]]]]`
        link_count++
    }
    if (document.getElementById("Social_Media_Youtube").checked) {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://www.youtube.com/@${youtube_handle}|[[파일:Youtube.png|width=25]]]]`
        link_count++
    }
    if (steam_profile_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://steamcommunity.com/profiles/${steam_profile_id}|[[파일:Steam.svg|width=25]]]]`
        link_count++
    }
    if (tuf_profile_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://tuforums.com/profile/${tuf_profile_id}|[[파일:TUF-logo.png|width=25]]]]`
        link_count++
    }
    if (document.getElementById("Social_Media_X").checked) {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://x.com/${x_handle}|[[파일:X.jpg|width=25]]]]`
        link_count++
    }
    if (document.getElementById("Social_Media_Soundcloud").checked) {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://soundcloud.com/${soundcloud_handle}|[[파일:Soundcloud.png|width=25]]]]`
        link_count++
    }
    if (bandcamp_profile_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://${bandcamp_profile_id}.bandcamp.com/|[[파일:Bandcamp.svg|width=25]]]]`
        link_count++
    }
    if (spotify_profile_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://open.spotify.com/artist/${spotify_profile_id}|[[파일:Spotify.svg|width=25]]]]`
        link_count++
    }
    if (apple_music_profile_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://music.apple.com/kr/artist/${apple_music_profile_id}|[[파일:apple_music_logo.png|width=25]]]]`
        link_count++
    }
    if (github_profile_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://github.com/${github_profile_id}|[[파일:GitHubDark.svg|width=25&theme=dark]]]]`
        link_count++
    }
    if (discord_server_link_id != "") {
        if (link_count > 0) {
            links += ` | `
        }
        links += `[[https://discord.gg/${discord_server_link_id}|[[파일:Discord.png|width=25]]]]`
        link_count++
    }

    let result = `||<-3><tablealign=right><tablewidth=450><bgcolor=#000000><table bordercolor=#808080><color=#fff> {{{#!wiki style="margin: -5px -10px; padding: 6px 10px; background-image: linear-gradient(to right, #ffffff, #000000, #808080)"
{{{#!wiki style="display: inline; text-shadow: 0 0 6px #000000; color:#fff"
'''{{{+3 ${nickname_bar}}}}'''}}}}}} ||
||<-3><nopad><bgcolor=#000000> [[파일:${nickname_main} ChannelProfile.png|width=100%]] ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 활동명}}}}}}''' ||
||<-3>${nickname_parens} ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 국적}}}}}}''' ||
||<-3>${whereareyoufrom} ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 생년월일}}}}}}''' ||
||<-3>${birth_date} ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 인물 태그}}}}}}''' ||
||<-3>[include(틀:인물 태그${person_tag})] ||
||<-4><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 소셜 미디어 정보}}}}}}'''[*기준] ||
||<-3>{{{#!folding [ 펼치기 • 접기 ]
||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||${social_media}}}} ||${person_field_information}
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 주요 링크}}}}}}''' ||
||<-3>${links} ||
[clearfix]`;
    
    const base_date_year = document.getElementById("base_date_year").value.trim();
    const base_date_month = document.getElementById("base_date_month").value.trim();
    const base_date_day = document.getElementById("base_date_day").value.trim();
    const base_date_text = `[*기준 ${base_date_year}년 ${base_date_month}월 ${base_date_day}일]`;
    result = result.replace("[*기준]", base_date_text);

    document.getElementById("person_output").textContent = result;
}

function showDivWhenChecked(checkbox, div) {
    document.getElementById(`${checkbox}`).addEventListener("change", function () {
        const element = document.getElementById(`${div}`);
        element.style.display = this.checked ? "block" : "none";
    });
}

[
    { checkbox: "Social_Media_Youtube", div: "youtube" },
    { checkbox: "Social_Media_X", div: "x" },
    { checkbox: "Social_Media_Soundcloud", div: "soundcloud" },
    { checkbox: "Person_Tag_Player", div: "player_information" },
    { checkbox: "Person_Tag_Composer", div: "composer_information" },
    { checkbox: "Person_Tag_Developer", div: "developer_information" }
].forEach(({ checkbox, div }) => {
    showDivWhenChecked(checkbox, div);
});

[
    "Person_Tag_Charter",
    "Person_Tag_Camera",
    "Person_Tag_Effecter"
].forEach(checkbox => {
    showDivWhenChecked(checkbox, "level_editor_information");
});

addOptionsToGG(document.getElementById("highest_level_difficulty_gg"));
addOptionsToTUF(document.getElementById("highest_level_difficulty_tuf"));