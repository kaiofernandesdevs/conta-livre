self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(fetch(event.request).catch(() => new Response(
    '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Conta Livre</title><h1>Sem conexão</h1><p>Reconecte-se e recarregue a página para acessar o Conta Livre.</p></html>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )));
});
