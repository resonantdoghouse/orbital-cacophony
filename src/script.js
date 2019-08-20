const pitches = ["49", "58", "65", "73", "77", "98.00", "103.83", "130.81"];

const playSound = () => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  oscillator.frequency.value =
    pitches[Math.floor(Math.random() * pitches.length)];
  oscillator.type = "triangle";
  oscillator.connect(gain);
  gain.connect(context.destination);
  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
  oscillator.start(now);
  oscillator.stop(now + 0.5);

  setTimeout(function() {
    context.close();
  }, 600);
};

$(".sun").on("click", function(event) {
  if (event.target !== this) return;
  playSound();
  $(this).toggleClass("sun--active");
});

let clickCount = 0;
let toneLoop = null;
$(".planet").on("click", function() {
  clickCount += 1;
  playSound();
  $(this).toggleClass("active");
  $(this).css("z-index", 10 + clickCount);
  $(this)
    .find(".moon")
    .toggleClass("active");

  if ($(this).hasClass("active")) {
    toneLoop = window.setInterval(function() {
      playSound("triangle");
    }, 60000 / 60);
  } else if ($(".planet").hasClass("active")) {
    for (let i = 1; i < toneLoop; i++) {
      window.clearInterval(i);
    }
  } else {
    window.clearInterval(toneLoop);
    for (let i = 1; i < toneLoop; i++) {
      window.clearInterval(i);
    }
  }
});
