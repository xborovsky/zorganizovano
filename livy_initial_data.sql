SET autocommit=OFF;

START TRANSACTION;

INSERT INTO `livy`.`items` (`name`, `subname`, `description`, `price`, `discount_price`, `meta_title`)
VALUES
('Beanie čepice', 'Vínová úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null),
('Beanie čepice', 'Černá úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null),
('Beanie čepice', 'Khaki úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null),
('ŠEDÝ ZAJÍČEK', 'Zápich do květináče', 'Zajíček je vyroben ze 100% vlněné plsti v šedé melírované barvě z čisté střižní ovčí vlny MERINO. Veškerý výrobní proces plsti probíhá v Západní Evropě. Tato plst splňuje normo Oekotex 100, 1.třídy a nepodléhá plstnatění. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 39, null, null),
('HOŘČICOVÉ KUŘÁTKO', 'Zápich do květináče', 'Kuřátko je vyrobeno ze 100% vlněné plsti v hořčičné barvě z čisté střižní ovčí vlny MERINO. Veškerý výrobní proces plsti probíhá v Západní Evropě. Tato plst splňuje normo Oekotex 100, 1.třídy a nepodléhá plstnatění. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 39, null, null),
('REZAVÝ KOHOUT', 'Zápich do květináče', 'Kohout je vyroben ze 100% vlněné plsti v rezavé barvě z čisté střižní ovčí vlny MERINO. Veškerý výrobní proces plsti probíhá v Západní Evropě. Tato plst splňuje normo Oekotex 100, 1.třídy a nepodléhá plstnatění. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 39, null, null),
('ŠEDÝ VĚTŠÍ ZAJÍC', 'V betonovém stojánku', 'Zajíc je vyroben ze směsové plsti v šedé barvě. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 59, null, null),
('BÍLÝ VĚTŠÍ ZAJÍC', 'V betonovém stojánku', 'Zajíc je vyroben ze směsové plsti v bílé barvě. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 59, null, null),
('ČERNÝ VĚTŠÍ ZAJÍC', 'V betonovém stojánku', 'Zajíc je vyroben ze směsové plsti v bílé barvě. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 59, null, null),
('VELIKONOČNÍ BĚHOUN - ŠEDÝ', 'Běhoun na stůl 35x135 cm', 'Šedý běhoun na váš velikonoční stůl, ale i běžný den. Běhoun má zajímavou strukturu a je omyvatelný.', 99, null, null),
('VELIKONOČNÍ BĚHOUN - SVĚTLÝ', 'Běhoun na stůl 35x135 cm', 'Světle béžový běhoun na váš velikonoční stůl, ale i běžný den. Běhoun má zajímavou strukturu a je omyvatelný.', 99, null, null),
('JUTOVÝ ZAJÍC S MAŠLÍ', 'Dekorace na dveře', 'Zajíc je vyroben z juty. Jako výplň byla použit polyester (100% recyklovaný z PET láhví).', 149, null, null),
('ZAJÍC MOTANÝ MOTOUZEM', 'Dekorace na dveře', 'Zajíc je vyroben z kartonu velmi vysoké gramáže, na který je v silné vrstvě namotán motouz. Uši a nohy zajíce jsou vyrobeny z plsti s příměsí polyesteru.', 149, null, null),
('OMOTANÉ VAJÍČKO', 'Zápich do květináče', 'Vajíčko je vatové a omotané motouzem, lepený tavnou pistolí.', 39, null, null),
('OZDOBY NA VAJÍČKA', 'Sada na tvoření s dětmi', 'Sada obsahuje části k nalepení na vajíčka celkem šesti zvířátek. Tři zvířátka z farmy - ovečka, prasátko a kuřátko a tři zvířátka lesní - jelen, mýval a liška. My jsme malovali akrylovými barvami na vatové vajíčko a jednotlivé části, které jsou součástí balíčku sady pro děti, pak lepili pomocí tavné pistole.', 49, null, null);

insert into `livy`.`stock_items` (item_id, quantity, display_on_eshop, thumbnail_location)
values (1, 10, true, null),
(2, 10, true, null),
(3, 10, true, null),
(4, 50, true, 'products/sedy_zajic.jpg'),
(5, 50, true, 'products/hor_kure.jpg'),
(6, 50, true, 'products/rez_kohout.jpg'),
(7, 10, true, 'products/vetsi_zajic_sedy.jpg'),
(8, 10, true, 'products/vetsi_zajic_bily.jpg'),
(9, 10, true, 'products/vetsi_zajic_cerny.jpg'),
(10, 8, true, 'products/behoun_sedy.jpg'),
(11, 10, true, 'products/behoun_svetly.jpg'),
(12, 20, true, 'products/vejce_motane.jpg'),
(13, 20, true, 'products/sada_pro_deti.jpg');

INSERT INTO `livy`.`item_details`
(`item_id`, `key`, `value`, `priority_order`)
VALUES
(1, 'Materiál', 'vínový úplet', 500),
(2, 'Materiál', 'černý úplet', 500),
(3, 'Materiál', 'khaki úplet', 500),
(4, 'Rozměr', 'cca 7x7cm', 1000),
(4, 'Materiál', '100% vlněné plsti z ovčí vlny MERINO, vata (bavlna, viskóza), dřevěná špejle, jutový provázek', 500),
(5, 'Rozměr', 'cca 7x7cm', 1000),
(5, 'Materiál', '100% vlněné plsti z ovčí vlny MERINO, vata (bavlna, viskóza), dřevěná špejle, jutový provázek', 500),
(6, 'Rozměr', 'cca 7x7cm', 1000),
(6, 'Materiál', '100% vlněné plsti z ovčí vlny MERINO, vata (bavlna, viskóza), dřevěná špejle, jutový provázek', 500),
(7, 'Rozměr', 'cca 28x6cm', 1000),
(7, 'Materiál', 'směsová plst (40 % vlna , 60 % viskóza), vata (bavlna, viskóza), dřevěná špejle, cement, písek', 500),
(8, 'Rozměr', 'cca 28x6cm', 1000),
(8, 'Materiál', 'směsová plst (40 % vlna , 60 % viskóza), vata (bavlna, viskóza), dřevěná špejle, cement, písek', 500),
(9, 'Rozměr', 'cca 28x6cm', 1000),
(9, 'Materiál', 'směsová plst (40 % vlna , 60 % viskóza), vata (bavlna, viskóza), dřevěná špejle, cement, písek', 500),
(10, 'Rozměr', '35x135cm', 1000),
(11, 'Rozměr', '35x135cm', 1000),
(12, 'Rozměr', 'cca 3x4 cm', 1000),
(12, 'Materiál', 'vatové vajíčko, dřevěná špejle, jutový provázek, tavný materiál', 500),
(13, 'Materiál', 'papír', 500);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (4, 'products/sedy_zajic.jpg', true),
(5, 'products/hor_kure.jpg', true),
(6, 'products/rez_kohout.jpg', true),
(7, 'products/vetsi_zajic_sedy.jpg', true),
(8, 'products/vetsi_zajic_bily.jpg', true),
(9, 'products/vetsi_zajic_cerny.jpg', true),
(10, 'products/behoun_sedy.jpg', true),
(10, 'products/behoun_sedy2.jpg', false),
(11, 'products/behoun_svetly.jpg', true),
(11, 'products/behoun_svetly2.jpg', false),
(12, 'products/vejce_motane.jpg', true),
(13, 'products/sada_pro_deti.jpg', true);

insert into livy.contact_query_types (type, sort_key) values 
('Potřebuji se zeptat na něco k produktu', 100),
('Mám dotaz ohledně objednávky', 200),
('Mám skvělý nápad k vylepšení produktů, služeb či tip na organizaci', 300),
('Mám technický problém', 400),
('Týká se to něčeho jiného', 100000);

COMMIT;
SET autocommit=ON;