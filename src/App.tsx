import { useState, type FormEvent } from "react";

type Todo = { id: number; text: string; done: boolean };

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Try the app", done: true },
    { id: 2, text: "Add a task", done: false },
  ]);
  const [text, setText] = useState("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos((list) => [...list, { id: Date.now(), text: value, done: false }]);
    setText("");
  };

  const toggle = (id: number) =>
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) => setTodos((list) => list.filter((t) => t.id !== id));

  const left = todos.filter((t) => !t.done).length;

  const [sort, setSort] = useState<"az" | "newest" | "status" | null>(null);
  const sorted = [...todos].sort((a, b) =>
    sort === "az" ? a.text.localeCompare(b.text)
    : sort === "newest" ? b.id - a.id
    : sort === "status" ? Number(a.done) - Number(b.done)
    : 0
  );

  return (
    <main className="page">
      <section className="card">
        <h1>Simple Todo</h1>

        <form className="add" onSubmit={addTodo}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="What needs doing?" />
          <button type="submit">Add</button>
        </form>

        {todos.length === 0 ? (
          <p className="empty">Nothing to do yet.</p>
        ) : (
          <>
          <div className="sort" style={{ display: "flex", gap: 8, margin: "12px 0" }}>
            {([["az", "A–Z"], ["newest", "Newest"], ["status", "Status"]] as const).map(([key, label]) => (
              <button key={key} type="button" aria-pressed={sort === key} style={{ fontWeight: sort === key ? 700 : 400 }}
                onClick={() => setSort(sort === key ? null : key)}>
                {label}
              </button>
            ))}
          </div>
          <ul className="list">
            {sorted.map((t) => (
              <li key={t.id} className={t.done ? "done" : ""}>
                <label>
                  <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                  <span>{t.text}</span>
                </label>
                <button className="remove" onClick={() => remove(t.id)} aria-label={`Delete ${t.text}`}>
                  ×
                </button>
              </li>
            ))}
          </ul>
          </>
        )}

        <p className="footer">{left} left</p>
      </section>
    </main>
  );
};

export default App;
