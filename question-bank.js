/* Original study questions generated from curated facts and calculation templates.
 * Reference material is listed on the study site. This is not a PTCB question bank.
 * Format: [topic, study page, stem, four choices, correct choice index, explanation].
 */
(() => {
  "use strict";
  const med = "Medications", fed = "Federal rules", safe = "Patient safety", order = "Order entry";
  const make = (topic, page, stem, answer, alternatives, why) => {
    const choices = [...new Set([answer, ...alternatives])].slice(0, 4);
    if (choices.length !== 4) throw Error(`Insufficient choices: ${stem}`);
    return [topic, page, stem, choices, 0, why];
  };
  const lines = text => text.trim().split("\n").map(row => row.trim().split("|"));
  const pick = (rows, key, start, skip = []) => rows.map((_,i) => rows[(i + start) % rows.length][key])
    .filter(v => v && !skip.includes(v));
  const labels = lines(`
  lisinopril|Zestril|ACE inhibitor|lowering blood pressure|Dry cough is a characteristic effect; facial swelling requires urgent assessment.
  losartan|Cozaar|angiotensin receptor blocker|lowering blood pressure|Potassium may rise; flag concurrent potassium products.
  amlodipine|Norvasc|dihydropyridine calcium channel blocker|lowering blood pressure|Peripheral edema is a recognized effect.
  metoprolol succinate ER|Toprol-XL|beta blocker|lowering blood pressure|Confirm the succinate extended-release form; do not select tartrate automatically.
  hydrochlorothiazide|Microzide|thiazide diuretic|lowering blood pressure|Watch for electrolyte issues such as low potassium.
  furosemide|Lasix|loop diuretic|treating fluid retention|It can contribute to potassium loss.
  spironolactone|Aldactone|potassium-sparing diuretic|treating fluid retention in selected patients|High potassium is a safety concern.
  atorvastatin|Lipitor|statin|lowering LDL cholesterol|Flag unexplained muscle pain for pharmacist review.
  ezetimibe|Zetia|intestinal cholesterol absorption inhibitor|lowering LDL cholesterol|It is not a statin.
  nitroglycerin sublingual|Nitrostat|nitrate|relieving angina|Concurrent PDE5 inhibitor use poses a serious hypotension risk.
  warfarin|Jantoven|vitamin K antagonist|anticoagulation|INR monitoring and drug interactions are key concerns.
  apixaban|Eliquis|direct factor Xa inhibitor|anticoagulation|A profile with both the brand and generic may contain duplicate therapy.
  clopidogrel|Plavix|P2Y12 antiplatelet|reducing platelet aggregation|It is an antiplatelet, not an anticoagulant.
  metformin|Glucophage|biguanide|managing type 2 diabetes|Confirm immediate versus extended release.
  glipizide|Glucotrol|sulfonylurea|managing type 2 diabetes|Hypoglycemia is an important risk.
  empagliflozin|Jardiance|SGLT2 inhibitor|managing type 2 diabetes|Genital infections are a recognized risk; it also has other indications.
  insulin lispro|Humalog|rapid-acting insulin|managing mealtime blood glucose|Verify the product, device, and concentration.
  insulin glargine|Lantus|long-acting basal insulin|providing basal insulin coverage|Not all insulin glargine products have the same concentration.
  semaglutide|Ozempic|GLP-1 receptor agonist|managing type 2 diabetes|Verify the exact product; semaglutide brand names can identify different routes or uses.
  albuterol|Ventolin HFA|short-acting beta agonist|relieving bronchospasm|A rescue inhaler is not interchangeable with a maintenance corticosteroid.
  fluticasone propionate nasal|Flonase|intranasal corticosteroid|relieving nasal allergy symptoms|The nasal product is not a lung inhaler.
  montelukast|Singulair|leukotriene receptor antagonist|preventing or controlling asthma symptoms|This is not a rescue bronchodilator.
  budesonide/formoterol|Symbicort|inhaled corticosteroid plus long-acting beta agonist|maintaining asthma control|Confirm the combination ingredients and prescribed directions.
  omeprazole|Prilosec|proton-pump inhibitor|reducing stomach acid|Verify the formulation and follow product-specific administration directions.
  famotidine|Pepcid|histamine H2 receptor blocker|reducing stomach acid|It reduces acid by a different mechanism than a proton-pump inhibitor.
  ondansetron|Zofran|5-HT3 receptor antagonist|preventing or treating nausea and vomiting|Verify whether the order is for a standard or an orally disintegrating tablet.
  levothyroxine|Synthroid|thyroid hormone replacement|treating hypothyroidism|Calcium or iron can interfere with absorption.
  acetaminophen|Tylenol|non-NSAID analgesic and antipyretic|reducing pain and fever|Check combination medications for duplicate acetaminophen.
  ibuprofen|Advil|nonsteroidal anti-inflammatory drug|reducing pain and inflammation|Concurrent NSAIDs and GI bleeding risks warrant review.
  amoxicillin|Amoxil|penicillin antibiotic|treating a susceptible bacterial infection|Clarify reported reactions and notify the pharmacist if an allergy is recorded.
  amoxicillin/clavulanate|Augmentin|penicillin plus beta-lactamase inhibitor|treating a susceptible bacterial infection|The ratio of its two active ingredients can differ between products.
  cephalexin|Keflex|first-generation cephalosporin antibiotic|treating a susceptible bacterial infection|Refer unclear beta-lactam reaction history to the pharmacist.
  azithromycin|Zithromax|macrolide antibiotic|treating a susceptible bacterial infection|QT prolongation is a concern in susceptible patients.
  doxycycline|Vibramycin|tetracycline antibiotic|treating a susceptible bacterial infection|Certain mineral products can reduce its absorption.
  ciprofloxacin|Cipro|fluoroquinolone antibiotic|treating a susceptible bacterial infection|Tendon injury warnings and mineral interactions are important.
  sulfamethoxazole/trimethoprim|Bactrim|combination folate-antagonist antibiotic|treating a susceptible bacterial infection|Flag concurrent warfarin and clarify a recorded sulfonamide antibiotic allergy.
  nitrofurantoin monohydrate/macrocrystals|Macrobid|nitrofuran antibiotic|treating selected uncomplicated lower urinary infections|Check formulation; this product differs from macrocrystals-only formulations.
  fluconazole|Diflucan|azole antifungal|treating selected fungal infections|Check the profile for clinically significant drug interactions.
  valacyclovir|Valtrex|antiviral for herpesviruses|treating selected herpesvirus infections|It is an antiviral, not an antibiotic for bacteria.
  sertraline|Zoloft|selective serotonin reuptake inhibitor|treating depression|Combining with certain serotonergic drugs can be dangerous.
  venlafaxine ER|Effexor XR|serotonin-norepinephrine reuptake inhibitor|treating depression|Match the extended-release product and strength.
  bupropion|Wellbutrin|aminoketone antidepressant|treating depression|Match the release form; seizure risk is important.
  alprazolam|Xanax|benzodiazepine|treating anxiety or panic disorder|Combining with an opioid increases respiratory-depression risk.
  oxycodone extended-release|OxyContin|opioid agonist analgesic|treating severe persistent pain in selected patients|Extended-release and immediate-release products cannot be swapped without review.
  naloxone intranasal|Narcan|opioid antagonist|reversing opioid overdose|Distinguish intranasal rescue products from other presentations.
  gabapentin|Neurontin|anticonvulsant also used for neuropathic pain|treating postherpetic neuralgia|Other sedating drugs can increase safety concerns.
  lamotrigine|Lamictal|anticonvulsant also used as a mood stabilizer|treating selected seizure disorders|A new rash should be escalated for evaluation.
  cetirizine|Zyrtec|second-generation H1 antihistamine|relieving allergy symptoms|Drowsiness is still possible.
  sumatriptan|Imitrex|triptan|treating an acute migraine|Verify the route because multiple dosage forms exist.
  tamsulosin|Flomax|alpha-1 adrenergic blocker|managing symptoms of benign prostatic hyperplasia|Dizziness or orthostatic symptoms are safety considerations.
  finasteride 5 mg|Proscar|5-alpha-reductase inhibitor|managing benign prostatic hyperplasia|Confirm indication and strength; another branded strength is used for hair loss.
  alendronate|Fosamax|bisphosphonate|treating osteoporosis|Administration instructions must be checked because timing and posture matter.
  allopurinol|Zyloprim|xanthine oxidase inhibitor|lowering uric acid in gout|It is not an acute analgesic.
  colchicine|Colcrys|anti-inflammatory antigout agent|treating or preventing gout flares|Important drug interactions can increase toxicity.
  latanoprost ophthalmic|Xalatan|prostaglandin analogue|lowering intraocular pressure|Check the ophthalmic route and product-specific storage.
  timolol ophthalmic|Timoptic|ophthalmic beta blocker|lowering intraocular pressure|Ophthalmic products are not interchangeable with oral dosage forms.
  epinephrine auto-injector|EpiPen|adrenergic agonist|treating anaphylaxis|Choose the prescribed device and strength and escalate administration questions.
  polyethylene glycol 3350|MiraLAX|osmotic laxative|relieving occasional constipation|Use the dosage form and measurement instructions on the product.
  loperamide|Imodium A-D|antidiarrheal|relieving diarrhea|A request involving excessive doses requires pharmacist review.
  prednisone|Deltasone|systemic corticosteroid|treating selected inflammatory conditions|Verify taper instructions when prescribed.
  `);
  function medicationQuestions() {
    const distinctUses = [
      "reversing opioid overdose", "lowering intraocular pressure",
      "treating hypothyroidism", "treating osteoporosis",
      "relieving occasional constipation", "relieving acute bronchospasm",
      "treating an acute migraine", "reducing platelet aggregation",
      "treating selected fungal infections", "lowering uric acid in gout",
      "treating anaphylaxis", "treating selected herpesvirus infections"
    ];
    return labels.flatMap(([generic,brand,cls,use,warning], i) => {
      const page = use.includes("blood") || use.includes("angina") || i < 13 ? 2 : i < 29 ? 3 : i < 46 ? 4 : 5;
      const why = `${brand} is a brand example for ${generic}, a ${cls} used for ${use}. ${warning}`;
      const excludedUse = new Set([
        use,
        ...(i >= 19 && i <= 22 ? ["relieving acute bronchospasm"] : []),
        ...(i === 47 || i === 56 || i === 59 ? ["treating anaphylaxis","relieving acute bronchospasm"] : []),
        ...(i === 27 || i === 28 ? ["treating an acute migraine"] : [])
      ]);
      return [
        make(med,page,`Which generic name matches ${brand}?`,generic,pick(labels,0,i+7,[generic]),why),
        make(med,page,`Which listed brand matches a prescription for ${generic}?`,brand,pick(labels,1,i+11,[brand]),why),
        make(med,page,`Which class best describes ${generic} (${brand})?`,cls,pick(labels,2,i+19,[cls]),why),
        make(med,page,`Which listed use is associated with ${brand} (${generic})?`,use,
          distinctUses.map((_,j) => distinctUses[(i+3+j)%distinctUses.length]).filter(v => !excludedUse.has(v)),why)
      ];
    });
  }
  // A cluster shares one discrimination task. Each row has a term, identifying
  // definition, and two distinct scenarios; distractors are terms in the cluster.
  function cluster(topic,page,title,body) {
    const rows = lines(body);
    if (rows.length < 4 || rows.some(row => row.length !== 4)) throw Error(`Malformed concept cluster: ${title}`);
    return rows.flatMap(([key,definition,scenario,contrast],i) => {
      const why = `${key}: ${definition}`;
      return [
        make(topic,page,`${title}: ${scenario}`,key,pick(rows,0,i+1,[key]),why),
        make(topic,page,`${title}: ${contrast}`,key,pick(rows,0,i+2,[key]),why),
        make(topic,page,`${title}: Which description best matches ${key}?`,definition,pick(rows,1,i+2,[definition]),why)
      ];
    });
  }
  const federal = [
    ...cluster(fed,6,"Controlled-substance schedules",`
    Schedule I|Heroin and LSD are examples; this schedule has no currently accepted medical use under federal scheduling criteria.|What federal schedule includes heroin?|In which schedule does the DEA list LSD?
    Schedule II|Examples include oxycodone, morphine, and methylphenidate. Prescriptions cannot be refilled.|Which schedule includes methylphenidate and does not permit refills?|What schedule is oxycodone under federal law?
    Schedule III|Examples include ketamine and buprenorphine. Federal limits generally allow at most five authorized refills within six months.|What is ketamine’s federal schedule?|Which schedule includes buprenorphine alone?
    Schedule IV|Examples include diazepam, alprazolam, and zolpidem. Federal limits generally allow at most five authorized refills within six months.|What is zolpidem’s federal schedule?|Which schedule includes alprazolam and diazepam?
    Schedule V|Pregabalin is an example. Do not automatically apply the federal III/IV refill cap to this schedule.|What schedule is pregabalin under federal law?|Which schedule can contain qualifying low-codeine preparations such as certain cough products?
    `),
    ...cluster(fed,6,"Federal prescription timelines",`
    No refills|Federal law prohibits refilling a Schedule II prescription. An eligible initial electronic transfer is a different action.|A patient asks for an additional refill on an already fully dispensed Schedule II prescription. What is the federal rule?|What refill limit applies to a fully dispensed methylphenidate prescription?
    Five refills within six months|The federal Schedule III/IV rule limits authorized refills to five and prohibits filling or refilling more than six months after issue.|What federal limits apply to authorized refills of diazepam?|Under federal law, what are the refill limits for a ketamine prescription?
    72 hours after the first partial fill|When the pharmacy cannot supply the full Schedule II prescription, the federal out-of-stock remainder window is generally 72 hours after the first partial filling.|The pharmacy can supply only part of an oxycodone prescription because it lacks stock. What is the general federal window for dispensing the rest without a new prescription?|A temporary C-II shortage causes an inability-to-supply partial fill. From when and for how long is the remainder window generally measured?
    30 days after the prescription was written|A qualifying patient- or prescriber-requested Schedule II partial fill generally has this federal remainder deadline, apart from the emergency oral exception.|What federal deadline generally applies to the remainder of a qualifying written Schedule II prescription partially filled at a patient’s request?|A prescriber asks for a qualifying partial fill of a nonemergency written C-II order. What is the general outside deadline for the remainder?
    Seven days after emergency oral authorization|A qualifying emergency oral Schedule II order requires timely follow-up from the prescriber within this period.|How long does the prescriber generally have to supply the required follow-up after an emergency oral C-II authorization?|A pharmacist dispenses under the federal emergency oral Schedule II exception. When is the required prescriber follow-up due?
    `),
    ...cluster(fed,7,"DEA forms and records",`
    DEA Form 222|Paper order form for Schedule I or II controlled stock transactions between appropriate registrants.|Which paper authorization accompanies a standard Schedule II wholesale stock order?|A pharmacy orders methylphenidate stock without CSOS. Which DEA order form applies?
    CSOS|DEA’s electronic Controlled Substance Ordering System performs the electronic ordering function otherwise served by Form 222.|Which electronic system is an alternative to the paper Schedule II order form?|What system is used for electronically authorized Schedule II wholesale orders?
    DEA Form 106|Reports theft or significant loss of controlled substances. Written DEA field-office notification is due within one business day of discovery; the electronic form is due within 45 days.|Which DEA form documents a significant controlled-stock loss?|Which electronic DEA form is due within 45 days after discovering controlled-substance theft?
    DEA Form 41|Documents destruction of controlled substances where the regulation requires it.|Which DEA form relates to qualifying registrant destruction rather than a loss report?|A registrant must document a controlled-substance destruction event. Which form is used when required?
    Invoices or equivalent receiving records|Used to document ordinary Schedule III through V receipts under controlled-substance recordkeeping requirements.|What records document a routine wholesale receipt of Schedule IV stock rather than using a Schedule II order form?|What record would show the receipt of a routine shipment of pregabalin stock?
    `),
    ...cluster(fed,7,"Storage, recordkeeping, and waste",`
    Initial and biennial inventory|An inventory is required when beginning covered activity and at least every two years thereafter.|Which inventory schedule generally applies to controlled stock at a new DEA registrant location?|What is the normal federal inventory frequency after the initial controlled-stock inventory?
    Exact Schedule II count|An exact count or measure is required for Schedule II inventory.|Which count method applies to Schedule II stock even when the opened bottle contains fewer than 1,000 tablets?|What approach should be used when inventorying an opened bottle of morphine tablets?
    Controlled record retention|Federal controlled-substance records generally must be kept for at least two years; state rules may require longer.|Which requirement determines how long ordinary controlled-substance records are retained?|What rule requires an ordinary DEA inventory record remain available for a federal minimum of two years?
    Authorized household take-back|This pathway accepts eligible household returns through an authorized collector; returned products do not become pharmacy stock.|Which disposal pathway is designed for unused medication already in a household’s possession?|A patient wants to discard leftover medication, not return it for resale. Which designated program applies if the product is eligible?
    Hazardous pharmaceutical waste segregation|Waste classification, designated containers, and applicable law govern this stream; hazardous pharmaceuticals must not be sewered by covered healthcare facilities.|An EPA-classified hazardous pharmaceutical must be removed from use. Which workflow prevents it from going down a drain?|What waste workflow applies when policy identifies a discarded drug as hazardous pharmaceutical waste?
    NIOSH hazardous-drug guidance|This guidance focuses on occupational exposure to hazardous drugs; it is not itself the EPA waste classification.|Which federal resource addresses worker protection from hazardous drug exposure?|Which guidance would help the pharmacy assess worker exposure risk when handling a hazardous medication?
    `),
    ...cluster(fed,8,"Restricted products and recalls",`
    Class I recall|There is a reasonable probability that use or exposure will cause serious adverse health consequences or death.|Which recall classification signals a reasonable probability of serious harm or death?|A recalled defect has a reasonable probability of causing a fatal outcome. Which FDA recall class fits?
    Class II recall|Temporary or medically reversible harm is possible, or serious harm is remote.|Which classification describes medically reversible adverse consequences or a remote probability of serious harm?|A product defect may cause temporary, medically reversible effects. What class fits this risk description?
    Class III recall|Adverse health consequences are not likely.|Which classification applies when the violative product is unlikely to cause adverse health consequences?|Which recall risk classification is the lowest of the three?
    REMS|A product-specific risk-management program may require verified enrollment, certification, monitoring, or dispensing authorization.|Which program may require drug-specific authorization before dispensing?|An FDA-required program for a particular product requires pharmacy certification and a documented safety step. What program is this?
    CMEA retail controls|Federal pseudoephedrine base limits generally include 3.6 g per purchaser per day and 9 g in 30 days at retail.|Which federal retail program applies to regulated pseudoephedrine sales?|Which law underlies pharmacy retail ID, log, and purchase-limit requirements for regulated pseudoephedrine?
    `),
    ...cluster(fed,8,"DSCSA tracking concepts",`
    Authorized trading partner|The pharmacy obtains covered prescription stock through appropriately authorized trading partners.|Which requirement relates to a supplier’s eligibility to participate in the regulated supply chain?|Before using a new seller of covered product, what status must be verified?
    Transaction tracing documentation|Required product tracing records are generally retained for six years.|What records document how covered stock moved through the supply chain?|Under DSCSA, which records supplied with covered stock are generally retained for six years?
    Suspect product|Potentially illegitimate product must be quarantined and investigated rather than dispensed.|How is a product classified while counterfeit concerns are being investigated and no determination has been made?|Which product status calls for quarantine and investigation when the pharmacy notices suspicious package details?
    Illegitimate product|After a determination that a product is illegitimate, FDA and appropriate immediate trading partners are notified within 24 hours.|What product status triggers the 24-hour DSCSA notification requirement after a determination?|The investigation confirms that the package is counterfeit. What product status applies?
    Package-level product identifier|Identifies covered packages using product code, serial number, lot number, and expiration date.|What DSCSA element includes a serial number, lot, and expiry in addition to the product code?|Which identification element distinguishes a particular regulated package rather than just the drug and package size?
    `)
  ];
  const safety = [
    ...cluster(safe,9,"High-alert and look-alike products",`
    High-alert medication|An error with this medication can cause especially serious harm; examples include insulin and anticoagulants.|How should a drug be classified when the consequence of an error could be particularly severe?|Which classification reflects the potential harm of confusing two insulin concentrations?
    Look-alike or sound-alike risk|Similar names or packaging can increase the chance that staff choose the wrong product.|What type of risk is present when two drug names are easily confused over the phone?|What type of risk is created by near-identical cartons for two different drugs?
    Tall Man lettering|Selective capitalization emphasizes differences between similar drug names.|What labeling method makes the different parts of look-alike names easier to see?|What technique is used in vinCRIStine versus vinBLASTine?
    Physical shelf separation|Keep easily confused drugs or strengths in separate, clearly differentiated locations to lower selection risk.|What physical change helps when two look-alike stock bottles sit side by side?|How can the inventory layout reduce repeated selection of the wrong strength?
    Barcode verification|Scan the actual product to compare the identifier against the selected order. A scan does not validate the original prescription.|Which safeguard checks the identifier on the package pulled for filling?|What should be used to check the selected package electronically instead of scanning a label from another bottle?
    `),
    ...cluster(safe,9,"Prescription and dispensing error types",`
    Wrong patient|The prescription or product is associated with the wrong person; compare two identifiers before proceeding.|The right product was linked to the profile of a different person with the same name. What error occurred?|A prescription intended for a parent is entered under the adult child’s record. What category fits?
    Wrong drug|The selected active medication is different from the one ordered.|Hydralazine is selected in place of hydroxyzine. What category fits?|The selection has the ordered strength in mg but a completely different active ingredient. What error is it?
    Wrong dose or strength|The amount ordered per dose or the strength selected is incorrect.|A 5 mg tablet is selected for a verified 0.5 mg requirement. What risk does this create?|The order is correctly linked to the right person, but a 10 mg strength is entered as 100 mg. What error is this?
    Wrong dosage form or route|The preparation or administration route does not match the order.|An otic product is selected for an ophthalmic order. What kind of mismatch is present?|An immediate-release tablet is selected for an extended-release order for the same drug. Which category best fits the mismatch?
    Wrong quantity|The total number of units or amount supplied does not match the prescription.|The directions and product are correct, but the bottle contains 15 tablets instead of the ordered 50. What error occurred?|A 60 mL total volume is entered as 160 mL while the dose and frequency are correct. Which category applies?
    Wrong frequency|A label or entered order gives the wrong number or timing of doses.|The label says four times daily but the prescription says once daily. What error occurred?|An order specifies every 12 hours but the label reads every 6 hours. Which error applies?
    `),
    ...cluster(safe,9,"Safer dose communication",`
    0.25 mg|Use a leading zero for a decimal fraction below one and omit needless trailing zeros.|What is the safest notation for a quarter of one milligram?|Which notation should replace .25 mg on a prepared label?
    5 mg|Use a whole number without a trailing decimal zero.|Which option most safely restates 5.0 mg?|How should five milligrams be written to reduce tenfold misreading?
    4 units|Spell out units rather than writing U.|What should replace 4U in patient-facing directions?|What wording avoids interpreting the U in four units as a zero?
    Every other day|Spell out the interval rather than using QOD.|What should replace QOD when the verified directions are on alternating days?|What wording avoids confusion between QOD and daily dosing?
    10 mL|Use mL rather than cc, with a space separating the number and unit.|How should a verified 10 cc oral volume be written on a safer label?|Which choice expresses ten milliliters without using cc?
    `),
    ...cluster(safe,10,"Pharmacist intervention",`
    Suspected interaction|Potential drug-drug interactions require pharmacist review rather than a routine alert override.|Which issue is flagged when a patient using warfarin brings in a prescription for an interacting antibiotic?|A new prescription appears incompatible with a medication already on the patient’s profile. What concern is being flagged?
    Therapeutic duplication|Two active orders may represent the same drug or overlapping therapy; determine whether an order was intended as a replacement.|What issue is suggested by active Tylenol and acetaminophen entries with overlapping directions?|A profile has both brand and generic entries with the same active ingredient and unclear intended use. What concern applies?
    Allergy clarification|Record the reported reaction and send unclear or concerning histories to the pharmacist for clinical assessment.|A patient cannot tell whether a prior rash came from the prescribed antibiotic. What is the issue to escalate?|An order is for a drug listed in the patient’s allergy record. Which review is needed before dispensing?
    Adherence barrier|Difficulty obtaining or taking medication calls for fact gathering and pharmacist involvement, not assumptions based on refill history.|A patient says they missed doses because they cannot afford the refill. What issue is being identified?|A patient says a complicated schedule caused missed doses. Which concern should be communicated?
    Pharmacist OTC recommendation|A patient-specific selection requires clinical review. The technician may gather facts and refer.|A patient using several prescriptions asks which cold remedy is safe for them. Which service requires the pharmacist?|A patient asks for a personalized nonprescription pain product recommendation. Which decision must be referred?
    Therapeutic substitution review|Selecting a different active drug for a clinical purpose requires pharmacist involvement and applicable authorization.|The ordered drug is unavailable and the patient suggests a different active ingredient. What review is necessary?|Which assessment is needed before replacing a prescribed active drug with another medication in the same class?
    `),
    ...cluster(safe,10,"Safety reporting and improvement",`
    Near miss|An error was intercepted before it reached the patient; document it according to site policy.|A wrong-strength bottle is caught during final verification and never leaves the pharmacy. Which event occurred?|A duplicate order is corrected before the patient receives it. What kind of safety event is this?
    Medication error that reached the patient|An incorrect item or instruction was delivered. Notify the pharmacist promptly even if harm is not apparent.|A patient receives the wrong label but reports no symptoms. Which category fits?|The wrong patient already picked up the item. Which category fits regardless of whether they took it?
    Adverse drug event|Patient harm associated with medication use can occur with or without a preventable error.|A correctly used anticoagulant is associated with a serious bleed. What type of event could this be?|Which term describes actual harm involving medication use and does not require proof of a dispensing mistake?
    MedWatch|FDA safety reporting program for appropriate drug or device problems, including serious adverse events and quality concerns.|Which federal reporting program generally covers a suspected serious reaction to a nonvaccine medication?|Which FDA channel can accept a report of an appropriate prescription product quality problem?
    VAERS|The CDC and FDA system receives reports of adverse events following vaccination; a report does not establish causation.|Which national reporting system is specific to events after immunization?|Where would a qualifying event after vaccine administration be reported federally?
    Root-cause analysis|RCA asks why the system allowed an event and looks for contributing process factors rather than stopping at individual blame.|Which method asks why the shelf and verification processes allowed a near miss?|Which structured review looks past the immediate error to discover contributing system failures?
    Continuous quality improvement|CQI tests changes and tracks measures over time to learn whether a process improves.|Which process uses repeated measurement to check if a shelf change reduces selection errors?|Which process tests a barcode workflow change and monitors the subsequent error rate?
    `),
    ...cluster(safe,10,"Standard infection prevention",`
    Hand hygiene|Clean hands at the required moments, including after glove removal; gloves do not replace hand hygiene.|What action is still needed immediately after removing protective gloves?|Which basic control applies before an appropriate aseptic task and after removing gloves?
    Task-appropriate PPE|Select protective equipment for the procedure and expected exposure; no single type suits every task.|What should staff select based on the exposure risk of a task?|Which control includes appropriate gloves or other protections when splash or contact is possible?
    Disinfectant contact time|Follow product directions for the required surface wet time rather than wiping it dry immediately.|Which parameter determines how long a surface should remain wet with a disinfectant?|What is being ignored when a disinfectant is removed immediately, despite the product requiring several minutes?
    Sharps disposal|Used needles and similar sharps belong in an approved sharps container.|Where should a used immunization needle go according to safe work practices?|Which disposal workflow prevents used needles from entering ordinary waste?
    Cleaning shared equipment|Clean shared counting trays, equipment, and work surfaces according to policy to reduce cross-contamination.|Which practice helps keep residue from a prior fill from contaminating the next count?|What routine care is needed for trays used across multiple products?
    `),
    ...cluster(safe,9,"Matching verification to the risk",`
    Verify two patient identifiers|Use identifiers such as full name and date of birth. Shelf location, appearance, and first name alone are insufficient.|What check distinguishes two people with the same name at pickup?|How should the technician verify the correct profile before opening an order for a patient with a common name?
    Compare the original order with the entered directions|This identifies discrepancies in frequency, duration, or route introduced during transcription.|What check best catches BID accidentally entered as once daily?|How can staff find that seven days were entered when the signed order says ten?
    Verify the actual package and strength|Compare the stocked drug, strength, and form with the order and use the site’s scan procedure.|What direct verification detects that the product in hand has the wrong strength?|After picking stock, which check verifies the bottle rather than relying on shelf location?
    Escalate an ambiguous order|Hold the process for clarification instead of guessing or independently editing unclear directions.|The order’s frequency is unreadable and affects the directions. What is the safe next step?|Two routes are listed and the intended one is unclear. What should the technician do?
    `),
    ...cluster(safe,10,"Immediate action versus routine follow-up",`
    Activate emergency response|Immediate alarming symptoms take priority over forms and routine dispensing; get emergency help and notify the pharmacist.|Which action takes priority when someone develops signs of anaphylaxis in the pharmacy?|A patient reports new trouble breathing at the counter. What takes priority over documentation?
    Document the observed reaction|Record the patient’s actual reported symptoms and timing rather than assigning causality or deleting an allergy without review.|What should the technician do with facts about nausea reported after a new medicine?|How should a possible adverse reaction be recorded without making a diagnosis?
    Preserve a suspected altered order and notify the pharmacist|Do not dispense or accuse the patient. Follow the site’s process for review and verification.|What is the appropriate immediate action if an order appears to have been altered?|An unexpected alteration suggests possible misuse. How should the technician handle the order?
    Gather medication history|Collect the patient’s prescriptions, OTC products, and supplements for review rather than assuming the profile is complete.|How can a technician help the pharmacist check an interaction when the patient uses drugs from several pharmacies?|What preliminary task identifies otherwise missing supplements before a clinical review?
    `),
    ...cluster(safe,5,"Product protection and stability checks",`
    Segregate temperature-exposed vaccine|Label affected vaccines not for use, isolate at the correct storage temperature, document, and get authorized guidance.|What should happen after a confirmed vaccine refrigerator temperature excursion?|How should staff handle exposed vaccine before making a disposal or use determination?
    Opened-product in-use limit|A product may have a shorter discard interval after opening than its manufacturer’s unopened expiration.|What timing rule may shorten the life of an opened insulin pen?|Which limit should be checked after beginning use rather than relying only on the unopened expiration?
    Manufacturer expiration|The printed dating applies when the product is stored under labeled conditions; it is not a guarantee after a storage excursion.|What does the expiry printed on an unopened carton generally represent?|Which date is assigned by the manufacturer for the unopened product when stored as labeled?
    Reconstituted-product storage instructions|Storage conditions and dating after adding diluent depend on the exact product label.|Which instructions determine whether a freshly mixed suspension needs refrigeration?|What source determines the discard interval after an oral powder is mixed?
    `),
    ...cluster(safe,10,"Quality improvement measures",`
    Baseline measure|Count or measure performance before changing a process so later results can be compared.|What should a team collect to quantify selection errors before moving look-alike products?|Which data establish the starting error rate before staff change a workflow?
    Process measure|Tracks whether the change is being carried out, such as the percentage of fills scanned at the intended stage.|Which measure tracks whether staff actually use the new barcode step?|What type of measure is the percentage of fills that receive the required second check?
    Outcome measure|Tracks the result the improvement aims to change, such as errors reaching patients per 1,000 fills.|Which kind of measure is the rate of wrong-strength errors that reach patients?|What kind of measure shows whether the safety problem itself changed after the intervention?
    Balancing measure|Looks for unintended effects of an improvement, such as a change in wait times after a verification step is added.|Which measure would detect longer wait times after adding a safety check?|What type of measure monitors a possible tradeoff created by an otherwise helpful change?
    `)
  ];
  const entries = [
    ...cluster(order,11,"Common prescription directions",`
    Twice daily|BID means two times each day; it does not necessarily mean the same thing as an explicitly stated every-12-hours interval.|What does BID mean on an incoming prescription?|How should the frequency in one capsule PO BID be written out?
    Three times daily|TID means three times each day.|An incoming order ends in TID. What is the frequency?|What schedule is indicated by 2 mL PO TID?
    Four times daily|QID means four times each day.|How should QID be written in plain English?|What frequency is written in the Sig 1 tablet PO QID?
    Every six hours|q6h expresses a six-hour interval rather than just four administrations per calendar day.|How should q6h be interpreted?|Which directions explicitly call for a six-hour interval?
    As needed|PRN stands for as needed; verify any missing use indication or limit when required.|What does PRN indicate?|What wording corresponds to PRN on an incoming prescription?
    Immediately|STAT signals that the action is to occur immediately.|What is the meaning of STAT in a medication order?|What timing does a facility order marked STAT specify?
    Before meals|AC means before meals.|What timing is conveyed by AC?|How should the meal-related part of a verified AC direction be written out?
    After meals|PC means after meals.|What timing is conveyed by PC?|How should the meal-related part of a verified PC direction be written out?
    `),
    ...cluster(order,11,"Routes and prescription language",`
    By mouth|PO means by mouth.|What route does PO indicate?|How would you write the route in 1 tablet PO?
    Under the tongue|SL means sublingual.|What route instruction does SL imply?|Where is a dose intended for sublingual use placed?
    In both eyes|OU denotes both eyes; spell it out to avoid confusion with ear abbreviations.|What does OU mean on an ophthalmic order?|What verified instruction should replace OU when writing the eye-drop label?
    In both ears|AU denotes both ears; spell it out to avoid confusion with eye abbreviations.|What does AU mean on an otic order?|What anatomical instruction should replace AU when writing ear-drop directions?
    Nothing by mouth|NPO indicates nothing by mouth.|What does NPO mean?|What does the NPO restriction indicate about oral intake?
    `),
    ...cluster(order,14,"Match the device to the task",`
    Oral syringe|A properly sized mL oral syringe measures a liquid intended for oral use, not injection.|Which device is best for accurately measuring a 2.5 mL oral liquid dose?|What should accompany a pediatric oral liquid requiring a small measured mL volume?
    Insulin pen needle|Select a needle compatible with the exact prescribed insulin pen and product instructions.|Which accessory should be matched to an insulin pen rather than a vial?|What supply does a patient need to use a compatible insulin injection pen?
    Blood glucose test strips|Match the test strip to the specific compatible glucose meter.|Which supply must be matched to the exact blood glucose meter model?|What disposable supplies are used with a compatible blood glucose meter to check blood glucose?
    Inhaler spacer|Use a compatible spacer with an appropriate metered-dose inhaler; do not assume it fits a dry-powder device.|Which accessory can be paired with a compatible metered-dose inhaler to help with delivery?|Which inhaler accessory is not a routine attachment for a dry-powder device?
    Nebulizer and medication cup|Use compatible equipment intended to aerosolize the labeled nebulizer solution.|Which supplies are used with a medication prescribed as a nebulizer solution?|What device system typically uses a cup, a mask or mouthpiece, and compatible tubing?
    Route-specific injectable syringe and needle|Match the supplies to the drug, device, and intended injectable route. Verify compatibility instead of substituting an oral device.|What equipment is appropriate for a medicine verified to require a conventional intramuscular injection?|Which supplies must be chosen with the intended injection route in mind?
    `),
    ...cluster(order,14,"Identify product and transaction numbers",`
    National Drug Code|The three segments identify labeler, product, and package. The NDC does not identify one specific production batch.|What identifier helps distinguish package sizes or strengths of a marketed drug product?|What identifier consists of labeler, product, and package segments?
    Lot number|Identifies a production batch; multiple packages may have the same lot.|What number identifies affected production batches in a lot-specific recall?|Which number can be shared by several packages made in the same production batch?
    Serial number|Distinguishes an individual package in context; it is not simply a batch code.|What data element distinguishes one specific serialized package?|Which data element is individual to the package rather than shared by all packages of a lot?
    Expiration date|Identifies the labeled shelf-life endpoint if the product is stored as directed.|Which identifier shows when the product’s labeled shelf life ends?|Which labeled information should be checked to see whether unopened stock is still within its manufacturer dating?
    Prescription number|The pharmacy’s transaction identifier for a specific prescription is not the manufacturer’s product code.|Which identifier helps the pharmacy look up a particular prescription transaction?|What record number tracks a specific filled prescription rather than its manufacturer and package?
    `),
    ...cluster(order,14,"Inventory disposition choices",`
    Return to stock after checking eligibility|An eligible never-picked-up fill may be returned under site policy when identity, dating, integrity, and traceability are intact.|What may be appropriate for an intact, traceable fill that was never picked up, subject to policy?|Which action applies when a never-picked-up product meets the pharmacy’s internal restocking criteria?
    Quarantine suspect or recalled stock|Stop dispensing and physically segregate the affected inventory pending authorized disposition.|What should happen to stock that matches a lot-specific recall?|Which action keeps a product suspected of counterfeiting off the dispensing shelf while it is investigated?
    Process an eligible credit return|Follow the supplier or authorized returns partner’s process and document the credit or eligible return.|What pathway may recover value for eligible unneeded, properly identified vendor stock?|Which route is considered when the supplier confirms a noncontrolled item can be returned for credit?
    Remove expired stock as nondispensable|Expired stock is not eligible for dispensing; segregate it and use an approved disposition pathway.|What should happen to an expired sealed manufacturer bottle found in active stock?|Which workflow applies to products beyond their labeled shelf life?
    Household disposal rather than routine restock|Product already in a patient’s possession is not routine return-to-stock inventory. Use an appropriate disposal channel if eligible.|A patient brings unused tablets from home and asks the pharmacy to reuse them. What general guidance applies?|Which workflow applies to eligible household medication rather than treating it like an uncollected fill?
    `),
    ...cluster(order,11,"Terms used on stock and orders",`
    Strength|The drug amount per unit or volume, such as 250 mg per tablet or 250 mg per 5 mL.|What term describes 250 mg per 5 mL on a stock bottle?|Which field reports the amount of active ingredient in one tablet as supplied?
    Dose|The amount the patient receives at one administration unless explicitly expressed per day.|What term describes 7.5 mL to be taken each time?|Which field describes the quantity given at one administration rather than the drug amount per tablet?
    Frequency|The timing or number of administrations, such as twice a day.|What concept is represented by twice daily?|Which component of the Sig describes how often the medication is taken?
    Duration|The total time the order directs therapy to continue.|What concept is represented by for seven days?|Which order field tells whether the prescribed course lasts five days or ten days?
    Dispensed quantity|The total tablets, capsules, mL, or other units supplied to the patient.|Which term describes the total 56 tablets placed in the patient bottle?|Which data field states the actual total volume supplied rather than the amount per dose?
    `),
    ...cluster(order,5,"Dosage forms and release patterns",`
    Enteric-coated|The coating is designed to resist breakdown in the stomach. Verify instructions before crushing or splitting.|What form is marked EC and should not be assumed crushable?|Which coating is intended to delay release until after the product leaves the stomach?
    Extended-release|The formulation is designed to release drug over a longer period; check the exact product and instructions.|What general formulation pattern might the abbreviation ER indicate?|Which form should not be substituted automatically for an immediate-release version?
    Orally disintegrating tablet|This dosage form disperses or dissolves in the mouth; it is not automatically a sublingual preparation.|Which dosage form does ODT identify?|What preparation is designed to disintegrate in the mouth but is not necessarily given under the tongue?
    Transdermal patch|Designed to deliver drug through the skin; product-specific instructions govern use and handling.|Which dosage form is affixed to the skin for systemic delivery?|Which system should be checked for placement, replacement timing, and heat precautions?
    Oral suspension|Solid particles are dispersed in liquid; follow product instructions regarding shaking, dosing, and storage.|Which oral liquid form contains dispersed drug particles rather than fully dissolved drug?|Which form may require shaking to redisperse particles before a dose is measured?
    `),
    ...cluster(order,14,"Patient-ready supplies and package checks",`
    Correct reconstitution diluent|Use the exact diluent and volume indicated in approved product instructions.|What must be checked before adding liquid to a powder formulation?|Which preparation supply cannot be substituted without checking the manufacturer’s instructions?
    Package integrity check|Verify seal, container condition, storage and dating before permitting dispensing or return to stock.|What should be verified when a product has a visibly damaged container?|Which check helps determine whether returned-to-stock inventory is still suitable for dispensing?
    Labeled package quantity|Use the labeled amount per package when calculating how many complete packages are needed.|Which product detail tells you how many units are available in one sealed carton?|What quantity information is needed before deciding how many intact packs to supply?
    Verified in-use discard date|Check the shorter product-specific date when applicable after opening, puncture, or reconstitution.|Which date may be earlier than the expiration after first use?|What date should be checked after a product is reconstituted and given a shorter permitted use period?
    `),
    ...cluster(order,11,"Additional notation recognition",`
    At bedtime|HS can mean at bedtime in context; verify unclear use and write it out.|What does HS usually mean as a verified dosing time?|How should a verified bedtime instruction be written instead of HS?
    Drop or drops|gtt refers to a drop or drops. Route and location remain separate instructions.|On an eye-drop prescription, what unit does gtt represent?|What does gtt mean in a verified liquid instruction?
    Two|The Roman numeral ii means two.|What quantity does ii represent in an incoming direction?|How many capsules are meant by ii caps?
    Five|The Roman numeral v means five.|What quantity does the standalone Roman numeral v represent?|How many units does the Roman numeral V represent?
    Ten|The Roman numeral x means ten; in a Sig, x can also mean for depending on its placement.|What does X mean when explicitly used as a standalone Roman numeral?|What number is represented by the Roman numeral x, outside a duration phrase?
    `),
    ...cluster(order,14,"Product code segments and dispensing fields",`
    Labeler segment|The first NDC segment identifies the labeler.|Which NDC segment identifies the labeler?|When adding a zero for a shortened first NDC segment, what segment is being padded?
    Product segment|The middle segment identifies the particular product, such as strength and dosage form, for a labeler.|Which NDC segment identifies the particular drug product and strength for a labeler?|Which segment must be padded when a ten-digit NDC has the 5–3–2 pattern?
    Package segment|The final NDC segment identifies package characteristics such as package size or type.|Which NDC segment differentiates package size or type for an existing product code?|Which segment is one digit long in the 5–4–1 format?
    Patient directions|The Sig specifies how the patient should use the medication.|Which dispensing field contains the patient-facing instructions rather than the stock code?|In which field would you find the written-out frequency and administration route?
    `)
  ];

  const number = value => Number(value.toFixed(6)).toLocaleString("en-US",{maximumFractionDigits:6});
  const valueList = (i, list) => list[i % list.length];
  function calc(topic,page,stem,result,unit,wrong,formula) {
    if (!Number.isFinite(result) || result <= 0) throw Error(stem);
    const withUnit = x => `${number(x)} ${unit}`;
    return make(topic,page,stem,withUnit(result),
      [...wrong, result * 2.5, result * 0.4, result + 1, result * 10]
        .filter(x => Number.isFinite(x) && x > 0).map(withUnit),
      `${formula} Answer: ${withUnit(result)}.`);
  }
  const templates = [
    i => { const x = (23 + 7*i) / 1000;
      return calc("Metric mass",11,`Convert ${number(x)} g to milligrams.`,x*1000,"mg",[x*100,x*10000,x],`${number(x)} g × 1,000 mg/g.`); },
    i => { const x = (21 + 12*i) / 1000;
      return calc("Metric dose",11,`A dose is written as ${number(x)} mg. How many micrograms is that?`,x*1000,"mcg",[x*100,x*10000,x],`${number(x)} mg × 1,000 mcg/mg.`); },
    i => { const x = (43 + 11*i)/100;
      return calc("Metric volume",11,`Convert ${number(x)} L of solution to milliliters.`,x*1000,"mL",[x*100,x*10000,x],`${number(x)} L × 1,000 mL/L.`); },
    i => { const x = 4+i;
      return calc("Household conversion",11,`A legacy record specifies ${x} teaspoons. Assuming 5 mL per teaspoon for this calculation, what is the equivalent volume?`,x*5,"mL",[x*15,x*3,x],`${x} teaspoons × 5 mL/teaspoon. Use a calibrated mL device in practice.`); },
    i => { const kg=11+3*i, lb=number(kg*2.2);
      return calc("Weight conversion",11,`A patient profile shows ${lb} lb. Using 2.2 lb/kg, what is the corresponding weight?`,kg,"kg",[kg*2,kg/2,kg*2.2],`${lb} lb ÷ 2.2 lb/kg.`); },
    i => { const c=1+i, f=number(c*9/5+32);
      return calc("Temperature conversion",11,`A monitor reads ${f}°F. Convert the reading to Celsius.`,c,"°C",[c+5,c+10,c+15],`(${f} − 32) × 5/9.`); },
    i => { const days=6+i, doses=valueList(i,[2,3,4]);
      return calc("Tablet quantity",12,`A prescription calls for two tablets per dose, ${doses} doses daily, for ${days} days. How many tablets are needed?`,2*doses*days,"tablets",[doses*days,2*days,2*doses+days],`2 tablets/dose × ${doses} doses/day × ${days} days.`); },
    i => { const n=3+i, end=2+i%4;
      return calc("Taper quantity",12,`A taper calls for four tablets daily for ${n} days, then one tablet daily for ${end} days. How many tablets are needed?`,4*n+end,"tablets",[4*n,4*(n+end),n+end],`(${n} × 4) + (${end} × 1) tablets.`); },
    i => { const mL=valueList(i,[5,7.5,10]), times=2+i%2, days=8+i, vol=number(mL*times*days);
      return calc("Liquid days’ supply",12,`A bottle contains ${vol} mL. The directions are ${number(mL)} mL per dose, ${times} doses per day. What is the days’ supply?`,days,"days",[days*times,days+times,days+5],`${vol} mL ÷ (${number(mL)} mL/dose × ${times} doses/day).`); },
    i => { const ml=valueList(i,[3,4,5,6,7,8,9,10,11,12,13,14,15,16]), drop=valueList(i,[16,20,24]), total=ml*drop;
      return calc("Eye-drop days’ supply",12,`An exercise specifies ${drop} drops/mL in a ${ml} mL bottle. The patient uses one drop in each eye morning and evening. What is the supply?`,total/4,"days",[total/2,total/8,ml],`(${ml} mL × ${drop} drops/mL) ÷ 4 drops/day.`); },
    i => { const days=19+2*i, daily=valueList(i,[2,4,6]), puffs=days*daily;
      return calc("Inhaler actuations",12,`A training problem gives ${puffs} usable actuations and directions totaling ${daily} puffs/day. How long does the inhaler last?`,days,"days",[puffs,days+10,days*2],`${puffs} usable actuations ÷ ${daily} puffs/day.`); },
    i => { const vials=2+i%3, per=40+10*(i%4), count=per*vials-(4+i);
      return calc("Whole packages",12,`A pharmacy needs ${count} mL. Supplies are sold only as unopened ${per} mL bottles. How many bottles must be supplied?`,Math.ceil(count/per),"bottles",[Math.floor(count/per),vials+1,vials+2],`Divide ${count} by ${per} and round up to a whole bottle.`); },
    i => { const tabs=7+i, hours=valueList(i,[48,72,96]);
      return calc("Patch days’ supply",12,`A patient receives ${tabs} patches to use one at a time, replacing each every ${hours} hours. How many days do the patches cover?`,tabs*hours/24,"days",[tabs,tabs*hours/12,tabs*(hours/24+1)],`${tabs} patches × (${hours} hours ÷ 24 hours/day).`); },
    i => { const dose=225+25*i, have=valueList(i,[125,200,250]);
      return calc("Liquid dose volume",13,`A dose of ${dose} mg is ordered. The bottle is labeled ${have} mg per 5 mL. How many mL are needed per dose?`,dose*5/have,"mL",[dose/have,dose*10/have,5],`${dose} mg × 5 mL ÷ ${have} mg.`); },
    i => { const kg=12+2*i, lb=number(kg*2.2), per=valueList(i,[18,24,30]), split=valueList(i,[2,3,4]), amount=kg*per/split;
      return calc("Weight-based daily dose",13,`A ${lb} lb patient has a hypothetical order for ${per} mg/kg/day in ${split} equal doses. Use 2.2 lb/kg. How many mg are in each dose?`,amount,"mg",[kg*per,per/split,amount*1.5],`Convert to ${kg} kg. Multiply by ${per} mg/kg/day and divide by ${split} doses/day.`); },
    i => { const kg=10+i, per=4+i%4;
      return calc("Weight-based single dose",13,`A hypothetical order is ${per} mg/kg per dose for a patient weighing ${kg} kg, given twice daily. How many mg are in one dose?`,kg*per,"mg",[kg*per/2,kg*per*2,kg+per],`${kg} kg × ${per} mg/kg per dose. The frequency does not change the per-dose amount.`); },
    i => { const w=(6+3*i)/10;
      return calc("Percent w/v",13,`What is the concentration in mg/mL of a ${number(w)}% w/v solution?`,w*10,"mg/mL",[w,w*100,w/10],`${number(w)} g per 100 mL × 1,000 mg/g ÷ 100 mL.`); },
    i => { const percent=(12+3*i)/10, mass=30+5*i;
      return calc("Percent w/w",13,`How many mg of active ingredient are in ${mass} g of a ${number(percent)}% w/w product?`,10*percent*mass,"mg",[percent*mass,100*percent*mass,1000*percent],`${mass} g × (${number(percent)} g drug ÷ 100 g product) × 1,000 mg/g.`); },
    i => { const denom=200+100*i;
      return calc("Ratio strength",13,`In a 1:${number(denom)} w/v solution, how many mg/mL are present? Round to two decimal places.`,Number((1000/denom).toFixed(2)),"mg/mL",[Number((100/denom).toFixed(2)),Number((10000/denom).toFixed(2)),denom/1000],`Convert 1 g to 1,000 mg, then divide by ${number(denom)} mL and round.`); },
    i => { const stock=24+4*i, target=stock/4, final=84+12*i;
      return calc("Dilution stock volume",13,`How much ${stock} mg/mL stock is needed to prepare ${final} mL of a ${target} mg/mL solution?`,final/4,"mL",[final/2,final*3/4,final],`Stock volume = (${target} × ${final}) ÷ ${stock}. The final volume is ${final} mL.`); },
    i => { const stock=30+6*i, target=stock/3, final=96+9*i;
      return calc("Diluent volume",13,`A dilution uses ${stock} mg/mL stock to make ${final} mL at ${target} mg/mL. What volume of drug-free diluent is required if volumes are additive?`,2*final/3,"mL",[final/3,final,final/2],`Stock = (${target} × ${final}) ÷ ${stock} = ${final/3} mL. Subtract stock volume from final volume.`); },
    i => { const hours=2+i%6, rate=55+9*i, total=hours*rate;
      return calc("Pump rate",13,`A math problem specifies ${number(total)} mL delivered evenly over ${hours} hours. What is the pump rate?`,rate,"mL/hour",[total,rate/2,rate*2],`${number(total)} mL ÷ ${hours} hours.`); },
    i => { const hours=2+i%3, rate=11+2*i, drop=valueList(i,[10,15,20]), total=rate*hours*60/drop;
      return calc("Gravity rate",13,`For a calculation exercise, ${number(total)} mL will run over ${hours} hours using a drop factor of ${drop} drops/mL. What is the rate?`,rate,"drops/min",[rate*2,rate*60,rate+10],`(${number(total)} mL × ${drop} drops/mL) ÷ (${hours} × 60 minutes).`); },
    i => { const pens=2+i%4, total=pens*3*100, usage=15+3*i;
      return calc("Insulin supply",12,`There are ${pens} U-100 pens of 3 mL each. At ${usage} units daily, how many full days do they cover? Ignore priming and discard limits for the exercise.`,Math.floor(total/usage),"days",[Math.floor(total/usage)+1,Math.floor(total/usage)*2,usage],`100 units/mL × 3 mL × ${pens} = ${number(total)} units. Divide by ${usage} and count whole days.`); }
  ];
  const calculations = Array.from({length:14},(_,i) => templates.map(template => template(i))).flat();
  const candidates = {[med]:medicationQuestions(),[fed]:federal,[safe]:safety,[order]:entries};
  const quota = {[med]:244,[fed]:98,[safe]:152,[order]:156};
  const normalize = s => s.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();
  function unique(rows) {
    const seen = new Set();
    return rows.filter(row => {
      const key = normalize(row[2]);
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });
  }
  function buildMixed(existingMixed) {
    return Object.keys(quota).flatMap(topic => {
      const previous = existingMixed.filter(q => q[0] === topic ||
        (topic === order && q[0] === "Pharmacy math"));
      const pool = unique([...previous, ...candidates[topic]]);
      if (pool.length < quota[topic]) throw Error(`${topic}: only ${pool.length} unique items`);
      return pool.slice(0,quota[topic]);
    });
  }
  function buildMath(existingMath) {
    const math = unique([...existingMath,...calculations]).slice(0,350);
    if (math.length !== 350) throw Error(`Only ${math.length} unique math items.`);
    return math;
  }
  function build(existingMixed, existingMath) {
    const mixed = buildMixed(existingMixed);
    const math = buildMath(existingMath);
    if (mixed.length !== 650 || math.length !== 350 || unique([...mixed,...math]).length !== 1000) {
      throw Error("The question banks must contain 1,000 distinct prompts.");
    }
    return {mixed,math};
  }
  globalThis.PTCE_BANK = Object.freeze({build,buildMixed,buildMath});
})();
