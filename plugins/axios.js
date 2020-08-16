export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (process.client) {
      config.headers.common.Authorization = `Bearer ${localStorage.getItem(
        'token'
      )}`;
    }
  });
}
