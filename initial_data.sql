SET autocommit=OFF;

START TRANSACTION;

insert into zorganizovano.items (name, subname, description, price, discount_price)
values ('KALENDÁŘ 2020 - LIŠČÍ ROK', 'Kalendář na lednici s magnetickou lištou', 'Mějte plány celé své rodiny vždy na očích, na nejfregventovanějším místě v domácnosti - lednici.
Nezapomenete na žádné vystoupení ani zápas svých dětí, partner vás nepřekvapí návštěvou kamaráda, o které vám ale určitě říkal a váš zubař vás bude chválit za pravidelné preventivní
prohlídky. Děti uvidí, které dny jste vytíženi a které plánujete pro rodinu, kdy se chystá výlet, dovolená a prázdniny u babičky a to v celoměsíčním přehledu - takže se vám už po 
otočení strany na další týden nestane, že už máte být na cestě na schůzku a ne doma v pyžamu s kávou v ruce. Udělejte si z organizace času ve vaší rodině příjemnou rutinu, 
mějte to zorganizováno 🙂
<ul>
<li>Zobrazení vždy celého měsíce</li>
<li>Jednotlivé týdny v řádcích pro snadnou a rychlou orientaci při opakujících se aktivitách</li>
<li>Sloupec k zaznačení jmen až pěti členů domácnosti</li>
<li>Výrazná grafika - pro plánování nemusíte vstávat z gauče</li>
<li>Praktická přihrádka na dokumenty (složenky, podací lístky, účtenky, lepicí bločky, tužku...)</li>
<li>Kalendář na celý rok 2020 včetně strany k zapisování plánů na další rok, důležitých kontaktů (pediatr, zubař, třídní učitel, trenér, rodiče nejlepšího kamaráda...) a místo na poznámky</li>
<li>Státní svátky v ČR a vybrané mezinárodní dny</li>
<li>Pohyb Měsíce (ať víte, kdy se blíží úplněk a tedy zpravidla, alespoň u nás, dětmi probdělá noc)</li>
<li>Magnetická lišta k umístění na lednici, magnet je i ve spodní části kalendáře, při otevření lednice tedy nikam neuletí</li>
</ul>', 299, null);

insert into zorganizovano.item_details (item_id, `key`, `value`, priority_order)
values (1, 'Rozměry', '297 x 514 x 10 mm', 1000),
(1, 'Přepravní rozměry', '297 x 310 x 10 mm', 500),
(1, 'Váha', '120g', 100);

insert into zorganizovano.stock_items (item_id, quantity, display_on_eshop, thumbnail_location)
values (1, 10, true, 'p_1.jpg');

insert into zorganizovano.stock_item_pictures (stock_item_id, is_main, src)
values (1, true, 'p_1.jpg');
insert into zorganizovano.stock_item_pictures (stock_item_id, is_main, src)
values (1, true, 'p_2.jpg');
insert into zorganizovano.stock_item_pictures (stock_item_id, is_main, src)
values (1, true, 'p_3.jpg');

insert into zorganizovano.blog_posts (title, published, content, content_preview, title_photo, link_href, link_content)
values(
'Jak si zorganizovat čas? 1/3',
 curdate(), 
'<p>Kéžbych věděla :D Ne vážně, před narozením dětí jsem o sobě smýšlela jako o někom, kdo má vše dokonale zorganizované, dokonce jsem to na pracovních pohovorech vyzdvihovala jako mou snad největší přednost. Tak to bylo tehdy. V období "před dětmi". Potom přišlo období "po Marečkovi", no tak to byl samosebou sešup. Vůbec, ale vůbec jsem netušila co dělat, jak to dělat a proč. Názorů okolo spousta, dobrých rad ještě víc. No po čase jsem si našla systém, jak se z ničeho nic starat o někoho jiného než sebe. O někoho, kdo na mě byl absolutně závislý. Do toho jsme čerstvě postavili dům a založili zahradu, no nebylo toho z ničeho nic málo. Zaběhli jsme se, fungovalo to, no stále jsem si říkala, jak se tohle dá všechno stíhat? Znáte to, domácnost vám padá na hlavu, s tím drobkem chcete trávit nějaký čas, no zachce se vám zpět mezi dospělé, tak vezmete částečný úvazek v práci, najednou se chystají Vánoce, dítko se začne v noci více budit.. no tak co uděláte? ano, rozmyslíte se, že byste rádi druhé dítě, ať přeci k sobě mají blízko. Tak mají - rok a 10 měsíců ;) a nastane období "po Sárince" a najednou všechno šlape, i když děti v noci vstávají, i když mám více povinností okolo domácnosti, i když mají oba rozdílné nároky, i když má Mareček pět kroužků v týdnu. Jak je to možné? Popravdě - není to růžové, Mareček už je ve věku kdy nad věcmi více přemýšlí a tak kuje pikle a zkouší na mě a Máru kde co, tak ano, zatím jsme se nezbláznili, ani nezačali holdovat alkoholu. Tohle je určitě na tom všem to nejnáročnější a lhala bych, kdybych vám tady teď napsala, jak tohle krásně zvládáme a že je u nás jen slunečno. Ne to ne. Jsme normální rodina, s normálními radostmi a strastmi, ale máme systém. A to nám pomáhá. Šetřit čas, šetřit energii a šetřit duševní zdraví.</p>
<div class="blog-post-img-block">
<img class="blog-post-img" src="/img/blog/how_to_organize_1/2/wm02.jpg" srcset="/img/blog/how_to_organize_1/2/wm02_1920.jpg 1920w, /img/blog/how_to_organize_1/2/wm02_1600.jpg 1600w, /img/blog/how_to_organize_1/2/wm02_1366.jpg 1366w, /img/blog/how_to_organize_1/2/wm02_1024.jpg 1024w" />
<img class="blog-post-img" src="/img/blog/how_to_organize_1/3/wm03.jpg" srcset="/img/blog/how_to_organize_1/3/wm03_1920.jpg 1920w, /img/blog/how_to_organize_1/3/wm03_1600.jpg 1600w, /img/blog/how_to_organize_1/3/wm03_1366.jpg 1366w, /img/blog/how_to_organize_1/3/wm03_1024.jpg 1024w" />
</div>
<p>Mára vstává do práce každý všední den ve čtyři ráno. Ne, nepřehlédli jste se, ve 4:00 mu zvoní budík. Snídá, připravuje se, jde vyvenčit Hulka a vyráží autobusem vstříct pracovním povinnostem. Většinou se okolo tohoto času budí i Sári na ještě stále noční mléko a přebalení - pokud je to po páté hodině, už spát nejdu. Pokud dříve, mám budík denně na 6:30. Jsem typ ranní ptáče, v těchto hodinách mám nejvíce energie a tak v krátkém čase zvládnu spoustu věcí. Vysterilizuji lahvičky, dám vařit Sári novou vodu do termosky a jdu vyložit pračku, která se zapla okolo třetí ráno. Prádlo pověsím, případně poskládám co ještě schlo, chystám věci k přípravě snídaně pro mě a Marečka, když by se vzbudil dříve - bývá velmi hladový jen co vstane. Potom zvládnu svou ranní hygienu, převléknu se, ustelu a uklidím ložnici. Většinou mám čas a stíhám něco málo vyžehlit, nebo uklidit část domu, která to právě potřebuje. Nedělám téměř vůbec úklid o víkendu, snažím se o domácnost pečovat v průběhu týdne, abychom o víkendu měli čas jen sami na sebe.</p>
<p>Mareček se budí mezi sedmou a osmou ráno, nasnídá se, podívá se na pohádku z angličtiny a pak zápasíme s oblékáním.. mezitím větrám dům a vykládám myčku (sousedí s jeho pokojem, tak mohu až když se vzbudí, spí jako zajíc). Do toho se většinou budí i Sári, kterou převléknu, obstarám a nakrmím připravenou snídaní. Chvíli zůstává v lehátku, aby se na zemi hned nepoblinkala a my si jdeme s Marečkem čistit zuby. Ráno mají děti pro sebe a vymýšlí si vlastní zábavu - Mareček se tak (snad) učí samostatnosti ve vytváření názoru a Sárinka nezávislosti. Většinou něco dělají společně a já poklízím co potřebuji a chystám oběd. Okolo desáté hodiny mám většinou vše na celý den hotovo a Sárinka jde spát a začíná nám čas jen s Marečkem. Většinou si Mareček donese nějakou oblíbenou hru sám, nebo vyberu něco, co jsme dlouho nedělali. Před obědem si ještě vezmeme dětský časopis a uděláme z něj jednu dvojstranu. Naobědváme se a Mareček jde spát. V tu chvíli mám buď čas pro sebe, nebo se už budí Sárinka a věnuji se jí. Mareček se vzbudí okolo třetí hodiny a v 15:45 je už doma Mára. Pozdraví nás a jde venčit Hulka. Buď jdeme všichni společně na procházku, nebo jdou jen kluci, nebo jedeme na kroužek. Mára si pak jde zacvičit buď do zahrady a když je pěkně, Mareček už chodí cvičit s ním, nebo si udělal malé fitko v garáži, tam jsou ale těžké činky a tak chodí raději sám.  Večeře je už buď hotová z rána nebo vaří Mára. Po večeři ukládáme Sárinku i Marečka. Sári buď usne v osm, nebo chytne druhý dech a je neuspatelná do desíti. Mareček vymýšlí, že potřebuje to či ono (však to znáte) a když není až tak unavený, podaří se mu usnout někdy po deváté - a to se snažíme, aby v půl osmé už ležel v posteli.. No a když to večer klapne, v devět obě děti spí a my se chystáme taky do postele, nebo jde alespoň Mára, protože druhý den vstává zase v ty čtyři a já se přidám, až děti usnou. Oba se párkrát v noci probudí, ale většinou je to rychlovka - Sári dám lahvičku s mlíčkem, když pije tak ji přebaluji a během dvou minut spí - nemluvím na ni, ani ji nevytahuji z postýlky. Mareček se chce většinou napít, nebo se bojí vlka (ach ty pohádky..) a tak někdy skončí u nás v posteli. No říkáme si, že takhle malej už nikdy nebude, tak ať.</p>
<div class="blog-post-img-block">
<img class="blog-post-img" src="/img/blog/how_to_organize_1/4/wm04.jpg" srcset="/img/blog/how_to_organize_1/4/wm04_1920.jpg 1920w, /img/blog/how_to_organize_1/4/wm04_1600.jpg 1600w, /img/blog/how_to_organize_1/4/wm04_1366.jpg 1366w, /img/blog/how_to_organize_1/4/wm04_1024.jpg 1024w" />
<img class="blog-post-img" src="/img/blog/how_to_organize_1/5/wm05.jpg" srcset="/img/blog/how_to_organize_1/5/wm05_1920.jpg 1920w, /img/blog/how_to_organize_1/5/wm05_1600.jpg 1600w, /img/blog/how_to_organize_1/5/wm05_1366.jpg 1366w, /img/blog/how_to_organize_1/5/wm05_1024.jpg 1024w" />
<img class="blog-post-img" src="/img/blog/how_to_organize_1/6/wm06.jpg" srcset="/img/blog/how_to_organize_1/6/wm06_1920.jpg 1920w, /img/blog/how_to_organize_1/6/wm06_1600.jpg 1600w, /img/blog/how_to_organize_1/6/wm06_1366.jpg 1366w, /img/blog/how_to_organize_1/6/wm06_1024.jpg 1024w" />
</div>
<p>Naše děti jsou u nás na prvním místě a tak dbáme na to, že když jsme s nimi, jsme opravdu jen s nimi. Já v tu chvíli odkládám telefon, nedělám nic okolo domu a jsem jen s nimi. Vstávat dřív nevnímám jako nějakou oběť, chodíme spát brzy, takže nějakým spánkovým deficitem netrpíme (alespoň ne ve dnech, kdy pro vás nepřipravujeme tyto stránky ;)). Věřím tomu, že mít systém a být v plánování zorganizovaní, nám přináší spoustu času jen pro naši rodinu. Takže jestli to vnímáte stejně jako my, ráda vám sem budu psát tipy zaměřené na konkrétní témata - vaření, uklízení, péče o děti, nákupy, organizování domácnosti, plánování, organizace času, Vánoc, dovolené, ... co mě zrovna napadne nebo bude aktuální. Už teď pro vás připravuji nějaké zlepšováky a pomocníky, které my doma používáme na denní bázi, proto věřím, že by vám mohli také dobře posloužit.</p>
<p>Dnes jsem vám chtěla přiblížit, jak fungujeme jako rodina ve všední dny a jak to tedy máme zorganizováno mezi sebou. V pokračování článku vám ukáži, jak přesně plánujeme čas.</p>
<p>Mějte se zatím krásně, pokud jste dočetli až sem, klobouk dolů a děkuji vám :) Snad vám některá má myšlenka uvízne v hlavě a pomůže vám ve vaší rodině. Budu se těšit příště a do té doby pa! </p>
<p>Bára</p>
',
'Kéžbych věděla :D Ne vážně, před narozením dětí jsem o sobě smýšlela jako o někom, kdo má vše dokonale zorganizované, dokonce jsem to na pracovních pohovorech vyzdvihovala jako mou snad největší přednost. Tak to bylo tehdy. V období "před dětmi". Potom přišlo období "po Marečkovi", no tak to byl samosebou sešup. Vůbec, ale vůbec jsem netušila co dělat, jak to dělat a proč. Názorů okolo spousta, dobrých rad ještě víc. No po čase jsem si našla systém, jak se z ničeho nic starat o někoho jiného než sebe. O někoho, kdo na mě byl absolutně závislý. Do toho jsme čerstvě postavili dům a založili zahradu, no nebylo toho z ničeho nic málo. Zaběhli jsme se, fungovalo to, no stále jsem si říkala...',
'b_1.jpg',
'/eshop/products/1',
'<img src="/img/blog/how_to_organize_1/7/7.jpg" srcSet="/img/blog/how_to_organize_1/7/7_1920.jpg 1920w, /img/blog/how_to_organize_1/7/7_1600.jpg 1600w, /img/blog/how_to_organize_1/7/7_1366.jpg 1366w, /img/blog/how_to_organize_1/7/7_1024.jpg 1024w" alt="U nás v eshopu" />');

insert into zorganizovano.contact_query_types (type, sort_key) values 
('Potřebuji se zeptat na něco k produktu', 100),
('Mám dotaz ohledně objednávky', 200),
('Mám skvělý nápad k vylepšení produktů, služeb či tip na organizaci', 300),
('Mám technický problém', 400),
('Týká se to něčeho jiného', 100000);

COMMIT;
SET autocommit=ON;