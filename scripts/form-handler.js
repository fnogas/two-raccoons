document.addEventListener("DOMContentLoaded", function () {
   document.querySelector("form").addEventListener("submit", async function (event) {
       event.preventDefault(); // Impede o redirecionamento padrão

       const form = event.target;
       const formData = new FormData(form);

       const response = await fetch(form.action, {
           method: form.method,
           body: formData,
           headers: {
               "Accept": "application/json"
           }
       });

       if (response.ok) {
           // Create success popup
           const popup = document.createElement('div');
           popup.classList.add('popup', 'popup-success', 'popup-success-message');
           popup.innerHTML = `
                <h3>Success!</h3>
                <img src="assets/tworaccoons_reduzido2_3D.png" alt="Success icon" style="margin-bottom: 15px;">
                <p>Message sent successfully!</p>
                <button onclick="this.parentElement.remove()">Close</button>
           `;
           document.body.appendChild(popup);
           form.reset();
       } else {
           // Create error popup
           const popup = document.createElement('div');
           popup.className = 'popup popup-error';
           popup.innerHTML = `
               <h3>Error</h3>
               <p>An error occurred. Please try again.</p>
               <button onclick="this.parentElement.remove()">Close</button>
           `;
           document.body.appendChild(popup);
       }
   });
});
