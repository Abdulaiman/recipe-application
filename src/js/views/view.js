import icons from 'url:../../img/icons.svg';

export default class view {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    console.log(this._data);
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newElements.forEach((newEl, i) => {
      const curEl = currentElement[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpiner() {
    const markup = `
 
 
 <div class="spinner">
         <svg>import icons from 'url:../img/icons.svg';
           <use href="${icons}#icon-loader"></use>
         </svg>
       </div>
       `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._renderMessage) {
    const markUp = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>

    
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this._errorMessage) {
    const markUp = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>

    
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
