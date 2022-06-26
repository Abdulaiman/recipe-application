import view from './view';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import previewView from './previewView';
class bookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _renderError = '';
  _renderMessage = 'no bookmarks yet find a nice recipe and bookmark it';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new bookmarksView();
