import "./style.css";

// MOBİL MENÜ
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
const menuLinks = menu.querySelectorAll("a");

function openMenu() {
  menu.classList.remove("hidden");
  menu.classList.add("flex");
}

function closeMenu() {
  menu.classList.add("hidden");
  menu.classList.remove("flex");
}

// Menü butonuna tıklanınca menüyü aç/kapa
menuButton.addEventListener("click", (event) => {
  // "document" click listener'ının hemen kapatmasını engellemek için
  event.stopPropagation();

  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

// Menü dışında herhangi bir yere tıklanınca menüyü kapat
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) {
    closeMenu();
  }
});

// Menüdeki bir linke tıklanınca menüyü kapat
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// AKTİF NAV LİNKİ
// Ekranda hangi section görünüyorsa, nav menüsünde o linki
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("text-primary-500", isActive);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    // Üstte sabit header (65px) ve altta ekranın yarısı görünmezmiş gibi
    // davran, böylece section ekranın ortasına gelince "aktif" sayılır
    rootMargin: "-65px 0px -50% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => sectionObserver.observe(section));

// TERMİNAL
const terminalInput = document.querySelector("#terminal-input");
const terminalMessages = document.querySelector("#terminal-messages");
const terminalOutput = document.querySelector("#terminal-output");

const sakalar = [
  "Bir div'i dikey ortalamak için gereken süre: 3 saniye Google, 45 dakika Stack Overflow, 1 ömür boyu iç huzursuzluk.",
  "Commit geçmişim bir gerilim romanı gibi:<br>  'düzeltildi'<br>  'gerçekten düzeltildi'<br>  'yemin ederim bu sefer düzeldi'<br>  'geri aldım'",
  "Programcılar neden karanlık modu sever? Çünkü ışık böcek çeker.",
  "Evrendeki en ağır cisim kara delik değil, node_modules klasörü. Işık bile içinden çıkamıyor, ben nasıl çıkayım?",
  "Masamdaki lastik ördeğe derdimi anlattım, çözdüm. Terfiyi o aldı.",
  "CSS'te bir şeyi ortalamak için 3 yöntem bilirsin. Hepsi de çalışmaz.",
  "Bugün kod yazdım. Yarın da düzelteceğim.",
  "Stack Overflow kapanırsa programcıların %80'i işsiz kalır.",
  "Kodum çalışıyor... Neden çalıştığını bilmiyorum ama çalışıyor.",
  "Bir programcının en büyük korkusu: 'Bu kodu kim yazmış?' diye sorup kendi commit'ini görmek.",
  "Frontend: 'Backend hazır mı?' Backend: 'Hâlâ düşünüyorum.'",
  "Git'te force push yaptım. Takım arkadaşlarım hâlâ beni arıyor.",
  "Kod review'da 'LGTM' yazmak, 'Bakmadım ama umarım çalışıyordur' demektir.",
  "Bir bug buldum. Düzelttim. 3 tane yeni bug çıktı. Normal.",
  "JavaScript'te == ile === arasındaki farkı açıklamak, birine neden solak olduğunu anlatmak gibidir.",
  "Production'da çalışan kod ile local'de çalışan kod asla aynı kişi değildir.",
  "Toplantı: 'Bu iş 2 saatte biter.' Gerçek: 2 gün + 4 kahve + 1 sinir krizi.",
  "Kod yazarken en çok kullanılan kısayol: Ctrl + Z",
  "Bir junior: 'Neden çalışmıyor?' Bir senior: 'Neden çalışıyor?'",
  "node_modules silip yeniden yüklemek, modern çağın abdesti gibidir.",
];

let kullanilanSakalar = [];

const commands = {
  saka: () => {
    // Tüm şakalar bittiyse listeyi sıfırla
    if (kullanilanSakalar.length === sakalar.length) {
      kullanilanSakalar = [];
    }

    // Henüz kullanılmamış şakaları filtrele
    const kalanSakalar = sakalar.filter(
      (saka) => !kullanilanSakalar.includes(saka),
    );

    // Kalanlardan rastgele birini seç
    const secilen =
      kalanSakalar[Math.floor(Math.random() * kalanSakalar.length)];

    // Seçileni hafızaya ekle
    kullanilanSakalar.push(secilen);

    return `<span class="text-primary-500">${secilen}</span>`;
  },
  help: () =>
    "Komutlar: <span class='text-primary-500'>saka</span>, <span class='text-primary-500'>help</span>, <span class='text-primary-500'>clear</span>",
};

function printLine(text) {
  const line = document.createElement("p");
  line.innerHTML = text;
  terminalMessages.appendChild(line);
}

function scrollToBottom() {
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const command = terminalInput.value.trim().toLowerCase();
  if (command === "") return;

  // Yazılan komutu, gerçek terminaldeki gibi prompt ile birlikte göster
  printLine(`ob@terminal ~ % ${command}`);

  // "clear" komutu ekranı temizler, cevap gerektirmez
  if (command === "clear") {
    terminalMessages.innerHTML = "";
    terminalInput.value = "";
    return;
  }

  // Komut tanınıyorsa cevabını, tanınmıyorsa hata mesajını yazdır
  const handler = commands[command];
  const response =
    typeof handler === "function" ? handler() : `Command not found: ${command}`;

  printLine(response);

  terminalInput.value = "";
  scrollToBottom();
});

document.getElementById("terminal-output").addEventListener("click", () => {
  document.getElementById("terminal-input").focus();
});
