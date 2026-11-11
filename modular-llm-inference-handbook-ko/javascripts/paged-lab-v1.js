(() => {
  function init(root) {
    const usedInput = root.querySelector('[data-used-tokens]');
    const sizeInput = root.querySelector('[data-block-size]');
    const maxInput = root.querySelector('[data-max-tokens]');
    const blocks = root.querySelector('[data-paged-blocks]');
    const result = root.querySelector('[data-paged-result]');
    const error = root.querySelector('[data-paged-error]');
    function update() {
      const used = Number(usedInput.value), size = Number(sizeInput.value), max = Number(maxInput.value);
      if (![used,size,max].every(Number.isInteger) || used < 1 || size < 1 || max < used || size > 4096 || used > 1000000) {
        error.textContent = '정수 값을 입력하고, 예약 상한은 실제 토큰 수 이상으로 설정해 주세요.';
        result.textContent = '';
        blocks.replaceChildren();
        return;
      }
      error.textContent = '';
      const count = Math.ceil(used / size), allocated = count * size;
      const shown = Math.min(count, 20);
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < shown; i++) {
        const el = document.createElement('div');
        const filled = Math.min(size, Math.max(0, used - i * size));
        el.textContent = `${i + 1}번 블록: ${filled}/${size}칸 사용`;
        fragment.append(el);
      }
      if (count > shown) { const el = document.createElement('div'); el.textContent = `… 나머지 ${count - shown}개 블록`; fragment.append(el); }
      blocks.replaceChildren(fragment);
      result.textContent = `연속 예약: ${max}칸 중 ${max-used}칸 비어 있음. 블록 할당: ${count}개 × ${size}칸 = ${allocated}칸 중 ${allocated-used}칸 비어 있음. 블록 할당량은 예약 상한과 다를 수 있으며, 이 예시는 관리 비용을 제외합니다.`;
    }
    [usedInput,sizeInput,maxInput].forEach((input) => input.addEventListener('input', update));
    update();
  }
  function initAll() { document.querySelectorAll('[data-paged-lab]').forEach((root) => { if (!root.dataset.ready) { root.dataset.ready = 'true'; init(root); } }); }
  document.addEventListener('DOMContentLoaded', initAll);
  if (typeof document$ !== 'undefined') document$.subscribe(initAll);
})();
