// =============================================================================
// LEASEGUARD B2B - Generatore Lettere & PEC Legali Professionali
// =============================================================================
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Copy, Check, Download, Scale } from "lucide-react";
import { format } from "date-fns";

export function LegalLetterGenerator() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Form states
  const [letterType, setLetterType] = useState<string>("contestazione_istat");
  const [tenantCompany, setTenantCompany] = useState<string>("La Mia Azienda S.r.l.");
  const [tenantVat, setTenantVat] = useState<string>("01234567890");
  const [tenantPec, setTenantPec] = useState<string>("miaazienda@pec.it");
  const [landlordName, setLandlordName] = useState<string>("Immobiliare Centro S.r.l.");
  const [landlordPec, setLandlordPec] = useState<string>("proprietario@pec.it");
  const [propertyAddress, setPropertyAddress] = useState<string>("Via Roma n. 123, Milano");
  const [leaseContractDate, setLeaseContractDate] = useState<string>("15/06/2021");
  const [contractCode, setContractCode] = useState<string>("REG-2021-00458");
  const [customDetails, setCustomDetails] = useState<string>("Aumento richiesto dal locatore al 100% pari a €350/mese anziché il limite legale del 75% pari a €262,50/mese.");

  // Generatore di testo legale
  const generateLetterContent = () => {
    const todayStr = format(new Date(), "dd/MM/yyyy");

    if (letterType === "contestazione_istat") {
      return `RACCOMANDATA A.R. / TRASMISSIONE A MEZZO P.E.C.

Spett.le ${landlordName || "[Nome Locatore]"}
Indirizzo PEC: ${landlordPec || "[pec.locatore@pec.it]"}

Data: ${todayStr}

OGGETTO: Contratto di locazione commerciale ad uso non abitativo stipulato in data ${leaseContractDate} (Reg. n. ${contractCode}) relativo all'immobile sito in ${propertyAddress} — CONTESTAZIONE FORMALE ADEGUAMENTO ISTAT ILLEGITTIMO (Art. 32 L. 392/1978).

Io sottoscritto/a, in qualità di legale rappresentante della società ${tenantCompany} (P.IVA / C.F. ${tenantVat}), conduttrice dell'immobile in epigrafe, con la presente intendo contestare formalmente la Vostra richiesta di adeguamento del canone di locazione.

PREMESSO CHE:
1. Ai sensi dell'art. 32 della Legge 27 luglio 1978 n. 392 (come modificato dall'art. 1 comma 9-sexies del D.L. 7 febbraio 1985 n. 12 convertito in L. 118/1985), le variazioni in aumento del canone di locazione per gli immobili ad uso diverso dall'abitazione "possono essere concordate nei limiti del 75 per cento della variazione dei prezzi al consumo per le famiglie di operai e impiegati (FOI) accertata dall'ISTAT";
2. Qualsiasi clausola contrattuale o richiesta volta ad applicare una percentuale superiore al 75% della predetta variazione è affetta da nullità ex art. 79 della Legge 392/1978 (cfr. conforme e costante giurisprudenza di Cassazione Civile, sez. III, sent. n. 15034/2005 e sent. n. 20964/2014);
3. Nel caso di specie, ${customDetails}

TUTTO CIÒ PREMESSO, CON LA PRESENTE:
- VI DIFFIDO formalmente dal pretendere canoni maggiorati in misura superiore al 75% della variazione ISTAT FOI legalmente applicabile;
- VI COMUNICO che a decorrere dalla prossima mensilità la scrivente società corrisponderà il canone rideterminato nella misura di legge pari al 75%;
- CON ESPRESSA RISERVA di ripetere ai sensi dell'art. 2033 c.c. tutte le maggiori somme indebitamente da Voi percepite negli anni pregressi entro il termine di prescrizione decennale.

Distinti saluti.

${tenantCompany}
Il Legale Rappresentante
(Firma Digitale / Trasmesso a mezzo PEC)`;
    }

    if (letterType === "disdetta_locazione") {
      return `RACCOMANDATA A.R. / TRASMISSIONE A MEZZO P.E.C.

Spett.le ${landlordName || "[Nome Locatore]"}
Indirizzo PEC: ${landlordPec || "[pec.locatore@pec.it]"}

Data: ${todayStr}

OGGETTO: Disdetta formale contratto di locazione commerciale ad uso non abitativo stipulato in data ${leaseContractDate} (Reg. n. ${contractCode}) relativo all'immobile sito in ${propertyAddress} — DINIEGO DI RINNOVO ALLA SCADENZA CONTRATTUALE.

Io sottoscritto/a, in qualità di legale rappresentante della società ${tenantCompany} (P.IVA / C.F. ${tenantVat}), conduttrice dell'immobile in oggetto,

COMUNICO

formale disdetta del contratto di locazione commerciale in epigrafe, per la naturale scadenza del periodo contrattuale in corso, nel pieno rispetto del termine di preavviso previsto dal contratto e dalla Legge 27 luglio 1978 n. 392.

Pertanto, il contratto si intenderà definitivamente cessato e privo di efficacia. L'immobile Vi sarà riconsegnato libero da persone e cose, nello stato di fatto e di diritto in cui è stato ricevuto salvo il normale deperimento d'uso, in data da concordare congiuntamente per la redazione del verbale di consegna e restituzione delle chiavi.

Contestualmente alla riconsegna, Vi invito a predisporre la restituzione del deposito cauzionale versato all'atto della stipula, maggiorato dei relativi interessi legali maturati, ovvero lo svincolo dell'originaria fideiussione bancaria/assicurativa.

Restando a disposizione per concordare il sopralluogo per la redazione del verbale di riconsegna, porgo distinti saluti.

${tenantCompany}
Il Legale Rappresentante
(Firma Digitale / Trasmesso a mezzo PEC)`;
    }

    if (letterType === "manutenzione_straordinaria") {
      return `RACCOMANDATA A.R. / TRASMISSIONE A MEZZO P.E.C.

Spett.le ${landlordName || "[Nome Locatore]"}
Indirizzo PEC: ${landlordPec || "[pec.locatore@pec.it]"}

Data: ${todayStr}

OGGETTO: Immobile commerciale sito in ${propertyAddress} — RICHIESTA URGENTE DI INTERVENTO DI MANUTENZIONE STRAORDINARIA E DIFFIDA AD ADEMPIERE (Art. 1576 e 1577 Codice Civile).

La scrivente società ${tenantCompany}, conduttrice dell'immobile in oggetto, con la presente intende segnalare quanto segue:

Nel locale commerciale adibito alla nostra attività si sono verificati i seguenti gravi vizi/guasti strutturali:
${customDetails}

Tali inconvenienti impediscono il regolare e sicuro svolgimento dell'attività commerciale, con grave nocumento e rischio di inagibilità dei locali e danni alle merci e alle attrezzature.

Ai sensi dell'art. 1576 e 1577 del Codice Civile, le opere di manutenzione straordinaria necessarie a mantenere la cosa in stato da servire all'uso convenuto sono a totale carico del locatore.

CON LA PRESENTE VI DIFFIDO

ad intervenire con la massima urgenza, e comunque non oltre il termine perentorio di 7 (sette) giorni dal ricevimento della presente PEC, per disporre il sopralluogo tecnico e l'inizio dei lavori di ripristino a Vostra cura e spese.

In difetto, ci vedremo costretti ad eseguire gli interventi in via sostitutiva con addebito dei relativi costi e ad agire per il risarcimento di tutti i danni da interruzione d'esercizio e riduzione del canone.

Distinti saluti.

${tenantCompany}
Il Legale Rappresentante`;
    }

    // Default: Svincolo Deposito
    return `RACCOMANDATA A.R. / TRASMISSIONE A MEZZO P.E.C.

Spett.le ${landlordName || "[Nome Locatore]"}
Indirizzo PEC: ${landlordPec || "[pec.locatore@pec.it]"}

Data: ${todayStr}

OGGETTO: Immobile sito in ${propertyAddress} — RICHIESTA FORMALE DI RESTITUZIONE DEPOSITO CAUZIONALE E SVINCOLO FIDEIUSSIONE BANCARIA (Art. 11 Legge 392/1978).

In seguito alla regolare riconsegna dell'immobile in oggetto avvenuta in data con redazione di verbale di rilascio privo di contestazioni sui luoghi,

CHIEDO

la restituzione immediata della somma versata a titolo di deposito cauzionale pari a euro ${customDetails || "[importo]"}, maggiorata degli interessi legali maturati, mediante bonifico bancario sulle seguenti coordinate:
IBAN: [Inserire IBAN]
Intestato a: ${tenantCompany}

In alternativa, laddove a garanzia sia stata prestata fideiussione bancaria, Vi invito a rilasciare formale attestazione liberatoria per lo svincolo definitivo della garanzia presso il nostro istituto di credito entro e non oltre 10 giorni.

Distinti saluti.

${tenantCompany}
Il Legale Rappresentante`;
  };

  const letterContent = generateLetterContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    toast({ title: "Copiato!", description: "Testo della PEC copiato negli appunti." });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([letterContent], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `PEC_${letterType}_${format(new Date(), "yyyyMMdd")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Scaricato!", description: "File della lettera legale scaricato." });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Left Form: Inputs */}
      <Card className="lg:col-span-5 shadow-sm space-y-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Scale className="h-5 w-5 text-primary" />
            Configura la Lettera PEC
          </CardTitle>
          <CardDescription>
            Seleziona il tipo di comunicazione formale e inserisci i dettagli del contratto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tipo di Lettera / Atto Legale</Label>
            <Select value={letterType} onValueChange={(v) => v && setLetterType(v)}>
              <SelectTrigger><SelectValue placeholder="Seleziona tipologia" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="contestazione_istat">🛡️ Contestazione Aumento ISTAT Illegittimo (Art. 32 L. 392/78)</SelectItem>
                <SelectItem value="disdetta_locazione">⏰ Disdetta Contratto 6+6 / Diniego Rinnovo</SelectItem>
                <SelectItem value="manutenzione_straordinaria">🔧 Diffida Lavori Straordinari / Danni (Art. 1576 c.c.)</SelectItem>
                <SelectItem value="restituzione_deposito">💰 Richiesta Restituzione Deposito / Svincolo Garanzia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>La Tua Ragione Sociale</Label>
            <Input value={tenantCompany} onChange={(e) => setTenantCompany(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Partita IVA / C.F.</Label>
              <Input value={tenantVat} onChange={(e) => setTenantVat(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Tua PEC</Label>
              <Input value={tenantPec} onChange={(e) => setTenantPec(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Nome / Società Locatore (Proprietario)</Label>
            <Input value={landlordName} onChange={(e) => setLandlordName(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Indirizzo PEC Locatore</Label>
            <Input value={landlordPec} onChange={(e) => setLandlordPec(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Indirizzo Locale Commerciale</Label>
            <Input value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Dettagli Specifici / Motivazione</Label>
            <Textarea
              rows={3}
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              placeholder="Inserisci eventuali dettagli aggiuntivi..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Generated Preview & Actions */}
      <Card className="lg:col-span-7 shadow-sm flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Anteprima Lettera Formale per PEC
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-emerald-500 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copiato!" : "Copia Testo"}
              </Button>
              <Button size="sm" onClick={handleDownloadTxt}>
                <Download className="h-4 w-4 mr-1" /> Scarica File
              </Button>
            </div>
          </div>
          <CardDescription>
            Documento redatto in conformità con la normativa sulle locazioni commerciali (L. 392/78) e il Codice Civile.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-[460px] rounded-xl border bg-muted/40 p-4 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
            {letterContent}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
