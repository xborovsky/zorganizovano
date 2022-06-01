package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.todo_items.CreateTodoItem;
import cz.zorganizovano.backend.bean.admin.todo_items.TodoListItem;
import cz.zorganizovano.backend.dao.TodoItemDao;
import cz.zorganizovano.backend.entity.TodoItem;
import cz.zorganizovano.backend.service.TodoItemService;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/todo-items")
public class TodoItemsEndpoint {
    
    private final TodoItemDao todoItemDao;
    private final TodoItemService todoItemService;
    
    public TodoItemsEndpoint(TodoItemDao todoItemDao, TodoItemService todoItemService) {
        this.todoItemDao = todoItemDao;
        this.todoItemService = todoItemService;
    }

    @GetMapping
    public List<TodoListItem> getTodoItems() {
        return todoItemDao.findAllOrderByCreatedDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoItem> getTodoItem(@PathVariable("id") long id) {
        Optional<TodoItem> todoItem = todoItemDao.findById(id);
        if (!todoItem.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(todoItem.get());
    }
    
    @DeleteMapping("/{id}")
    public void deleteTodoItem(@PathVariable("id") long id) {
        todoItemDao.deleteById(id);
    }

    @PutMapping
    public void createTodoItem(@RequestBody CreateTodoItem createTodoItem) {
        todoItemService.create(createTodoItem);
    }

    @PostMapping("/{id}")
    public ResponseEntity<TodoItem> updateTodoItem(@PathVariable("id") long id, @RequestBody CreateTodoItem createTodoItem) {
        Optional<TodoItem> todoItem = todoItemDao.findById(id);
        if (!todoItem.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        TodoItem updated = todoItemService.update(todoItem.get(), createTodoItem);
        return ResponseEntity.ok(updated);
    }
    
}
