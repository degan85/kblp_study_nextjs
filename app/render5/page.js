'use client';

import { useState, useEffect } from 'react';

export default function Render5Page() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 로컬 스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Todo 추가
  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      alert('할 일을 입력하세요');
      return;
    }

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  // Todo 완료 토글
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todo 삭제
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Todo 수정 시작
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Todo 수정 완료
  const handleSaveEdit = () => {
    if (!editText.trim()) {
      alert('할 일을 입력하세요');
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );

    setEditingId(null);
    setEditText('');
  };

  // Todo 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // 완료된 Todo 모두 삭제
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // 모두 완료/미완료로 변경
  const handleToggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  // 필터링된 Todo 가져오기
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  // 통계
  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="main-content">
      <h1 className="form-title">Render 5: Todo App 종합 실습</h1>

      {/* 통계 대시보드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="form-container bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300">
          <p className="text-sm text-muted-foreground mb-1">전체</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="form-container bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300">
          <p className="text-sm text-muted-foreground mb-1">진행 중</p>
          <p className="text-3xl font-bold">{stats.active}</p>
        </div>
        <div className="form-container bg-green-50 dark:bg-green-900/20 border-2 border-green-300">
          <p className="text-sm text-muted-foreground mb-1">완료</p>
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

      {/* 필터 & 액션 */}
      <div className="form-container mb-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* 필터 버튼 */}
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

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            {todos.length > 0 && (
              <button onClick={handleToggleAll} className="btn btn-secondary text-sm">
                {todos.every((t) => t.completed) ? '모두 미완료로' : '모두 완료로'}
              </button>
            )}
            {stats.completed > 0 && (
              <button onClick={handleClearCompleted} className="btn btn-danger text-sm">
                완료된 항목 삭제
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Todo 리스트 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">
          📝 할 일 목록
          {filter !== 'all' && (
            <span className="text-sm text-muted-foreground ml-2">
              (필터링됨: {filteredTodos.length}개)
            </span>
          )}
        </h2>

        {filteredTodos.length > 0 ? (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`border border-border rounded-lg p-4 transition-all ${
                  todo.completed
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-300'
                    : 'bg-accent'
                }`}
              >
                {editingId === todo.id ? (
                  // 수정 모드
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="form-input flex-1"
                      autoFocus
                    />
                    <button onClick={handleSaveEdit} className="btn btn-primary">
                      저장
                    </button>
                    <button onClick={handleCancelEdit} className="btn btn-secondary">
                      취소
                    </button>
                  </div>
                ) : (
                  // 일반 모드
                  <div className="flex items-center gap-3">
                    {/* 체크박스 */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="w-5 h-5 cursor-pointer"
                    />

                    {/* Todo 텍스트 */}
                    <div className="flex-1">
                      <p
                        className={`${
                          todo.completed
                            ? 'line-through text-muted-foreground'
                            : 'font-medium'
                        }`}
                      >
                        {todo.text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(todo.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* 상태 배지 */}
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        todo.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {todo.completed ? '✅ 완료' : '⏳ 진행 중'}
                    </span>

                    {/* 액션 버튼 */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(todo)}
                        className="btn btn-secondary text-sm"
                        disabled={todo.completed}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="btn btn-danger text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // 빈 상태
          <div className="bg-accent p-12 rounded-lg text-center">
            {filter === 'all' ? (
              <>
                <p className="text-4xl mb-3">📝</p>
                <p className="text-muted-foreground mb-2">아직 할 일이 없습니다</p>
                <p className="text-sm text-muted-foreground">
                  위에서 새로운 할 일을 추가해보세요!
                </p>
              </>
            ) : filter === 'active' ? (
              <>
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-muted-foreground mb-2">진행 중인 할 일이 없습니다</p>
                <p className="text-sm text-muted-foreground">
                  모든 할 일을 완료했거나, 아직 추가하지 않았습니다
                </p>
              </>
            ) : (
              <>
                <p className="text-4xl mb-3">✅</p>
                <p className="text-muted-foreground mb-2">완료된 할 일이 없습니다</p>
                <p className="text-sm text-muted-foreground">
                  할 일을 완료하면 여기에 표시됩니다
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* 핵심 코드 설명 */}
      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. 조건부 렌더링 + 리스트 결합</h3>
            <div className="code-block">
              <pre>{`{filteredTodos.length > 0 ? (
  <div>
    {filteredTodos.map(todo => (
      <div key={todo.id}>{todo.text}</div>
    ))}
  </div>
) : (
  <p>할 일이 없습니다</p>
)}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. 완료 상태 토글</h3>
            <div className="code-block">
              <pre>{`const handleToggleTodo = (id) => {
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
            <h3 className="font-semibold mb-2">3. 필터링</h3>
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

          <div>
            <h3 className="font-semibold mb-2">4. 로컬 스토리지 활용</h3>
            <div className="code-block">
              <pre>{`// 저장
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

// 불러오기
useEffect(() => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    setTodos(JSON.parse(saved));
  }
}, []);`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. 조건부 스타일링</h3>
            <div className="code-block">
              <pre>{`<div className={\`
  base-class
  \${todo.completed
    ? 'completed-class'
    : 'active-class'}
\`}>
  <p className={todo.completed ? 'line-through' : ''}>
    {todo.text}
  </p>
</div>`}</pre>
            </div>
          </div>

          <div className="info-box">
            <h3>🎯 이 예제에서 배운 것</h3>
            <ul className="lesson-list">
              <li>조건부 렌더링: 상태에 따라 다른 UI 표시</li>
              <li>리스트 렌더링: map()으로 Todo 목록 표시</li>
              <li>상태 관리: 추가, 삭제, 수정, 완료 토글</li>
              <li>필터링: 전체/진행 중/완료된 할 일 분류</li>
              <li>로컬 스토리지: 데이터 영속성 유지</li>
              <li>조건부 스타일: 완료된 항목 시각적 구분</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>🚀 추가로 구현해볼 기능</h3>
            <ul className="lesson-list">
              <li>우선순위 설정 (높음/중간/낮음)</li>
              <li>마감일 설정 및 알림</li>
              <li>태그/카테고리 추가</li>
              <li>검색 기능</li>
              <li>정렬 기능 (생성일, 마감일, 우선순위)</li>
              <li>Drag & Drop으로 순서 변경</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
