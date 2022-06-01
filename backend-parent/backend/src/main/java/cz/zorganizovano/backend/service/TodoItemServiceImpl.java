package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.admin.todo_items.CreateTodoItem;
import cz.zorganizovano.backend.dao.TodoItemDao;
import cz.zorganizovano.backend.entity.TodoItem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoItemServiceImpl implements TodoItemService {
    
    private final TodoItemDao todoItemDao;
    
    public TodoItemServiceImpl(TodoItemDao todoItemDao) {
        this.todoItemDao = todoItemDao;
    }

    @Override
    @Transactional
    public void create(CreateTodoItem itemToCreate) {
        TodoItem todoItem = new TodoItem();
        todoItem.setName(itemToCreate.getName());
        todoItem.setDescription(itemToCreate.getDescription());
        todoItem.setPriority(TodoItem.Priority.valueOf(itemToCreate.getPriority()));
        
        todoItemDao.save(todoItem);
    }
    
    @Override
    @Transactional
    public TodoItem update(TodoItem todoItem, CreateTodoItem itemToCreate) {
        todoItem.setName(itemToCreate.getName());
        todoItem.setDescription(itemToCreate.getDescription());
        todoItem.setPriority(TodoItem.Priority.valueOf(itemToCreate.getPriority()));
        return todoItem;
    }
    
}
