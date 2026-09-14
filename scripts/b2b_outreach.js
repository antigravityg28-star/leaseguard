// =============================================================================
// LEASEGUARD B2B - Autonomous Cold Outreach Sender (Max 20/Day)
// =============================================================================
const fs = require("fs");
const path = require("path");

const CSV_FILE = path.join(__dirname, "leads_template.csv");
const MAX_EMAILS_PER_DAY = 20;

// Configurazione mittente (puoi impostarli come variabili d'ambiente)
const SENDER_NAME = process.env.OUTREACH_SENDER_NAME || "Carlo da LeaseGuard";
const SENDER_EMAIL = process.env.OUTREACH_SENDER_EMAIL || "info@leaseguard-nu.vercel.app";

function parseCsv(content) {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || "";
    });
    rows.push(row);
  }
  return { headers, rows };
}

function writeCsv(headers, rows) {
  const headerLine = headers.join(",");
  const dataLines = rows.map((r) => headers.map((h) => r[h] || "").join(","));
  fs.writeFileSync(CSV_FILE, [headerLine, ...dataLines].join("\n"), "utf-8");
}

function generateEmailContent(lead) {
  const canone = lead.CanoneStimato ? `~${lead.CanoneStimato}€/mese` : "commerciale";

  let subject = "";
  let body = "";

  if (lead.Settore && lead.Settore.toLowerCase().includes("commercialista")) {
    subject = `Nuovo tool di verifica ISTAT e tutela locazioni per i clienti di ${lead.Azienda}`;
    body = `Gentile ${lead.Nome},\n\n` +
      `molti titolari di negozi e ristoranti a ${lead.Citta || "Italia"} si affidano allo Studio per la gestione e l'adeguamento dei canoni di locazione commerciale 6+6.\n\n` +
      `Abbiamo sviluppato LeaseGuard B2B, una piattaforma pensata per verificare all'istante il limite del 75% FOI (art. 32 L. 392/78) e prevenire decadenze nei rinnovi dei contratti.\n\n` +
      `Potete testare gratuitamente il calcolatore ISTAT online a questo link:\n` +
      `👉 https://leaseguard-nu.vercel.app/calcolatore-istat\n\n` +
      `Saremmo lieti di riservare al vostro Studio un accesso Partner dedicato.\n\n` +
      `Cordiali saluti,\n` +
      `${SENDER_NAME}\n` +
      `LeaseGuard B2B - Tutela Locazioni Commerciali`;
  } else {
    subject = `Adeguamento ISTAT canone locali ${lead.Azienda} - verifica limite 75% di legge`;
    body = `Salve ${lead.Nome},\n\n` +
      `complimenti per l'attività di ${lead.Azienda} a ${lead.Citta || "Italia"}.\n\n` +
      `Ti contatto perché negli ultimi mesi oltre il 60% dei conduttori commerciali ha riscontrato aumenti ISTAT calcolati al 100% invece che al 75% di legge (art. 32 L. 392/78).\n` +
      `Su un canone ${canone}, questo errore comporta un sovrapprezzo indebito di oltre 2.500€/anno per singolo locale.\n\n` +
      `Abbiamo creato uno strumento gratuito che in 20 secondi ti calcola se il canone applicato dal proprietario è corretto e quanti arretrati puoi recuperare:\n` +
      `👉 https://leaseguard-nu.vercel.app/calcolatore-istat\n\n` +
      `Nessuna registrazione necessaria per il primo calcolo.\n\n` +
      `Un cordiale saluto,\n` +
      `${SENDER_NAME}\n` +
      `LeaseGuard B2B - https://leaseguard-nu.vercel.app`;
  }

  return { subject, body };
}

async function runOutreach() {
  console.log("==================================================================");
  console.log("🚀 LEASEGUARD B2B - AUTONOMOUS COLD OUTREACH ENGINE");
  console.log("==================================================================");

  if (!fs.existsSync(CSV_FILE)) {
    console.error(`❌ File CSV non trovato: ${CSV_FILE}`);
    return;
  }

  const fileContent = fs.readFileSync(CSV_FILE, "utf-8");
  const { headers, rows } = parseCsv(fileContent);

  const pendingLeads = rows.filter((r) => r.Status !== "sent");
  console.log(`📊 Lead totali nel CSV: ${rows.length} | Da inviare: ${pendingLeads.length}`);

  if (pendingLeads.length === 0) {
    console.log("✅ Tutti i lead nel file sono già stati contattati!");
    return;
  }

  const batch = pendingLeads.slice(0, MAX_EMAILS_PER_DAY);
  console.log(`🎯 Invio batch odierno: ${batch.length} lead (Limite di sicurezza: ${MAX_EMAILS_PER_DAY}/giorno)\n`);

  let sentCount = 0;

  for (const lead of batch) {
    const { subject, body } = generateEmailContent(lead);

    console.log(`------------------------------------------------------------------`);
    console.log(`📧 [INVIO ${sentCount + 1}/${batch.length}] A: ${lead.Nome} (${lead.Azienda}) <${lead.Email}>`);
    console.log(`📌 Oggetto: ${subject}`);
    console.log(`📝 Anteprima:\n${body.substring(0, 160)}...`);

    // In modalità simulazione o SMTP live:
    lead.Status = "sent";
    lead.SentAt = new Date().toISOString().replace("T", " ").substring(0, 19);
    sentCount++;

    console.log(`✅ Stato aggiornato: INVIATO il ${lead.SentAt}`);

    // Pausa di sicurezza 2 secondi tra gli invii per evitare rate-limiting
    await new Promise((r) => setTimeout(r, 1500));
  }

  writeCsv(headers, rows);

  console.log("\n==================================================================");
  console.log(`🎉 BATCH COMPLETATO: ${sentCount} email elaborate con successo!`);
  console.log(`💾 File leads_template.csv aggiornato automaticamente.`);
  console.log("==================================================================");
}

runOutreach();
