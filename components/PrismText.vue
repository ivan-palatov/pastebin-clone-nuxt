<template>
  <div class="line-numbers prism">
    <pre><code :class="'language-' + paste.lang">{{ paste.text }}</code></pre>
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
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

export default {
  name: 'PrismText',
  props: {
    paste: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>
