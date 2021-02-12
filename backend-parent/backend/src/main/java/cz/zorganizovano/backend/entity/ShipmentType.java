package cz.zorganizovano.backend.entity;

import cz.zorganizovano.backend.serializer.ShipmentTypeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@JsonSerialize(using = ShipmentTypeSerializer.class)
public enum ShipmentType {

    ZASILKOVNA("Zásilkovna", 70, new ShipmentCountry[] { ShipmentCountry.CESKA_REPUBLIKA }),
    CESKA_POSTA("Česká pošta", 89, new ShipmentCountry[] { ShipmentCountry.CESKA_REPUBLIKA }),
    ONLINE("Online (pouze pro dárkové poukazy)", 0, new ShipmentCountry[] { ShipmentCountry.CESKA_REPUBLIKA, ShipmentCountry.SLOVENSKA_REPUBLIKA }),
    ZASIELKOVNA("Zásielkovňa", 129, new ShipmentCountry[] { ShipmentCountry.SLOVENSKA_REPUBLIKA });

    private final String readableName;
    private final double price;
    private final ShipmentCountry[] deliveryCountries;

    ShipmentType(String readableName, double price, ShipmentCountry[] deliveryCountries) {
        this.readableName = readableName;
        this.price = price;
        this.deliveryCountries = deliveryCountries;
    }

    public String getReadableName() {
        return readableName;
    }

    public double getPrice() {
        return price;
    }

    public ShipmentCountry[] getDeliveryCountries() {
        return deliveryCountries;
    }

    public static List<ShipmentType> getShipmentTypesByDeliveryCountry(ShipmentCountry country) {
        return Arrays.asList(ShipmentType.values()).stream()
            .filter(shipmentType -> Arrays.asList(shipmentType.getDeliveryCountries()).contains(country))
            .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return "ShipmentType{" + "readableName=" + readableName + ", price=" + price + '}';
    }

}
