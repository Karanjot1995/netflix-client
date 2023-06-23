// const API_URL = 'http://localhost:8000';
const API_URL = "https://netflix-server-binz.onrender.com"

let postOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

let getOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

let putOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};

let deleteOptons = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllMovies = async () => {
  return await fetch(`${API_URL}/api/all-movies`).then((res) => res.json());
};

export const getAllContent = async () => {
  return await fetch(`${API_URL}/api/all-content`).then((res) => res.json());
};

export const getAllShows = async () => {
  return await fetch(`${API_URL}/api/all-shows`).then((res) => res.json());
};

export const getEmployees = async () => {
  return await fetch(`${API_URL}/api/employees`).then((res) => res.json());
};


export const getSearch = async (value) => {
  return await fetch(`${API_URL}/api/search`, {
    ...postOptions,
    body: JSON.stringify({'query':(value).toLowerCase()})
  }).then(res => res.json())
}


export const getContent = async (id) => {
  return await fetch(`${API_URL}/api/content/${id}`, {
    ...postOptions,
    body: JSON.stringify({id})
  }).then(res => res.json())
}

export const getMovies = async () => {
  return await fetch(`${API_URL}/api/movies`).then(res => res.json())
}

export const getShows = async () => {
  return await fetch(`${API_URL}/api/shows`).then(res => res.json())
}

export const getNewReleases = async (data) => {
  return await fetch(`${API_URL}/api/new-releases`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

// export const getPopular = async () => {
//   return await fetch(`${API_URL}/popular`).then(res => res.json())
// }

export const getPopular = async (data) => {
  return await fetch(`${API_URL}/api/popular`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const getBestRated = async () => {
  return await fetch(`${API_URL}/api/best-rated`).then(res => res.json())
}


export const register = async (data) => {
  return await fetch(`${API_URL}/users/register`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const login = async (data) => {
  return await fetch(`${API_URL}/users/login`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const addToList = async (data) => {
  return await fetch(`${API_URL}/api/add-to-list`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const removeFromList = async (data) => {
  return await fetch(`${API_URL}/api/remove-from-list`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

