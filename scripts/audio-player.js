 // Audio Players
 const players = document.querySelectorAll('.custom-player');
 players.forEach(player => {
     const audio = player.querySelector('audio');
     const playBtn = player.querySelector('.play-btn');
     const progress = player.querySelector('.progress');
     const timeDisplay = player.querySelector('.time');

     // Play/Pause
     playBtn.addEventListener('click', () => {
         const icon = playBtn.querySelector('i');
         if (audio.paused) {
             audio.play();
             icon.classList.remove('fa-play');
             icon.classList.add('fa-pause');
         } else {
             audio.pause();
             icon.classList.remove('fa-pause');
             icon.classList.add('fa-play');
         }
     });

     // Update Progress
     audio.addEventListener('timeupdate', () => {
         const progressPercent = (audio.currentTime / audio.duration) * 100;
         progress.style.width = `${progressPercent}%`;
         
         // Update time display
         const minutes = Math.floor(audio.currentTime / 60);
         const seconds = Math.floor(audio.currentTime % 60);
         timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
     });
 });