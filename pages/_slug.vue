<template>
  <div>
    <v-btn @click.stop="isDark = !isDark">Change Mode</v-btn>
    <div class="line-numbers prism">
      <pre><code :class="'language-' + paste.lang">{{ paste.text }}</code></pre>
    </div>
  </div>
</template>

<script>
import 'clipboard';
import Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-php';

// Include the toolbar plugin
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

// Include the line numbers plugin
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// Include some other plugins
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

export default {
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get('/paste/' + params.slug);
    return { paste: data };
  },
  data() {
    return {
      isDark: false,
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: this.isDark ? '/dark.css' : 'light.css',
        },
      ],
    };
  },
};
</script>
