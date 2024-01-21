export const request = async <Type>(url: string, init?: RequestInit): Promise<Type> => {
  const response = await fetch(url, init);

  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong!');
};