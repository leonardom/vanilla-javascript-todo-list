
let tasks = JSON.parse(localStorage.getItem('tasks'))

if (tasks === null) {
	tasks = [{ title: 'teste', completed: true}]
}

const ul = document.getElementById('todo-list')

const inputText = document.getElementById('new-todo')

inputText.addEventListener('keydown', function(event) {
	if (event.keyCode === 13) {
		tasks.push({
			title: inputText.value,
			completed: false
		})
		inputText.value = ''
		save()
		renderList()
	}
})

const clearCompleted = document.getElementById('clear-completed')

clearCompleted.addEventListener('click', function() {
	if (confirm('Are you sure you want to remove all completed tasks?')) {
		tasks =  tasks.filter(function(value) {
			return !value.completed
		})

		save()
		renderList()
	}	
})

function renderList() {
	clearList()

	tasks.forEach(function(item, index) {
		ul.appendChild(createListItem(item, index))		
	})
}

function createListItem(item, index) {
	let li = document.createElement('li')
	li.className = 'todo'
	li.id = 'item-li-' + index

	let div = document.createElement('div')
	div.className = 'view'

	let check = document.createElement('input')
	check.className = 'toggle'
	check.type = 'checkbox'
	check.setAttribute('onclick', 'done(this)')
	check.setAttribute('item-index', index)
	check.checked = item.completed

	let label = document.createElement('label')
	label.id = 'item-label-' + index
	label.innerHTML = item.title

	if (item.completed) {
		label.className = 'todo-completed'
	}

	div.appendChild(check)
	div.appendChild(label)

	li.appendChild(div)

	return li
}

function clearList() {
	ul.innerHTML = ''
}

function done(event) {
	let index = event.getAttribute('item-index')
	let task = tasks[index]
	let label = document.getElementById('item-label-' + index)

	if (event.checked) {
		task.completed = true
		label.className = 'todo-completed'
	} else {
		label.className = ''
		task.completed = false
	}

	save()
}

function save() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

renderList()