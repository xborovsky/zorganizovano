package cz.zorganizovano.backend.entity;

import cz.zorganizovano.backend.serializer.ShipmentTypeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = ShipmentTypeSerializer.class)
public enum ShipmentType {

    ZASILKOVNA("Zásilkovna", 70),
    CESKA_POSTA("Česká pošta", 89);

    private final String readableName;
    private final double price;

    ShipmentType(String readableName, double price) {
        this.readableName = readableName;
        this.price = price;
    }

    public String getReadableName() {
        return readableName;
    }

    public double getPrice() {
        return price;
    }

}
