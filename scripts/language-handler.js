// Language Switcher
document.addEventListener('DOMContentLoaded', function() {
   const langSwitcher = document.getElementById('switcher-lang');
   const langOptions = document.querySelector('.lang-options');
   const langOptionBtns = document.querySelectorAll('.lang-option');
   
   // Toggle dropdown
   langSwitcher.addEventListener('click', () => {
       langOptions.classList.toggle('show');
   });

   // Close dropdown when clicking outside
   document.addEventListener('click', (e) => {
       if (!e.target.closest('.lang-switcher-container')) {
           langOptions.classList.remove('show');
       }
   });

   function loadTranslation(lang) {
       // Update button content
       const flagSrc = lang === 'en' ? 'assets/united-kingdom.png' : 'assets/brazil.png';
       const langText = lang === 'en' ? 'EN' : 'PT-BR';
       langSwitcher.innerHTML = `
           <img src="${flagSrc}" alt="${langText} flag" class="flag-icon">
           <span>${langText}</span>
       `;

       // Load translations
       fetch("./translations/translation.json")
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               document.querySelectorAll("[data-translate]").forEach(element => {
                   const key = element.getAttribute("data-translate");
                   if (data[lang] && data[lang][key]) {
                       element.textContent = data[lang][key];
                   } else {
                       console.warn(`Missing translation for key "${key}" in language "${lang}"`);
                   }
               });
               localStorage.setItem("selectedLanguage", lang);
               langOptions.classList.remove('show'); // Close dropdown after selection
           })
           .catch(error => {
               console.error("Translation error:", error);
               alert("Error loading translations. Please try again later.");
           });
   }

   // Initialize language
   const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
   loadTranslation(savedLanguage);

   // Handle language option clicks
   langOptionBtns.forEach(option => {
       option.addEventListener('click', () => {
           const lang = option.getAttribute('data-value');
           loadTranslation(lang);
       });
   });
});
