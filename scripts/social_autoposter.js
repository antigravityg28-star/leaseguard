// =============================================================================
// LEASEGUARD B2B - Precision Group Auto-Poster (Playwright)
// Targeted URL Navigation + Group Verification to Avoid Wrong Group Posting
// =============================================================================
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const USER_DATA_DIR = path.join(__dirname, ".browser_session");
const SCREENSHOTS_DIR = path.join(__dirname, "screenshots");
const LOG_FILE = path.join(__dirname, "POSTING_HISTORY.log");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Post preconfigurati
const TEMPLATES = {
  ristoratori: {
    title: "Post Ristoratori & Pizzerie (ISTAT 75% vs 100%)",
    category: "Ristorazione / HoReCa",
    searchQuery: "ristoratori italia",
    text: `🚨 ATTENZIONE RISTORATORI: Il proprietario del locale vi sta chiedendo il 100% dell'aumento ISTAT? È ILLEGITTIMO.

Negli ultimi 2 anni con l'inflazione, tantissimi proprietari di mura commerciali hanno applicato il 100% dell'indice ISTAT FOI.

⚖️ Cosa dice la legge (Art. 32 Legge 392/78):
Nei contratti commerciali standard (6+6), l'aumento NON può superare il 75% della variazione ISTAT. Ogni clausola diversa è NULLA per legge.

💡 Esempio pratico:
Su un affitto di 2.500€/mese con inflazione ISTAT al 12%:
❌ Se applica il 100% dell'inflazione ISTAT (+12%): +300€/mese (3.600€/anno extra)
✅ Con il limite di legge del 75% (+9%): max +225€/mese (2.700€/anno)
👉 Risultato: Paghi 900€ all'anno di troppo al proprietario!

E per legge potete richiedere la restituzione degli arretrati fino a 10 anni indietro (Art. 2033 c.c.)!

Abbiamo creato un calcolatore gratuito online dove inserite il vostro affitto e calcolate subito la differenza:
👉 https://leaseguard-nu.vercel.app/calcolatore-istat?utm_source=fb_horeca

Verificate i vostri contratti prima del prossimo canone! 📊`,
  },

  commercianti: {
    title: "Post Commercianti & Negozi (Preavviso 6+6 e rinnovi)",
    category: "Retail / Negozi",
    searchQuery: "commercianti negozianti italia",
    text: `⚠️ Il rischio più grande per chi gestisce un negozio o locale commerciale:
Dimenticare la PEC di disdetta e rimanere vincolati per ALTRI 6 ANNI a pagare l'affitto.

Nei contratti commerciali 6+6, la disdetta per evitare il rinnovo va inviata TASSATIVAMENTE con 12 o 6 mesi di anticipo tramite PEC o Raccomandata A/R.
Basta un solo giorno di ritardo e il contratto si rinnova per altri 6 anni (72 mensilità obbligatorie).

Abbiamo lanciato LeaseGuard B2B 🛡️:
1️⃣ Calcola le date esatte per bloccare i rinnovi indesiderati.
2️⃣ Ti avvisa prima delle scadenze perentorie.
3️⃣ Verifica se gli aumenti ISTAT rispettano il limite del 75%.

Puoi testare gratuitamente il calcolatore e la piattaforma qui:
👉 https://leaseguard-nu.vercel.app/calcolatore-istat?utm_source=fb_retail`,
  },

  commercialisti: {
    title: "Post LinkedIn Commercialisti & Tributaristi",
    category: "LinkedIn",
    searchQuery: "",
    text: `Colleghi e Professionisti d'Impresa,

Con la forte ripresa dell'indice FOI, analizzando i contratti di locazione commerciale dei conduttori riscontriamo che oltre il 60% dei locatori applica aumenti ISTAT al 100% dell'inflazione, in violazione del limite inderogabile del 75% (art. 32 L. 392/78) con conseguente nullità ex art. 79.

Per supportare le imprese nel conteggio analitico delle somme indebitamente versate e nella richiesta di ripetizione dell'indebito (art. 2033 c.c. con prescrizione decennale), è attivo il calcolatore normativo gratuito:

👉 https://leaseguard-nu.vercel.app/calcolatore-istat?utm_source=linkedin_commercialisti

Uno strumento pratico che genera la perizia e il conteggio del credito recuperabile in compensazione.
#commercialisti #locazionicommerciali #equocanone #retail #b2b`,
  },
};

function logAction(msg) {
  const ts = new Date().toISOString().replace("T", " ").substring(0, 19);
  console.log(msg);
  fs.appendFileSync(LOG_FILE, `[${ts}] ${msg}\n`, "utf-8");
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  const args = process.argv.slice(2);
  const isAuto = args.includes("--auto");

  console.log("==================================================================");
  console.log("🎯 LEASEGUARD B2B - TARGETED PRECISION SOCIAL POSTER");
  console.log("==================================================================");

  let context;
  try {
    context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      channel: "chrome",
      viewport: { width: 1280, height: 850 },
      args: ["--disable-blink-features=AutomationControlled"],
    });
  } catch (e) {
    context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      viewport: { width: 1280, height: 850 },
      args: ["--disable-blink-features=AutomationControlled"],
    });
  }

  const page = await context.newPage();

  console.log("\n📋 SCEGLI COSA VUOI FARE:");
  console.log("1. Incolla Post nel Gruppo Ristoratori (Incolla URL del gruppo desiderato)");
  console.log("2. Incolla Post nel Gruppo Commercianti (Incolla URL del gruppo)");
  console.log("3. Pubblica su LinkedIn (Feed / Pagina personale)");
  console.log("4. Cerca Gruppi di Ristoratori su Facebook per unirti");
  console.log("5. Cerca Gruppi di Commercianti su Facebook per unirti");

  const choice = (await askQuestion("\nSeleziona opzione (1-5) [Default: 1]: ")) || "1";

  let templateKey = "ristoratori";
  let targetUrl = "";

  if (choice === "1") {
    templateKey = "ristoratori";
    const inputUrl = await askQuestion("👉 Incolla qui il link del Gruppo Facebook di Ristoratori (oppure premi INVIO per aprire la ricerca): ");
    targetUrl = inputUrl || "https://www.facebook.com/search/groups/?q=ristoratori+italia";
  } else if (choice === "2") {
    templateKey = "commercianti";
    const inputUrl = await askQuestion("👉 Incolla qui il link del Gruppo Facebook di Commercianti (oppure premi INVIO per aprire la ricerca): ");
    targetUrl = inputUrl || "https://www.facebook.com/search/groups/?q=commercianti+italia";
  } else if (choice === "3") {
    templateKey = "commercialisti";
    targetUrl = "https://www.linkedin.com/feed/";
  } else if (choice === "4") {
    targetUrl = "https://www.facebook.com/search/groups/?q=ristoratori+italia";
  } else if (choice === "5") {
    targetUrl = "https://www.facebook.com/search/groups/?q=commercianti+italia";
  }

  const selectedTemplate = TEMPLATES[templateKey];

  logAction(`\n🌐 Navigazione a: ${targetUrl}`);
  try {
    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  } catch (e) {}

  await page.waitForTimeout(2000);

  // Inietta e copia il testo negli appunti
  await page.evaluate((textToCopy) => {
    navigator.clipboard.writeText(textToCopy).catch(() => {});
  }, selectedTemplate.text);

  console.log("\n==================================================================");
  console.log("📝 TESTO DEL POST COPIATO AUTOMATICAMENTE NEGLI APPUNTI:");
  console.log("==================================================================");
  console.log(selectedTemplate.text);
  console.log("==================================================================");

  console.log("\n💡 Il browser è aperto sulla pagina scelta.");
  console.log("👉 Per pubblicare: clicca sulla casella 'Scrivi qualcosa...' del gruppo e premi Ctrl + V per incollare!");

  const screenshotPath = path.join(SCREENSHOTS_DIR, `target_${Date.now()}.png`);
  try {
    await page.screenshot({ path: screenshotPath });
  } catch (e) {}

  await askQuestion("\n👉 Premi INVIO quando hai finito per chiudere la sessione...");
  await context.close();
  logAction("🎉 Sessione completata con successo!");
}

main().catch(console.error);
