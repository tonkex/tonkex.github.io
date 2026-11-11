(() => {
  const descriptions = [
    '데이터를 모으고 정리합니다. 품질과 사용 권리를 확인해야 학습 결과를 해석할 수 있습니다.',
    '모델의 예측과 목표를 비교해 손실을 구하고, 역전파와 최적화로 가중치를 바꿉니다.',
    '학습에 쓰지 않은 예시로 정확성, 안전성, 작업 적합성을 확인합니다.',
    '검증한 모델 버전을 패키징하고 서버 또는 기기에 로드할 준비를 합니다.',
    '새 요청마다 저장된 가중치로 출력을 계산합니다. 요청 관리, 지연, 비용을 관측합니다.'
  ];
  function init(root) {
    const buttons = [...root.querySelectorAll('[data-life-step]')];
    const description = root.querySelector('[data-life-description]');
    buttons.forEach((button) => button.addEventListener('click', () => {
      const step = Number(button.dataset.lifeStep);
      buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      description.textContent = descriptions[step];
    }));
    description.textContent = descriptions[0];
  }
  function initAll() { document.querySelectorAll('[data-lifecycle-lab]').forEach((root) => { if (!root.dataset.ready) { root.dataset.ready = 'true'; init(root); } }); }
  document.addEventListener('DOMContentLoaded', initAll);
  if (typeof document$ !== 'undefined') document$.subscribe(initAll);
})();
