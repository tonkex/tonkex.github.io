(() => {
  function init(root) {
    const input = (name) => root.querySelector(`[data-${name}]`);
    const fields = ['parameters', 'weight-bits', 'layers', 'kv-heads', 'head-dim', 'context', 'concurrency', 'kv-bits', 'reserve', 'capacity'];
    function update() {
      const value = Object.fromEntries(fields.map((name) => [name, Number(input(name).value)]));
      const error = root.querySelector('[data-memory-error]');
      const result = root.querySelector('[data-memory-result]');
      if (fields.some((name) => !Number.isFinite(value[name])) ||
          value.parameters <= 0 || value.layers < 1 || value['kv-heads'] < 1 ||
          value['head-dim'] < 1 || value.context < 1 || value.concurrency < 1 ||
          value.reserve < 0 || value.capacity <= 0) {
        error.textContent = '모든 입력에 유효한 양수를 넣어 주세요. 실행 여유분은 0도 가능합니다.';
        result.textContent = '';
        return;
      }
      error.textContent = '';
      const gib = 2 ** 30;
      const weights = value.parameters * 1e9 * value['weight-bits'] / 8 / gib;
      const kv = 2 * value.layers * value['kv-heads'] * value['head-dim'] *
        value.context * value.concurrency * value['kv-bits'] / 8 / gib;
      const total = weights + kv + value.reserve;
      const parts = [weights, kv, value.reserve];
      ['weight-bar', 'kv-bar', 'reserve-bar'].forEach((name, i) => {
        root.querySelector(`[data-${name}]`).style.width = `${100 * parts[i] / Math.max(total, value.capacity)}%`;
      });
      const remaining = value.capacity - total;
      result.textContent = `가중치 ${weights.toFixed(1)} GiB + KV 캐시 ${kv.toFixed(1)} GiB + 실행 여유분 ${value.reserve.toFixed(1)} GiB = 예상 합계 ${total.toFixed(1)} GiB. ${remaining >= 0 ? `입력한 GPU 용량보다 ${remaining.toFixed(1)} GiB 적습니다.` : `입력한 GPU 용량을 ${Math.abs(remaining).toFixed(1)} GiB 초과합니다.`} 실제 배포 가능 여부는 부하 시험으로 확인하세요.`;
    }
    fields.forEach((name) => input(name).addEventListener('input', update));
    update();
  }
  function initAll() { document.querySelectorAll('[data-gpu-memory-lab]').forEach((root) => { if (!root.dataset.ready) { root.dataset.ready = 'true'; init(root); } }); }
  document.addEventListener('DOMContentLoaded', initAll);
  if (typeof document$ !== 'undefined') document$.subscribe(initAll);
})();
