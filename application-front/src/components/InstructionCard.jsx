import React, { useState } from "react";
import "./InstructionCard.scss";

const InstructionCard = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const inc = () => setCount((c) => c + 1);
  const dec = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => {
    setCount(0);
    setName("");
  };

  return (
    <div className="instruction">
      <h3 className="instruction__title">Как работает useState в React?</h3>

      <p className="instruction__text">
        <b>State (состояние)</b> — данные внутри компонента. Меняем через{" "}
        <code>setState</code> и React перерисовывает компонент.
      </p>

      <ol className="instruction__list">
        <li>Импорт: <code>import &#123; useState &#125; from "react";</code></li>
        <li>Создание: <code>const [value, setValue] = useState(initial);</code></li>
        <li>Выводим значение в JSX: <code>&#123;value&#125;</code></li>
        <li>Меняем только через <code>setValue(newValue)</code>.</li>
      </ol>

      <div className="instruction__demo">
        <h4 className="instruction__subtitle">Живой пример</h4>

        <div className="demo-block">
          <div className="demo-row">
            <span className="demo-label">Счётчик:</span>
            <div className="btn-group">
              <button className="btn" onClick={dec}>–</button>
              <span className="counter">{count}</span>
              <button className="btn" onClick={inc}>+</button>
            </div>
          </div>

          <div className="demo-row">
            <label className="demo-label" htmlFor="name">Имя:</label>
            <input
              id="name"
              className="input"
              placeholder="введи текст"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="demo-row">
            <span className="demo-label">Результат:</span>
            <div className="result">
              Привет, {name || "незнакомец"}! Кликал раз: <b>{count}</b>.
            </div>
          </div>

          <div className="demo-row">
            <button className="btn-outline" onClick={reset}>Сбросить</button>
          </div>
        </div>

        <p className="instruction__note">
          ⚡ Обрати внимание: для счётчика используем форму{" "}
          <code>setCount(c =&gt; c + 1)</code> — так надёжнее при быстрых кликах.
        </p>
      </div>
    </div>
  );
};

export default InstructionCard;