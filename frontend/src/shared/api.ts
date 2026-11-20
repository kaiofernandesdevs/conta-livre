import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const baseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export async function request<T>(path: string, method = 'GET', body?: object): Promise<T> {
  let response: Response;
  try {
    response = await fetch(baseUrl + path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(method === 'GET'
      ? 'Não foi possível conectar à API. Verifique a conexão e tente novamente.'
      : 'O resultado do envio é incerto. Atualize os dados antes de repetir a operação.');
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.erro || `A API retornou o erro ${response.status}.`);
  }
  const content = await response.text();
  return (content ? JSON.parse(content) : null) as T;
}

export type Cliente = { id: number; nome: string };
export type Produto = { id: number; nome: string; descricao: string | null; preco: number | string; disponivel: boolean | number };
export type Conta = { id: number; clienteId: number; status: 'EM_ABERTO' | 'PAGO'; valorTotal: number | string; valorPago: number | string; desconto: number | string };
export type Item = { id: number; produtoId: number; quantidade: number; valorUnitario: number | string };

export function useData<T>(path: string) {
  return useQuery({ queryKey: [path], queryFn: () => request<T>(path) });
}

type Operation = { path: string; method: string; body?: object };

export function useOperation<T = unknown>(paths: string[]) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ path, method, body }: Operation) => request<T>(path, method, body),
    onSettled: () => Promise.all(paths.map((path) => client.invalidateQueries({ queryKey: [path], exact: true }))),
  });
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const money = (value: string | number) => brl.format(Number(value));
export const cents = (value: string | number) => Math.round(Number(value) * 100);
