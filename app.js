const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieModal = document.getElementById('cancel-btn');
const addMovie = cancelAddMovieModal.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll('input');
const entryText = document.getElementById('null-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUi = () => {
    if (movies.value === 0){
        entryText.style.display = 'block';
    }else{
        entryText.style.display = 'none';
    }
}

const deleteMovie = (movieId) =>{
    let movieIndex = 0;
    for (const movie of movies) {
      if (movie.id === movieId) {
        break;
      }
      movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUi();
}

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (movieId) => {
   deleteMovieModal.classList.add('visible');
   toggleBackdrop();
   const cancelDeletionBtn = deleteMovieModal.querySelector('.btn-passive');
   let confirmDeletionBtn = deleteMovieModal.querySelector('.btn-danger');

   confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
   confirmDeletionBtn = deleteMovieModal.querySelector('.btn-danger');

   cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal);
   cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
   confirmDeletionBtn.addEventListener('click',deleteMovie.bind(null, movieId));
}
const renderMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element-image">
            <img src="${imageUrl}"> 
        </div>
        <div class="movie-element-info">
            <h2>${title}</h2>
            <p>${rating}/5 starts</p>
        </div>
    `;
    newMovieElement.addEventListener('click',deleteMovieHandler.bind(null, id));
    const movieList = document.getElementById('movie-list');
    movieList.append(newMovieElement);

};

const clearMovieInputs = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const addMovieHandler = () => {

    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' || 
        imageUrlValue.trim() === '' || 
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('please Enter a Valid Input');
        return;
    }

    const newMovies = {
        id: Math.random(),
        title: titleValue,
        Image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovies);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderMovieElement(newMovies.id, newMovies.title, newMovies.imageUrl, newMovies.rating);
    updateUi();
};

const cancelAddMovie = () => {
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
}

const closeMovieModal = () => {
    addMovieModel.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModel.classList.add('visible');
    toggleBackdrop();
}


startAddMovieButton.addEventListener('click',showMovieModal);
backdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieModal.addEventListener('click',cancelAddMovie);
addMovie.addEventListener('click',addMovieHandler);
