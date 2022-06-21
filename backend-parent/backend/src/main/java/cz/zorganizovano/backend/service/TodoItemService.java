package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.admin.todo_items.CreateTodoItem;
import cz.zorganizovano.backend.entity.TodoItem;

public interface TodoItemService {
    
    void create(CreateTodoItem itemToCreate);
    
    TodoItem update(TodoItem todoItem, CreateTodoItem itemToCreate);
    
}
