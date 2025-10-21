import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// 데이터 저장 경로
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'forms.json');

// 데이터 디렉토리 확인 및 생성
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// GET: 저장된 폼 데이터 불러오기
export async function GET(request) {
  try {
    await ensureDataDir();

    // 파일 존재 여부 확인
    try {
      await fs.access(DATA_FILE);
    } catch {
      // 파일이 없으면 빈 배열 반환
      return NextResponse.json([]);
    }

    // 파일 읽기
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const forms = JSON.parse(data);

    return NextResponse.json(forms);
  } catch (error) {
    console.error('데이터 읽기 오류:', error);
    return NextResponse.json(
      { error: '데이터를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 새로운 폼 데이터 저장
export async function POST(request) {
  try {
    await ensureDataDir();

    // 요청 본문 파싱
    const newForm = await request.json();

    // 기존 데이터 읽기
    let forms = [];
    try {
      await fs.access(DATA_FILE);
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      forms = JSON.parse(data);
    } catch {
      // 파일이 없으면 빈 배열로 시작
      forms = [];
    }

    // 새 폼 데이터 추가 (ID와 타임스탬프 포함)
    const formWithMetadata = {
      id: Date.now().toString(),
      ...newForm,
      createdAt: new Date().toISOString()
    };

    forms.push(formWithMetadata);

    // 파일에 저장
    await fs.writeFile(DATA_FILE, JSON.stringify(forms, null, 2));

    return NextResponse.json({
      message: '데이터가 성공적으로 저장되었습니다.',
      data: formWithMetadata
    });
  } catch (error) {
    console.error('데이터 저장 오류:', error);
    return NextResponse.json(
      { error: '데이터 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 특정 ID의 폼 데이터 삭제
export async function DELETE(request) {
  try {
    await ensureDataDir();

    // URL에서 ID 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 기존 데이터 읽기
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    let forms = JSON.parse(data);

    // ID에 해당하는 항목 필터링
    const filteredForms = forms.filter(form => form.id !== id);

    if (forms.length === filteredForms.length) {
      return NextResponse.json(
        { error: '해당 ID를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 파일에 저장
    await fs.writeFile(DATA_FILE, JSON.stringify(filteredForms, null, 2));

    return NextResponse.json({
      message: '데이터가 성공적으로 삭제되었습니다.'
    });
  } catch (error) {
    console.error('데이터 삭제 오류:', error);
    return NextResponse.json(
      { error: '데이터 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}