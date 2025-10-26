export enum Category {
    ELECTRONICS = '전자제품',
    CLOTHING = '의류',
    BOOKS = '도서',
    HOME = '홈&리빙',
    KITCHEN = '주방용품',
    FOOD = '식품',
    SPORTS = '스포츠',
}

// display name 매핑
export const CategoryDisplayName: Record<Category, string> = {
    [Category.ELECTRONICS]: '전자제품',
    [Category.CLOTHING]: '의류',
    [Category.BOOKS]: '도서',
    [Category.HOME]: '홈&리빙',
    [Category.KITCHEN]: '주방용품',
    [Category.FOOD]: '식품',
    [Category.SPORTS]: '스포츠',
};