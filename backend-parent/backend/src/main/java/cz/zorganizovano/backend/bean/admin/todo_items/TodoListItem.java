package cz.zorganizovano.backend.bean.admin.todo_items;

import cz.zorganizovano.backend.entity.TodoItem.Priority;
import java.util.Date;

public class TodoListItem {

    private long id;
    private Date created;
    private Date updated;
    private String name;
    private String descriptionShort;
    private Priority priority;

    public TodoListItem() {
    }

    public TodoListItem(long id, Date created, Date updated, String name, String descriptionShort, Priority priority) {
        this.id = id;
        this.created = created;
        this.updated = updated;
        this.name = name;
        this.descriptionShort = descriptionShort;
        this.priority = priority;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescriptionShort() {
        return descriptionShort;
    }

    public void setDescriptionShort(String descriptionShort) {
        this.descriptionShort = descriptionShort;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

}
