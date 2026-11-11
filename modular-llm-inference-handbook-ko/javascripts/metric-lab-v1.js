(function () {
  function initialize(root) {
    if (root.dataset.ready === "true") return;
    root.dataset.ready = "true";

    const field = (name) => root.querySelector(`[data-${name}]`);
    const inputs = ["ttft", "e2el", "tokens", "slo-ttft", "slo-e2el"].map(field);
    const rows = [...root.querySelectorAll("[data-sample-row]")];

    function render() {
      const ttft = Number(field("ttft").value);
      const e2el = Number(field("e2el").value);
      const tokens = Number(field("tokens").value);
      const sloTTFT = Number(field("slo-ttft").value);
      const sloE2EL = Number(field("slo-e2el").value);

      const valid = inputs.every((input) => input.value.trim() !== "" && Number.isFinite(Number(input.value))) &&
        ttft >= 0 && e2el >= ttft && Number.isInteger(tokens) && tokens >= 2 &&
        sloTTFT >= 0 && sloE2EL >= 0;

      field("error").textContent = valid ? "" : "TTFT·목표값은 0 이상, E2EL은 TTFT 이상, 출력 토큰은 2개 이상인 정수로 입력하세요.";
      if (!valid) {
        field("result").textContent = "입력값을 확인하면 결과가 표시됩니다.";
        field("slo-result").textContent = "목표값을 확인하면 달성 결과가 표시됩니다.";
        return;
      }

      const generation = e2el - ttft;
      const tpot = generation / (tokens - 1);
      field("result").textContent = `생성 구간 ${generation.toLocaleString("ko-KR")} ms ÷ ${tokens - 1}개 간격 = TPOT ${tpot.toFixed(2)} ms/토큰`;

      const waitPct = e2el === 0 ? 50 : Math.max(8, Math.min(92, (ttft / e2el) * 100));
      field("wait-bar").style.width = `${waitPct}%`;
      field("generation-bar").style.width = `${100 - waitPct}%`;

      let passed = 0;
      for (const row of rows) {
        const meetsGoal = Number(row.dataset.ttft) <= sloTTFT && Number(row.dataset.e2el) <= sloE2EL;
        row.querySelector("[data-status]").textContent = meetsGoal ? "충족" : "미충족";
        row.classList.toggle("metric-lab-fail", !meetsGoal);
        if (meetsGoal) passed += 1;
      }
      field("slo-result").textContent = `${rows.length}개 중 ${passed}개 충족 · 달성률 ${Math.round((passed / rows.length) * 100)}%. 10초 동안 처리했다면 Goodput은 ${(passed / 10).toFixed(1)} 요청/초입니다.`;
    }

    for (const input of inputs) input.addEventListener("input", render);
    render();
  }

  function initializeAll() {
    document.querySelectorAll("[data-metric-lab]").forEach(initialize);
  }

  if (typeof document$ !== "undefined") document$.subscribe(initializeAll);
  else document.addEventListener("DOMContentLoaded", initializeAll);
})();
