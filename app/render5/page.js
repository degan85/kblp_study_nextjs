'use client';

import { useState } from 'react';

export default function Render5Page() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  /* 📝 TODO 1: Todo 추가 함수
   * 힌트: setTodos([...todos, { id, text, completed: false }])
   */
  const handleAddTodo = (e) => {
    e.preventDefault();
    // 여기에 코드 작성
    alert('TODO: Todo 추가 기능을 구현하세요');
  };

  /* 📝 TODO 2: Todo 완료 토글 함수
   * 힌트: setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
   */
  const handleToggleTodo = (id) => {
    // 여기에 코드 작성
  };

  /* 📝 TODO 3: Todo 삭제 함수
   * 힌트: setTodos(todos.filter(todo => todo.id !== id))
   */
  const handleDeleteTodo = (id) => {
    // 여기에 코드 작성
  };

  /* 📝 TODO 4: 필터링 함수
   * 힌트: switch문 사용 - active: !completed, completed: completed
   */
  const getFilteredTodos = () => {
    // 여기에 코드 작성
    return todos;
  };

  const filteredTodos = getFilteredTodos();
  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="main-content">
      <h1 className="form-title">Render 5: Todo App 종합 실습</h1>

      {/* 통계 대시보드 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="form-container bg-blue-50 border-2 border-blue-300">
          <p className="text-sm mb-1">전체</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="form-container bg-yellow-50 border-2 border-yellow-300">
          <p className="text-sm mb-1">진행 중</p>
          <p className="text-3xl font-bold">{stats.active}</p>
        </div>
        <div className="form-container bg-green-50 border-2 border-green-300">
          <p className="text-sm mb-1">완료</p>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
      </div>

      {/* Todo 추가 폼 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">✏️ 새 할 일 추가</h2>
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="form-input flex-1"
            placeholder="할 일을 입력하세요..."
          />
          <button type="submit" className="btn btn-primary">
            추가
          </button>
        </form>
      </div>

      {/* 필터 버튼 */}
      <div className="form-container mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            전체 ({stats.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
          >
            진행 중 ({stats.active})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            완료 ({stats.completed})
          </button>
        </div>
      </div>

      {/* Todo 리스트 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">📝 할 일 목록</h2>

        {/* 📝 TODO 5: 빈 리스트 처리
         * 힌트: {filteredTodos.length > 0 ? <리스트> : <빈 메시지>}
         */}
        {filteredTodos.length > 0 ? (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`border rounded-lg p-4 ${
                  todo.completed ? 'bg-green-50' : 'bg-accent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="w-5 h-5"
                  />
                  <p className={todo.completed ? 'line-through flex-1' : 'flex-1'}>
                    {todo.text}
                  </p>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="btn btn-danger text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-accent p-12 rounded-lg text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-muted-foreground">할 일이 없습니다</p>
          </div>
        )}
      </div>

      {/* 핵심 코드 설명 */}
      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. 완료 상태 토글</h3>
            <div className="code-block">
              <pre>{`const handleToggle = (id) => {
  setTodos(
    todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
};`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. 필터링</h3>
            <div className="code-block">
              <pre>{`const getFilteredTodos = () => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};`}</pre>
            </div>
          </div>

          <div className="info-box">
            <h3>🎯 이 예제에서 배운 것</h3>
            <ul className="lesson-list">
              <li>조건부 렌더링: 상태에 따라 다른 UI 표시</li>
              <li>리스트 렌더링: map()으로 Todo 목록 표시</li>
              <li>상태 관리: 추가, 삭제, 완료 토글</li>
              <li>필터링: 전체/진행 중/완료된 할 일 분류</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
