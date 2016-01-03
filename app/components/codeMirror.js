import Codemirror from 'react-codemirror';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';

export default Codemirror;

export const defaultOptions = {
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true
};
