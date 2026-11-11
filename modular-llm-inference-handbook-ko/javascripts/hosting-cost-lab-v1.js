(() => {
  const fmt = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 });
  function update(root) {
    const get = (name) => Number(root.querySelector(`[data-${name}]`).value);
    const values = ['monthly-tokens', 'api-rate', 'infra-cost', 'ops-cost'].map(get);
    const result = root.querySelector('[data-hosting-cost-result]');
    const crossover = root.querySelector('[data-hosting-cost-crossover]');
    if (values.some((value) => !Number.isFinite(value) || value < 0)) {
      result.textContent = '0 이상의 숫자를 입력해 주세요.';
      crossover.textContent = '';
      return;
    }
    const [tokens, rate, infra, ops] = values;
    const api = tokens * rate;
    const self = infra + ops;
    result.textContent = `가정한 월 비용: API $${fmt.format(api)} · 자체 운영 $${fmt.format(self)}. ${api === self ? '두 값이 같습니다.' : api < self ? '이 가정에서는 API가 저렴합니다.' : '이 가정에서는 자체 운영이 저렴합니다.'}`;
    crossover.textContent = rate > 0
      ? `단순 비용이 같아지는 처리량: 월 약 ${fmt.format(self / rate)}백만 토큰. 자체 GPU가 이 처리량을 감당한다는 가정이 필요합니다.`
      : 'API 단가가 0이면 교차점을 계산할 수 없습니다.';
  }
  function init() {
    document.querySelectorAll('[data-hosting-cost-lab]').forEach((root) => {
      root.addEventListener('input', () => update(root));
      update(root);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
