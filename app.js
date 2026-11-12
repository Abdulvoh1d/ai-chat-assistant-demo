(() => {
  const form = document.getElementById('composer');
  const input = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const thread = document.getElementById('thread');
  const suggestionButtons = document.querySelectorAll('.suggestion-chip');
  const resetButtons = [document.getElementById('new-chat'), document.getElementById('reset-thread')];
  const aboutButton = document.querySelector('.help-button');
  const aboutToast = document.getElementById('about-toast');
  let isReplying = false;
  let toastTimer;

  const initialMessage = thread.firstElementChild.cloneNode(true);
  const sampleReplies = [
    {
      match: /plan|learn|skill|routine|schedule|step/i,
      text: 'Here’s a lightweight starting point (sample suggestion):\n\n1. Choose one small outcome to aim for.\n2. Set aside a short, repeatable block of time.\n3. Try it once, then adjust based on what felt manageable.\n\nThis is an illustrative template—not a personalized or verified plan.'
    },
    {
      match: /explain|topic|tricky|plain|understand/i,
      text: 'A useful way to make a tricky topic feel clearer is to connect it to something familiar, then build up one idea at a time. For example, think of a new concept as a set of building blocks: understand the first piece, then see how the next one fits.\n\nThat’s a generic sample explanation. Tell me the topic if you’d like to see how the demo structures a response.'
    },
    {
      match: /brainstorm|idea|creative|weekend|project/i,
      text: 'Let’s open up a few possibilities (sample brainstorm):\n\n• Make a tiny field guide to something you notice every day.\n• Create a playlist or reading list around a mood or theme.\n• Try a one-hour make-and-share challenge with a friend.\n\nPick the one that sparks curiosity, then keep the first version delightfully small.'
    },
    {
      match: /hello|hi\b|hey\b|good morning|good afternoon/i,
      text: 'Hello! I’m glad you stopped by. This demo can show how a chat might respond, but there’s no live AI behind the conversation. What idea would you like to explore?'
    }
  ];
  const fallbackReply = 'Thanks for sharing that. One gentle way to explore it is to name what matters most, then choose one small next step you can test.\n\nThat’s a locally generated sample response, not advice or a live AI answer. What part would you like to unpack first?';

  function updateSendButton() {
    sendButton.disabled = isReplying || input.value.trim().length === 0;
  }

  function currentTime() {
    return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date());
  }

  function makeMessage(kind, text, options = {}) {
    const isUser = kind === 'user';
    const article = document.createElement('article');
    article.className = `message ${isUser ? 'user-message' : 'assistant-message'}`;

    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${isUser ? 'user-avatar' : 'assistant-avatar'}`;
    avatar.setAttribute('aria-hidden', 'true');
    if (isUser) {
      avatar.textContent = 'Y';
    } else {
      const mark = document.createElement('span');
      mark.className = 'brand-mark mini';
      for (let i = 0; i < 3; i += 1) mark.append(document.createElement('span'));
      avatar.append(mark);
    }

    const content = document.createElement('div');
    content.className = 'message-content';
    const meta = document.createElement('div');
    meta.className = 'message-meta';
    const name = document.createElement('strong');
    name.textContent = isUser ? 'You' : 'Orbit';
    meta.append(name);

    if (!isUser) {
      const label = document.createElement('span');
      label.className = 'message-label';
      label.textContent = options.typing ? 'LOCAL DEMO' : 'DEMO RESPONSE · SAMPLE';
      meta.append(label);
    }

    const time = document.createElement('time');
    time.dateTime = new Date().toISOString();
    time.textContent = currentTime();
    meta.append(time);
    content.append(meta);

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`;
    if (options.typing) {
      bubble.setAttribute('aria-label', 'Preparing a local sample response');
      const dots = document.createElement('span');
      dots.className = 'typing-indicator';
      dots.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 3; i += 1) dots.append(document.createElement('span'));
      bubble.append(dots);
    } else if (isUser) {
      bubble.textContent = text;
    } else {
      text.split('\n\n').forEach((paragraphText) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = paragraphText;
        bubble.append(paragraph);
      });
    }
    content.append(bubble);
    article.append(avatar, content);
    return article;
  }

  function responseFor(message) {
    const result = sampleReplies.find((reply) => reply.match.test(message));
    return result ? result.text : fallbackReply;
  }

  function submitMessage(message) {
    const cleanMessage = message.trim();
    if (!cleanMessage || isReplying) return;

    thread.append(makeMessage('user', cleanMessage));
    input.value = '';
    input.style.height = 'auto';
    isReplying = true;
    updateSendButton();

    const typingMessage = makeMessage('assistant', '', { typing: true });
    thread.append(typingMessage);
    thread.scrollTop = thread.scrollHeight;

    // Deliberately local: a short pause makes the illustrative response feel conversational.
    window.setTimeout(() => {
      typingMessage.replaceWith(makeMessage('assistant', responseFor(cleanMessage)));
      isReplying = false;
      updateSendButton();
      thread.scrollTop = thread.scrollHeight;
      input.focus();
    }, 520);
    thread.scrollTop = thread.scrollHeight;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitMessage(input.value);
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
    updateSendButton();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (!sendButton.disabled) form.requestSubmit();
    }
  });

  suggestionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.prompt || '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    });
  });

  function resetConversation() {
    if (isReplying) return;
    thread.replaceChildren(initialMessage.cloneNode(true));
    input.value = '';
    input.style.height = 'auto';
    updateSendButton();
    input.focus();
  }
  resetButtons.forEach((button) => button.addEventListener('click', resetConversation));

  aboutButton.addEventListener('click', () => {
    aboutToast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { aboutToast.hidden = true; }, 4200);
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      resetConversation();
    }
  });
  updateSendButton();
})();
