document.addEventListener('musickitloaded', function() {
    // MusicKit global is now defined
    MusicKit.configure({
      developerToken: 'DEVELOPER-TOKEN',
      app: {
        name: 'MusicBeats',
        build: '1978.4.1'
      }
    });
  });