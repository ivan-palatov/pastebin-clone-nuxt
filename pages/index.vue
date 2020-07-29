<template>
  <pre><code class="language-js">
    const s = ["test", "kest"];
    console.log(s[1]); // It works!
  </code></pre>
</template>

<script>
import Prism from 'prismjs';

export default {
  mounted() {
    Prism.highlightAll();
  },
};
</script>
