// =============================================================================
// LEASEGUARD B2B - Persistent Browser Auto-Poster (Playwright)
// Safe, Human-Like Typing & Session Persistence (Zero Password Leaks)
// =============================================================================
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const USER_DATA_DIR = path.join(__dirname, ".browser_session");
const SCREENSHOTS_DIR = path.join(__dirname, "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Post configurati con link UTM tracciati
const POST_TEMPLATES = {
  fb_ristoratori: {
    platform: "facebook",
    title: "Post Ristoratori & HoReCa (Aumento ISTAT 100% vs 75%)",
    url: "https://www.facebook.com/groups/feed/", // o URL del gruppo specifico
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

  fb_commercianti: {
    platform: "facebook",
    title: "Post Negozianti & Commercianti (Preavviso 6+6)",
    url: "https://www.facebook.com/groups/feed/",
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

  linkedin_commercialisti: {
    platform: "linkedin",
    title: "Post LinkedIn Commercialisti & Fiscalisti B2B",
    url: "https://www.linkedin.com/feed/",
    text: `Colleghi e Professionisti d'Impresa,

Con la forte ripresa dell'indice FOI, analizzando i contratti di locazione commerciale dei conduttori riscontriamo che oltre il 60% dei locatori applica aumenti ISTAT al 100% dell'inflazione, in violazione del limite inderogabile del 75% (art. 32 L. 392/78) con conseguente nullità ex art. 79.

Per supportare le imprese nel conteggio analitico delle somme indebitamente versate e nella richiesta di ripetizione dell'indebito (art. 2033 c.c. con prescrizione decennale), è attivo il calcolatore normativo gratuito:

👉 https://leaseguard-nu.vercel.app/calcolatore-istat?utm_source=linkedin_commercialisti

Uno strumento pratico che genera la perizia e il conteggio del credito recuperabile in compensazione.
#commercialisti #locazionicommerciali #equocanone #retail #b2b`,
  },
};

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

// Simulazione digitazione umana
async function humanType(element, text) {
  for (const char of text) {
    await element.type(char, { delay: Math.floor(Math.random() * 25) + 15 });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isLoginOnly = args.includes("--login");

  console.log("==================================================================");
  console.log("🤖 LEASEGUARD B2B - AUTONOMOUS SOCIAL AUTO-POSTER");
  console.log("==================================================================");
  console.log(`📁 Cartella Profilo Sessione: ${USER_DATA_DIR}`);

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false,
    channel: "chrome", // Usa Chrome locale se disponibile
    viewport: { width: 1280, height: 800 },
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = await context.newPage();

  if (isLoginOnly) {
    console.log("\n🔑 MODALITÀ SETUP ACCESSO:");
    console.log("1. Si è aperta la finestra del browser.");
    console.log("2. Esegui l'accesso manuale a Facebook e/o LinkedIn nella finestra.");
    console.log("3. La sessione (cookie e login) rimarrà salvata per sempre in locale.");
    console.log("4. Quando hai effettuato l'accesso, torna qui e premi INVIO.\n");

    await page.goto("https://www.facebook.com");
    await askQuestion("👉 Premi INVIO quando hai completato il login su Facebook/LinkedIn...");
    console.log("✅ Sessione salvata con successo!");
    await context.close();
    return;
  }

  console.log("\n📋 SCEGLI IL POST DA PUBBLICARE:");
  console.log("1. Post Ristoratori (Facebook)");
  console.log("2. Post Commercianti & Retail (Facebook)");
  console.log("3. Post Commercialisti & Consulenti (LinkedIn)");
  console.log("4. Apri Browser per navigazione libera / Gruppi");

  const choice = await askQuestion("\nInserisci numero (1-4) [Default: 1]: ") || "1";

  let selectedKey = "fb_ristoratori";
  if (choice === "2") selectedKey = "fb_commercianti";
  if (choice === "3") selectedKey = "linkedin_commercialisti";

  if (choice === "4") {
    console.log("🌐 Apertura browser per selezione gruppi...");
    await page.goto("https://www.facebook.com/groups/feed/");
    await askQuestion("👉 Naviga dove preferisci. Premi INVIO quando hai finito...");
    await context.close();
    return;
  }

  const post = POST_TEMPLATES[selectedKey];
  console.log(`\n🎯 Caricamento: ${post.title}`);
  console.log(`🌐 Navigazione a: ${post.url}`);

  await page.goto(post.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // Copia il testo negli appunti della pagina per incollaggio rapido o digitazione
  await page.evaluate((textToCopy) => {
    navigator.clipboard.writeText(textToCopy).catch(() => {});
  }, post.text);

  console.log("\n==================================================================");
  console.log("📝 TESTO DEL POST COPIATO NEGLI APPUNTI:");
  console.log("==================================================================");
  console.log(post.text);
  console.log("==================================================================");

  console.log("\n💡 Il browser è aperto sulla pagina di destinazione.");
  console.log("Puoi incollare il post (Ctrl + V) nella casella del gruppo desiderato e pubblicarlo!");

  const screenshotPath = path.join(SCREENSHOTS_DIR, `${selectedKey}_${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath });
  console.log(`📸 Screenshot salvato in: ${screenshotPath}`);

  await askQuestion("\n👉 Premi INVIO quando hai terminato per chiudere la sessione in sicurezza...");
  await context.close();
  console.log("🎉 Operazione completata!");
}

main().catch(console.error);
