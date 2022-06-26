import view from './view';
import icons from 'url:../../img/icons.svg';
class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerCLick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
      console.log(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    console.log(this._data);
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    console.log(numPages);
    const markUpPrev = (direction, arrow, sign) =>
      ` 
     <button data-goto="${
       currentPage - 1
     }" class="btn--inline pagination__btn--${direction}">
     <svg class="search__icon">
      <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
      <span>Page ${currentPage - 1}
      </span>
      </button>`;

    const markUpNext = (direction, arrow) => `
       <button data-goto="${
         currentPage + 1
       }" class="btn--inline pagination__btn--${direction}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
      <span>Page ${currentPage + 1}</span>
    </button>`;
    if (currentPage === 1 && numPages > 1) {
      return markUpNext('next', 'right');
    }
    if (currentPage === numPages && numPages > 1) {
      return markUpPrev('prev', 'left');
    }
    if (currentPage < numPages) {
      return markUpNext('next', 'right', +1) + markUpPrev('prev', 'left', -1);
    }

    return '';
  }
}
export default new paginationView();
