package cz.zorganizovano.backend.bean;

public class PaginatedData<T> {

    private final T data;
    private final long totalItems;

    public PaginatedData(T data, long totalItems) {
        this.data = data;
        this.totalItems = totalItems;
    }

    public T getData() {
        return data;
    }

    public long getTotalItems() {
        return totalItems;
    }

}
