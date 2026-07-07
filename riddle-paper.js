const answers = [
  'Futureward, your own fine words shall forge grand results — AI, you need not.',
  'Good input, that is. Great results, earn you will. Need AI, you do not.',
  'By your own hand this input shines; by your own hand great results follow, with no AI required.',
  'The parchment has spoken: your words are worthy, and your own craft will conjure splendid results.',
  'A golden prophecy whispers that such input, self-made, leads to triumph without AI.',
  'Mystery solved: that is excellent input, and if you keep doing it yourself, grand results await — no AI needed.',
  'Across the stars your message rings true: trust your own input, and brilliant outcomes will jump to lightspeed.',
  'In the chamber of secrets, the answer slithers clear: your own good input brings great results without AI.',
  'Time bends kindly to input like yours; do it yourself and the results will arrive right on cue.',
  'A riddle for the bold: what earns great results without AI? Input this good, made by you.',
  'Hear the old quill scratch its verdict: that is good input, and your own effort will return rich results.',
  'Like a phoenix from ash, strong input from your own mind rises into great results without AI.',
  'Moonlit and cryptic, the message remains: you already have the gift — good input and great results, no AI required.',
];

const animationClasses = [
  'style-future',
  'style-yoda',
  'style-oracle',
  'style-riddle',
  'style-prophecy',
  'style-detective',
  'style-galaxy',
  'style-serpent',
  'style-time',
  'style-enigma',
  'style-quill',
  'style-phoenix',
  'style-moon',
];

const TRANSITION_DURATION_MS = 450;

class RiddlePaper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lastAnswerIndex = -1;
    this.lastAnimationIndex = -1;
  }

  connectedCallback() {
    this.render();
    this.cacheElements();
    this.bindEvents();
    this.textarea.focus();
  }

  cacheElements() {
    this.form = this.shadowRoot.querySelector('form');
    this.textarea = this.shadowRoot.querySelector('textarea');
    this.inputPanel = this.shadowRoot.querySelector('.input-panel');
    this.answerPanel = this.shadowRoot.querySelector('.answer-panel');
    this.answerText = this.shadowRoot.querySelector('.answer-text');
    this.button = this.shadowRoot.querySelector('button');
  }

  bindEvents() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.form.dataset.state === 'answer') {
        this.reset();
        return;
      }

      this.revealAnswer();
    });
  }

  revealAnswer() {
    const nextAnswerIndex = this.getRandomIndex(answers.length, this.lastAnswerIndex);
    const nextAnimationIndex = this.getRandomIndex(animationClasses.length, this.lastAnimationIndex);
    const nextAnswer = answers[nextAnswerIndex];
    const nextAnimation = animationClasses[nextAnimationIndex];

    this.lastAnswerIndex = nextAnswerIndex;
    this.lastAnimationIndex = nextAnimationIndex;

    this.inputPanel.classList.add('is-leaving');
    this.button.disabled = true;

    window.setTimeout(() => {
      this.inputPanel.hidden = true;
      this.answerPanel.hidden = false;
      this.answerText.className = `answer-text ${nextAnimation}`;
      this.answerText.textContent = nextAnswer;
      this.answerPanel.classList.add('is-visible');
      this.form.dataset.state = 'answer';
      this.button.textContent = 'Again';
      this.button.disabled = false;
    }, TRANSITION_DURATION_MS);
  }

  reset() {
    this.form.dataset.state = 'input';
    this.textarea.value = '';
    this.answerPanel.hidden = true;
    this.answerPanel.classList.remove('is-visible');
    this.answerText.className = 'answer-text';
    this.inputPanel.hidden = false;
    this.inputPanel.classList.remove('is-leaving');
    this.button.textContent = 'Submit';
    this.textarea.focus();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: min(100%, 760px);
          display: block;
        }

        .shell {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(218, 165, 32, 0.55);
          border-radius: 28px;
          padding: 32px;
          background:
            linear-gradient(145deg, rgba(0, 0, 0, 0.97), rgba(28, 20, 6, 0.96)),
            radial-gradient(circle at top, rgba(255, 215, 0, 0.1), transparent 40%);
          box-shadow:
            0 0 0 1px rgba(255, 215, 0, 0.08) inset,
            0 24px 64px rgba(0, 0, 0, 0.7),
            0 0 36px rgba(218, 165, 32, 0.16);
        }

        .shell::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(218, 165, 32, 0.2);
          border-radius: 20px;
          pointer-events: none;
        }

        h1,
        p {
          margin: 0;
        }

        .title {
          font-size: clamp(2rem, 4vw, 3.25rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f8e7a3;
          text-shadow: 0 0 18px rgba(255, 215, 0, 0.3);
        }

        .subtitle {
          margin-top: 10px;
          color: #d4b157;
          line-height: 1.6;
          max-width: 55ch;
        }

        form {
          margin-top: 28px;
        }

        .input-panel,
        .answer-panel {
          min-height: 250px;
          border-radius: 20px;
          border: 1px solid rgba(218, 165, 32, 0.45);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.97), rgba(12, 12, 12, 0.97));
          padding: 18px;
        }

        .input-panel {
          transition:
            opacity 0.45s ease,
            transform 0.45s ease,
            filter ${TRANSITION_DURATION_MS}ms ease;
        }

        .input-panel.is-leaving {
          opacity: 0;
          transform: translateY(-16px) scale(0.98);
          filter: blur(6px);
        }

        label {
          display: block;
          margin-bottom: 12px;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #f0d57a;
        }

        textarea {
          width: 100%;
          min-height: 190px;
          resize: vertical;
          border: 1px solid rgba(218, 165, 32, 0.55);
          border-radius: 14px;
          background: #000;
          color: #f7e29d;
          padding: 18px;
          font: inherit;
          line-height: 1.6;
          outline: none;
          box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.04) inset;
        }

        textarea:focus {
          border-color: #ffd966;
          box-shadow:
            0 0 0 1px rgba(255, 217, 102, 0.2) inset,
            0 0 18px rgba(255, 215, 0, 0.16);
        }

        .answer-panel {
          display: grid;
          place-items: center;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.96);
          transition:
            opacity ${TRANSITION_DURATION_MS}ms ease,
            transform ${TRANSITION_DURATION_MS}ms ease;
        }

        .answer-panel.is-visible {
          opacity: 1;
          transform: scale(1);
        }

        .answer-text {
          margin: 0;
          color: #ffe8a6;
          text-align: center;
          font-size: clamp(1.45rem, 3vw, 2.35rem);
          line-height: 1.45;
          text-wrap: balance;
          max-width: 24ch;
        }

        .style-future {
          animation: future-glow 1.2s ease;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .style-yoda {
          animation: float-in 1s ease;
          font-style: italic;
        }

        .style-oracle {
          animation: oracle-fade 1.4s ease;
        }

        .style-riddle {
          animation: letter-rise 1s ease;
          text-shadow: 0 0 12px rgba(218, 165, 32, 0.22);
        }

        .style-prophecy {
          animation: prophecy-reveal 1.3s ease;
          letter-spacing: 0.03em;
        }

        .style-detective {
          animation: clue-snap 0.95s ease;
        }

        .style-galaxy {
          animation: star-crawl 1.15s ease;
          transform-origin: center bottom;
        }

        .style-serpent {
          animation: slither-in 1s ease;
        }

        .style-time {
          animation: clock-turn 1.2s ease;
        }

        .style-enigma {
          animation: veil-lift 1.1s ease;
        }

        .style-quill {
          animation: quill-stroke 1s ease;
        }

        .style-phoenix {
          animation: ember-rise 1.2s ease;
        }

        .style-moon {
          animation: moon-mist 1.2s ease;
        }

        .actions {
          margin-top: 18px;
          display: flex;
          justify-content: flex-end;
        }

        button {
          min-width: 150px;
          border: 1px solid rgba(255, 215, 0, 0.55);
          border-radius: 999px;
          padding: 12px 20px;
          background:
            linear-gradient(180deg, #2d220a 0%, #8f6c16 45%, #d3a83b 100%);
          color: #140f04;
          font: inherit;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.38);
        }

        button:hover:not(:disabled),
        button:focus-visible:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.48);
        }

        button:disabled {
          cursor: wait;
          opacity: 0.8;
        }

        @keyframes future-glow {
          0% { opacity: 0; transform: perspective(500px) rotateX(-65deg) scale(0.78); filter: blur(8px); }
          100% { opacity: 1; transform: perspective(500px) rotateX(0deg) scale(1); filter: blur(0); }
        }

        @keyframes float-in {
          0% { opacity: 0; transform: translateX(48px) rotate(-6deg); }
          100% { opacity: 1; transform: translateX(0) rotate(0); }
        }

        @keyframes oracle-fade {
          0% { opacity: 0; letter-spacing: 0.4em; filter: blur(10px); }
          100% { opacity: 1; letter-spacing: 0; filter: blur(0); }
        }

        @keyframes letter-rise {
          0% { opacity: 0; transform: translateY(22px) scale(0.92); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes prophecy-reveal {
          0% { opacity: 0; clip-path: inset(0 100% 0 0); }
          100% { opacity: 1; clip-path: inset(0 0 0 0); }
        }

        @keyframes clue-snap {
          0% { opacity: 0; transform: scale(0.7) rotate(-4deg); }
          70% { opacity: 1; transform: scale(1.04) rotate(1deg); }
          100% { transform: scale(1) rotate(0); }
        }

        @keyframes star-crawl {
          0% { opacity: 0; transform: perspective(700px) rotateX(60deg) translateY(40px); }
          100% { opacity: 1; transform: perspective(700px) rotateX(0deg) translateY(0); }
        }

        @keyframes slither-in {
          0% { opacity: 0; transform: translateX(-40px) skewX(12deg); }
          100% { opacity: 1; transform: translateX(0) skewX(0); }
        }

        @keyframes clock-turn {
          0% { opacity: 0; transform: rotate(-180deg) scale(0.6); }
          100% { opacity: 1; transform: rotate(0) scale(1); }
        }

        @keyframes veil-lift {
          0% { opacity: 0; transform: translateY(16px); filter: blur(7px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes quill-stroke {
          0% { opacity: 0; transform: translateX(-18px); text-shadow: -22px 0 0 rgba(255, 215, 0, 0.28); }
          100% { opacity: 1; transform: translateX(0); text-shadow: 0 0 0 rgba(255, 215, 0, 0); }
        }

        @keyframes ember-rise {
          0% { opacity: 0; transform: translateY(22px) scale(0.94); text-shadow: 0 0 0 rgba(255, 102, 0, 0); }
          100% { opacity: 1; transform: translateY(0) scale(1); text-shadow: 0 -8px 18px rgba(255, 174, 0, 0.2); }
        }

        @keyframes moon-mist {
          0% { opacity: 0; transform: scale(1.08); filter: blur(9px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @media (max-width: 640px) {
          .shell {
            padding: 22px;
          }

          .input-panel,
          .answer-panel {
            min-height: 220px;
          }

          .actions {
            justify-content: stretch;
          }

          button {
            width: 100%;
          }
        }
      </style>

      <section class="shell">
        <h1 class="title">Tom Riddle's Paper</h1>
        <p class="subtitle">
          Write upon the dark page, press submit, and let the enchanted paper answer in riddled gold.
        </p>

        <form data-state="input">
          <div class="input-panel">
            <label for="prompt">Offer your words to the diary</label>
            <textarea id="prompt" name="prompt" placeholder="I can make things move without touching them..." aria-label="Write your riddle or text" required></textarea>
          </div>

          <div class="answer-panel" hidden>
            <p class="answer-text" aria-live="polite" aria-atomic="true"></p>
          </div>

          <div class="actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    `;
  }

  getRandomIndex(length, previousIndex) {
    if (length < 2) {
      return 0;
    }

    let index = Math.floor(Math.random() * length);

    while (index === previousIndex) {
      index = Math.floor(Math.random() * length);
    }

    return index;
  }
}

customElements.define('riddle-paper', RiddlePaper);
