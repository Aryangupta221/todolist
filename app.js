document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoForm = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');

  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
  };

  const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('.todo').forEach(todo => {
          tasks.push({
              text: todo.querySelector('li').textContent,
              completed: todo.classList.contains('completed')
          });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTaskToDOM = (taskText, completed = false) => {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      if (completed) {
          todoDiv.classList.add('completed');
      }

      const newTodo = document.createElement('li');
      newTodo.textContent = taskText;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);

      // Edit button
      const editButton = document.createElement('button');
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.classList.add('edit-btn');
      todoDiv.appendChild(editButton);

      // Check Mark button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);

      // Trash button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);

      saveTasks();
  };

  todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = todoInput.value.trim();
      if (taskText) {
          addTaskToDOM(taskText);
          todoInput.value = '';
      }
  });

  todoList.addEventListener('click', (e) => {
      const item = e.target;
      const todo = item.closest('.todo');

      // Delete Task
      if (item.classList.contains('trash-btn')) {
          todo.remove();
      }

      // Mark Task as Completed
      if (item.classList.contains('complete-btn')) {
          todo.classList.toggle('completed');
      }

      // Edit Task
      if (item.classList.contains('edit-btn')) {
          const todoText = todo.querySelector('li').textContent;
          const newText = prompt('Edit your task:', todoText);
          if (newText) {
              todo.querySelector('li').textContent = newText.trim();
          }
      }

      saveTasks();
  });

  loadTasks();
});
