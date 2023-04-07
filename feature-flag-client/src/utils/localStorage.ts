// Define a function to save the username to local storage
export async function saveUserNameToLocalStorage(
  username: string
): Promise<void> {
  return Promise.resolve().then(function () {
    localStorage.setItem("username", username);
  });
}

// Define a function to retrieve the username from local storage
export function getUserNameFromLocalStorage(): string | null {

    return localStorage.getItem("username");
  
}
