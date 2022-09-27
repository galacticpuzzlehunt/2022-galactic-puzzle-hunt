// Obfuscator: https://obfuscator.io/
// Set Options Preset to Medium

let initTimeLeft = window.timeLeft;
let frozen = false;

if (getFrozen()) {
    initTimeLeft = 240;
    document.getElementById("puztimer").style.display = "inline-block";
}

data1a = window.data1a;
data1b = window.data1b;
data1c = window.data1c;
data1d = window.data1d;
var data2 = ['BAQIAZABZCBZ', 'CAWRBABCZCGA', 'DCEACBCEAEAA', 'EAREDBDGZDHB', 'FETVECEKZDBC', 'GCYEFCFMACHE', 'HGUNGDGQZEAH', 'IAIWHCHSZEHM', 'JCOGIDIWBDBU', 'BEPXJDSCZCHH', 'DKAGKETEZFDC', 'FCSPLDUKAFEK', 'HMDYMFVOZHIN', 'JGFCNEWQZHZY', 'LOGTOEXUAGDM', 'NAHCADYAZGEL', 'PQJLBGZGZIBY', 'RCKUCEAIBHCK', 'TSLEDHBOZHEJ', 'CEZVEELSZFCU', 'FUXEFFMUAIFE', 'IKCNGFNAZIZZ', 'LWVWHIOEZKBE', 'OCBAIEPKAJHE', 'RENRJFQSZJGJ', 'UMMAKGRWZIDO', 'XCQJLFSYCKGY', 'AGWSMFTCZKAN', 'DCECNJUEZJCM', 'DORTOFEIAFEA', 'HETCPKFWZIBN', 'LAYLBEGAZIFO', 'PGUUCGHGAKFC', 'TQIYDHIIZJBR', 'XIOPEGJSZJDU', 'BCPYFFKUBIIM', 'FKAHGLLAZKGH', 'JSSQHIMGZKGU', 'NMDAIHNKAJEC', 'EEFJJFXQZEGX', 'JOGSKMYWZHBA', 'OUHBLGZYAHDY', 'TQJKMNAIZJGZ', 'YKKONGBKZIZY', 'DOLFOGCOBIIY', 'IWZOPJDQZHCX', 'NUXXQOECZJFW', 'SCCGCFFOAJIU', 'XGVQDHGSZIIR', 'FEBLEGQUZEIM', 'LYNUFIRYAHEE', 'RMMDGHSEZHIR', 'XAQMHPTGZJEW', 'DCWQIGUQCIGO', 'JCEHJHVWZIDL', 'PGRQKGWCZHIA', 'VETZLJXIAJFM', 'BCYIMKYKZJFN', 'HGUSNQZQZIIA', 'GOIJOGJUAEFO', 'NIOSPRKWZHGP', 'UEPBQLLGZHFE', 'BUAKRHMUBJBU', 'IASODFNYZIGZ', 'PMDFEIOAZIGU', 'WGFOFHPEAHBU', 'DOGXGSQSZJDP', 'KQHGHIRYZJZK', 'RQJQIKSIAIGA', 'HIKHJHCKZGFL', 'PSLQKTDOZJFM', 'XCZZLGEUBJCY', 'FUXIMUFCZLZL', 'NKCMNMGIZKCK', 'VOVDOHHOAKEW', 'DSBMPJISZJCH', 'LYNVQIJYZLEE', 'TMMERIKGALDM', 'BAQOSVLKZKGR', 'IEWFEGVSZFEE', 'RCEOFHWCDIIW', 'AORXGNXEZIDB', 'JETGHWYOZKEY', 'SUYKIHZQAJGA', 'BGUBJJAWZJAZ', 'KQIKKOBAZICA', 'TIOTLLCGAKHA', 'CKPCMHDOZKBB', 'LKAMNXESZJAC', 'JOSAOHOUBFGE', 'TMDJPJPYZIHH', 'DWFSQKQKZIEM', 'NOGBRMRSAKBU', 'XUHFSPSWZJEH', 'HQJWTKTEZJAC', 'RCKFFGUIAIFK', 'BSLOGYVOZKFN', 'LGZXHIWAZKDY', 'VGXHIIXCBJBM', 'BECCJHWUZJGL', 'DWVLKZXAZMDY', 'FYBULJYKAMBK', 'HYNDMAZQZOGJ', 'JMMHNIAWZNDU', 'LAQYOIBYANFE', 'NAWHPQCEZMFZ', 'PCEQQBDOZOCE', 'RCRZRHEUCOIE', 'TETJSCFAZNAJ', 'DCYATIPCZMIO', 'HGUJUNQIAPCY', 'LGISGHROZPBN', 'PIOBHDSSZRZM', 'TEPFIKTUARZA', 'XKAWJLUGZQCN', 'BCSFKLVQZQZO', 'FMDOLJWSBSEC', 'JGFXMRXWZRIR', 'NOGHNKYCZRIU', 'FOHYOHIIAPBM', 'LKJHPJJKZSAH', 'RIKQQSKWZSHU', 'XSLZROLAAUAC', 'DEZDSMMGZTGX', 'JEXUTINOZTDA', 'PUCDUIOYBSAY', 'VWVMVEPGZUCZ', 'BABVHGQQZUEY', 'HYNFIPRYATIY', 'HMMWJJBEZPFX', 'PAQFKFCKZSFW', 'XGWOLIDOASBU', 'FCEXMLEWZUIR', 'NORBNTFCZTZM', 'VOTSOIGGCTDE', 'DQYBPJHOZSCR', 'LGUKQGISZUEW', 'TQITRLJGAUGO', 'BIODSHKQZTBL', 'JIPMTIUCZOIA', 'TKAVUQVEARZM', 'DSSEVUWOZRZN', 'NMDNWKXQZTCA', 'XCFRIHYUBSCO', 'HOGIJMZWZSDP', 'RUHRKVAGZRBE', 'BUJALJBUATIU', 'LKKJMNCYZTEZ', 'VSLTNIDAZSBU', 'LOZOOINEAOFU', 'XUXXPJOSZRZP', 'JSCGQKPWZREK', 'VYVPRKQYBTIA', 'HYBTSJRCZSEL', 'TYNKTNSWZSFM', 'FMMTUJTAARCY', 'RAQCVKUIZTZL', 'DAWLWWVSZTGK', 'PCEVXRWAASCW', 'NERMJHGEZOHH', 'BETVKMHKZRAE', 'PCYELIIQDRCM', 'DGUNMLJEZTBR', 'ROIRNOKIZSCE', 'FIOIOJLOASBW', 'TEPRPXMUZRHB', 'HKAAQMNCZTFY', 'VUSJRIOIATBA', 'JMDTSLPUZSGZ', 'PGFKTKZYZQIA', 'FEGTULAEBTDA', 'VQHCVPBGZTCB', 'LQJLWNCQZVDC', 'BIKPXMDSAUIE', 'RILGYJEYZUZH', 'HKZPKIFIZTGM', 'XUXYLSGKAVFU', 'NKCHMYHUZVCH', 'DWVRNOIWZUBC', 'ROBIOISCBPCK', 'JYNRPPTUZSCN', 'BMMAQKUYZSHY', 'TAQJRTVAAUBM', 'LWWNSLWEZTIL', 'DCEETOXKZTHY', 'VORNUNYQASHK', 'NETWVLZYZUZJ', 'FUYFWQAEZUGU', 'XUUPXJBKCTEE', 'TQIDYLLGZPCZ', 'NIOMZQMIZSAE', 'HCPVLHNSASIE', 'BKAEMROAZUEJ', 'VSSINZPKZTBO', 'PMDZOKQQATEY', 'JGFIPJRWZSAN', 'DOGRQSSEZUZM', 'XGHARJTQBUAA', 'RQJKSTUUZTIN', 'CEKFTITAZJZO', 'FSLOUUUGAMAC', 'IWZXVAVIZMAR', 'LUXGWNWOZOEU', 'OYCKXKXAANGM', 'RWVBYPYKZNCH', 'UYBKZBZCZMHU', 'XQNTAMAEBOCC', 'AMMCMJBIZODX', 'DAQMNMCOZNAA', 'FAWDOJMQAMHY', 'LCEMPUNWZPGZ', 'RARVQROAZPIY', 'XETERVPCARCY', 'DCYISCQGZRZX', 'JGUZTQRSZQGW', 'PCIIUISUCQZU', 'VIORVOTAZSBR', 'BEPAWDUIZRAM', 'HKAKXWVOAREE', 'ICSBYJFUZPDR', 'RMDKZMGCZSZW', 'AGFTAOHUASHO', 'JOGCBVIEZUIL', 'SGHGNIJSZTAA', 'BOJXOJKWBTDM', 'KIKGPELYZSIN', 'TSLPQWMCZUIA', 'CEZYRLNIAUCO', 'LUXISXOQZTDP', 'LKCZTMYUZPHE', 'XWVIUKZWASHU', 'JCBRVMACZSDZ', 'VYNAWYBOZUAU', 'HMMEXKCYBTFU', 'TAQVYRDAZTGP', 'FGWEZSEEZSEK', 'RCENAXFGAUZA', 'DORWBLGKZUIL', 'PETGCZHQZTBM', 'OOYPOIRCAODY'];
var data3a = window.data3a;
var data3b = [51.42857142857143, 32.72727272727273, 27.692307692307693, 21.176470588235293, 18.94736842105263, 15.652173913043478, 12.413793103448276, 11.612903225806452, 9.72972972972973, 8.78048780487805, 8.372093023255815, 7.659574468085107, 6.7924528301886795, 6.101694915254237, 5.901639344262295, 5.373134328358209, 5.070422535211268, 4.931506849315069, 4.556962025316456, 4.337349397590361, 4.044943820224719, 3.711340206185567, 3.5643564356435644, 3.495145631067961, 3.364485981308411];
var data4 = ['ajjjwkobayyrltmqhkkdxhnrlnndtuldhsrklvwo', 'bkkkxlpcbzzsmunrilleyiosmooeuvmeitslmwxp', 'dmmmznredbbuowptknngakquoqqgwxogkvunoyzr', 'gpppcquhgeexrzswnqqjdntxrttjzarjnyxqrbcu', 'ktttguylkiibvdwaruunhrxbvxxndevnrcbuvfgy', 'pyyylzdqpnngaibfwzzsmwcgaccsijaswhgzakld', 'veeerfjwvttmgohlcffyscimgiiyopgycnmfgqrj', 'clllymqdcaatnvosjmmfzjptnppfvwnfjutmnxyq', 'ktttguylkiibvdwaruunhrxbvxxndevnrcbuvfgy', 'tcccpdhutrrkemfjaddwqagkeggwmnewalkdeoph', 'ucdcqdiuurskfmgjbdewrahkfghwnnfwblldfoqh', 'vdedrejvvstlgnhkcefxsbilghixoogxcmmegpri', 'wfffsgkxwuunhpimdggztdjnhjjzpqhzdonghrsk', 'xigitjlaxxvqisjpejhcugkqimkcqticerojiutn', 'ymhmunmeybwujwktfnigvklujqlgrxjgfvpnjyur', 'zrirvsnjzgxzkblygsjlwpmzkvmlscklgaqskdvw', 'axjxwyopamyflhmehykrxvnflbnrtilrhgryljwc', 'bekexfpwbtzmmonliflyycommioyupmyinsfmqxj', 'cmlmynqecbaunwotjnmgzkpunqpgvxngjvtnnyyr', 'dvmvzwrndkbdofpckwnpatqdozqpwgopkeuwohza', 'fvovbwtnfkddqfrcmwppctsdqzspygqpmewwqhba', 'hwqwdxvohlfesgtdoxrqeuuesauqahsqofyxsidb', 'jysyfzxqjnhguivfqztsgwwgucwscjusqhazukfd', 'lbubhcztlqjjwlxiscvvizyjwfyvemwvskccwnhg', 'nfwfjgbxnulnypzmugxzkdanyjazgqyzuoegyrjk', 'pkyklldcpznsaubrwlzemicsaoceivaewtglawlp', 'rqaqnrfirfpycadxyrbkooeycuekkbckyzirccnv', 'txcxpyhptmrfehfeaydrqvgfebgrmieragkyejpc', 'vfefrgjxvutngphmcgfzsdingjizoqgzcomggrrk', 'xogotplgxdvwiyjvephiumkwiskiqziiexopiatt', 'aojowpogadywlymvhpkixmnwlsnitzlihxrplawt', 'dpmpzqrhdebxozpwkqnjanqxotqjwaojkyuqobzu', 'grprcsujggezrbsynsqldptzrvtlzcrlnaxsrdcw', 'jusufvxmjjhcuevbqvtogswcuywocfuoqdavugfz', 'myvyizaqmnkgxiyftzwsjwzgxczsfjxsthdzxkid', 'pdydledvpsnlanbkwezxmbclahcxioaxwmgeapli', 'sjbjokgbsyqrdteqzkcdphfrdnfdluddzsjkdvoo', 'vqeqrrjivftygahxcrfksoiyguikobgkczmrgcrv', 'yyhyuzmqynwgjikffzisvwlgjclsrjjsfhpzjkud', 'bhkhxipzbwzpmrnoiilbyfopmlobusmbiqsimtxm', 'fhohbitzfwdpqrromipbcfspqlsbysqbmqwiqtbm', 'jisifjxajxhqusvpqjtcggwqumwcctucqrajuufn', 'nkwkjlbcnzlsyuzrulxekiasyoaegvyeutelywjp', 'rnannoffrcpvcxduyobholevcrehkychywioczns', 'vrerrsjjvgtzgbhycsflspizgvilocglcamsgdrw', 'zwiwvxnozlxekgldgxjqwumekamqshkqgfqxkivb', 'dcmczdrudrbkompjkdnwaaqkogqwwnowkludoozh', 'hjqjdkvbhyfrsttqokrdehursnudausdosyksvdo', 'lrurhszjlgjzwbxyssvlipyzwvylecwlsacswdhw', 'payalbdsppniakbhwbzumyciaecuilauwjgbamlf', 'uadaqbisupsifkghbbeuryhifehunlfubjlbfmqf', 'zbibvcntzqxjklligcjvwzmjkfmvsmkvgkqcknvg', 'edndaesvesclpnqkleoxbbrlphrxxopxlmveppai', 'jgsgfhxyjvhouqvnqhtagewoukwacruaqpahusfl', 'okxkklccozmszuarvlyelibszobehvzevtflzwkp', 'tpcppqhhterxezfwaqdjqngxetgjmaejaykqebpu', 'yvhvuwmnykwdjfkcfwipvtldjzlprgjpfepwjhua', 'dcmczdrudrbkompjkdnwaaqkogqwwnowkludoozh', 'ikrkelwcizgstuurplsefivstovebvteptzltwep', 'ntwtjublnilbydzauuxnkrabyxangeynuceuyfjy', 'ttctpuhltirbedfaaudnqrgbexgnmeenackuefpy', 'zuiuvvnmzjxckelbgvjowsmckymosfkogdqvkgvz', 'fwowbxtofldeqgrdmxpqcuseqasqyhqqmfwxqibb', 'lzuzhazrlojhwjxgsavtixyhwdytekwtsicawlhe', 'rdadnefvrsplcndkyebxobelchexkocxymiecpni', 'xigitjlaxxvqisjpejhcugkqimkcqticerojiutn', 'domozprgddbwoypvkpniamqwosqiwzoikxupoazt', 'jvsvfwxnjkhdufvcqwtpgtwduzwpcgupqeawuhfa', 'pdydledvpsnlanbkwezxmbclahcxioaxwmgeapli', 'vmemrnjevbtugwhtcnfgskiugqigoxggcvmngyrr', 'cmlmynqecbaunwotjnmgzkpunqpgvxngjvtnnyyr', 'jnsnfoxfjchvuxvuqothglwvurwhcyuhqwaouzfs', 'qpzpmqehqeoxbzcwxqajnndxbtdjjabjxyhqbbmu', 'xsgsttlkxhvaicjzethmuqkaiwkmqdimebotietx', 'ewnwaxsoelcepgqdlxoqbureparqxhpqlfvxpiab', 'lbubhcztlqjjwlxiscvvizyjwfyvemwvskccwnhg', 'shbhoigzswqpdreozicbpffpdlfblsdbzqjidtom', 'zoiovpngzdxwkylvgpjiwmmwksmiszkigxqpkavt', 'gwpwcxuogleergsdnxqqduteratqzhrqnfxxricb', 'nfwfjgbxnulnypzmugxzkdanyjazgqyzuoegyrjk', 'vfefrgjxvutngphmcgfzsdingjizoqgzcomggrrk', 'dgmgzhrydvbooqpnkhnaaeqookqawroakpuhoszl', 'liuihjzalxjqwsxpsjvcigyqwmycetwcsrcjwuhn', 'tlclpmhdtartevfsamdfqjgtepgfmwefaukmexpq', 'bpkpxqphbezxmznwiqljynoxmtojuamjiysqmbxu', 'jusufvxmjjhcuevbqvtogswcuywocfuoqdavugfz', 'raaanbfsrppickdhybbuoyeiceeuklcuyjibcmnf', 'zhihvinzzwxpkrlogijbwfmpklmbsskbgqqiktvm', 'hpqpdqvhhefxsztwoqrjenuxstujaasjoyyqsbdu', 'pyyylzdqpnngaibfwzzsmwcgaccsijaswhgzakld', 'yyhyuzmqynwgjikffzisvwlgjclsrjjsfhpzjkud', 'hzqzdavrhofhsjtgoartexuhsdutakstoiyaslde', 'qbzbmcetqqojblcixcavnzdjbfdvjmbvxkhcbnmg', 'zeievfnwztxmkollgfjywcmmkimyspkygnqfkqvj', 'iiriejwaixgqtsuppjscfgvqtmvcbttcprzjtuen', 'rnannoffrcpvcxduyobholevcrehkychywioczns', 'atjtwuolaiybldmahuknxrnblxnntelnhcrulfwy', 'jasafbxsjphiukvhqbtugywiuewucluuqjabumff', 'sibiojgasxqqdsepzjccpgfqdmfcltdczrjjduon', 'brkrxspjbgzzmbnyisllypozmvolucmliassmdxw', 'crksxsqjbhzznbnzismlyqoznvomucnlibssndxx', 'drltxtrjcizaoboaitnlzroaovpnudoljcstodyy', 'ernuxvsjejzcpbqbivolbsocpvroufplldsvpdaz', 'frqvxytjhkzfqbtciypletofqvupuiqloesyqdda', 'gruwxcujllzjrbxdicqliuojrvyqumrlsfscrdhb', 'hrzxxhvjqmzosbceihrlnvoosvdrurslxgshsdmc', 'irfyxnwjwnzutbifinsltwoutvjsuxtldhsntdsd', 'jrmzxuxjdozbubpgiutlaxobuvqtueulkisuudze', 'kruaxcyjlpzjvbxhiculiyojvvyuumvlsjscvdhf', 'lrdbxlzjuqzswbgiilvlrzoswvhvuvwlbkslwdqg', 'msdcylakurasxcgjjlwmrapsxwhwvvxmbltlxeqh', 'ntedzmblvsbtydhkkmxnsbqtyxixwwyncmumyfri', 'ougeaocmxtcvzejlloyoucrvzykyxyzoenvozgtj', 'pvjfbrdnaudyafmmmrzpxdsyaznzybaphowrahwk', 'qwngcveoevecbgqnnvaqbetcbarazfbqlpxvbial', 'rxshdafpjwfhchvooabrgfuhcbwbakcrqqyacjfm', 'syyieggqpxgndibppgcsmgvndcccbqdswrzgdkln', 'tzfjfnhrwyhuejiqqndtthwuedjdcxetdsanelso', 'uankgvisezicfkqrrveubixcferedffultbvfmap', 'vbwlhejtnajlglzssefvkjylgfafeogvuucegnjq', 'wdwmjekvnbllhnztuegxkkalhhaggohxuveehpjr', 'xfxnlflxocnmipauwfhzllcmijbhipizvwgfirks', 'yhzonhmzqdpojrcvyhibnmeojldikrjbxxihjtmt', 'zjcppknbterrktfwakjdqngrkngjmukdaykkkvpu', 'algqroodxftvlvjxcokfuoivlpkkoylfezmolxtv', 'bnlrttpfcgvamxoyetlhzpkamrplqdmhjaotmzyw', 'cprsvzqhihxgnzuzgzmjfqmgntvmsjnjpbqznbex', 'drytxgrjpiznobbaignlmronovcnuqolwcsgodly', 'etguzoslxjbvpdjbkoonusqvpxkowypneduopftz', 'fvpvbxtngkdeqfscmxppdtseqztpyhqpnewxqhca', 'gypwexuqglgerisdpxqsduverctqbhrsnfzxrkcb', 'hbqxhyvthmjfsltesyrvevyfsfureisvogcysndc', 'iesykawwjnmhtovfvasygwbhtiwshktyqhfatqfd', 'jhvzndxzmopkurygydtbjxekulztknubtiidutie', 'kkzaqhycqpsovuchbhuenyhovodunrvexjlhvwmf', 'lnebtmzfvqvtwxhiemvhszktwrivqwwhckomwzrg', 'mqkcwsaibryzxanjhswkyanzxuowtcxkilrsxcxh', 'ntrdzzblisbgydukkzxnfbqgyxvxwjynpmuzyfei', 'owzechcoqteozgclnhyqnctozadyzrzqxnxhzimj', 'pziffqdrzuhxajlmqqztwdwxadmzcaatgoaqalvk', 'qdigjqevzvlxbnlnuqaxweaxbhmagabxgpeqbpvl', 'rhjhnrfzawpycrmoyrbbxfeyclnbkbcbhqirctwm', 'sllirtgdcxtadvopctcfzgiadppcoddfjrmtdxyn', 'tpojvwhhfyxdezrqgwdjchmdetsdsgejmsqwebbo', 'utskzailjzbhfdvrkaengiqhfxwewkfnqtuafffp', 'vxxldfjpoafmghasoffrljumgbbfapgrvuyfgjkq', 'wbdmhlktubjshlgtslgvrkyshfhgevhvbvclhnqr', 'xfknlslxbcnzipnuwshzylczijohiciziwgsirxs', 'yjsopambjdrhjtvvaaidgmghjnwimkjdqxkajvft', 'znbptjnfsevqkxewejjhpnkqkrfjqtkhzyojkzou', 'asbqyjoksfaqlcexjjkmpopqlwfkvtlmzztjleov', 'bxcrdkpptgfrmhfyoklrqpurmbglaumraaykmjpw', 'ccesimquvhktnmhztmmwsqztngimfwnwcbdmnorx', 'dhhtnprzyipworkaypnbvrewollnkzobfcipotuy', 'emlustsecjuapwobdtogzsjapqpopdpgjdntpyyz', 'frqvxytjhkzfqbtciypletofqvupuiqloesyqdda', 'gwwwceuonlelrgzdneqqkutlraaqzorqufxerijb', 'hbdxhlvtumjsslgeslrvrvyssfhrevsvbgclsnqc', 'iglymtwycnoatqofxtsazwdatkpsjdtajhhttsyd', 'jluzrcxdlotjuvxgcctfixijupytomufsimcuxhe', 'kruaxcyjlpzjvbxhiculiyojvvyuumvlsjscvdhf', 'lxvbddzpmqfkwhyiodvrjzukwbzvanwrtkydwjig', 'mdxcjfavorlmxnajufwxlaamxhbwgpxxvlefxpkh', 'njadpibbrsrpytdkaixdobgpynexmsydymkiyvni', 'opeevmchvtxtzzhlgmyjscmtztiyswzjcnqmzbrj', 'pvjfbrdnaudyafmmmrzpxdsyaznzybaphowrahwk', 'qbpghxetgvjeblsnsxavdeyebftaehbvnpcxbncl', 'rhwhnefznwplcrzoyebbkfelclabkocbuqiectjm', 'sneitmgfvxvtdxhpemchsgktdricqwdhcromdzrn', 'ttnjzvhleybcedqqkvdnbhqcexrdwfenlsuvefao', 'uankgvisezicfkqrrveubixcferedffultbvfmap', 'vholnwjzfapdgrrsywfbcjedglsfkggbmuiwgtbq', 'woqmuykghbwfhyttfygieklfhsugrihiovpyhadr', 'xvtnbblnkcdiifwumbhphlsiizxhyliprwwbihgs', 'ycxoifmuodkmjmavtfiwlmzmjgbifpjwvxdfjokt', 'zjcppknbterrktfwakjdqngrkngjmukdaykkkvpu', 'aqiqwqoizfyxlalxhqkkwonxlumktalkgzrqlcvv', 'bxprdxppggfemhsyoxlrdpuembtlahmrnayxmjcw', 'cexskfqwohmmnoazvfmylqbmnibmhpnyvbffnqkx', 'dlgtrordxitvovjaconfurivopknoyofecmooxty', 'etguzoslxjbvpdjbkoonusqvpxkowypneduopftz', 'fbhvhpttykjwqlkcsppvvtywqflpezqvfecpqnua', 'gjjwprubalryrtmdarqdxugyrnnqmbrdhfkrrvwb', 'hrmxxuvjdmzbsbpeiurlavobsvqrueslkgsusdzc', 'izqyfywrhnhftjtfqystewwftduscittohaytldd', 'jhvzndxzmopkurygydtbjxekulztknubtiidutie', 'kpbavjyhspxqvzehgjujpymqvtfustvjzjqjvbof', 'lxibdqzpzqfxwhlioqvrwzuxwbmvaawrgkyqwjvg', 'mfqclyaxhrnfxptjwywzeacfxjuwiixzolgyxrdh', 'nnzdthbfqsvoyxckehxhnbkoyrdxqryhxmohyzmi', 'owzechcoqteozgclnhyqnctozadyzrzqxnxhzimj', 'pfaflidxrunpapdmwizzodcpajezisazyogiarnk', 'qocgukegtvwrbyfnfkaiqelrbsgarubiappkbapl', 'rxfhdnfpwwfuchioonbrtfuucbjbaxcrdqyncjsm', 'sgjimrgyaxoydqmpxrcaxgdydkncjbdahrhrdswn', 'tpojvwhhfyxdezrqgwdjchmdetsdsgejmsqwebbo', 'uyukeciqlzgjfixrpcesiivjfcyebmfsstzcfkhp', 'vhblnjjzsapqgresyjfbpjeqglffktgbzuijgtoq', 'wqjmwrkiabyyhamthrgkxknyhungtbhkhvrrhcwr', 'xzsnfalrjchhijvuqahtglwhidwhckitqwaailfs', 'zzspfanrjehhkjvwqajtgnwhkdwjckktqyaaklfu', 'bztrfbprkghimjwyqblthpwimdxlclmtraabmlgw', 'dzvtfdrrmihkojyaqdntjrwkodzncnottcadoliy', 'fzyvfgtrpkhnqjbcqgptmtwnqdcpcqqtweagqlla', 'hzcxfkvrtmhrsjfeqkrtqvwrsdgrcustagakslpc', 'jzhzfpxryohwujkgqpttvxwwudltczutfiapulue', 'lznbfvzreqhcwjqiqvvtbzwcwdrvcfwtlkavwlag', 'nzudfcbrlshjyjxkqcxtibwjydyxcmytsmacylhi', 'pzcffkdrtuhrajfmqkztqdwradgzcuataoakalpk', 'rzlhftfrcwhacjooqtbtzfwacdpbcdctjqatclym', 'taljgthscyiaekoqrtduzhxaeepdddeujsbtemyo', 'vbmlhujtdajbglpssufvajybgfqfeegvkucugnzq', 'xconiwlufckdimrutwhwclzdigshfgiwmwdwiobs', 'zdrpjznvielgknuwuzjxfnagkhvjgjkxpyezkpeu', 'bevrkdpwmgmkmoyyvdlyjpbkmizlhnmytafdmqiw', 'dfatlirxrinpopdawinzorcpojenisozycgiorny', 'fggvmotyxkovqqjcxopautdvqkkpjyqaeehoqsta', 'hhnxnvvzempcsrqeyvrbbvecslrrkfsblgivstac', 'jivzodxamoqkusygzdtcjxfkumztlnuctijduuie', 'ljebpmzbvqrtwthiamvdszgtwnivmwwdckkmwvrg', 'nledrmbdvsttyvhkcmxfsbitypixowyfcmmmyxri', 'pnfftndfwuvuaximenzhtdkuarjzqxahdoonazsk', 'rphhvpfhywxwczkogpbjvfmwctlbszcjfqqpcbum', 'trkjxshjbyzzebnqisdlyhozevoducelisssedxo', 'vtolzwjlfabdgdrskwfncjqdgxsfwggnmuuwgfbq', 'xvtnbblnkcdiifwumbhphlsiizxhyliprwwbihgs', 'zxzpdhnpqefokhcwohjrnnuokbdjarkrxyyhkjmu', 'bzgrfoprxghvmjjyqoltupwvmdklcymteaaomltw', 'dbothwrtfijdolraswnvcrydofsnegovmccwonby', 'fdxvjftvoklmqnacufpxltamqhbpgpqxveefqpka', 'hgxxmfvyomomsqaexfralvdmskbrjpsavghfsskc', 'jjyzpgxbpornutbgagtdmxgnunctmqudwikguvle', 'lmabsizerqupwwdidivgozjpwqevpswgykniwyng', 'npddvlbhusxsyzgkglxjrbmsythxsvyjbmqlybqi', 'pshfypdkyuawackmjpzmvdpwawlzvzamfotpaeuk', 'rvmhbufndwdbcfpomubpafsbczqbyecpkqwuchzm', 'tysjeahqjygheivqpadsghvhecwdbkesqszaekfo', 'vbzlhhjtqajoglcsshfvnjyogfdfergvxuchgnmq', 'xehnkplwycmwiokuvphyvlbwiilhhziyfwfpiqus', 'zhqpnynzhepfkrtwyyjbenefklujkikboyiyktdu', 'blqrrypdhgtfmvtycylfepifmpuloimfoamymxdw'];

function init() {
    ctx = document.getElementById('canvas1').getContext('2d');
    ctx.canvas.width = 400;
    ctx.canvas.height = 400;
    timer = document.getElementById('puztime');
    txt2 = document.getElementById('box2');
    txt4 = document.getElementById('box4');
    grid3 = document.getElementById('grid3').getElementsByTagName('td');
    window.requestAnimationFrame(draw);
    start = Date.now();
    current = Date.now();
    tot = (240 - initTimeLeft) * 1000;
}

function draw() {
    current2 = Date.now();
    elapsed = current2 - current;
    current = current2;
    tot += elapsed;
    let timeLeft = initTimeLeft - (current - start) / 1000;
    if (timeLeft < 0) { // Don't allow timer to overrun (e.g. if you switch tabs to prevent the JS from ticking, then come back 1 hour later)
        timeLeft = 0;
        elapsed -= tot - 240 * 1000;
        tot = 240 * 1000;
    }
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeLeft % 60).toString().padStart(2, '0');

    timer.innerText = `${minutes}:${seconds}`;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(0,0,400,400);
    for(var i = 0; i < 10; i++) {
        data1a[i] = (data1a[i] + data1c[i] * elapsed / 1000);
        data1b[i] = (data1b[i] + data1d[i] * elapsed / 1000);
        if (data1a[i] > 400) {
            if (data1a[i] % 800 > 400) {
                data1a[i] = 800-(data1a[i] % 800);
                data1c[i] = -data1c[i];
            }
            else {
                data1a[i] = data1a[i] % 800;
            }
        }
        if (data1a[i] < 0) {
            if (data1a[i] % 800 > -400) {
                data1a[i] = -(data1a[i] % 800);
                data1c[i] = -data1c[i];
            }
            else {
                data1a[i] = 800 + (data1a[i] % 800);
            }
        }

        if (data1b[i] > 400) {
            if (data1b[i] % 800 > 400) {
                data1b[i] = 800-(data1b[i] % 800);
                data1d[i] = -data1d[i];
            }
            else {
                data1b[i] = data1b[i] % 800;
            }
        }
        if (data1b[i] < 0) {
            if (data1b[i] % 800 > -400) {
                data1b[i] = -(data1b[i] % 800);
                data1d[i] = -data1d[i];
            }
            else {
                data1b[i] = 800 + (data1b[i] % 800);
            }
        }
        ctx.beginPath();
        ctx.arc(data1a[i], data1b[i], 5, 0, 360);
        ctx.closePath();
        ctx.fill();

        if (i != 0) {
            ctx.beginPath();
            ctx.moveTo(data1a[i-1], data1b[i-1]);
            ctx.lineTo(data1a[i], data1b[i]);
            ctx.stroke();
            ctx.closePath();
        }
    }

    let dataIndex = Math.floor(tot/1000);
    if (dataIndex >= data2.length) {
        dataIndex = data2.length - 1;
    }
    if (txt2.innerText != data2[dataIndex]) {
        txt2.innerText = data2[dataIndex];
    }
    if (txt4.innerText != data4[dataIndex]) {
        txt4.innerText = data4[dataIndex];
    }
    for(var i = 0; i < 25; i++) {
        data3a[i] = (data3a[i] + data3b[i] * elapsed / 1000)%360;
        grid3[i].style.backgroundColor = 'hsl('+data3a[i]+', 100%, 50%)';
    }

    // do this at the end so at least something gets rendered
    if (frozen) return;
    if (initTimeLeft * 1000 - (current - start) < 0) {
        doGlitch(false);
        return;
    }

    window.requestAnimationFrame(draw);
}

init();

registerOnGlitchHook((ex) => {
  frozen = true;
});
