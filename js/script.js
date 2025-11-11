document.addEventListener("DOMContentLoaded", () => {

  // --- Funções de controle de áudio ---
  function playAudio(id) {
    const audio = document.getElementById(id);
    if (!audio) return;
    document.querySelectorAll("audio").forEach(a => {
      if (a !== audio) { a.pause(); a.currentTime = 0; }
    });
    audio.play().catch(() => {});
  }

  function pauseAudio(id) {
    const audio = document.getElementById(id);
    if (audio) audio.pause();
  }

  function volumeUp(id) {
    const a = document.getElementById(id);
    if (a) { a.volume = Math.min(a.volume + 0.1, 1); }
  }

  function volumeDown(id) {
    const a = document.getElementById(id);
    if (a) { a.volume = Math.max(a.volume - 0.1, 0); }
  }

  window.playAudio = playAudio;
  window.pauseAudio = pauseAudio;
  window.volumeUp = volumeUp;
  window.volumeDown = volumeDown;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of sparkles) {
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
    }
  };

  if (isMobile) {
    // modo leve para celular — atualiza a cada 100ms
    setInterval(draw, 100);
  } else {
    // modo desktop — animação fluida
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();
  }
});
