(function () {
  const descriptions = [
    ["서버가 사용자 요청을 받아 대기열에 넣습니다. 이 단계는 서빙에 속합니다.", "서빙 단계"],
    ["입력 문장을 모델이 읽는 토큰 ID로 바꾸고 실행할 요청을 준비합니다. 이 단계는 서빙과 추론의 경계에 있습니다.", "서빙과 추론의 경계"],
    ["모델이 입력 토큰을 한꺼번에 처리하고 이후 생성에 필요한 KV cache를 만듭니다.", "추론 단계"],
    ["모델이 다음 토큰을 하나씩 만들고 이전 토큰의 KV cache를 재사용합니다.", "추론 단계"],
    ["서버가 생성된 토큰을 스트리밍하거나 완성된 답을 한 번에 보냅니다.", "서빙 단계"],
  ];

  function initialize(root) {
    if (root.dataset.ready === "true") return;
    root.dataset.ready = "true";
    const buttons = [...root.querySelectorAll("[data-flow-step]")];
    const description = root.querySelector("[data-flow-description]");
    const kind = root.querySelector("[data-flow-kind]");

    for (const button of buttons) {
      button.addEventListener("click", () => {
        const selected = Number(button.dataset.flowStep);
        for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
        description.textContent = descriptions[selected][0];
        kind.textContent = descriptions[selected][1];
      });
    }
  }

  function initializeAll() {
    document.querySelectorAll("[data-request-flow]").forEach(initialize);
  }

  if (typeof document$ !== "undefined") document$.subscribe(initializeAll);
  else document.addEventListener("DOMContentLoaded", initializeAll);
})();
