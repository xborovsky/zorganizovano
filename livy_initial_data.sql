SET autocommit=OFF;

START TRANSACTION;

INSERT INTO `livy`.`items` (`name`, `subname`, `description`, `price`, `discount_price`, `meta_title`)
VALUES
('Beanie čepice ONA&ON', 'Dvě vínové úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null),
('Beanie čepice ONA&ON', 'Dvě černé úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null),
('Beanie čepice ONA&ON', 'Dvě khaki úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null),
('Beanie čepice', 'Vínová úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null),
('Beanie čepice', 'Černá úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null),
('Beanie čepice', 'Khaki úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null),
('Šumivá koule do vany', 'S výtažky ze zeleného čaje', 'Relaxace, to je něco, co každý z nás v této době potřebujeme. A v takové vaně to vůbec není špatné. A když si do vody přidáme šumivou kouli s výtažky ze zeleného čaje, který má blahodárné účinky pro naši pleť, je to výhra. Šumivá koule je nezávadná, obsahuje i uklidňující koupelovou sůl pro děti.', 35, null),
('Kožený přívěsek na klíče', 'S vlastním nápisem', 'Pro přítele, manžela, tátu, dědu, se vybírají dárky těžko - to je stará známá pravda. Klíče ale nosí každý z nich a většina z nich od nás stále někam odjíždí, do práce, na trénink, odvézt děti nebo jen za přáteli. No a ruku na srdce, kolikrát jim říkáte, ať jedou opatrně? Že je máte rádi? Ať se ozvou, až dorazí na místo? :) Řekněte to pro změnu přívěskem z pravé kůže. Vyberte si některé z našich nápisů, nebo si vymyslete svůj, který nám při objednávce napíšete do poznámky (max. 30 znaků), a my, pro toho vašeho nejbližšího, takovou klíčenku od srdce, vyrobíme.', 39, null),
('ŠEDÝ ZAJÍČEK', 'Zápich do květináče', 'Zajíček je vyroben ze 100% vlněné plsti v šedé melírované barvě z čisté střižní ovčí vlny MERINO. Veškerý výrobní proces plsti probíhá v Západní Evropě. Tato plst splňuje normo Oekotex 100, 1.třídy a nepodléhá plstnatění. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 39, null, null),
('HOŘČICOVÉ KUŘÁTKO', 'Zápich do květináče', 'Kuřátko je vyrobeno ze 100% vlněné plsti v hořčičné barvě z čisté střižní ovčí vlny MERINO. Veškerý výrobní proces plsti probíhá v Západní Evropě. Tato plst splňuje normo Oekotex 100, 1.třídy a nepodléhá plstnatění. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 39, null, null),
('REZAVÝ KOHOUT', 'Zápich do květináče', 'Kohout je vyroben ze 100% vlněné plsti v rezavé barvě z čisté střižní ovčí vlny MERINO. Veškerý výrobní proces plsti probíhá v Západní Evropě. Tato plst splňuje normo Oekotex 100, 1.třídy a nepodléhá plstnatění. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 39, null, null),
('ŠEDÝ VĚTŠÍ ZAJÍC', 'V betonovém stojánku', 'Zajíc je vyroben ze směsové plsti v šedé barvě. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 59, null, null),
('BÍLÝ VĚTŠÍ ZAJÍC', 'V betonovém stojánku', 'Zajíc je vyroben ze směsové plsti v bílé barvě. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 59, null, null),
('ČERNÝ VĚTŠÍ ZAJÍC', 'V betonovém stojánku', 'Zajíc je vyroben ze směsové plsti v bílé barvě. Jako výplň byla použita vata z plně rozložitelné směsi. Jedná se o produkt, který je šetrný k životnímu prostředí.', 59, null, null);

insert into `livy`.`stock_items` (item_id, quantity, display_on_eshop, thumbnail_location)
values (1, 10, true, null),
(2, 10, true, null),
(3, 10, true, null),
(4, 10, true, null),
(5, 10, true, null),
(6, 10, true, null),
(7, 10, true, null),
(8, 10, true, null),
(9, 50, true, null),
(10, 50, true, null),
(11, 50, true, null),
(12, 10, true, null),
(13, 10, true, null),
(14, 10, true, null);

INSERT INTO `livy`.`item_details`
(`item_id`, `key`, `value`, `priority_order`)
VALUES
(1, 'Materiál', 'vínový úplet', 500),
(2, 'Materiál', 'černý úplet', 500),
(3, 'Materiál', 'khaki úplet', 500),
(4, 'Materiál', 'vínový úplet', 500),
(5, 'Materiál', 'černý úplet', 500),
(6, 'Materiál', 'khaki úplet', 500),
(7, 'Materiál', 'jedlá sůl, kys. citronová, škrob, esenciální oleje, kokosový olej, zelený čaj, koupelová sůl', 500),
(8, 'Materiál', 'Kůže, nerez kroužek na klíče', 500),
(8, 'Příklady textů', 'Jeď opatrně, potřebuji tě tady u sebe\nMuž je lyrický, žena epická, manželství dramatické\nDej vědět, až dorazíš na místo', 300),
(9, 'Rozměr', 'cca 7x7cm', 1000),
(9, 'Materiál', '100% vlněné plsti z ovčí vlny MERINO, vata (bavlna, viskóza), dřevěná špejle, jutový provázek', 500),
(10, 'Rozměr', 'cca 7x7cm', 1000),
(10, 'Materiál', '100% vlněné plsti z ovčí vlny MERINO, vata (bavlna, viskóza), dřevěná špejle, jutový provázek', 500),
(11, 'Rozměr', 'cca 7x7cm', 1000),
(11, 'Materiál', '100% vlněné plsti z ovčí vlny MERINO, vata (bavlna, viskóza), dřevěná špejle, jutový provázek', 500),
(12, 'Rozměr', 'cca 28x6cm', 1000),
(12, 'Materiál', 'směsová plst (40 % vlna , 60 % viskóza), vata (bavlna, viskóza), dřevěná špejle, cement, písek', 500),
(13, 'Rozměr', 'cca 28x6cm', 1000),
(13, 'Materiál', 'směsová plst (40 % vlna , 60 % viskóza), vata (bavlna, viskóza), dřevěná špejle, cement, písek', 500),
(14, 'Rozměr', 'cca 28x6cm', 1000),
(14, 'Materiál', 'směsová plst (40 % vlna , 60 % viskóza), vata (bavlna, viskóza), dřevěná špejle, cement, písek', 500);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (1, 'blank.png', true),
(2, 'blank.png', true),
(3, 'blank.png', true),
(4, 'blank.png', true),
(5, 'blank.png', true),
(6, 'blank.png', true),
(7, 'blank.png', true),
(8, 'blank.png', true),
(9, 'blank.png', true),
(10, 'blank.png', true),
(11, 'blank.png', true),
(12, 'blank.png', true),
(13, 'blank.png', true),
(14, 'blank.png', true);

insert into livy.contact_query_types (type, sort_key) values 
('Potřebuji se zeptat na něco k produktu', 100),
('Mám dotaz ohledně objednávky', 200),
('Mám skvělý nápad k vylepšení produktů, služeb či tip na organizaci', 300),
('Mám technický problém', 400),
('Týká se to něčeho jiného', 100000);

COMMIT;
SET autocommit=ON;