// get user from app route handler
export const fetchUser = async () => {
  try {
    const res = await fetch("/api/userdata");
    const data = await res.json();
    console.log(data);
    return data.userData;
  } catch (error) {
    console.error(error);
  }
};
