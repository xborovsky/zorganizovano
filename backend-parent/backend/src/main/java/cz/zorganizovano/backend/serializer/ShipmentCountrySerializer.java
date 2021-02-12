package cz.zorganizovano.backend.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import cz.zorganizovano.backend.entity.ShipmentCountry;
import java.io.IOException;

public class ShipmentCountrySerializer extends StdSerializer<ShipmentCountry> {

    private static final long serialVersionUID = 93288464316502761L;

    public ShipmentCountrySerializer() {
        this(null);
    }

    public ShipmentCountrySerializer(Class<ShipmentCountry> clazz) {
        super(clazz);
    }

    @Override
    public void serialize(ShipmentCountry shipmentCountry, JsonGenerator generator, SerializerProvider provider) throws IOException {
        generator.writeStartObject();
        generator.writeFieldName("enumName");
        generator.writeString(shipmentCountry.name());
        generator.writeFieldName("name");
        generator.writeString(shipmentCountry.getName());
        generator.writeEndObject();
    }
    
}
