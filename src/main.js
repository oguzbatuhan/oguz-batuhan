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
    link.classList.toggle("text-orange-500", isActive);
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

const commands = {
  help: `<br>-----------><br> Available commands: history, joke, bug, debug, coffee, fortune, sudo, sleep, deploy, exit, clear`,

  history: `<br>-----------><br>
1843  Ada Lovelace → İlk algoritma.<br>
1972  C → Sistem programlamasının temeli.<br>
1989  Web → İnternet dünyaya açıldı.<br>
1995  JavaScript → Web etkileşim kazandı.<br>
2009  Python 3 → Okunabilir kod.<br>
2026  Biz → Hâlâ bug arıyoruz.
`,

  joke: `<br>-----------><br>
Kod neden çalışmıyor?<br>
Çünkü çalışmak istemiyor.
`,

  bug: `<br>-----------><br>
Bug bulundu.<br>
...
<br>
Bug, beni buldu.
`,

  debug: `<br>-----------><br>
Hata aranıyor...<br>
Hata bulundu.<br>
Kodda değil, bende.
`,

  coffee: `<br>-----------><br>
☕ Kahve yükleniyor...
<br>
Tamam. Şimdi çalışabiliriz.
`,

  fortune: `<br>-----------><br>
Bugün kodun çalışacak.
<br>
Neden?<br>
Bilmiyorum.
`,

  sudo: `<br>-----------><br>
[sudo] password for ob:
<br>
Şifre değil,<br>
sabır gerekiyor.
`,

  sleep: `<br>-----------><br>
Uyku başlatılıyor...
<br>
"Şu kodu da düzelteyim."
`,

  deploy: `<br>-----------><br>
Build ✓<br>
Tests ✓<br>
Deploy ✓<br>
<br>
Şimdi dua et.
`,

  exit: `<br>-----------><br>
Çıkış yapılamıyor.
<br>
Daha siteyi gezmedin. :)
`,
};

// Ekrana yeni bir satır ekleyen yardımcı fonksiyon
function printLine(text) {
  const line = document.createElement("p");
  line.innerHTML = text;
  terminalMessages.appendChild(line);
}

// Terminali en alta kaydıran yardımcı fonksiyon
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
  const response = commands[command] ?? `Command not found: ${command}`;
  printLine(response);

  terminalInput.value = "";
  scrollToBottom();
});
