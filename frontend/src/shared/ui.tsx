import type { FormEvent, ReactNode } from 'react';

export function ErrorMessage({ error }: { error: Error | null }) {
  return error && <p className="error" role="alert">{error.message}</p>;
}

export function LoadState({ pending, error, retry }: { pending: boolean; error: Error | null; retry: () => void }) {
  if (pending) return <p className="empty" role="status">Carregando…</p>;
  if (!error) return null;
  return <div className="panel"><ErrorMessage error={error} /><button onClick={retry}>Tentar novamente</button></div>;
}

export function PageHeading({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <header className="page-heading"><div><h1>{title}</h1><p>{description}</p></div>{action}</header>;
}

export function FormPanel({ title, onSubmit, busy, error, children }: {
  title: string; onSubmit: (data: FormData) => void; busy: boolean; error: Error | null; children: ReactNode;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!busy) onSubmit(new FormData(event.currentTarget));
  }
  return <form className="panel form-panel" onSubmit={submit}>
    <h2>{title}</h2><ErrorMessage error={error} />
    <fieldset disabled={busy}>{children}</fieldset>
  </form>;
}
