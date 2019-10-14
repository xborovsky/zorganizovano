package cz.zorganizovano.backend.delivery;

public enum DeliveryOptions {

    CESKA_POSTA("Česká pošta"),
    ZASILKOVNA("Zásilkovna");

    private final String name;

    DeliveryOptions(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
