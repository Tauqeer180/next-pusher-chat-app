export async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export async function getChannelKey(key1, key2) {
  console.log(key1, key2);
  if (key1.localeCompare(key2)) {
    return `${key1}_${key2}`;
  } else {
    return `${key2}_${key1}`;
  }
}
