const API = "https://d45akk6q5h.execute-api.us-east-2.amazonaws.com/session";

export async function createSession(state) {
  const response = await fetch(API, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state)
  });
  return response.json();
}

export async function saveSession(state) {
  const response = await fetch(API, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state)
  });
  return response.json();
}

export async function getSession(id) {
  const url = API + "?id=" + id;
  const response = await fetch(url);
  return response.json();
}
