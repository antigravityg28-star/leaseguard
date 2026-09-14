// =============================================================================
// LEASEGUARD B2B - Autonomous Zero-Click Social Auto-Poster (Playwright)
// Human-Simulated Search, Typing, Auto-Publish & Screenshot Verification
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

// Directory dei gruppi e ricerche target
const TARGET_CHANNELS = {
  fb_ristoratori: {
    platform: "facebook",
    title: "Ristoratori & Pizzerie Italia (HoReCa)",
    searchUrl: "https://www.facebook.com/search/groups/?q=ristoratori+italia",
    defaultGroupUrl: "https://www.facebook.com/groups/feed/",
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
    title: "Commercianti & Negozianti Retail",
    searchUrl: "https://www.facebook.com/search/groups/?q=commercianti+negozianti+italia",
    defaultGroupUrl: "https://www.facebook.com/groups/feed/",
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
    title: "Commercialisti & Consulenti B2B",
    searchUrl: "https://www.linkedin.com/feed/",
    defaultGroupUrl: "https://www.linkedin.com/feed/",
    text: `Colleghi e Professionisti d'Impresa,

Con la forte ripresa dell'indice FOI, analizzando i contratti di locazione commerciale dei conduttori riscontriamo che oltre il 60% dei locatori applica aumenti ISTAT al 100% dell'inflazione, in violazione del limite inderogabile del 75% (art. 32 L. 392/78) con conseguente nullità ex art. 79.

Per supportare le imprese nel conteggio analitico delle somme indebitamente versate e nella richiesta di ripetizione dell'indebito (art. 2033 c.c. con prescrizione decennale), è attivo il calcolatore normativo gratuito:

👉 https://leaseguard-nu.vercel.app/calcolatore-istat?utm_source=linkedin_commercialisti

Uno strumento pratico che genera la perizia e il conteggio del credito recuperabile in compensazione.
#commercialisti #locazionicommerciali #equocanone #retail #b2b`,
  },
};

function logAction(message) {
  const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
  const logLine = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, logLine, "utf-8");
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

// Funzione intelligente per pubblicare su Facebook
async function publishOnFacebook(page, text, isAuto = false) {
  logAction("🔍 Ricerca casella di creazione post su Facebook...");

  const postTriggers = [
    'div[role="button"]:has-text("Scrivi qualcosa")',
    'div[role="button"]:has-text("A cosa stai pensando")',
    'div[role="button"]:has-text("Write something")',
    'div[role="button"]:has-text("Create a public post")',
    'span:has-text("Scrivi qualcosa")',
    'span:has-text("A cosa stai pensando")',
  ];

  let opened = false;
  for (const selector of postTriggers) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 2000 })) {
        await btn.click();
        opened = true;
        logAction(`✅ Cliccato editor post con selettore: ${selector}`);
        break;
      }
    } catch (e) {}
  }

  await page.waitForTimeout(2000);

  // Trova la casella di testo
  const textBoxSelectors = [
    'div[role="textbox"][contenteditable="true"]',
    'div[aria-label*="A cosa stai pensando"]',
    'div[aria-label*="Scrivi qualcosa"]',
    'div[aria-label*="Write something"]',
    'div[aria-label*="Crea un post"]',
  ];

  let textBox = null;
  for (const sel of textBoxSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 })) {
        textBox = el;
        break;
      }
    } catch (e) {}
  }

  if (textBox) {
    await textBox.click();
    await page.waitForTimeout(1000);

    // Incolla il testo con formattazione ed emoji
    await page.evaluate((content) => {
      const el = document.activeElement;
      if (el) {
        document.execCommand("insertText", false, content);
      }
    }, text);

    logAction("✍️ Testo del post digitato nell'editor di Facebook!");
    await page.waitForTimeout(3000);

    // Trova pulsante Pubblica
    const publishSelectors = [
      'div[aria-label="Pubblica"][role="button"]',
      'div[aria-label="Post"][role="button"]',
      'button:has-text("Pubblica")',
      'div[role="button"]:has-text("Pubblica")',
    ];

    let publishBtn = null;
    for (const sel of publishSelectors) {
      try {
        const pBtn = page.locator(sel).first();
        if (await pBtn.isVisible({ timeout: 2000 })) {
          publishBtn = pBtn;
          break;
        }
      } catch (e) {}
    }

    if (publishBtn) {
      if (isAuto) {
        logAction("🚀 Modalità ZERO-CLICK: Click automatico sul pulsante 'Pubblica'...");
        await publishBtn.click();
        await page.waitForTimeout(5000);
        logAction("🎉 Post inviato a Facebook con successo!");
        return true;
      } else {
        logAction("⏸️ Post pronto nella casella. Modalità assistita: puoi cliccare 'Pubblica' quando desideri.");
        return true;
      }
    }
  }

  // Fallback: se Facebook richiede interazione manuale
  await page.evaluate((textToCopy) => {
    navigator.clipboard.writeText(textToCopy).catch(() => {});
  }, text);
  logAction("📋 Testo copiato negli appunti: pronto per incollaggio rapido (Ctrl + V).");
  return false;
}

// Funzione intelligente per pubblicare su LinkedIn
async function publishOnLinkedIn(page, text, isAuto = false) {
  logAction("🔍 Ricerca casella di creazione post su LinkedIn...");

  const triggers = [
    'button:has-text("Avvia un post")',
    'button:has-text("Start a post")',
    'button:has-text("Crea un post")',
  ];

  for (const sel of triggers) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 2500 })) {
        await btn.click();
        logAction("✅ Cliccato 'Avvia un post' su LinkedIn");
        break;
      }
    } catch (e) {}
  }

  await page.waitForTimeout(2000);

  const textBox = page.locator('div[role="textbox"][contenteditable="true"]').first();
  if (await textBox.isVisible({ timeout: 3000 })) {
    await textBox.click();
    await page.evaluate((content) => {
      document.execCommand("insertText", false, content);
    }, text);

    logAction("✍️ Testo del post inserito su LinkedIn!");
    await page.waitForTimeout(2000);

    const postBtn = page.locator('button:has-text("Pubblica"), button:has-text("Post")').first();
    if (await postBtn.isVisible({ timeout: 2000 })) {
      if (isAuto) {
        logAction("🚀 Modalità ZERO-CLICK: Pubblicazione automatica su LinkedIn...");
        await postBtn.click();
        await page.waitForTimeout(4000);
        logAction("🎉 Post pubblicato su LinkedIn con successo!");
        return true;
      }
    }
  }
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const isAuto = args.includes("--auto");
  const isLoginOnly = args.includes("--login");

  console.log("==================================================================");
  console.log(`🤖 LEASEGUARD B2B - AUTONOMOUS SOCIAL POSTER [${isAuto ? "ZERO-CLICK AUTO" : "GUIDATO"}]`);
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

  if (isLoginOnly) {
    console.log("\n🔑 MODALITÀ SETUP ACCESSO (Facebook & LinkedIn)");
    await page.goto("https://www.facebook.com", { waitUntil: "domcontentloaded", timeout: 60000 });
    await askQuestion("👉 Accedi a Facebook e LinkedIn nella finestra aperta. Premi INVIO quando hai finito...");
    logAction("✅ Sessione di login salvata per sempre.");
    await context.close();
    return;
  }

  console.log("\n📋 SCEGLI IL TARGET PER L'AUTO-POSTING:");
  console.log("1. Gruppi Ristoratori & Pizzerie (Facebook)");
  console.log("2. Gruppi Commercianti & Retail (Facebook)");
  console.log("3. Feed & Gruppi Commercialisti (LinkedIn)");
  console.log("4. Cerca nuovi Gruppi Facebook per parola chiave");

  const choice = (await askQuestion("\nInserisci numero (1-4) [Default: 1]: ")) || "1";

  let selectedKey = "fb_ristoratori";
  if (choice === "2") selectedKey = "fb_commercianti";
  if (choice === "3") selectedKey = "linkedin_commercialisti";

  const target = TARGET_CHANNELS[selectedKey];

  if (choice === "4") {
    const query = await askQuestion("Inserisci termine di ricerca (es. 'franchising italia'): ") || "commercianti";
    const customUrl = `https://www.facebook.com/search/groups/?q=${encodeURIComponent(query)}`;
    logAction(`🌐 Apertura ricerca gruppi Facebook: ${customUrl}`);
    await page.goto(customUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
    await askQuestion("👉 Esplora i gruppi. Premi INVIO quando vuoi terminare...");
    await context.close();
    return;
  }

  logAction(`\n🎯 Canale selezionato: ${target.title}`);
  logAction(`🌐 Navigazione a: ${target.defaultGroupUrl}`);

  try {
    await page.goto(target.defaultGroupUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  } catch (e) {}

  await page.waitForTimeout(3000);

  let success = false;
  if (target.platform === "facebook") {
    success = await publishOnFacebook(page, target.text, isAuto);
  } else if (target.platform === "linkedin") {
    success = await publishOnLinkedIn(page, target.text, isAuto);
  }

  // Scatto screenshot di verifica
  const screenshotFile = path.join(SCREENSHOTS_DIR, `${selectedKey}_${Date.now()}.png`);
  try {
    await page.screenshot({ path: screenshotFile });
    logAction(`📸 Screenshot salvato in: ${screenshotFile}`);
  } catch (e) {}

  if (!isAuto) {
    await askQuestion("\n👉 Controlla il post a schermo e premi INVIO quando vuoi chiudere il browser...");
  } else {
    logAction("✅ Ciclo di pubblicazione autonoma completato!");
    await page.waitForTimeout(3000);
  }

  await context.close();
  console.log("==================================================================");
}

main().catch(console.error);
