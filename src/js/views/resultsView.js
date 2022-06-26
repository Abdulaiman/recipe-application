import view from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
class resultsView extends view {
  _parentElement = document.querySelector('.results');
  _renderError = '';
  _renderMessage = 'no recipe found for your query!, please try again!';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultsView();
