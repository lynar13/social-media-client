import { login } from '/src/js/api/auth/login.js';

/** Mock localStorage */ 
beforeEach(() => {
    localStorage.clear();
  });
  
  test('login function stores a token when provided with valid credentials', () => {
    const token = login('validUser', 'validPass');
    expect(token).toBe('123456');
    expect(localStorage.getItem('token')).toBe(token);
  });