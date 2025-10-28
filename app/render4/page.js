'use client';

import { useState } from 'react';

export default function Render4Page() {
  const [items, setItems] = useState([
    { id: 1, name: '노트북', price: 1200000 },
    { id: 2, name: '키보드', price: 89000 },
    { id: 3, name: '마우스', price: 35000 },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  /* 📝 TODO 1: 아이템 추가 함수
   * 힌트: setItems([...items, newItem]) - 불변성 유지
   */
  const handleAddItem = (e) => {
    e.preventDefault();
    // 여기에 코드 작성
    alert('TODO: 아이템 추가 기능을 구현하세요');
  };

  /* 📝 TODO 2: 아이템 삭제 함수
   * 힌트: setItems(items.filter(item => item.id !== id))
   */
  const handleDeleteItem = (id) => {
    // 여기에 코드 작성
    alert('TODO: 아이템 삭제 기능을 구현하세요');
  };

  /* 📝 TODO 3: 검색 필터링
   * 힌트: items.filter(item => item.name.includes(searchTerm))
   */
  const getFilteredItems = () => {
    // 여기에 코드 작성
    return items;
  };

  const displayedItems = getFilteredItems();

  return (
    <div className="main-content">
      <h1 className="form-title">Render 4: 동적 리스트</h1>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ 아이템 추가</h2>

        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="form-input"
              placeholder="제품명"
            />
            <input
              type="number"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="form-input"
              placeholder="가격"
            />
          </div>
          <button type="submit" className="btn btn-primary">➕ 추가</button>
        </form>
      </div>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ 검색</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          placeholder="검색..."
        />
      </div>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">3️⃣ 리스트</h2>
        {displayedItems.length > 0 ? (
          <div className="space-y-3">
            {displayedItems.map((item) => (
              <div key={item.id} className="bg-accent p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">{item.price.toLocaleString()}원</p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="btn btn-danger"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">항목이 없습니다</p>
        )}
      </div>

      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. 아이템 추가 (불변성 유지)</h3>
            <div className="code-block">
              <pre>{`setItems([...items, newItem]);`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. 아이템 삭제</h3>
            <div className="code-block">
              <pre>{`setItems(items.filter(item => item.id !== id));`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. 검색/필터링</h3>
            <div className="code-block">
              <pre>{`const filtered = items.filter(item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
