function generatePerson() {
    const nickname_main = document.getElementById("nickname_main").value.trim();
    const nickname_sub = document.getElementById("nickname_sub").value.trim();
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
    let whereareyoufrom = document.getElementById("whereareyoufrom").value.trim();
    if (whereareyoufrom == "") {
        whereareyoufrom = "비공개"
    }
    const birth_date_year = document.getElementById("birth_date_year").value.trim();
    const birth_date_month = document.getElementById("birth_date_month").value.trim();
    const birth_date_day = document.getElementById("birth_date_day").value.trim();
    const birth_date_month_padded = birth_date_month.padStart(2, '0');
    const birth_date_day_padded = birth_date_day.padStart(2, '0');

    let birth_date = `${birth_date_year}년 ${birth_date_month}월 ${birth_date_day}일 ([age(${birth_date_year}-${birth_date_month_padded}-${birth_date_day_padded})]세)`
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

    let social_media = ``;
    let social_media_youtube = `||<tablealign=center><tablewidth=100%><-6><bgcolor=#000000><color=#fff><nopad>'''{{{+1 | [[https://www.youtube.com/channel/|[[파일:Youtube.png|width=25]]]] 채널명 (@핸들)}}}''' ||
||<-2> {{{-1 구독자}}}[br]'''{{{+3 000}}}''' ||<-2> {{{-1 조회수}}}[br]'''{{{+3 000,000}}}''' ||<-2> {{{-1 영상 수}}}[br]'''{{{+3 000}}}''' ||`;
    let social_media_x = `||<-6><bgcolor=#000000><color=#fff><nopad>'''{{{+1 | [[https://x.com/|[[파일:X.jpg|width=25]]]] 계정명 (@핸들)}}}''' ||
||<-6> {{{-1 팔로워}}}[br]'''{{{+3 000}}}''' ||`;
    let social_media_soundcloud = `||<-6><bgcolor=#000000><color=#fff><nopad>'''{{{+1 | [[https://soundcloud.com/|[[파일:Soundcloud.png|width=25]]]] 계정명 (@핸들)}}}''' ||
||<-3> {{{-1 팔로워}}}[br]'''{{{+3 000}}}''' ||<-3> {{{-1 트랙 수}}}[br]'''{{{+3 000}}}''' ||}}} ||`;

    // 소셜 미디어 정보 인풋: 기준 년월일 인풋 / 유튜브, X, 사운드클라우드 체크박스를 체크하면 그에 맞는 인풋이 나타남. 체크박스가 체크되어있지 않으면 그 플랫폼을 아예 표시하지 않음. 셋 다 체크되어있지 않으면 소셜 미디어 정보를 표시하지 않음. 유튜브의 경우 구독자, 조회수, 영상 수, X의 경우 팔로워, 사운드클라우드의 경우 팔로워, 트랙 수.
    // 플레이 관련 정보 인풋: 기준 년월일 인풋 / 위에서 Player가 체크되어있으면 표시. 타법 인풋(안밖/밖안/계단/역계단 선택 select), 클리어한 최고 레벨: 작곡가, 곡, 제작자, 레벨, 체감레벨(없다면 표시하지않음) 인풋.
    // 레벨 제작 관련 정보 인풋: 기준 년월일 인풋 / 위에서 Editor가 체크되어있으면 표시. 타단독 제작 레벨, 합작 레벨, 총 레벨 개수 인풋.
    // 작곡 관련 정보 인풋: 주 장르 인풋 / 곡 개수 인풋
    // 개발 관련 정보 인풋: 제작한 모드 개수 인풋 / 제작한 프로그램 개수 인풋
    // 주요 링크 인풋: 여러 플랫폼을 추가할 수 있게 / 링크 인풋
    //
    // 
    // 조회수 구독자 이런 숫자는 자동으로 3칸마다 , 붙이기기

    const result = `||<-3><tablealign=right><tablewidth=450><bgcolor=#000000><table bordercolor=#808080><color=#fff> {{{#!wiki style="margin: -5px -10px; padding: 6px 10px; background-image: linear-gradient(to right, #ffffff, #000000, #808080)"
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
||<-4><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 소셜 미디어 정보}}}}}}'''[*기준 ○○○○년 ○○월 ○○일] ||
||<-3>{{{#!folding [ 펼치기 • 접기 ]
||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||<nopad><width=16.66%> ||
${social_media}
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 플레이 관련 정보}}}}}}'''[*기준] ||
||<bgcolor=#000000><color=#fff> '''주 타법''' ||<-2>○○ 타법[* 문서 주인이 ADOFAI를 플레이할 때 주로 사용하는 타법을 기재합니다.] ||
||<bgcolor=#000000><color=#fff> '''클리어한 최고 레벨''' ||<-2>작곡가 - 곡(제작자) [[파일: Lv .|width=30]][*체감 포럼에 등록되어있지 않으며, 이 난이도는 체감 난이도이다.(이 각주는 해당 레벨이 포럼에 공식적으로 등록되어있지 않고 이 문서의 주인인 클리어자가 직접 체감 난이도를 매겼을 시 작성합니다.)] ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 레벨 제작 관련 정보}}}}}}'''[*기준] ||
||<width=30%> {{{-1 단독 제작 레벨}}}[br]'''{{{+3 000}}}''' ||<width=30%> {{{-1 합작 레벨}}}[br]'''{{{+3 000}}}''' ||<width=30%> {{{-1 총 레벨 개수}}}[br]'''{{{+3 000}}}''' ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 작곡 관련 정보}}}}}}'''[*기준] ||
||<bgcolor=#000000><color=#fff> '''주 장르''' ||<-2>○○○, ○○○, ○○○ 등 ||
||<bgcolor=#000000><color=#fff> '''곡 개수''' ||<-2>000[* 커스텀 레벨에 사용된 곡 문단에 서술된 곡의 수를 서술합니다.] ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 개발 관련 정보}}}}}}'''[*기준] ||
||<bgcolor=#000000><color=#fff> '''제작한 모드 개수''' ||<-2>○○○, ○○○ 등 000개 ||
||<bgcolor=#000000><color=#fff> '''제작한 프로그램 개수''' ||<-2>○○○, ○○○ 등 000개 ||
||<-3><bgcolor=#000000><nopad>'''{{{+1 {{{#fff | 주요 링크}}}}}}''' ||
||<-3>[[사용자:|[[파일:Role_Icon_Admin.png|width=25]]]] | [[https://www.youtube.com/channel/|[[파일:Youtube.png|width=25]]]] | [[https://steamcommunity.com/profiles/|[[파일:Steam.svg|width=25]]]] | [[https://tuforums.com/profile/|[[파일:TUF-logo.png|width=25]]]] | [[https://x.com/|[[파일:X.jpg|width=25]]]] | [[https://soundcloud.com/|[[파일:Soundcloud.png|width=25]]]] | [[https://.bandcamp.com/|[[파일:Bandcamp.svg|width=25]]]] | [[https://open.spotify.com/artist/|[[파일:Spotify.svg|width=25]]]] | [[https://music.apple.com/kr/artist/|[[파일:apple_music_logo.png|width=25]]]] | [[https://github.com/|[[파일:GitHub.svg|width=25&theme=light]][[파일:GitHubDark.svg|width=25&theme=dark]]]] | [[https://discord.gg/|[[파일:Discord.png|width=25]]]] ||`;

    document.getElementById("person_output").textContent = result;
}
