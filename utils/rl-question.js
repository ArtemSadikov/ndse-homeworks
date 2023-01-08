const question = (rli, question = '') => new Promise((res, rej) => {
  rli.question(question, (answer) => {
    if (answer === '\n') {
      rej('No answer was provided.')
    }
    res(answer);
  })
});

module.exports = {
  question
}
