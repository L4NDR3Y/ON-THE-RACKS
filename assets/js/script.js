document.addEventListener('DOMContentLoaded', function () {
  const players = document.querySelectorAll('.music-player');

  players.forEach(player => {
    const audio = player.querySelector('audio');
    const playPauseBtn = player.querySelector('.playPauseBtn');
    const stopBtn = player.querySelector('.stopBtn');
    const seekBar = player.querySelector('.seekBar');
    const currentTime = player.querySelector('.currentTime');
    const duration = player.querySelector('.duration');

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    audio.addEventListener('loadedmetadata', function () {
      const totalDuration = Math.floor(audio.duration);
      duration.textContent = formatTime(totalDuration);
    });

    playPauseBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove('bi-play');
        playPauseBtn.classList.add('bi-pause');
      } else {
        audio.pause();
        playPauseBtn.classList.remove('bi-pause');
        playPauseBtn.classList.add('bi-play');
      }
    });

    stopBtn.addEventListener('click', function () {
      audio.pause();
      audio.currentTime = 0;
      playPauseBtn.classList.remove('bi-pause');
      playPauseBtn.classList.add('bi-play');
    });

    seekBar.addEventListener('input', function () {
      const seekTime = (seekBar.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    });

    audio.addEventListener('timeupdate', function () {
      const current = Math.floor(audio.currentTime);
      currentTime.textContent = formatTime(current);

      seekBar.value = (audio.currentTime / audio.duration) * 100;

      seekBar.style.background = `linear-gradient(to right, transparent 0%, #fff ${seekBar.value}%, #999999 ${seekBar.value}%, #999999 100%)`;

      seekBar.style.borderRadius = `10px`;

      seekBar.style.height = `10px`;
    });
  });
});
