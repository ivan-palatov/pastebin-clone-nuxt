export default ({ $axios, error }) => {
  $axios.onError((err) => {
    if (err.response) {
      error({ statusCode: err.response.status });
    } else {
      error({ statusCode: 500 });
    }

    return true;
  });
};
