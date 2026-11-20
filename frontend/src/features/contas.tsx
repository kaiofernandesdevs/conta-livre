import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cents, money, useData, useOperation } from '../shared/api';
import type { Cliente, Conta, Item, Produto } from '../shared/api';
import { ErrorMessage, FormPanel, LoadState, PageHeading } from '../shared/ui';

export function Contas() {
  const contas = useData<Conta[]>('/contas');
  const clientes = useData<Cliente[]>('/clientes');
  const operation = useOperation<{ id: number }>(['/contas']);
  const navigate = useNavigate();
  const [status, setStatus] = useState<Conta['status']>('EM_ABERTO');
  const [opening, setOpening] = useState(false);
  const available = clientes.data?.filter((cliente) => !contas.data?.some(
    (conta) => conta.clienteId === cliente.id && conta.status === 'EM_ABERTO',
  ));
  const filtered = contas.data?.filter((conta) => conta.status === status);

  return <>
    <PageHeading title="Contas" description="Acompanhe o consumo e os pagamentos de cada comanda."
      action={<button className="primary" onClick={() => setOpening(!opening)} aria-expanded={opening}>{opening ? 'Cancelar' : 'Abrir conta'}</button>} />
    {opening && <FormPanel title="Nova conta" busy={operation.isPending} error={operation.error} onSubmit={(data) => {
      operation.mutate({ path: '/contas', method: 'POST', body: { clienteId: Number(data.get('clienteId')) } },
        { onSuccess: ({ id }) => navigate(`/contas/${id}`) });
    }}>
      <label>Cliente<select name="clienteId" defaultValue="" required>
        <option value="" disabled>Selecione um cliente</option>
        {available?.map((cliente) => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
      </select></label>
      {available?.length === 0 && <p>Cadastre um cliente ou selecione uma conta aberta. <Link to="/clientes">Ver clientes</Link></p>}
      <button className="primary" disabled={!available?.length || !contas.data || !!contas.error || !!clientes.error}>Confirmar abertura</button>
    </FormPanel>}
    <div className="filters" aria-label="Filtrar contas">
      <button aria-pressed={status === 'EM_ABERTO'} onClick={() => setStatus('EM_ABERTO')}>Em aberto</button>
      <button aria-pressed={status === 'PAGO'} onClick={() => setStatus('PAGO')}>Pagas</button>
    </div>
    <LoadState pending={contas.isPending || clientes.isPending} error={contas.error || clientes.error}
      retry={() => { void contas.refetch(); void clientes.refetch(); }} />
    {filtered?.length === 0 && <p className="empty">Nenhuma conta {status === 'PAGO' ? 'paga' : 'em aberto'}.</p>}
    <div className="account-grid">{filtered?.map((conta) => <Link className="panel account" key={conta.id} to={`/contas/${conta.id}`}>
      <span className="muted">Comanda #{conta.id}</span>
      <strong>{clientes.data?.find((cliente) => cliente.id === conta.clienteId)?.nome ?? `Cliente #${conta.clienteId}`}</strong>
      <span className="account-total">{money(conta.valorTotal)}</span>
      <span className="muted">Pago {money(conta.valorPago)}</span>
    </Link>)}</div>
  </>;
}

export function ContaDetalhe() {
  const { id } = useParams();
  return <Detalhe key={id} path={`/contas/${id}`} />;
}

function Detalhe({ path }: { path: string }) {
  const conta = useData<Conta | null>(path);
  const itemsPath = `${path}/itens`;
  const itens = useData<Item[]>(itemsPath);
  const clientes = useData<Cliente[]>('/clientes');
  const produtos = useData<Produto[]>('/produtos');
  const operation = useOperation(['/contas', path, itemsPath]);
  const [payment, setPayment] = useState('');
  const [discount, setDiscount] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [notice, setNotice] = useState('');

  const error = conta.error || itens.error || clientes.error || produtos.error;
  const pending = conta.isPending || itens.isPending || clientes.isPending || produtos.isPending;
  if (pending || error) return <><Link to="/contas">Voltar para contas</Link><LoadState pending={pending} error={error}
    retry={() => { void conta.refetch(); void itens.refetch(); void clientes.refetch(); void produtos.refetch(); }} /></>;
  const record = conta.data;
  if (!record) return <><Link to="/contas">Voltar para contas</Link><p className="empty">Conta não encontrada.</p></>;

  const open = record.status === 'EM_ABERTO';
  const total = cents(record.valorTotal);
  const paid = cents(record.valorPago);
  const appliedDiscount = open ? cents(discount || 0) : cents(record.desconto);
  const balance = Math.max(0, total - paid - appliedDiscount);
  const products = produtos.data ?? [];
  const available = products.filter((product) => product.disponivel);
  const busy = operation.isPending;

  function submit(target: string, method: string, body: object | undefined, message: string, reset?: () => void) {
    setNotice('');
    operation.mutate({ path: target, method, body }, { onSuccess: () => { setNotice(message); reset?.(); } });
  }

  return <>
    <Link className="back" to="/contas">Voltar para contas</Link>
    <PageHeading title={clientes.data?.find((cliente) => cliente.id === record.clienteId)?.nome ?? `Cliente #${record.clienteId}`}
      description={`Comanda #${record.id}`}
      action={<span className="badge">{open ? 'Em aberto' : 'Paga'}</span>} />
    <div className="summary">
      <div><span>Total do consumo</span><strong>{money(record.valorTotal)}</strong></div>
      <div><span>Valor pago</span><strong>{money(record.valorPago)}</strong></div>
      <div><span>{open && appliedDiscount > 0 ? 'Saldo com desconto' : 'Saldo'}</span><strong>{money(balance / 100)}</strong></div>
    </div>
    <ErrorMessage error={operation.error} />
    {notice && <p className="notice" role="status">{notice}</p>}
    <div className="detail-grid">
      <section className="panel"><h2>Consumo</h2>
        {itens.data?.length === 0 && <p className="muted">Nenhum item lançado.</p>}
        {itens.data?.map((item) => <div className="row" key={item.id}>
          <div><strong>{products.find((product) => product.id === item.produtoId)?.nome ?? `Produto #${item.produtoId}`}</strong>
            <small>{item.quantidade} × {money(item.valorUnitario)}</small></div>
          <strong>{money(item.quantidade * Number(item.valorUnitario))}</strong>
          {open && (editId === item.id
            ? <form className="inline" onSubmit={(event) => {
              event.preventDefault();
              if (busy) return;
              const quantidade = Number(new FormData(event.currentTarget).get('quantidade'));
              submit(`${itemsPath}/${item.id}`, 'PUT', { quantidade }, 'Quantidade atualizada.', () => setEditId(null));
            }}>
              <input aria-label="Nova quantidade" name="quantidade" type="number" min="1" step="1" required defaultValue={item.quantidade} disabled={busy} />
              <button disabled={busy}>Salvar</button><button type="button" onClick={() => setEditId(null)} disabled={busy}>Cancelar</button>
            </form>
            : <div className="inline">
              <button onClick={() => setEditId(item.id)} disabled={busy}>Editar</button>
              <button className="danger" disabled={busy} onClick={() => {
                if (window.confirm('Remover este item da comanda?')) submit(`${itemsPath}/${item.id}`, 'DELETE', undefined, 'Item removido.');
              }}>Remover</button>
            </div>)}
        </div>)}
      </section>
      {open && <div className="stack">
        <FormPanel title="Adicionar item" busy={busy} error={null} onSubmit={(data) => submit(itemsPath, 'POST', {
          produtoId: Number(data.get('produtoId')), quantidade: Number(data.get('quantidade')),
        }, 'Item adicionado.')}>
          <label>Produto<select name="produtoId" defaultValue="" required>
            <option value="" disabled>Selecione um produto</option>
            {available.map((product) => <option value={product.id} key={product.id}>{product.nome} · {money(product.preco)}</option>)}
          </select></label>
          {available.length === 0 && <Link to="/produtos">Ver catálogo de produtos</Link>}
          <label>Quantidade<input name="quantidade" type="number" min="1" step="1" defaultValue="1" required /></label>
          <button className="primary" disabled={!available.length}>Adicionar</button>
        </FormPanel>
        <FormPanel title="Registrar pagamento" busy={busy} error={null} onSubmit={() =>
          submit(`${path}/pagamentos`, 'POST', { valorPagamento: Number(payment) }, 'Pagamento registrado.', () => setPayment(''))}>
          <label>Valor (R$)<input type="number" min="0.01" step="0.01" required value={payment} onChange={(event) => setPayment(event.target.value)} /></label>
          <button className="primary">Registrar pagamento</button>
        </FormPanel>
        <FormPanel title="Fechar conta" busy={busy} error={null} onSubmit={() => {
          if (balance === 0 && appliedDiscount <= total && window.confirm('Fechar esta conta?')) {
            submit(`${path}/fechar`, 'PATCH', { desconto: Number(discount || 0) }, 'Conta fechada.', () => setDiscount(''));
          }
        }}>
          <label>Desconto (R$)<input type="number" min="0" max={total / 100} step="0.01" value={discount} onChange={(event) => setDiscount(event.target.value)} /></label>
          {balance > 0 && <p className="muted">Registre o saldo de {money(balance / 100)} para fechar.</p>}
          <button className="primary" disabled={balance > 0}>Fechar conta</button>
        </FormPanel>
      </div>}
    </div>
  </>;
}
