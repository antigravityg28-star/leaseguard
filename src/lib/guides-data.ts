// =============================================================================
// LEASEGUARD B2B - Programmatic SEO Guides Content Database
// High-intent keywords for commercial lease tenants in Italy
// =============================================================================

export interface SEOGuide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  publishedDate: string;
  heroExcerpt: string;
  normativa: string;
  keyPoints: string[];
  contentHtml: string;
  faq: { q: string; a: string }[];
}

export const SEO_GUIDES: Record<string, SEOGuide> = {
  "disdetta-locazione-commerciale-6-piu-6": {
    slug: "disdetta-locazione-commerciale-6-piu-6",
    title: "Disdetta Contratto Locazione Commerciale 6+6: Termini, Gravi Motivi e Modello PEC",
    metaTitle: "Disdetta Locazione Commerciale 6+6: Termini di Preavviso e PEC",
    metaDescription: "Guida completa alla disdetta del contratto di locazione commerciale 6+6. Termini di 12 e 6 mesi, gravi motivi sopravvenuti e fac-simile PEC.",
    category: "Disdette e Recessi",
    readTime: "6 min",
    publishedDate: "2026-09-01",
    heroExcerpt: "Dimenticare il termine di preavviso per la disdetta comporta il rinnovo automatico del contratto per altri 6 anni. Ecco come calcolare le date esatte e inviare la PEC a norma di legge.",
    normativa: "Legge 27 luglio 1978 n. 392, artt. 27, 28 e 29",
    keyPoints: [
      "Il preavviso standard è di 12 mesi per fine locazione o 6 mesi per recesso per gravi motivi.",
      "La comunicazione deve avvenire tassativamente tramite PEC o Raccomandata A/R.",
      "In assenza di disdetta tempestiva, il contratto si rinnova per altri 6 anni al medesimo canone.",
      "I 'gravi motivi' devono essere imprevedibili, sopravvenuti e oggettivi rispetto alla data di stipula.",
    ],
    contentHtml: `
      <h2>1. Quando e come dare disdetta a un contratto commerciale</h2>
      <p>I contratti di locazione ad uso commerciale in Italia hanno una durata minima legale di <strong>6 anni + 6 anni</strong> (o 9+9 per gli immobili alberghieri). La disdetta alla prima scadenza o ai rinnovi successivi deve rispettare termini perentori stabiliti dall'art. 28 della Legge 392/1978.</p>

      <h2>2. I termini di preavviso: 12 mesi o 6 mesi?</h2>
      <p>Esistono due tipologie principali di recesso per il conduttore:</p>
      <ul>
        <li><strong>Disdetta alla scadenza contrattuale:</strong> va comunicata con almeno <strong>12 mesi di anticipo</strong> (o il termine diverso pattuito nel contratto, mai inferiore a 6 mesi) rispetto alla data di fine sessennio.</li>
        <li><strong>Recesso per gravi motivi (Art. 27 c. 8 L. 392/78):</strong> il conduttore può recedere in qualsiasi momento con <strong>6 mesi di preavviso</strong>, purché ricorrano motivi estranei alla sua volontà, imprevedibili e sopravvenuti (es. grave calo di fatturato, cambio viabilità, crisi del settore).</li>
      </ul>

      <h2>3. Le conseguenze di una disdetta tardiva</h2>
      <p>Se la PEC di disdetta giunge al locatore anche con un solo giorno di ritardo, il contratto si intende automaticamente e integralmente <strong>rinnovato per ulteriori 6 anni</strong>. Il conduttore resta obbligato a corrispondere tutti i canoni mensili, salvo accordo bonario di risoluzione anticipata.</p>

      <h2>4. Come automatizzare il controllo scadenze con LeaseGuard</h2>
      <p>LeaseGuard calcola in automatico le date perentorie di disdetta per tutti i tuoi contratti e ti invia alert via email, SMS e WhatsApp 15, 12 e 6 mesi prima della scadenza, fornendoti la PEC precompilata con un click.</p>
    `,
    faq: [
      {
        q: "Posso inviare la disdetta via email ordinaria?",
        a: "No, la legge richiede forma scritta con data certa: solo PEC con ricevuta di avvenuta consegna o Raccomandata con ricevuta di ritorno (A/R).",
      },
      {
        q: "Cosa costituisce un 'grave motivo' di recesso?",
        a: "Fattori oggettivi, involontari e imprevedibili al momento della firma che rendono oltremodo gravosa la prosecuzione dell'attività (es. crisi documentata, mutamenti urbanistici, problemi strutturali dell'immobile).",
      },
    ],
  },

  "adeguamento-istat-affitto-commerciale-75-foi": {
    slug: "adeguamento-istat-affitto-commerciale-75-foi",
    title: "Adeguamento ISTAT Affitti Commerciali: Calcolo al 75% FOI e Nullità del 100%",
    metaTitle: "Adeguamento ISTAT 75% Locazione Commerciale: Limiti di Legge",
    metaDescription: "Perché l'aumento ISTAT al 100% è illegittimo nei contratti commerciali 6+6. Calcola il limite del 75% FOI e scopri come recuperare fino a 10 anni di arretrati.",
    category: "Canone e ISTAT",
    readTime: "5 min",
    publishedDate: "2026-09-02",
    heroExcerpt: "Oltre il 60% dei contratti commerciali subisce aumenti ISTAT calcolati abusivamente al 100%. L'art. 32 della L. 392/78 fissa il limite inderogabile al 75%.",
    normativa: "Legge 392/1978 art. 32 e art. 79; Art. 2033 Codice Civile",
    keyPoints: [
      "Il tetto massimo di rivalutazione per legge è il 75% della variazione dell'indice ISTAT FOI.",
      "Le clausole contrattuali che prevedono il 100% per contratti standard (6+6) sono nulle di pieno diritto.",
      "Il proprietario può richiedere l'aumento solo con formale richiesta scritta, mai retroattivamente.",
      "Le somme versate in eccesso possono essere recuperate per gli ultimi 10 anni (prescrizione decennale).",
    ],
    contentHtml: `
      <h2>1. Il limite inderogabile del 75% nei contratti di locazione commerciale</h2>
      <p>L'articolo 32 della Legge n. 392/1978 stabilisce espressamente che per tutti i contratti di locazione di immobili urbani adibiti ad uso diverso dall'abitazione della durata di sei anni, le variazioni del canone non possono superare il <strong>75% dell'indice dei prezzi al consumo per le famiglie di operai e impiegati (FOI)</strong>.</p>

      <h2>2. Clausola al 100%: perché è radicalmente nulla?</h2>
      <p>In base all'art. 79 della Legge sull'Equo Canone, è nulla ogni pattuizione diretta ad attribuire al locatore un canone o altri vantaggi in contrasto con le disposizioni della legge. La Corte di Cassazione ha reiteratamente statuito che la clausola di adeguamento al 100% è nulla, operando la sostituzione automatica con il limite legale del 75%.</p>

      <h2>3. Come recuperare le somme indebite versate al locatore</h2>
      <p>Il conduttore ha diritto ad esperire l'azione di <strong>ripetizione dell'indebito oggettivo ai sensi dell'art. 2033 c.c.</strong>, richiedendo la restituzione o portando in compensazione le maggiori somme corrisposte negli ultimi 10 anni.</p>
    `,
    faq: [
      {
        q: "Il proprietario può pretendere l'aumento ISTAT arretrato degli anni passati senza averlo mai chiesto prima?",
        a: "No. L'adeguamento ISTAT decorre solo dal mese successivo alla ricezione della richiesta scritta del locatore. Non possono essere pretesi aumenti per mensilità anteriori alla richiesta.",
      },
      {
        q: "Quando è ammesso l'adeguamento al 100%?",
        a: "Solo per i contratti stipulati con durata iniziale superiore a quella minima di legge (es. contratti 9+9 o 12+12).",
      },
    ],
  },

  "lettera-contestazione-canone-locazione": {
    slug: "lettera-contestazione-canone-locazione",
    title: "Lettera di Contestazione Canone di Locazione: Fac-Simile e Guida Giuridica",
    metaTitle: "Lettera Contestazione Canone e ISTAT: Modello PEC Legale",
    metaDescription: "Modello pronto per contestare canoni maggiorati, aumenti ISTAT illegittimi o spese accessorie ingiustificate nella locazione commerciale.",
    category: "Contestazioni e PEC",
    readTime: "4 min",
    publishedDate: "2026-09-03",
    heroExcerpt: "Come redigere una diffida e messa in mora formale al locatore per canoni calcolati erroneamente, con richiesta di compensazione dei crediti.",
    normativa: "Art. 1241 e 2033 Codice Civile; L. 392/78",
    keyPoints: [
      "Inviare la contestazione via PEC con allegata tabella analitica dei conteggi.",
      "Dichiarare formalmente la compensazione dei canoni futuri con il credito maturato.",
      "Invitare il locatore alla rettifica della fatturazione elettronica.",
    ],
    contentHtml: `
      <h2>1. Come impostare la contestazione formale</h2>
      <p>La lettera di contestazione è un atto giuridico fondamentale per bloccare pretese economiche non dovute e interrompere i termini di prescrizione del credito del conduttore.</p>

      <h2>2. Gli elementi indispensabili della PEC di contestazione</h2>
      <ul>
        <li>Riferimento preciso agli estremi di registrazione del contratto di locazione.</li>
        <li>Citazione dell'art. 32 L. 392/78 e declaratoria di nullità della clausola difforme.</li>
        <li>Prospetto contabile delle somme indebite corrisposte mese per mese.</li>
        <li>Dichiarazione di compensazione legale del credito sui canoni di locazione a scadere.</li>
      </ul>
    `,
    faq: [
      {
        q: "Posso sospendere unilateralmente il pagamento dell'intero canone di affitto?",
        a: "No, l'autosospensione totale del canone costituisce inadempimento contrattuale. È consigliabile operare la compensazione limitatamente alla quota indebita o versare il canone corretto per legge.",
      },
    ],
  },

  "restituzione-deposito-cauzionale-e-fideiussione": {
    slug: "restituzione-deposito-cauzionale-e-fideiussione",
    title: "Restituzione Deposito Cauzionale e Svincolo Fideiussione Bancaria nella Locazione Commerciale",
    metaTitle: "Restituzione Deposito Cauzionale Affitto: Termini e Interessi",
    metaDescription: "Come ottenere la restituzione del deposito cauzionale con gli interessi legali e lo svincolo della fideiussione bancaria al termine del contratto.",
    category: "Depositi e Garanzie",
    readTime: "5 min",
    publishedDate: "2026-09-04",
    heroExcerpt: "Il locatore è tenuto a restituire il deposito cauzionale al momento del rilascio dei locali unitamente agli interessi legali maturati anno per anno.",
    normativa: "Art. 11 Legge 392/1978; Art. 1284 Codice Civile",
    keyPoints: [
      "Il deposito non può superare 3 mensilità di canone e produce interessi legali obbligatori.",
      "Il locatore non può trattenere il deposito senza aver avviato un'azione giudiziaria per danni.",
      "La fideiussione bancaria va svincolata formalmente con restituzione dell'originale o lettera liberatoria.",
    ],
    contentHtml: `
      <h2>1. La disciplina del deposito cauzionale nella locazione commerciale</h2>
      <p>L'art. 11 della Legge 392/1978 sancisce che il deposito cauzionale non può essere superiore a tre mensilità del canone e <strong>è produttivo di interessi legali</strong> che debbono essere corrisposti al conduttore alla fine di ogni anno.</p>

      <h2>2. Trattenute del locatore: quando sono illegittime</h2>
      <p>Il locatore non può trattenere arbitrariamente la cauzione a titolo di risarcimento danni: per farlo, deve necessariamente promuovere un'azione giudiziaria di accertamento dei danni entro termini stringenti.</p>
    `,
    faq: [
      {
        q: "Cosa fare se la banca non svincola la fideiussione?",
        a: "È necessario richiedere formalmente al locatore la sottoscrizione della dichiarazione liberatoria di svincolo da trasmettere all'istituto di credito garante.",
      },
    ],
  },
};
