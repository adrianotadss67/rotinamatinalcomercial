if ('serviceWorker' in navigator) {
      window.addEventListener('DOMContentLoaded', function() {
         navigator.serviceWorker.register('./sw.js')
           .then(function(registration) {
              console.log('Service Worker registrado com sucesso:', registration.scope);
            })
           .catch(function(error) {
           console.log('Falha ao registrar o Service Worker:', error);
       });
   });
}
