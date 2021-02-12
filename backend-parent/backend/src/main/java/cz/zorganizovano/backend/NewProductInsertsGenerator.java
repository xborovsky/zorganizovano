package cz.zorganizovano.backend;

import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class NewProductInsertsGenerator {
    
    private static final String ITEM_INSERT_TEMPLATE = "INSERT INTO `zorganizovano`.`items` (`name`,`subname`,`description`,`price`,`discount_price`,`meta_title`,`category_id`) " +
                                                        "VALUES (??, ??, ??, ??, ??, ??, ??);";
    private static final String ITEM_DETAIL_INSERT_TEMPLATE = "INSERT INTO `zorganizovano`.`item_details` (`item_id`,`key`,`value`,`priority_order`) " + 
                                                                "VALUES (?, ?, ?, ?);";
    private static final String STOCK_ITEM_INSERT_TEMPLATE = "INSERT INTO `zorganizovano`.`stock_items` (`item_id`,`quantity`,`display_on_eshop`,`thumbnail_location`,`enable_online_shipment`) " +
                                                                "VALUES (?, ?, ?, ?, ?);";
    private static final String STOCK_ITEM_PICTURES_INSERT_TEMPLATE = "INSERT INTO `zorganizovano`.`stock_item_pictures` (`stock_item_id`,`src`,`is_main`) " +
                                                                "VALUES (?, ?, ?);";

    private static final String SUBNAME = "Štítek na potraviny 5x5 cm";
    private static final String DESCRIPTION = "Co dodá vaší spíži na jednotnosti a zároveň zpřehlední její obsah? Jednoznačně štítky pro označení potravin. Můžete mít několik druhů dóz, vysoké, nízké, kulaté či hranaté, skleněné nebo plechové - ale když je všechny označíte stejně, jen tak něco se vám ve spíži neztratí a navíc to bude i pěkně vypadat. Srovnaná a zorganizovaná spíž pak vede k menšímu plýtvání potravin a většímu přehledu, co vlastně doma máte a z čeho všeho můžete uvařit. Štítky jsou omyvatelné, určeny do exteriéru, v interiéru tedy velmi odolné. Rozměr nálepky je 5x5 cm a text je ryze český.";
    private static final double PRICE = 10;
    private static final String META_TITLE = "Co dodá vaší spíži na jednotnosti a zároveň zpřehlední její obsah? Jednoznačně štítky pro označení potravin. Můžete mít několik druhů dóz, vysoké, nízké, kulaté či hranaté, skleněné nebo plechové - ale když je všechny označíte stejně, jen tak něco se vám ve spíži neztratí a navíc to bude i pěkně vypadat.";
    
    private static final int START_ITEM_ID = 21;

    public static void main(String[] args) throws Exception {
        OutputStreamWriter osw = new OutputStreamWriter(System.out, "UTF-8");
        PrintWriter p = new PrintWriter(osw);
        
        List<Prod> newProduct = new ArrayList<>();
        newProduct.add(new Prod("HLADKÁ MOUKA PŠENIČNÁ", 7));
        newProduct.add(new Prod("POLOHRUBÁ MOUKA PŠENIČNÁ", 7));
        newProduct.add(new Prod("HRUBÁ MOUKA PŠENIČNÁ", 7));
        newProduct.add(new Prod("DĚTSKÁ KRUPICE PŠENIČNÁ", 7));
        newProduct.add(new Prod("HLADKÁ MOUKA ŠPALDOVÁ", 7));
        newProduct.add(new Prod("CELOZRNNÉ VLOČKY OVESNÉ", 7));
        newProduct.add(new Prod("CELOZRNNÉ VLOČKY OVESNÉ, ŽITNÉ, PŠENIČNÉ", 7));
        newProduct.add(new Prod("BULGUR (PŠENIČNÁ KRUPKA)", 7));
        newProduct.add(new Prod("KUSKUS (PŠENIČNÁ KRUPICE)", 7));
        newProduct.add(new Prod("BÍLÁ RÝŽE", 7));
        newProduct.add(new Prod("JASMÍNOVÁ RÝŽE", 7));
        newProduct.add(new Prod("BASMATI RÝŽE", 7));
        newProduct.add(new Prod("NATURAL RÝŽE", 7));
        newProduct.add(new Prod("RÝŽOVÁ KRUPIČKA", 7));
        newProduct.add(new Prod("ARBORIO RÝŽE", 7));
        newProduct.add(new Prod("JÁHLY", 7));
        newProduct.add(new Prod("POLENTA KUKUŘIČNÁ", 7));
        newProduct.add(new Prod("MOUKA KUKUŘIČNÁ", 7));
        newProduct.add(new Prod("CUKR KRUPICE", 8));
        newProduct.add(new Prod("CUKR MOUČKA", 8));
        newProduct.add(new Prod("CUKR TŘTINOVÝ", 8));
        newProduct.add(new Prod("MED", 8));
        newProduct.add(new Prod("FRUKTÓZA", 8));
        newProduct.add(new Prod("XYLITOL", 8));
        newProduct.add(new Prod("ČEKANKOVÝ SIRUP", 8));
        newProduct.add(new Prod("JAVOROVÝ SIRUP", 8));
        newProduct.add(new Prod("CUKR KOKOSOVÝ", 8));
        newProduct.add(new Prod("PENNE", 9));
        newProduct.add(new Prod("SPAGHETTI", 9));
        newProduct.add(new Prod("LASAGNE", 9));
        newProduct.add(new Prod("FUSILLI", 9));
        newProduct.add(new Prod("TARHOŇA", 9));
        newProduct.add(new Prod("POLÉVKOVÉ NUDLE", 9));
        newProduct.add(new Prod("RÝŽOVÉ NUDLE", 9));
        newProduct.add(new Prod("MACARONI", 9));
        newProduct.add(new Prod("CHIA", 10));
        newProduct.add(new Prod("SLUNEČNICE", 10));
        newProduct.add(new Prod("LEN", 10));
        newProduct.add(new Prod("LEN MLETÝ", 10));
        newProduct.add(new Prod("SEZAM", 10));
        newProduct.add(new Prod("DÝNĚ", 10));
        newProduct.add(new Prod("HOLANDSKÉ KAKAO", 10));
        newProduct.add(new Prod("GRANKO", 10));
        newProduct.add(new Prod("KAKAOVÉ BOBY", 10));
        newProduct.add(new Prod("MÁK", 10));
        newProduct.add(new Prod("KOKOS STROUHANÝ", 11));
        newProduct.add(new Prod("KOKOSOVÉ PLÁTKY", 11));
        newProduct.add(new Prod("MOUKA KOKOSOVÁ", 11));
        newProduct.add(new Prod("MIX", 11));
        newProduct.add(new Prod("VLAŠSKÉ", 11));
        newProduct.add(new Prod("MANDLE", 11));
        newProduct.add(new Prod("PISTÁCIE", 11));
        newProduct.add(new Prod("KEŠU", 11));
        newProduct.add(new Prod("PEKANOVÉ", 11));
        newProduct.add(new Prod("LÍSKOVÉ", 11));
        newProduct.add(new Prod("PARA", 11));
        newProduct.add(new Prod("FAZOLE", 12));
        newProduct.add(new Prod("ČOČKA ČERVENÁ", 12));
        newProduct.add(new Prod("ČOČKA HNĚDÁ", 12));
        newProduct.add(new Prod("CIZRNA", 12));
        newProduct.add(new Prod("HRÁCH", 12));
        newProduct.add(new Prod("ARAŠÍDY", 12));
        newProduct.add(new Prod("BOB", 12));
        newProduct.add(new Prod("SOJOVÉ BOBY", 12));
        newProduct.add(new Prod("QUINOA", 13));
        newProduct.add(new Prod("AMARANT", 13));
        newProduct.add(new Prod("POHANKA", 13));
        newProduct.add(new Prod("POHANKOVÉ PUKANCE", 13));
        newProduct.add(new Prod("MOUKA POHANKOVÁ", 13));
        newProduct.add(new Prod("MOUKA BEZLEPKOVÁ", 14));
        newProduct.add(new Prod("MOUKA TAPIOKOVÁ", 14));
        newProduct.add(new Prod("PERLY TAPIOKOVÉ", 14));
        newProduct.add(new Prod("RANNÍ", 15));
        newProduct.add(new Prod("VEČERNÍ", 15));
        newProduct.add(new Prod("ROZPUSTNÁ KÁVA", 16));
        newProduct.add(new Prod("CARO", 16));
        newProduct.add(new Prod("MLETÁ KÁVA", 16));
        newProduct.add(new Prod("ZRNKOVÁ KÁVA", 16));
        newProduct.add(new Prod("DATLE", 17));
        newProduct.add(new Prod("JABLKA", 17));
        newProduct.add(new Prod("ROZINKY", 17));
        
        int itemId = START_ITEM_ID;
        for (Prod product : newProduct) {
            String insertQuery1 = ITEM_INSERT_TEMPLATE
                .replaceFirst("\\?\\?", "\"" + product.getName()+ "\"")
                .replaceFirst("\\?\\?", "\"" + SUBNAME + "\"")
                .replaceFirst("\\?\\?", "\"" + DESCRIPTION + "\"")
                .replaceFirst("\\?\\?", PRICE + "")
                .replaceFirst("\\?\\?", "null")
                .replaceFirst("\\?\\?", "\"" + META_TITLE + "\"")
                .replaceFirst("\\?\\?", String.valueOf(product.getCategory()));
            
            p.println(insertQuery1);
            
            String insertQuery2 = ITEM_DETAIL_INSERT_TEMPLATE
                .replaceFirst("\\?", itemId + "")
                .replaceFirst("\\?", "\"Rozměry\"")
                .replaceFirst("\\?", "\"5 x 5 cm\"")
                .replaceFirst("\\?", "1000");
            
            p.println(insertQuery2);
            
            String insertQuery3 = STOCK_ITEM_INSERT_TEMPLATE
                .replaceFirst("\\?", itemId + "")
                .replaceFirst("\\?", "30")
                .replaceFirst("\\?", "true")
                .replaceFirst("\\?", "\"products/label_" + product.getName()+ ".jpg\"")
                .replaceFirst("\\?", "false");
            
            p.println(insertQuery3);

            String insertQuery4 = STOCK_ITEM_PICTURES_INSERT_TEMPLATE
                .replaceFirst("\\?", itemId + "")
                .replaceFirst("\\?", "\"products/label_" + product.getName()+ ".jpg\"")
                .replaceFirst("\\?", "true"); 
           
            p.println(insertQuery4);
            p.flush();

            itemId++;
        }
    }
    
    static class Prod {
        private final String name;
        private final int category;
        
        public Prod(String name, int category) {
            this.name = name;
            this.category = category;
        }

        public String getName() {
            return name;
        }

        public int getCategory() {
            return category;
        }
    }
    
}
