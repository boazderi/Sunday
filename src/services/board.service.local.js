import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg
}
window.cs = boardService

// todo: this function need to be edit later

async function query(filterBy = { txt: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.boardName) || regex.test(board.description))
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

// todo update this function later
function getEmptyBoard() {
    return {
        boardName: '',
    }
}


// TEST DATA

// ;
// (async() => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "b101",
//         "title": "Sprint4 - Project Mgmt",
//         "description": "This board will be used for collaboration management on the Funday app project",
//         "createdAt": 1589983468418,
//         "createdBy": {
//             "id": "u101",
//             "fullname": "Tal Liber",
//             "imgUrl": "http://some-img"
//         },
//         "members": [{
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u102",
//                 "fullname": "Arnon Arditi",
//                 "imgUrl": "",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u103",
//                 "fullname": "Boaz Deri",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#3a86ff"
//             },
//             {
//                 "id": "u104",
//                 "fullname": "Tal Amit",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#ff006e"
//             }
//         ],
//         "activities": [{
//             "id": "a101",
//             "txt": "Changed Color",
//             "createdAt": 154514,
//             "byMember": {
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img"
//             },
//             "task": {
//                 "id": "c101",
//                 "title": "Replace Logo"
//             }
//         }],
//         "groups": [{
//                 "id": "gy5LnM",
//                 "title": "Frontend",
//                 "tasks": [{
//                         "id": "t2yn4E",
//                         "taskTitle": "Complete UI for demo1",
//                         "status": "IN WORK",
//                         "members": [{
//                                 "id": "u101",
//                                 "fullname": "Tal Liber",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#8338ec"
//                             },
//                             {
//                                 "id": "u102",
//                                 "fullname": "Arnon Arditi",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#3a86ff"
//                             }
//                         ],
//                         "date": "2022-03-28T21:00:00.000Z",
//                         "priority": "HIGH",
//                     },
//                     {
//                         "id": "t2yvg",
//                         "taskTitle": "Learn CSS",
//                         "status": "DONE",
//                         "members": [{
//                                 "id": "u101",
//                                 "fullname": "Tal Liber",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#8338ec"
//                             },
//                             {
//                                 "id": "u102",
//                                 "fullname": "Arnon Arditi",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#3a86ff"
//                             }
//                         ],
//                         "date": "2022-03-28T21:00:00.000Z",
//                         "priority": "LOW",
//                         "comments": [{
//                                 "creator": "Arnon Arditi",
//                                 "content": "can some one help me"
//                             },
//                             {
//                                 "creator": "Tal Amit",
//                                 "content": "fix problem with bug"
//                             },
//                             {
//                                 "creator": "Boaz Deri",
//                                 "content": "i can help"
//                             },
//                             {
//                                 "creator": "Tal Liber",
//                                 "content": "made that dnd work"
//                             }
//                         ]
//                     }
//                 ],
//             },
//             {
//                 "id": "tyCQHY",
//                 "title": "Routes & pages",
//                 "tasks": [{
//                     "id": "t2eevg",
//                     "taskTitle": "finis grid layout",
//                     "status": "Done",
//                     "members": [{
//                             "id": "u102",
//                             "fullname": "Arnon Arditi",
//                             "imgUrl": "https://www.google.com",
//                             "color": "#8338ec"
//                         },
//                         {
//                             "id": "u101",
//                             "fullname": "Tal Liber",
//                             "imgUrl": "https://www.google.com",
//                             "color": "#ffbe0b"
//                         }
//                     ],
//                     "date": "2022-03-08T22:00:00.000Z",
//                     "priority": "LOW"
//                 }]
//             }
//         ]

//     })
// })()

// ;
// (async() => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "b101",
//         "title": "Sprint4 - Project Mgmt",
//         "description": "This board will be used for collaboration management on the Funday app project",
//         "createdAt": 1589983468418,
//         "createdBy": {
//             "id": "u101",
//             "fullname": "Tal Liber",
//             "imgUrl": "http://some-img"
//         },
//         "members": [{
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u102",
//                 "fullname": "Arnon Arditi",
//                 "imgUrl": "",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u103",
//                 "fullname": "Boaz Deri",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#3a86ff"
//             },
//             {
//                 "id": "u104",
//                 "fullname": "Tal Amit",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#ff006e"
//             }
//         ],
//         "activities": [{
//             "id": "a101",
//             "txt": "Changed Color",
//             "createdAt": 154514,
//             "byMember": {
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img"
//             },
//             "task": {
//                 "id": "c101",
//                 "title": "Replace Logo"
//             }
//         }],
//         "groups": [{
//                 "id": "gy5LnM",
//                 "title": "Frontend",
//                 "tasks": [{
//                         "id": "t2yn4E",
//                         "taskTitle": "Complete UI for demo1",
//                                 "status": "status-picker",
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-28T21:00:00.000Z"
//                             }
//                         ],
//                         "comments": [{
//                                 "creator": "Arnon Arditi",
//                                 "content": "can some one help me"
//                             },
//                             {
//                                 "creator": "Tal Amit",
//                                 "content": "fix problem with bug"
//                             },
//                             {
//                                 "creator": "Boaz Deri",
//                                 "content": "i can help"
//                             },
//                             {
//                                 "creator": "Tal Liber",
//                                 "content": "made that dnd work"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tyCQHY",
//                         "title": "Routes & pages",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ffbe0b"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-08T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tdAYQ1",
//                         "title": "Dashboards / BI",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-10T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tM21Dc",
//                         "title": "task crud",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-21T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tkZP69",
//                         "title": "Guest functionality",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-02T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tvhcgs",
//                         "title": "CSS/SCSS",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     },
//                                     {
//                                         "id": "u104",
//                                         "fullname": "Tal Amit",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ffbe0b"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-31T21:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tGHVTo",
//                         "title": "Notifications / Chat",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Stuck"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-11T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tHZHYI",
//                         "title": "Sort Component",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-16T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "twJ3I8",
//                         "title": "Loading feature",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-15T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tLFRul",
//                         "title": "Group List Design",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-29T21:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "twtWvS",
//                         "title": "Login / signup page + Logout",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tMZJTI",
//                         "title": "change url to board id on task-preview",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "id": "gE1sWb",
//                 "title": "Smart Components",
//                 "tasks": [{
//                         "id": "tl7hOU",
//                         "title": "switch set status to dumb",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "trV6cr",
//                         "title": "when clicking a different status collapse all the rest",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Stuck"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-29T21:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tOiAz3",
//                         "title": "on status picker \"working on it\" does not change to orange",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ],
//                 "groupColor": "#2ecbff"
//             },
//             {
//                 "id": "gUYFvs",
//                 "title": "Completed",
//                 "tasks": [{
//                         "id": "t0zknv",
//                         "title": "Create Technical Design Document",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "ti2G9v",
//                         "title": "Folder structure",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tHEYk5",
//                         "title": "Store",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "to4odq",
//                         "title": "Main app component",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "thv22F",
//                         "title": "group crud",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tANzw2",
//                         "title": "basic CRUDL with FE service",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "t3HMYg",
//                         "title": "task details",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ],
//                 "groupColor": "#eac510"
//             },
//             {
//                 "id": "gl41DR",
//                 "title": "Backend",
//                 "tasks": [{
//                         "id": "tAS9ke",
//                         "title": "convert to awaits",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                     "id": "u103",
//                                     "fullname": "Boaz Deri",
//                                     "imgUrl": "https://www.google.com",
//                                     "color": "#ff006e"
//                                 }]
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "ts6Pfe",
//                         "title": "Setup database architecture in mongoDB",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tlTzsG",
//                         "title": "Load data to DB",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "t78YOI",
//                         "title": "sockets",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                     "id": "u103",
//                                     "fullname": "Boaz Deri",
//                                     "imgUrl": "https://www.google.com",
//                                     "color": "#ff006e"
//                                 }]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tzN8IS",
//                         "title": "Auth for users",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ],
//                 "groupColor": "#c457ff"
//             },
//             {
//                 "id": "gCp8Vx",
//                 "title": "Miscelleneous",
//                 "tasks": [{
//                         "id": "tB02il",
//                         "title": "Create app logo",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                     "id": "u103",
//                                     "fullname": "Boaz Deri",
//                                     "imgUrl": "https://www.google.com",
//                                     "color": "#ff006e"
//                                 }]
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tsTwIo",
//                         "title": "Create Design Document",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tAOGVd",
//                         "title": "Create git repository with collaboration",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tmuMhT",
//                         "title": "Upload to Hiroku",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ],
//                         "groupColor": "#2fbc34"
//                     }
//                 ],
//                 "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
//             }
//         ]
//     })
//     await storageService.post(STORAGE_KEY, {
//         "_id": "b102",
//         "title": "HR sales",
//         "description": "This board will be used for collaboration",
//         "createdAt": 1589983468418,
//         "createdBy": {
//             "id": "u101",
//             "fullname": "Tal Liber",
//             "imgUrl": "http://some-img"
//         },
//         "members": [{
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u102",
//                 "fullname": "Arnon Arditi",
//                 "imgUrl": "",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u103",
//                 "fullname": "Boaz Deri",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#3a86ff"
//             },
//             {
//                 "id": "u104",
//                 "fullname": "Tal Amit",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#ff006e"
//             }
//         ],
//         "activities": [{
//             "id": "a101",
//             "txt": "Changed Color",
//             "createdAt": 154514,
//             "byMember": {
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img"
//             },
//             "task": {
//                 "id": "c101",
//                 "title": "Replace Logo"
//             }
//         }],
//         "groups": [{
//                 "id": "gy5LnM",
//                 "title": "Frontend",
//                 "tasks": [{
//                         "id": "t2yn4E",
//                         "title": "Complete UI for demo1",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-28T21:00:00.000Z"
//                             }
//                         ],
//                         "comments": [{
//                                 "creator": "Arnon Arditi",
//                                 "content": "can some one help me"
//                             },
//                             {
//                                 "creator": "Tal Amit",
//                                 "content": "fix problem with bug"
//                             },
//                             {
//                                 "creator": "Boaz Deri",
//                                 "content": "i can help"
//                             },
//                             {
//                                 "creator": "Tal Liber",
//                                 "content": "made that dnd work"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tyCQHY",
//                         "title": "Routes & pages",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ffbe0b"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-08T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tdAYQ1",
//                         "title": "Dashboards / BI",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-10T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tM21Dc",
//                         "title": "task crud",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-21T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tkZP69",
//                         "title": "Guest functionality",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-02T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tvhcgs",
//                         "title": "CSS/SCSS",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     },
//                                     {
//                                         "id": "u104",
//                                         "fullname": "Tal Amit",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ffbe0b"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-31T21:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tGHVTo",
//                         "title": "Notifications / Chat",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Stuck"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-11T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tHZHYI",
//                         "title": "Sort Component",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-16T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "twJ3I8",
//                         "title": "Loading feature",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-15T22:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tLFRul",
//                         "title": "Group List Design",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-29T21:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "twtWvS",
//                         "title": "Login / signup page + Logout",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tMZJTI",
//                         "title": "change url to board id on task-preview",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "id": "gE1sWb",
//                 "title": "Smart Components",
//                 "tasks": [{
//                         "id": "tl7hOU",
//                         "title": "switch set status to dumb",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Working on it"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "trV6cr",
//                         "title": "when clicking a different status collapse all the rest",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Stuck"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": "2022-03-29T21:00:00.000Z"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tOiAz3",
//                         "title": "on status picker \"working on it\" does not change to orange",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ],
//                 "groupColor": "#2ecbff"
//             },
//             {
//                 "id": "gUYFvs",
//                 "title": "Completed",
//                 "tasks": [{
//                         "id": "t0zknv",
//                         "title": "Create Technical Design Document",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "ti2G9v",
//                         "title": "Folder structure",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tHEYk5",
//                         "title": "Store",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "to4odq",
//                         "title": "Main app component",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "thv22F",
//                         "title": "group crud",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": "Done"
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tANzw2",
//                         "title": "basic CRUDL with FE service",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "t3HMYg",
//                         "title": "task details",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ],
//                 "groupColor": "#eac510"
//             },
//             {
//                 "id": "gl41DR",
//                 "title": "Backend",
//                 "tasks": [{
//                         "id": "tAS9ke",
//                         "title": "convert to awaits",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                     "id": "u103",
//                                     "fullname": "Boaz Deri",
//                                     "imgUrl": "https://www.google.com",
//                                     "color": "#ff006e"
//                                 }]
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "ts6Pfe",
//                         "title": "Setup database architecture in mongoDB",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tlTzsG",
//                         "title": "Load data to DB",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "t78YOI",
//                         "title": "sockets",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                     "id": "u103",
//                                     "fullname": "Boaz Deri",
//                                     "imgUrl": "https://www.google.com",
//                                     "color": "#ff006e"
//                                 }]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tzN8IS",
//                         "title": "Auth for users",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     }
//                 ],
//                 "groupColor": "#c457ff"
//             },
//             {
//                 "id": "gCp8Vx",
//                 "title": "Miscelleneous",
//                 "tasks": [{
//                         "id": "tB02il",
//                         "title": "Create app logo",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                     "id": "u103",
//                                     "fullname": "Boaz Deri",
//                                     "imgUrl": "https://www.google.com",
//                                     "color": "#ff006e"
//                                 }]
//                             },
//                             {
//                                 "type": "date-picker"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tsTwIo",
//                         "title": "Create Design Document",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": []
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tAOGVd",
//                         "title": "Create git repository with collaboration",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ]
//                     },
//                     {
//                         "id": "tmuMhT",
//                         "title": "Upload to Hiroku",
//                         "cols": [{
//                                 "type": "status-picker",
//                                 "value": null
//                             },
//                             {
//                                 "type": "member-picker",
//                                 "value": [{
//                                         "id": "u101",
//                                         "fullname": "Tal Liber",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#8338ec"
//                                     },
//                                     {
//                                         "id": "u102",
//                                         "fullname": "Arnon Arditi",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#3a86ff"
//                                     },
//                                     {
//                                         "id": "u103",
//                                         "fullname": "Boaz Deri",
//                                         "imgUrl": "https://www.google.com",
//                                         "color": "#ff006e"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "type": "date-picker",
//                                 "value": null
//                             }
//                         ],
//                         "groupColor": "#2fbc34"
//                     }
//                 ],
//                 "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
//             }
//         ]
//     })
// })()