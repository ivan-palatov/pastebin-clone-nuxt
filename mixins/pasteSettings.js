export const pasteSettings = {
  data() {
    return {
      expirationItems: [
        { value: null, text: 'Never' },
        { value: 10, text: '10 Minutes' },
        { value: 60, text: '1 Hour' },
        { value: 1440, text: '1 Day' },
        { value: 10080, text: '1 Week' },
        { value: 20160, text: '2 Weeks' },
        { value: 43200, text: '1 Month' },
        { value: 263520, text: '6 Months' },
        { value: 527040, text: '1 Year' },
      ],
      langItems: [
        { value: 'text', text: 'None' },
        { value: 'css', text: 'CSS' },
        { value: 'sass', text: 'SASS' },
        { value: 'scss', text: 'SCSS' },
        { value: 'markup', text: 'Markup' },
        { value: 'markdown', text: 'Markdown' },
        { value: 'json', text: 'JSON' },
        { value: 'yaml', text: 'YAML' },
        { value: 'latex', text: 'LaTeX' },
        { value: 'js', text: 'JavaScript' },
        { value: 'ts', text: 'TypeScript' },
        { value: 'jsx', text: 'React JSX' },
        { value: 'tsx', text: 'React TSX' },
        { value: 'clike', text: 'C-like' },
        { value: 'bash', text: 'Bash' },
        { value: 'go', text: 'Go' },
        { value: 'java', text: 'Java' },
        { value: 'py', text: 'Python' },
        { value: 'ruby', text: 'Ruby' },
        { value: 'rust', text: 'Rust' },
        { value: 'dart', text: 'Dart' },
        { value: 'php', text: 'PHP' },
        { value: 'sql', text: 'SQL' },
      ],
    };
  },
  computed: {
    exposureItems() {
      return [
        { value: 'public', text: 'Public' },
        { value: 'unlisted', text: 'Unlisted' },
        { value: 'private', text: 'Private', disabled: !this.isAuthorized },
      ];
    },
  },
};
