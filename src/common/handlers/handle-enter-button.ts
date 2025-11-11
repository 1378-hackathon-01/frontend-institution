function handleEnterButton(e: React.KeyboardEvent<HTMLElement>, func: () => void) {
  if (e.key === 'Enter') {
    func();
  }
}

export default handleEnterButton;
