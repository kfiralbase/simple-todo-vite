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

  const addMany = (count: number) =>
    setTodos((list) => [
      ...list,
      ...Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        text: `New task ${list.length + i + 1}`,
        done: false,
      })),
    ]);

  const toggle = (id: number) =>
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) => setTodos((list) => list.filter((t) => t.id !== id));

  const left = todos.filter((t) => !t.done).length;

  return (
    <main className="page">
      <section className="card">
        <h1>Simple Todo</h1>

        <div className="quick-add">
          {[1, 2, 3].map((n) => (
            <button key={n} type="button" onClick={() => addMany(n)}>
              {n}
            </button>
          ))}
        </div>

        <form className="add" onSubmit={addTodo}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="What needs doing?" />
          <button type="submit">Add</button>
        </form>

        {todos.length === 0 ? (
          <p className="empty">Nothing to do yet.</p>
        ) : (
          <ul className="list">
            {todos.map((t) => (
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
        )}

        <p className="footer">{left} left</p>
      </section>
    </main>
  );
};

export default App;
