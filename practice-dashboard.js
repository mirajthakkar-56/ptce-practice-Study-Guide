(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const root = $("practice-dashboard");
  const bank = window.PTCE_DASHBOARD_DATA;
  if (!bank) { root.append("The practice dashboard could not load. Refresh to try again."); return; }
  const fmt = n => n.toLocaleString("en-US");
  const node = (tag, text, cls) => {
    const item = document.createElement(tag);
    if (text !== undefined) item.textContent = text;
    if (cls) item.className = cls;
    return item;
  };
  const tabs = [...$("pd-tabs").querySelectorAll('[role="tab"]')];
  function showTab(tab, updateUrl = false) {
    for (const t of tabs) {
      const active = t === tab;
      t.setAttribute("aria-selected", active);
      t.tabIndex = active ? 0 : -1;
      $(t.getAttribute("aria-controls")).hidden = !active;
    }
    if (updateUrl && location.hash !== tab.hash) {
      try { history.pushState(null, "", tab.hash); }
      catch { location.hash = tab.hash; }
    }
  }
  for (const tab of tabs) tab.addEventListener("click", e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault(); showTab(tab, true);
  });
  $("pd-tabs").addEventListener("keydown", e => {
    const i = tabs.indexOf(e.target);
    if (i < 0) return;
    const next = {ArrowLeft:(i + 2) % 3, ArrowRight:(i + 1) % 3, Home:0, End:2}[e.key];
    if (next === undefined) return;
    e.preventDefault(); showTab(tabs[next], true); tabs[next].focus();
  });
  function syncHash() {
    const tab = tabs.find(t => t.hash === location.hash);
    if (tab) {
      const panel = $(tab.getAttribute("aria-controls"));
      const wasHidden = panel.hidden;
      showTab(tab);
      if (wasHidden) panel.scrollIntoView();
    } else if (location.hash === "#practice-dashboard") showTab(tabs[0]);
  }
  window.addEventListener("hashchange", syncHash);
  syncHash();

  const names = ["Medications", "Federal Requirements", "Patient Safety & Quality Assurance", "Order Entry & Processing"];
  const weights = [35, 18.75, 23.75, 22.5];
  const topicIds = {"Medications":0, "Federal rules":1, "Patient safety":2, "Order entry":3, "Pharmacy math":3};
  const rows = [...bank.mixed, ...bank.math].map((q,i) => ({
    id:i, topic:q[0], page:q[1], stem:q[2], choices:q[3], correct:q[4], why:q[5],
    domain:i >= bank.mixed.length ? 3 : topicIds[q[0]],
    math:i >= bank.mixed.length || q[0] === "Pharmacy math"
  }));
  const pools = names.map((_,i) => rows.filter(q => q.domain === i));
  const byMath = [pools[3].filter(q => q.math), pools[3].filter(q => !q.math)];
  const lastDraw = new Map();
  const ids = [0,1,2,3];
  const letters = "ABCD";
  function pick(pool, n, last) {
    return shuffled(pool).sort((a,b) => Number(last.has(a.id)) - Number(last.has(b.id))).slice(0,n);
  }
  function draw(scope, n, domain) {
    const last = lastDraw.get(scope) || new Set();
    let selected;
    if (n === rows.length) selected = shuffled(rows);
    else if (domain !== undefined) selected = pick(pools[domain], n, last);
    else {
      const raw = weights.map(w => n*w/100);
      const counts = raw.map(Math.floor);
      const remaining = n - counts.reduce((a,b) => a+b,0);
      const ranked = [...ids].sort((a,b) => (raw[b]-counts[b]) - (raw[a]-counts[a]));
      ranked.slice(0,remaining).forEach(i => counts[i]++);
      selected = shuffled(pools.flatMap((pool,i) => {
        if (i !== 3) return pick(pool,counts[i],last);
        const math = Math.ceil(counts[i]/2);
        return [...pick(byMath[0],math,last), ...pick(byMath[1],counts[i]-math,last)];
      }));
    }
    lastDraw.set(scope,new Set(selected.map(q => q.id)));
    return selected.map(q => [q.id,shuffled(ids)]);
  }

  function runner(kind) {
    const setup = root.querySelector(`[data-setup="${kind}"]`);
    const host = root.querySelector(`[data-run="${kind}"]`);
    const storageKey = `ptce-practice-v1-${kind}`;
    host.classList.add("pd-run");
    host.innerHTML = `
      <div class="quiz-card" data-x="exam" hidden>
        <h3 class="pd-run-title" data-x="title"></h3>
        <div class="math-meta"><span data-x="position"></span><span class="math-clock" data-x="clock">Time left <output data-x="time" aria-live="off"></output></span></div>
        <progress data-x="progress" aria-label="Questions answered"></progress>
        <fieldset><legend data-x="question" tabindex="-1"></legend><div data-x="choices"></div></fieldset>
        <div class="pd-run-nav">
          <button class="button secondary" type="button" data-x="back">Back</button>
          <button class="button secondary" type="button" data-x="next">Next question</button>
          <button class="button" type="button" data-x="submit">Submit answers</button>
        </div>
        <form class="pd-toolrow" data-x="jump-form">
          <label>Jump to question<input data-x="jump" type="number" min="1" step="1" required inputmode="numeric"></label>
          <button class="button secondary" type="submit">Go</button>
        </form>
        <p class="pd-help" data-x="progress-label"></p>
        <div class="pd-confirm" data-x="confirm" hidden>
          <p data-x="confirm-text" role="status"></p>
          <div class="actions"><button class="button" type="button" data-x="finish">Submit now</button><button class="button secondary" type="button" data-x="cancel">Keep practicing</button></div>
        </div>
        <p class="error" data-x="warning" role="status"></p>
      </div>
      <section class="results pd-result-slot" data-x="results" hidden>
        <p class="eyebrow">Practice results</p><h3 data-x="score" tabindex="-1"></h3>
        <p data-x="status"></p>
        <div class="actions"><button class="button" type="button" data-x="restart">Start a new set</button><button class="button secondary" type="button" data-x="replay">Retake same questions</button></div>
        <dl class="pd-breakdown" data-x="breakdown"></dl>
        <div class="actions">
          <button class="button secondary" type="button" data-x="review-back">Previous review page</button>
          <button class="button secondary" type="button" data-x="review-next">Next review page</button>
          <span data-x="review-info" role="status"></span>
        </div>
        <ol class="review" data-x="review"></ol>
      </section>`;
    const x = name => host.querySelector(`[data-x="${name}"]`);
    let state, timer, reviewPage, alerted;
    function save() {
      try {
        if (state) sessionStorage.setItem(storageKey,JSON.stringify(state));
        else sessionStorage.removeItem(storageKey);
      } catch { /* Storage may be blocked; the current attempt still works. */ }
    }
    function paintProgress() {
      const answered = state.answers.filter(a => a !== null).length;
      x("progress").max = state.questions.length; x("progress").value = answered;
      const label = `${fmt(answered)} of ${fmt(state.questions.length)} answered`;
      x("progress").setAttribute("aria-valuetext",label);
      x("progress-label").textContent = `${label}. You can move past a question without answering.`;
    }
    function paintQuestion(focus = true) {
      const [id, order] = state.questions[state.index];
      const q = rows[id];
      x("position").textContent = `Question ${fmt(state.index+1)} of ${fmt(state.questions.length)} · ${names[q.domain]}`;
      x("question").textContent = q.stem;
      x("choices").replaceChildren(...order.map((option,i) => {
        const label = node("label",undefined,"choice");
        const radio = node("input");
        radio.type = "radio"; radio.name = `pd-answer-${kind}`; radio.value = option;
        radio.checked = state.answers[state.index] === option;
        const key = node("span",letters[i]+".","choice-key"); key.setAttribute("aria-hidden","true");
        label.append(radio,key,node("span",q.choices[option]));
        return label;
      }));
      x("back").disabled = state.index === 0;
      x("next").disabled = state.index === state.questions.length-1;
      x("jump").max = state.questions.length; x("jump").value = state.index+1;
      x("confirm").hidden = true; paintProgress();
      if (focus) x("question").focus();
    }
    function finish(expired = false) {
      const result = state;
      clearInterval(timer);
      state = null; save();
      const score = result.questions.reduce((sum,[id],i) => sum + Number(rows[id].correct === result.answers[i]),0);
      const unanswered = result.answers.filter(n => n === null).length;
      x("score").textContent = `${fmt(score)} / ${fmt(result.questions.length)} correct`;
      x("status").textContent = `${expired ? "Time’s up. Submitted automatically. " : ""}${fmt(unanswered)} unanswered. This is a raw practice score.`;
      const breakdown = names.map(() => [0,0]);
      result.questions.forEach(([id],i) => {
        const q = rows[id], pair = breakdown[q.domain];
        pair[0] += Number(q.correct === result.answers[i]); pair[1]++;
      });
      x("breakdown").replaceChildren(...breakdown.flatMap(([correct,total],i) => {
        if (!total) return [];
        const entry = node("div");
        entry.append(node("dt",names[i]),node("dd",`${fmt(correct)} / ${fmt(total)}`));
        return [entry];
      }));
      const perPage = 12, pageCount = Math.ceil(result.questions.length/perPage);
      function paintReview(focus = false) {
        const start = reviewPage*perPage;
        x("review").replaceChildren(...result.questions.slice(start,start+perPage).map(([id],i) => {
          const q = rows[id], answer = result.answers[start+i];
          const li = node("li"), ok = answer === q.correct;
          const mark = node("span",ok ? "Correct" : answer === null ? "Unanswered" : "Incorrect","mark");
          mark.dataset.ok = ok;
          const link = node("a",`Review page ${q.page}`); link.href = `#page-${String(q.page).padStart(2,"0")}`;
          li.append(mark,node("p",`${start+i+1}. ${q.stem}`),node("p",`Your answer: ${answer === null ? "No answer" : q.choices[answer]}`),
            node("p",`Correct answer: ${q.choices[q.correct]}`),node("p",q.why),link);
          return li;
        }));
        x("review-back").disabled = reviewPage === 0;
        x("review-next").disabled = reviewPage+1 >= pageCount;
        x("review-info").textContent = `Review page ${reviewPage+1} of ${pageCount}`;
        x("review-info").tabIndex = -1;
        if (focus) x("review-info").focus();
      }
      reviewPage = 0;
      x("review-back").onclick = () => { reviewPage--; paintReview(true); };
      x("review-next").onclick = () => { reviewPage++; paintReview(true); };
      x("replay").onclick = () => {
        begin(result.scope,result.title,result.questions,result.deadline ? 110 : 0);
      };
      paintReview();
      x("exam").hidden = true; x("results").hidden = false;
      if (host.getClientRects().length) x("score").focus();
    }
    function tick() {
      if (!state?.deadline) return;
      const sec = Math.max(0,Math.ceil((state.deadline-Date.now())/1000));
      x("time").textContent = `${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}`;
      x("clock").dataset.low = sec <= 300;
      if (!sec) { finish(true); return; }
      if (sec <= 300 && !alerted) { alerted = true; x("warning").textContent = "Five minutes or less remains."; }
    }
    function open(focus) {
      setup.hidden = true; host.hidden = false;
      x("results").hidden = true; x("exam").hidden = false; x("clock").hidden = !state.deadline;
      x("title").textContent = state.title;
      x("warning").textContent = ""; alerted = false;
      paintQuestion(focus); tick();
      if (state?.deadline) timer = setInterval(tick,500);
    }
    function live() {
      if (state?.deadline && Date.now() >= state.deadline) tick();
      return Boolean(state);
    }
    function move(index) {
      if (!live() || index < 0 || index >= state.questions.length) return;
      state.index = index; save(); paintQuestion();
    }
    x("back").onclick = () => { if (state) move(state.index-1); };
    x("next").onclick = () => { if (state) move(state.index+1); };
    x("jump-form").onsubmit = e => { e.preventDefault(); move(x("jump").valueAsNumber-1); };
    x("choices").onchange = e => { if (live() && e.target.type === "radio") {
      state.answers[state.index] = Number(e.target.value);
      x("confirm").hidden = true; save(); paintProgress();
    } };
    x("submit").onclick = () => {
      if (!live()) return;
      const unanswered = state.answers.filter(a => a === null).length;
      x("confirm-text").textContent = unanswered
        ? `${fmt(unanswered)} unanswered. Submit this attempt anyway?` : "All questions answered. Submit this attempt?";
      x("confirm").hidden = false; x("cancel").focus();
    };
    x("cancel").onclick = () => { x("confirm").hidden = true; x("submit").focus(); };
    x("finish").onclick = () => { if (live()) finish(); };
    x("restart").onclick = () => { setup.hidden = false; host.hidden = true; setup.querySelector("button").focus(); };
    document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved?.questions?.length && saved.answers.length === saved.questions.length &&
          saved.questions.every(([id, order]) => rows[id] && order?.length === 4) &&
          saved.index >= 0 && saved.index < saved.questions.length) {
        state = saved;
        lastDraw.set(saved.scope,new Set(saved.questions.map(([id]) => id)));
        open(false);
      }
    } catch { /* Ignore missing or incompatible saved progress. */ }
    function begin(scope,title,questions,minutes) {
      state = {scope,title,questions,index:0,answers:Array(questions.length).fill(null),deadline:minutes ? Date.now()+minutes*60000 : 0};
      save(); open(true);
    }
    return (scope, count, title, minutes = 0, domain) => begin(scope,title,draw(scope,count,domain),minutes);
  }
  const startMock = runner("mock"), startDomain = runner("domain");
  $("pd-mock-form").onsubmit = e => {
    e.preventDefault();
    if (new FormData(e.target).get("pd-format") === "all") startMock("all",rows.length,"All 1,000 questions");
    else startMock("mock",90,"Full-Length Mock Exam",110);
  };
  const domainChoice = $("pd-domain-choice");
  domainChoice.append(...names.map((name,i) => {
    const option = node("option",name); option.value = i; return option;
  }));
  const describeDomain = () => {
    $("pd-domain-count").textContent = `${fmt(pools[Number(domainChoice.value)].length)} questions available${domainChoice.value === "3" ? ", including pharmacy calculations" : ""}.`;
  };
  domainChoice.onchange = describeDomain; describeDomain();
  $("pd-domain-form").onsubmit = e => {
    e.preventDefault();
    const domain = Number(domainChoice.value), size = $("pd-domain-size").value;
    startDomain(`domain-${domain}`,size === "all" ? pools[domain].length : Number(size),names[domain],0,domain);
  };
  let papers = 0;
  $("pd-paper-form").onsubmit = e => {
    e.preventDefault();
    const size = Number($("pd-paper-size").value);
    const questions = draw("paper",size);
    $("pd-paper-status").textContent = `Paper ${++papers} · ${size} questions`;
    $("pd-paper-questions").replaceChildren(...questions.map(([id,order]) => {
      const q = rows[id], item = node("li"), opts = node("ol");
      opts.type = "A"; opts.append(...order.map(option => node("li",q.choices[option])));
      item.append(node("strong",q.stem),opts); return item;
    }));
    $("pd-paper-answers").replaceChildren(...questions.map(([id,order]) => {
      const q = rows[id];
      return node("li",`${letters[order.indexOf(q.correct)]}. ${q.choices[q.correct]}`);
    }));
    $("pd-paper-key").open = false;
    $("pd-paper-result").hidden = false;
    $("pd-paper-title").focus();
  };
  const clearPrint = () => document.body.classList.remove("pd-printing","pd-with-key");
  window.addEventListener("afterprint",clearPrint);
  $("pd-print").onclick = () => {
    const withKey = $("pd-print-key").checked, wasOpen = $("pd-paper-key").open;
    document.body.classList.add("pd-printing");
    document.body.classList.toggle("pd-with-key",withKey);
    if (withKey) $("pd-paper-key").open = true;
    window.addEventListener("afterprint",() => { $("pd-paper-key").open = wasOpen; },{once:true});
    window.print();
  };
})();
