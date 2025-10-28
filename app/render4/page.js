'use client';

import { useState } from 'react';

export default function Render4Page() {
  // 초기 데이터
  const [items, setItems] = useState([
    { id: 1, name: '노트북', category: '전자제품', price: 1200000 },
    { id: 2, name: '키보드', category: '전자제품', price: 89000 },
    { id: 3, name: '마우스', category: '전자제품', price: 35000 },
    { id: 4, name: '책상', category: '가구', price: 250000 },
    { id: 5, name: '의자', category: '가구', price: 180000 },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('전자제품');
  const [newItemPrice, setNewItemPrice] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // 1. 아이템 추가
  const handleAddItem = (e) => {
    e.preventDefault();

    if (!newItemName || !newItemPrice) {
      alert('이름과 가격을 모두 입력하세요');
      return;
    }

    const newItem = {
      id: Date.now(), // 간단한 고유 ID 생성
      name: newItemName,
      category: newItemCategory,
      price: parseInt(newItemPrice),
    };

    setItems([...items, newItem]); // 불변성 유지

    // 입력 필드 초기화
    setNewItemName('');
    setNewItemPrice('');
  };

  // 2. 아이템 삭제
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 3. 검색 필터링
  const getFilteredItems = () => {
    let filtered = [...items];

    // 카테고리 필터
    if (filterCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // 4. 정렬
  const getSortedItems = () => {
    const filtered = getFilteredItems();
    const sorted = [...filtered];

    sorted.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  };

  const displayedItems = getSortedItems();

  return (
    <div className="main-content">
      <h1 className="form-title">Render 4: 동적 리스트</h1>

      {/* 1. 아이템 추가 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ 아이템 추가</h2>

        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">제품명</label>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="form-input"
                placeholder="예: 모니터"
              />
            </div>

            <div>
              <label className="form-label">카테고리</label>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="form-select"
              >
                <option value="전자제품">전자제품</option>
                <option value="가구">가구</option>
                <option value="의류">의류</option>
                <option value="도서">도서</option>
              </select>
            </div>

            <div>
              <label className="form-label">가격</label>
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                className="form-input"
                placeholder="예: 350000"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            ➕ 아이템 추가
          </button>
        </form>
      </div>

      {/* 2. 검색 및 필터 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ 검색 & 필터링</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">검색</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              placeholder="제품명으로 검색..."
            />
          </div>

          <div>
            <label className="form-label">카테고리 필터</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-select"
            >
              <option value="all">전체</option>
              <option value="전자제품">전자제품</option>
              <option value="가구">가구</option>
              <option value="의류">의류</option>
              <option value="도서">도서</option>
            </select>
          </div>
        </div>

        <div className="mt-4 bg-accent p-3 rounded">
          <p className="text-sm">
            <strong>검색 결과:</strong> {displayedItems.length}개 / 전체 {items.length}개
          </p>
        </div>
      </div>

      {/* 3. 정렬 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">3️⃣ 정렬</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">정렬 기준</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="id">ID</option>
              <option value="name">이름</option>
              <option value="price">가격</option>
              <option value="category">카테고리</option>
            </select>
          </div>

          <div>
            <label className="form-label">정렬 순서</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select"
            >
              <option value="asc">오름차순 (⬆️)</option>
              <option value="desc">내림차순 (⬇️)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. 결과 표시 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">4️⃣ 리스트</h2>

        {displayedItems.length > 0 ? (
          <div className="space-y-3">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="bg-accent p-4 rounded-lg border border-border flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      ID: {item.id}
                    </span>
                    <span className="text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {item.category}
                      </span>
                    </span>
                    <span className="text-sm font-semibold">
                      {item.price.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="btn btn-danger ml-4"
                >
                  🗑️ 삭제
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-accent p-8 rounded text-center">
            <p className="text-4xl mb-2">📭</p>
            <p className="text-muted-foreground">표시할 아이템이 없습니다</p>
            {(searchTerm || filterCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className="btn btn-secondary mt-4"
              >
                필터 초기화
              </button>
            )}
          </div>
        )}
      </div>

      {/* 핵심 코드 설명 */}
      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. 아이템 추가 (불변성 유지)</h3>
            <div className="code-block">
              <pre>{`// ❌ 잘못된 방법 - 원본 배열 변경
items.push(newItem);
setItems(items);

// ✅ 올바른 방법 - 새 배열 생성
setItems([...items, newItem]);

// ✅ 다른 방법
setItems(items.concat(newItem));`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. 아이템 삭제</h3>
            <div className="code-block">
              <pre>{`// filter를 사용하여 특정 ID 제외
const handleDelete = (id) => {
  setItems(items.filter(item => item.id !== id));
};

// 인덱스로 삭제
const handleDelete = (index) => {
  setItems(items.filter((_, i) => i !== index));
};`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. 검색/필터링</h3>
            <div className="code-block">
              <pre>{`// 이름으로 검색
const filtered = items.filter(item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// 카테고리로 필터링
const filtered = items.filter(item =>
  item.category === selectedCategory
);

// 여러 조건 조합
const filtered = items.filter(item =>
  item.name.includes(searchTerm) &&
  item.category === selectedCategory &&
  item.price >= minPrice
);`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. 정렬</h3>
            <div className="code-block">
              <pre>{`// 숫자 오름차순
const sorted = [...items].sort((a, b) => a.price - b.price);

// 숫자 내림차순
const sorted = [...items].sort((a, b) => b.price - a.price);

// 문자열 오름차순
const sorted = [...items].sort((a, b) =>
  a.name.localeCompare(b.name)
);

// 문자열 내림차순
const sorted = [...items].sort((a, b) =>
  b.name.localeCompare(a.name)
);`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. filter()와 sort() 조합</h3>
            <div className="code-block">
              <pre>{`const result = items
  .filter(item => item.category === 'electronics')
  .sort((a, b) => b.price - a.price)
  .map(item => (
    <div key={item.id}>{item.name}</div>
  ));`}</pre>
            </div>
          </div>

          <div className="info-box">
            <h3>⚠️ 중요: 배열 불변성</h3>
            <ul className="lesson-list">
              <li><strong>불변성을 지켜야 하는 이유:</strong> React가 변경사항을 감지하고 리렌더링하기 위함</li>
              <li><strong>안전한 메서드:</strong> map(), filter(), slice(), concat(), [...spread]</li>
              <li><strong>위험한 메서드:</strong> push(), pop(), shift(), unshift(), splice(), sort() (원본 변경)</li>
              <li><strong>해결책:</strong> 원본 배열을 복사한 후 작업 (<code>[...items]</code>)</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>⚡ 성능 최적화 팁</h3>
            <ul className="lesson-list">
              <li>filter()와 map()을 한 번에: <code>items.filter(...).map(...)</code></li>
              <li>정렬 전에 필터링: 데이터를 먼저 줄이면 정렬 속도 향상</li>
              <li>검색은 debounce 적용: 타이핑할 때마다 필터링하지 않도록</li>
              <li>useMemo로 계산 결과 캐싱: 불필요한 재계산 방지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
