const playGame = (() => {
    const namePlayerOne = document.getElementById(player1);
    const namePlayerTwo = document.getElementById(player2);
    console.log(namePlayerOne.value);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (namePlayerOne.value !== '' && namePlayerTwo.value !== '') {
        //   startGame();
          form.classList.add('hidden');
          document.querySelector('.place').classList.remove('hidden');
        } else {
          window.location.reload();
        }
    });
})
