(() => {
  "use strict";
  const tips = new Map();
  function add(lesson, title, setup, labels) {
    const tip = Object.freeze({lesson:`calc-${lesson}`, title, setup});
    for (const label of labels) tips.set(label,tip);
  }
  add("units","Cancel like units","Put the starting unit on the bottom of the conversion factor. For g → mg, mg → mcg, or L → mL, multiply by 1,000. Reverse the factor to convert back.",["Metric conversion","Metric mass","Metric dose","Metric volume","Volume conversion"]);
  add("units","Use the stated conversion factor","Multiply teaspoons by the exercise’s mL per teaspoon. In practice, measure oral liquids with a calibrated mL device.",["Household conversion"]);
  add("units","Convert pounds to kilograms","Divide pounds by the stated lb/kg factor. At 2.2 lb/kg, the number of kg should be less than half the number of lb.",["Weight conversion"]);
  add("units","Subtract before multiplying","For °F → °C, subtract 32 first, then multiply by 5/9. Check a refrigerator answer against the expected scale; for example, 41 °F = 5 °C.",["Temperature conversion","Refrigerator temperature"]);
  add("dose","Set up desired over labeled","Multiply the ordered mg by the labeled mL per labeled mg. The mg cancel, leaving mL. If the ordered mg are higher than the labeled amount, expect more than the labeled volume.",["Liquid dose","Liquid dose volume","mixed-liquid"]);
  add("weight","Identify whether the order says per day or per dose","Convert lb to kg if needed. Multiply kg by mg/kg/day and divide by the number of doses only when asked for mg per dose. If already written mg/kg/dose, there’s no second division.",["Weight-based dose","Weight-based daily dose","Weight-based single dose","mixed-weight"]);
  add("supply","Build the daily quantity first","Multiply units per dose by doses per day, then multiply by the treatment days. Check that the final unit is tablets or mL, not tablets/day or mL/day.",["Tablet quantity"]);
  add("supply","Divide what you have by daily use","Calculate the daily amount first. Divide the amount dispensed by that daily amount in matching units. Multiply the answer by daily use to recover the total dispensed.",["Days’ supply","Liquid days’ supply","mixed-days"]);
  add("supply","Calculate each taper block on its own","For each dosing block, multiply tablets per day by days at that dose. Add the block totals only after each one is calculated.",["Tablet taper","Taper quantity"]);
  add("supply","Round up only for required intact packages","Divide the required quantity by the size of one package. Round up if unopened packages are required; check that one fewer package would fall short.",["Whole packages"]);
  add("devices","Convert the bottle to drops first","Multiply mL by the drops/mL given in the question. Count both eyes if directed, then multiply by daily administrations and divide total drops by drops/day.",["Eye-drop supply","Eye-drop days’ supply","mixed-eye"]);
  add("devices","Count usable actuations","Multiply puffs per administration by administrations per day. Divide usable actuations by puffs/day; do not substitute canister volume.",["Inhaler actuations","mixed-inhaler"]);
  add("devices","Use units for insulin, not just mL","For days’ supply, convert the total mL to units and divide by units/day. To find mL needed, calculate total required units first, then divide by units/mL. Follow the question’s rounding and use-limit assumptions.",["Insulin days’ supply","Insulin supply","Insulin quantity"]);
  add("devices","Turn the replacement interval into days","Divide hours per patch by 24, then multiply by the number of patches when directions call for one at a time.",["Patch days’ supply"]);
  add("strength","Read w/v as grams in 100 mL","Convert the grams to mg and divide by 100 mL. As a shortcut, 1% w/v = 10 mg/mL. If asked for a total amount in mg, multiply mg/mL by the given volume. Do not use this shortcut for w/w.",["Percent strength","Percent w/v"]);
  add("strength","Read w/w as grams in 100 g","Multiply the total product mass by the active ingredient fraction, then convert grams of ingredient to mg if asked.",["Percent w/w"]);
  add("strength","Read 1:x w/v as 1 g in x mL","Divide 1,000 mg by x mL. If the denominator increases and the numerator stays the same, the strength must decrease.",["Ratio strength"]);
  add("dilution","Conserve the amount of drug","Solve C₁V₁ = C₂V₂ for stock volume. If asked for the amount of diluent and volumes are additive, subtract the stock volume from the final volume.",["Dilution","Dilution stock volume","Diluent volume","mixed-dilution"]);
  add("flow","Use hours for a pump rate","Divide volume by hours for mL/hour. If asked for time, divide the volume by the rate instead. Check by multiplying rate × time to recover the volume.",["Infusion rate","Pump rate","Infusion time"]);
  add("flow","Use minutes for a gravity rate","Multiply mL by tubing drops/mL to find total drops, convert the time to minutes, then divide. Round only at the end as directed.",["Gravity flow rate","Gravity rate"]);

  function lookup(topic, stem = "") {
    if (topic === "Pharmacy math") {
      if (/\bmg\/kg\b/i.test(stem)) topic = "mixed-weight";
      else if (/\bstock\b/i.test(stem)) topic = "mixed-dilution";
      else if (/\bdrops\/mL\b/i.test(stem)) topic = "mixed-eye";
      else if (/\bactuations\b/i.test(stem)) topic = "mixed-inhaler";
      else if (/days[’'] supply/i.test(stem)) topic = "mixed-days";
      else if (/liquid dose/i.test(stem)) topic = "mixed-liquid";
    }
    return tips.get(topic);
  }
  function append(review, topic, stem) {
    const tip = lookup(topic,stem);
    if (!tip) return;
    const box = document.createElement("div");
    box.className = "calc-tip";
    const explanation = document.createElement("p");
    const heading = document.createElement("strong");
    heading.textContent = `Technique: ${tip.title}. `;
    explanation.append(heading,tip.setup);
    const example = document.createElement("a");
    example.href = `#${tip.lesson}`; example.textContent = "See a worked example";
    box.append(explanation,example);
    review.append(box);
  }
  globalThis.PTCE_MATH_TECHNIQUES = Object.freeze({lookup,append});
})();
