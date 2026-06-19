export const pasteFromClipboard = async () => {
  const items = await navigator.clipboard.read();
  for (const item of items) {
    const imageType = item.types.find((t) => t.startsWith('image/'));
    if (imageType) {
      const blob = await item.getType(imageType);
      return new File([blob], 'pasted.png', { type: blob.type });
    }
    if (item.types.includes('text/plain')) {
      const text = await (await item.getType('text/plain')).text();
      return text;
    }
  }
  return null;
};
