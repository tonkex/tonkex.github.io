(() => {
  const steps = {
    request: {
      vendor: '요청 본문을 받지 않는 설계를 목표로 합니다.',
      customer: '애플리케이션 → 모델 서버 → 애플리케이션으로 요청과 응답이 이동합니다.',
      note: '실제 네트워크 경로와 원격 지원 권한을 확인해야 합니다.'
    },
    deploy: {
      vendor: '배포 설정, 확장 정책, 업데이트 명령을 전달할 수 있습니다.',
      customer: '허용된 IAM 권한으로 GPU 인스턴스와 모델 서버가 만들어지거나 바뀝니다.',
      note: '공급자가 실행할 수 있는 변경과 고객 승인 절차를 확인하세요.'
    },
    telemetry: {
      vendor: '제품 설정에 따라 지표나 진단 로그를 받을 수 있습니다.',
      customer: '추론 지표와 로그가 생성됩니다. 입력·출력 내용이 포함되는지 살펴야 합니다.',
      note: '민감한 내용이 제어 영역으로 전송되지 않도록 필드와 전송 경로를 점검하세요.'
    }
  };
  function init() {
    document.querySelectorAll('[data-byoc-flow]').forEach((root) => {
      const buttons = [...root.querySelectorAll('[data-byoc-step]')];
      buttons.forEach((button) => button.addEventListener('click', () => {
        const data = steps[button.dataset.byocStep];
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        root.querySelector('[data-byoc-vendor]').textContent = data.vendor;
        root.querySelector('[data-byoc-customer]').textContent = data.customer;
        root.querySelector('[data-byoc-note]').textContent = data.note;
      }));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
