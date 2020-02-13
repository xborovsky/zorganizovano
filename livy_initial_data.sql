SET autocommit=OFF;

START TRANSACTION;

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice ONA&ON', 'Dvě vínové úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (1, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (1, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (1, 'Materiál', 'vínový úplet', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice ONA&ON', 'Dvě černé úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (2, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (2, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (2, 'Materiál', 'černý úplet', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice ONA&ON', 'Dvě khaki úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (3, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (3, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (3, 'Materiál', 'khaki úplet', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice', 'Vínová úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (4, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (4, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (4, 'Materiál', 'vínový úplet', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice', 'Černá úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (5, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (5, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (5, 'Materiál', 'černý úplet', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice', 'Khaki úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (6, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (6, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (6, 'Materiál', 'khaki úplet', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Šumivá koule do vany', 'S výtažky ze zeleného čaje', 'Relaxace, to je něco, co každý z nás v této době potřebujeme. A v takové vaně to vůbec není špatné. A když si do vody přidáme šumivou kouli s výtažky ze zeleného čaje, který má blahodárné účinky pro naši pleť, je to výhra. Šumivá koule je nezávadná, obsahuje i uklidňující koupelovou sůl pro děti.', 35, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (7, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (7, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (7, 'Materiál', 'jedlá sůl, kys. citronová, škrob, esenciální oleje, kokosový olej, zelený čaj, koupelová sůl', 500);

insert into livy.items (name, subname, description, price, discount_price)
values ('Kožený přívěsek na klíče', 'S vlastním nápisem', 'Pro přítele, manžela, tátu, dědu, se vybírají dárky těžko - to je stará známá pravda. Klíče ale nosí každý z nich a většina z nich od nás stále někam odjíždí, do práce, na trénink, odvézt děti nebo jen za přáteli. No a ruku na srdce, kolikrát jim říkáte, ať jedou opatrně? Že je máte rádi? Ať se ozvou, až dorazí na místo? :) Řekněte to pro změnu přívěskem z pravé kůže. Vyberte si některé z našich nápisů, nebo si vymyslete svůj, který nám při objednávce napíšete do poznámky (max. 30 znaků), a my, pro toho vašeho nejbližšího, takovou klíčenku od srdce, vyrobíme.', 39, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (8, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (8, 'blank.png', true);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (8, 'Materiál', 'Kůže, nerez kroužek na klíče', 500);

INSERT INTO livy.item_details (item_id, key, value, priority_order)
values (8, 'Příklady textů', 'Jeď opatrně, potřebuji tě tady u sebe\nMuž je lyrický, žena epická, manželství dramatické\nDej vědět, až dorazíš na místo', 500);

insert into livy.contact_query_types (type, sort_key) values 
('Potřebuji se zeptat na něco k produktu', 100),
('Mám dotaz ohledně objednávky', 200),
('Mám skvělý nápad k vylepšení produktů, služeb či tip na organizaci', 300),
('Mám technický problém', 400),
('Týká se to něčeho jiného', 100000);

COMMIT;
SET autocommit=ON;