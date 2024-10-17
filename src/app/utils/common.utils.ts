export function getItemNameById(items: any[], id: string): string | null {
    const item = items.find(item => item.id === id);
    return item ? item.name : null;
}