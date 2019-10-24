package cz.zorganizovano.backend.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import cz.zorganizovano.backend.entity.ShipmentType;
import java.io.IOException;

public class ShipmentTypeSerializer extends StdSerializer<ShipmentType> {

    public ShipmentTypeSerializer() {
        this(null);
    }

    public ShipmentTypeSerializer(Class<ShipmentType> clazz) {
        super(clazz);
    }

    @Override
    public void serialize(ShipmentType shipmentType, JsonGenerator generator, SerializerProvider provider) throws IOException {
        generator.writeStartObject();
        generator.writeFieldName("name");
        generator.writeString(shipmentType.name());
        generator.writeFieldName("readableName");
        generator.writeString(shipmentType.getReadableName());
        generator.writeFieldName("price");
        generator.writeNumber(shipmentType.getPrice());
        generator.writeEndObject();
    }

}
