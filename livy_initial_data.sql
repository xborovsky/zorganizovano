SET autocommit=OFF;

START TRANSACTION;

insert into livy.items (name, subname, description, price, discount_price)
values ('Osobní trhací poukazy', 'S osobní péčí o druhého', 'Takový malý velký dárek. Malá knížka se 6 velkými poukazy. Je docela jednoduché pořídit drahé polovičce poukaz na slevovém portálu například na masáž. Jenže tím asi moc ten vztah neutužíme. Knížka obsahuje 6 poukazů, které nás nabádají k větší aktivitě v tom krásném, co mezi sebou máme a vybízí nás, abychom tyto vlastně zpočátku běžné činnosti, zase trochu obzvláštnili a udělali je nevšedními. Najdete zde poukaz na večeři, na masáž, na chvilku pro sebe, na snídani do postele, na výlet a kulturní zážitek. ', 999, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (1, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (1, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice ONA&ON', 'Dvě vínové úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (2, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (2, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice ONA&ON', 'Dvě černé úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (3, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (3, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice ONA&ON', 'Dvě khaki úpletové čepice', 'Laďte spolu nejen na Valentýna. Pořiďte sobě a své drahé polovičce slušivou beanie čepici z teplého úpletu ve stejné barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže. Cena je za dvě čepice.', 279, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (4, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (4, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Betonový květináček se semínky', 'Vypěstuj si s láskou chilli', 'Vypěstujte si s láskou se svou láskou chilli papričky už od semínka. Taková malá metafora pro ty naše vztahy, že ano :) Od začátku máte mezi sebou něco pevného, jako je tento betonový květináček a v průběhu času si vypěstujeme něco krásného, peprného a pokud to naše něco, budeme opečovávat - v tomto případě zalévat ;) tak i stálého. V balení najdete designový betonový květináček, zeminu pro pěstování a semínka chilli papričky.', 999, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (5, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (5, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Kožený přívěsek na klíče', 'S vlastním nápisem', 'Pro přítele, manžela, tátu, dědu, se vybírají dárky těžko - to je stará známá pravda. Klíče ale nosí každý z nich a většina z nich od nás stále někam odjíždí, do práce, na trénink, odvézt děti nebo jen za přáteli. No a ruku na srdce, kolikrát jim říkáte, ať jedou opatrně? Že je máte rádi? Ať se ozvou, až dorazí na místo? :) Řekněte to pro změnu přívěskem z pravé kůže. Vyberte si některé z našich nápisů, nebo si vymyslete svůj, který nám při objednávce napíšete do poznámky (max. 30 znaků), a my, pro toho vašeho nejbližšího, takovou klíčenku od srdce, vyrobíme.', 999, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (6, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (6, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Designové betonové svíčky', 'Drží pospolu', 'Jaký by to byl den zamilovaných bez svíček :) Tyto designové betonové svíčky pro hezkou atmosféru, které drží při sobě, tak jako vy a vaše drahá polovička. Svíčky v sobě ukrývají magnet, takže opravdu pospolu drží.', 999, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (7, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (7, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice', 'Vínová úpletová čepice', 'Pořiďte své drahé polovičce (nebo udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu ve vínové barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (8, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (8, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice', 'Černá úpletová čepice', 'Pořiďte své drahé polovičce (nebo si udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu v černé barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (9, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (9, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Beanie čepice', 'Khaki úpletová čepice', 'Pořiďte své drahé polovičce (nebo si udělejte na Valentýna radost sobě) slušivou beanie čepici z teplého úpletu v černé barvě. Čepice je unisex velikosti, strečová, dobře drží na uších. Ze strany čepice je našitá aplikace s logem LIVY z pravé kůže.', 149, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (10, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (10, 'blank.png', true);

insert into livy.items (name, subname, description, price, discount_price)
values ('Šumivá koule do vany', 'S výtažky ze zeleného čaje', 'Relaxace, to je něco, co každý z nás v této době potřebujeme. A v takové vaně to vůbec není špatné. A když si do vody přidáme šumivou kouli s výtažky ze zeleného čaje, který má blahodárné účinky pro naši pleť, je to výhra. Šumivá koule je nezávadná, obsahuje i uklidňující koupelovou sůl pro děti.', 999, null);

insert into livy.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (11, 10, true, null);

INSERT INTO livy.stock_item_pictures (stock_item_id, src, is_main)
VALUES (11, 'blank.png', true);

insert into livy.contact_query_types (type, sort_key) values 
('Potřebuji se zeptat na něco k produktu', 100),
('Mám dotaz ohledně objednávky', 200),
('Mám skvělý nápad k vylepšení produktů, služeb či tip na organizaci', 300),
('Mám technický problém', 400),
('Týká se to něčeho jiného', 100000);

COMMIT;
SET autocommit=ON;