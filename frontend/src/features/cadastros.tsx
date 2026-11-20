import { useState } from 'react';
import { money, useData, useOperation } from '../shared/api';
import type { Cliente, Produto } from '../shared/api';
import { ErrorMessage, FormPanel, LoadState, PageHeading } from '../shared/ui';

function isProduct(record: Cliente): record is Produto {
  return 'preco' in record;
}

export function Cadastros({ products = false }: { products?: boolean }) {
  const path = products ? '/produtos' : '/clientes';
  const singular = products ? 'produto' : 'cliente';
  const records = useData<(Cliente | Produto)[]>(path);
  const operation = useOperation([path]);
  const [selected, setSelected] = useState<Cliente | Produto | 'new' | null>(null);
  const [search, setSearch] = useState('');
  const editing = selected && selected !== 'new' ? selected : null;
  const product = editing && isProduct(editing) ? editing : null;
  const filtered = records.data?.filter((record) => record.nome.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR')));

  return <>
    <PageHeading title={products ? 'Produtos' : 'Clientes'} description={products ? 'Gerencie o catálogo disponível para lançamento.' : 'Gerencie o cadastro usado para abrir comandas.'}
      action={<button className="primary" disabled={operation.isPending} onClick={() => { operation.reset(); setSelected('new'); }}>Novo {singular}</button>} />
    {selected && <FormPanel key={editing?.id ?? 'new'} title={`${editing ? 'Editar' : 'Novo'} ${singular}`} busy={operation.isPending} error={operation.error}
      onSubmit={(data) => {
        const nome = String(data.get('nome')).trim();
        const body = products ? { nome, descricao: String(data.get('descricao')).trim(), preco: Number(data.get('preco')) } : { nome };
        operation.mutate({ path: editing ? `${path}/${editing.id}` : path, method: editing ? 'PUT' : 'POST', body },
          { onSuccess: () => setSelected(null) });
      }}>
      <label>Nome<input name="nome" defaultValue={editing?.nome} required /></label>
      {products && <>
        <label>Descrição<textarea name="descricao" defaultValue={product?.descricao ?? ''} /></label>
        <label>Preço (R$)<input type="number" name="preco" min="0.01" step="0.01" defaultValue={product?.preco} required /></label>
      </>}
      <div className="inline"><button className="primary">Salvar</button><button type="button" onClick={() => { operation.reset(); setSelected(null); }}>Cancelar</button></div>
    </FormPanel>}
    <label className="search">Buscar {singular}<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
    {!selected && <ErrorMessage error={operation.error} />}
    <LoadState pending={records.isPending} error={records.error} retry={() => { void records.refetch(); }} />
    {filtered?.length === 0 && <p className="empty">Nenhum {singular} encontrado.</p>}
    {!!filtered?.length && <div className="panel">{filtered.map((record) => <div className={products ? 'row product-row' : 'row'} key={record.id}>
      <div><strong>{record.nome}</strong>{isProduct(record) && record.descricao && <small>{record.descricao}</small>}</div>
      {isProduct(record) && <div><strong>{money(record.preco)}</strong><small>{record.disponivel ? 'Disponível' : 'Indisponível'}</small></div>}
      <div className="inline">
        <button disabled={operation.isPending} onClick={() => { operation.reset(); setSelected(record); }}>Editar</button>
        {isProduct(record) && <button disabled={operation.isPending || !!selected} onClick={() => operation.mutate({
          path: `${path}/${record.id}/disponibilidade`, method: 'PATCH', body: { disponivel: !record.disponivel },
        })}>{record.disponivel ? 'Indisponibilizar' : 'Disponibilizar'}</button>}
      </div>
    </div>)}</div>}
  </>;
}
