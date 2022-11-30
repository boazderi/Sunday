

// const mailSvgs = {
//     questMark: `<svg class="t7" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg>`,
//     controls: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>`,
//     search: `<svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>`,
//     bars: `<svg focusable="false" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`,
//     back: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/arrow_back_baseline_nv700_20dp.png`,
//     archive: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/archive_baseline_nv700_20dp.png`,
//     spam: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/report_baseline_nv700_20dp.png`,
//     snooze: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/schedule_baseline_nv700_20dp.png`,
//     sent: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/send_baseline_nv700_20dp.png`,
//     times: `https://ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_16px_1x.png/`,
//     readStat: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/mail_baseline_nv700_20dp.png',
//     trash: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>`,
//     star: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/star_baseline_nv700_20dp.png',
//     pencil: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg>`,
//     inbox: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/inbox_fill_baseline_p900_20dp.png',
//     important: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_baseline_nv700_20dp.png',
//     button1: '//ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_16px_1x.png',
//     starBase: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png',
//     starYellow: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png',
//     impBase: 'https://www.gstatic.com/images/icons/material/system_gm/1x/label_important_outline_black_20dp.png',
//     impYellow: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_fill_googyellow500_20dp.png',
//     label: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_baseline_nv700_20dp.png',
//     refresh: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/refresh_baseline_nv700_20dp.png',
//     filterBtn: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>',
//     inbox: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/inbox_fill_baseline_p900_20dp.png',
//     important: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_baseline_nv700_20dp.png',
//     1: '//ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_16px_1x.png',
//     starBase: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png',
//     starYellow: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png',
//     impBase: 'https://www.gstatic.com/images/icons/material/system_gm/1x/label_important_outline_black_20dp.png',
//     impYellow: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_fill_googyellow500_20dp.png',
//     label: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_baseline_nv700_20dp.png',
//     refresh: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/refresh_baseline_nv700_20dp.png',
//     filterBtn: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>',
//     draft: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/draft_fill_baseline_p900_20dp.png',
//     addLabel: '//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/add_large_baseline_nv700_20dp.png',
//     folderLabel: 'https://www.gstatic.com/images/icons/material/system_gm_filled/1x/label_gm_grey_24dp.png',
// 
// }

const mondayMain = {
    // header(the line where the name of the project)
    info: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.5 13.708h1V9.021h-1Zm.5-5.896q.229 0 .396-.156.166-.156.166-.406 0-.229-.156-.396-.156-.166-.406-.166-.229 0-.396.156-.166.156-.166.406 0 .229.156.396.156.166.406.166Zm0 9.605q-1.521 0-2.875-.584-1.354-.583-2.365-1.593-1.01-1.011-1.593-2.365-.584-1.354-.584-2.875 0-1.542.584-2.885Q3.75 5.771 4.76 4.76q1.011-1.01 2.365-1.593Q8.479 2.583 10 2.583q1.542 0 2.885.584 1.344.583 2.355 1.593 1.01 1.011 1.593 2.355.584 1.343.584 2.885 0 1.521-.584 2.875-.583 1.354-1.593 2.365-1.011 1.01-2.355 1.593-1.343.584-2.885.584Zm0-1q2.667 0 4.542-1.875T16.417 10q0-2.667-1.875-4.542T10 3.583q-2.667 0-4.542 1.875T3.583 10q0 2.667 1.875 4.542T10 16.417ZM10 10Z"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM12 17.1l-3.625 2.2q-.175.075-.313.063-.137-.013-.262-.088-.125-.1-.187-.237-.063-.138-.013-.313l.975-4.125-3.2-2.75q-.15-.125-.187-.275-.038-.15.012-.3.075-.125.175-.213.1-.087.275-.137l4.225-.35 1.65-3.9q.05-.175.188-.237.137-.063.287-.063.15 0 .288.063.137.062.187.237l1.65 3.9 4.225.35q.175.05.275.137.1.088.175.213.05.15.012.3-.037.15-.187.275l-3.2 2.75.975 4.125q.05.175-.013.313-.062.137-.187.237-.125.075-.262.088-.138.012-.313-.063Zm0-3.85Z"/></svg>',
    boardActivity: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m3.125 14.688-.729-.709 5.437-5.437 3.125 3.104 4.959-4.896h-2.75v-1h4.437v4.438h-1v-2.73l-5.646 5.625-3.104-3.125Z"/></svg>',
    // todo -find and add last seen icon-in imgSrc minwhile
    invite: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M14.812 10.75V9.021h-1.708v-1h1.708V6.312h1v1.709h1.709v1h-1.709v1.729Zm-6.791-1q-1.063 0-1.781-.719-.719-.719-.719-1.76 0-1.063.719-1.781.718-.719 1.781-.719 1.041 0 1.771.719.729.718.729 1.781 0 1.041-.729 1.76-.73.719-1.771.719Zm-5.438 5.458v-1.333q0-.437.219-.792.219-.354.615-.583 1.083-.604 2.25-.938 1.166-.333 2.354-.333 1.187 0 2.354.333 1.167.334 2.25.938.396.229.615.583.218.355.218.792v1.333Zm1-1h8.875v-.333q0-.167-.104-.302-.104-.135-.271-.24-.916-.521-1.958-.812-1.042-.292-2.104-.292-1.083 0-2.115.292-1.031.291-1.948.812-.187.105-.281.24-.094.135-.094.302Zm4.438-5.437q.625 0 1.062-.448.438-.448.438-1.073 0-.604-.448-1.042-.448-.437-1.052-.437-.625 0-1.063.437-.437.438-.437 1.063t.437 1.062q.438.438 1.063.438Zm0-1.521Zm0 6.958Z"/></svg>',

    // sub-Header
    mainTable: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.562 15.438h2.23V10.5h4.416v4.938h2.23V8.271L10 4.917 5.562 8.271Zm-1 1V7.771L10 3.667l5.438 4.104v8.667h-4.23V11.5H8.792v4.938ZM10 10.188Z"/></svg>',
    integrate: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.396 15.438h1.208v-1.23l2.854-2.854V7.792q0-.104-.073-.177t-.177-.073H6.792q-.104 0-.177.073t-.073.177v3.562l2.854 2.854Zm-1 1v-1.813l-2.854-2.854V7.833q0-.521.364-.895.365-.376.886-.376h1.27l-.374.667V3.562h1v2.98h2.624v-2.98h1v3.667l-.374-.667h1.27q.521 0 .886.376.364.374.364.895v3.938l-2.854 2.854v1.813ZM10 11.542Z"/></svg>',
    //todo-verify if automate shape is ok -tal
    automate: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.562 11.5q-.624 0-1.062-.438-.438-.437-.438-1.062T3.5 8.948q.438-.427 1.062-.427V6.562q0-.416.303-.708.302-.292.697-.292h2.959q0-.624.427-1.052.427-.427 1.052-.427t1.052.427q.427.428.427 1.052h2.959q.395 0 .697.292.303.292.303.708v1.959q.624 0 1.062.427.438.427.438 1.052t-.438 1.062q-.438.438-1.062.438v3.917q0 .416-.303.708-.302.292-.697.292H5.562q-.416 0-.708-.292t-.292-.708Zm2.98-1.25q.312 0 .531-.219.219-.219.219-.531 0-.312-.219-.531-.219-.219-.531-.219-.313 0-.532.219-.218.219-.218.531 0 .312.218.531.219.219.532.219Zm4.666 0q.313 0 .532-.219.218-.219.218-.531 0-.312-.218-.531-.219-.219-.532-.219-.312 0-.52.219-.209.219-.209.531 0 .312.209.531.208.219.52.219Zm-4.937 2.958h5.458v-1H7.271Zm-1.709 2.209h8.876V6.562H5.562Zm0 0V6.562v8.855Z"/></svg>',
    arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m6.104 12.646-.708-.708L10 7.312l4.604 4.626-.708.708L10 8.771Z"/></svg>',

    //filters area- search,person,filter ,etc...
    // todo-color adjusment doesnt work-for every one in that section-maybe xmlns
    search: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m15.812 16.5-4.895-4.896q-.625.479-1.365.729t-1.51.25q-1.896 0-3.23-1.333-1.333-1.333-1.333-3.229 0-1.896 1.333-3.229 1.334-1.334 3.23-1.334t3.229 1.334q1.333 1.333 1.333 3.229 0 .791-.26 1.541-.261.75-.719 1.334l4.896 4.875Zm-7.77-4.917q1.5 0 2.531-1.031 1.031-1.031 1.031-2.531 0-1.5-1.031-2.531-1.031-1.032-2.531-1.032-1.5 0-2.532 1.032-1.031 1.031-1.031 2.531 0 1.5 1.031 2.531 1.032 1.031 2.532 1.031Z"/></svg>',
    person: '<svg xmlns="http://www.w3.org/2000/svg" color="#676879" height="20" width="20"><path d="M5.167 14.208q1.145-.75 2.323-1.104 1.177-.354 2.51-.354 1.333 0 2.51.354 1.178.354 2.323 1.104.792-.875 1.188-1.948.396-1.072.396-2.26 0-2.667-1.875-4.542T10 3.583q-2.688 0-4.552 1.875Q3.583 7.333 3.583 10q0 1.188.396 2.26.396 1.073 1.188 1.948ZM10 11.25q-1.146 0-1.948-.802T7.25 8.5q0-1.146.802-1.948T10 5.75q1.146 0 1.948.802T12.75 8.5q0 1.146-.802 1.948T10 11.25Zm0 6.167q-1.521 0-2.875-.584-1.354-.583-2.365-1.593-1.01-1.011-1.593-2.365-.584-1.354-.584-2.896 0-1.521.584-2.864Q3.75 5.771 4.76 4.76q1.011-1.01 2.365-1.593 1.354-.584 2.896-.584 1.521 0 2.864.584 1.344.583 2.355 1.593 1.01 1.011 1.593 2.355.584 1.343.584 2.885 0 1.521-.584 2.875-.583 1.354-1.593 2.365-1.011 1.01-2.355 1.593-1.343.584-2.885.584Zm0-1q1.083 0 2.135-.375 1.053-.375 1.948-1.084-.916-.583-1.937-.896-1.021-.312-2.146-.312t-2.167.292q-1.041.291-1.916.916.895.709 1.948 1.084 1.052.375 2.135.375Zm0-6.167q.708 0 1.229-.521.521-.521.521-1.229 0-.708-.521-1.229Q10.708 6.75 10 6.75q-.708 0-1.229.521-.521.521-.521 1.229 0 .708.521 1.229.521.521 1.229.521Zm0-1.75Zm0 6.479Z"/></svg>',
    filter: '<svg xmlns="http://www.w3.org/2000/svg" color="white" height="20" width="20"><path d="M9.896 15.438q-.167 0-.281-.115-.115-.115-.115-.261v-4.479L4.875 5q-.104-.125-.031-.281.073-.157.239-.157h9.834q.166 0 .239.157.073.156-.031.281L10.5 10.583v4.479q0 .146-.115.261-.114.115-.281.115ZM10 9.625l3.333-4.063H6.646Zm0 0Z"/></svg>',
    arrowDown: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10 12.688 5.396 8.083l.708-.708L10 11.25l3.896-3.875.708.708Z"/></svg>',
    sort: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m10 16.562-3.042-3.041.688-.688L10 15.188l2.354-2.355.688.688ZM7.646 7.104l-.688-.687L10 3.375l3.042 3.042-.688.687L10 4.75Z"/></svg>',
    hide: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m12.917 10.875-.979-.958q.104-.917-.511-1.448-.615-.531-1.344-.427l-.958-.959q.208-.083.437-.104.23-.021.438-.021 1.292 0 2.167.875.875.875.875 2.167 0 .208-.021.448-.021.24-.104.427Zm2.666 2.667-.708-.709q.729-.562 1.354-1.271.625-.708 1.042-1.562-1-2.083-2.969-3.271Q12.333 5.542 10 5.542q-.521 0-1.073.073-.552.073-1.031.218L7.062 5q.709-.25 1.469-.354.761-.104 1.469-.104 2.688 0 5.01 1.458 2.323 1.458 3.365 4-.458 1.042-1.156 1.917t-1.636 1.625Zm.292 3.75-2.5-2.521q-.667.312-1.542.5-.875.187-1.833.187-2.708 0-5.01-1.458-2.302-1.458-3.365-4 .5-1.167 1.313-2.146.812-.979 1.812-1.708L2.688 4.062l.708-.708 13.208 13.229ZM5.479 6.875q-.791.542-1.552 1.354-.76.813-1.198 1.771 1 2.083 2.969 3.271Q7.667 14.458 10 14.458q.729 0 1.448-.125t1.198-.291l-1.292-1.271q-.271.125-.646.198-.375.073-.708.073-1.271 0-2.156-.875-.886-.875-.886-2.167 0-.312.094-.688.094-.374.177-.666Zm5.459 2.167ZM9.5 10.771Z"/></svg>',
    more: '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.479 11.042q-.437 0-.739-.302T4.438 10q0-.438.312-.74t.75-.302q.438 0 .74.302t.302.74q0 .438-.313.74-.312.302-.75.302Zm4.521 0q-.438 0-.74-.302T8.958 10q0-.438.302-.74t.74-.302q.438 0 .74.302t.302.74q0 .438-.302.74t-.74.302Zm4.5 0q-.438 0-.74-.302t-.302-.74q0-.438.313-.74.312-.302.75-.302.437 0 .739.302t.302.74q0 .438-.312.74t-.75.302Z"/></svg>',
    
    // group
    addConversation:'<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m1.975 22.025 1.7-5.825q-.475-1-.725-2.05Q2.7 13.1 2.7 12q0-1.925.738-3.625.737-1.7 1.987-2.95 1.25-1.25 2.95-1.988Q10.075 2.7 12 2.7t3.625.737q1.7.738 2.95 1.988 1.25 1.25 1.987 2.95.738 1.7.738 3.625t-.738 3.625q-.737 1.7-1.987 2.95-1.25 1.25-2.95 1.987-1.7.738-3.625.738-1.1 0-2.15-.25-1.05-.25-2.05-.725ZM4.05 19.95l3.15-.925q.375-.1.712-.087.338.012.688.187.8.375 1.662.575.863.2 1.738.2 3.3 0 5.6-2.3t2.3-5.6q0-3.3-2.3-5.6T12 4.1q-3.3 0-5.6 2.3T4.1 12q0 .9.188 1.762.187.863.587 1.638.175.325.2.687.025.363-.1.713Zm7.25-4.275h1.4V12.7h2.95v-1.4H12.7V8.35h-1.4v2.95H8.35v1.4h2.95Zm.675-3.65Z"/></svg>',

    // side-nav
    workManagement: '<svg width="29" height="25" color="white" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5063 0.983153C0.782691 2.23087 0.3638 4.68688 1.57068 6.46881L11.7573 21.509C12.5031 22.6101 13.6951 23.1962 14.9037 23.1889C16.1107 23.1945 17.3004 22.6086 18.0451 21.509L28.2344 6.46481C29.4413 4.68289 29.0224 2.22688 27.2988 0.979157C25.5752 -0.268562 23.1995 0.164499 21.9927 1.94643L14.9012 12.4168L7.81243 1.95042C6.60555 0.168496 4.22991 -0.264566 2.5063 0.983153Z" fill="#D7D7FF"></path><path d="M2.50923 23.8352C0.785618 22.5875 0.366728 20.1315 1.57361 18.3495L11.7558 3.31581C12.499 2.21855 13.6853 1.63274 14.8897 1.6359C16.1013 1.62581 17.2971 2.21204 18.0447 3.3157L28.2269 18.3495C29.4338 20.1315 29.0149 22.5875 27.2913 23.8352C25.5677 25.0829 23.1921 24.6499 21.9852 22.8679L14.9003 12.4073L7.81536 22.8679C6.60848 24.6499 4.23284 25.0829 2.50923 23.8352Z" fill="url(#paint0_linear_1640_88925)"></path><path d="M10.2475 19.2773L5.59619 12.4098L10.2475 5.54228L14.8988 12.4098L10.2475 19.2773Z" fill="#C1C1FF"></path><defs><linearGradient id="paint0_linear_1640_88925" x1="18.3366" y1="19.6173" x2="15.7336" y2="1.25856" gradientUnits="userSpaceOnUse"><stop stop-color="#8F8FFF"></stop><stop offset="1" stop-color="#C2C2FF"></stop></linearGradient></defs></svg>',
    notifications: '<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M10 2.04999C10.4143 2.04999 10.75 2.38577 10.75 2.79999V3.61058C12.0546 3.75821 13.2785 4.34336 14.2159 5.28079C15.309 6.37389 15.9231 7.85644 15.9231 9.4023C15.9231 11.7406 16.1727 13.0548 16.3959 13.758C16.5068 14.1075 16.6088 14.2984 16.6645 14.3868C16.6835 14.4168 16.697 14.435 16.7038 14.4435C16.9179 14.6455 16.9953 14.9565 16.8964 15.2377C16.7908 15.538 16.5072 15.7389 16.1889 15.7389H12.9529C12.9516 15.8038 12.9418 15.8695 12.9226 15.9348C12.7439 16.5449 12.3725 17.0809 11.864 17.4623C11.3554 17.8437 10.7371 18.05 10.1015 18.05C9.46584 18.05 8.84746 17.8437 8.33891 17.4623C7.83037 17.0809 7.45905 16.5449 7.28027 15.9348C7.26115 15.8695 7.2513 15.8038 7.24997 15.7389H4.00001C3.71313 15.7389 3.45138 15.5752 3.32575 15.3173C3.20248 15.0643 3.23145 14.764 3.39963 14.5394C3.40133 14.5369 3.40486 14.5316 3.41004 14.5235C3.42459 14.5005 3.45231 14.4542 3.48918 14.3812C3.56285 14.2352 3.67358 13.9813 3.78854 13.5917C4.01863 12.812 4.26574 11.4886 4.26574 9.4023C4.26574 7.85644 4.87984 6.37389 5.97293 5.28079C6.865 4.38872 8.01646 3.81567 9.25004 3.63507V2.79999C9.25004 2.38577 9.58582 2.04999 10 2.04999ZM8.80705 15.7389C8.90698 15.9443 9.05465 16.1241 9.2389 16.2623C9.488 16.4491 9.79062 16.55 10.1015 16.55C10.4123 16.55 10.7149 16.4491 10.964 16.2623C11.1483 16.1241 11.2959 15.9443 11.3959 15.7389H8.80705ZM7.03359 6.34145C7.84538 5.52967 8.9464 5.07361 10.0944 5.07361C11.2425 5.07361 12.3435 5.52967 13.1553 6.34145C13.9671 7.15324 14.4231 8.25426 14.4231 9.4023C14.4231 11.8353 14.6814 13.3144 14.9661 14.2117L14.9748 14.2389H5.15815C5.18119 14.1682 5.20426 14.0941 5.22721 14.0163C5.50499 13.075 5.76574 11.6052 5.76574 9.4023C5.76574 8.25426 6.2218 7.15324 7.03359 6.34145Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    inbox:'<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M1.91632 11.0669C1.91632 10.6527 2.25211 10.3169 2.66632 10.3169H7.44893C7.86314 10.3169 8.19893 10.6527 8.19893 11.0669V11.6764C8.19893 11.9011 8.40478 12.1455 8.72429 12.1455H11.5939C11.9134 12.1455 12.1192 11.9011 12.1192 11.6764V11.0669C12.1192 10.6527 12.455 10.3169 12.8692 10.3169H17.333C17.7472 10.3169 18.083 10.6527 18.083 11.0669V13.3336C18.083 14.8523 16.8518 16.0836 15.333 16.0836H4.66632C3.14754 16.0836 1.91632 14.8523 1.91632 13.3336V11.0669ZM3.41632 11.8169V13.3336C3.41632 14.0239 3.97597 14.5836 4.66632 14.5836H15.333C16.0233 14.5836 16.583 14.0239 16.583 13.3336V11.8169H13.6142C13.5391 12.8634 12.6313 13.6455 11.5939 13.6455H8.72429C7.68683 13.6455 6.77904 12.8634 6.70395 11.8169H3.41632Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M5.84564 5.41675C5.59751 5.41675 5.37654 5.57371 5.29484 5.808L3.37482 11.3137C3.23843 11.7048 2.8108 11.9113 2.41968 11.7749C2.02857 11.6385 1.82208 11.2109 1.95847 10.8198L3.87849 5.31407C4.17029 4.47733 4.95947 3.91675 5.84564 3.91675H14.1543C15.0405 3.91675 15.8297 4.47733 16.1215 5.31407L18.0415 10.8198C18.1779 11.2109 17.9714 11.6385 17.5803 11.7749C17.1892 11.9113 16.7615 11.7048 16.6251 11.3137L14.7051 5.808C14.6234 5.57371 14.4024 5.41675 14.1543 5.41675H5.84564Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    myWork:'<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M5.99986 1.82129C6.41407 1.82129 6.74986 2.15708 6.74986 2.57129V4.10701H13.2499V2.57129C13.2499 2.15708 13.5856 1.82129 13.9999 1.82129C14.4141 1.82129 14.7499 2.15708 14.7499 2.57129V4.107H16.2856C16.7876 4.107 17.269 4.30643 17.624 4.66141C17.979 5.01639 18.1784 5.49784 18.1784 5.99986V16.2856C18.1784 16.7876 17.979 17.269 17.624 17.624C17.269 17.979 16.7876 18.1784 16.2856 18.1784H3.71415C3.21213 18.1784 2.73067 17.979 2.37569 17.624C2.02071 17.269 1.82129 16.7876 1.82129 16.2856V5.99986C1.82129 5.49784 2.02071 5.01639 2.37569 4.66141C2.73067 4.30643 3.21213 4.107 3.71415 4.107C3.763 4.107 3.81077 4.11168 3.85702 4.1206C3.90326 4.11168 3.95102 4.10701 3.99986 4.10701H5.24986V2.57129C5.24986 2.15708 5.58565 1.82129 5.99986 1.82129ZM5.24986 7.14272V5.60701H3.99986C3.95101 5.60701 3.90324 5.60234 3.85699 5.59342C3.81075 5.60233 3.76299 5.607 3.71415 5.607C3.60995 5.607 3.51003 5.64839 3.43635 5.72207C3.36268 5.79574 3.32129 5.89567 3.32129 5.99986V16.2856C3.32129 16.3898 3.36268 16.4897 3.43635 16.5634C3.51003 16.637 3.60995 16.6784 3.71415 16.6784H16.2856C16.3898 16.6784 16.4897 16.637 16.5634 16.5634C16.637 16.4897 16.6784 16.3898 16.6784 16.2856V5.99986C16.6784 5.89567 16.637 5.79574 16.5634 5.72207C16.4897 5.64839 16.3898 5.607 16.2856 5.607H14.7499V7.14272C14.7499 7.55693 14.4141 7.89272 13.9999 7.89272C13.5856 7.89272 13.2499 7.55693 13.2499 7.14272V5.60701H6.74986V7.14272C6.74986 7.55693 6.41407 7.89272 5.99986 7.89272C5.58565 7.89272 5.24986 7.55693 5.24986 7.14272ZM13.4214 9.92231C13.6942 9.61058 13.6626 9.13676 13.3509 8.864C13.0392 8.59124 12.5653 8.62283 12.2926 8.93455L8.75058 12.9825L7.02129 11.6856C6.68992 11.437 6.21982 11.5042 5.97129 11.8356C5.72276 12.1669 5.78992 12.637 6.12129 12.8856L8.407 14.5999C8.72086 14.8353 9.16309 14.789 9.42144 14.4937L13.4214 9.92231Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    sideStar:'<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M10 3.90449L8.30061 7.34943C8.20168 7.5491 8.05582 7.72182 7.87554 7.85278C7.69525 7.98374 7.4859 8.06904 7.26543 8.10138L3.46267 8.65796L6.21005 11.3431C6.21018 11.3432 6.20992 11.343 6.21005 11.3431C6.37003 11.499 6.48998 11.6919 6.55878 11.9044C6.6275 12.1167 6.64348 12.3425 6.60534 12.5624C6.60528 12.5628 6.60521 12.5632 6.60514 12.5636L5.95599 16.3534L9.3594 14.563C9.5569 14.4592 9.77687 14.4048 10 14.4048C10.2231 14.4048 10.4429 14.4591 10.6404 14.5629L14.0349 16.3477L13.3857 12.5579C13.3856 12.5574 13.3856 12.5569 13.3855 12.5565C13.3474 12.3367 13.3634 12.1109 13.4321 11.8987C13.5009 11.6862 13.6204 11.4936 13.7804 11.3378C13.7805 11.3376 13.7803 11.3379 13.7804 11.3378L16.5322 8.65463L12.7353 8.10149C12.5148 8.06915 12.3048 7.98374 12.1245 7.85278C11.9442 7.72182 11.7983 7.54911 11.6994 7.34943L10 3.90449ZM10.5623 3.34904L11.2344 3.01626C11.1205 2.78619 10.9446 2.59254 10.7265 2.45714C10.5083 2.32175 10.2567 2.25 10 2.25C9.74328 2.25 9.49166 2.32175 9.27355 2.45714C9.05543 2.59254 8.87949 2.78619 8.76558 3.01626L6.98466 6.6265L2.99539 7.21037L2.99209 7.21086C2.73857 7.24912 2.50078 7.35743 2.30552 7.52359C2.11027 7.68974 1.9653 7.90714 1.88697 8.15127C1.80864 8.39539 1.80006 8.65655 1.8622 8.90529C1.92422 9.15357 2.05423 9.37963 2.23762 9.55808C2.23796 9.55842 2.2383 9.55875 2.23865 9.55909L5.11621 12.3715L4.43615 16.3417C4.43605 16.3422 4.43594 16.3428 4.43584 16.3434C4.39159 16.5975 4.41961 16.8589 4.51674 17.0979C4.6141 17.3374 4.77694 17.5446 4.98662 17.6958C5.1963 17.8471 5.44434 17.9362 5.70233 17.953C5.95874 17.9697 6.21467 17.9142 6.44115 17.793L10 15.9209L13.5498 17.7874C13.7763 17.9085 14.0322 17.964 14.2885 17.9473C14.5465 17.9305 14.7946 17.8414 15.0042 17.6901C15.2139 17.5389 15.3768 17.3317 15.4741 17.0922C15.5712 16.8532 15.5993 16.5918 15.555 16.3378C15.5549 16.3372 15.5548 16.3365 15.5547 16.3359L14.8747 12.3658L17.7568 9.55566C17.7571 9.55536 17.7574 9.55505 17.7577 9.55475C17.9412 9.37628 18.0712 9.15018 18.1332 8.90186C18.1954 8.65312 18.1868 8.39196 18.1085 8.14784C18.0301 7.90371 17.8852 7.68632 17.6899 7.52016C17.4946 7.354 17.2569 7.24569 17.0033 7.20743L13.0153 6.62645L11.2349 3.01724L10.5623 3.34904Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    // todo-see plans vertical side in green-maybe to produce manuualy(with fa in monday)
    apps:'<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M5.6579 4.88C5.6579 3.28943 6.9472 2 8.53766 2C10.1281 2 11.4174 3.28943 11.4174 4.88C11.4174 4.89526 11.4173 4.91051 11.4171 4.92572H13.0502C14.1675 4.92572 15.0732 5.83153 15.0732 6.94891V8.58332C15.0889 8.58307 15.1045 8.58295 15.1202 8.58295C16.7107 8.58295 18 9.87237 18 11.4629C18 13.0535 16.7107 14.3429 15.1202 14.3429C15.1045 14.3429 15.0889 14.3428 15.0732 14.3426V15.9768C15.0732 17.0942 14.1675 18 13.0502 18H4.02304C2.90574 18 2 17.0942 2 15.9768V13.5322C2 13.3096 2.10806 13.1009 2.28982 12.9723C2.47157 12.8438 2.70441 12.8115 2.91427 12.8858C3.07072 12.9411 3.23976 12.9715 3.41737 12.9715C4.25045 12.9715 4.9258 12.2961 4.9258 11.4629C4.9258 10.6298 4.25045 9.95437 3.41737 9.95437C3.23975 9.95437 3.07072 9.98478 2.91427 10.0401C2.70441 10.1143 2.47157 10.0821 2.28982 9.95353C2.10806 9.82501 2 9.61625 2 9.39363V6.9489C2 5.83153 2.90575 4.92572 4.02304 4.92572H5.65825C5.65802 4.91051 5.6579 4.89526 5.6579 4.88ZM8.53766 3.37143C7.70458 3.37143 7.02923 4.04683 7.02923 4.88C7.02923 5.05755 7.05961 5.22652 7.11489 5.38292C7.18906 5.5928 7.15675 5.82562 7.02824 6.00736C6.89972 6.1891 6.69099 6.29715 6.46841 6.29715H4.02304C3.66311 6.29715 3.37133 6.58895 3.37133 6.9489V8.5833C3.38665 8.58306 3.402 8.58294 3.41737 8.58294C5.00783 8.58294 6.29714 9.87237 6.29714 11.4629C6.29714 13.0535 5.00783 14.3429 3.41737 14.3429C3.402 14.3429 3.38665 14.3428 3.37133 14.3426V15.9768C3.37133 16.3368 3.66311 16.6286 4.02304 16.6286H13.0502C13.4101 16.6286 13.7019 16.3368 13.7019 15.9768V13.5319C13.7019 13.3092 13.81 13.1004 13.9918 12.9719C14.1737 12.8434 14.4066 12.8112 14.6165 12.8855C14.7731 12.941 14.9424 12.9715 15.1202 12.9715C15.9533 12.9715 16.6287 12.2961 16.6287 11.4629C16.6287 10.6298 15.9533 9.95438 15.1202 9.95438C14.9424 9.95438 14.7731 9.98488 14.6165 10.0404C14.4066 10.1147 14.1737 10.0825 13.9918 9.95399C13.81 9.82548 13.7019 9.61667 13.7019 9.39399V6.94891C13.7019 6.58895 13.4101 6.29715 13.0502 6.29715H10.6069C10.3843 6.29715 10.1756 6.1891 10.0471 6.00736C9.91857 5.82562 9.88626 5.5928 9.96044 5.38292C10.0157 5.22652 10.0461 5.05755 10.0461 4.88C10.0461 4.04683 9.37074 3.37143 8.53766 3.37143Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    sideInvite:'<svg viewBox="0 0 20 20" color="white"  fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M7.27093 2.34404C7.7399 2.14979 8.24254 2.0498 8.75015 2.0498C9.25776 2.0498 9.7604 2.14979 10.2294 2.34404C10.6983 2.53829 11.1245 2.82302 11.4834 3.18195C11.8423 3.54088 12.127 3.967 12.3213 4.43597C12.5156 4.90494 12.6155 5.40758 12.6155 5.91519C12.6155 6.4228 12.5156 6.92544 12.3213 7.39441C12.127 7.86338 11.8423 8.28949 11.4834 8.64843C11.1245 9.00736 10.6983 9.29208 10.2294 9.48634C9.7604 9.68059 9.25776 9.78057 8.75015 9.78057C8.24254 9.78057 7.7399 9.68059 7.27093 9.48634C6.80196 9.29209 6.37584 9.00736 6.01691 8.64843C5.65798 8.28949 5.37325 7.86338 5.179 7.39441C4.98475 6.92544 4.88477 6.4228 4.88477 5.91519C4.88477 5.40758 4.98475 4.90494 5.179 4.43597C5.37325 3.967 5.65798 3.54088 6.01691 3.18195C6.37584 2.82302 6.80196 2.53829 7.27093 2.34404ZM8.75015 3.5498C8.43952 3.5498 8.13194 3.61099 7.84496 3.72986C7.55797 3.84873 7.29722 4.02296 7.07757 4.24261C6.85792 4.46226 6.68369 4.72301 6.56482 5.01C6.44595 5.29698 6.38477 5.60456 6.38477 5.91519C6.38477 6.22582 6.44595 6.5334 6.56482 6.82038C6.68369 7.10736 6.85792 7.36812 7.07757 7.58777C7.29722 7.80742 7.55798 7.98165 7.84496 8.10052C8.13194 8.21939 8.43952 8.28057 8.75015 8.28057C9.06078 8.28057 9.36836 8.21939 9.65534 8.10052C9.94232 7.98165 10.2031 7.80742 10.4227 7.58777C10.6424 7.36812 10.8166 7.10736 10.9355 6.82038C11.0544 6.5334 11.1155 6.22582 11.1155 5.91519C11.1155 5.60456 11.0544 5.29698 10.9355 5.01C10.8166 4.72301 10.6424 4.46226 10.4227 4.24261C10.2031 4.02296 9.94233 3.84873 9.65534 3.72986C9.36836 3.61099 9.06078 3.5498 8.75015 3.5498Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M8.33935 10.7312C8.3512 10.7307 8.36306 10.7305 8.37491 10.7305H9.12469C9.13838 10.7305 9.15198 10.7308 9.1655 10.7314 9.7888 10.7566 10.4024 10.8595 10.9888 11.0353 11.4913 11.1859 11.4963 11.8685 11.0942 12.2054 10.9063 12.3628 10.6558 12.4142 10.4202 12.3465 9.99646 12.2249 9.55476 12.1529 9.10634 12.1337H8.39335C7.53853 12.1703 6.70811 12.3988 5.97999 12.7977 5.24701 13.1992 4.64204 13.7602 4.22255 14.4273 3.80542 15.0907 3.58548 15.8372 3.58328 16.5965H9.12469L9.12963 16.5965H9.21466C9.47166 16.5965 9.69353 16.7699 9.78802 17.0089 9.96102 17.4465 9.67351 17.9997 9.203 17.9997H9.12509L9.12014 17.9997H2.79163C2.35443 17.9997 2 17.6856 2 17.2981V16.6097C1.9997 15.6068 2.2887 14.6203 2.83955 13.7443 3.39044 12.8682 4.18491 12.1314 5.14751 11.6041 6.1101 11.0767 7.20884 10.7762 8.33935 10.7312zM14.7002 11.5C15.1144 11.5 15.4502 11.8358 15.4502 12.25V14H17.2002C17.6144 14 17.9502 14.3358 17.9502 14.75 17.9502 15.1642 17.6144 15.5 17.2002 15.5H15.4502V17.25C15.4502 17.6642 15.1144 18 14.7002 18 14.286 18 13.9502 17.6642 13.9502 17.25V15.5H12.2002C11.786 15.5 11.4502 15.1642 11.4502 14.75 11.4502 14.3358 11.786 14 12.2002 14H13.9502V12.25C13.9502 11.8358 14.286 11.5 14.7002 11.5z" fill="currentColor"></path></svg>',
    sideSearch:'<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    help:'<svg viewBox="0 0 20 20" color="white" fill="currentColor" width="23" height="23" aria-hidden="true" class="icon_component surface-item-icon icon_component--no-focus-style"><path d="M10.4397 3.50655C9.93674 3.47178 9.43392 3.57593 8.98617 3.80762C8.53842 4.03931 8.16298 4.38962 7.90088 4.82027C7.63877 5.25092 7.5001 5.74533 7.5 6.24948C7.49992 6.66369 7.16407 6.99941 6.74986 6.99933C6.33564 6.99925 5.99992 6.6634 6 6.24919C6.00015 5.47006 6.21447 4.70597 6.61954 4.04042C7.02461 3.37487 7.60484 2.83347 8.29681 2.47541C8.98878 2.11734 9.76587 1.95638 10.5431 2.01012C11.3204 2.06386 12.068 2.33024 12.7041 2.78013C13.3402 3.23002 13.8404 3.84611 14.15 4.56107C14.4596 5.27604 14.5667 6.06236 14.4597 6.83409C14.3526 7.60582 14.0354 8.33327 13.5429 8.93693C13.0503 9.54059 12.4012 9.99723 11.6667 10.2569C11.4716 10.3259 11.3028 10.4537 11.1834 10.6226C11.064 10.7916 10.9999 10.9934 11 11.2003V12.3743C11 12.7885 10.6642 13.1243 10.25 13.1243C9.83579 13.1243 9.5 12.7885 9.5 12.3743V11.2011C9.49981 10.684 9.65995 10.1792 9.95838 9.75691C10.2569 9.33453 10.679 9.01513 11.1667 8.84273C11.642 8.67468 12.0619 8.37921 12.3807 7.9886C12.6994 7.598 12.9046 7.1273 12.9739 6.62794C13.0432 6.12858 12.9739 5.61979 12.7735 5.15717C12.5732 4.69454 12.2495 4.29589 11.8379 4.00479C11.4263 3.71368 10.9426 3.54132 10.4397 3.50655ZM10.25 15.1246C10.0151 15.1246 9.78555 15.1942 9.59026 15.3247C9.39498 15.4552 9.24277 15.6406 9.15289 15.8576C9.06301 16.0746 9.0395 16.3134 9.08532 16.5437C9.13114 16.7741 9.24423 16.9857 9.41031 17.1518C9.57639 17.3178 9.78798 17.4309 10.0183 17.4768C10.2487 17.5226 10.4874 17.4991 10.7044 17.4092C10.9214 17.3193 11.1069 17.1671 11.2374 16.9718C11.3679 16.7765 11.4375 16.5469 11.4375 16.3121C11.4375 15.9971 11.3124 15.6951 11.0897 15.4724C10.867 15.2497 10.5649 15.1246 10.25 15.1246Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
    // the nine symetric points in the side-nav
    multiPoints:'<svg viewBox="0 0 32 32" fill="currentColor" width="36" height="36" role="button" tabindex="0" aria-hidden="false" class="icon_component icon_component--clickable icon_component--no-focus-style"><path d="M5 7.6551C5 6.19071 6.18712 5 7.65151 5 9.1159 5 10.303 6.19071 10.303 7.6551 10.303 9.11949 9.1159 10.3102 7.65151 10.3102 6.18712 10.3102 5 9.11949 5 7.6551zM5 15.9996C5 14.5352 6.18712 13.3445 7.65151 13.3445 9.1159 13.3445 10.303 14.5352 10.303 15.9996 10.303 17.464 9.1159 18.6547 7.65151 18.6547 6.18712 18.6547 5 17.464 5 15.9996zM7.65151 21.6899C6.18712 21.6899 5 22.8807 5 24.345 5 25.8094 6.18712 27.0001 7.65151 27.0001 9.1159 27.0001 10.303 25.8094 10.303 24.345 10.303 22.8807 9.1159 21.6899 7.65151 21.6899zM13.3333 7.6551C13.3333 6.19071 14.5204 5 15.9848 5 17.4491 5 18.6363 6.19071 18.6363 7.6551 18.6363 9.11949 17.4491 10.3102 15.9848 10.3102 14.5204 10.3102 13.3333 9.11949 13.3333 7.6551zM24.3483 5C22.8839 5 21.6968 6.19071 21.6968 7.6551 21.6968 9.11949 22.8839 10.3102 24.3483 10.3102 25.8127 10.3102 26.9998 9.11949 26.9998 7.6551 26.9998 6.19071 25.8127 5 24.3483 5zM13.3333 15.9996C13.3333 14.5352 14.5204 13.3445 15.9848 13.3445 17.4491 13.3445 18.6363 14.5352 18.6363 15.9996 18.6363 17.464 17.4491 18.6547 15.9848 18.6547 14.5204 18.6547 13.3333 17.464 13.3333 15.9996zM15.9848 21.6897C14.5204 21.6897 13.3333 22.8804 13.3333 24.3448 13.3333 25.8092 14.5204 26.9999 15.9848 26.9999 17.4491 26.9999 18.6363 25.8092 18.6363 24.3448 18.6363 22.8804 17.4491 21.6897 15.9848 21.6897zM21.6667 15.9996C21.6667 14.5352 22.8539 13.3445 24.3183 13.3445 25.7826 13.3445 26.9698 14.5352 26.9698 15.9996 26.9698 17.464 25.7826 18.6547 24.3183 18.6547 22.8539 18.6547 21.6667 17.464 21.6667 15.9996zM24.3183 21.6899C22.8539 21.6899 21.6667 22.8807 21.6667 24.345 21.6667 25.8094 22.8539 27.0001 24.3183 27.0001 25.7826 27.0001 26.9698 25.8094 26.9698 24.345 26.9698 22.8807 25.7826 21.6899 24.3183 21.6899z" fill="currentColor"></path></svg>',
    
    // others
    add:'<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.5 14.667V10.5H5.333v-1H9.5V5.333h1V9.5h4.167v1H10.5v4.167Z"/></svg>'

}

const imgSrc = {
    lastSeen: 'https://cdn1.monday.com/dapulse_default_photo.png',
    mondayLogo: 'https://cdn.monday.com/images/logos/monday_logo_icon.png',

}
// funcs
function getMondayMainSvg(iconName) {
    return mondayMain[iconName]
}
function getImgSrc(imgName) {
    return imgSrc[imgName]
}

// function getMailSvg(iconName) {
//     return mailSvgs[iconName]
// }
export const svgService = { getMondayMainSvg, getImgSrc }







