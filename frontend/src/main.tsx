import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { ContaDetalhe, Contas } from './features/contas';
import { Cadastros } from './features/cadastros';
import './styles.css';

const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <HashRouter>
      <div className="layout">
        <aside className="sidebar">
          <div className="brand"><span aria-hidden="true">CL</span>Conta Livre</div>
          <nav aria-label="Menu principal">
            <NavLink to="/contas">Contas</NavLink>
            <NavLink to="/clientes">Clientes</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
          </nav>
        </aside>
        <main>
          <Routes>
            <Route path="/contas" element={<Contas />} />
            <Route path="/contas/:id" element={<ContaDetalhe />} />
            <Route path="/clientes" element={<Cadastros key="clientes" />} />
            <Route path="/produtos" element={<Cadastros key="produtos" products />} />
            <Route path="*" element={<Navigate to="/contas" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  </QueryClientProvider>,
);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  void navigator.serviceWorker.register('/sw.js').catch((error) => console.error('Falha ao registrar o serviço do app', error));
}
