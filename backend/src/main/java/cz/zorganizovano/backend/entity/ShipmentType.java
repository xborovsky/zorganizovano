package cz.zorganizovano.backend.entity;

import cz.zorganizovano.backend.serializer.ShipmentTypeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = ShipmentTypeSerializer.class)
public enum ShipmentType {

    ZASILKOVNA("Zásilkovna"),
    CESKA_POSTA("Česká pošta");

    private final String readableName;

    ShipmentType(String readableName) {
        this.readableName = readableName;
    }

    public String getReadableName() {
        return readableName;
    }

}
