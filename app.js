// lấy ra tất cả div có class có blub trong index.html
const bulbs = document.querySelectorAll(".bulb");
// gọi ra button có id = toggleLights
const toggleButton = document.getElementById("toggleLights");

// set giá trị mặc định cho một biến

// có 2 loại const vs let
// => nếu xét const thì nó không set đc giá trị nữa
// => nếu let thì có thể tùy chỉnh lại giá trị
let lightsOn = true;

toggleButton.addEventListener("click", () => {
  // khi click button nó ngược lại giá trị trên => ! là ngược lại
  lightsOn = !lightsOn;

  bulbs.forEach((bulb) => {
    // set lại animations khi lightsOn được về true
    bulb.style.animation = lightsOn ? "twinkle 1.5s infinite" : "none";

    // sẽ set lại opacity vể 0.3 => opacity: tức độ mờ của một div
    bulb.style.opacity = lightsOn ? "1" : ".3";
  });

  // Change text
  toggleButton.textContent = lightsOn ? "Turn Off Lights" : "Turn On Lights";
  // Change Background color
  // toggleButton.style.backgroundColor = lightsOn ? "yellow" : "red";
  // change color text
  // toggleButton.style.color = lightsOn ? "blue" : "white";
});

// Snowfall Effect
const snowContainer = document.querySelector(".snow-container");

// function tạo ra tuyết rơi xuống
function createSnowFlake() {
  // tạo ra new div mới
  const snowflake = document.createElement("div");

  // add class cái new div mới kia
  snowflake.classList.add("snowflake");
  // cho tuyết rơi xuống theo chiều dọc màn hình nó sẽ random chỗ rơi
  snowflake.style.left = `${Math.random() * 100}vw`;
  // tạo thêm animation
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  // cái này cho thêm opacity(độ mờ) khác nhau của tuyết
  snowflake.style.opacity = Math.random();

  // thêm phần tử con trong phần tử cha
  snowContainer.appendChild(snowflake);

  // nó sẽ hàm remove() sẽ call sau 5s
  // remove tức là nó sẽ xóa ra khỏi webpage
  setTimeout(() => snowflake.remove(), 5000);
}

function createFirework(x, y) {
  // màu
  const colors = ["#ff0", "#ff4", "#4ff", "#f4f", "#4f4"];
  // số pháo hoa tạo ra
  const particles = 30;
  const container = document.querySelector(".fireworks-container");

  // Giới hạn tọa độ y trong phạm vi container
  const containerRect = container.getBoundingClientRect();
  y = Math.min(y, containerRect.height);

  for (let i = 0; i < particles; i++) {
    // tạo ra 30 hạt, với mỗi hạt gắn class firework-particle và color khác nhau
    const particle = document.createElement("div");
    particle.className = "firework-particle";
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // tính toán góc và vận tốc
    const angle = (i * 360) / particles; // xác định hướng di chuyển (chia đều 360 độ cho 30 hạt)
    const velocity = 2 + Math.random() * 2; // vận tốc ngẫu nhiên 2 => 4

    // vị trí nhấp chuột
    particle.style.left = x + "px";
    particle.style.top = y + "px";

    // gán vào container
    container.appendChild(particle);

    // angle được chuyển từ độ => radinat
    const rad = (angle * Math.PI) / 180;

    // trả về vận tốc theo hướng trục X
    const vx = Math.cos(rad) * velocity;
    // trả về vận tốc theo hướng trục Y
    const vy = Math.sin(rad) * velocity;

    let posX = x;
    let posY = y;

    // hàm cập nhật vị trí hạt theo vận tốc
    const animate = () => {
      posX += vx;
      posY += vy;

      // Giới hạn phạm vi di chuyển trong container
      if (
        posX < 0 ||
        posX > containerRect.width ||
        posY < 0 ||
        posY > containerRect.height
      ) {
        particle.remove();
        return;
      }

      particle.style.left = posX + "px";
      particle.style.top = posY + "px";

      // vẽ lại hiệu ứng động trên trình duyệt
      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Hiệu ứng particle khi di chuột
function createParticle(e) {
  const particle = document.createElement("div");
  particle.className = "mouse-particle";
  particle.style.left = e.pageX + "px";
  particle.style.top = e.pageY + "px";
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
}

document.addEventListener("click", (e) => {
  createFirework(e.pageX, e.pageY);
  createParticle(e);
});

document.addEventListener("mousemove", (e) => {
  if (Math.random() < 0.1) {
    createParticle(e);
  }
});

// gọi liên tục 0.2 giây      => 1000 = 1s
setInterval(createSnowFlake, 100);

function updateCountdown() {
  const christmas = new Date(new Date().getFullYear(), 11, 25);

  const interval = setInterval(() => {
    const now = new Date();
    const diff = christmas - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    if (diff < 0) {
      const container = document.querySelector(".container");
      container.classList.add("hide-block");
      const container2 = document.querySelector(".gift");
      container2.classList.remove("hide-block");

      clearInterval(interval);
    }
  }, 1000);
}

updateCountdown();

// open/close box1
document.getElementById("box1").addEventListener("click", function () {
  var box1 = document.getElementById("box1");
  var box2 = document.getElementById("box2");
  var boxTop2 = document.getElementById("box-top2");
  var boxBottom2 = document.getElementById("box-bottom2");
  var greeting = document.getElementById("greeting");

  if (box1.classList.contains("box1closed")) {
    box1.classList.remove("box1closed", "shake", "bounce");
    box1.classList.add("box1open");
    box2.classList.remove("hideBox");
    boxTop2.classList.add("shake", "bounce");
    boxBottom2.classList.remove("hideBox");
  } else {
    box1.classList.remove("box1open");
    box1.classList.add("box1closed", "shake", "bounce");
    box2.classList.remove("box2open");
    box2.classList.add("box2closed", "hideBox");
    box3.classList.remove("box3open");
    box3.classList.add("box3closed", "hideBox");
    boxTop2.classList.remove("shake", "bounce");
    boxBottom2.classList.add("hideBox");
    boxBottom3.classList.add("hideBox");
    greeting.classList.remove("greetingOpen");
    greeting.classList.add("greetingClosed");
  }
});

// open/close box2
document.getElementById("box2").addEventListener("click", function () {
  var box2 = document.getElementById("box2");
  var box3 = document.getElementById("box3");
  var boxTop2 = document.getElementById("box-top2");
  var boxTop3 = document.getElementById("box-top3");
  var boxBottom3 = document.getElementById("box-bottom3");
  var greeting = document.getElementById("greeting");

  if (box2.classList.contains("box2closed")) {
    box2.classList.remove("box2closed");
    box2.classList.add("box2open");
    box3.classList.remove("hideBox");
    boxTop2.classList.remove("shake", "bounce");
    boxTop3.classList.add("shake", "bounce");
    boxBottom3.classList.remove("hideBox");
  } else {
    box2.classList.remove("box2open");
    box2.classList.add("box2closed");
    box3.classList.remove("box3open");
    box3.classList.add("box3closed", "hideBox");
    boxTop2.classList.add("shake", "bounce");
    boxBottom3.classList.add("hideBox");
    greeting.classList.remove("greetingOpen");
    greeting.classList.add("greetingClosed");
  }
});

// open/close box3
document.getElementById("box3").addEventListener("click", function () {
  var box3 = document.getElementById("box3");
  var boxTop3 = document.getElementById("box-top3");
  var greeting = document.getElementById("greeting");

  if (box3.classList.contains("box3closed")) {
    box3.classList.remove("box3closed");
    box3.classList.add("box3open");
    boxTop3.classList.remove("shake", "bounce");
    greeting.classList.remove("greetingClosed");
    greeting.classList.add("greetingOpen");
  } else {
    box3.classList.remove("box3open");
    box3.classList.add("box3closed");
    greeting.classList.remove("greetingOpen");
    greeting.classList.add("greetingClosed");
  }
});

const musicBtn = document.querySelector(".music-toggle");
const audio = document.getElementById("bgMusic");

musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = "🔊";
  } else {
    audio.pause();
    musicBtn.textContent = "🔈";
  }
});
