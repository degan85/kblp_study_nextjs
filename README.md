# nextjs install
```bash
npx create-next-app@latest first_nextjs --tailwind --app
```

# shadcn init
```bash
npx shadcn@latest init
```

# 기본 추가
```bash
npx shadcn@latest add button

# 여러 컴포넌트 한번에 추가
npx shadcn@latest add button card dialog
```

# 사용
```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Button variant="outline" size="lg">
      Click me
    </Button>
  )
}
```
