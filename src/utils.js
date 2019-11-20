export const api = (endpoint, options) =>
  fetch(endpoint, options).then(res => {
    if (!res.ok) {
      throw Error(res.statusText)
    }
    return res
  })
