package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.bean.admin.todo_items.TodoListItem;
import cz.zorganizovano.backend.entity.TodoItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface TodoItemDao extends JpaRepository<TodoItem, Long> {
    
    @Query(
        "SELECT new cz.zorganizovano.backend.bean.admin.todo_items.TodoListItem( " +
        "   todoItem.id, " +
        "   todoItem.created, " +
        "   todoItem.updated, " +
        "   todoItem.name, " +
        "   CONCAT(SUBSTRING(todoItem.description, 1, 100), '...'), " +
        "   todoItem.priority " +
        ") " +
        "FROM TodoItem todoItem " +
        "ORDER BY " +
            "CASE WHEN todoItem.priority = 'LOW' THEN 10 " +
            "WHEN todoItem.priority = 'HIGH' THEN 1000 " +
            "ELSE 100 " +
            "END DESC, " +
            "todoItem.created DESC"
    )
    List<TodoListItem> findAllOrderByCreatedDesc();
    
}
