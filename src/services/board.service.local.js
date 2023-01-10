import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { socketService, SOCKET_EMIT_LOAD_CURRBOARD } from './socket.service.js'

// todo- change the storagekey to base url the Baseurl
const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getBoardById,
    save,
    removeBoard,
    getEmptyBoard,
    addBoardMsg,
    updateBoard,
    addNewTask,
    removeTasks,
    duplicateTasks,
    duplicateGroup,
    deleteGroup,
    addGroup,
    filterCurrBoard,
    addBoard
}
window.cs = boardService

async function query() {
    return await httpService.get('board')
}

async function getBoardById(boardId) {
    try {
        const board = await httpService.get(`board/${boardId}`)
        return board

    } catch (err) {
        throw err
    }
}

async function removeBoard(boardId) {
    try {
        const boardIdServer = await httpService.delete(`board/${boardId}`)
        return boardIdServer
    } catch (err) {
        throw new Error('loadBoards')
    }
}

async function save(board) {
    try {
        if (board._id) {
            await httpService.put(`board/${board._id}`, board)
            // socket for each update
            socketService.emit(SOCKET_EMIT_LOAD_CURRBOARD, board._id)
            return
        }
        else {
            return httpService.post('board', board)
        }
    } catch (err) {
        throw err
    }
}

async function addBoardMsg(boardId, txt) {

    const board = await getBoardById(boardId)
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

function updateBoard(currBoard, groupId, taskId, prop, toUpdate) {
    var updatedBoard = JSON.parse(JSON.stringify(currBoard))

    if (taskId) {
        const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
        const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        updatedBoard.groups[groupIdx].tasks[taskIdx][prop] = toUpdate
    } else if (groupId) {
        const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
        updatedBoard.groups[groupIdx][prop] = toUpdate
    } else {
        updatedBoard[prop] = toUpdate
    }

    return updatedBoard
}

async function addBoard() {
    try {
        const newBoard = _getEmptyBoard()
        const boardId = await save(newBoard)
        newBoard._id = boardId
        return newBoard

    } catch (err) {
        throw new Error('loadBoards')
    }
}

function _getEmptyBoard() {
    return {
        title: 'New board',
        description: 'New board description',
        createdAt: Date.now(),
        cmpOrder: ["status", "members", "priority", "date", "textNote", "file", "timeline"],
        labels: ["Status", "Person", "Priority", "Date", "Text", "File", "Timeline"],
        progLineOrder: ["status-progress", "div", "priority-progress", "div", "div", "div", "timeline-width"],
        createdBy: {
            "id": "u101",
            "fullname": "Tal Liber",
            "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg"
        },
        // Note-12.12 data structure changed 
        // the default members need to be with the same id as DB!! 
        members: [
            {
                "id": "63973b2d1eaf6788972f5104",
                "username": "Tal",
                "password": "$2b$10$RaTK7ZunP1dOcFI/SdkmVerwxTbnfgtS/SUg7uNC5BwAocIU7EPPO",
                "fullname": "Tal Liber",
                "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670851717/fhp5jlfirtsbzkl4mqyt.jpg",
                "color": "#8338ec"
            },
            {
                "id": "63973b451eaf6788972f5105",
                "username": "Arnon",
                "password": "$2b$10$RpqYeY4kH6wuiUWf5vsBGu7ck01GwaZpXHBWSWgvsQ6N8mZrX7Xdi",
                "fullname": "Arnon Arditi",
                "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/ggfq1eh886iohap9nmmd.jpg",
                "color": "#8338ec"
            },
            {
                "id": "63982ecba46074d44e318b8a",
                "fullname": "Boaz Deri",
                "username": "Boaz",
                "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188872/v24ixm31xhncmyyjkqpx.jpg",
                "color": "#3a86ff"
            }
        ],
        activities: [],
        groups: [_getEmptyGroup()]
    }
}

// the optimistic approach - update sychronous and if fail its go back to the 
// loadboards with the prv state from backend(just fail to update the board)
async function addNewTask({ boardId, groupId, taskTitle, status }) {
    try {
        var currBoard = await getBoardById(boardId)
        const groupIdx = currBoard.groups.findIndex(g => g.id === groupId)
        const newTask = _getEmptyTask(taskTitle)
        if (status) {
            newTask.status = status
        }
        currBoard.groups[groupIdx].tasks.push(newTask)
        // note keep it synchronous and in failure 
        // the loadBoards dispatch will action

        save(currBoard)
        return currBoard

    } catch (err) {
        throw new Error('loadBoards')
    }
}

async function removeTasks({ boardId, selectedTasks }) {
    try {

        var currBoard = await getBoardById(boardId)
        currBoard.groups.forEach(group => {
            var tasks = group.tasks

            selectedTasks.forEach(selectedId => {
                const idx = tasks.findIndex(t => t.id === selectedId)
                if (idx !== -1) tasks.splice(idx, 1)
            })
        })
        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }
}
async function duplicateTasks({ boardId, selectedTasks }) {
    try {
        var currBoard = await getBoardById(boardId)
        currBoard.groups.forEach(group => {
            var tasks = group.tasks

            selectedTasks.forEach(selectedId => {
                const task = tasks.find(t => t.id === selectedId)
                if (task) tasks.push(task)
            })
        })
        save(currBoard)
        return currBoard

    } catch (err) {
        throw new Error('loadBoards')
    }
}
async function duplicateGroup({ boardId, groupId }) {
    try {
        var currBoard = await getBoardById(boardId)
        const dupGroup = JSON.parse(JSON.stringify(currBoard.groups.find(g => g.id === groupId)))
        dupGroup.id = utilService.makeId()

        dupGroup.tasks.forEach(t => t.id = utilService.makeId())
        currBoard.groups.push(dupGroup)
        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }
}
async function deleteGroup({ boardId, groupId }) {
    try {
        var currBoard = await getBoardById(boardId)
        const idx = currBoard.groups.findIndex(g => g.id === groupId)
        currBoard.groups.splice(idx, 1)
        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }

}
async function addGroup(boardId) {
    try {
        var currBoard = await getBoardById(boardId)
        const newGroup = _getEmptyGroup()
        currBoard.groups.push(newGroup)

        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }
}

function filterCurrBoard(currBoard, filterBy) {
    var filteredBoard = JSON.parse(JSON.stringify(currBoard))

    const regex = new RegExp(filterBy.text, 'i')

    var filteredGroups = []
    for (var i = 0; i < filteredBoard.groups.length; i++) {
        var toPush = true
        var currGroup = filteredBoard.groups[i]
        if (filterBy.text) {
            if (regex.test(currGroup.title)) {
                filteredGroups.push(currGroup)
                continue
            }
        }
        var filteredTasks = []
        for (var j = 0; j < currGroup.tasks.length; j++) {
            var toContinue = false
            const currTask = currGroup.tasks[j]
            if (filterBy.text) {
                toPush = false
                if (regex.test(currTask.taskTitle)) {
                    filteredTasks.push(currTask)
                    toContinue = true
                    continue
                }
            }
            if (toContinue) continue

            for (var x = 0; x < filterBy.members.length; x++) {
                toPush = false
                const currMember = filterBy.members[x]
                for (var n = 0; n < currTask.members.length; n++) {
                    if (currTask.members[n].id === currMember.id) {
                        filteredTasks.push(currTask)
                        toContinue = true
                        continue
                    }
                }
            }
            if (toContinue) continue

            for (var y = 0; y < filterBy.dynamicProps.length; y++) {
                if (toContinue) continue
                const currProp = filterBy.dynamicProps[y].prop
                const currValues = filterBy.dynamicProps[y].values
                for (var m = 0; m < currValues.length; m++) {
                    toPush = false

                    if (currTask[currProp] === currValues[m]) {
                        filteredTasks.push(currTask)
                        toContinue = true
                        continue
                    }
                    if (toContinue) continue
                }
            }
            if (toContinue) continue
        }
        if (filteredTasks.length) {
            currGroup.tasks = filteredTasks
            filteredGroups.push(currGroup)
        }
        if (toPush) filteredGroups.push(currGroup)
    }
    filteredBoard.groups = filteredGroups
    return filteredBoard
}

function _getEmptyTask(taskTitle) {
    return {
        id: utilService.makeId(),
        taskTitle,
        status: 'Empty',
        priority: 'EMPTY',
        textNote: '',
        members: [],
        comments: []
    }
}

function _getEmptyGroup() {
    // todo-get random color
    return {
        id: utilService.makeId(),
        title: 'New Group',
        color: 'green',
        tasks: [],
    }
}

function getEmptyBoard() {
    return {
        boardName: '',
    }
}



