package cz.zorganizovano.backend.bean.admin.todo_items;

import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public class CreateTodoItem {

    @NotBlank(message = "Název je povinný.")
    @Length(max = 255, message = "Název je omezený na 255 znaků.")
    private String name;
    @NotBlank(message = "Popis je povinný.")
    private String description;
    @NotBlank(message = "Priorita je povinná.")
    private String priority;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

}
