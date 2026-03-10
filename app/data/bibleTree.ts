export type BibleInfo = {
  author: string;
  context: string;
  purpose: string;
  period: string;
  writtenAt: string;
};

export type BibleNode = {
  id: string;
  label: string;
  children?: BibleNode[];
  info?: BibleInfo;
};

export const bibleTree: BibleNode = {
  id: "biblia",
  label: "Bíblia",
  info: {
    author:
      "Diversos autores humanos, inspirados por Deus ao longo de muitos séculos",
    context:
      "A Bíblia é a coleção de livros sagrados reconhecidos pelos cristãos como revelação escrita de Deus. Ela reúne textos históricos, legais, poéticos, sapienciais, proféticos, evangelísticos, apostólicos e apocalípticos.",
    purpose:
      "Revelar quem Deus é, sua vontade, a história da redenção e o cumprimento dessa redenção em Jesus Cristo.",
    period:
      "Seus conteúdos abrangem desde a criação até a consumação final revelada no Apocalipse.",
    writtenAt:
      "Foi escrita ao longo de aproximadamente 1500 anos, entre cerca de 1440 a.C. e 95 d.C.",
  },
  children: [
    {
      id: "at",
      label: "Antigo Testamento",
      info: {
        author:
          "Diversos autores do povo de Israel, incluindo profetas, sacerdotes, reis e sábios",
        context:
          "O Antigo Testamento corresponde às Escrituras anteriores à vinda de Cristo. Em grande parte, ele se relaciona ao conjunto de livros reconhecidos pelo judaísmo, tradicionalmente chamado de Taná. A Taná é comumente organizada em Torá, Nevi'im e Ketuvim, enquanto o Antigo Testamento cristão costuma ser organizado em Lei, Históricos, Poéticos e Proféticos.",
        purpose:
          "Revelar a criação, a queda, a aliança de Deus com Israel, a lei, a história do povo da aliança, a sabedoria e a esperança messiânica que prepara o caminho para Cristo.",
        period:
          "Abrange desde a criação do mundo até o período pós-exílico, séculos antes do nascimento de Jesus.",
        writtenAt: "Foi escrito aproximadamente entre 1440 a.C. e 430 a.C.",
      },
      children: [
        {
          id: "pentateuco",
          label: "Pentateuco",
          info: {
            author: "Tradicionalmente atribuído principalmente a Moisés",
            context:
              "Pentateuco significa 'cinco rolos' ou 'cinco volumes'. Corresponde aos cinco primeiros livros da Bíblia: Gênesis, Êxodo, Levítico, Números e Deuteronômio. No contexto judaico, esses livros formam a Torá, isto é, a Lei, a instrução fundamental dada por Deus ao seu povo.",
            purpose:
              "Estabelecer os fundamentos da revelação bíblica: criação, pecado, promessa, aliança, redenção, formação de Israel e entrega da Lei.",
            period:
              "Seus acontecimentos vão desde a criação até a morte de Moisés, antes da entrada em Canaã.",
            writtenAt: "Tradicionalmente situado entre 1440–1400 a.C.",
          },
          children: [
            {
              id: "genesis",
              label: "Gênesis",
              info: {
                author: "Tradicionalmente atribuído a Moisés",
                context:
                  "Relata as origens do mundo, da humanidade, do pecado e do povo de Israel.",
                purpose:
                  "Mostrar o início da criação, da queda e da história da redenção.",
                period: "Eventos entre a criação e a ida de José ao Egito.",
                writtenAt: "Tradicionalmente entre 1440–1400 a.C.",
              },
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
              info: {
                author: "Tradicionalmente atribuído a Moisés",
                context:
                  "Israel estava em escravidão no Egito e foi libertado por Deus.",
                purpose:
                  "Mostrar a libertação de Israel, a aliança no Sinai e a presença de Deus com seu povo.",
                period:
                  "Século XV ou XIII a.C., conforme a linha cronológica adotada.",
                writtenAt:
                  "Tradicionalmente entre 1440–1400 a.C., durante a vida de Moisés.",
              },
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
              info: {
                author: "Tradicionalmente atribuído a Moisés",
                context:
                  "Livro dado a Israel após o Êxodo, com foco no culto, pureza e santidade.",
                purpose:
                  "Ensinar como um povo santo deve se aproximar de um Deus santo.",
                period:
                  "Durante a permanência de Israel no deserto, após a saída do Egito.",
                writtenAt:
                  "Tradicionalmente entre 1440–1400 a.C., durante o período no deserto.",
              },
              children: [
                { id: "sacrificios", label: "Sistema de Sacrifícios" },
                { id: "sacerdocio", label: "Sacerdócio Levítico" },
                { id: "pureza", label: "Leis de Pureza" },
                { id: "expiacao", label: "Dia da Expiação" },
                { id: "santidade", label: "Santidade de Israel" },
              ],
            },
            {
              id: "numeros",
              label: "Números",
              info: {
                author: "Tradicionalmente atribuído a Moisés",
                context:
                  "Registra a peregrinação de Israel no deserto, incluindo censos e rebeliões.",
                purpose:
                  "Mostrar a fidelidade de Deus diante da incredulidade do povo.",
                period: "Período de cerca de 40 anos no deserto.",
                writtenAt:
                  "Tradicionalmente entre 1440–1400 a.C., durante a peregrinação no deserto.",
              },
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
              info: {
                author: "Tradicionalmente atribuído a Moisés",
                context:
                  "Últimos discursos de Moisés antes da entrada em Canaã.",
                purpose:
                  "Renovar a aliança e chamar o povo à obediência.",
                period:
                  "Fim da vida de Moisés, pouco antes da entrada na terra prometida.",
                writtenAt:
                  "Por volta de 1400 a.C., pouco antes da morte de Moisés.",
              },
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
          info: {
            author:
              "Diversos autores e compiladores ligados à tradição histórica de Israel",
            context:
              "Esta divisão reúne livros que narram a entrada em Canaã, o período dos juízes, a monarquia, a divisão do reino, o exílio e o retorno. Na organização judaica tradicional, parte desses livros aparece em categorias diferentes da organização cristã.",
            purpose:
              "Mostrar a atuação de Deus na história do seu povo, evidenciando a importância da fidelidade à aliança e as consequências da desobediência.",
            period:
              "Da conquista da terra prometida até o período pós-exílico.",
            writtenAt:
              "Escritos e compilados em diferentes momentos, aproximadamente entre 1400 a.C. e 430 a.C.",
          },
          children: [
            {
              id: "josue",
              label: "Josué",
              info: {
                author:
                  "Tradicionalmente associado a Josué, com possíveis acréscimos posteriores",
                context:
                  "Israel entra na terra prometida após a morte de Moisés.",
                purpose:
                  "Mostrar o cumprimento da promessa de Deus na conquista e distribuição da terra.",
                period: "Entrada em Canaã, após o período do deserto.",
                writtenAt:
                  "Provavelmente entre 1400–1350 a.C., após os eventos narrados.",
              },
              children: [{ id: "conquista", label: "Conquista de Canaã" }],
            },
            {
              id: "juizes",
              label: "Juízes",
              info: {
                author: "Tradicionalmente associado a Samuel",
                context:
                  "Israel vive um ciclo de pecado, opressão, arrependimento e libertação.",
                purpose:
                  "Mostrar a decadência moral de Israel e a necessidade de liderança fiel.",
                period:
                  "Entre a conquista de Canaã e o início da monarquia.",
                writtenAt:
                  "Provavelmente entre 1050–1000 a.C., durante o início da monarquia.",
              },
              children: [{ id: "ciclo", label: "Ciclo de Juízes" }],
            },
            {
              id: "rute",
              label: "Rute",
              info: {
                author: "Autor incerto, tradicionalmente associado a Samuel",
                context:
                  "História ambientada no período dos juízes, em meio à instabilidade de Israel.",
                purpose:
                  "Mostrar a fidelidade de Deus, a redenção e a linhagem de Davi.",
                period: "Período dos Juízes.",
                writtenAt: "Provavelmente entre 1000–900 a.C.",
              },
              children: [{ id: "boaz", label: "Boaz Redentor" }],
            },
            {
              id: "samuel1",
              label: "1 Samuel",
              info: {
                author: "Tradicionalmente Samuel, Natã e Gade",
                context:
                  "Transição do período dos juízes para a monarquia em Israel.",
                purpose:
                  "Narrar o surgimento da monarquia, o reinado de Saul e a ascensão de Davi.",
                period: "Século XI a.C.",
                writtenAt: "Compilado por volta de 930–900 a.C.",
              },
              children: [
                { id: "saul", label: "Reinado de Saul" },
                { id: "davi", label: "Ascensão de Davi" },
              ],
            },
            {
              id: "samuel2",
              label: "2 Samuel",
              info: {
                author:
                  "Tradicionalmente ligado aos registros proféticos de Natã e Gade",
                context:
                  "Continuação da história de Davi após a morte de Saul.",
                purpose:
                  "Mostrar o reinado de Davi, sua aliança com Deus e suas falhas.",
                period: "Século X a.C.",
                writtenAt: "Compilado por volta de 930–900 a.C.",
              },
              children: [{ id: "reidavi", label: "Reinado de Davi" }],
            },
            {
              id: "reis1",
              label: "1 Reis",
              info: {
                author:
                  "Tradicionalmente associado a Jeremias ou compiladores proféticos",
                context:
                  "Relata o reinado de Salomão e a divisão do reino.",
                purpose:
                  "Mostrar como a fidelidade ou infidelidade dos reis afetou Israel e Judá.",
                period: "Século X ao IX a.C.",
                writtenAt:
                  "Provavelmente durante o exílio babilônico, por volta de 560–540 a.C.",
              },
              children: [{ id: "salomao", label: "Reinado de Salomão" }],
            },
            {
              id: "reis2",
              label: "2 Reis",
              info: {
                author:
                  "Tradicionalmente associado a Jeremias ou compiladores proféticos",
                context:
                  "Continua a história dos reinos divididos até o exílio.",
                purpose:
                  "Explicar a queda de Israel e Judá à luz da desobediência à aliança.",
                period: "Século IX ao VI a.C.",
                writtenAt:
                  "Provavelmente durante o exílio babilônico, por volta de 560–540 a.C.",
              },
              children: [{ id: "exilio", label: "Queda de Israel e Judá" }],
            },
            {
              id: "cronicas1",
              label: "1 Crônicas",
              info: {
                author: "Tradicionalmente atribuído a Esdras",
                context:
                  "Reconta a história de Israel com foco em Davi e no culto.",
                purpose:
                  "Reafirmar a identidade do povo pós-exílio e a centralidade da adoração.",
                period:
                  "Compilado após o exílio, provavelmente século V a.C.",
                writtenAt:
                  "Provavelmente entre 450–430 a.C., após o retorno do exílio.",
              },
            },
            {
              id: "cronicas2",
              label: "2 Crônicas",
              info: {
                author: "Tradicionalmente atribuído a Esdras",
                context:
                  "Continua a narrativa com foco em Salomão e nos reis de Judá.",
                purpose:
                  "Mostrar a relação entre fidelidade a Deus, templo e destino da nação.",
                period:
                  "Compilado após o exílio, provavelmente século V a.C.",
                writtenAt:
                  "Provavelmente entre 450–430 a.C., após o retorno do exílio.",
              },
            },
            {
              id: "esdras",
              label: "Esdras",
              info: {
                author: "Tradicionalmente atribuído a Esdras",
                context:
                  "Narra o retorno dos exilados e a reconstrução do templo.",
                purpose:
                  "Mostrar a restauração do povo e da adoração após o exílio.",
                period: "Século V a.C., período persa.",
                writtenAt: "Provavelmente entre 450–430 a.C.",
              },
              children: [{ id: "retorno", label: "Retorno do Exílio" }],
            },
            {
              id: "neemias",
              label: "Neemias",
              info: {
                author:
                  "Tradicionalmente atribuído a Neemias, com possível edição por Esdras",
                context:
                  "Relata a reconstrução dos muros de Jerusalém e reformas espirituais.",
                purpose:
                  "Mostrar a restauração da cidade e do compromisso do povo com Deus.",
                period: "Século V a.C., período persa.",
                writtenAt: "Provavelmente entre 430–420 a.C.",
              },
              children: [{ id: "muros", label: "Reconstrução de Jerusalém" }],
            },
            {
              id: "ester",
              label: "Ester",
              info: {
                author: "Autor incerto",
                context:
                  "Relata a preservação do povo judeu no império persa.",
                purpose:
                  "Mostrar a providência de Deus na preservação do seu povo.",
                period: "Período persa, provavelmente século V a.C.",
                writtenAt: "Provavelmente entre 460–350 a.C.",
              },
              children: [{ id: "purim", label: "Livramento dos Judeus" }],
            },
          ],
        },

        {
          id: "poeticos",
          label: "Poéticos e Sapienciais",
          info: {
            author:
              "Diversos autores, incluindo Davi, Salomão, filhos de Corá e outros sábios",
            context:
              "Esta divisão reúne poesias, cânticos, reflexões sobre o sofrimento, sabedoria prática, sentido da vida e amor conjugal. Na tradição judaica, muitos desses livros estão dentro dos Ketuvim, isto é, os Escritos.",
            purpose:
              "Ensinar a temer a Deus, adorá-lo, lidar com o sofrimento, buscar sabedoria e viver com discernimento diante da vida.",
            period:
              "Abrange composições de diferentes épocas da história de Israel.",
            writtenAt:
              "Foram compostos em diferentes períodos, aproximadamente entre 2000 a.C. e 400 a.C.",
          },
          children: [
            {
              id: "jo",
              label: "Jó",
              info: {
                author: "Autor incerto",
                context:
                  "Trata do sofrimento do justo e da soberania de Deus.",
                purpose:
                  "Mostrar que Deus é sábio e soberano mesmo quando o sofrimento não é compreendido.",
                period:
                  "Data incerta; contexto patriarcal é frequentemente sugerido.",
                writtenAt:
                  "Data incerta; muitos sugerem entre 2000–1500 a.C., embora o livro possa ter sido registrado posteriormente.",
              },
              children: [{ id: "sofrimento", label: "Sofrimento do Justo" }],
            },
            {
              id: "salmos",
              label: "Salmos",
              info: {
                author:
                  "Diversos autores, incluindo Davi, Asafe, filhos de Corá, entre outros",
                context:
                  "Coleção de cânticos, orações e poemas usados na adoração de Israel.",
                purpose:
                  "Expressar louvor, lamento, confiança, arrependimento e esperança messiânica.",
                period: "Composição ao longo de vários séculos do AT.",
                writtenAt: "Compostos entre aproximadamente 1000–400 a.C.",
              },
              children: [
                { id: "louvor", label: "Louvores" },
                { id: "lamentacao", label: "Lamentos" },
                { id: "messianicos", label: "Salmos Messiânicos" },
              ],
            },
            {
              id: "proverbios",
              label: "Provérbios",
              info: {
                author: "Principalmente Salomão, com outras contribuições",
                context:
                  "Coletânea de instruções de sabedoria para a vida cotidiana.",
                purpose:
                  "Ensinar sabedoria prática baseada no temor do Senhor.",
                period:
                  "Majoritariamente ligado ao período monárquico de Israel.",
                writtenAt:
                  "Principalmente durante o reinado de Salomão, cerca de 950–700 a.C.",
              },
              children: [{ id: "sabedoria", label: "Sabedoria Prática" }],
            },
            {
              id: "eclesiastes",
              label: "Eclesiastes",
              info: {
                author: "Tradicionalmente associado a Salomão",
                context:
                  "Reflexões sobre o sentido da vida debaixo do sol.",
                purpose:
                  "Mostrar a vaidade da vida sem Deus e a importância de temê-lo.",
                period: "Tradicionalmente ligado ao período de Salomão.",
                writtenAt: "Tradicionalmente por volta de 935 a.C.",
              },
              children: [{ id: "vaidade", label: "Vaidade da Vida" }],
            },
            {
              id: "cantares",
              label: "Cantares",
              info: {
                author: "Tradicionalmente associado a Salomão",
                context:
                  "Poema sobre amor, beleza e relacionamento conjugal.",
                purpose:
                  "Celebrar o amor conjugal dentro da ordem de Deus.",
                period: "Tradicionalmente ligado ao período de Salomão.",
                writtenAt:
                  "Tradicionalmente durante o reinado de Salomão, cerca de 950 a.C.",
              },
              children: [{ id: "amor", label: "Amor Conjugal" }],
            },
          ],
        },

        {
          id: "profetasmaiores",
          label: "Profetas Maiores",
          info: {
            author: "Profetas de Judá e do exílio",
            context:
              "Na tradição cristã, esse grupo reúne livros proféticos mais extensos em tamanho. O termo 'maiores' não indica maior importância espiritual, mas maior extensão literária.",
            purpose:
              "Registrar mensagens de juízo, arrependimento, consolo, restauração e esperança messiânica dirigidas ao povo de Deus.",
            period: "Principalmente entre os séculos VIII e VI a.C.",
            writtenAt: "Escritos aproximadamente entre 740 a.C. e 530 a.C.",
          },
          children: [
            {
              id: "isaias",
              label: "Isaías",
              info: {
                author: "Isaías",
                context:
                  "Profetizou em um período de crise espiritual e ameaça internacional.",
                purpose:
                  "Chamar Judá ao arrependimento e anunciar juízo e esperança messiânica.",
                period: "Século VIII a.C.",
                writtenAt: "Entre aproximadamente 740–680 a.C.",
              },
              children: [{ id: "messias", label: "Profecias Messiânicas" }],
            },
            {
              id: "jeremias",
              label: "Jeremias",
              info: {
                author: "Jeremias",
                context:
                  "Profetizou nos últimos anos de Judá antes do exílio babilônico.",
                purpose:
                  "Advertir sobre o juízo, chamar ao arrependimento e anunciar a nova aliança.",
                period: "Final do século VII e início do VI a.C.",
                writtenAt: "Entre aproximadamente 627–580 a.C.",
              },
              children: [{ id: "novalianca", label: "Nova Aliança" }],
            },
            {
              id: "lamentacoes",
              label: "Lamentações",
              info: {
                author: "Tradicionalmente atribuído a Jeremias",
                context: "Poemas de lamento pela queda de Jerusalém.",
                purpose:
                  "Expressar dor pelo juízo de Deus e sustentar esperança em sua misericórdia.",
                period: "Após a queda de Jerusalém em 586 a.C.",
                writtenAt:
                  "Por volta de 586–580 a.C., após a destruição de Jerusalém.",
              },
            },
            {
              id: "ezequiel",
              label: "Ezequiel",
              info: {
                author: "Ezequiel",
                context: "Profetizou entre os exilados na Babilônia.",
                purpose:
                  "Explicar o juízo de Deus, chamar ao arrependimento e anunciar restauração.",
                period: "Século VI a.C., durante o exílio.",
                writtenAt:
                  "Entre aproximadamente 593–571 a.C., durante o exílio babilônico.",
              },
              children: [{ id: "valeossos", label: "Vale de Ossos Secos" }],
            },
            {
              id: "daniel",
              label: "Daniel",
              info: {
                author: "Tradicionalmente Daniel",
                context:
                  "Relata a fidelidade a Deus em ambiente pagão e contém visões apocalípticas.",
                purpose:
                  "Encorajar a fidelidade dos santos e revelar a soberania de Deus sobre os reinos.",
                period: "Século VI a.C., exílio babilônico e persa.",
                writtenAt: "Tradicionalmente entre 605–530 a.C.",
              },
              children: [
                { id: "leoes", label: "Cova dos Leões" },
                { id: "profecias", label: "Profecias Escatológicas" },
              ],
            },
          ],
        },

        {
          id: "profetasmenores",
          label: "Profetas Menores",
          info: {
            author: "Doze profetas de diferentes épocas",
            context:
              "Na tradição cristã, esse grupo reúne os doze livros proféticos menores em extensão. Assim como nos Profetas Maiores, 'menores' não quer dizer menos importantes, mas apenas mais curtos.",
            purpose:
              "Chamar o povo ao arrependimento, denunciar pecado e injustiça, anunciar juízo e sustentar a esperança da restauração futura.",
            period: "Principalmente entre os séculos IX e V a.C.",
            writtenAt: "Escritos aproximadamente entre 835 a.C. e 430 a.C.",
          },
          children: [
            {
              id: "oseias",
              label: "Oséias",
              info: {
                author: "Oséias",
                context:
                  "Profetizou ao reino do Norte em tempo de decadência espiritual.",
                purpose:
                  "Mostrar o amor fiel de Deus diante da infidelidade de Israel.",
                period: "Século VIII a.C.",
                writtenAt: "Entre aproximadamente 755–710 a.C.",
              },
            },
            {
              id: "joel",
              label: "Joel",
              info: {
                author: "Joel",
                context:
                  "Usa a imagem de uma praga devastadora para chamar o povo ao arrependimento.",
                purpose:
                  "Anunciar o dia do Senhor e chamar ao arrependimento com esperança futura.",
                period:
                  "Data discutida; possivelmente entre os séculos IX e V a.C.",
                writtenAt:
                  "Possivelmente entre 835–800 a.C. ou após o exílio (data debatida).",
              },
            },
            {
              id: "amos",
              label: "Amós",
              info: {
                author: "Amós",
                context:
                  "Profeta do reino do Sul enviado ao Norte em tempos de prosperidade e injustiça.",
                purpose:
                  "Denunciar a injustiça social e anunciar o juízo de Deus.",
                period: "Século VIII a.C.",
                writtenAt: "Por volta de 760–750 a.C.",
              },
            },
            {
              id: "obadias",
              label: "Obadias",
              info: {
                author: "Obadias",
                context:
                  "Profecia contra Edom por sua arrogância e violência contra Judá.",
                purpose:
                  "Anunciar juízo sobre Edom e a vindicação do povo de Deus.",
                period:
                  "Provavelmente após a queda de Jerusalém, século VI a.C.",
                writtenAt: "Provavelmente por volta de 586 a.C.",
              },
            },
            {
              id: "jonas",
              label: "Jonas",
              info: {
                author: "Tradicionalmente Jonas",
                context: "Narrativa sobre o profeta enviado a Nínive.",
                purpose:
                  "Mostrar a misericórdia de Deus para além de Israel.",
                period: "Século VIII a.C.",
                writtenAt: "Provavelmente entre 760–750 a.C.",
              },
            },
            {
              id: "miqueias",
              label: "Miquéias",
              info: {
                author: "Miquéias",
                context: "Profetizou contra a corrupção de Judá e Israel.",
                purpose:
                  "Anunciar juízo, chamar à justiça e apontar esperança messiânica.",
                period: "Século VIII a.C.",
                writtenAt: "Entre aproximadamente 735–700 a.C.",
              },
            },
            {
              id: "naum",
              label: "Naum",
              info: {
                author: "Naum",
                context: "Profecia contra Nínive e o império assírio.",
                purpose:
                  "Anunciar o juízo de Deus sobre os opressores do seu povo.",
                period: "Século VII a.C.",
                writtenAt: "Entre aproximadamente 650–630 a.C.",
              },
            },
            {
              id: "habacuque",
              label: "Habacuque",
              info: {
                author: "Habacuque",
                context:
                  "Diálogo do profeta com Deus diante da injustiça e da ameaça babilônica.",
                purpose:
                  "Ensinar a confiar em Deus mesmo em tempos de crise.",
                period: "Final do século VII a.C.",
                writtenAt: "Por volta de 610–605 a.C.",
              },
            },
            {
              id: "sofonias",
              label: "Sofonias",
              info: {
                author: "Sofonias",
                context:
                  "Profetizou antes das reformas de Josias, em um período de idolatria.",
                purpose:
                  "Anunciar o dia do Senhor em juízo e esperança.",
                period: "Século VII a.C.",
                writtenAt: "Por volta de 640–620 a.C.",
              },
            },
            {
              id: "ageu",
              label: "Ageu",
              info: {
                author: "Ageu",
                context:
                  "Profeta pós-exílico que exortou o povo a reconstruir o templo.",
                purpose:
                  "Chamar o povo a priorizar a casa de Deus e obedecer.",
                period: "520 a.C.",
                writtenAt: "520 a.C.",
              },
            },
            {
              id: "zacarias",
              label: "Zacarias",
              info: {
                author: "Zacarias",
                context:
                  "Profeta pós-exílico com visões de restauração e esperança messiânica.",
                purpose:
                  "Encorajar o povo no retorno do exílio e apontar para o Messias.",
                period: "Final do século VI a.C.",
                writtenAt: "Entre 520–480 a.C.",
              },
            },
            {
              id: "malaquias",
              label: "Malaquias",
              info: {
                author: "Malaquias",
                context:
                  "Último profeta do AT, confrontando frieza espiritual pós-exílica.",
                purpose:
                  "Chamar o povo e os sacerdotes à fidelidade à aliança.",
                period: "Século V a.C.",
                writtenAt: "Entre 460–430 a.C.",
              },
            },
          ],
        },
      ],
    },

    {
      id: "nt",
      label: "Novo Testamento",
      info: {
        author:
          "Diversos autores apostólicos e seus cooperadores, no contexto da igreja do primeiro século",
        context:
          "O Novo Testamento reúne os escritos cristãos que testemunham a vida, morte, ressurreição e exaltação de Jesus Cristo, bem como a formação e expansão da igreja apostólica.",
        purpose:
          "Apresentar Cristo como cumprimento das promessas do Antigo Testamento, ensinar a doutrina apostólica e sustentar a esperança da consumação final.",
        period:
          "Abrange os eventos da vida de Jesus, o nascimento da igreja e o ensino apostólico do século I.",
        writtenAt: "Foi escrito aproximadamente entre 45 d.C. e 95 d.C.",
      },
      children: [
        {
          id: "evangelhos",
          label: "Evangelhos",
          info: {
            author:
              "Mateus, Marcos, Lucas e João, segundo a tradição cristã",
            context:
              "Os Evangelhos são os quatro relatos canônicos da vida, ministério, morte e ressurreição de Jesus. Eles não são biografias modernas, mas testemunhos teológicos e históricos sobre Cristo.",
            purpose:
              "Apresentar quem Jesus é, o que Ele fez e chamar o leitor à fé nele.",
            period:
              "Narram principalmente os acontecimentos do ministério terreno de Jesus no século I.",
            writtenAt:
              "Foram escritos aproximadamente entre 50 d.C. e 95 d.C.",
          },
          children: [
            {
              id: "mateus",
              label: "Mateus",
              info: {
                author: "Tradicionalmente Mateus",
                context:
                  "Evangelho com forte ênfase judaica e no cumprimento das profecias.",
                purpose:
                  "Apresentar Jesus como o Messias prometido e Rei.",
                period: "Provavelmente entre 50–70 d.C.",
                writtenAt: "Provavelmente entre 50–70 d.C.",
              },
              children: [{ id: "sermaomonte", label: "Sermão do Monte" }],
            },
            {
              id: "marcos",
              label: "Marcos",
              info: {
                author: "Tradicionalmente João Marcos",
                context:
                  "Evangelho breve e dinâmico, focado nas ações e autoridade de Jesus.",
                purpose:
                  "Apresentar Jesus como o Servo poderoso e Filho de Deus.",
                period: "Provavelmente entre 55–65 d.C.",
                writtenAt: "Provavelmente entre 55–65 d.C.",
              },
              children: [{ id: "milagres", label: "Milagres de Jesus" }],
            },
            {
              id: "lucas",
              label: "Lucas",
              info: {
                author: "Tradicionalmente Lucas",
                context:
                  "Relato ordenado para apresentar a vida de Jesus com cuidado histórico.",
                purpose:
                  "Dar certeza sobre os fatos referentes a Cristo e sua obra.",
                period: "Provavelmente entre 60–70 d.C.",
                writtenAt: "Provavelmente entre 60–70 d.C.",
              },
              children: [{ id: "parabolas", label: "Parábolas" }],
            },
            {
              id: "joao",
              label: "João",
              info: {
                author: "Tradicionalmente João",
                context:
                  "Evangelho mais teológico, com foco na identidade divina de Jesus.",
                purpose:
                  "Levar o leitor a crer que Jesus é o Cristo, o Filho de Deus.",
                period: "Provavelmente entre 80–90 d.C.",
                writtenAt: "Provavelmente entre 85–95 d.C.",
              },
              children: [{ id: "eusou", label: "Declarações 'Eu Sou'" }],
            },
          ],
        },

        {
          id: "atos",
          label: "Atos dos Apóstolos",
          info: {
            author: "Tradicionalmente Lucas",
            context:
              "Continuação do Evangelho de Lucas, narrando o início da igreja.",
            purpose:
              "Mostrar a expansão do evangelho pelo poder do Espírito Santo.",
            period: "Século I d.C., logo após a ressurreição de Cristo.",
            writtenAt: "Por volta de 62–70 d.C.",
          },
          children: [
            { id: "pentecostes", label: "Pentecostes" },
            { id: "igreja", label: "Nascimento da Igreja" },
            { id: "missoespaulo", label: "Viagens Missionárias de Paulo" },
          ],
        },

        {
          id: "cartaspaulo",
          label: "Cartas Paulinas",
          info: {
            author: "Paulo, apóstolo, e em alguns casos com cooperadores",
            context:
              "Este grupo reúne as cartas tradicionalmente atribuídas a Paulo, escritas a igrejas e indivíduos para instrução, correção, consolo e organização da vida cristã.",
            purpose:
              "Ensinar a doutrina cristã, aplicar o evangelho à vida da igreja e orientar comunidades e líderes.",
            period: "Correspondem ao ministério apostólico de Paulo no século I.",
            writtenAt:
              "Foram escritas aproximadamente entre 48 d.C. e 67 d.C.",
          },
          children: [
            {
              id: "romanos",
              label: "Romanos",
              info: {
                author: "Paulo",
                context:
                  "Carta à igreja em Roma com exposição sistemática do evangelho.",
                purpose:
                  "Explicar a justiça de Deus, a salvação e a vida cristã.",
                period: "Por volta de 57 d.C.",
                writtenAt: "Por volta de 57 d.C.",
              },
              children: [{ id: "justificacao", label: "Justificação pela Fé" }],
            },
            {
              id: "corintios1",
              label: "1 Coríntios",
              info: {
                author: "Paulo",
                context:
                  "Carta para tratar divisões, imoralidade e desordem na igreja de Corinto.",
                purpose:
                  "Corrigir problemas práticos e doutrinários na igreja.",
                period: "Por volta de 53–55 d.C.",
                writtenAt: "Por volta de 53–55 d.C.",
              },
            },
            {
              id: "corintios2",
              label: "2 Coríntios",
              info: {
                author: "Paulo",
                context:
                  "Carta marcada por defesa do ministério apostólico e encorajamento.",
                purpose:
                  "Reconciliar-se com a igreja e defender seu apostolado.",
                period: "Por volta de 55–56 d.C.",
                writtenAt: "Por volta de 55–56 d.C.",
              },
            },
            {
              id: "galatas",
              label: "Gálatas",
              info: {
                author: "Paulo",
                context:
                  "Escrita contra a influência judaizante nas igrejas da Galácia.",
                purpose:
                  "Defender a justificação pela fé e a liberdade cristã.",
                period: "Provavelmente entre 48–55 d.C.",
                writtenAt: "Provavelmente entre 48–55 d.C.",
              },
              children: [{ id: "graca", label: "Graça vs Lei" }],
            },
            {
              id: "efesios",
              label: "Efésios",
              info: {
                author: "Paulo",
                context:
                  "Carta com forte ênfase na obra de Cristo e na igreja.",
                purpose:
                  "Mostrar a unidade do povo de Deus e a vida cristã em Cristo.",
                period: "Por volta de 60–62 d.C.",
                writtenAt: "Por volta de 60–62 d.C.",
              },
              children: [
                { id: "igrejaCorpo", label: "Igreja como Corpo de Cristo" },
              ],
            },
            {
              id: "filipenses",
              label: "Filipenses",
              info: {
                author: "Paulo",
                context:
                  "Carta de prisão marcada por gratidão e alegria.",
                purpose:
                  "Encorajar os crentes à alegria, humildade e perseverança em Cristo.",
                period: "Por volta de 60–62 d.C.",
                writtenAt: "Por volta de 60–62 d.C.",
              },
              children: [{ id: "alegria", label: "Alegria em Cristo" }],
            },
            {
              id: "colossenses",
              label: "Colossenses",
              info: {
                author: "Paulo",
                context:
                  "Carta escrita para combater ensinos errados sobre Cristo.",
                purpose:
                  "Afirmar a supremacia e suficiência de Cristo.",
                period: "Por volta de 60–62 d.C.",
                writtenAt: "Por volta de 60–62 d.C.",
              },
              children: [{ id: "supremacia", label: "Supremacia de Cristo" }],
            },
            {
              id: "tessalonicenses1",
              label: "1 Tessalonicenses",
              info: {
                author: "Paulo",
                context:
                  "Carta a uma igreja jovem em meio à perseguição.",
                purpose:
                  "Encorajar a perseverança e ensinar sobre a volta de Cristo.",
                period: "Por volta de 50–51 d.C.",
                writtenAt: "Por volta de 50–51 d.C.",
              },
            },
            {
              id: "tessalonicenses2",
              label: "2 Tessalonicenses",
              info: {
                author: "Paulo",
                context:
                  "Continua orientações sobre perseguição e escatologia.",
                purpose:
                  "Corrigir confusões sobre o dia do Senhor e fortalecer os crentes.",
                period: "Pouco depois de 1 Tessalonicenses.",
                writtenAt:
                  "Pouco depois de 1 Tessalonicenses, por volta de 51–52 d.C.",
              },
            },
            {
              id: "timoteo1",
              label: "1 Timóteo",
              info: {
                author: "Paulo",
                context:
                  "Carta pastoral a Timóteo sobre liderança e ordem na igreja.",
                purpose:
                  "Orientar a organização da igreja e a sã doutrina.",
                period: "Provavelmente entre 62–64 d.C.",
                writtenAt: "Provavelmente entre 62–64 d.C.",
              },
            },
            {
              id: "timoteo2",
              label: "2 Timóteo",
              info: {
                author: "Paulo",
                context: "Última carta de Paulo, escrita em prisão.",
                purpose:
                  "Encorajar Timóteo à fidelidade, coragem e perseverança.",
                period:
                  "Pouco antes da morte de Paulo, por volta de 64–67 d.C.",
                writtenAt:
                  "Pouco antes da morte de Paulo, por volta de 64–67 d.C.",
              },
            },
            {
              id: "tito",
              label: "Tito",
              info: {
                author: "Paulo",
                context:
                  "Carta pastoral sobre liderança e vida piedosa em Creta.",
                purpose:
                  "Instruir Tito a estabelecer ordem e sã doutrina nas igrejas.",
                period: "Provavelmente entre 62–64 d.C.",
                writtenAt: "Provavelmente entre 62–64 d.C.",
              },
            },
            {
              id: "filemom",
              label: "Filemom",
              info: {
                author: "Paulo",
                context: "Carta pessoal a Filemom sobre Onésimo.",
                purpose:
                  "Aplicar o evangelho à reconciliação e ao perdão.",
                period: "Por volta de 60–62 d.C.",
                writtenAt: "Por volta de 60–62 d.C.",
              },
            },
          ],
        },

        {
          id: "cartasgerais",
          label: "Cartas Gerais",
          info: {
            author:
              "Diversos autores apostólicos ou ligados ao círculo apostólico",
            context:
              "Esse grupo reúne cartas que, em geral, não foram dirigidas apenas a uma igreja local específica, mas a públicos mais amplos ou variados.",
            purpose:
              "Fortalecer a fé, defender a sã doutrina, encorajar perseverança e orientar a vida cristã.",
            period: "Escritas no contexto da igreja do século I.",
            writtenAt:
              "Foram escritas aproximadamente entre 40 d.C. e 95 d.C.",
          },
          children: [
            {
              id: "hebreus",
              label: "Hebreus",
              info: {
                author: "Autor humano incerto",
                context:
                  "Escrito para cristãos tentados a retroceder ao antigo sistema.",
                purpose:
                  "Mostrar a superioridade de Cristo e da nova aliança.",
                period: "Provavelmente antes de 70 d.C.",
                writtenAt: "Provavelmente antes de 70 d.C.",
              },
              children: [{ id: "cristoSuperior", label: "Cristo Superior" }],
            },
            {
              id: "tiago",
              label: "Tiago",
              info: {
                author: "Tradicionalmente Tiago, irmão do Senhor",
                context: "Carta prática a cristãos dispersos.",
                purpose: "Mostrar uma fé viva e prática no cotidiano.",
                period: "Provavelmente entre 40–50 d.C.",
                writtenAt: "Provavelmente entre 40–50 d.C.",
              },
              children: [{ id: "feobras", label: "Fé e Obras" }],
            },
            {
              id: "pedro1",
              label: "1 Pedro",
              info: {
                author: "Pedro",
                context: "Carta a cristãos sofrendo perseguição.",
                purpose:
                  "Encorajar a esperança, santidade e perseverança em meio ao sofrimento.",
                period: "Início da década de 60 d.C.",
                writtenAt:
                  "Início da década de 60 d.C., provavelmente 62–64 d.C.",
              },
            },
            {
              id: "pedro2",
              label: "2 Pedro",
              info: {
                author: "Pedro",
                context: "Carta de advertência contra falsos mestres.",
                purpose:
                  "Chamar os crentes ao crescimento espiritual e à vigilância doutrinária.",
                period:
                  "Pouco antes da morte de Pedro, década de 60 d.C.",
                writtenAt:
                  "Pouco antes da morte de Pedro, provavelmente 64–68 d.C.",
              },
            },
            {
              id: "joao1",
              label: "1 João",
              info: {
                author: "Tradicionalmente João",
                context:
                  "Carta para fortalecer a certeza da salvação e combater erros.",
                purpose:
                  "Afirmar a verdade sobre Cristo e a evidência do novo nascimento.",
                period: "Final do século I d.C.",
                writtenAt:
                  "Final do século I d.C., provavelmente 85–95 d.C.",
              },
              children: [{ id: "amor", label: "Amor Cristão" }],
            },
            {
              id: "joao2",
              label: "2 João",
              info: {
                author: "Tradicionalmente João",
                context:
                  "Breve carta alertando contra falsos ensinos.",
                purpose:
                  "Exortar à verdade e ao amor com discernimento.",
                period: "Final do século I d.C.",
                writtenAt:
                  "Final do século I d.C., provavelmente 85–95 d.C.",
              },
            },
            {
              id: "joao3",
              label: "3 João",
              info: {
                author: "Tradicionalmente João",
                context:
                  "Carta pessoal tratando de hospitalidade e liderança.",
                purpose:
                  "Encorajar fidelidade, apoio à verdade e boa conduta na igreja.",
                period: "Final do século I d.C.",
                writtenAt:
                  "Final do século I d.C., provavelmente 85–95 d.C.",
              },
            },
            {
              id: "judas",
              label: "Judas",
              info: {
                author: "Judas, servo de Jesus Cristo",
                context:
                  "Carta contra falsos mestres infiltrados na comunidade.",
                purpose: "Exortar os crentes a batalhar pela fé.",
                period: "Provavelmente entre 60–80 d.C.",
                writtenAt: "Provavelmente entre 60–80 d.C.",
              },
            },
          ],
        },

        {
          id: "apocalipse",
          label: "Apocalipse",
          info: {
            author: "Tradicionalmente João",
            context:
              "Escrito em contexto de oposição e perseguição à igreja.",
            purpose:
              "Consolar os santos e revelar a vitória final de Cristo.",
            period:
              "Fim do século I d.C., provavelmente durante o reinado de Domiciano.",
            writtenAt:
              "Provavelmente entre 90–95 d.C., durante o reinado de Domiciano.",
          },
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