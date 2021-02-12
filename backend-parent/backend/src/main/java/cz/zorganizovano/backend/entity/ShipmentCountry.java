package cz.zorganizovano.backend.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import cz.zorganizovano.backend.serializer.ShipmentCountrySerializer;
import java.util.Arrays;

@JsonSerialize(using = ShipmentCountrySerializer.class)
public enum ShipmentCountry {
    CESKA_REPUBLIKA("Česká republika"),
    SLOVENSKA_REPUBLIKA("Slovenská republika");
    
    private final String name;
    
    ShipmentCountry(String name) {
        this.name = name;
    }
    
    public static ShipmentCountry findByName(String name) {
        return Arrays.asList(ShipmentCountry.values()).stream()
            .filter(shipmentCountry -> shipmentCountry.getName().equals(name))
            .findFirst()
            .orElseThrow(NullPointerException::new);
    }

    public String getName() {
        return name;
    }
}
