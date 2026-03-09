export type BibleNode = {
  id: string;
  label: string;
  children?: BibleNode[];
};

export const bibleTree: BibleNode = {
  id: "biblia",
  label: "Bíblia",
  children: [
    {
      id: "at",
      label: "Antigo Testamento",
      children: [
        {
          id: "pentateuco",
          label: "Pentateuco",
          children: [
            {
              id: "genesis",
              label: "Gênesis",
              children: [
                { id: "criacao", label: "Criação" },
                { id: "queda", label: "Queda do Homem" },
                { id: "caimabel", label: "Caim e Abel" },
                { id: "diluvio", label: "Dilúvio" },
                { id: "babel", label: "Torre de Babel" },
                { id: "patriarcas", label: "Patriarcas" },
                { id: "abraao", label: "Abraão" },
                { id: "isaque", label: "Isaque" },
                { id: "jaco", label: "Jacó" },
                { id: "jose", label: "José no Egito" },
              ],
            },
            {
              id: "exodo",
              label: "Êxodo",
              children: [
                { id: "escravidao", label: "Escravidão no Egito" },
                { id: "moises", label: "Chamado de Moisés" },
                { id: "pragas", label: "Pragas do Egito" },
                { id: "pascoa", label: "Páscoa" },
                { id: "marvermelho", label: "Travessia do Mar Vermelho" },
                { id: "sinai", label: "Aliança no Sinai" },
                { id: "dezmandamentos", label: "Dez Mandamentos" },
                { id: "tabernaculo", label: "Tabernáculo" },
              ],
            },
            {
              id: "levitico",
              label: "Levítico",
              children: [
                { id: "sacrificios", label: "Sistema de Sacrifícios" },
                { id: "sacerdocio", label: "Sacerdócio Levítico" },
                { id: "pureza", label: "Leis de Pureza" },
                { id: "expiação", label: "Dia da Expiação" },
                { id: "santidade", label: "Santidade de Israel" },
              ],
            },
            {
              id: "numeros",
              label: "Números",
              children: [
                { id: "censo", label: "Censo de Israel" },
                { id: "deserto", label: "Peregrinação no Deserto" },
                { id: "rebeldias", label: "Rebeliões de Israel" },
                { id: "balaao", label: "História de Balaão" },
              ],
            },
            {
              id: "deuteronomio",
              label: "Deuteronômio",
              children: [
                { id: "revisao", label: "Revisão da Lei" },
                { id: "alianca", label: "Renovação da Aliança" },
                { id: "bencaos", label: "Bênçãos e Maldições" },
                { id: "morteMoises", label: "Morte de Moisés" },
              ],
            },
          ],
        },

        {
          id: "historicos",
          label: "Livros Históricos",
          children: [
            { id: "josue", label: "Josué", children: [{ id: "conquista", label: "Conquista de Canaã" }] },
            { id: "juizes", label: "Juízes", children: [{ id: "ciclo", label: "Ciclo de Juízes" }] },
            { id: "rute", label: "Rute", children: [{ id: "boaz", label: "Boaz Redentor" }] },
            { id: "samuel1", label: "1 Samuel", children: [{ id: "saul", label: "Reinado de Saul" },{ id: "davi", label: "Ascensão de Davi" }] },
            { id: "samuel2", label: "2 Samuel", children: [{ id: "reidavi", label: "Reinado de Davi" }] },
            { id: "reis1", label: "1 Reis", children: [{ id: "salomao", label: "Reinado de Salomão" }] },
            { id: "reis2", label: "2 Reis", children: [{ id: "exilio", label: "Queda de Israel e Judá" }] },
            { id: "cronicas1", label: "1 Crônicas" },
            { id: "cronicas2", label: "2 Crônicas" },
            { id: "esdras", label: "Esdras", children: [{ id: "retorno", label: "Retorno do Exílio" }] },
            { id: "neemias", label: "Neemias", children: [{ id: "muros", label: "Reconstrução de Jerusalém" }] },
            { id: "ester", label: "Ester", children: [{ id: "purim", label: "Livramento dos Judeus" }] },
          ],
        },

        {
          id: "poeticos",
          label: "Poéticos e Sapienciais",
          children: [
            { id: "jo", label: "Jó", children: [{ id: "sofrimento", label: "Sofrimento do Justo" }] },
            { id: "salmos", label: "Salmos", children: [{ id: "louvor", label: "Louvores" },{ id: "lamentacao", label: "Lamentos" },{ id: "messianicos", label: "Salmos Messiânicos" }] },
            { id: "proverbios", label: "Provérbios", children: [{ id: "sabedoria", label: "Sabedoria Prática" }] },
            { id: "eclesiastes", label: "Eclesiastes", children: [{ id: "vaidade", label: "Vaidade da Vida" }] },
            { id: "cantares", label: "Cantares", children: [{ id: "amor", label: "Amor Conjugal" }] },
          ],
        },

        {
          id: "profetasmaiores",
          label: "Profetas Maiores",
          children: [
            { id: "isaias", label: "Isaías", children: [{ id: "messias", label: "Profecias Messiânicas" }] },
            { id: "jeremias", label: "Jeremias", children: [{ id: "novalianca", label: "Nova Aliança" }] },
            { id: "lamentacoes", label: "Lamentações" },
            { id: "ezequiel", label: "Ezequiel", children: [{ id: "valeossos", label: "Vale de Ossos Secos" }] },
            { id: "daniel", label: "Daniel", children: [{ id: "leoes", label: "Cova dos Leões" },{ id: "profecias", label: "Profecias Escatológicas" }] },
          ],
        },

        {
          id: "profetasmenores",
          label: "Profetas Menores",
          children: [
            { id: "oseias", label: "Oséias" },
            { id: "joel", label: "Joel" },
            { id: "amos", label: "Amós" },
            { id: "obadias", label: "Obadias" },
            { id: "jonas", label: "Jonas" },
            { id: "miqueias", label: "Miquéias" },
            { id: "naum", label: "Naum" },
            { id: "habacuque", label: "Habacuque" },
            { id: "sofonias", label: "Sofonias" },
            { id: "ageu", label: "Ageu" },
            { id: "zacarias", label: "Zacarias" },
            { id: "malaquias", label: "Malaquias" },
          ],
        },
      ],
    },

    {
      id: "nt",
      label: "Novo Testamento",
      children: [
        {
          id: "evangelhos",
          label: "Evangelhos",
          children: [
            { id: "mateus", label: "Mateus", children: [{ id: "sermaomonte", label: "Sermão do Monte" }] },
            { id: "marcos", label: "Marcos", children: [{ id: "milagres", label: "Milagres de Jesus" }] },
            { id: "lucas", label: "Lucas", children: [{ id: "parabolas", label: "Parábolas" }] },
            { id: "joao", label: "João", children: [{ id: "eusou", label: "Declarações 'Eu Sou'" }] },
          ],
        },

        {
          id: "atos",
          label: "Atos dos Apóstolos",
          children: [
            { id: "pentecostes", label: "Pentecostes" },
            { id: "igreja", label: "Nascimento da Igreja" },
            { id: "missoespaulo", label: "Viagens Missionárias de Paulo" },
          ],
        },

        {
          id: "cartaspaulo",
          label: "Cartas Paulinas",
          children: [
            { id: "romanos", label: "Romanos", children: [{ id: "justificacao", label: "Justificação pela Fé" }] },
            { id: "corintios1", label: "1 Coríntios" },
            { id: "corintios2", label: "2 Coríntios" },
            { id: "galatas", label: "Gálatas", children: [{ id: "graca", label: "Graça vs Lei" }] },
            { id: "efesios", label: "Efésios", children: [{ id: "igrejaCorpo", label: "Igreja como Corpo de Cristo" }] },
            { id: "filipenses", label: "Filipenses", children: [{ id: "alegria", label: "Alegria em Cristo" }] },
            { id: "colossenses", label: "Colossenses", children: [{ id: "supremacia", label: "Supremacia de Cristo" }] },
            { id: "tessalonicenses1", label: "1 Tessalonicenses" },
            { id: "tessalonicenses2", label: "2 Tessalonicenses" },
            { id: "timoteo1", label: "1 Timóteo" },
            { id: "timoteo2", label: "2 Timóteo" },
            { id: "tito", label: "Tito" },
            { id: "filemom", label: "Filemom" },
          ],
        },

        {
          id: "cartasgerais",
          label: "Cartas Gerais",
          children: [
            { id: "hebreus", label: "Hebreus", children: [{ id: "cristoSuperior", label: "Cristo Superior" }] },
            { id: "tiago", label: "Tiago", children: [{ id: "feobras", label: "Fé e Obras" }] },
            { id: "pedro1", label: "1 Pedro" },
            { id: "pedro2", label: "2 Pedro" },
            { id: "joao1", label: "1 João", children: [{ id: "amor", label: "Amor Cristão" }] },
            { id: "joao2", label: "2 João" },
            { id: "joao3", label: "3 João" },
            { id: "judas", label: "Judas" },
          ],
        },

        {
          id: "apocalipse",
          label: "Apocalipse",
          children: [
            { id: "igrejas", label: "Cartas às 7 Igrejas" },
            { id: "selos", label: "Os Selos" },
            { id: "trombetas", label: "As Trombetas" },
            { id: "batalha", label: "Batalha Final" },
            { id: "novaterra", label: "Novo Céu e Nova Terra" },
          ],
        },
      ],
    },
  ],
};