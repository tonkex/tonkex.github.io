(() => {
  function init(root) {
    let mode = 'fixed';
    let step = 0;
    const stage = root.querySelector('[data-batch-stage]');
    const slots = root.querySelector('[data-batch-slots]');
    const explanation = root.querySelector('[data-batch-explanation]');
    function render() {
      const continuous = mode === 'continuous';
      const cStart = continuous ? 2 : 4;
      const cEnd = cStart + 2;
      const a = step < 2 ? `A: ${step}/2 단계 진행` : continuous ? 'A: 완료·반환' : step < 4 ? 'A: 계산 완료, 묶음 대기' : 'A: 완료·반환';
      const b = step < 4 ? `B: ${step}/4 단계 진행` : 'B: 완료·반환';
      const c = step < cStart ? 'C: 대기' : step < cEnd ? `C: ${step - cStart}/2 단계 진행` : 'C: 완료·반환';
      stage.textContent = `${step}단계 · ${continuous ? '연속 배칭' : '고정 묶음'}`;
      slots.replaceChildren(...[a,b,c].map((label) => { const el = document.createElement('div'); el.textContent = label; return el; }));
      explanation.textContent = continuous
        ? step < 2 ? 'A와 B가 같은 묶음에서 출력 토큰을 만듭니다.' : step < 4 ? 'A가 끝난 자리에 C가 들어왔습니다. B도 계속 진행합니다.' : 'C는 A가 비운 자리를 이용해 B와 같은 시점에 끝날 수 있습니다.'
        : step < 2 ? 'A와 B를 한 묶음으로 처리합니다. C는 다음 묶음을 기다립니다.' : step < 4 ? 'A의 계산은 끝났지만 이 단순한 고정 묶음 예시에서는 B가 끝날 때까지 결과를 보류합니다.' : '첫 묶음이 끝나야 C를 시작합니다.';
      root.querySelector('[data-batch-next]').disabled = step >= cEnd;
      root.querySelectorAll('[data-batch-mode]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.batchMode === mode)));
    }
    root.querySelectorAll('[data-batch-mode]').forEach((button) => button.addEventListener('click', () => { mode = button.dataset.batchMode; step = 0; render(); }));
    root.querySelector('[data-batch-next]').addEventListener('click', () => { step++; render(); });
    root.querySelector('[data-batch-reset]').addEventListener('click', () => { step = 0; render(); });
    render();
  }
  function initAll() { document.querySelectorAll('[data-batching-lab]').forEach((root) => { if (!root.dataset.ready) { root.dataset.ready = 'true'; init(root); } }); }
  document.addEventListener('DOMContentLoaded', initAll);
  if (typeof document$ !== 'undefined') document$.subscribe(initAll);
})();
