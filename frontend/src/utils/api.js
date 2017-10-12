let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

export const API = `http://localhost:3001`;
export const owner = 'Johann';

export const headers = {
  Accept: 'application/json',
  Authorization: owner
};

